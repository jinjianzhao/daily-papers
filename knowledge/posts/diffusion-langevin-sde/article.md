# 从朗之万动力学到随机微分方程：扩散模型的连续时间视角

扩散模型常被描述为“先把数据逐步加噪，再学习反向去噪”。这个说法适合入门，但它容易把几个不同层次的概念混在一起：**score** 是一个关于概率密度的向量场，**朗之万动力学**是一种利用这个向量场采样的方法，**随机微分方程（SDE）**则把“很多个很小的加噪步骤”写成连续时间的随机过程。

本文从一个简单问题出发：如果手里只有高斯噪声，怎样沿着一个可计算的方向，逐步走回真实数据分布？然后把 Langevin dynamics、score-based model、DDPM、反向 SDE 和 probability flow ODE 放到同一张图里。读者已经理解 Transformer 的前向计算，但不要求事先读过随机过程教材。

## 1. 先建立直觉：生成是在概率密度里“逆着走”

设真实数据（例如图片）是随机变量 $x$，它的分布记作 $p_0(x)$。我们通常没有这个分布的解析表达式，只有训练样本。生成模型的目标是：从一个容易采样的先验（例如标准高斯 $p_T(x)$）出发，得到一个看起来来自 $p_0$ 的样本。

可以把概率密度想成一张地形图。高概率区域像山峰，低概率区域像低地。若知道

$$
s(x)=\nabla_x\log p(x),
$$

就知道在当前位置稍微移动时，概率密度上升最快的方向。这个向量称为 **score**。它不是分类标签，也不是“正确图片”；它只告诉我们局部的概率上升方向和幅度。

对一个简单的正态分布 $p(x)=\mathcal N(0,\sigma^2I)$，有

$$
\nabla_x\log p(x)=-\frac{x}{\sigma^2}.
$$

也就是说，离原点越远，越应该朝原点走。真实图片分布的 score 复杂得多，于是我们训练神经网络 $s_\theta(x,t)$，让它在不同噪声水平或时间 $t$ 下近似这个向量场。

## 2. 朗之万动力学：沿 score 走，但每一步仍保留随机性

### 2.1 基本更新式

最简单的朗之万动力学（Langevin dynamics）可以写为：

$$
x_{k+1}=x_k+\epsilon\,\nabla_x\log p(x_k)+\sqrt{2\epsilon}\,z_k,
\qquad z_k\sim\mathcal N(0,I).
$$

第一项是沿着高概率方向的确定性移动；第二项是高斯随机扰动。只沿 score 移动会把许多初始点都推到某个局部峰值，失去分布的多样性；只加随机噪声又不会特别偏向数据区域。二者结合后，在步长足够小、运行足够久且满足一定条件时，马尔可夫链可以接近目标分布。

### 2.2 扩散模型为什么要用一组噪声水平

直接在原始图片分布上估计 score 很难：数据只占据高维空间中很薄的区域，离开数据流形后密度梯度可能不稳定。一个常见办法是把数据加上不同强度的高斯噪声：

$$
\tilde x=x+\sigma z,\qquad z\sim\mathcal N(0,I).
$$

当 $\sigma$ 较大时，分布被平滑，score 更容易学习；当 $\sigma$ 逐渐减小时，分布逐渐接近原始数据。Song 与 Ermon 的 SMLD（score matching with Langevin dynamics）为每个噪声尺度训练一个条件 score 网络，然后在生成时从大噪声开始，使用 Langevin 更新并逐级降低噪声尺度。

网络学习的不是未知边缘分布 score 的直接标签，而是使用去噪 score matching 的目标。对于已知的扰动核 $p_\sigma(\tilde x\mid x)=\mathcal N(x,\sigma^2I)$，条件 score 有解析形式：

$$
\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)
=-\frac{\tilde x-x}{\sigma^2}.
$$

因此训练时可以取一张真实样本 $x$、一个噪声尺度 $\sigma$ 和随机噪声，构造 $\tilde x$，再让网络 $s_\theta(\tilde x,\sigma)$ 拟合上式。这里的“监督”来自我们自己知道的加噪过程，而不是人工给每个生成结果标一个正确答案。

一个最小的采样伪代码如下：

```python
# sigmas: 从大到小排列的噪声尺度
x = torch.randn(shape, device=device) * sigmas[0]
for sigma in sigmas:
    for _ in range(num_corrector_steps):
        score = score_model(x, sigma)
        z = torch.randn_like(x)
        # Langevin corrector：沿 score 修正，同时保留随机探索
        step = step_size(sigma)
        x = x + step * score + (2 * step).sqrt() * z
    # predictor：把状态推进到下一个更小噪声尺度
    x = predictor_step(x, sigma, next_sigma, score_model)
return x
```

上面把“校正器”与“预测器”分开写，是为了帮助理解。实际实现会根据所选噪声参数化和数值求解器使用不同的步长与公式。

## 3. 从离散步骤到 SDE

### 3.1 前向 SDE 做什么

