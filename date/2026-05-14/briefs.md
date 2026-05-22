# 2026-05-14 全量简报

# FAAST: Forward-Only Associative Learning via Closed-Form Fast Weights for Test-Time Supervised Adaptation

**【前向单次编译实现任务快速适配】**

**arXiv**: https://arxiv.org/abs/2605.04651  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.04651  
**HF Paper**: https://hf-mirror.com/papers/2605.04651  
**HF Votes**: 1

## 简要摘要

*机器学习;模型适配;前向学习*

背景/任务：预训练模型适配通常面临反向传播训练成本高与基于记忆或上下文的推理开销大的权衡。
做了什么：提出了FAAST方法，通过前向单步解析将标注样本编译为快速权重，实现常时推理并解耦任务适配与预训练表示，在多项基准测试中达到或超越反向传播适配效果，同时大幅降低时间和内存开销。

---

# SafeHarbor: Hierarchical Memory-Augmented Guardrail for LLM Agent Safety

**【构建大模型安全护栏】**

**arXiv**: https://arxiv.org/abs/2605.05704  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.05704  
**HF Paper**: https://hf-mirror.com/papers/2605.05704  
**HF Votes**: 1

## 简要摘要

*自然语言处理；大型语言模型安全；智能体工具安全防护*

随着大模型智能体工具能力的增强，恶意操控导致生成有害内容的风险凸显，现有防御机制存在过度拒绝与实用性下降的权衡问题。
提出SafeHarbor框架，通过上下文感知规则提取与分层记忆系统动态注入防御规则，并基于信息熵自进化优化，在保障高拒绝率的同时提升良性任务效用。

---

# Retrieval from Within: An Intrinsic Capability of Attention-Based Models

**【自注意力模型内部检索】**

**arXiv**: https://arxiv.org/abs/2605.05806  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.05806  
**HF Paper**: https://hf-mirror.com/papers/2605.05806  
**HF Votes**: 4

## 简要摘要

*自然语言处理;检索增强生成;注意力机制检索*

现有检索增强生成方法将检索与生成视为独立模块
提出INTRA框架，利用解码器注意力直接从模型内部表征中检索并重用证据块

---

# Federation of Experts: Communication Efficient Distributed Inference for Large Language Models

**【分布式大模型推理通信优化】**

**arXiv**: https://arxiv.org/abs/2605.06206  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06206  
**HF Paper**: https://hf-mirror.com/papers/2605.06206  
**HF Votes**: 1

## 简要摘要

*自然语言处理;大语言模型;推理通信优化*

在分布式环境下，混合专家模型进行大语言模型推理时，跨节点通信是主要瓶颈。
提出联邦专家架构，通过重组MoE块并限制通信范围，大幅减少通信开销，显著提升推理速度和性能。

---

# AI CFD Scientist: Toward Open-Ended Computational Fluid Dynamics Discovery with Physics-Aware AI Agents

**【AI流体智能科学家实现自主发现】**

**arXiv**: https://arxiv.org/abs/2605.06607  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06607  
**HF Paper**: https://hf-mirror.com/papers/2605.06607  
**HF Votes**: 1

## 简要摘要

*科学计算;计算流体力学;物理感知AI代理*

现有AI科学家难以处理高保真物理仿真中的物理有效性验证问题。
构建了首个覆盖全流程的AI流体科学家，通过视觉物理验证门控自主发现CFD模型改进。

---

# KL for a KL: On-Policy Distillation with Control Variate Baseline

**【语言模型策略蒸馏稳定化  】**

**arXiv**: https://arxiv.org/abs/2605.07865  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07865  
**HF Paper**: https://hf-mirror.com/papers/2605.07865  
**HF Votes**: 16

## 简要摘要

*自然语言处理;语言模型训练与优化;策略蒸馏方差降低  *

大语言模型在推理任务上常用的训练后方法“在线策略蒸馏”存在梯度方差大、训练不稳定的问题。  
我们提出一种基于控制变量基线的稳定方法，利用策略梯度强化学习框架，推导出无需额外推理的价值函数闭式解来降低方差，实现了高效且性能优异的稳定训练。

---

