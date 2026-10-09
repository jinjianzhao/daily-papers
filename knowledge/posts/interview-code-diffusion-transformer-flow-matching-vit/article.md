# 手撕 Diffusion、Transformer、Flow Matching、ViT

## 先说明资料边界

这篇不是某一家公司的内部题库，而是把公开面经中反复出现的“从公式写到 PyTorch”的题型整理成一个复习入口。面经帖子更新快、质量也不稳定，所以页面同时给出检索入口和可核对的公开代码资料；不要把搜索结果中的每一道题都当作固定题库。

## 面经检索入口

- [牛客：扩散模型手撕代码](https://www.nowcoder.com/search?query=%E6%89%A9%E6%95%A3%E6%A8%A1%E5%9E%8B%20%E6%89%8B%E6%92%95%E4%BB%A3%E7%A0%81)
- [牛客：Transformer 手撕代码](https://www.nowcoder.com/search?query=Transformer%20%E6%89%8B%E6%92%95%E4%BB%A3%E7%A0%81)
- [牛客：Flow Matching 面经](https://www.nowcoder.com/search?query=Flow%20Matching%20%E9%9D%A2%E7%BB%8F)
- [牛客：ViT 手撕代码](https://www.nowcoder.com/search?query=ViT%20%E6%89%8B%E6%92%95%E4%BB%A3%E7%A0%81)
- [知乎：AI 算法手撕代码与面经](https://www.zhihu.com/search?type=content&q=AI%20%E7%AE%97%E6%B3%95%20%E6%89%8B%E6%92%95%E4%BB%A3%E7%A0%81%20%E9%9D%A2%E7%BB%8F)
- [GitHub：AI 面试代码检索](https://github.com/search?q=deep+learning+interview+pytorch&type=repositories)

这些是检索入口，不代表每个结果都已审核。真正准备时，应记录题目原文、公司/岗位、发布时间和是否有可运行代码。

## 1. Diffusion：前向加噪、反向预测与训练损失

### 高频考法

通常要求写出 beta schedule、从干净样本得到 `x_t` 的前向加噪，以及一个预测噪声的训练 step。采样时还要能解释为什么需要 `alpha_bar` 和 posterior variance。

### 先把输入、输出和公式对齐

- 输入：干净样本 `x0`，形状通常是 `[B, C, H, W]`，以及每个样本自己的离散时间步 `t`，形状是 `[B]`。
- 输出：带噪样本 `xt` 和训练目标噪声 `epsilon`。模型接收 `xt`、`t`，预测同一个 `epsilon`。
- 前向过程：`xt = sqrt(alpha_bar_t) * x0 + sqrt(1 - alpha_bar_t) * epsilon`。`alpha_bar_t` 是从第 1 步到第 `t` 步的累计保留信号比例。

### 最小可写代码

下面这段代码把公式直接翻译成张量操作；面试时不只要能写，还要能解释每次 reshape 是为了哪一次广播。

:::collapse id="diffusion-code" title="展开：手写 Diffusion 前向加噪与训练损失"

```python
import torch

def q_sample(x0, t, alpha_bar, noise=None):
    """根据 DDPM 前向公式，一步得到每个样本的 x_t。

    x0: [B, ...]；t: [B]；alpha_bar: [T]。
    """
    # 不传 noise 时才重新采样；传入 noise 便于单元测试复现结果。
    noise = torch.randn_like(x0) if noise is None else noise
    # 每个 batch 样本可以有不同 t，因此这里不能写成一个标量。
    a = alpha_bar[t].to(x0.device)
    # [B] -> [B, 1, ...]，让它和 [B, C, H, W] 等形状正确广播。
    while a.ndim < x0.ndim:
        a = a[..., None]
    # 这是 x_t = sqrt(a_bar) x_0 + sqrt(1-a_bar) epsilon。
    xt = a.sqrt() * x0 + (1.0 - a).sqrt() * noise
    return xt, noise

def diffusion_loss(model, x0, t, alpha_bar):
    # 训练模型预测 epsilon；如果改成 v-prediction，目标和损失也要一起改。
    xt, noise = q_sample(x0, t, alpha_bar)
    predicted_noise = model(xt, t)
    return torch.nn.functional.mse_loss(predicted_noise, noise)
```

**逐行检查重点：** `alpha_bar[t]` 是按样本索引，不是把整个 batch 强行设为同一个时间步；广播维度必须从 batch 维开始对齐；模型的时间步编码和损失目标必须使用同一种参数化。采样阶段则需要根据预测结果计算 `x_{t-1}`，不能把训练的 `q_sample` 当成反向采样器。

:::

### 面试时必须讲清楚

- `t` 是每个样本的时间步，不要把 batch 中所有样本强行用同一个时间步。
- `alpha_bar[t]` 要 reshape 成 `[B, 1, ...]` 才能和图像广播。
- 预测目标可以是噪声、`x_0` 或 velocity；代码里的损失必须和参数化方式一致。

### 公开代码参考

- [Hugging Face Diffusers 文档](https://huggingface.co/docs/diffusers/index)
- [lucidrains/denoising-diffusion-pytorch](https://github.com/lucidrains/denoising-diffusion-pytorch)

## 2. Transformer：手写多头自注意力

### 高频考法

给定 `x: [B, N, D]`，现场实现 Q/K/V、缩放点积注意力、mask 和多头合并。最容易出错的是 head 维度、mask 的广播方向以及 softmax 的维度。

### 先把输入、输出和张量布局对齐

- 输入：`x`，形状 `[B, N, D]`，其中 `N` 是 token 数，`D` 是隐藏维度。
- 输出：仍是 `[B, N, D]`，每个 token 聚合了其他 token 的信息。
- 核心计算：`softmax(QK^T / sqrt(d_head))V`；多头只是把 `D` 切成多个 `d_head`，并行计算后再拼回去。

### 最小可写代码

:::collapse id="attention-code" title="展开：手写多头自注意力"

```python
import math
import torch
from torch import nn

class MultiHeadSelfAttention(nn.Module):
    def __init__(self, dim, heads):
        super().__init__()
        assert dim % heads == 0
        self.heads, self.head_dim = heads, dim // heads
        self.qkv = nn.Linear(dim, 3 * dim)
        self.out = nn.Linear(dim, dim)

    def forward(self, x, mask=None):
        b, n, d = x.shape
        # 一次线性层得到 Q、K、V，再沿最后一维切成三份。
        q, k, v = self.qkv(x).chunk(3, dim=-1)
        shape = (b, n, self.heads, self.head_dim)
        # [B, N, heads, head_dim] -> [B, heads, N, head_dim]，
        # 这样矩阵乘法的两个 N 维才能形成 [B, heads, N, N] 注意力分数。
        q = q.view(shape).transpose(1, 2)
        k = k.view(shape).transpose(1, 2)
        v = v.view(shape).transpose(1, 2)
        # 缩放避免 head_dim 较大时点积方差过大，导致 softmax 饱和。
        score = q @ k.transpose(-2, -1) / math.sqrt(self.head_dim)
        if mask is not None:
            # 这里假设 mask 是 [B, N] 的 padding mask；causal mask
            # 通常是 [N, N] 或可广播到该形状，语义不能混用。
            score = score.masked_fill(~mask[:, None, None, :], float('-inf'))
        weight = score.softmax(dim=-1)
        # 沿 key/token 维加权求和，再把各个 head 拼回 D。
        y = (weight @ v).transpose(1, 2).contiguous().view(b, n, d)
        return self.out(y)
```

**逐行检查重点：** `softmax(dim=-1)` 是对每个 query 的所有 key 归一化；`transpose(1, 2)` 后的布局决定了矩阵乘法是否正确；一个完整 Transformer block 还需要残差、LayerNorm 和前馈网络，这段代码只实现 attention 子层。

:::

### 面试时必须讲清楚

- attention 的复杂度随 token 数量平方增长。
- padding mask 和 causal mask 的形状语义不同，不能只写一个固定 `masked_fill`。
- 一个完整 Transformer block 还包括残差、LayerNorm 和前馈网络；只写 attention 不等于写完 block。

### 公开代码参考

- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)
- [PyTorch MultiheadAttention](https://pytorch.org/docs/stable/generated/torch.nn.MultiheadAttention.html)

## 3. Flow Matching：直线路径和速度场回归

### 高频考法

常见题目是给定数据样本 `x_1` 和噪声 `x_0`，写出插值路径 `x_t`、目标速度，以及模型的回归损失。关键不是背采样器，而是理解模型学习的是哪一个向量场。

### 先把输入、输出和连续时间对齐

- 输入：数据样本 `x1`，形状可以是 `[B, ...]`；随机噪声 `x0` 与它同形状；连续时间 `t` 属于 `[0, 1]`。
- 中间量：直线路径 `xt = (1-t)x0 + tx1`。
- 输出：模型预测速度 `v_theta(xt,t)`，监督目标是这条直线的速度 `x1-x0`。

### 最小可写代码

:::collapse id="flow-matching-code" title="展开：手写 Flow Matching 训练目标"

```python
import torch
import torch.nn.functional as F

def flow_matching_loss(model, x1):
    # x0 是源分布噪声，x1 是目标数据；二者形状必须完全一致。
    x0 = torch.randn_like(x1)
    # 每个样本独立采样连续时间，而不是只采一个 batch 共享的标量。
    t = torch.rand(x1.shape[0], device=x1.device)
    # 从 [B] 变成 [B, 1, ...]，以便和图像/特征张量广播。
    view = (t.shape[0],) + (1,) * (x1.ndim - 1)
    t = t.view(view)
    # 最简单的 conditional flow matching：连接 x0 和 x1 的直线路径。
    xt = (1.0 - t) * x0 + t * x1
    # 对直线路径求 dt 导数，目标速度恒为 x1 - x0。
    target_velocity = x1 - x0
    # 模型接口通常希望 t 是 [B]，所以这里还原形状。
    predicted_velocity = model(xt, t.flatten())
    return F.mse_loss(predicted_velocity, target_velocity)
```

**逐行检查重点：** 这里的 `t` 是连续时间，不是 DDPM 的整数 timestep；换一条路径就必须重新推导目标速度。推理时模型不直接“一步吐出答案”，而是解 ODE，例如 Euler 更新 `x <- x + dt * v_theta(x,t)`。

:::

### 面试时必须讲清楚

- 这里的 `t` 是连续时间，和 DDPM 的离散 timestep 不是同一个对象。
- 直线路径只是最常见的 conditional flow matching 选择；换路径就要换目标速度。
- 推理阶段需要解 ODE，Euler 更新就是 `x <- x + dt * v_theta(x,t)`。

### 公开代码参考

- [facebookresearch/flow_matching](https://github.com/facebookresearch/flow_matching)
- [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747)

## 4. ViT：patchify、位置编码和分类 token

### 高频考法

通常要求把 `[B, C, H, W]` 图像切成 patch，展平后映射成 token，再拼接 class token 和位置编码。要能说清楚 patch 数量是 `(H / P) * (W / P)`。

### 先把输入、输出和 token 数量对齐

- 输入：图像 `[B, C, H, W]`，要求 `H`、`W` 能被 patch size `P` 整除。
- 输出：`[B, 1 + (H/P)(W/P), D]`，最前面的 1 是 class token。
- `Conv2d(kernel_size=P, stride=P)` 等价于不重叠切 patch，再把每个 patch 映射到 `D` 维。

### 最小可写代码

:::collapse id="vit-code" title="展开：手写 ViT Patch Embedding"

```python
import torch
from torch import nn

class PatchEmbed(nn.Module):
    def __init__(self, image_size=224, patch_size=16, channels=3, dim=768):
        super().__init__()
        assert image_size % patch_size == 0
        self.proj = nn.Conv2d(channels, dim, patch_size, patch_size)
        n = (image_size // patch_size) ** 2
        self.cls = nn.Parameter(torch.zeros(1, 1, dim))
        self.pos = nn.Parameter(torch.zeros(1, n + 1, dim))

    def forward(self, image):
        b = image.shape[0]
        # [B, D, H/P, W/P] -> [B, N, D]，N=(H/P)*(W/P)。
        patch = self.proj(image).flatten(2).transpose(1, 2)
        # 每个样本共享一个可学习的 class token，但 batch 维要扩展出来。
        cls = self.cls.expand(b, -1, -1)
        # class token 放在最前面，再加上与 token 数量对应的位置编码。
        return torch.cat([cls, patch], dim=1) + self.pos
```

**逐行检查重点：** patch embedding 只是 ViT 的输入层，后面仍需 Transformer encoder；如果推理分辨率变化，`self.pos` 的 token 数量也会变化，通常要对二维位置编码插值，不能直接相加。

:::

### 面试时必须讲清楚

- Conv2d 的 kernel 和 stride 都是 patch size，因此不会产生重叠 patch。
- 输入分辨率变化时，位置编码通常需要插值，不能直接假设 token 数量不变。
- ViT 的 patch embedding 只是输入层，后面仍然是 Transformer encoder。

### 公开代码参考

- [google-research/vision_transformer](https://github.com/google-research/vision_transformer)
- [timm Vision Transformer](https://github.com/huggingface/pytorch-image-models)

## 建议复习顺序

先独立写出 Transformer attention 和 ViT patchify，再写 Diffusion 的 `q_sample`，最后写 Flow Matching 的连续时间插值。每道题都要自己补 shape 注释、随机输入测试和一个最小 loss；面经只用于发现题型，最终以公式和代码行为为准。
