# DeepSpeed 入门：多张 GPU 怎样合力训练一个模型

DeepSpeed 是基于 PyTorch 的训练优化库。你照常定义模型、数据和损失函数，再让 DeepSpeed 管理训练时的设备协作、显存、优化器与检查点。它最常见的用途是训练或微调大模型，尤其是模型权重能放进显存、训练状态却放不下，或单卡根本放不下的场景。它既不替你选择训练数据，也不替你决定模型该学什么。[官方入门](https://www.deepspeed.ai/getting-started/)｜[训练能力总览](https://www.deepspeed.ai/training/)

## 先从普通 PyTorch 看起

假设有一台机器、四张 GPU，要训练同一个 Transformer。最容易理解的办法是**数据并行**：四张卡各放一份完整模型，各吃不同的样本，分别算梯度，再把梯度汇总，让四份模型做相同的参数更新。PyTorch 的 DistributedDataParallel（DDP）就是常用实现。[PyTorch DDP 文档](https://docs.pytorch.org/docs/stable/generated/torch.nn.parallel.DistributedDataParallel.html)

问题是：每张卡虽然只处理四分之一左右的数据，却仍持有完整的**参数、梯度、优化器状态**。如果使用 Adam，优化器还为参数维护动量等历史量；前向传播产生的**激活**又要留给反向传播。于是，“权重能装下一张卡”并不等于“训练能装下一张卡”。DeepSpeed 的 ZeRO（Zero Redundancy Optimizer，零冗余优化器）主要从重复存放的训练状态入手。[ZeRO 论文](https://arxiv.org/abs/1910.02054)

```text
同一模型，四张 GPU，处理四份不同数据

普通数据并行：每卡都保存 [全部参数 | 全部梯度 | 全部优化器状态]
ZeRO 数据并行：每卡长期保存自己负责的状态分片；需要计算时通信
```

“长期保存”很关键：ZeRO 不会凭空消除计算所需的信息。某层要运算时，相关分片仍须通过 GPU 间通信临时凑齐，或者把计算结果分发到负责更新该分片的设备。换取显存的是通信、调度和可能增加的耗时。[官方 ZeRO 教程](https://www.deepspeed.ai/tutorials/zero/)

## ZeRO-1、2、3：逐步分掉哪些副本

设想一个简化模型，参数占 8 GB、梯度占 8 GB、优化器状态占 32 GB；四卡数据并行。不计激活、通信缓冲与临时张量时，普通数据并行每卡都需要约 `8 + 8 + 32 = 48 GB` 的这三类状态。这个数字仅用来解释分片，不代表任何真实模型的训练显存。

| 方式 | 每张 GPU 长期持有什么 | 在上述理想化例子中的每卡状态量 |
| --- | --- | --- |
| 普通数据并行 | 全部参数、梯度、优化器状态 | 48 GB |
| ZeRO-1 | 全部参数、梯度；约四分之一优化器状态 | 24 GB |
| ZeRO-2 | 全部参数；约四分之一梯度与优化器状态 | 18 GB |
| ZeRO-3 | 约四分之一参数、梯度与优化器状态 | 12 GB |

三个阶段是**叠加**的。ZeRO-1 分片优化器状态；ZeRO-2 再分片梯度；ZeRO-3 再分片参数。ZeRO-3 在某层前向或反向时要汇集所需参数，用后可重新分片，因此更省常驻显存，也更依赖通信。真实运行还需要激活、临时参数、通信缓冲、显存碎片等，上表不能直接用于购买显卡。[官方 ZeRO 教程](https://www.deepspeed.ai/tutorials/zero/)

注意这仍是**数据并行组**：每张卡处理不同样本，合作更新同一个模型。张量并行则把同一层矩阵计算拆到多卡；流水线并行把不同层分给不同卡。它们处理的是不同的切分对象，可以与 ZeRO 组合。只有在了解模型大小、显卡互联与具体吞吐后，才能决定是否值得叠加。[DeepSpeed 训练能力总览](https://www.deepspeed.ai/training/)｜[流水线并行教程](https://www.deepspeed.ai/tutorials/pipeline/)

## 一次训练更新经过哪些步骤

沿用四卡例子。每卡从自己的数据分片取一个 micro-batch，执行前向并计算 loss；反向传播得到梯度；DeepSpeed 按配置完成梯度通信与分片；优化器使用负责分片的状态更新参数。如果配置了梯度累积，多个 micro-batch 的梯度会先累加，达到设定次数才做一次优化器更新。全局 batch 的通常计算式是 `每卡 micro-batch × 累积次数 × 数据并行卡数`，但变长样本下每步 token 数仍可能不同。[官方入门与配置说明](https://www.deepspeed.ai/getting-started/)

DeepSpeed 的底层接口是 `deepspeed.initialize(...)`：它返回一个包裹模型的 `engine`。概念上，原来自己调用 `loss.backward()` 和 `optimizer.step()` 的位置，变成由 `engine.backward(loss)`、`engine.step()` 管理。下面只展示接口关系，省略了数据、配置和分布式启动代码：

```python
engine, optimizer, loader, scheduler = deepspeed.initialize(
    model=model,
    model_parameters=model.parameters(),
    training_data=dataset,
    config="ds_config.json",
)

for batch in loader:
    loss = engine(batch)
    engine.backward(loss)
    engine.step()
```

`ds_config.json` 决定 ZeRO 阶段、混合精度、micro-batch、梯度累积等。若你使用 Hugging Face `Trainer`，也可以在 `TrainingArguments` 中提供 DeepSpeed 配置，由 Trainer 接入 DeepSpeed；这是一层训练框架集成，不是另一个 ZeRO 算法。PyTorch 模型仍定义前向与 loss，DeepSpeed 管理配置指定的训练执行。[DeepSpeed 入门](https://www.deepspeed.ai/getting-started/)｜[Transformers DeepSpeed 集成文档](https://huggingface.co/docs/transformers/deepspeed)

## 显存不够时，先判断是哪块不够

**参数、梯度、优化器状态**随可训练参数数目增加，ZeRO 针对它们的重复副本。**激活**则与网络结构、序列长度和单次 micro-batch 相关；只开启 ZeRO，长序列反向传播仍可能爆显存。常见办法是减少 micro-batch、进行梯度累积，或用激活检查点在反向时重算部分前向结果。混合精度可降低部分张量的存储与计算代价，但不意味着所有训练状态都只需 16 位。[官方训练能力总览](https://www.deepspeed.ai/training/)｜[配置文档](https://www.deepspeed.ai/docs/config-json/)

**CPU / NVMe offload** 把部分状态放到 GPU 外的存储层，让更大的模型有机会运行；代价是传输带宽和延迟。训练是否更快，要看每步计算与通信能否覆盖这些搬运时间。类似地，ZeRO-3 最省常驻状态，不保证每秒 token 数最高。若模型和优化器状态本来能轻松放入每卡显存，先比较 PyTorch DDP 与较浅 ZeRO 阶段的实际吞吐即可。[ZeRO-Offload 文档](https://www.deepspeed.ai/tutorials/zero-offload/)｜[ZeRO-Infinity 论文](https://arxiv.org/abs/2104.07857)

## 怎样选起点

若只是学习单机多卡训练，先跑通 PyTorch DDP：它最直接地展示数据分片与梯度同步。若主要问题是 Adam 状态占显存，可以从 ZeRO-1 开始；梯度也成为负担，再比较 ZeRO-2；模型参数副本本身放不下，评估 ZeRO-3 及其通信开销。若激活占主导，优先检查序列长度、micro-batch 和激活重算。以上是**排查顺序**，不是固定的性能排序，最终仍需量测峰值显存、每步时间、有效 token 吞吐和续训是否可靠。

最后要记住检查点：恢复训练通常需要模型参数以外的优化器、调度器和项目自己的进度状态。ZeRO 保存的训练检查点可能按 GPU 分片；用于继续训练的状态和用于发布、推理的单份模型权重也不总是同一个文件。[DeepSpeed 检查点入门](https://www.deepspeed.ai/getting-started/#model-checkpointing)｜[ZeRO 权重提取说明](https://www.deepspeed.ai/tutorials/zero/#extracting-weights)

## 延伸阅读

- [DeepSpeed 官方入门：接口与训练循环](https://www.deepspeed.ai/getting-started/)
- [DeepSpeed 官方 ZeRO 教程：三个阶段](https://www.deepspeed.ai/tutorials/zero/)
- [ZeRO 原论文：Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)
- [Hugging Face Transformers 的 DeepSpeed 集成](https://huggingface.co/docs/transformers/deepspeed)
