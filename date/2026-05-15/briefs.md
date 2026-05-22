# 2026-05-15 全量简报

# RouteProfile: Elucidating the Design Space of LLM Profiles for Routing

**【设计LLM路由的性能标签】**

**arXiv**: https://arxiv.org/abs/2605.00180  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.00180  
**HF Paper**: https://hf-mirror.com/papers/2605.00180  
**HF Votes**: 14

## 简要摘要

*自然语言处理;大语言模型应用;LLM路由性能标签设计*

随着大语言模型生态扩展，不同模型能力各异，推动了LLM路由的发展，但作为路由基础的模型能力标签设计尚未被充分探索。
本文提出了一个名为RouteProfile的LLM性能标签通用设计空间，并通过系统实验发现结构化标签、查询级信号等设计能提升多种路由器的性能，尤其有利于新模型的泛化。

---

# STALE: Can LLM Agents Know When Their Memories Are No Longer Valid?

**【大模型能否识别记忆失效】**

**arXiv**: https://arxiv.org/abs/2605.06527  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06527  
**HF Paper**: https://hf-mirror.com/papers/2605.06527  
**HF Votes**: 35

## 简要摘要

*自然语言处理;智能体与对话系统;记忆更新与冲突检测*

大语言模型智能体需维护长期个性化记忆，但当前评测主要关注静态事实检索，忽略了在新证据出现时更新记忆的能力。
研究者构建了STALE评测集，提出了三维探测框架，评估了前沿模型，揭示了从检索证据到据此行动之间的普遍差距，并提出了CUPMem原型作为初始基线。

---

# RewardHarness: Self-Evolving Agentic Post-Training

**【构建评估图像编辑的奖励模型】**

**arXiv**: https://arxiv.org/abs/2605.08703  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08703  
**HF Paper**: https://hf-mirror.com/papers/2605.08703  
**HF Votes**: 2

## 简要摘要

*计算机视觉;视觉与语言;图像编辑评估*

现有方法依赖大规模标注和额外训练，难以高效反映人类对图像编辑的细微偏好。
提出自进化智能体框架，通过少量示例迭代进化工具库，自动生成偏好判断以评估编辑效果。

---

# WildClawBench: A Benchmark for Real-World, Long-Horizon Agent Evaluation

**【构建真实世界长程智能体评测基准】**

**arXiv**: https://arxiv.org/abs/2605.10912  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.10912  
**HF Paper**: https://hf-mirror.com/papers/2605.10912  
**HF Votes**: 35

## 简要摘要

*智能体与机器人;具身智能与智能体评测;命令行界面智能体长程任务评测*

现有智能体评测大多依赖模拟环境与短时任务，难以评估其在真实运行时环境中完成长程复杂任务的能力。
我们提出了WildClawBench，一个包含60个双语多模态真实任务的基准，在可复现的Docker容器中运行并采用混合评估方法，结果显示当前前沿模型在此类评测上表现仍有很大提升空间。

---

# Adaptive Teacher Exposure for Self-Distillation in LLM Reasoning

**【大模型推理的自蒸馏教法改进】**

**arXiv**: https://arxiv.org/abs/2605.11458  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.11458  
**HF Paper**: https://hf-mirror.com/papers/2605.11458  
**HF Votes**: 3

## 简要摘要

*自然语言处理;大语言模型;推理自蒸馏*

当前基于策略的自蒸馏方法在大模型推理训练中效果显著，但存在教师模型能完全看到标准答案、导致教学难度过大的问题。
本文提出自适应教师曝光方法，动态调整教师看到的答案信息量，并通过学习进度奖励优化这一过程，从而提升学生模型的学习效果。

---

# Overcoming Dynamics-Blindness: Training-Free Pace-and-Path Correction for VLA Models

**【提升动态环境性能的免训练方法】**

**arXiv**: https://arxiv.org/abs/2605.11459  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.11459  
**HF Paper**: https://hf-mirror.com/papers/2605.11459  

## 简要摘要

*机器人学;具身智能;视觉语言动作模型*

视觉语言动作模型在动态环境中因缺乏时序感知而性能下降。
本文提出一种免训练的推理时校正方法，通过联合优化执行节奏与路径来提升模型在动态场景中的成功率。

---

# Boosting Omni-Modal Language Models: Staged Post-Training with Visually Debiased Evaluation

**【提升全模态语言模型视觉去偏评估】**