# Results and Retrospective Analysis of the CODS 2025 AssetOpsBench Challenge

**【评估工业多智能体竞赛有效性】**

**arXiv**: https://arxiv.org/abs/2605.08518  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08518  
**HF Paper**: https://hf-mirror.com/papers/2605.08518  
**HF Votes**: 6

## 简要摘要

*智能体系统;多智能体协同;工业任务规划与执行评估*

回顾分析CODS 2025工业多智能体竞赛
通过分析竞赛数据揭示了排行榜局限性和成功方法关键

---

# MC-RFM: Geometry-Aware Few-Shot Adaptation via Mixed-Curvature Riemannian Flow Matching

**【几何感知小样本适配混合曲率流匹配】**

**arXiv**: https://arxiv.org/abs/2605.08557  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08557  
**HF Paper**: https://hf-mirror.com/papers/2605.08557  
**HF Votes**: 2

## 简要摘要

*计算机视觉;小样本学习;视觉模型适配*

背景/任务：预训练视觉模型的小样本适配通常采用线性探针、提示或低秩更新等方法，但这些方法将适配视为离散的欧几里得扰动，未显式建模任务引起的特征位移几何。
做了什么：提出MC-RFM，将适配特征表示为双曲和欧氏混合乘积流形，通过流匹配实现冻结特征到支持集原型的连续传输，并配合混合原型线性分类器，在多个基准测试中优于现有方法。

---

# Source or It Didn't Happen: A Multi-Agent Framework for Citation Hallucination Detection

**【检测大模型生成的虚假文献引用  】**

**arXiv**: https://arxiv.org/abs/2605.08583  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08583  
**HF Paper**: https://hf-mirror.com/papers/2605.08583  
**HF Votes**: 1

## 简要摘要

*自然语言处理;文本生成与评估;文献引用真实性检测  *

大型语言模型在学术写作中被广泛使用，但可能生成看似真实但无法验证的虚假文献引用。  
本文构建了一个多智能体检测框架CiteTracer，提出分级分类法并发布评测集，能高精度识别真实、潜在和虚假引用。

---

# The Extrapolation Cliff in On-Policy Distillation of Near-Deterministic Structured Outputs

**【在线策略蒸馏风险阈值研究】**

**arXiv**: https://arxiv.org/abs/2605.08737  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08737  
**HF Paper**: https://hf-mirror.com/papers/2605.08737  
**HF Votes**: 2

## 简要摘要

*自然语言处理;大语言模型后训练;结构化输出蒸馏*

在线策略蒸馏被广泛用于大语言模型后训练，以提升模型在特定领域的表现，但过度外推奖励会导致模型违反结构化输出任务的格式约束。
论文推导出一个安全阈值公式，用于预测和避免蒸馏过程中的“外推悬崖”，即模型输出格式崩溃的临界点，并在实际任务中验证了该公式的准确性。

---

# Learning to Explore: Scaling Agentic Reasoning via Exploration-Aware Policy Optimization

**【让大模型学会按需探索】**

**arXiv**: https://arxiv.org/abs/2605.08978  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08978  
**HF Paper**: https://hf-mirror.com/papers/2605.08978  
**HF Votes**: 1

## 简要摘要

*强化学习;大模型智能体;探索策略优化*

现有智能体通常采用无差别的探索策略，无法在需要时进行自适应探索。
本文提出了一个通过变分推断构建细粒度奖励的框架，让智能体能在高不确定性时探索，并引入分组机制分离探索与执行。

---

# From Pixels to Concepts: Do Segmentation Models Understand What They Segment?

**【评估分割模型是否理解概念语义】**

**arXiv**: https://arxiv.org/abs/2605.09591  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.09591  
**HF Paper**: https://hf-mirror.com/papers/2605.09591  
**HF Votes**: 2

## 简要摘要

*计算机视觉;图像分割;概念忠实分割评估*

现有提示分割模型能在文本提示下定位物体，但难以分辨概念语义与视觉线索的误导。
我们提出CAFE基准，通过属性反事实操纵测试模型是否忠实于概念而非依赖视觉捷径。

---

# LEAD: Length-Efficient Adaptive and Dynamic Reasoning for Large Language Models

