# Knowledge 维护约定

Knowledge 是独立的静态内容栏目，不接入论文检索、Survey pipeline 或 LLM 生成流程。

新增文章时：

1. 在 `posts/<slug>/article.md` 写 Markdown 正文；图片放在同一个文章目录或其子目录中。
2. 在 `index.json` 增加一条记录，填写 `slug`、`title`、`description`、`category`、`tags`、`level`、日期和 Markdown 路径。
3. `tags` 只能选 `tags.json` 中已批准的标签；目前只有 `手撕代码` 和 `LLM`。每篇文章最多用一个标签。不要为了文章提到了某个概念就给它贴该概念的标签。
4. 新增标签必须先修改 `tags.json`，并在交付时明确告知用户新增了哪些标签；未登记的标签会被检查脚本拒绝。
5. `category` 和 `level` 是内部元数据，不作为前台筛选标签。目录页按 `updated_at` 倒序显示，搜索和标签筛选完全在浏览器中完成。

当前手撕代码文章的归类方式：

- 标签：`手撕代码`
- `Diffusion`、`Transformer`、`Flow Matching`、`ViT` 是文章标题里的题目，不是本文的标签；只有以后出现真正以这些方向为主题的文章，并经批准扩充 `tags.json` 后，才能成为筛选标签。

“面经检索入口”只是公开搜索入口，不等于本站已经审核了搜索结果。新增资料时应保留原始链接，并核对题目原文、发布时间和代码是否可运行。
