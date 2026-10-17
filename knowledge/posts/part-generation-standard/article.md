# 3D部件生成：从整体到零件

> 面向刚入学、熟悉基本 Transformer 但还不熟悉 3D 生成的博士生。本文先建立一个可比较的“部件生成”范式，再分别说明 Hunyuan3D-Part（官方发布的 P3-SAM + X-Part 流程）、PartCrafter 和 CubePart 的实际选择。这里的“标准范式”是为了帮助阅读，不是任何一篇论文宣称的统一标准。

## 先把问题说清楚：什么叫部件生成

普通的 3D 生成模型往往把一个物体当成一个整体，最后输出一个 mesh。部件生成要多回答一个问题：这个整体由哪些有语义的组件组成？例如一辆车可以拆成车身、四个轮子、车门和方向盘；每个组件最好是独立的 3D 几何，而不是只在一张图片上画出一个分割颜色。

因此，部件生成通常同时追求三件事：

1. **几何完整**：从有限的输入中补全不可见区域，而不是只复制可见表面。
2. **结构有意义**：输出的每个子网格对应一个可以说清楚的部件。
3. **整体能装配**：部件放回同一个坐标系后，位置、尺度和接触关系合理。

这和“把 mesh 随便切成很多块”不同。后者可能有分割结果，但不一定有稳定的语义，也不一定能用于编辑、贴图、动画或物理模拟。

## 一个可比较的标准范式

### 1. 输入：整体条件和部件条件

输入可以来自不同模态：单张 RGB 图像、文本、整体 3D mesh/点云，或者“整体条件 + 部件清单”。部件清单可以是固定类别（例如 chair-leg），也可以是开放词汇的自然语言列表（例如 `body, left door, four wheels`）。

要特别区分两类任务：

- **生成式分解**：输入整体形状或图像，模型同时推断部件划分并生成完整部件几何；
- **条件式生成**：用户已经给出部件框、部件名或 schema，模型按这些条件生成部件。

同样写着“part generation”的论文，可能处在这两个位置中的不同位置。

### 2. 部件表示：让一个部件能被模型处理

常见做法是先用 3D VAE 把 mesh、点云或隐式场压缩成 latent tokens，再在 latent 空间做扩散或 flow matching。对于 (N) 个部件，可以写成

\[
\mathcal{Z}=\{\mathbf z_1,\ldots,\mathbf z_N\},\qquad \mathbf z_i\in\mathbb{R}^{K\times C}.
\]

每个 \(\mathbf z_i\) 是第 (i) 个部件的一组 token；部件 ID embedding、部件文本或空间框可以帮助模型区分它们。解码器再把每组 latent 还原为独立 mesh。若所有部件使用同一个全局坐标系，就不需要生成后再猜测每个部件的平移和旋转。

### 3. 全局与局部：两种信息必须同时流动

只做局部建模，轮子可能各自像轮子，但彼此位置和尺度不协调；只做全局建模，又容易让不同部件粘连或失去独立性。因此常见的网络会交替或并行处理：

- **局部注意力**：在单个部件的 token 内建模，保持该部件的细节和边界；
- **全局/跨部件注意力**：在所有部件 token 之间交换信息，约束整体形状、接触和相对位置；
- **条件注入**：将图像特征、文本、部件框或整体 latent 通过 cross-attention 注入去噪网络。

扩散训练的抽象过程是：对真实部件 latent 加噪，网络根据时间步和条件预测噪声或速度；推理时从噪声开始逐步得到各部件 latent，再由 3D 解码器输出 mesh。flow matching 只是把“预测噪声”换成沿噪声到数据的轨迹预测速度，主线仍然是条件生成。

### 4. 装配与输出

最后要检查每个部件是否仍处在统一坐标系、是否出现重叠或空洞、是否漏掉不可见部件。输出通常是一个 mesh 集合

\[
\mathcal{O}=\{(\mathcal{V}_i,\mathcal{F}_i,\text{name}_i)\}_{i=1}^{N},
\]