**【大模型高效推理方法研究】**

**arXiv**: https://arxiv.org/abs/2605.09806  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.09806  
**HF Paper**: https://hf-mirror.com/papers/2605.09806  
**HF Votes**: 5

## 简要摘要

*自然语言处理;语言模型推理优化;动态长度自适应推理*

当前大模型推理时思考链过长，浪费算力且效率低下。
提出了LEAD方法，动态平衡正确性与效率，实现更短且更准的推理。

---

# HAGE: Harnessing Agentic Memory via RL-Driven Weighted Graph Evolution

**【基于强化学习的记忆图动态检索】**

**arXiv**: https://arxiv.org/abs/2605.09942  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.09942  
**HF Paper**: https://hf-mirror.com/papers/2605.09942  
**HF Votes**: 13

## 简要摘要

*自然语言处理;智能体记忆系统;多关系加权图记忆检索*

现有智能体记忆检索依赖静态图或向量搜索，难以捕捉关系强度与查询相关性的动态变化
提出HAGE框架，通过可训练边特征与查询路由实现动态图遍历，并用强化学习联合优化边表示与检索策略

---

# MemReread: Enhancing Agentic Long-Context Reasoning via Memory-Guided Rereading

**【记忆引导重读增强长文本推理能力】**

**arXiv**: https://arxiv.org/abs/2605.10268  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.10268  
**HF Paper**: https://hf-mirror.com/papers/2605.10268  
**HF Votes**: 2

## 简要摘要

*自然语言处理;长文本理解;记忆增强推理*

现有基于代理记忆的长文本处理方法在顺序阅读时易丢失潜在证据，基于检索的召回仍存在信息丢失和无效查询干扰的问题。
提出MemReread方法，通过问题分解触发重读来恢复被过早丢弃的间接事实，并结合强化学习动态控制重读次数以平衡效果与计算开销。

---

# Active Tabular Augmentation via Policy-Guided Diffusion Inpainting

**【策略引导扩散修复增强表格数据】**

**arXiv**: https://arxiv.org/abs/2605.10315  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.10315  
**HF Paper**: https://hf-mirror.com/papers/2605.10315  

## 简要摘要

*机器学习;数据增强;表格数据增强*

现有表格数据增强方法重视分布逼真度，但未必提升下游模型性能。
提出结合扩散修复与轻量级策略的方法，动态生成高效用样本并控制注入，提升模型效果。

---

# MulTaBench: Benchmarking Multimodal Tabular Learning with Text and Image

**【构建多模态表格学习基准】**

**arXiv**: https://arxiv.org/abs/2605.10616  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.10616  
**HF Paper**: https://hf-mirror.com/papers/2605.10616  
**HF Votes**: 125

## 简要摘要

*机器学习;多模态学习;表格数据与文本图像融合*

现有表格基础模型在处理文本和图像等多模态数据时依赖通用嵌入，缺乏针对具体任务优化的能力。
提出了包含40个数据集的MulTaBench基准，证明任务感知表征调优能提升性能，推动了新型多模态表格基础模型的研究。

---

# BEACON: A Multimodal Dataset for Learning Behavioral Fingerprints from Gameplay Data

**【构建游戏行为认证数据集】**

**arXiv**: https://arxiv.org/abs/2605.10867  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.10867  
**HF Paper**: https://hf-mirror.com/papers/2605.10867  
**HF Votes**: 4

## 简要摘要

*行为识别；连续认证；多模态行为指纹*

背景：现有数据集规模小、模态单一，缺少真实认知与运动负荷下的细粒度行为数据。
贡献：发布了BEACON大规模多模态数据集，包含《Valorant》游戏中的同步多源数据，用于研究连续认证与行为分析。

---

# An Empirical Study of Automating Agent Evaluation

**【自动化AI代理评估的实证研究】**

**arXiv**: https://arxiv.org/abs/2605.11378  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.11378  
**HF Paper**: https://hf-mirror.com/papers/2605.11378  
**HF Votes**: 1

## 简要摘要

*智能代理系统;评估方法;自动化评估生成*

