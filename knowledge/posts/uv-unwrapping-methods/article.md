# UV 展开的方法谱系：从传统参数化到学习式与部件式展开

给一个 3D 模型贴颜色、照片或法线细节时，渲染器需要知道“模型表面的这个点应该读取纹理图片的哪个位置”。**UV 展开（UV unwrapping）**就是把三维表面映射到二维平面：对表面点 (p) 给出二维坐标 ((u,v))，然后在纹理图上用 ((u,v)) 采样。它也常被称为 mesh parameterization（网格参数化）。本文面向刚接触图形学的读者，先建立问题和指标的直觉，再按路线介绍 2020 年之后的代表性方法；2020 年以前的方法只做谱系概览，不逐篇展开。

## 1. UV 展开究竟在解决什么问题

### 1.1 为什么要切缝

一张平面纸不能无变形地包住球。对任意闭合或高亏格表面，要得到一个平面上的图，通常必须沿网格边切开若干条**缝（seam）**，把表面拆成一个或多个近似圆盘的**图表（chart）**。每个 chart 可以独立展到二维，再把它们平移、旋转、缩放后排进纹理图集（texture atlas）。切缝不表示模型被删掉了；它表示相邻三角形在 UV 平面中不再共享同一个坐标边界。

如果不同的三维点被映射到了同一片 UV 区域，就发生 **UV 重叠**。重叠会让两个表面区域读取同一纹理，除非这是有意设计，否则通常是错误。多图表的边界还可能出现接缝，所以实际工具会在几何不显眼处放缝，并把图表打包到有限的 0–1 纹理空间中。

### 1.2 失真不是一个数就能概括

平面化一般不能同时保持长度、角度和面积。常见指标包括：

- **角度/共形失真**：局部角度是否保持，适合文字、图案不希望被扭斜的情况。
- **面积/等距失真**：三角形在 UV 中的面积相对 3D 面积变化多大，影响纹理密度是否均匀。
- **拉伸（stretch）**：局部最大奇异值或边长变化，反映纹理被拉长。
- **翻转与双射性**：三角形是否反向、不同表面点是否被错误折叠到一起。
- **缝长、图表数量和打包效率**：工程上希望缝短、chart 少、纹理空间利用率高，但这些目标常与低失真冲突。