**arXiv**: https://arxiv.org/abs/2605.12034  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.12034  
**HF Paper**: https://hf-mirror.com/papers/2605.12034  
**HF Votes**: 1

## 简要摘要

*多模态学习;全模态语言模型;视觉泄露去偏*

当前全模态基准可能因视觉捷径而高估模型能力，需在控制视觉泄露的评估下研究模型训练
构建去偏评估集OmniClean，并设计三阶段训练方法OmniBoost提升小模型全模态理解性能

---

# PanoWorld: Towards Spatial Supersensing in 360^circ Panorama World

**【全景空间智能大模型研究】**

**arXiv**: https://arxiv.org/abs/2605.13169  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13169  
**HF Paper**: https://hf-mirror.com/papers/2605.13169  
**HF Votes**: 6

## 简要摘要

*计算机视觉;视觉与语言;全景图空间推理*

现有视觉大模型难以理解全景图的连续球形空间结构。
提出了PanoWorld模型，通过球面空间注意力机制和几何感知指令数据，提升了全景图的空间推理能力。

---

# Achieving Gold-Medal-Level Olympiad Reasoning via Simple and Unified Scaling

**【用简单统一方法提升奥赛推理能力】**

**arXiv**: https://arxiv.org/abs/2605.13301  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13301  
**HF Paper**: https://hf-mirror.com/papers/2605.13301  
**HF Votes**: 107

## 简要摘要

*大语言模型推理;数学科学问题求解;奥赛级别问题求解*

当前推理模型在长程数学与科学问题求解上进展显著，已有系统在国际数学/物理奥赛上达到金牌水平。
本文提出一种将预训练推理主干转化为严格奥赛求解器的统一方法：通过反向困惑度课程的SFT、两阶段强化学习以及测试时扩展，训练出能稳定处理超长推理轨迹并取得金牌级性能的模型SU-01。

---

# Topology-Preserving Neural Operator Learning via Hodge Decomposition

**【拓扑保持神经算子通过霍奇分解】**

**arXiv**: https://arxiv.org/abs/2605.13834  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13834  
**HF Paper**: https://hf-mirror.com/papers/2605.13834  
**HF Votes**: 2

## 简要摘要

*机器学习;算子学习;物理场方程求解*

研究在几何网格上求解物理场方程的算子学习方法。
提出基于霍奇理论的算子分解框架，分离拓扑与几何分量，设计了混合欧拉-拉格朗日架构以提升精度与保真度。

---

# PREPING: Building Agent Memory without Tasks

**【无需先验任务的智能体记忆构建方法】**

**arXiv**: https://arxiv.org/abs/2605.13880  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13880  
**HF Paper**: https://hf-mirror.com/papers/2605.13880  
**HF Votes**: 22

## 简要摘要

*智能体系统;记忆构建;无任务预训练记忆*

研究智能体在接触新任务时，因缺乏经验而面临冷启动的问题。
提出了Preping框架，通过可引导的合成实践来主动构建记忆，在多个环境中验证了其有效性和高效性。

---

# EvolveMem:Self-Evolving Memory Architecture via AutoResearch for LLM Agents

**【大模型智能体记忆系统自主优化】**

**arXiv**: https://arxiv.org/abs/2605.13941  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.13941  
**HF Paper**: https://hf-mirror.com/papers/2605.13941  
**HF Votes**: 20

## 简要摘要

*自然语言处理;智能体与对话系统;长期记忆检索优化*

现有大模型智能体长期记忆系统的检索机制固定不变，限制了其跨会话的适应性。
提出了EvolveMem架构，通过诊断模块分析失败日志，自动调整记忆检索配置，实现记忆内容与检索机制的协同进化，显著提升了多个基准测试的性能。

---

# SPIN: Structural LLM Planning via Iterative Navigation for Industrial Tasks

**【工业任务大语言模型规划优化】**

**arXiv**: https://arxiv.org/abs/2605.14051  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14051  
**HF Paper**: https://hf-mirror.com/papers/2605.14051  
**HF Votes**: 1

## 简要摘要

*大语言模型;智能体规划与执行;结构化工作流规划*

工业大语言模型代理系统常因规划不佳产生无效或冗长工作流，导致执行失败和成本浪费。
提出SPIN方法，通过验证有向无环图规划和前缀执行控制，提前生成有效计划并减少不必要工具调用。

---

# CurveBench: A Benchmark for Exact Topological Reasoning over Nested Jordan Curves

**【曲线层级包含关系视觉推理基准】**