Song 等人在 *Score-Based Generative Modeling through Stochastic Differential Equations* 中把加噪过程写成 Itô SDE：

$$
\mathrm d x=f(x,t)\,\mathrm dt+g(t)\,\mathrm d w,
$$

其中：

- $f(x,t)$ 是 **drift（漂移）**，表示不带随机性的平均运动方向；
- $g(t)$ 是 **diffusion coefficient（扩散系数）**，控制随机扰动强度；
- $w(t)$ 是 Wiener process（布朗运动）。

从 $t=0$ 到 $t=T$，我们设计 $f$ 和 $g$，使 $x(0)$ 服从数据分布 $p_0$，而 $x(T)$ 接近易采样的先验分布 $p_T$，通常是高斯。这个过程本身不需要学习参数；它是我们选择的“加噪规则”。

把时间离散成很小的 $\Delta t$，Euler–Maruyama 近似为：

$$
x_{t+\Delta t}\approx x_t+f(x_t,t)\Delta t+g(t)\sqrt{\Delta t}\,z_t,
\qquad z_t\sim\mathcal N(0,I).
$$

这就把 SDE 与常见的逐步加噪联系起来了：每一步是漂移项加上一个按 $\sqrt{\Delta t}$ 缩放的随机噪声项。

### 3.2 两个常见的连续时间家族

论文指出，已有的 SMLD 和 DDPM 可以看成不同 SDE 的离散化：

- **Variance Exploding（VE）SDE**：主要不断增大噪声方差，常写成 $\mathrm dx=\sqrt{\frac{\mathrm d[\sigma^2(t)]}{\mathrm dt}}\,\mathrm dw$，对应 SMLD 一类的扰动；
- **Variance Preserving（VP）SDE**：同时衰减原信号并加入噪声，形式为
  $$
  \mathrm dx=-\frac12\beta(t)x\,\mathrm dt+\sqrt{\beta(t)}\,\mathrm dw,
  $$
  与 DDPM 的离散前向链相对应。

这不是说“DDPM 和 SDE 是两个互不相关的模型”，而是说离散扩散链可以被放进连续时间框架。选择 VE、VP 或 sub-VP，决定的是前向噪声路径与对应的数值性质；score 网络和反向求解仍是生成的核心。

## 4. 反向时间 SDE：从噪声回到数据

前向 SDE 是把数据变成噪声，生成时要反向积分。论文给出的反向时间 SDE（按从 $T$ 向 $0$ 的方向理解）为：

$$
\mathrm d x=\left[f(x,t)-g(t)^2\nabla_x\log p_t(x)\right]\mathrm dt+g(t)\,\mathrm d\bar w,
$$

其中 $p_t$ 是时刻 $t$ 的边缘分布，$\bar w$ 是反向时间下的 Wiener process。关键点在于：反向漂移多了一个由 score 决定的项 $-g(t)^2\nabla_x\log p_t(x)$。只要能用神经网络近似

$$
s_\theta(x,t)\approx\nabla_x\log p_t(x),
$$

就可以从 $x(T)\sim p_T$ 出发，用数值 SDE 求解器一步步得到 $x(0)$。

这里要区分三个东西：

1. **前向 SDE**是人为规定的加噪过程；
2. **score 网络**是训练出来的局部方向场；
3. **反向 SDE 求解器**是在采样时执行的数值积分方法。

网络不是直接输出最终图片，也不是把一张噪声图片一次性翻译成答案；它在当前时间和当前状态上提供一个局部导数，求解器负责反复调用它。

## 5. DDPM、score-based SDE 与 Langevin 的关系

### 5.1 DDPM 在做什么

DDPM 使用有限个时间步 $t=1,\ldots,T$，前向链常写成：

$$
x_t=\sqrt{1-\beta_t}\,x_{t-1}+\sqrt{\beta_t}\,\epsilon_t,
\qquad \epsilon_t\sim\mathcal N(0,I).
$$

训练时随机抽一个时间步，把 $x_0$ 加噪得到 $x_t$，让网络预测噪声（或等价的 $x_0$、$v$ 参数化）。采样时使用模型预测的量构造近似的 $p_\theta(x_{t-1}\mid x_t)$，从高斯噪声逐步回到数据。

DDPM 的训练看起来是“预测噪声”，而 SDE 文献看起来是“预测 score”。二者在高斯扰动下可以互相换算：若 $x_t=\alpha_t x_0+\sigma_t\epsilon$，噪声预测器 $\epsilon_\theta$ 与 score 的关系（在常见参数化下）近似为

$$
s_\theta(x_t,t)\approx-\frac{\epsilon_\theta(x_t,t)}{\sigma_t}.
$$

因此 DDPM 的离散反向链可以理解为一种离散的 score-based 采样过程；但具体损失权重、网络参数化和采样公式仍以各自实现为准，不能把所有细节都简化成一个公式。

### 5.2 score-based SDE 提供的统一视角

