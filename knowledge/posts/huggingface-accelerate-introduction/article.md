# Hugging Face Accelerate：把 PyTorch 训练循环带到多卡

## 先弄清它解决什么问题

假设你已经会在一张 GPU 上训练一个 Transformer：从 `DataLoader` 取 batch，运行 `model(batch)`，计算 loss，反向传播，再更新参数。换成四张 GPU 后，问题不只是把模型放上四张卡：谁启动四个进程？每个进程读哪些样本？梯度什么时候同步？混合精度由谁处理？保存权重时怎样避免四个进程同时写同一个文件？

**Accelerate 是 Hugging Face 为 PyTorch 训练提供的执行与配置接口。**它让你保留普通 PyTorch 训练循环，通过 `Accelerator` 对象接入设备放置、分布式数据加载、反向传播、混合精度、梯度累积等能力。它可以在单卡、多卡和部分分片训练方案中使用；底层的分布式计算仍由 PyTorch Distributed、DeepSpeed 或 FSDP 等机制实现。[1][2]

注意名称：包叫 **Accelerate**；代码里的核心类叫 **`Accelerator`**。`accelerate launch` 是启动训练脚本的命令。

## 从一张卡到四张卡：到底发生了什么

以 1,024 条训练样本、4 张 GPU、每张卡每步处理 8 条样本为例。一个典型的数据并行设置会启动 4 个训练进程，每个进程持有一份模型，读取属于自己的样本。每个进程算出本地梯度后，数据并行机制在参数更新前聚合梯度；四个进程随之更新各自的模型副本。这个例子的一次优化步大致消耗 `4 × 8 = 32` 条样本；实际全局 batch 还取决于梯度累积步数。

```text
原始数据集 ──分给各进程──► GPU 0 / GPU 1 / GPU 2 / GPU 3
                         每个进程：前向 → loss → 反向
                                  │
                            梯度同步或分片通信
                                  │
                              参数更新
```

`accelerator.prepare(model, optimizer, dataloader)` 会依当前配置包装模型、优化器和数据加载器，并返回准备后的对象。对多卡数据并行，数据加载器会按进程分配输入；模型包装让各进程执行必要的梯度同步。它处理的是训练对象的分布式执行，**没有替你决定数据清洗、loss、模型结构或实验设计**。[1]

## 最小训练例子

下面假设 `model`、`optimizer`、`train_loader` 和 `loss_fn` 已经按普通 PyTorch 写好：

```python
from accelerate import Accelerator

accelerator = Accelerator(mixed_precision="bf16")
model, optimizer, train_loader = accelerator.prepare(
    model, optimizer, train_loader
)

model.train()
for inputs, labels in train_loader:
    optimizer.zero_grad()
    logits = model(inputs)
    loss = loss_fn(logits, labels)
    accelerator.backward(loss)
    optimizer.step()
```

看三个关键动作：

1. **创建 `Accelerator`**：它知道当前进程处于什么设备和分布式环境。这里的 `bf16` 请求 bfloat16 混合精度，实际能否使用取决于硬件及运行配置。
2. **调用 `prepare`**：把原本的 PyTorch 对象交给运行环境。随后应使用它返回的 `model`、`optimizer` 和 `train_loader`，而不是继续使用旧变量。
3. **调用 `accelerator.backward(loss)`**：让反向传播遵循当前后端的精度和分布式策略。普通 `loss.backward()` 在某些配置下会绕过这些处理。[1]

安装后先执行 `accelerate config` 生成运行配置，再用 `accelerate launch train.py` 启动脚本。配置会决定进程数、设备和所选分布式后端；同一脚本可以通过修改配置切换执行环境。具体参数以所用 Accelerate 版本的官方启动文档为准。[2]

## 梯度累积与显存：一个容易误解的地方

如果每张卡只能放 8 条样本，但希望全局 batch 约为 128，可以在四卡上累积 4 个小步：`8 × 4 × 4 = 128`。在 Accelerate 里，通常设置 `Accelerator(gradient_accumulation_steps=4)`，并用 `with accelerator.accumulate(model):` 包裹前向、反向和优化步骤。该上下文会协调何时同步梯度、何时实际更新参数。[1]

**梯度累积扩大的是一次参数更新汇总的样本数，不是让每张 GPU 突然放得下更大的模型。**如果模型参数、优化器状态或激活本身超显存，需要再看 ZeRO、FSDP、激活检查点、降低序列长度等方案。

## Accelerate 与 DDP、DeepSpeed、FSDP 的关系

| 名称 | 主要解决的问题 | 在这里的位置 |
| --- | --- | --- |
| PyTorch DDP | 多进程数据并行，同步模型副本的梯度 | 常见的底层执行机制 |
| DeepSpeed ZeRO | 将优化器状态、梯度或参数分片，降低单卡显存压力 | 可通过配置由 Accelerate 接入的后端 |
| PyTorch FSDP | 将模型参数等状态跨进程分片 | 可通过配置由 Accelerate 接入的后端 |
| Hugging Face Accelerate | 用统一训练接口配置和调用上述执行方式，并处理设备、数据加载、精度等常见环节 | 位于训练脚本与底层机制之间 |

因此，**用了 Accelerate 不等于用了 ZeRO 或 FSDP**。如果只是常规数据并行，每个进程仍可能保存完整模型及优化器状态；能否训练超出单卡容量的大模型，取决于实际选择的分片后端和配置。[3][4]

## 什么时候用，什么时候还要深入底层

当你有一份标准 PyTorch 训练循环，希望先在单卡调试，再以尽量少的代码改动跑多卡，Accelerate 很合适。它也适合把混合精度、梯度累积、进程间保存等重复代码集中管理。

但它并不让分布式训练变成“零成本”：通信量、数据倾斜、全局 batch 改变后的学习率选择、检查点大小、数值稳定性仍需测量。需要特殊的通信算法、精细控制参数分片或极致性能调优时，仍要理解并检查 DDP、DeepSpeed 或 FSDP 的实际行为。最有效的入门顺序是：先跑通单卡训练，再用两卡核对 loss 和吞吐，最后根据显存瓶颈判断是否需要分片。[1][3][4]

## 参考资料

1. Hugging Face, [Add Accelerate to your code](https://huggingface.co/docs/accelerate/main/en/basic_tutorials/migration)：`Accelerator`、`prepare`、`backward`、梯度累积与保存状态的官方迁移教程。
2. Hugging Face, [Launch your Accelerate scripts](https://huggingface.co/docs/accelerate/main/en/basic_tutorials/launch)：配置与启动方式。
3. Hugging Face, [DeepSpeed integration](https://huggingface.co/docs/accelerate/main/en/usage_guides/deepspeed)：Accelerate 接入 DeepSpeed 的配置和适用范围。
4. Hugging Face, [Fully Sharded Data Parallel](https://huggingface.co/docs/accelerate/main/en/usage_guides/fsdp)：Accelerate 接入 PyTorch FSDP 的配置。

