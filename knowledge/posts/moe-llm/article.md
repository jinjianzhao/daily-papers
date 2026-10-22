# LLM 的 MoE：一个模型，为什么只激活少数专家？

MoE（Mixture of Experts，混合专家）解决的是一个很具体的扩展问题：**怎样让模型拥有更多参数和更强的表示容量，却不让每个 token 都经过全部参数？**

Dense Transformer 的每个 block 都会让所有 token 经过同一个 FFN/MLP。MoE 把这个 FFN 子层换成一组并行的专家（experts），再由一个可学习的路由器（router）为每个 token 选择少数专家。于是模型可以有很大的**总参数量**，但单个 token 只激活其中一小部分。

本文从普通 Transformer 的 FFN 开始，说明稀疏 MoE block 的数据流、训练和推理过程，再解释 top-1/top-2 路由、容量限制、负载均衡和分布式通信。不同论文的具体配置不同，文中会把通用机制与单篇论文的选择分开。

## 1. 从 Dense Transformer 的 FFN 开始

一个 decoder-only Transformer block 通常可以粗略写成：

```text
输入 hidden states
        │
        ├── Self-Attention
        │
        └── FFN/MLP
                │
              输出
```

对每个位置的 hidden vector `x`，FFN 独立地做两次线性变换和一个非线性函数，例如：

```text
FFN(x) = W2 · activation(W1 · x)
```

同一层的所有 token 都使用同一组 `W1、W2`。增大 FFN 的宽度会增加模型容量和计算量；增加层数也同时增加每个 token 的计算。

MoE 的第一步不是把 Attention 复制成很多份，而是通常**只替换 FFN/MLP 子层**：

```text
输入 x ──> Attention ──> MoE-FFN ──> 输出
                         │
                专家 1, 专家 2, ... 专家 E
```

每个专家本身通常仍是一个 FFN。注意力仍然负责 token 之间的上下文交互；专家负责对当前 token 的表示做不同的变换。把“专家”理解成一组可选择的 FFN，比理解成一组完整的 Transformer 更准确。

## 2. Router 如何选择专家

设一个 token 的输入表示是 `x`，有 `E` 个专家。路由器是一个训练得到的线性打分器：

```text
logits = W_r x + b_r
probabilities = softmax(logits)
```

`logits[e]` 表示这个 token 被送到第 `e` 个专家的倾向。softmax 后得到路由概率，router 再按照概率选 top-`k` 个专家。这里的路由不是人工写的规则，也不是 router 事先“理解”了某个领域；它和专家参数一起通过训练损失学习，逐渐形成有用的分工。

### Top-1 与 top-2

- **Top-1（Switch 风格）**：每个 token 只送到概率最高的一个专家。计算和通信简单，但单个专家的选择错误无法由另一个专家补充。
- **Top-2**：每个 token 送到两个最高概率的专家，再按路由权重加权合并两个输出。通常有更大的路由表达能力，但一次 token 需要两份专家计算、更多通信和更大的容量压力。

一个常见的 MoE 输出形式是：

```text
y = Σ_{e∈TopK(x)} p_e · Expert_e(x)
```

其中 `p_e` 是选中专家的归一化权重。不同实现还会对权重重新归一化、设置 residual 或采用不同的 token dispatch 方式，不能把上式当作所有模型的唯一实现。

模型仍用下一 token 的正确词计算交叉熵。反向传播时，这个损失沿着被选中的专家输出，更新这些专家的 FFN 参数；如果输出用可微的路由权重 `p_e` 加权，梯度也会沿权重回到 router 参数。通常的硬 top-`k` **专家成员选择本身是离散操作**，不会像连续权重那样直接反传“没选中专家若被选中会怎样”的梯度。负载均衡等辅助损失为 router 提供额外训练信号；不同模型还可能用不同的路由梯度处理方法。

## 3. 一个 8 专家、Top-2 的数字例子

假设一个 batch 有 6 个 token，MoE 层有 8 个专家，每个 token 选 2 个专家。router 对 token `t1` 给出的 top-2 结果是专家 3 和专家 7，概率为 `0.7`、`0.3`；对 `t2` 则选专家 7 和专家 1。

数据流可以想成：

```text
t1 ──┬─> Expert 3 ─┐
     └─> Expert 7 ─┤ 0.7·out3 + 0.3·out7

t2 ──┬─> Expert 7 ─┐
     └─> Expert 1 ─┤ 组合得到 t2 的输出
```

