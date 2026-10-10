const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const knowledge = path.resolve(__dirname, '..');
const allowedTags = JSON.parse(fs.readFileSync(path.join(knowledge, 'tags.json'), 'utf8'));
const entries = JSON.parse(fs.readFileSync(path.join(knowledge, 'index.json'), 'utf8'));
assert(Array.isArray(allowedTags) && allowedTags.length > 0, '候选标签文件必须是非空数组');
assert.equal(new Set(allowedTags).size, allowedTags.length, '候选标签不能重复');
const sequencesByDate = new Map();
for (const entry of entries) {
  assert(Array.isArray(entry.tags) && entry.tags.length > 0, `${entry.slug} 至少需要一个标签`);
  assert.equal(new Set(entry.tags).size, entry.tags.length, `${entry.slug} 的标签不能重复`);
  for (const tag of entry.tags) assert(allowedTags.includes(tag), `${entry.slug} 使用了未登记标签 ${tag}`);
  assert.match(entry.date, /^\d{4}-\d{2}-\d{2}$/, `${entry.slug} 日期格式无效`);
  assert.equal(new Date(entry.date).toISOString().slice(0, 10), entry.date, `${entry.slug} 日期无效`);
  assert(Number.isSafeInteger(entry.sequence) && entry.sequence > 0, `${entry.slug} 当天序号无效`);
  const sequences = sequencesByDate.get(entry.date) || [];
  sequences.push(entry.sequence);
  sequencesByDate.set(entry.date, sequences);
}
for (const [date, sequences] of sequencesByDate) {
  assert.deepEqual(sequences.slice().sort((a, b) => a - b),
    Array.from({length: sequences.length}, (_, index) => index + 1), `${date} 的当天序号应从 1 连续排列`);
}
assert.equal(entries.find(entry => entry.slug === 'interview-code-diffusion-transformer-flow-matching-vit')?.title,
  '手撕 Diffusion、Transformer、Flow Matching、ViT');
