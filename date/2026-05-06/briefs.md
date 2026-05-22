# 2026-05-06 全量简报

# How Fast Should a Model Commit to Supervision? Training Reasoning Models on the Tsallis Loss Continuum

**【调整推理模型训练速度  】**

**arXiv**: https://arxiv.org/abs/2604.25907  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2604.25907  
**HF Paper**: https://hf-mirror.com/papers/2604.25907  
**HF Votes**: 2

## 简要摘要

*自然语言处理;模型训练与优化;推理模型冷启动问题  *

在仅有输出层面监督的后训练中，当初始成功概率低时，推理模型适应新任务会陷入停滞。  
提出一个基于Tsallis q对数的损失函数族，可在探索与密度估计间平滑过渡，并设计两种梯度估计方法以有效逃离冷启动。

---

# Skills-Coach: A Self-Evolving Skill Optimizer via Training-Free GRPO

**【大模型技能自动优化框架】**

**arXiv**: https://arxiv.org/abs/2604.27488  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2604.27488  
**HF Paper**: https://hf-mirror.com/papers/2604.27488  
**HF Votes**: 4

## 简要摘要

*大语言模型;智能代理;技能优化*

当前基于大语言模型的智能代理技能生态较为零散，需提升其技能的全面性和能力边界。
提出了名为Skills-Coach的自动化框架，通过四个核心模块生成测试任务、优化提示与代码、对比执行与评估，有效提升了多种技能的性能。

---

# Beyond SFT-to-RL: Pre-alignment via Black-Box On-Policy Distillation for Multimodal RL

**【大模型多模态后训练新方法  】**

**arXiv**: https://arxiv.org/abs/2604.28123  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2604.28123  
**HF Paper**: https://hf-mirror.com/papers/2604.28123  
**HF Votes**: 41

## 简要摘要

*机器学习;强化学习;多模态大模型对齐  *

现有大模型后训练方法存在分布漂移问题，影响下游强化学习效果。  
我们提出PRISM方法，在微调和强化学习间增加黑盒对抗对齐阶段，使用混合专家判别器提供解耦校正，提升多任务性能。

---

# X2SAM: Any Segmentation in Images and Videos

**【视觉对话模型实现图像视频统一分割】**

**arXiv**: https://arxiv.org/abs/2605.00891  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.00891  
**HF Paper**: https://hf-mirror.com/papers/2605.00891  
**HF Votes**: 20

## 简要摘要

*计算机视觉;图像与视频分割;视频视觉接地分割*

当前多模态大模型在图像级理解上表现优秀，但像素级感知能力不足，而基础分割模型无法理解复杂对话指令，现有分割大模型也通常局限于图像或视频中的单一模态。
我们提出X2SAM，一个能通过对话指令和视觉提示，在图像和视频中实现统一分割的多模态大模型，它结合了语言模型与掩码记忆模块以生成时序一致的视频掩码，并在多种分割任务上表现优异。

---

# Chain of Evidence: Pixel-Level Visual Attribution for Iterative Retrieval-Augmented Generation

**【像素级视觉溯源增强多步查询生成】**

**arXiv**: https://arxiv.org/abs/2605.01284  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.01284  
**HF Paper**: https://hf-mirror.com/papers/2605.01284  
**HF Votes**: 1

## 简要摘要

*多模态信息检索;视觉问答;迭代检索增强生成*

针对多步查询生成系统存在的证据定位不精确和视觉语义丢失问题
提出链式证据框架直接对文档截图进行像素级视觉推理与溯源

---

# ESARBench: A Benchmark for Agentic UAV Embodied Search and Rescue

**【无人机搜救智能体基准构建】**

**arXiv**: https://arxiv.org/abs/2605.01371  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.01371  
**HF Paper**: https://hf-mirror.com/papers/2605.01371  
**HF Votes**: 4

## 简要摘要

*机器人技术;具身智能;无人机搜救*

现有无人机搜救研究缺乏统一的具身智能体评估基准。
提出了具身搜救新任务并构建首个综合基准，评估多模态大模型驱动的无人机在真实场景下的搜救能力。

---

# TCDA: Thread-Constrained Discourse-Aware Modeling for Conversational Sentiment Quadruple Analysis

**【对话情感四元分析建模】**

**arXiv**: https://arxiv.org/abs/2605.01717  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.01717  
**HF Paper**: https://hf-mirror.com/papers/2605.01717  
**HF Votes**: 4