评估AI代理需要分析其多步骤工具使用和推理过程，传统方法成本高且依赖专家
提出了EvalAgent系统，通过编码评估技能生成可执行评估代码，显著提升了首次运行成功率

---

# The DAWN of World-Action Interactive Models

**【自动驾驶交互式世界模型】**

**arXiv**: https://arxiv.org/abs/2605.11550  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.11550  
**HF Paper**: https://hf-mirror.com/papers/2605.11550  
**HF Votes**: 18

## 简要摘要

*机器人学;自动驾驶;世界模型与动作规划*

现有世界动作模型常忽略世界预测与动作生成的相互依赖关系，未能很好处理复杂交互场景下的长时程规划。
提出DAWN模型，在语义隐空间中将世界预测器与动作去噪器耦合，通过推理时递归交互优化，实现了更强的规划性能与安全性。

---

# ShapeCodeBench: A Renewable Benchmark for Perception-to-Program Reconstruction of Synthetic Shape Scenes

**【形状图像转绘图程序基准】**

**arXiv**: https://arxiv.org/abs/2605.11680  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.11680  
**HF Paper**: https://hf-mirror.com/papers/2605.11680  
**HF Votes**: 1

## 简要摘要

*计算机视觉;场景感知与理解;感知到程序重建*

提出了一个新的合成基准，用于评估模型根据渲染的二维形状图像生成可执行绘图程序的能力。
创建了一个可再生的基准测试集和一个评估框架，并测试了多种方法，发现当前最优方法仍难以实现完美重建。

---

# Position: LLM Inference Should Be Evaluated as Energy-to-Token Production

**【评估大模型推理能耗效率】**

**arXiv**: https://arxiv.org/abs/2605.11733  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.11733  
**HF Paper**: https://hf-mirror.com/papers/2605.11733  
**HF Votes**: 2

## 简要摘要

*机器学习;大模型推理;能耗效率量化*

当前对大模型推理的评估主要关注准确性、延迟等软件或模型指标，忽略了大规模部署时能耗、冷却等物理约束对产出的根本限制。
论文提出应将推理视为“能量到令牌的生产过程”，并构建了相应的量化框架，主张在评估中报告能耗、功率等物理指标，将系统优化视为提升能量利用效率的关键杠杆。

---

# Learning Agentic Policy from Action Guidance

**【用行动指导训练智能体策略】**

**arXiv**: https://arxiv.org/abs/2605.12004  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12004  
**HF Paper**: https://hf-mirror.com/papers/2605.12004  
**HF Votes**: 11

## 简要摘要

*强化学习;智能体学习;大语言模型智能体*

大语言模型智能体强化学习面临探索能力不足导致无法触及奖励状态的问题。
我们提出ActGuide-RL方法，利用日常人类互动产生的行动数据作为规划式参考指导，以最小干预原则动态辅助智能体探索，克服状态可达性障碍，实现了不依赖大量监督微调的智能体训练新范式。

---

# Predicting Decisions of AI Agents from Limited Interaction through Text-Tabular Modeling

**【预测陌生智能体在交互中的决策】**

**arXiv**: https://arxiv.org/abs/2605.12411  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12411  
**HF Paper**: https://hf-mirror.com/papers/2605.12411  
**HF Votes**: 44

## 简要摘要

*自然语言处理;人机交互;智能体决策预测*

在智能体通过自然语言与陌生对手进行谈判和交易的背景下，研究如何从有限交互中预测对手的后续决策。
构建了结合表格状态和文本信息的预测模型，并引入LLM作为编码器提取决策特征，实验表明该方法优于直接提示等基线，能有效利用隐藏的LLM表征。

---

# M2Retinexformer: Multi-Modal Retinexformer for Low-Light Image Enhancement

**【多模态低光图像增强】**

**arXiv**: https://arxiv.org/abs/2605.12556  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12556  
**HF Paper**: https://hf-mirror.com/papers/2605.12556  
**HF Votes**: 1

## 简要摘要

*计算机视觉;底层视觉;低光图像增强*

低光图像增强面临噪声、伪影和色彩失真等复杂退化问题。
提出多模态Retinexformer，引入深度、亮度和语义信息进行多尺度融合与渐进优化，提升了增强效果。

