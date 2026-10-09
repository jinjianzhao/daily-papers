const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const knowledge = path.resolve(__dirname, '..');
const allowedTags = JSON.parse(fs.readFileSync(path.join(knowledge, 'tags.json'), 'utf8'));
const entries = JSON.parse(fs.readFileSync(path.join(knowledge, 'index.json'), 'utf8'));
assert(Array.isArray(allowedTags) && allowedTags.length > 0, '候选标签文件必须是非空数组');
assert.equal(new Set(allowedTags).size, allowedTags.length, '候选标签不能重复');
for (const entry of entries) {
  assert(Array.isArray(entry.tags) && entry.tags.length > 0, `${entry.slug} 至少需要一个标签`);
  assert.equal(new Set(entry.tags).size, entry.tags.length, `${entry.slug} 的标签不能重复`);
  for (const tag of entry.tags) assert(allowedTags.includes(tag), `${entry.slug} 使用了未登记标签 ${tag}`);
}
assert.equal(entries.find(entry => entry.slug === 'interview-code-diffusion-transformer-flow-matching-vit')?.title,
  '手撕 Diffusion、Transformer、Flow Matching、ViT');
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
const introduction = entries.find(entry => entry.slug === 'llm-introduction-six-stages');
assert.deepEqual(introduction?.tags, ['llm扫盲2610', 'llm']);
const introductionMarkdown = fs.readFileSync(path.join(knowledge, introduction.path), 'utf8');
const introductionHtml = context.renderMarkdownWithCollapses(introductionMarkdown);
assert.match(introductionHtml, /<h1>LLM 入门：从会续写到会解决问题<\/h1>/);
for (const stage of ['一、Transformer', '二、预训练', '三、SFT', '四、奖励与强化学习', '五、PPO 与 GRPO', '六、推理模型训练与评估']) {
  assert.match(introductionHtml, new RegExp(`<h2>${stage}`), `${stage} 应有独立小节`);
}
assert.equal((introductionHtml.match(/<img /g) || []).length, 3, 'LLM 入门文应有三张原始配图');
assert.match(introductionHtml, /The Illustrated GPT-2/);
assert.match(introductionHtml, /InstructGPT/);
assert.match(introductionHtml, /DeepSeekMath/);
assert.match(page, /buildArticleToc\(\)/);
assert.match(page, /details\.className = 'article-toc'/);
console.log('Knowledge 标签与代码块渲染检查通过');