## 简要摘要

*自然语言处理；情感分析；对话情感四元分析*

对话情感四元分析任务需要建模多轮对话中的复杂关联。
我们提出了结合线程约束有向无环图和篇章感知旋转位置编码的新框架，以提升分析性能。

---

# HeavySkill: Heavy Thinking as the Inner Skill in Agentic Harness

**【智能体协作中的深度思考技能】**

**arXiv**: https://arxiv.org/abs/2605.02396  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.02396  
**HF Paper**: https://hf-mirror.com/papers/2605.02396  
**HF Votes**: 17

## 简要摘要

*自然语言处理;智能体与大语言模型;复杂推理任务*

近期基于编排框架的多智能体系统在复杂推理任务上取得成功，但驱动性能的内在机制尚不明确。
提出将深度思考视为内在技能，通过两阶段管道提升推理能力，并可通过强化学习进行扩展。

---

# Reinforcement Learning for LLM-based Multi-Agent Systems through Orchestration Traces

**【多智能体系统强化学习设计  】**

**arXiv**: https://arxiv.org/abs/2605.02801  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.02801  
**HF Paper**: https://hf-mirror.com/papers/2605.02801  
**HF Votes**: 5

## 简要摘要

*机器学习;强化学习;大语言模型多智能体协同  *

研究如何通过强化学习优化基于大语言模型的多智能体系统中的团队协同过程。  
论文提出了“编排轨迹”的分析框架，系统梳理了奖励设计、信号分配和决策分解三个技术轴，并分析了学术方法与工业实践的差距。

---

# StateSMix: Online Lossless Compression via Mamba State Space Models and Sparse N-gram Context Mixing

**【在线无损压缩新方法  】**

**arXiv**: https://arxiv.org/abs/2605.02904  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.02904  
**HF Paper**: https://hf-mirror.com/papers/2605.02904  
**HF Votes**: 5

## 简要摘要

*机器学习;序列建模;无损数据压缩  *

提出一种在线训练的无损压缩方法，结合Mamba状态空间模型与稀疏N元语法上下文混合。  
该方法无需预训练，在压缩文件上逐标记训练，通过状态空间模型提供概率估计，并辅以N元语法表精确记忆模式，实现了优于传统压缩算法的性能。

---

# Generate, Filter, Control, Replay: A Comprehensive Survey of Rollout Strategies for LLM Reinforcement Learning

**【大模型强化学习的轨迹策略综述】**

**arXiv**: https://arxiv.org/abs/2605.02913  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.02913  
**HF Paper**: https://hf-mirror.com/papers/2605.02913  
**HF Votes**: 5

## 简要摘要

*机器学习;强化学习;大语言模型后训练*

强化学习已成为提升大语言模型推理能力的核心后训练工具，其中轨迹采样策略的设计至关重要，但常被忽视。
本文提出了一个与优化器无关的轨迹策略分析框架，系统梳理了轨迹生成、过滤、控制与重放的完整生命周期，并辅以案例研究和问题诊断。

---

# Healthcare AI GYM for Medical Agents

**【医疗AI智能体强化学习训练研究】**

**arXiv**: https://arxiv.org/abs/2605.02943  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.02943  
**HF Paper**: https://hf-mirror.com/papers/2605.02943  
**HF Votes**: 2

## 简要摘要

*强化学习;智能体与多智能体系统;医疗智能体训练*

临床推理需要多轮交互，但通用的医疗AI智能体训练环境稀缺。
构建医疗AI智能体训练环境，提出新训练方法提升稳定性和效果。

---

# ARIS: Autonomous Research via Adversarial Multi-Agent Collaboration

**【基于多智能体对抗协作的自主科研系统】**

**arXiv**: https://arxiv.org/abs/2605.03042  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03042  
**HF Paper**: https://hf-mirror.com/papers/2605.03042  
**HF Votes**: 95

## 简要摘要

*机器学习;大语言模型系统;自主科研工作流保障*

现有AI自主科研系统易产生证据不足的可信陈述
提出ARIS系统，通过对抗协作、分层架构及多重校验保障研究质量

---

# The TTS-STT Flywheel: Synthetic Entity-Dense Audio Closes the Indic ASR Gap Where Commercial and Open-Source Systems Fail

**【提升印地语系混合语音识别准确率】**