路由后，系统先把 token 按专家分组：送给专家 1 的 token 放在一组，送给专家 3 的放在另一组，依此类推。每个专家只运行自己的 FFN，再按照 token 的原顺序把结果散回，并用路由权重合并。

假设这个 batch 每个专家平均会收到 `6×2/8=1.5` 份 token 路由，但实际可能有的专家收到 0 个、有的收到 4 个。这个不均匀正是 MoE 的核心工程问题之一。

## 4. Capacity：专家一次能接收多少 token

如果给每个专家预留无限空间，某个热门专家可能收到远多于其他专家的 token，内存和计算会突然膨胀。于是实现通常为每个专家设置容量（capacity）。一个常见的抽象写法是：

```text
capacity ≈ capacity_factor × (token 数 × top-k / 专家数)
```

`capacity_factor` 大于 1 时，为路由波动留下余量；不同实现还会按 batch、序列或并行分组计算容量。这里要区分两个问题：

- **容量溢出（overflow）**：若分配给某专家的 token 超过上限，某些实现会丢弃超出的专家路由，让 token 走其他选中专家或 residual；另一些实现会提高容量或采用动态缓冲区，换取更多显存和通信。
- **固定形状计算（padding）**：若某专家收到的 token 少于预留容量，可以用空位补齐矩阵形状，便于批量矩阵乘法，但这些空位可能带来无效计算。Padding 处理的是**未用满的容量**，本身并不能解决已经溢出的专家。

“丢 token”不表示丢掉输入文本，而是表示某一路专家计算没有被采用。具体补救方式取决于模型实现，不能笼统地说所有 MoE 都采用同一种策略。

## 5. 为什么要加负载均衡损失

如果只优化语言模型的 next-token loss，router 可能把大量 token 都送到少数“看起来好用”的专家。热门专家排队、容量溢出，冷门专家却几乎没有梯度。为避免这种塌缩，训练中常加入 auxiliary load-balancing loss。

直觉上，它会同时观察两件事：

- 某专家收到的 token 比例是否均匀；
- router 给该专家分配的概率质量是否均匀。

常见的 Switch 类损失把这两类统计量按专家相乘再求和，鼓励平均分布。公式细节会随 top-k、专家分组和实现变化；重要的是，它是**辅助约束**，不是替代语言模型损失的监督答案。它只能鼓励负载均衡，不能保证每一步都完美均匀。

有些实现还会加入 router z-loss，例如 ST-MoE 用每个 token 的 `logsumexp(router logits)` 的平方作为惩罚项，抑制很大的 logit 归一化常数，以改善数值稳定性。它**不是直接把路由概率变均匀的熵损失**，也不是 MoE 的必备组件；是否使用、系数多大要看具体论文和代码。

训练目标可以概括为：

```text
总损失 = 语言模型损失 + λ_balance · 负载均衡损失
                  + λ_z · router z-loss（如果该实现使用）
```

## 6. 训练时发生了什么：dispatch 与 all-to-all

在单卡上，路由只需要按专家把 token 重排、调用对应 FFN、再把结果散回。大模型通常把专家分布到多张 GPU 上，这时会出现通信：一个 GPU 上的 token 可能被路由到另一张 GPU 的专家。

典型流程是：

```text
1. 每张 GPU 计算本地 token 的 router 分数
2. 确定每个 token 的 top-k 专家和位置
3. 按目标专家重新排列 token（dispatch）
4. 用 all-to-all 把 token 发到拥有这些专家的 GPU
5. 各 GPU 执行本地专家 FFN
6. all-to-all 把专家输出发回原 GPU
7. 按路由权重合并 top-k 输出
```

**All-to-all** 是“每个参与者都可能向其他参与者发送一部分数据”的集合通信。MoE 的**专家 FFN 算术量**因稀疏激活而减少，但 token 不能凭空移动；专家并行时，通信带宽、消息碎片和同步等待可能成为主要瓶颈。高效实现会尽量减少 dispatch、专家计算和 combine 之间的中间拷贝，但通信等待不应算作 FLOPs。

这也解释了为什么“每 token 只激活少数专家”不等于训练一定便宜：总参数、激活参数和实际系统成本是三件事。

## 7. 推理时是怎样的

自回归推理每次只新增少量 token。对新 token，Attention 仍按模型的 KV cache 规则运行；到 MoE-FFN 时，router 计算该 token 的 top-k 专家，调用这些专家并合并输出。未被选中的专家不参与这个 token 的 FFN 计算。