**arXiv**: https://arxiv.org/abs/2605.14068  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14068  
**HF Paper**: https://hf-mirror.com/papers/2605.14068  

## 简要摘要

*计算机视觉;视觉推理;嵌套曲线拓扑结构*

从图像中精确推断多条不相交封闭曲线的层级包含关系是视觉推理的一项基础而困难的任务。
构建了包含756张图像的CurveBench基准，评估了主流大模型并发现其性能不足，通过微调显著提升了开源模型的准确率，但任务尚未彻底解决。

---

# BOOKMARKS: Efficient Active Storyline Memory for Role-playing

**【角色扮演智能体记忆优化】**

**arXiv**: https://arxiv.org/abs/2605.14169  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14169  
**HF Paper**: https://hf-mirror.com/papers/2605.14169  
**HF Votes**: 6

## 简要摘要

*自然语言处理;智能体与对话系统;角色扮演智能体长期一致性记忆*

现有角色扮演智能体依赖循环摘要式记忆导致关键细节丢失
提出基于搜索的书签记忆框架，主动初始化并同步任务相关记忆片段

---

# Dynamic Latent Routing

**【动态路由提升语言模型微调】**

**arXiv**: https://arxiv.org/abs/2605.14323  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14323  
**HF Paper**: https://hf-mirror.com/papers/2605.14323  
**HF Votes**: 1

## 简要摘要

*强化学习；策略学习；语言模型后训练*

研究如何用动态搜索组合子策略以应对变化奖励的任务。
提出动态潜在路由方法，在单阶段训练中联合学习离散编码和路由策略，在低数据微调中超越监督微调。

---

# Ideology Prediction of German Political Texts

**【德国政治文本意识形态预测  】**

**arXiv**: https://arxiv.org/abs/2605.14352  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14352  
**HF Paper**: https://hf-mirror.com/papers/2605.14352  
**HF Votes**: 1

## 简要摘要

*自然语言处理；文本分类；政治文本立场分析  *

研究如何预测德国政治文本在左右光谱上的连续立场。  
构建多语料库测试了13个Transformer模型，发现DeBERTa-large和Gemma2-2B在内外域测试中表现优异。

---

# LLM-based Detection of Manipulative Political Narratives

**【基于大模型的政治操纵叙事检测】**

**arXiv**: https://arxiv.org/abs/2605.14354  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14354  
**HF Paper**: https://hf-mirror.com/papers/2605.14354  

## 简要摘要

*自然语言处理;文本挖掘;政治叙事检测*

社交媒体政治讨论增多需区分操纵叙事与合理批评
用提示过滤后无监督聚类从百万贴文识别出41种操纵叙事

---

# Darwin Family: MRI-Trust-Weighted Evolutionary Merging for Training-Free Scaling of Language-Model Reasoning

**【训练免梯度融合提升大模型推理】**

**arXiv**: https://arxiv.org/abs/2605.14386  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14386  
**HF Paper**: https://hf-mirror.com/papers/2605.14386  
**HF Votes**: 33

## 简要摘要

*自然语言处理;大语言模型;模型融合*

无需训练即可提升大语言模型推理能力是一大挑战。
提出达尔文框架，通过权重空间重组与进化搜索，实现了无需训练的模型性能增强。

---

# Nexus : An Agentic Framework for Time Series Forecasting

**【多智能体时间序列预测框架】**

**arXiv**: https://arxiv.org/abs/2605.14389  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14389  
**HF Paper**: https://hf-mirror.com/papers/2605.14389  
**HF Votes**: 1

## 简要摘要

*机器学习;时间序列分析;多智能体预测框架*

时间序列预测常需结合新闻等非结构化上下文，但现有方法要么只擅长数值模式，要么对上下文理解不稳定。
Nexus框架通过分解预测步骤，让LLM发挥更强预测能力，在房地产和股市数据上达到或超过了专业模型水平。

---

# Learning to Build the Environment: Self-Evolving Reasoning RL via Verifiable Environment Synthesis

**【通过环境合成实现自进化推理强化学习】**

**arXiv**: https://arxiv.org/abs/2605.14392  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14392  
**HF Paper**: https://hf-mirror.com/papers/2605.14392  
**HF Votes**: 2

## 简要摘要

*强化学习;推理任务;可验证环境合成*

在缺乏外部数据的推理任务中，语言模型自我提升的关键在于构建能够持续提供有效训练信号的环境。
本文提出了EvoEnv方法，通过严格验证和校准，让模型自主合成并利用Python环境进行训练，实验表明该方法能推动模型推理能力的稳定提升。

