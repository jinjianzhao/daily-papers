# Knowledge 维护约定

Knowledge 是独立的静态内容栏目，不接入论文检索、Survey pipeline 或 LLM 生成流程。

新增文章时：

1. 在 `posts/<slug>/article.md` 写 Markdown 正文；图片放在同一个文章目录或其子目录中。
2. 在 `index.json` 增加一条记录，填写 `slug`、`title`、`description`、`category`、`tags`、`level`、日期和 Markdown 路径。
3. 主分类从 `taxonomy.json` 的 `categories` 选择，难度从 `levels` 选择，交叉主题标签从 `tags` 选择；一篇文章可以有多个标签。
4. 目录页按 `updated_at` 倒序显示，筛选完全在浏览器中完成。

建议优先使用一个稳定的主分类，再用少量标签描述交叉主题。不要为单篇文章创建新标签。