连续时间框架把噪声水平改成 $t\in[0,T]$，训练一个带时间条件的 score 网络，并用数值求解器选择采样路径。它的主要价值是把不同的离散方法放进同一个对象中，并允许更灵活的采样器，例如 predictor–corrector（预测–校正）采样。

### 5.3 Langevin 在整个体系中的位置

Langevin dynamics 不是另一个与 DDPM 平行的“网络架构”。它是一种利用 score 进行随机采样的数值方法。在 predictor–corrector 框架中，SDE 求解器负责把状态沿时间推进（predictor），Langevin MCMC 可以作为 corrector，在当前噪声层附近利用 score 做若干次局部修正。

## 6. Probability flow ODE：去掉随机项，但保持边缘分布

同一个前向 SDE 还存在一个确定性的常微分方程（ODE）：

$$
\mathrm d x=\left[f(x,t)-\frac12g(t)^2\nabla_x\log p_t(x)\right]\mathrm dt.
$$

这叫 **probability flow ODE**。它没有 $\mathrm d\bar w$，所以给定初值后轨迹是确定的；但在理想 score 已知时，它与原 SDE 在每个时间点的边缘分布 $\{p_t\}$ 相同。换句话说，SDE 的每条轨迹是随机的，ODE 的轨迹是确定的，但两者在同一时间截面的总体分布可以一致。

这带来两个用途：

- 可以使用自适应 ODE 求解器，在精度与步数之间折中；
- 通过神经 ODE 的瞬时变量变换公式，可以计算数据的 exact likelihood（在论文所述连续模型和数值条件下）。

它并不意味着 ODE 总是比 SDE 生成质量更好。实际速度、误差和质量取决于 score 近似、求解器、容差以及模型配置。

## 7. 用一个一维例子把全流程串起来

假设训练数据由两个一维高斯簇组成，真实分布在 $x=-2$ 与 $x=2$ 附近各有一座“山”。我们做如下训练与生成：

1. 从数据取 $x_0$，随机采样时间 $t$，按前向 SDE 或其闭式扰动得到 $x_t$；
2. 计算这次扰动的目标 score，或构造等价的噪声预测目标；
3. 更新 $s_\theta(x_t,t)$，让它在两个簇附近指向高概率区域，在簇之间体现概率梯度；
4. 生成时从接近高斯的 $x_T$ 开始；
5. 反向 SDE 的每个小步先使用 score 改变漂移，再加入相应的随机扰动；
6. 经过许多步后，样本会落到左簇或右簇，而不同随机噪声会产生不同选择；
7. 若改用 probability flow ODE，则给定同一初始噪声，轨迹不再注入随机项，但整体样本分布在理想条件下仍与 SDE 相同。

这个例子也说明了为什么 score 不是“答案”：在中间位置，score 只告诉我们向哪一座高概率区域移动；最终落到哪一边，还受到初始状态、噪声路径和求解器的共同影响。

## 8. 常见混淆与实现检查清单

- **score 不是噪声本身。** 网络可以预测噪声，再按噪声尺度换算为 score；二者是参数化关系，不是同一个张量含义。
- **前向加噪不需要训练。** 训练的是 score/噪声预测网络；前向 SDE 的系数和时间调度由设计者指定。
- **训练目标不是人工正确答案。** 对高斯扰动，条件 score 或噪声是可计算的，因此可以用回归损失训练；“没有类别标签”不等于没有训练信号。
- **反向 SDE 不是把前向公式的时间索引倒过来。** 反向漂移中有 score 修正项，且数值积分方向、噪声尺度和求解器必须一致。
- **ODE 与 SDE 共享 score，但采样性质不同。** 一个保留随机扰动，一个没有；两者在理想条件下共享边缘分布，不代表有限步近似完全相同。
- **连续时间不是免费加速。** SDE/ODE 只是描述框架，实际速度由求解器步数、网络调用次数和硬件实现决定。

## 9. 资料与进一步阅读

1. Yang Song, Jascha Sohl-Dickstein, Diederik P. Kingma, Abhishek Kumar, Stefano Ermon, Ben Poole. “Score-Based Generative Modeling through Stochastic Differential Equations.” arXiv:2011.13456（论文正文、公式与摘要）：<https://arxiv.org/abs/2011.13456>。
2. Jonathan Ho, Ajay Jain, Pieter Abbeel. “Denoising Diffusion Probabilistic Models.” arXiv:2006.11239（DDPM 离散加噪链与反向生成的原始论文）：<https://arxiv.org/abs/2006.11239>。
3. Yang Song, Stefano Ermon. “Generative Modeling by Estimating Gradients of the Data Distribution.” NeurIPS 2019（多噪声尺度 score matching 与 Langevin 采样的先行工作）：<https://arxiv.org/abs/1907.05600>。

本文中关于 SDE、反向时间 SDE、predictor–corrector 与 probability flow ODE 的具体公式和统一关系以第 1 篇论文为依据；关于 DDPM 离散链的描述以第 2 篇论文为依据。教学类比和一维示例是为了帮助理解，不是这些论文的实验结论。

## QA

暂无问答。
