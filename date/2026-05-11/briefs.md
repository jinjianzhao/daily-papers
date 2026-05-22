# 2026-05-11 全量简报

# Q-RAG: Long Context Multi-step Retrieval via Value-based Embedder Training

**【训练嵌入模型优化多步检索  】**

**arXiv**: https://arxiv.org/abs/2511.07328  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2511.07328  
**HF Paper**: https://hf-mirror.com/papers/2511.07328  
**HF Votes**: 13

## 简要摘要

*自然语言处理;信息检索;检索增强生成  *

针对复杂问题单步检索不足，现有方法需微调小模型，成本高且无法用大模型  
用强化学习微调嵌入模型实现多步检索，在长文本基准上取得最优效果

---

# Scaling Continual Learning to 300+ Tasks with Bi-Level Routing Mixture-of-Experts

**【扩展预训练模型的持续学习能力】**

**arXiv**: https://arxiv.org/abs/2602.03473  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2602.03473  
**HF Paper**: https://hf-mirror.com/papers/2602.03473  
**HF Votes**: 11

## 简要摘要

*机器学习;持续学习;大规模类增量学习*

传统的持续学习方法难以在数百个任务的超长序列中同时保持模型的稳定性和可塑性。
提出了CaRE框架，其核心是双层路由混合专家模块，能动态激活并整合专家知识；同时构建了包含数百任务的大规模新数据集。

---

# R^3-SQL: Ranking Reward and Resampling for Text-to-SQL

**【提升文本转SQL排名与重采样效果】**

**arXiv**: https://arxiv.org/abs/2604.25325  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2604.25325  
**HF Paper**: https://hf-mirror.com/papers/2604.25325  
**HF Votes**: 2

## 简要摘要

*自然语言处理;文本到SQL生成;SQL候选查询排名与重采样*

现有文本到SQL系统在排名候选SQL查询时，难以对功能等价的查询保持评分一致性，且当候选池中无正确答案时无法恢复。
提出R^3-SQL框架，通过统一奖励对候选查询分组排名以提升一致性，并引入智能重采样机制在必要时重新生成候选查询以提高召回率。

---

# AEM: Adaptive Entropy Modulation for Multi-Turn Agentic Reinforcement Learning

**【自适应熵调控强化学习】**

**arXiv**: https://arxiv.org/abs/2605.00425  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.00425  
**HF Paper**: https://hf-mirror.com/papers/2605.00425  
**HF Votes**: 19

## 简要摘要

*强化学习；大语言模型代理；多轮任务信用分配*

强化学习使大语言模型代理能交互解决多轮任务，但结果稀疏奖励难以指导长轨迹中的单步信用分配。
提出了无需额外监督的自适应熵调控方法，在响应层面调制熵动态以优化探索与利用平衡，提升了多个基准上的模型性能。

---

# CGM-JEPA: Learning Consistent Continuous Glucose Monitor Representations via Predictive Self-Supervised Pretraining

**【学习血糖监测跨模态表示】**

**arXiv**: https://arxiv.org/abs/2605.00933  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.00933  
**HF Paper**: https://hf-mirror.com/papers/2605.00933  
**HF Votes**: 2

## 简要摘要

*健康信息学;医疗时序分析;连续血糖预测表征*

连续血糖监测数据存在多模态和场景迁移的表示不一致问题。
提出自监督预测框架，通过预测掩码潜在表征来学习抽象且一致的跨模态表示，提升模型泛化能力。

---

# SkCC: Portable and Secure Skill Compilation for Cross-Framework LLM Agents

**【跨框架大模型Agent技能编译】**

**arXiv**: https://arxiv.org/abs/2605.03353  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03353  
**HF Paper**: https://hf-mirror.com/papers/2605.03353  
**HF Votes**: 6

## 简要摘要

*智能系统;Agent系统;Agent技能编译*

当前不同Agent框架对提示词格式敏感，且社区技能存在安全漏洞。
提出了SkCC编译框架，通过中间表示实现技能跨平台移植与安全分析，显著提升性能与安全性。

---

# Discovering Reinforcement Learning Interfaces with Large Language Models

**【利用大模型自动设计强化学习任务接口】**

**arXiv**: https://arxiv.org/abs/2605.03408  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03408  
**HF Paper**: https://hf-mirror.com/papers/2605.03408  
**HF Votes**: 3