---

# TrackCraft3R: Repurposing Video Diffusion Transformers for Dense 3D Tracking

**【用视频扩散模型做3D跟踪】**

**arXiv**: https://arxiv.org/abs/2605.12587  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12587  
**HF Paper**: https://hf-mirror.com/papers/2605.12587  
**HF Votes**: 32

## 简要摘要

*计算机视觉；三维视觉；单目视频稠密三维跟踪*

从单目视频中进行稠密三维跟踪是动态场景理解的基础，但现有方法缺乏从真实视频中学到的运动先验。
提出了TrackCraft3R方法，通过双隐表征和时间位置编码对齐，将视频扩散模型改造成前馈式三维跟踪器，在精度和效率上均取得领先。

---

# Visual Aesthetic Benchmark: Can Frontier Models Judge Beauty?

**【多模态模型审美能力评估】**

**arXiv**: https://arxiv.org/abs/2605.12684  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12684  
**HF Paper**: https://hf-mirror.com/papers/2605.12684  
**HF Votes**: 7

## 简要摘要

*视觉理解;美学评估;视觉美学基准*

多模态大模型已广泛用于视觉理解与生成，但现有审美评估方法依赖单图评分，不能反映真实比较偏好。
本文构建视觉美学基准，以专家共识比较图像优劣，发现前沿模型与专家差距显著，并通过微调提升模型能力。

---

# From Generalist to Specialist Representation

**【从通用模型学习专用表示】**

**arXiv**: https://arxiv.org/abs/2605.12733  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12733  
**HF Paper**: https://hf-mirror.com/papers/2605.12733  
**HF Votes**: 1

## 简要摘要

*机器学习;表示学习;非参数可辨识性*

研究如何从通用模型中学习下游任务所需的专用表示，并确保表示的可辨识性。
在非参数设定下，证明了跨时间步的任务结构及每个时间步内任务相关表示的层次化可辨识性。

---

# WriteSAE: Sparse Autoencoders for Recurrent State

**【首个适用于状态空间模型的稀疏自编码器】**

**arXiv**: https://arxiv.org/abs/2605.12770  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12770  
**HF Paper**: https://hf-mirror.com/papers/2605.12770  

## 简要摘要

*自然语言处理;语言模型可解释性;循环状态矩阵写入分解*

现有稀疏自编码器无法分解和编辑状态空间等循环语言模型的矩阵缓存写入操作
提出了WriteSAE，将解码器原子分解为原生写入形状，实现了矩阵级写入的精确编辑与行为植入

---

# Orthrus: Memory-Efficient Parallel Token Generation via Dual-View Diffusion

**【用双模型并行加速大模型推理】**

**arXiv**: https://arxiv.org/abs/2605.12825  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12825  
**HF Paper**: https://hf-mirror.com/papers/2605.12825  
**HF Votes**: 7

## 简要摘要

*自然语言处理;大语言模型推理;并行文本生成*

传统自回归解码因顺序生成而成为推理吞吐量瓶颈，扩散模型虽能并行生成但存在性能下降、训练成本高和缺乏收敛保证等问题。
提出Orthrus框架，通过为冻结大模型添加轻量模块，构建一个共享KV缓存的并行扩散视图，利用两视图间的精确共识机制，在保证无损推理的同时实现高达7.8倍的加速。

---

# Revisiting DAgger in the Era of LLM-Agents

**【重新审视大模型智能体训练方法】**

**arXiv**: https://arxiv.org/abs/2605.12913  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12913  
**HF Paper**: https://hf-mirror.com/papers/2605.12913  
**HF Votes**: 5

## 简要摘要

*自然语言处理;大语言模型;智能体长程交互训练*

训练长程交互的大语言模型智能体时，早期错误会改变后续状态分布，导致轨迹偏离，现有方法在密集监督与稀疏反馈上各有不足。
我们重新采用DAgger算法，通过混合学生与教师策略收集轨迹并用教师行为监督训练学生，有效缓解协变量偏移并利用密集反馈，在软件工程智能体上验证了其优越性能。

---

# AgentLens: Revealing The Lucky Pass Problem in SWE-Agent Evaluation

