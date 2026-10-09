const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const knowledge = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(knowledge, 'article.html'), 'utf8');
const markdown = fs.readFileSync(
  path.join(knowledge, 'posts/interview-code-diffusion-transformer-flow-matching-vit/article.md'),
  'utf8',
);
const start = page.indexOf('    function renderMarkdownWithCollapses(');
const end = page.indexOf('    async function decorateCodeBlocks()', start);
assert(start >= 0 && end > start, '找不到 Knowledge 正在使用的 Markdown 渲染函数');

const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(knowledge, 'assets/marked.min.js'), 'utf8'), context);
vm.runInContext(page.slice(start, end), context);
const html = context.renderMarkdownWithCollapses(markdown);
const diffusion = html.match(/<details id="diffusion-code"[\s\S]*?<\/details>/)?.[0];

assert(diffusion, 'Diffusion 折叠块丢失');
assert.equal((diffusion.match(/<pre>/g) || []).length, 1, 'Python 示例必须是一个完整代码块');
assert.match(diffusion, /<pre><code class="language-python">[\s\S]*def q_sample\([\s\S]*def diffusion_loss\([\s\S]*<\/code><\/pre>/);
assert.equal((html.match(/<pre><code class="language-python">/g) || []).length, 4);
const jevMarkdown = fs.readFileSync(
  path.join(knowledge, 'posts/jev-decision-model/article.md'),
  'utf8',
);
const jevHtml = context.renderMarkdownWithCollapses(jevMarkdown);
assert.match(jevHtml, /<h1>如何训练一个 Jev/);
assert.match(jevHtml, /<pre><code class="language-text">[\s\S]*\[1\] 账单[\s\S]*Best answer: \[[\s\S]*<\/code><\/pre>/);
assert.match(jevHtml, /完整的一行是 <code>Best answer: \[1\]<\/code>/);
assert.equal((jevHtml.match(/<h2>/g) || []).length, 7);
assert.match(page, /buildArticleToc\(\)/);
assert.match(page, /details\.className = 'article-toc'/);
console.log('Knowledge 代码块渲染检查通过');