## 简要摘要

*强化学习;界面设计;任务接口自动发现*

强化学习系统依赖人工设计环境观测与奖励函数，构建新任务接口费时费力。
提出LIMEN框架，用大语言模型指导进化搜索，从原始状态联合生成观测和奖励程序，并通过策略训练反馈迭代优化。

---

# Beyond Retrieval: A Multitask Benchmark and Model for Code Search

**【提出代码搜索多任务评测基准与模型】**

**arXiv**: https://arxiv.org/abs/2605.04615  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.04615  
**HF Paper**: https://hf-mirror.com/papers/2605.04615  
**HF Votes**: 22

## 简要摘要

*自然语言处理;代码智能;代码检索与重排序*

现有代码搜索评测主要关注检索且存在数据污染等问题，无法全面反映真实开发搜索场景。
构建了多任务基准CoREB以评估完整代码搜索流程，并训练了首个能在所有任务上持续提升性能的重排序模型。

---

# DecodingTrust-Agent Platform (DTap): A Controllable and Interactive Red-Teaming Platform for AI Agents

**【构建AI智能体红队测试平台】**

**arXiv**: https://arxiv.org/abs/2605.04808  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.04808  
**HF Paper**: https://hf-mirror.com/papers/2605.04808  
**HF Votes**: 19

## 简要摘要

*智能体安全;红队测试;平台与基准构建*

背景/任务：AI智能体在现实部署中存在安全风险，但缺乏可控、可复现的大规模评估环境。
做了什么：提出了首个可控交互的红队测试平台DTap及自主攻击代理DTap-Red，构建了大规模测试数据集DTap-Bench，并系统评估了主流智能体的安全漏洞。

---

# CPCANet: Deep Unfolding Common Principal Component Analysis for Domain Generalization

**【展开公共主成分分析提升域泛化】**

**arXiv**: https://arxiv.org/abs/2605.05136  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.05136  
**HF Paper**: https://hf-mirror.com/papers/2605.05136  
**HF Votes**: 1

## 简要摘要

*机器学习;域泛化;公共主成分分析*

域泛化旨在学习能在数据分布变化下保持稳健的表示。
提出CPCANet，将传统算法展开为可微神经网络层，以端到端方式学习跨域共享子空间。

---

# Who Prices Cognitive Labor in the Age of Agents? Compute-Anchored Wages

**【AI代理劳动价格决定机制探讨】**

**arXiv**: https://arxiv.org/abs/2605.05558  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.05558  
**HF Paper**: https://hf-mirror.com/papers/2605.05558  
**HF Votes**: 2

## 简要摘要

*人工智能经济学;智能体经济学;认知劳动定价*

AI代理作为生产技术的认知劳动价格决定机制被误解，需重新审视。
提出计算锚定工资理论，从资本市场角度分析认知劳动工资上限。

---

# MDN: Parallelizing Stepwise Momentum for Delta Linear Attention

**【用步长动量加速线性注意力】**

**arXiv**: https://arxiv.org/abs/2605.05838  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.05838  
**HF Paper**: https://hf-mirror.com/papers/2605.05838  
**HF Votes**: 4

## 简要摘要

*自然语言处理;高效模型结构;长序列线性注意力*

线性注意力模型在处理长序列时存在信息衰减和收敛不佳的问题。
提出了一种结合步长动量的块并行算法，设计了稳定门控机制，提升了模型性能。

---

# 4DThinker: Thinking with 4D Imagery for Dynamic Spatial Understanding

**【视觉语言模型动态空间推理】**

**arXiv**: https://arxiv.org/abs/2605.05997  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.05997  
**HF Paper**: https://hf-mirror.com/papers/2605.05997  
**HF Votes**: 16

## 简要摘要

*计算机视觉;视觉语言模型;动态空间理解*

动态空间推理对视觉语言模型仍是挑战，现有方法存在表达不精确或依赖外部模块的问题。
提出4DThinker框架，通过构建动态潜在心智意象，联合监督文本与4D潜在表示进行微调，并利用强化学习优化复杂推理任务。

---

# Shallow Prefill, Deep Decoding: Efficient Long-Context Inference via Layer-Asymmetric KV Visibility

**【长文本推理加速方法  】**

**arXiv**: https://arxiv.org/abs/2605.06105  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06105  
**HF Paper**: https://hf-mirror.com/papers/2605.06105  
**HF Votes**: 2