**【揭示软件工程代理评估中的幸运通关问题】**

**arXiv**: https://arxiv.org/abs/2605.12925  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12925  
**HF Paper**: https://hf-mirror.com/papers/2605.12925  
**HF Votes**: 2

## 简要摘要

*软件工程;智能体评估;代码调试与修复*

当前软件工程智能体评估过于依赖最终测试是否通过这一二元信号，忽视了修复过程的质量差异。
我们提出名为AgentLens的评估框架，通过过程分析发现并量化了“幸运通关”现象，并发布了包含标注的数据集和工具。

---

# Retrieval is Cheap, Show Me the Code: Executable Multi-Hop Reasoning for Retrieval-Augmented Generation

**【多跳问答程序化增强检索】**

**arXiv**: https://arxiv.org/abs/2605.12975  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12975  
**HF Paper**: https://hf-mirror.com/papers/2605.12975  
**HF Votes**: 8

## 简要摘要

*自然语言处理;问答系统;检索增强生成*

现有检索增强生成方法在多跳问答任务中存在推理隐晦、查询偏移等挑战
提出PyRAG框架，将多跳推理转化为可执行Python程序，实现状态显式化和执行反馈，显著提升多跳问答性能

---

# F-GRPO: Factorized Group-Relative Policy Optimization for Unified Candidate Generation and Ranking

**【用大模型统一候选生成与排序】**

**arXiv**: https://arxiv.org/abs/2605.12995  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12995  
**HF Paper**: https://hf-mirror.com/papers/2605.12995  
**HF Votes**: 1

## 简要摘要

*机器学习;检索与推荐;列表生成式排序*

传统检索排序流程分候选生成和重排序两步，大模型可一次生成带序列表，但组合输出空间优化困难。
我们提出因子化分组相对策略优化，在单次推理中联合优化生成与排序，提升最终列表质量。

---

# Frequency Bias and OOD Generalization in Neural Operators under a Variable-Coefficient Wave Equation

**【神经算子在波方程中频偏与泛化研究  】**

**arXiv**: https://arxiv.org/abs/2605.12997  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12997  
**HF Paper**: https://hf-mirror.com/papers/2605.12997  
**HF Votes**: 1

## 简要摘要

*机器学习;偏微分方程求解;神经算子泛化分析  *

研究神经算子作为偏微分方程求解器的性能，重点关注其在输入分布变化时的泛化能力。  
通过对比傅里叶神经算子和深度算子网络在频率与系数光滑度变化下的表现，发现两者对光滑度变化稳健，但对高频变化泛化差异显著。

---

# FeatCal: Feature Calibration for Post-Merging Models

**【校准合并模型的层间特征】**

**arXiv**: https://arxiv.org/abs/2605.13030  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13030  
**HF Paper**: https://hf-mirror.com/papers/2605.13030  
**HF Votes**: 5

## 简要摘要

*机器学习;模型融合;合并后校准*

模型合并虽能整合多个任务专家模型，但合并后的模型性能常不及原专家。
我们提出FeatCal方法，通过前向顺序逐层校准合并模型权重以减小特征漂移，无需梯度下降即显著提升性能并降低校准成本。

---

# MAP: A Map-then-Act Paradigm for Long-Horizon Interactive Agent Reasoning

**【为大模型交互智能体构建先探索后执行范式】**

**arXiv**: https://arxiv.org/abs/2605.13037  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13037  
**HF Paper**: https://hf-mirror.com/papers/2605.13037  
**HF Votes**: 6

## 简要摘要

*智能体;交互式规划;环境感知迟滞问题*

现有基于大模型的交互智能体采用“边走边看”的被动规划方式，导致环境感知延迟和效率瓶颈。
我们提出了先探索后执行的MAP框架，通过构建认知地图来提前理解环境，显著提升了智能体在复杂任务中的表现。

---

# Context Training with Active Information Seeking

**【上下文训练主动信息搜索  】**

**arXiv**: https://arxiv.org/abs/2605.13050  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13050  
**HF Paper**: https://hf-mirror.com/papers/2605.13050  
**HF Votes**: 5

## 简要摘要

*自然语言处理;大型语言模型;上下文优化  *

