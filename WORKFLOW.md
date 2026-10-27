# 当前工作流

本仓库是 `daily-papers` 静态网站仓库，发布后由 GitHub Pages 展示。文章和报告先在工作区生成、检查，再复制到网站目录；网站本身没有后端，也不会自动生成内容。

## 三条内容线

### 日报、周报和月报

论文阅读 Skill 的 `run_daily` 负责发现、归档、分析和汇总日报，并同步生成 `date/`、`week/`、`month/` 等静态页面。调度器只负责按时间策略调用日报、arXiv 3D 日报和月报任务，不调用 Survey 或 Knowledge 写作。续跑必需、已校验可公开的报表状态和调度完成记录放在 `state/`，并与网站结果一同提交；下载缓存、原始错误和调试记录仍留在外部数据目录，不进 GitHub。

### Survey

Survey 是独立的文献综述流程。它必须先有用户批准的 scope contract，再依次进行发现、引用收集、分类、论文分析、综述构建和验证。Survey 的中间数据应放在：

```text
<data_root>/surveys/<survey_id>/
```

静态结果放在网站仓库：

```text
surveys/<survey_id>/
```

Survey 不修改日报、周报或月报状态，调度器也不会自动运行 Survey。网站的 Survey 目录由明确的索引记录生成，不通过扫描 HTML 猜测元数据。

### Knowledge

Knowledge 是独立的技术知识文章栏目，不属于论文检索或 Survey pipeline。Knowledge 的临时工作目录必须由主代理明确指定；本项目约定使用：

```text
daily-papers/outputs_tmp/knowledge/<YYYYMMDD>_<slug>/
```

不要使用 `/tmp`。一次 Knowledge 写作运行的目录结构为：

```text
<RUN_DIR>/
├── article.md       # subagent 唯一正文交付物
├── assets/          # 正文实际引用的本地图片
└── work/            # 下载网页、论文和候选素材
```

主代理审阅后，才把正文和素材接入：

```text
knowledge/posts/<slug>/article.md
knowledge/posts/<slug>/assets/
knowledge/index.json
```

文章末尾必须有一个 `## QA` 区块。标签只能来自 `knowledge/tags.json`；新增标签必须先登记并向用户说明。Knowledge 目录按 `date` 与同日 `sequence` 合成的时间值从晚到早排序，筛选和搜索通过浏览器 URL 参数分享。

## 检查与发布边界

Knowledge 接入后，在 `daily-papers/knowledge/` 下运行：

```bash
npm run check:render
```

它检查标签白名单、日期序号连续性、文章路径、QA 区块、代码块和必要图片。Markdown 是文章唯一正文来源，HTML 只是静态展示壳。

发布前应检查 `git diff --check`，确认日报、Survey、Knowledge 的变更没有互相覆盖。提交并推送 `daily-papers` 仓库后，GitHub Pages 才会更新；没有新的静态文件时，网站不会自行产生最新日报或知识文章。

## 关键目录

```text
daily-papers/date/          # 日报页面与日期归档
daily-papers/week/          # 周报页面
daily-papers/month/         # 月报页面
daily-papers/surveys/       # Survey 静态结果
daily-papers/knowledge/     # Knowledge 页面、索引、正文与素材
daily-papers/state/         # 可公开的报表续跑状态与调度完成记录
daily-papers/outputs_tmp/   # 显式指定的临时运行输出，不直接发布
```

论文阅读 Skill 的完整接口、Survey scope contract 和调度细节以外部 `paper-reading` Skill 的 `SKILL.md` 与 `scripts.md` 为准；本文件只记录本网站仓库的目录和交付边界。