## 简要摘要

*自然语言处理;大语言模型;长上下文推理  *

长上下文推理因需完整处理并缓存长提示词而成本高昂  
提出层不对称KV可见性策略，浅层预填充深层解码，降低开销保持性能

---

# Listwise Policy Optimization: Group-based RLVR as Target-Projection on the LLM Response Simplex

**【优化大语言模型推理能力】**

**arXiv**: https://arxiv.org/abs/2605.06139  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06139  
**HF Paper**: https://hf-mirror.com/papers/2605.06139  
**HF Votes**: 63

## 简要摘要

*强化学习;大语言模型对齐;列表式策略优化*

针对大语言模型强化学习训练中常见的组式策略梯度方法
提出列表式策略优化框架，将其解释为响应单纯形上的目标分布投影，通过显式目标投影实现更优且稳定的训练效果

---

# UniPrefill: Universal Long-Context Prefill Acceleration via Block-wise Dynamic Sparsification

**【加速长文本模型预计算处理】**

**arXiv**: https://arxiv.org/abs/2605.06221  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06221  
**HF Paper**: https://hf-mirror.com/papers/2605.06221  
**HF Votes**: 20

## 简要摘要

*自然语言处理;大语言模型推理加速;长上下文预计算优化*

随着大语言模型支持上下文越来越长，其推理效率面临挑战，现有预计算加速方法主要针对稀疏注意力模型，在新兴架构上性能下降且难以与现代推理引擎集成。
提出通用预计算加速框架UniPrefill，可在任何模型架构上直接加速，并集成到vLLM中支持连续批处理，显著降低首字延迟。

---

# Rethinking RL for LLM Reasoning: It's Sparse Policy Selection, Not Capability Learning

**【强化学习并非学习新能力而是选择已有路径】**

**arXiv**: https://arxiv.org/abs/2605.06241  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06241  
**HF Paper**: https://hf-mirror.com/papers/2605.06241  
**HF Votes**: 3

## 简要摘要

*自然语言处理;大语言模型推理;推理路径稀疏修正*

当前强化学习被广泛用于提升大语言模型推理能力，但有证据表明它可能只是重新分配模型已有解决方案的概率。
研究发现强化学习的改进集中在模型不确定的高熵决策点，并据此提出了无需强化学习的轻量方法ReasonMaxxer，在多个基准上以极低训练成本达到或超越强化学习效果。

---

# Empirical Evidence for Simply Connected Decision Regions in Image Classifiers

**【图像分类器决策区域单连通性实证研究】**

**arXiv**: https://arxiv.org/abs/2605.06380  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06380  
**HF Paper**: https://hf-mirror.com/papers/2605.06380  
**HF Votes**: 3

## 简要摘要

*机器学习;深度学习可解释性;决策区域拓扑研究*

先前研究证实深度神经网络决策区域是路径连通的，但更强的单连通性尚未得到验证。
提出了一种迭代网格填充方法，通过构造标签保持曲面来实证验证多个图像分类模型中决策区域的单连通性。

---

# PrefixGuard: From LLM-Agent Traces to Online Failure-Warning Monitors

**【从LLM智能体轨迹生成在线故障预警器】**

**arXiv**: https://arxiv.org/abs/2605.06455  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06455  
**HF Paper**: https://hf-mirror.com/papers/2605.06455  
**HF Votes**: 3

## 简要摘要

*自然语言处理;智能体与交互系统;智能体轨迹监控与预警*

LLM智能体执行长序列工具调用任务时，最终结果检查往往为时已晚，需在任务执行中途进行轻量级预警。
提出PrefixGuard框架，通过从轨迹样本归纳确定性类型步骤适配器，并训练事件抽象与风险评分器，以合成前缀监控器，从而在多个基准测试中显著提升预警性能。

---

# UniSD: Towards a Unified Self-Distillation Framework for Large Language Models

**【大模型自蒸馏统一框架】**

**arXiv**: https://arxiv.org/abs/2605.06597  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06597  
**HF Paper**: https://hf-mirror.com/papers/2605.06597  
**HF Votes**: 12

## 简要摘要

*自然语言处理;大规模语言模型;自蒸馏*

