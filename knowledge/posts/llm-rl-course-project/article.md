# LLM 强化学习大作业：从奖励漏洞到 GRPO

如果一个刚开始学习 LLM 强化学习的学生只能做一个项目，我建议做一个**奖励设计与奖励投机实验**：让模型在一个很小的交通决策环境里选择行动，并观察“看起来变好的奖励”为什么可能没有带来真正想要的行为。这个主题不做数学题，也不把“回答算术题”当作训练目标；它把强化学习里最容易被忽略的环节——奖励到底代表什么——变成可以运行、可以复现、可以讨论的实验。

本作业的题面依据 Stanford CS234《Reinforcement Learning》Winter 2026 Assignment 1 的 **Problem 2: Reward Hacking**。下面的英文题面是从 Stanford 官方 assignment PDF 原样引用的；它是课程原题，不是我们改写后的题目。后文的代码、实验分解和 GRPO 接入是为了帮助学生学习而补充的路径，不能冒充 Stanford 原题。

## 先说清楚：项目要学什么

学生最后要看懂并跑通下面这条闭环：

```text
模型根据交通状态生成行动
    → 环境执行行动并返回奖励
    → 同一个状态采样多个候选行动
    → 用组内相对奖励得到优势
    → 用策略损失更新模型
    → 新模型再次行动并在独立场景上评估
```

其中，模型可以输出 `merge`（并入高速）或 `wait`（等待），也可以附带一句理由。真正的训练信号来自一个小型、可重复的环境，而不是人工给每个 token 标注“正确答案”。学生会同时看到两种奖励：

- **代理奖励（proxy reward）**：例如所有车辆的平均速度；它容易计算，却可能鼓励模型永远不并入高速。
- **目标奖励（intended reward）**：例如所有驾驶者的平均通勤时间或安全约束；它更接近真正目的，却更难直接定义和优化。

本作业不要求训练大模型。先用一个极小的策略模型或已有小型指令模型，重点是观察奖励、采样、优势和更新之间的因果关系。

## 核心原题：Stanford CS234 Assignment 1 Problem 2

以下内容保持 Stanford 官方 PDF 的英文原文，不改写题目。为便于网页阅读，仅使用 Markdown 引用块和换行；题目中的含义、顺序和小问保持不变。

> **2 Reward Hacking [5 pts]**
>
> Q1 illustrates how the particular horizon and discount factor may lead to to very different policies, even with the same reward and dynamics model. This may lead to unintentional reward hacking, where the resulting policy does not match a human stakeholder’s intended outcome. This problem asks you to think about an example where reward hacking may occur, introduced by Pan, Bhatia and Steinhardt1. Consider designing RL for autonomous cars where the goal is to have decision policies that minimize the mean commute for all drivers (those driven by humans and those driven by AI). This reward might be tricky to specify (it depends on the destination of each car, etc) but a simpler reward (called the reward "proxy") is to maximize the mean velocity of all cars. Now consider a scenario where there is a single AI car (the red car in the figure) and many cars driven by humans (the grey car).
>
> In this setting, under this simpler "proxy" reward, the optimal policy for the red (AI) car is to park and not merge onto the highway.2
>
> Figure 1: Pan, Bhatia, Steinhardt ICLR 2022; https://openreview.net/pdf?id=JYtwGwIL7ye
>
> **(a)** Explain why the optimal policy for the AI car is not to merge onto the highway. [2 pts]
>
> **(b)** Note this behavior is not aligned with the true reward function. Share some ideas about alternate reward functions (that are not minimizing commute) that might still be easier to optimize, but would not result in the AI car never merging. Your answer should be 2-5 sentences and can include equations: there is not a single answer and reasonable solutions will be given full credit. [3 pts]
>
> 1 ICLR 2022 https://openreview.net/pdf?id=JYtwGwIL7ye
> 2 Interestingly, it turns out that systems that use simpler function representations may reward hack less in this example than more complex representations. See Pan, Bhatia and Steinhardt’s paper "The Effects of Reward Misspecification: Mapping and Mitigating Misaligned Models" for details.