---

# BEAM: Binary Expert Activation Masking for Dynamic Routing in MoE

**【动态稀疏路由提升专家混合模型效率】**

**arXiv**: https://arxiv.org/abs/2605.14438  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14438  
**HF Paper**: https://hf-mirror.com/papers/2605.14438  
**HF Votes**: 1

## 简要摘要

*机器学习;高效推理;动态专家稀疏化*

标准专家混合模型采用固定路由导致计算冗余和延迟不佳。
提出BEAM方法，通过可训练二值掩码学习自适应专家选择，减少计算并加速推理。

---

# FrontierSmith: Synthesizing Open-Ended Coding Problems at Scale

**【大规模合成开放式编程题】**

**arXiv**: https://arxiv.org/abs/2605.14445  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14445  
**HF Paper**: https://hf-mirror.com/papers/2605.14445  
**HF Votes**: 13

## 简要摘要

*大型语言模型编程;开放式编程任务;问题合成与演化*

当前大语言模型的编程训练主要集中于定义明确的任务，缺乏开放式的编程问题。
提出FrontierSmith系统，从封闭式问题迭代演化出开放式编程题，并用其训练提升了模型的开放式编程能力。

---

# LiSA: Lifelong Safety Adaptation via Conservative Policy Induction

**【AI安全护栏持续适配系统】**

**arXiv**: https://arxiv.org/abs/2605.14454  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14454  
**HF Paper**: https://hf-mirror.com/papers/2605.14454  
**HF Votes**: 1

## 简要摘要

*人工智能安全;智能体安全;护栏系统自适应优化*

AI智能体在复杂工作流中面临情境化安全风险，其安全护栏需适应动态环境但面临反馈稀疏的挑战。
提出LiSA框架，通过结构化记忆将稀疏失败反馈转化为可复用策略，并引入冲突感知与置信度门控实现安全策略的持续保守优化。

---

# ViMU: Benchmarking Video Metaphorical Understanding

**【视频隐喻理解基准构建】**

**arXiv**: https://arxiv.org/abs/2605.14607  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14607  
**HF Paper**: https://hf-mirror.com/papers/2605.14607  
**HF Votes**: 8

## 简要摘要

*计算机视觉;视频理解;视频隐含语义理解*

现有视频理解模型主要关注表层视觉内容，缺乏理解视频隐喻、讽刺等隐含意义的能力。
我们构建了首个系统评估视频隐含语义理解能力的基准ViMU，要求模型超越字面感知进行推理。

---

# IntentVLA: Short-Horizon Intent Modeling for Aliased Robot Manipulation

**【机器人模仿学习的意图稳定性建模】**

**arXiv**: https://arxiv.org/abs/2605.14712  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14712  
**HF Paper**: https://hf-mirror.com/papers/2605.14712  
**HF Votes**: 13

## 简要摘要

*机器人;模仿学习;视觉语言动作策略*

机器人模仿数据常具有多模态性，相似的视觉语言观察可能对应不同的动作序列，这导致现有仅基于当前观察的策略在部分可观测下执行不稳定。
该工作提出了IntentVLA框架，通过编码近期观察来建模短时意图以指导动作序列生成，并构建了评测基准AliasBench，实验表明该方法提升了执行的稳定性与性能。

---

# Beyond Individual Intelligence: Surveying Collaboration, Failure Attribution, and Self-Evolution in LLM-based Multi-Agent Systems

**【多智能体系统协作与自进化研究】**

**arXiv**: https://arxiv.org/abs/2605.14892  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14892  
**HF Paper**: https://hf-mirror.com/papers/2605.14892  
**HF Votes**: 31

## 简要摘要

*自然语言处理;大语言模型智能体;多智能体系统协作与自进化*

现有研究多独立关注智能体能力、多智能体协作或自进化，缺乏对它们之间因果关联与系统性演进的审视。
本文提出LIFE四阶段统一框架，系统梳理了从能力奠基到协作集成、故障归因再到自主进化的研究，旨在推动构建具备持续诊断、重组和自优化能力的闭环多智能体系统。

---

# MemLens: Benchmarking Multimodal Long-Term Memory in Large Vision-Language Models

**【评测多模态大模型长时记忆能力】**

**arXiv**: https://arxiv.org/abs/2605.14906  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.14906  
**HF Paper**: https://hf-mirror.com/papers/2605.14906  
**HF Votes**: 51