自蒸馏为不依赖更强外部教师的大语言模型适配提供了新路径，但其在自回归大模型中存在轨迹自由、正确性依赖任务、监督不稳定等挑战。
本文提出了统一自蒸馏框架UniSD，系统整合了多种提升监督可靠性、表征对齐和训练稳定性的机制，并通过系统实验揭示了各组件作用，最终构建的性能最优集成流程显著提升了模型表现。

---

# LiVeAction: a Lightweight, Versatile, and Asymmetric Neural Codec Design for Real-time Operation

**【轻量通用神经编解码器设计】**

**arXiv**: https://arxiv.org/abs/2605.06628  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06628  
**HF Paper**: https://hf-mirror.com/papers/2605.06628  
**HF Votes**: 5

## 简要摘要

*信号处理；数据压缩；神经编解码器*

为应对资源受限设备的高维信号压缩需求，需一种高效、通用且适合机器感知的压缩方案。
提出LiVeAction架构，通过简化编码器结构和改进训练目标，实现了高性能、低复杂度的通用神经压缩。

---

# CASCADE: Case-Based Continual Adaptation for Large Language Models During Deployment

**【大语言模型在部署中持续学习】**

**arXiv**: https://arxiv.org/abs/2605.06702  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06702  
**HF Paper**: https://hf-mirror.com/papers/2605.06702  
**HF Votes**: 2

## 简要摘要

*自然语言处理;大语言模型应用;部署时学习*

大语言模型在部署后无法学习，限制了其适应性。
提出CASCADE框架，让大模型通过案例记忆在部署中持续改进性能。

---

# From Storage to Experience: A Survey on the Evolution of LLM Agent Memory Mechanisms

**【大语言模型智能体记忆机制演进综述  】**

**arXiv**: https://arxiv.org/abs/2605.06716  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06716  
**HF Paper**: https://hf-mirror.com/papers/2605.06716  
**HF Votes**: 5

## 简要摘要

*自然语言处理;智能体与交互系统;记忆机制演进  *

背景：大语言模型智能体的记忆机制研究分散，缺乏统一框架。  
本文提出了一个三阶段演进框架，分析了核心驱动力及前沿机制。

---

# Gated QKAN-FWP: Scalable Quantum-inspired Sequence Learning

**【量子启发的序列学习新方法】**

**arXiv**: https://arxiv.org/abs/2605.06734  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06734  
**HF Paper**: https://hf-mirror.com/papers/2605.06734  
**HF Votes**: 2

## 简要摘要

*机器学习;序列建模;量子启发快速权重编程*

现有量子快速权重编程模型难以在含噪声中等规模量子设备上扩展，且经典模拟成本高。
提出了一种基于单量子比特数据重传电路和门控更新规则的可扩展量子启发快速权重框架，在时序预测任务中优于多个经典循环模型，并验证了其在真实量子设备上的部署可行性。

---

# HumanNet: Scaling Human-centric Video Learning to One Million Hours

**【构建千万时人体动作数据库】**

**arXiv**: https://arxiv.org/abs/2605.06747  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06747  
**HF Paper**: https://hf-mirror.com/papers/2605.06747  
**HF Votes**: 48

## 简要摘要

*具身智能；视频理解；人体交互视频学习*

当前具身智能发展受限于缺乏大规模、多样且标注丰富的人体活动数据
发布了包含百万小时视频的HumanNet数据库，并提出了一种数据策展范式，验证了人体动作视频对机器人学习的可替代性

---

# IntentGrasp: A Comprehensive Benchmark for Intent Understanding

**【大模型意图理解能力评测与提升】**

**arXiv**: https://arxiv.org/abs/2605.06832  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.06832  
**HF Paper**: https://hf-mirror.com/papers/2605.06832  
**HF Votes**: 6

## 简要摘要

*自然语言处理;语言模型评估;意图理解评测*

意图理解对开发有用的大型语言模型助手至关重要，但现有模型能力不足。
提出了一个综合性评测基准IntentGrasp，并用其评估了20个模型，进而通过有监督微调显著提升了模型的意图理解能力。

---

# PACEvolve++: Improving Test-time Learning for Evolutionary Search Agents

**【改进进化搜索的测试时学习】**

**arXiv**: https://arxiv.org/abs/2605.07039  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07039  
**HF Paper**: https://hf-mirror.com/papers/2605.07039  
**HF Votes**: 3

## 简要摘要

*强化学习;进化算法;测试时策略适应*