而不只是一个合并后的网格。这样的结果可以分别贴图、编辑、绑定脚本或送入仿真。是否真的支持这些下游应用，仍要看论文的实验，不能仅从输出格式推断。

### 5. 训练链路的关键差异

一个典型链路是：准备带部件标注的数据 → 训练或复用 3D VAE → 在部件 latent 上训练 DiT/flow 模型 → 用图像、文本或几何条件做去噪 → 解码并评估部件质量、结构一致性和装配质量。差异主要来自三处：部件标注如何获得、部件 schema 是模型推断还是用户指定、以及全局-局部信息是在一个模型里联合生成还是分阶段生成。

## 一、Hunyuan3D-Part：先识别部件，再生成完整部件

### 先澄清论文边界

“Hunyuan3D-Part”是腾讯官方仓库对一套 pipeline 的称呼，不是一篇同名论文。仓库明确包含两个组件：**P3-SAM: Native 3D Part Segmentation**（[arXiv:2509.06784](https://arxiv.org/abs/2509.06784)）与 **𝒳-Part: high fidelity and structure coherent shape decomposition**（[arXiv:2509.08643](https://arxiv.org/abs/2509.08643)）。官方代码仓库是 [Tencent-Hunyuan/Hunyuan3D-Part](https://github.com/Tencent-Hunyuan/Hunyuan3D-Part)。因此下面把它们作为一个“分割 + 生成”的工程流程讲，但不把它误写成一篇论文。

### P3-SAM 做什么

P3-SAM 的输入是 3D 对象（论文以点云/网格采样表示），目标是自动得到部件 mask、部件特征和部件 bounding box。论文提出一个受 SAM 启发的原生 3D、可点提示分割模型，并设计自动选择和合并 mask 的算法，使流程不必预先固定类别词表。论文还构建了约 370 万模型规模的数据集，用于学习部件分割。

![P3-SAM 的 3D 部件分割示意图](https://arxiv.org/html/2509.06784v4/fig/teaser.jpg)

*图：P3-SAM 的结果示意。来源：[P3-SAM HTML，Figure 1](https://arxiv.org/html/2509.06784v4#S0.F1)。*

### 𝒳-Part 如何从整体得到完整部件

𝒳-Part 接收整体点云、P3-SAM 提供的部件框和逐点语义特征。它先用 3D VAE 把形状变成 latent token，再用基于 DiT 的 flow/diffusion 模型同步生成多个部件 latent。部件框提供较粗的空间约束，语义特征补充“这块几何属于什么部件”的信息；相比直接把硬分割 mask 当作条件，论文认为这种条件对分割误差更稳健。

它的训练是 flow matching：将部件 latent \(\mathbf z_0\) 与高斯噪声线性混合，模型预测把噪声状态推向数据状态的速度。所有部件共享噪声时间步，并在网络中做跨部件注意力，因此部件不是彼此独立地生成。推理时可以只重新采样某些部件的 latent，保留其他部件，实现分裂、合并或局部调整式编辑。

![𝒳-Part 的生成流程图](https://arxiv.org/html/2509.08643v2/figs/pipeline_v3.jpg)

*图：𝒳-Part 的输入条件、同步多部件扩散和输出。来源：[𝒳-Part HTML，Figure 1](https://arxiv.org/html/2509.08643v2#S3.F1)。*

### 它在标准范式中的位置

Hunyuan3D-Part 属于“**先从整体几何提取部件条件，再做条件式几何生成**”。它的强项是可以补全输入表面没有直接观测到的部件几何，并通过部件框提供可编辑控制；它不是单张图像直接生成部件的端到端模型。官方仓库也提示，𝒳-Part 更推荐把扫描或 AI 生成的 mesh 作为输入，而 P3-SAM 可以处理更一般的输入 mesh。

论文报告的限制包括：几何线索还没有物理原则指导，可能不符合某些应用特定的分解需求；所有部件同时在扩散模型中处理，部件数增加会使推理变慢。

## 二、PartCrafter：从一张图像同时生成多组部件 latent

论文全名是 **PartCrafter: Structured 3D Mesh Generation via Compositional Latent Diffusion Transformers**（[arXiv:2506.05573](https://arxiv.org/abs/2506.05573)，[项目页](https://wgsxm.github.io/projects/partcrafter/)）。它的目标是：给定单张 RGB 图像和要生成的部件数，同时输出多个语义上有意义、几何上分离的 mesh；不要求先给图像做显式部件分割。

![PartCrafter 的网络结构](https://arxiv.org/html/2506.05573v1/overview.png)

*图：PartCrafter 的 local-global attention 与部件 ID embedding。来源：[PartCrafter HTML，Figure 2](https://arxiv.org/html/2506.05573v1#S3.F2)。*

### 它怎样改造普通的 3D 生成模型

PartCrafter 建立在预训练的整体物体 mesh 生成模型 TripoSG 之上。普通模型只有一组整体 latent；PartCrafter 把它扩展成 (N) 组 latent，每组对应一个部件，并给每组加入可学习的 part ID embedding。训练时随机打乱部件顺序，减少模型把“第一个 token 永远当成轮子”这类顺序依赖。

去噪网络使用分层注意力：先在每组 token 内做 local attention，再在所有组的拼接 token 上做 global attention。图像的 DINOv2 特征在局部和全局两条路径都通过 cross-attention 注入。这样一方面保持单个部件的内部几何，另一方面让轮子、车身等部件共同解释同一张图像。

训练仍然是 rectified flow matching。若真实部件 latent 为 \(\mathcal Z_0\)，噪声为 \(\epsilon\)，则使用 \(\mathcal Z_t=t\mathcal Z_0+(1-t)\epsilon\)，并预测速度 \(\epsilon-\mathcal Z_0\)。推理阶段所有部件一起去噪并解码；各部件顶点使用同一个全局 canonical space，因此可以直接装配。

### 它解决了什么、还缺什么

PartCrafter 的一个重要能力是补全输入图像中不可见的部件；这正是“先做 2D 分割、再逐部件重建”的方案容易失败的地方。论文用约 13 万个对象构建候选数据，过滤后得到约 5 万个带部件标注的对象、约 30 万个部件，并报告可以在不同部件数量下生成结果。

但它不是无限开放的部件 schema 生成器：推理时需要给定部件数，部件身份主要由训练得到的 part ID 和数据结构承载。论文也明确指出，5 万规模的部件数据相较整体 3D 生成模型使用的数据仍然较小；这会限制泛化到罕见类别和复杂分解。

## 三、CubePart：把部件 schema 变成推理时的控制信号

论文全名是 **CubePart: An Open-Vocabulary Part-Controllable 3D Generator**（[arXiv:2605.28763](https://arxiv.org/abs/2605.28763)，[项目页](https://cubepart.github.io/)）。它的核心问题不是“模型自己决定怎么切”，而是让用户在推理时直接给出开放词汇的部件列表。例如输入全局描述“a sleek sports car”，再给出 `body, wheels, doors, engine` 这样的 schema；输出应包含与列表对应的一组独立 mesh。

![CubePart 的两阶段生成架构](https://arxiv.org/html/2605.28763v1/method.png)

*图：CubePart 先生成整体 mesh，再把整体 latent 解码为多部件 mesh。来源：[CubePart HTML，Figure 2](https://arxiv.org/html/2605.28763v1#S2.F2)。*

### 两阶段结构

**第一阶段：Single Mesh Generation。** 模型用文本条件的 MM-DiT 生成整体 shape latent。文本由 Qwen-VL 编码，训练先使用约 470 万个 mesh-text 对做文本到 3D 预训练，再用显式列举部件的 prompt 做 schema-aware 微调。这样先建立“这个整体长什么样”的几何先验。

**第二阶段：Multi-Mesh Generation。** 在整体 latent 的基础上，为每个 schema 元素生成一组 part latent。模型从第一阶段继承 MM-DiT 权重，并插入零初始化的 cross-part attention residual block，让不同部件共享整体形状信息，同时尽量不破坏预训练的整体生成能力。部件提示还会写明完整部件列表和当前目标部件，帮助模型决定边界。

这种设计把“部件数和名称”变成了显式推理接口：同一个整体描述，可以因为 schema 不同而产生不同的分解。官方论文还提出自动构建开放词汇部件数据的流水线，规模为 462K 个资产、约 2.02M 个部件。

### 应用边界

CubePart 的输出重点是刚体、可交互资产。论文展示了把独立部件接入游戏引擎，用脚本控制车轮、无人机螺旋桨等。当前限制也很明确：它主要处理刚体部件，还没有预测角色蒙皮所需的骨骼权重；论文还展示了部件接触处重叠、左右关系误判、复杂几何下遗漏部件等失败案例。

## 放在一起比较

| 方法 | 用户侧主要输入 | 部件如何得到 | 生成方式 | 输出重点 |
|---|---|---|---|---|
| Hunyuan3D-Part（P3-SAM + 𝒳-Part） | 整体 mesh/点云；可用部件框 | 先由 P3-SAM 分割，再由 𝒳-Part 生成完整部件 | 几何条件下的同步多部件 flow/diffusion | 高保真分解、局部编辑 |
| PartCrafter | 单张 RGB 图像 + 部件数 | 模型在多组 latent 中联合推断 | 单模型同时去噪所有部件 | 图像到可装配的多 mesh，能补全遮挡部件 |
| CubePart | 全局文本 + 开放词汇部件 schema | schema 由用户指定，模型生成对应部件 | 先整体生成，再多部件解码 | 推理时可控的语义部件和刚体交互 |

三者的共同骨架是“**部件表示 + 全局/局部协同 + 独立 mesh 输出**”，但它们并不等价：Hunyuan3D-Part 依赖输入几何并采用分割后生成；PartCrafter 以单图为条件并联合生成；CubePart 用文本 schema 明确规定输出结构并采用两阶段生成。阅读论文时，不能只看到“diffusion”或“multi-part”就把三种输入输出和控制方式混为一谈。

## 小结

如果只记住一个标准范式，可以记成：先确定“整体是什么”和“要拆成哪些部件”，把每个部件变成可以扩散建模的 latent，在局部细节与全局装配之间交换信息，最后解码成同一坐标系下的多个 mesh。三篇工作分别把难点放在不同位置：Hunyuan3D-Part 强调从已有整体几何中稳健分解并补全，PartCrafter 强调单图条件下的联合部件生成，CubePart 强调用户在推理时用开放词汇 schema 控制部件结构。

## 参考资料

- Ma et al., *P3-SAM: Native 3D Part Segmentation*, [arXiv:2509.06784](https://arxiv.org/abs/2509.06784), [HTML](https://arxiv.org/html/2509.06784v4)。
- Yan et al., *𝒳-Part: high fidelity and structure coherent shape decomposition*, [arXiv:2509.08643](https://arxiv.org/abs/2509.08643), [HTML](https://arxiv.org/html/2509.08643v2)。
- Lin et al., *PartCrafter: Structured 3D Mesh Generation via Compositional Latent Diffusion Transformers*, [arXiv:2506.05573](https://arxiv.org/abs/2506.05573), [HTML](https://arxiv.org/html/2506.05573v1)。
- Zhu et al., *CubePart: An Open-Vocabulary Part-Controllable 3D Generator*, [arXiv:2605.28763](https://arxiv.org/abs/2605.28763), [HTML](https://arxiv.org/html/2605.28763v1)。
- Tencent Hunyuan, [Hunyuan3D-Part 官方仓库](https://github.com/Tencent-Hunyuan/Hunyuan3D-Part)。

## QA

待补充