const page = fs.readFileSync(path.join(knowledge, 'article.html'), 'utf8');
const indexPage = fs.readFileSync(path.join(knowledge, 'index.html'), 'utf8');
const compareStart = indexPage.indexOf('    function entryOrderKey(');
const compareEnd = indexPage.indexOf('    function renderButtons()', compareStart);
assert(compareStart >= 0 && compareEnd > compareStart, '找不到 Knowledge 目录排序函数');
const ordering = vm.createContext({});
vm.runInContext(indexPage.slice(compareStart, compareEnd), ordering);
const sorted = entries.slice().sort(ordering.compareEntries);
assert.deepEqual(sorted.map(entry => entry.slug), [
  'deepseek-v4-v4-1-training-paradigm',
  'deepseek-v1-training-paradigm',
  'ppo-grpo',
  'reinforcement-learning-introduction',
  'llm-introduction-six-stages',
  'jev-decision-model',
  'interview-code-diffusion-transformer-flow-matching-vit',
]);
assert.deepEqual(sorted.filter(entry => entry.tags.includes('llm扫盲2610')).map(entry => entry.title), [
  'LLM 入门（五）：DeepSeek-V4 与 V4.1',
  'LLM 入门（四）：DeepSeek-V1 怎么训练',
  'LLM 入门（三）：PPO 与 GRPO，语言模型如何用奖励学会更好的回答',
  'LLM 入门（二）：强化学习入门，让模型通过试错学会行动',
  'LLM 入门（一）：基础概念和六个阶段',
]);
const browser = {
  location: new URL('https://example.test/daily-papers/knowledge/'),
  history: {
    pushState(_state, _title, url) { browser.location = new URL(url); },
    replaceState(_state, _title, url) { browser.location = new URL(url); },
  },
};
const filterInput = {value: ' GRPO '};
const filters = vm.createContext({
  URL, URLSearchParams, window: browser, searchInput: filterInput,
  selectedTag: 'llm扫盲2610', allowedTags,
});
vm.runInContext(indexPage.slice(compareStart, compareEnd), filters);
filters.syncFilterUrl(false);
assert.equal(browser.location.searchParams.get('tag'), 'llm扫盲2610');
assert.equal(browser.location.searchParams.get('q'), 'GRPO');
browser.location = new URL('https://example.test/daily-papers/knowledge/?tag=llm&q=DeepSeek');
filters.restoreFiltersFromUrl();
assert.equal(filters.selectedTag, 'llm');
assert.equal(filterInput.value, 'DeepSeek');
assert.match(indexPage, /button\.addEventListener\('click', \(\) => \{[\s\S]*?syncFilterUrl\(false\)/);
assert.match(indexPage, /searchInput\.addEventListener\('input', \(\) => \{ syncFilterUrl\(true\)/);
assert.match(indexPage, /window\.addEventListener\('popstate', \(\) => \{ restoreFiltersFromUrl\(\)/);
assert.match(indexPage, /<time datetime="\$\{escapeHtml\(entry\.date\)\}">\$\{escapeHtml\(entry\.date\)\}<\/time> · \$\{String\(entry\.sequence\)\.padStart\(2, '0'\)\}/);
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
assert.equal((jevHtml.match(/<h2>/g) || []).length, 8);
for (const entry of entries) {
  const source = fs.readFileSync(path.join(knowledge, entry.path), 'utf8');
  assert.equal((source.match(/^## QA\s*$/gm) || []).length, 1, `${entry.slug} 应有一个 QA 区块`);
  assert.match(source, /\n## QA\s*\n[\s\S]*$/, `${entry.slug} 的 QA 应位于正文末尾`);
  const rendered = context.renderMarkdownWithCollapses(source);
  assert.match(rendered, /<h2>QA<\/h2>/, `${entry.slug} 的 QA 应正常渲染`);
}
const introduction = entries.find(entry => entry.slug === 'llm-introduction-six-stages');
assert.deepEqual(introduction?.tags, ['llm扫盲2610', 'llm']);
const introductionMarkdown = fs.readFileSync(path.join(knowledge, introduction.path), 'utf8');
const introductionHtml = context.renderMarkdownWithCollapses(introductionMarkdown);
assert.match(introductionHtml, /<h1>LLM 入门（一）：基础概念和六个阶段<\/h1>/);
for (const stage of ['一、Transformer', '二、预训练', '三、SFT', '四、奖励与强化学习', '五、PPO 与 GRPO', '六、推理模型训练与评估']) {
  assert.match(introductionHtml, new RegExp(`<h2>${stage}`), `${stage} 应有独立小节`);
}
assert.equal((introductionHtml.match(/<img /g) || []).length, 3, 'LLM 入门文应有三张原始配图');
assert.match(introductionHtml, /The Illustrated GPT-2/);
assert.match(introductionHtml, /InstructGPT/);
assert.match(introductionHtml, /DeepSeekMath/);

// 本轮 Knowledge 文章：只检查索引、正文路径和基本图片/标题约定；正文内容仍由主代理审阅。
const newKnowledgeArticles = [
  {
    slug: 'reinforcement-learning-introduction',
    heading: 'LLM 入门（二）：强化学习入门，让模型通过试错学会行动',
    path: 'posts/reinforcement-learning-introduction/article.md',
    requiredImage: 'assets/rl-diagram.png',
  },
  {
    slug: 'ppo-grpo',
    heading: 'LLM 入门（三）：PPO 与 GRPO，语言模型如何用奖励学会更好的回答',
    path: 'posts/ppo-grpo/article.md',
  },
  {
    slug: 'deepseek-v1-training-paradigm',
    heading: 'LLM 入门（四）：DeepSeek-V1 怎么训练',
    path: 'posts/deepseek-v1-training-paradigm/article.md',
    requiredImage: 'assets/pretrain_metric.png',
  },
  {
    slug: 'deepseek-v4-v4-1-training-paradigm',
    heading: 'LLM 入门（五）：DeepSeek-V4 与 V4.1',
    path: 'posts/deepseek-v4-v4-1-training-paradigm/article.md',
    requiredImages: ['assets/deepseek-v4-architecture.svg', 'assets/deepseek-v4-1-flash-architecture.svg'],
  },
];
for (const item of newKnowledgeArticles) {
  const entry = entries.find(candidate => candidate.slug === item.slug);
  assert(entry, `${item.slug} 必须登记在 Knowledge 索引中`);
  assert.equal(entry.path, item.path, `${item.slug} 的正文路径不一致`);
  const articlePath = path.join(knowledge, item.path);
  assert(fs.existsSync(articlePath), `${item.slug} 正文文件不存在`);
  const articleSource = fs.readFileSync(articlePath, 'utf8');
  assert.match(articleSource, new RegExp(`^# ${item.heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm'), `${item.slug} 标题不一致`);
  for (const requiredImage of item.requiredImages || (item.requiredImage ? [item.requiredImage] : [])) {
    assert(fs.existsSync(path.join(knowledge, path.dirname(item.path), requiredImage)), `${item.slug} 图片素材不存在`);
  }
}
assert.match(page, /buildArticleToc\(\)/);
assert.match(page, /details\.className = 'article-toc'/);
console.log('Knowledge 标签与代码块渲染检查通过');