大语言模型驱动的进化搜索通常采用固定策略，限制了在评估昂贵任务中的适应性。
提出PACEvolve++框架，通过可训练导师模型与前沿模型协作，并采用阶段自适应优化策略，在多个任务中实现了更快收敛和更稳定的测试时训练。

---

# ModelLens: Finding the Best for Your Task from Myriads of Models

**【从海量模型中推荐最佳模型】**

**arXiv**: https://arxiv.org/abs/2605.07075  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07075  
**HF Paper**: https://hf-mirror.com/papers/2605.07075  
**HF Votes**: 6

## 简要摘要

*机器学习;模型选择;模型推荐*

开源模型库中有大量预训练模型，但为特定新数据集挑选最佳模型很困难
提出ModelLens框架，通过分析公开评测记录学习模型能力，无需在新数据集上运行候选模型即可推荐

---

# Learning Visual Feature-Based World Models via Residual Latent Action

**【学习基于视觉特征的世界模型】**

**arXiv**: https://arxiv.org/abs/2605.07079  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07079  
**HF Paper**: https://hf-mirror.com/papers/2605.07079  
**HF Votes**: 2

## 简要摘要

*计算机视觉；视觉表征学习；视觉世界模型*

现有世界模型多为像素级图像生成，存在效率低、易出错问题，而基于视觉特征的世界模型更高效但预测易模糊或坍缩。
本文通过残差隐式动作学习与流匹配预测，构建了高效准确的世界模型，并用于无动作演示学习和纯离线视频强化学习。

---

# HyperEyes: Dual-Grained Efficiency-Aware Reinforcement Learning for Parallel Multimodal Search Agents

**【并行多模态搜索代理训练新方法】**

**arXiv**: https://arxiv.org/abs/2605.07177  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07177  
**HF Paper**: https://hf-mirror.com/papers/2605.07177  
**HF Votes**: 57

## 简要摘要

*多模态系统;多模态智能体;多模态搜索效率*

现有序列搜索代理效率低，需为每个目标实体单独调用工具，导致冗余交互。
提出HyperEyes代理，通过视觉定位与检索融合实现并行搜索，并引入双粒度强化学习框架优化效率。

---

# DiffRetriever: Parallel Representative Tokens for Retrieval with Diffusion Language Models

**【扩散模型并行生成多令牌用于检索】**

**arXiv**: https://arxiv.org/abs/2605.07210  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07210  
**HF Paper**: https://hf-mirror.com/papers/2605.07210  
**HF Votes**: 3

## 简要摘要

*自然语言处理;信息检索;扩散语言模型检索*

背景/任务：传统自回归语言模型用于检索时，其序列生成方式限制了生成多个代表性令牌的效率，而现有方法未能可靠提升检索性能。
我们提出DiffRetriever模型，利用扩散语言模型在单次前向传播中并行生成多个令牌作为查询或文档表示，显著提升了检索效果，并在多个基准测试中超越了现有方法。

---

# SpecBlock: Block-Iterative Speculative Decoding with Dynamic Tree Drafting

**【块迭代式推测解码加速】**

**arXiv**: https://arxiv.org/abs/2605.07243  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07243  
**HF Paper**: https://hf-mirror.com/papers/2605.07243  
**HF Votes**: 3

## 简要摘要

*大语言模型推理加速;推测解码;动态树草稿生成*

现有推测解码方法存在路径依赖与计算开销的矛盾。
结合块迭代与动态分支，在降低开销的同时保持路径准确性，并通过成本感知机制进一步提升吞吐。

---

# MISA: Mixture of Indexer Sparse Attention for Long-Context LLM Inference

**【长上下文稀疏注意力优化】**

**arXiv**: https://arxiv.org/abs/2605.07363  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07363  
**HF Paper**: https://hf-mirror.com/papers/2605.07363  
**HF Votes**: 12

## 简要摘要

*自然语言处理;大语言模型;稀疏注意力机制*

长上下文大语言模型推理中，现有稀疏注意力索引器计算开销过高。
提出混合索引器稀疏注意力方法，动态路由少量专家头进行评分，显著降低计算成本并保持性能。

---

# BalCapRL: A Balanced Framework for RL-Based MLLM Image Captioning

**【平衡强化学习优化图像描述】**

**arXiv**: https://arxiv.org/abs/2605.07394  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07394  
**HF Paper**: https://hf-mirror.com/papers/2605.07394  
**HF Votes**: 3