现有大语言模型部署后难以更新，难以适应需要新信息或专业知识的任务。  
我们为上下文优化器配备维基百科搜索工具，并通过搜索训练与剪枝策略，在多领域任务中实现稳定性能提升。

---

# Vividh-ASR: A Complexity-Tiered Benchmark and Optimization Dynamics for Robust Indic Speech Recognition

**【提升低资源语言语音识别鲁棒性】**

**arXiv**: https://arxiv.org/abs/2605.13087  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13087  
**HF Paper**: https://hf-mirror.com/papers/2605.13087  
**HF Votes**: 2

## 简要摘要

*语音识别;多语言语音识别;低资源语言鲁棒性*

针对多语言ASR模型在低资源语言上微调时出现“录音棚偏好”导致自发语音性能下降的问题，引入了一个分层复杂度基准Vividh-ASR。
通过研究学习率时机与课程顺序，提出了反向多阶段微调方法，使小模型性能匹配大模型，并通过表征分析揭示了有效适配机制。

---

# IndicMedDialog: A Parallel Multi-Turn Medical Dialogue Dataset for Accessible Healthcare in Indic Languages

**【构建印度语言医疗对话数据集】**

**arXiv**: https://arxiv.org/abs/2605.13292  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13292  
**HF Paper**: https://hf-mirror.com/papers/2605.13292  
**HF Votes**: 1

## 简要摘要

*自然语言处理;多语言对话系统;医疗对话数据集构建*

现有医疗对话系统多为单轮问答或模板化，缺乏真实对话和多语言支持。
我们创建了包含英语和九种印度语言的多轮平行医疗对话数据集，并基于该数据集微调了用于个性化症状询问的医疗对话模型。

---

# PersonalAI 2.0: Enhancing knowledge graph traversal/retrieval with planning mechanism for Personalized LLM Agents

**【个性化大模型代理增强知识图谱检索】**

**arXiv**: https://arxiv.org/abs/2605.13481  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13481  
**HF Paper**: https://hf-mirror.com/papers/2605.13481  
**HF Votes**: 1

## 简要摘要

*自然语言处理;知识增强大模型;基于知识图谱的检索增强生成*

现有图检索增强生成方法在动态迭代检索和查询规划方面存在局限，影响了回答的事实准确性。
提出PersonalAI 2.0框架，通过多阶段查询处理和搜索规划机制来动态遍历知识图谱，在多个基准测试上提升了答案精度并减少了幻觉。

---

# Many-Shot CoT-ICL: Making In-Context Learning Truly Learn

**【大模型上下文学习性能提升研究】**

**arXiv**: https://arxiv.org/abs/2605.13511  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13511  
**HF Paper**: https://hf-mirror.com/papers/2605.13511  
**HF Votes**: 28

## 简要摘要

*自然语言处理;大语言模型上下文学习;推理任务上下文学习*

研究了在长上下文窗口中，使用大量思维链示例进行上下文学习（CoT-ICL）对推理任务的有效性。
发现标准多示例规则不适用推理任务，基于新视角提出了演示示例的选取与排序原则及方法，显著提升了性能。

---

# RealICU: Do LLM Agents Understand Long-Context ICU Data? A Benchmark Beyond Behavior Imitation

**【评估大模型理解重症监护数据  】**

**arXiv**: https://arxiv.org/abs/2605.13542  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13542  
**HF Paper**: https://hf-mirror.com/papers/2605.13542  
**HF Votes**: 6

## 简要摘要

*自然语言处理;临床决策支持;重症监护长时序决策分析  *

现有ICU基准以历史临床行为为金标准，但该行为可能因信息不全面并非最佳，难以评估AI的真正推理能力。  
本文提出了RealICU基准，通过资深医师回顾完整病程来标注，并设计了四项任务来评估大模型在真实ICU条件下的表现，发现现有模型存在缺陷。

---

# FlowCompile: An Optimizing Compiler for Structured LLM Workflows

**【优化结构化大模型工作流配置】**

**arXiv**: https://arxiv.org/abs/2605.13647  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13647  
**HF Paper**: https://hf-mirror.com/papers/2605.13647  

## 简要摘要