**arXiv**: https://arxiv.org/abs/2605.03073  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03073  
**HF Paper**: https://hf-mirror.com/papers/2605.03073  
**HF Votes**: 2

## 简要摘要

*自然语言处理;语音识别;印地语系混合语音实体识别*

现有开源和商业语音识别系统在印度语言混合实体音频上表现不佳。
我们通过低成本合成数据和微调方法，显著提高了印度语言的混合实体识别准确率。

---

# PatRe: A Full-Stage Office Action and Rebuttal Generation Benchmark for Patent Examination

**【专利审查与答辩建模新基准】**

**arXiv**: https://arxiv.org/abs/2605.03571  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03571  
**HF Paper**: https://hf-mirror.com/papers/2605.03571  
**HF Votes**: 5

## 简要摘要

*自然语言处理;法律人工智能;专利审查生成与反驳*

针对专利审查过程复杂且交互性强的特点，现有研究未能充分建模其动态多轮特性。
提出了首个覆盖专利审查全周期的基准PatRe，包含真实案例并支持多种评估设置，通过实验揭示了不同大模型在模拟该任务上的能力差异。

---

# Workspace-Bench 1.0: Benchmarking AI Agents on Workspace Tasks with Large-Scale File Dependencies

**【测评AI代理处理多文件任务能力  】**

**arXiv**: https://arxiv.org/abs/2605.03596  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03596  
**HF Paper**: https://hf-mirror.com/papers/2605.03596  
**HF Votes**: 5

## 简要摘要

*智能代理;任务导向系统;工作空间学习  *

现有基准难以评估AI代理在包含大量真实文件依赖的工作空间中完成任务的能力。  
构建了包含大规模真实文件依赖的工作空间基准Workspace-Bench，并评估了现有代理模型，发现其性能远低于人类水平。

---

# A Benchmark for Interactive World Models with a Unified Action Generation Framework

**【构建交互式世界模型评测基准】**

**arXiv**: https://arxiv.org/abs/2605.03941  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.03941  
**HF Paper**: https://hf-mirror.com/papers/2605.03941  
**HF Votes**: 2

## 简要摘要

*世界模型;交互与推理;评测基准*

当前研究缺乏评估交互世界模型能力的大规模统一基准。
提出了包含数据集、任务框架和评测的iWorld-Bench基准，并评估了14个模型以揭示其局限。

---

# SymptomAI: Towards a Conversational AI Agent for Everyday Symptom Assessment

**【面向日常症状评估的对话AI研究】**

**arXiv**: https://arxiv.org/abs/2605.04012  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.04012  
**HF Paper**: https://hf-mirror.com/papers/2605.04012  
**HF Votes**: 9

## 简要摘要

*智能交互系统;医疗对话系统;症状访谈与鉴别诊断*

现有研究难以评估大模型对日常症状的诊断能力。
开发了对话AI进行端到端症状访谈，其诊断准确性优于临床医生，并利用其诊断结果分析了穿戴设备数据与疾病的关联。

---

# OpenSeeker-v2: Pushing the Limits of Search Agents with Informative and High-Difficulty Trajectories

**【用高质量轨迹训练搜索智能体  】**

**arXiv**: https://arxiv.org/abs/2605.04036  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.04036  
**HF Paper**: https://hf-mirror.com/papers/2605.04036  
**HF Votes**: 59

## 简要摘要

*自然语言处理;智能体;搜索智能体  *

前沿大语言模型智能体需要强大的搜索能力，但相关开发往往被工业巨头垄断。  
我们通过三项数据合成改进构建了高质量轨迹数据集，仅用监督微调就训练出的搜索智能体在多个基准测试中超越了使用复杂训练流程的工业模型。

---

# StableI2I: Spotting Unintended Changes in Image-to-Image Transition

**【评估图像生成内容一致性】**

**arXiv**: https://arxiv.org/abs/2605.04453  
**AlphaXiv**: https://www.alphaxiv.org/zh/overview/2605.04453  
**HF Paper**: https://hf-mirror.com/papers/2605.04453  
**HF Votes**: 9

## 简要摘要

*计算机视觉;图像生成与编辑;图像到图像转换评估*

现有图像生成评估主要关注指令跟随和图像质量，忽略了输出图像对输入图像内容与结构的一致保持。
我们提出了无需参考图像的评估框架StableI2I和对应评测基准，以衡量内容保真度与一致性，并与人类判断强相关。

---