## 简要摘要

*计算机视觉;图像描述;多模态大语言模型图像描述*

当前基于强化学习的图像描述方法常在准确性、流畅性和实用性之间失衡。
我们提出了一个平衡框架，通过联合优化和奖励标准化等技术，在多目标下提升描述质量。

---

# Rubric-based On-policy Distillation

**【基于量规的在线策略蒸馏】**

**arXiv**: https://arxiv.org/abs/2605.07396  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07396  
**HF Paper**: https://hf-mirror.com/papers/2605.07396  
**HF Votes**: 37

## 简要摘要

*自然语言处理;大语言模型对齐;黑箱模型蒸馏*

在线策略蒸馏依赖教师模型的完整输出，限制了其在黑箱场景中的应用。
本文提出基于量规的在线策略蒸馏框架，通过师生对比生成量规并优化学生模型，实现了高效黑箱对齐。

---

# Sparse Autoencoders as Plug-and-Play Firewalls for Adversarial Attack Detection in VLMs

**【稀疏自编码器检测视觉语言模型对抗攻击】**

**arXiv**: https://arxiv.org/abs/2605.07447  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07447  
**HF Paper**: https://hf-mirror.com/papers/2605.07447  
**HF Votes**: 3

## 简要摘要

*机器学习;对抗鲁棒性;视觉语言模型安全*

视觉语言模型快速发展且被广泛应用，但其安全性研究相对不足，易受对抗攻击威胁。
提出一种基于稀疏自编码器的轻量级检测框架SAEgis，无需对抗训练即可有效识别多种攻击，并在跨域泛化上表现优异。

---

# InterLV-Search: Benchmarking Interleaved Multimodal Agentic Search

**【评测交错多模态搜索新基准】**

**arXiv**: https://arxiv.org/abs/2605.07510  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07510  
**HF Paper**: https://hf-mirror.com/papers/2605.07510  
**HF Votes**: 5

## 简要摘要

*多模态人工智能；智能搜索；多模态交互式搜索*

现有基准对交错使用多模态证据的搜索任务评测不足。
构建了包含三个难度层级的评测基准和工具，实验表明现有模型面临挑战。

---

# TextLDM: Language Modeling with Continuous Latent Diffusion

**【连续隐扩散模型用于文本生成】**

**arXiv**: https://arxiv.org/abs/2605.07748  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07748  
**HF Paper**: https://hf-mirror.com/papers/2605.07748  
**HF Votes**: 22

## 简要摘要

*自然语言处理;文本生成;连续隐扩散模型*

扩散模型在视觉生成领域取得巨大成功，研究者希望将其统一架构扩展至文本理解与生成任务。
我们提出TextLDM，通过变分自编码器将文本转化为连续表示，并用对齐技术优化表示质量，最终使用与视觉模型相同的扩散变换器进行文本生成，其性能可比肩GPT-2。

---

# Rethinking State Tracking in Recurrent Models Through Error Control Dynamics

**【循环模型状态跟踪误差控制】**

**arXiv**: https://arxiv.org/abs/2605.07755  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07755  
**HF Paper**: https://hf-mirror.com/papers/2605.07755  
**HF Votes**: 20

## 简要摘要

*机器学习;循环神经网络;状态跟踪*

循环模型状态跟踪的理论研究多关注表达能力，但误差控制同样重要。
研究发现某类循环网络无法纠正状态分离误差，其跟踪能力受限于累积误差，并通过实验验证了该失效机制的可预测性。

---

# Anisotropic Modality Align

**【基于各向异性校正实现跨模态表征对齐】**

**arXiv**: https://arxiv.org/abs/2605.07825  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07825  
**HF Paper**: https://hf-mirror.com/papers/2605.07825  
**HF Votes**: 25

## 简要摘要

*多模态学习;跨模态表征学习;模态间隙对齐*

训练多模态大模型常受限于高质量的配对数据不足，现有方法尝试利用预训练对比模型的共享空间，但模态间隙阻碍了表征的可靠互换。
研究发现模态间隙的本质是各向异性的残差结构，据此提出了各向异性对齐原则及校正框架，能在保留源模态语义结构的同时，使其分布与目标模态对齐，从而用单模态数据有效训练模型。

---

# MatryoshkaLoRA: Learning Accurate Hierarchical Low-Rank Representations for LLM Fine-Tuning