*机器学习;大语言模型系统;工作流编译优化*

优化结构化大语言模型工作流，以在精度和延迟间权衡是一个组合优化难题。
提出了FlowCompile编译器，通过编译时设计空间探索，生成可重用、高质量的工作流配置集合。

---

# FrameSkip: Learning from Fewer but More Informative Frames in VLA Training

**【视觉语言动作策略训练数据优化】**

**arXiv**: https://arxiv.org/abs/2605.13757  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13757  
**HF Paper**: https://hf-mirror.com/papers/2605.13757  
**HF Votes**: 19

## 简要摘要

*机器人学习;机器人视觉语言动作策略;演示轨迹帧选择*

视觉语言动作策略通常从密集的机器人演示轨迹中训练，但所有帧被同等采样，导致关键操作帧监督不足。
我们提出FrameSkip框架，通过多个准则评分并选择信息量高的帧进行训练，在显著减少数据量的同时提升策略性能。

---

# RoboEvolve: Co-Evolving Planner-Simulator for Robotic Manipulation with Limited Data

**【机器人协同进化规划模拟器】**

**arXiv**: https://arxiv.org/abs/2605.13775  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13775  
**HF Paper**: https://hf-mirror.com/papers/2605.13775  
**HF Votes**: 6

## 简要摘要

*机器人;机器人操作;物理交互数据合成*

机器人操作任务因物理交互数据稀缺而难以扩展，视觉语言模型和视频生成模型分别存在语义空间错位和物理幻觉问题。
提出RoboEvolve框架，通过将二者耦合进协同进化循环，利用无标注种子图像，通过昼夜双阶段机制和自主渐进课程，高效合成数据并提升任务性能。

---

# MinT: Managed Infrastructure for Training and Serving Millions of LLMs

**【大模型训练与部署系统】**

**arXiv**: https://arxiv.org/abs/2605.13779  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13779  
**HF Paper**: https://hf-mirror.com/papers/2605.13779  
**HF Votes**: 200

## 简要摘要

*机器学习;大模型系统;LoRA策略管理*

针对需要基于少量昂贵基础模型部署大量训练策略的场景，MinT提出了一套管理基础设施。
该系统在保留基础模型常驻的同时，通过高效处理LoRA适配器的全生命周期，实现了百万级策略目录的管理与在万亿级基础模型上的训练和服务。

---

# Training Long-Context Vision-Language Models Effectively with Generalization Beyond 128K Context

**【高效训练超长上下文视觉语言模型】**

**arXiv**: https://arxiv.org/abs/2605.13831  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13831  
**HF Paper**: https://hf-mirror.com/papers/2605.13831  
**HF Votes**: 77

## 简要摘要

*多模态大模型;长上下文建模;长文档视觉问答*

长上下文建模是现代大视觉语言模型的核心能力，但现有训练方法对长上下文数据的构建和平衡研究不足。
系统研究长上下文持续预训练，通过关键发现提出实用训练方案并训练出性能优异的模型。

---

# EVA-Bench: A New End-to-end Framework for Evaluating Voice Agents

**【语音智能体端到端评测框架】**

**arXiv**: https://arxiv.org/abs/2605.13841  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13841  
**HF Paper**: https://hf-mirror.com/papers/2605.13841  
**HF Votes**: 58

## 简要摘要

*语音技术;语音对话系统;语音智能体评测*

现有语音智能体评测难以同时模拟真实对话和全面衡量语音特有缺陷
提出EVA-Bench框架，通过模拟对话与复合指标全面评估语音智能体

---

# Towards Self-Evolving Agentic Literature Retrieval

**【自进化代理文献检索系统】**

**arXiv**: https://arxiv.org/abs/2605.14306  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14306  
**HF Paper**: https://hf-mirror.com/papers/2605.14306  
**HF Votes**: 2

## 简要摘要

*自然语言处理;信息检索;文献检索意图理解*

传统文献检索存在意图理解浅、前沿大模型成本高且易虚构来源的问题。
提出了PaSaMaster系统，通过意图分析、检索与排序的迭代过程实现高效可靠的文献推荐，并在多学科评测中显著优于传统方法和大模型。

---