但推理成本仍包括：

- 被激活专家的 FFN 计算；
- router 计算与 token 重排；
- 专家并行时的 GPU 间通信；
- 不同 token 路由不均导致的空闲和负载峰值；
- 所有专家参数通常仍需驻留在显存或可快速访问的设备中。

因此 MoE 常常降低的是**每个 token 的算术激活量**，而不是简单地把模型占用显存除以专家数。若专家被分片到多卡，单卡显存可以下降，但系统需要更多卡和通信。

## 8. 参数量、激活参数与 FLOPs 要分开

考虑 8 个相同大小的专家、每个 token top-2：

- **总参数量**：大约是 8 个 FFN 的参数加上 router；它决定模型容量以及存储所有专家的代价。
- **Active parameters**：一个 token 只经过 2 个专家，因此该 token 的 FFN 激活参数约为 2 份，而不是 8 份（还要加 Attention、embedding 等共享部分）。
- **FLOPs**：理想情况下，MoE-FFN 的主要算术量接近 2 个专家；padding 可能增加实际执行的无效算术。通信不是 FLOPs，但会增加传输时间；小而不均匀的专家 batch 会降低设备利用率，因此即使 FLOPs 相近，端到端延迟也可能更高。
- **显存**：所有专家权重仍要存储，只是可以通过 expert parallel、权重分片或按需加载分摊到不同设备。

所以“参数量更大、每 token 激活参数更少”是容量—计算解耦的直觉，不是免费午餐。实际性能必须在固定硬件、batch、序列长度和并行策略下测量。

## 9. Token-level routing 与 sequence-level routing

本文主要讲的是 **token-level routing**：同一序列中的不同 token 可以选择不同专家。例如代码 token 可能更常去一组专家，叙事 token 可能更常去另一组，但这是训练形成的统计倾向，不是硬编码的标签。

**Sequence-level routing** 则以整段序列、样本或更大的组为单位选择专家，路由更粗，通信和调度可能更简单，但无法为同一序列内的不同 token 选择不同的计算路径。两者都属于条件计算，不能把一个配置下的结果当成另一个配置的结论。还有 sentence-level、expert-choice 等变体；本文不展开成综述。

## 10. 从经典工作看这条路线

- **Sparsely-Gated MoE（Shazeer 等，2017）**：较早系统地提出用可学习 gate 选择少数专家，让模型参数容量大幅扩展而保持稀疏激活；同时暴露了负载均衡和通信问题。
- **GShard（Lepikhin 等，2020）**：展示了在大规模 TPU 分布式训练中把专家层切分、路由和通信结合起来的工程路径。
- **Switch Transformer（Fedus 等，2021）**：用 top-1 路由简化每个 token 的专家选择，并讨论容量、丢 token 和负载均衡，在大模型规模上验证稀疏条件计算的可扩展性。
- **Mixtral 8x7B 技术报告（Mistral AI，2024）**：公开模型采用多专家 FFN 的思路，每个 token 选择少数专家；它是一个具体开源模型配置，不应被当成所有 MoE 的标准超参数。

这些工作共同表达的是“稀疏地调用专家”，但专家数量、top-k、容量、并行方式和训练稳定化策略都可以不同。

## 11. 一个可操作的检查清单

看到一个 MoE 模型或论文时，可以依次问：

1. 专家替换的是 FFN、Attention，还是其他子层？
2. router 对每个 token 选择 top-1、top-2，还是动态数量？
3. 超过 expert capacity 的 token 怎样处理？
4. 是否使用 auxiliary load-balancing loss 或 z-loss？
5. 专家怎样分布在设备上，all-to-all 的通信路径是什么？
6. 报告的是总参数、active parameters、理论 FLOPs，还是端到端延迟？

把这六点分开，通常就不会被“万亿参数但只激活很少”这样的宣传语混淆。

## 参考资料

- [Sparsely-Gated Mixture-of-Experts（Shazeer et al., 2017）](https://arxiv.org/abs/1701.06538)
- [GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding（Lepikhin et al., 2020）](https://arxiv.org/abs/2006.16668)
- [Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity（Fedus et al., 2021）](https://arxiv.org/abs/2101.03961)
- [Designing and Scaling Multimodal Foundation Models（ST-MoE，含 router z-loss 讨论）](https://arxiv.org/abs/2202.08906)
- [Mixtral of Experts（Mistral AI, 2024）](https://arxiv.org/abs/2401.04088)

## QA

暂无问答。