**【学习大模型高效微调层级低秩表征】**

**arXiv**: https://arxiv.org/abs/2605.07850  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07850  
**HF Paper**: https://hf-mirror.com/papers/2605.07850  
**HF Votes**: 17

## 简要摘要

*自然语言处理;大型语言模型;参数高效微调*

现有低秩微调方法需预设静态秩或采样训练导致效率与性能不佳。
提出MatryoshkaLoRA框架引入对角矩阵学习层级低秩表征实现动态秩选择。

---

# What if AI systems weren't chatbots?

**【批判聊天机器人AI范式弊端】**

**arXiv**: https://arxiv.org/abs/2605.07896  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07896  
**HF Paper**: https://hf-mirror.com/papers/2605.07896  
**HF Votes**: 7

## 简要摘要

*人机交互;对话系统;AI社会影响分析*

背景/任务：人工智能向聊天机器人界面快速收敛，但该范式并非中性选择，而是重塑社会技术结构的主导配置。
做了什么：分析聊天机器人范式在满足需求、影响工作学习模式及造成社会负面效应等方面的结构性缺陷，并提出了超越聊天机器人的多元化AI发展路径。

---

# Trajectory as the Teacher: Few-Step Discrete Flow Matching via Energy-Navigated Distillation

**【离散流匹配蒸馏改进轨迹】**

**arXiv**: https://arxiv.org/abs/2605.07924  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.07924  
**HF Paper**: https://hf-mirror.com/papers/2605.07924  

## 简要摘要

*自然语言处理;文本生成;离散流匹配蒸馏*

离散流匹配生成文本需要多步迭代，通过蒸馏用多步轨迹训练少步学生模型时，轨迹质量不佳是性能瓶颈。
提出轨迹塑形离散流匹配，在训练时用轻量能量指南为轨迹中点选择更连贯的延续，大幅提升少步学生模型的生成质量与速度。

---

# Fast Byte Latent Transformer

**【加速字节级语言模型生成】**

**arXiv**: https://arxiv.org/abs/2605.08044  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08044  
**HF Paper**: https://hf-mirror.com/papers/2605.08044  
**HF Votes**: 9

## 简要摘要

*自然语言处理;语言模型;字节级语言模型生成效率*

现有字节级语言模型性能媲美分词模型，但逐字节自回归生成速度慢。
提出融合扩散目标的训练方法以并行生成字节，并引入推测式解码思想，在保持或提升生成质量的同时显著减少前向传播次数。

---

# LLMs Improving LLMs: Agentic Discovery for Test-Time Scaling

**【大型语言模型推理自动优化】**

**arXiv**: https://arxiv.org/abs/2605.08083  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08083  
**HF Paper**: https://hf-mirror.com/papers/2605.08083  
**HF Votes**: 60

## 简要摘要

*自然语言处理;推理优化;测试时计算分配*

现有测试时扩展策略依赖手工设计，未能充分探索计算分配空间。
提出AutoTTS框架，通过构建环境自动搜索策略，在数学推理任务上以低成本发现高效策略。

---

# MLS-Bench: A Holistic and Rigorous Assessment of AI Systems on Building Better AI

**【评估AI系统能否发明机器学习方法  】**

**arXiv**: https://arxiv.org/abs/2605.08678  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08678  
**HF Paper**: https://hf-mirror.com/papers/2605.08678  
**HF Votes**: 7

## 简要摘要

*机器学习;机器学习基准;AI系统方法发现  *

现代AI需要发明通用且可扩展的机器学习方法，而非仅应用现有方法  
提出了MLS-Bench基准，测试AI系统在140项任务中发明并验证方法的能力，发现当前系统仍有局限，瓶颈在于科学洞察力

---

# From Holo Pockets to Electron Density: GPT-style Drug Design with Density

**【基于电子密度生成药物分子】**

**arXiv**: https://arxiv.org/abs/2605.08767  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.08767  
**HF Paper**: https://hf-mirror.com/papers/2605.08767  
**HF Votes**: 1

## 简要摘要

*计算化学;基于结构的药物设计;电子密度条件分子生成*

现有药物设计方法依赖结合口袋的空结构，忽略了配体等填充物的信息。
我们提出EDMolGPT，用低分辨率电子密度作为条件，通过自回归模型生成具有3D构象的分子。

---