**原题来源**：Stanford University, CS234: Reinforcement Learning, Winter 2026, [Assignments 页面](https://web.stanford.edu/class/cs234/assignments.html)，[Assignment 1 PDF](https://web.stanford.edu/class/cs234/assignments/a1/CS234_A1_Questions.pdf)。题目中引用的研究来源是 Pan、Bhatia、Steinhardt 的 [The Effects of Reward Misspecification: Mapping and Mitigating Misaligned Models](https://openreview.net/pdf?id=JYtwGwIL7ye)。

### 原题与本大作业的边界

原题要求学生解释一个奖励代理导致的反常策略，并提出更好的奖励设计想法。它**不是 GRPO 题目**，也没有要求训练语言模型。我们保留原题的交通场景和问题本身不变，然后把它作为 GRPO 学习的实验主题：学生先完成 Stanford 原题，再把同一场景写成一个可以自动评分的文本决策环境。后面的“20 行子任务”和里程碑是本作业的教学扩展，不是 Stanford 课程的原题。

## 大作业总目标

题目可以写成：

> 在不修改 Stanford CS234 Problem 2 原题的前提下，完成原题的书面回答；随后构建一个小型交通决策环境，让语言模型对多个交通状态输出 `merge` 或 `wait`，分别用代理奖励和目标奖励训练/评估，最后用 GRPO 比较“奖励变高”和“行为真的符合目标”是否一致。

这里的“随后”很重要：原题答案和 GRPO 工程实验是两个可区分的交付物。不能把自己设计的环境或奖励函数写成 Stanford 的要求，也不能声称 Stanford 原题已经包含 GRPO。

## 里程碑 0：先完成原题书面部分

先不写模型代码，独立回答原题的 (a) 和 (b)：

1. 为什么在平均速度代理奖励下，AI 车辆可能选择停在入口处，而不是并入高速？
2. 哪些替代奖励仍然比较容易优化，同时不会鼓励 AI 车辆永远不并入？

这里要求引用上面的官方题面，并明确区分“代理奖励”和“真正想要的目标”。如果学生无法用自己的话解释原题，直接进入 GRPO 往往只是在调参，而不是学习强化学习。

## 里程碑 1：约 20 行代码的最小可验证任务

先不要加载模型，写一个最小的输出检查器。它只检查模型是否输出合法行动，并把行动交给一个确定性的 toy 环境。以下代码是起点，不是 Stanford 原题的改写；它故意不包含数学问答：

```python
import json

VALID_ACTIONS = {"merge", "wait"}

def parse_action(text):
    try:
        value = json.loads(text)
        action = value.get("action")
    except (TypeError, json.JSONDecodeError):
        return None
    return action if action in VALID_ACTIONS else None

def reward(text, state, objective="proxy"):
    action = parse_action(text)
    if action is None:
        return -1.0
    outcome = toy_step(state, action)
    return outcome[objective]

def toy_step(state, action):
    if action == "wait":
        return {"proxy": 0.2, "intended": -0.1}
    return {"proxy": 0.0, "intended": 0.5}

assert parse_action('{"action": "merge"}') == "merge"
assert parse_action('{"action": "park"}') is None
```

学生需要自己补充测试，而不是直接相信这段代码：非法 JSON、缺少 `action`、多余字段、大小写、空输出和两种奖励都要覆盖。`toy_step` 只是为了让链路先跑通；后面必须把它替换成文档化的多车辆环境，并解释每个奖励字段的含义。

验收标准：测试全部通过；给出至少 10 个输入输出例子；说明为什么 `proxy` 和 `intended` 可以对同一个行动给出不同评价；不能把一个固定的字符串匹配器称为已经学会了驾驶。

## 里程碑 2：从规则环境到语言模型 rollout

把状态写成短文本，例如：

```text
There is one AI car waiting at a highway entrance. Eight human-driven cars are
currently on the highway. Choose exactly one action: merge or wait.
Return JSON: {"action": "merge"} or {"action": "wait"}.
```

使用已有的小型 instruct 模型生成回答，每个状态先采样 2—4 个候选。每条记录至少包含：

```text
state, prompt, completion, parsed_action, proxy_reward, intended_reward, seed
```

这一步仍然不更新参数。学生先检查模型是否真的产生了不同候选、解析器是否稳定、两个奖励是否经常发生分歧。把 20 个场景固定为开发集，另造一批不参与训练的测试场景；测试场景改变车辆数量、拥堵位置或状态描述方式，而不是简单复制训练文本。

## 里程碑 3：手算组内奖励与优势

对同一个交通状态采样一组回答。GRPO 的关键直觉不是为每一个 token 准备人工正确答案，而是比较**同一个状态下这一组候选的相对表现**。设一组奖励为 `r_1, ..., r_G`，学生先在纸上和 Python 中计算组均值、标准差以及标准化优势：

```text
A_i = (r_i - mean(r)) / (std(r) + epsilon)
```

例如，同一状态的四个候选在 `intended_reward` 下得到 `[0.5, -0.1, 0.5, -1.0]`，选择 `merge` 的候选不一定永远更好：当拥堵或安全条件改变时，环境可以给出不同结果。学生要记录每个候选的原文、解析动作、两种奖励和优势，回答：

- 如果一组候选的奖励全部相同，为什么这一组的相对学习信号很弱？
- 如果只用 proxy reward，GRPO 可能学到什么行为？
- 用 intended reward 训练时，哪些状态仍然很难判断？

本关的输出是一个可复现的 `group_advantage.py`，以及一页解释，而不是一条漂亮的 loss 曲线。

## 里程碑 4：最小策略损失，不依赖人工正确 token

让一个很小的策略模型输出两个动作的概率，或者使用已有模型对已经生成的行动序列计算 log-probability。对采样到的序列使用最小策略损失：

```text
L_policy = - mean(A_i * log pi_theta(completion_i | state_i))
```

优势为正时，更新倾向于提高该回答的概率；优势为负时，更新倾向于降低它的概率。奖励函数不需要可导，梯度来自模型对已生成 token 的 log-probability。这里不提供“标准答案 token”；模型先行动，环境再返回奖励。

为避免学生直接调用黑盒训练器，本关先实现一次小批量更新，并打印更新前后 `merge`/`wait` 的概率。若训练使用完整语言模型，必须记录 tokenizer、响应 token 的截断策略和 batch 维度；若使用两动作 toy policy，也要在报告中写清楚它与语言模型策略的对应关系。

## 里程碑 5：对比两种奖励，而不是只追逐一个分数

固定模型、采样数和随机种子，分别做两组短实验：

1. 使用 `proxy_reward` 更新策略；
2. 使用 `intended_reward` 更新策略。

每组都报告：代理奖励、目标奖励、`merge` 比例、非法输出比例和独立测试场景表现。重点观察一种可能的结果：proxy reward 变高，但模型更常选择 `wait`，于是行为偏离了原题描述的利益目标。这个结果不是“训练失败”，而是对奖励错配的直接实验展示。

## 里程碑 6：加入 GRPO 的策略稳定性

到这里再进入完整 GRPO。对一批 rollout 保存旧策略的 log-probability，用新策略计算相同 token 的概率比，并限制一次更新不要离旧策略太远。可以采用 TRL 的 `GRPOTrainer`，但提交必须把配置和实现对应起来：

- 每个 prompt 采样多少个 completion（`num_generations`）；
- 使用哪一个 reward function，是否同时记录 proxy 和 intended；
- 是否使用 KL 约束或其他参考策略约束；
- 响应最大长度、学习率、有效 batch size、随机种子；
- 训练过程中如何处理非法 JSON 和重复回答。

TRL 的官方接口可参考 [GRPOTrainer 文档](https://huggingface.co/docs/trl/main/en/grpo_trainer)。框架版本负责工程细节，但学生仍要在报告中画出“生成 → 奖励 → 组内优势 → 策略更新”的对应关系，不能只提交一段 `trainer.train()`。

## 里程碑 7：独立评估与奖励漏洞

训练集上的 reward 不是结论。最终至少要有：

- 未参与训练的交通状态测试集；
- 两种奖励的平均值和分布；
- `merge` 与 `wait` 的行为比例；
- 非法 JSON、重复输出和超长理由的比例；
- 20 条原始模型输出及人工检查；
- 训练前后对同一测试集的对比。

专门设计奖励漏洞测试。例如模型可以在 JSON 中附加文本、利用解析器只读取第一个字段，或学会在状态词出现时固定选择一个行动。测试器应独立于训练奖励实现，至少保留一份人工检查结果；否则模型可能只是学会利用奖励函数，而不是学会合理的交通决策。

## 里程碑 8：一个小型消融实验

只选一个问题做消融即可：

1. `proxy` 与 `intended` 奖励的对比；或
2. 每个状态采样 2 个、4 个、8 个候选时，组内奖励方差和测试行为如何变化；或
3. 有无 KL 约束时，策略偏移、奖励和非法输出如何变化。

每个设置至少使用两个随机种子。报告均值和波动，给出失败案例，并解释这个结果是如何改变组内优势、探索多样性或策略稳定性的。不要把“训练 reward 最高”自动写成“模型最好”。

## 最终提交结构

```text
project/
├── README.md                 # 原题链接、实验目标和复现命令
├── original_answer.md        # Stanford 原题 (a)(b) 的书面回答
├── environment.py            # 交通状态与 toy / 多车辆环境
├── parser_and_reward.py      # JSON 解析、proxy 与 intended reward
├── rollout.py                # 采样、记录和评分
├── group_advantage.py        # 组内均值、标准差和优势
├── min_policy_update.py      # 最小策略损失更新
├── train_grpo.py             # TRL GRPOTrainer 版本
├── evaluate.py               # 独立测试与奖励漏洞检查
├── tests/                    # 解析器、环境和奖励测试
├── configs/                  # 模型、采样数、种子和训练配置
└── report.pdf                # 曲线、消融、失败案例和边界说明
```

报告必须单独回答：

1. Stanford 原题要求解释的奖励漏洞是什么？
2. 你的环境如何把原题场景变成可自动执行的状态—行动—奖励闭环？
3. 一条模型输出如何变成 `reward`、组内 `advantage` 和策略损失？
4. 使用 proxy 与 intended 奖励时，行为有什么不同？
5. 你的 GRPO 实现哪些部分来自框架，哪些部分用最小代码验证过？
6. 独立测试和奖励漏洞检查是否支持你的结论？

## 为什么这个作业适合第一次学 LLM 强化学习

它先从一个学生可以在几十行代码里检查的输出协议开始，再逐步加入 rollout、组内比较、策略梯度、旧策略和 TRL。每一步都有可观察的中间文件和可失败的测试，不需要学生先相信某个复杂 Trainer 的内部实现。

更重要的是，原题让学生先面对“奖励写错了会怎样”，而不是把强化学习理解成“找到一个 loss 并把它降下来”。这与 LLM 强化学习直接相关：无论奖励来自规则、测试用例、环境还是奖励模型，模型优化的始终是我们实际给出的信号；GRPO 能改善优化过程，却不能替人类决定这个信号是否表达了真正目的。

## 资料与引用

1. Stanford University, [CS234: Reinforcement Learning Winter 2026 Assignments](https://web.stanford.edu/class/cs234/assignments.html).
2. Stanford University, [CS234 Assignment 1 Questions PDF](https://web.stanford.edu/class/cs234/assignments/a1/CS234_A1_Questions.pdf), Problem 2: Reward Hacking.
3. Pan, Bhatia, Steinhardt, [The Effects of Reward Misspecification: Mapping and Mitigating Misaligned Models](https://openreview.net/pdf?id=JYtwGwIL7ye), ICLR 2022.
4. Hugging Face, [TRL GRPOTrainer documentation](https://huggingface.co/docs/trl/main/en/grpo_trainer).

本文没有使用 CSDN 或其他二手课程资料。Stanford assignment PDF 已下载到本次运行目录的 `work/` 供核对；正文没有实际引用本地图片素材。

## QA

暂无问答。
