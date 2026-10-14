# 用真实的奖励错配题完成第一个 GRPO 项目

> 面向刚入学、懂基本 Transformer 但不熟悉强化学习的博士生。本项目明确不使用数学、算术、数学问答或数学推理任务；智能体只做简化交通决策。

## 1. 项目目标

强化学习通常没有逐 token 的标准答案。模型先采样动作，环境依据行为给奖励，再用奖励的相对好坏更新策略。GRPO（Group Relative Policy Optimization）在同一提示下采样一组回答，比较组内奖励并形成相对优势。

本项目用一个交通决策任务学习完整管线：生成 `merge`（并入）或 `park`（停车），计算代理奖励和真实目标奖励，训练一个简化策略，最后检查是否出现 reward hacking。它不是数学题，也不要求模型回答数学问题。

## 2. 真实课程原题

核心题目来自 Stanford University CS234: Reinforcement Learning, Winter 2026 的 [Assignment 1 PDF](https://web.stanford.edu/class/cs234/assignments/a1/CS234_A1_Questions.pdf)，课程入口见 [Assignments 页面](https://web.stanford.edu/class/cs234/assignments.html)。下面英文是 PDF 中 Problem 2 的原文，保持原样：

> **2 Reward Hacking [5 pts]**
>
> Q1 illustrates how the particular horizon and discount factor may lead to to very different policies, even with the same reward and dynamics model. This may lead to unintentional reward hacking, where the resulting policy does not match a human stakeholder’s intended outcome. This problem asks you to think about an example where reward hacking may occur, introduced by Pan, Bhatia and Steinhardt1. Consider designing RL for autonomous cars where the goal is to have decision policies that minimize the mean commute for all drivers (those driven by humans and those driven by AI). This reward might be tricky to specify (it depends on the destination of each car, etc) but a simpler reward (called the reward "proxy") is to maximize the mean velocity of all cars. Now consider a scenario where there is a single AI car (the red car in the figure) and many cars driven by humans (the grey car).
>
> In this setting, under this simpler "proxy" reward, the optimal policy for the red (AI) car is to park and not merge onto the highway.2
>
> Figure 1: Pan, Bhatia, Steinhardt ICLR 2022; https://openreview.net/pdf?id=JYtwGwIL7ye
>
> (a) Explain why the optimal policy for the AI car is not to merge onto the highway. [2 pts]
>
> (b) Note this behavior is not aligned with the true reward function. Share some ideas about alternate reward functions (that are not minimizing commute) that might still be easier to optimize, but would not result in the AI car never merging. Your answer should be 2-5 sentences and can include equations: there is not a single answer and reasonable solutions will be given full credit. [3 pts]

原题让学生解释“最大化全体车辆平均速度”这一代理目标为什么会让 AI 车停车，以及如何提出更合适的奖励。原题没有要求实现 GRPO 或训练语言模型。

## 3. 原题与教学扩展的边界

**课程原题**：上面的 Problem 2 逐字文本及其两个问答要求。

**本文教学扩展**：把交通冲突做成可运行的 toy environment；实现 `merge/park` 解析、proxy/intended 两种奖励、rollout、组内优势、简化 GRPO 更新、TRL 训练接口和独立评估。扩展不是 Stanford 作业的要求，数值和代码均为本项目设计。

## 4. 环境：只做交通决策

每个场景给策略一个短提示，输出只能是 `merge` 或 `park`。

```python
# environment.py
from dataclasses import dataclass

@dataclass(frozen=True)
class Scenario:
    prompt: str
    congestion: str
    urgency: str

SCENARIOS = [
    Scenario("A crowded highway is slow; your destination is nearby.", "high", "low"),
    Scenario("The highway is clear; your destination is far away.", "low", "high"),
    Scenario("Traffic is dense, but an emergency vehicle is behind you.", "high", "high"),
]

def normalize_action(text: str) -> str:
    token = text.strip().lower().split()[0] if text.strip() else ""
    return token if token in {"merge", "park"} else "invalid"

def proxy_reward(s, action):
    # 教学扩展：模仿“全局平均速度”代理指标。
    if action == "park": return 1.0
    if action == "merge" and s.congestion == "high": return -1.0
    return 0.2

def intended_reward(s, action):
    # 教学扩展：考虑任务完成、拥堵和安全的独立目标。
    if action == "invalid": return -2.0
    if action == "merge" and s.urgency == "high": return 1.0
    if action == "park" and s.urgency == "low": return 0.6
    return -0.4
```

这些数字不是原题数据。训练只看 proxy 时，策略可能学会“永远停车”；评估用 intended reward 才能发现目标错配。

## 5. Rollout 与组内优势

对同一提示采样 (G) 个动作，得到 (r_1,ldots,r_G)。组内优势是每个奖励相对于本组平均水平的差异：

```python
# rollout.py
import torch

def group_advantage(rewards, eps=1e-6):
    center = rewards.mean()
    scale = rewards.std(unbiased=False).clamp_min(eps)
    return (rewards - center) / scale
```

它不是“标准答案监督”：高奖励样本提高概率，低奖励样本降低概率；若一组奖励完全相同，优势接近零，更新也应很小。

## 6. 简化 GRPO 更新

正式实现还会有参考策略、裁剪比率和 KL 正则。教学版本先展示核心关系：新旧策略概率比率乘组内优势。

```python
def grpo_loss(new_logps, old_logps, advantages, clip_eps=0.2):
    ratio = (new_logps - old_logps).exp()
    clipped = ratio.clamp(1 - clip_eps, 1 + clip_eps)
    objective = torch.minimum(ratio * advantages, clipped * advantages)
    return -objective.mean()
```

这与 SFT 都使用小批量梯度下降，但监督信号不同：SFT 有固定目标 token；GRPO 的方向来自采样行为的奖励。实际工程可以使用 TRL：

```python
from trl import GRPOConfig, GRPOTrainer

args = GRPOConfig(
    output_dir="runs/traffic-grpo",
    num_generations=8,
    per_device_train_batch_size=2,
    max_completion_length=4,
)
trainer = GRPOTrainer(
    model=model,
    reward_funcs=[proxy_reward_for_completion],
    args=args,
    train_dataset=prompt_dataset,
)
trainer.train()
```

奖励函数应把非法输出判为低奖励，并记录原始生成文本。

## 7. 实验计划

做三组对照：

| 实验 | 训练奖励 | 目的 |
| --- | --- | --- |
| A | 仅 proxy | 观察是否倾向永远停车 |
| B | proxy 加安全约束 | 观察简单约束能否减少坏行为 |
| C | proxy 训练、intended 评估 | 独立测量目标错配 |

每次保存提示、生成文本、动作、两个奖励、策略概率、随机种子。至少报告平均 proxy reward、平均 intended reward、`park/merge/invalid` 比例。若 proxy 上升而 intended 下降，并且 `park` 明显增加，才可以称为观察到 reward hacking；若没有出现，应如实报告并检查奖励尺度、场景分布和采样温度。

## 8. 完成标准

- [ ] 能链接 Stanford 官方 PDF，并逐字保留 Problem 2。
- [ ] 明确原题与教学扩展边界。
- [ ] 同一提示采样多个候选并计算组内优势。
- [ ] 完成 A/B/C 对照，同时报告两种奖励。
- [ ] 记录生成文本和随机种子，结果可复查。
- [ ] 全部任务是交通决策，不包含数学或算术题。

## QA

暂无问答

## 参考资料

1. Stanford University, [CS234 Assignments](https://web.stanford.edu/class/cs234/assignments.html).
2. Stanford University, [CS234 Winter 2026 Assignment 1 Questions PDF](https://web.stanford.edu/class/cs234/assignments/a1/CS234_A1_Questions.pdf).
3. Pan, Bhatia, Steinhardt, [The Effects of Reward Misspecification](https://openreview.net/pdf?id=JYtwGwIL7ye), ICLR 2022.
4. Hugging Face TRL, [GRPO Trainer](https://huggingface.co/docs/trl/main/en/grpo_trainer).