因此“最好”的 UV 取决于用途：影视贴图可能更关心缝的位置和画师可编辑性，数值模拟可能关心角度或长度，自动生成内容则还要关心脏网格、非流形边和退化三角形能否处理。 [Shay、Solomon 与 Stein 的数据集和 benchmark](https://arxiv.org/abs/2208.01772) 特别强调，没有一个指标可以代表所有实际用户的偏好。

## 2. 2020 年以前：传统路线合并概览

早期方法大致经历了三步：先给定或搜索切缝，再把每个圆盘 chart 通过 Tutte/Laplacian、LSCM、ABF 等方法展平，最后做图集打包。固定边界的线性方法简单、快，并可在适当条件下保证翻转不发生；自由边界和局部-全局优化方法能降低失真，但求解和初始化更复杂；像 OptCuts 一类方法进一步尝试联合优化切缝与参数化。

这条路线的共同前提是：输入拓扑和网格质量相对规整，或者用户先手工处理 seam、分件和非流形问题。它们仍是工程基线，Blender、Unity 等软件也把 LSCM、ABF 等算法集成进了工作流。不要把“传统”理解成过时：在高质量手工模型上，它们通常很快、可控、可解释；困难主要出现在自动处理大规模普通扫描、重建或 AI 生成网格时。

## 3. 2020 年以后：几条正在汇合的路线

### 3.1 学习 Jacobian，再用几何求解恢复 UV：Neural Jacobian Fields

[Neural Jacobian Fields（NJF）](https://arxiv.org/abs/2205.02904)（2022）针对一个关键问题：不同模型的三角剖分可能完全不同，直接把“每个顶点的 UV”喂给固定网络，会把某个训练网格的连接关系误当成规律。

NJF 的做法是把网络要预测的对象改成**局部映射的 Jacobian（导数矩阵）**。MLP 根据一个点的空间位置和全局形状描述，先预测一个外在的矩阵场；随后利用当前网格每个三角形自己的切平面，把矩阵投影为该网格的内在 Jacobian。最后通过一个可微的 Poisson 求解，把各三角形的梯度场积分成连续的二维映射。Poisson 系统的分解可以缓存，训练时仍能反向传播。

它的输入可以是任意三角化的表面，输出是映射到二维的坐标（在 UV 任务中即 UV 参数化）。核心优势是**与三角剖分无关、在梯度域中保留细节**；核心代价是网络仍需学习形状先验，而且切缝、全局拓扑和图集打包不由这一 Jacobian 积分步骤自动解决。NJF 的论文还展示了形变迁移、配准等任务，因此不能把它误解成一个只针对纹理的“UV 生成器”。

### 3.2 不把离散网格当成固定输入：Discretization-Agnostic Deep Self-Supervised Parameterization

[Discretization-Agnostic Deep Self-Supervised 3D Surface Parameterization](https://doi.org/10.1145/3550340.3564235)（2022）把重点放在两个限制上：许多网络依赖固定拓扑，且很多方法需要人工 UV 作为监督。它以点或局部表面采样为基本对象，利用深度网络学习从表面到参数域的映射，并通过几何约束构造自监督目标，而不是把一套人工 UV 当作唯一答案。

“Discretization-agnostic” 的含义是，改变三角化或采样密度后，方法仍应表达同一个连续表面映射；它并不等于完全不需要几何质量检查。训练信号通常来自映射的连续性、局部失真、覆盖/重建一致性等可计算量。此类方法的价值在于把“训练标签”从艺术家画好的 UV 扩展为几何规律，缺点是自监督损失如何平衡、如何防止折叠和跨 chart 不一致，往往决定最终效果。

### 3.3 让参数化成为可评测的工程问题：Mesh Parameterization Benchmark

[A Dataset and Benchmark for Mesh Parameterization](https://arxiv.org/abs/2208.01772) 本身不是一个新的展开网络，而是 2022 年很重要的**评测基础设施**。作者收集了 337 个来自 BlenderKit、Sketchfab 等真实来源的模型，并保留艺术家制作的 UV。benchmark 同时报告失真、鲁棒性、图表/缝等指标，并允许与艺术家 UV 对照。

它提醒我们：一个模型在合成平面片上失真很低，不代表它在角色、CAD、扫描和有孔洞的真实资产上可用；“少一个 chart”也不一定比“画师更容易修改”重要。后续学习式方法若只给出单一平均误差而不说明拓扑、缝和打包协议，结论应谨慎解读。

### 3.4 以用户点为条件，找一个可展开的大局部：DA Wand

[DA Wand: Distortion-Aware Selection Using Neural Mesh Parameterization](https://openaccess.thecvf.com/content/CVPR2023/html/Liu_DA_Wand_Distortion-Aware_Selection_Using_Neural_Mesh_Parameterization_CVPR_2023_paper.html)（CVPR 2023）并不试图一次把整件模型展平。它解决的是贴花、局部绘画等交互任务：用户在网格上点一个三角形，系统找到一个尽可能大、又能低失真展平的局部区域。

流程是：MeshCNN 编码网格和用户选中的三角形，预测软分割概率；把概率作为权重放进加权 LSCM（wLSCM）参数化层，得到可反传的 UV；再用**阈值化失真损失**惩罚超过容忍度的三角形，并用平滑/紧致性损失避免区域碎裂。训练先在带分割标签的合成“近可展开”形状上预训练，再在无标签自然形状上用参数化层做失真自监督。

所以 DA Wand 的输出是一个用户条件的局部 chart 和 UV，不是全模型 UV 图集。它适合交互式 decal、局部纹理和快速选面；如果目标是自动生成整件角色的最终贴图，它需要和全局切缝、图集打包工具串联。

### 3.5 从点到全局自由边界：Flatten Anything

[Flatten Anything: Unsupervised Neural Surface Parameterization](https://arxiv.org/abs/2405.14633)（NeurIPS 2024）把目标扩大为**全局、自由边界、自动切缝**。其 Flatten Anything Model（FAM）直接学习表面点到自适应二维 UV 域的点到点映射；系统由表面切割、二维 UV 变形、3D→2D 展开和 2D→3D 回包等子网络组成，并通过双向 cycle 约束训练。

论文强调它不依赖 mesh connectivity，因此也能处理无结构表面采样；训练是对每个目标模型进行的无监督/过拟合式优化，而不是一个已经在所有类别上训练好、一次前向就适配任何模型的通用权重。损失包含展开与回包一致性、循环一致性、置信度/覆盖和共形等几何约束；网络学习过程中同时寻找切缝和 UV 边界。

FAM 的优点是减少手工预切、对复杂拓扑和非理想网格更宽容；代价是每个模型需要优化，速度和稳定性依赖采样、损失权重及停止条件。它输出的是连续神经映射和 UV 结果，工业管线仍需把结果离散到顶点、检查翻转，并完成图集打包。

### 3.6 以语义部件减少碎片：PartUV

[PartUV: Part-Based UV Unwrapping of 3D Meshes](https://arxiv.org/abs/2511.16659)（arXiv:2511.16659，2025 年论文条目；同时发表于 SIGGRAPH Asia 2025）针对 AI 生成网格常见的噪声、凹凸和糟糕拓扑。传统自动展开在这类网格上容易产生大量碎 chart 和难看的 seam。PartUV 的基本范式是**先用高层部件分解，再在部件内部做几何展开**。

论文以 PartField 一类的学习式部件分解作为先验，在 top-down 的递归流程中把模型分成语义上更完整的 part，再对每个 part 选择/修正参数化和图集布局。它允许用户给定失真阈值，在满足阈值的前提下尽量减少 chart 数；同时加入非流形、退化三角形的专门处理，并把参数化与 packing 做并行化。

PartUV 的输出是部件对齐的 charts、seams 和打包后的 UV。它与 DA Wand 的区别很关键：DA Wand 是“给一个点，找一个低失真局部 patch”；PartUV 是“把整件模型按部件拆开，再为各部件生成较少的全局 charts”。论文报告在手工模型、CAD、AI 生成模型和 Common Shapes 上，在 chart 数与 seam 长度方面优于若干工具和神经方法，同时保持相近失真；这些结论依赖其数据集和评价协议，不应外推为所有模型都必然更好。

## 4. 四条路线怎么比较

| 路线 | 典型代表 | 输入与输出 | 训练/优化信号 | 优点 | 局限与适用场景 |
| --- | --- | --- | --- | --- | --- |
| 传统全局参数化 | LSCM、ABF、自由边界和联合切缝优化 | 网格、seam 或拓扑约束 → charts/UV | 显式几何能量与线性/非线性求解 | 快、可解释、工业工具成熟 | 对脏网格和复杂拓扑敏感；适合规整资产和可控流水线 |
| 学习式全局映射 | NJF、离散化无关自监督、Flatten Anything | 点/网格 → 连续映射或 UV | 监督 UV 或失真、循环、双射等自监督约束 | 能学习形状先验，减少固定拓扑依赖，部分方法自动找缝 | 训练/每模型优化成本、折叠与边界稳定性；适合批量普通数据或研究探索 |
| 局部/部件式 | DA Wand、PartUV | 用户点或整件模型 → 局部 patch / 部件 charts | 可微参数化层、失真阈值、语义部件和几何启发式 | chart 更有意义，能控制局部失真和碎片 | 需要与图集拼装结合；适合贴花、部件贴图和 AI 生成网格 |
| 生成式/艺术家式工作流 | 交互切缝、标记 seam、自动 packing 与人工修订 | 模型、用户意图、纹理需求 → 可编辑 UV 图集 | 不是单一训练损失，而是规则、启发式与人工反馈 | 能表达“这里必须连续/那里隐藏缝”等语义意图 | 不完全自动、成本依赖艺术家；最终交付仍常需要这一环节 |

一个实用选择顺序是：规整且拓扑可靠的模型先用传统工具；要在未知拓扑或脏网格上批量处理，考虑 FAM/NJF 等学习式方法；只需局部贴花用 DA Wand；希望 chart 按人体、家具、零件等语义组织，优先考虑 PartUV 式部件路线。无论哪条路线，最后都应检查 UV 是否翻转/重叠、纹理密度是否均匀、chart 是否方便后续编辑，并在自己的资产分布上复测。

## 5. 事实边界与容易混淆的地方

1. **参数化不等于打包。** 得到每个 chart 的二维坐标后，还要把 chart 放进纹理图集；很多论文只研究前者。
2. **学习式不等于一次推理。** NJF 是可泛化的映射框架，FAM 的论文设置则包含对目标模型的优化；二者不能用同一个“推理速度”结论比较。
3. **低失真不等于画师友好。** 失真、缝长、chart 数、语义对齐和可编辑性是不同目标。
4. PartUV 的版本和日期以 [arXiv 条目](https://arxiv.org/abs/2511.16659)为准；本文不引入未核验的 2026 年 DreamUV 说法。

## 小结

UV 展开本质上是“把三维表面变成可在二维纹理中寻址的坐标”。2020 年以前的主线是手工/启发式切缝加几何参数化；2022 年以后，研究开始把 Jacobian、离散化无关网络、自监督几何损失和可微参数化层结合起来。DA Wand 把问题缩成用户条件的低失真局部选择，Flatten Anything 尝试全局自由边界，PartUV 则用部件语义减少 AI 网格上的碎片 charts。理解这些方法时，始终要同时问四个问题：输入是什么网格、输出是局部还是全局 UV、失真与缝如何衡量、结果是否能进入真实贴图管线。

## 参考资料

1. [Neural Jacobian Fields: Learning Intrinsic Mappings of Arbitrary Meshes, arXiv:2205.02904](https://arxiv.org/abs/2205.02904)
2. [Discretization-Agnostic Deep Self-Supervised 3D Surface Parameterization, ACM DOI](https://doi.org/10.1145/3550340.3564235)
3. [A Dataset and Benchmark for Mesh Parameterization, arXiv:2208.01772](https://arxiv.org/abs/2208.01772)
4. [DA Wand: Distortion-Aware Selection Using Neural Mesh Parameterization, CVPR 2023](https://openaccess.thecvf.com/content/CVPR2023/html/Liu_DA_Wand_Distortion-Aware_Selection_Using_Neural_Mesh_Parameterization_CVPR_2023_paper.html)
5. [Flatten Anything: Unsupervised Neural Surface Parameterization, arXiv:2405.14633](https://arxiv.org/abs/2405.14633)
6. [PartUV: Part-Based UV Unwrapping of 3D Meshes, arXiv:2511.16659](https://arxiv.org/abs/2511.16659)

## QA

暂无问答。