## 简要摘要

*多模态大模型;长时记忆评测;多轮会话记忆评估*

现有缺乏系统比较不同方法处理需多模态证据的长时记忆任务的能力。
我们提出了MEMLENS评测基准，评估了多种模型，发现各有优劣，倡导结合长上下文与结构化检索的混合架构。

---

# Orchard: An Open-Source Agentic Modeling Framework

**【开源智能体建模框架Orchard】**

**arXiv**: https://arxiv.org/abs/2605.15040  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.15040  
**HF Paper**: https://hf-mirror.com/papers/2605.15040  
**HF Votes**: 9

## 简要摘要

*智能体与多智能体系统;智能体训练与优化;开源智能体建模框架*

现有开源智能体研究受限于基础设施与训练数据，高性能系统多依赖闭源代码或服务。
我们推出了开源框架Orchard及其环境层，构建了三个高效智能体训练方案，在多个任务上达到或接近顶尖水平。

---

# MemEye: A Visual-Centric Evaluation Framework for Multimodal Agent Memory

**【视觉记忆评估框架构建】**

**arXiv**: https://arxiv.org/abs/2605.15128  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.15128  
**HF Paper**: https://hf-mirror.com/papers/2605.15128  
**HF Votes**: 46

## 简要摘要

*多模态智能体;长期记忆评估;视觉证据保真度*

现有评估方法难以检验智能体是否保留了视觉证据用于后续推理。
我们提出了MemEye框架，从视觉证据粒度与使用方式两个维度评估记忆能力，并构建了新基准进行验证。

---

# Self-Distilled Agentic Reinforcement Learning

**【智能体强化学习自我蒸馏优化】**

**arXiv**: https://arxiv.org/abs/2605.15155  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.15155  
**HF Paper**: https://hf-mirror.com/papers/2605.15155  
**HF Votes**: 55

## 简要摘要

*机器学习;强化学习;语言大模型智能体训练*

强化学习训练语言大模型智能体时，轨迹级奖励信号稀疏，多轮交互不稳定，且现有带特权上下文的蒸馏方法存在监督不稳和负向拒绝处理难题。
提出SDAR方法，将基于策略的自我蒸馏作为门控辅助目标，核心仍为强化学习，通过Sigmoid门筛选教师认可的token信号并软化处理负向拒绝，在多项基准上显著超越基线方法。

---

# Does Synthetic Layered Design Data Benefit Layered Design Decomposition?

**【合成数据助力分层设计分解】**

**arXiv**: https://arxiv.org/abs/2605.15167  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.15167  
**HF Paper**: https://hf-mirror.com/papers/2605.15167  
**HF Votes**: 6

## 简要摘要

*计算机视觉;图像生成与编辑;分层设计分解*

近期图像生成技术快速发展，但生成结果扁平化，难以进行灵活的后期分层编辑，现有方法面临数据稀缺与可扩展性挑战。
本研究通过构建纯合成分层数据集SynLayers并基于CLD基线进行实验，证明合成数据能有效提升分层分解性能，且其效果随数据规模增大而提升直至饱和。

---

# FutureSim: Replaying World Events to Evaluate Adaptive Agents

**【评估AI动态适应能力  】**

**arXiv**: https://arxiv.org/abs/2605.15188  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.15188  
**HF Paper**: https://hf-mirror.com/papers/2605.15188  
**HF Votes**: 1

## 简要摘要

*机器学习;智能体评估;时序事件预测  *

AI需在动态开放环境中适应新信息，需要高效评估方法。  
提出FutureSim基准，通过回放真实世界事件测试智能体预测能力，并揭示前沿模型表现差异。

---

# ATLAS: Agentic or Latent Visual Reasoning? One Word is Enough for Both

**【视觉推理用单功能词兼顾两种方法】**

**arXiv**: https://arxiv.org/abs/2605.15198  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.15198  
**HF Paper**: https://hf-mirror.com/papers/2605.15198  
**HF Votes**: 15

## 简要摘要

*计算机视觉;视觉推理;视觉推理框架*

视觉推理通常涉及中间视觉状态的生成，现有方法存在计算开销大、延迟高或泛化性差等问题。
提出ATLAS框架，用一个离散的功能词同时作为智能体操作和潜在视觉推理单元，并通过LA-GRPO稳定强化学习训练，在保持可解释性的同时提升了性能。

---
