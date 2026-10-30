const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const knowledge = path.resolve(__dirname, '..');
const allowedTags = JSON.parse(fs.readFileSync(path.join(knowledge, 'tags.json'), 'utf8'));
const entries = JSON.parse(fs.readFileSync(path.join(knowledge, 'index.json'), 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(path.join(knowledge, 'taxonomy.json'), 'utf8')).categories;
const categoryNames = taxonomy.map(category => category.name);
assert.equal(new Set(categoryNames).size, categoryNames.length, 'Knowledge 大类不能重复');
assert(entries.every(entry => categoryNames.includes(entry.category)), '每篇文章必须使用 taxonomy.json 中登记的大类');
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
const compareEnd = indexPage.indexOf('    function makeTagButtons(', compareStart);
assert(compareStart >= 0 && compareEnd > compareStart, '找不到 Knowledge 目录排序函数');
const ordering = vm.createContext({});
vm.runInContext(indexPage.slice(compareStart, compareEnd), ordering);
const sorted = entries.slice().sort(ordering.compareEntries);
assert.deepEqual(sorted.map(entry => entry.slug), [
  'skintokens-rigging',
  'game-rigging-3d-print-parts',
  'mesh-part-segmentation',
  'llm-3d-part-generation',
  'qwenputer',
  'sam3-segment-anything',
  'blender-knight-rig-dance',
  'blender-cloth-simulation',
  '3d-graphics-foundations',
  'blender-knowledge',
  'uv-unwrapping-methods',
  'tokenizer-llm',
  'moe-llm',
  'hisa-csa-sparse-attention',
  'protein-structure-prediction',
  'zbrush-introduction',
  'embodied-world-action-model-wam',
  'llm-recursive-self-improvement',
  'ai-3d-character-rigging',
  'pi-vla-robot',
  'embodied-intelligence-introduction',
  'partpacker-omnipart-bang',
  'octree-t3lescope',
  'image-to-svg-llm',
  'llm-svg-training',
  'blenderworld-benchmark',
  'edenlive-generative-rendering',
  'diffusion-langevin-sde',
  'associative-memory',
  'deepseek-v41-flash-1017',
  'part-generation-standard',
  'matrix-game-world-model',
  'reinforce-to-grpo',
  'llm-rl-course-project',
  'minimax-h3-video-generation',
  'wan30-video-generation',
  'video-generation-introduction',
  'csa-hca-cache-compression',
  'llm-engineering-primer',
  'trl-grpo-framework',
  'deepspeed-pretraining-framework',
  'deepseek-v4-v4-1-training-paradigm',
  'deepseek-v1-training-paradigm',
  'ppo-grpo',
  'reinforcement-learning-introduction',
  'llm-introduction-six-stages',
  'jev-decision-model',
  'interview-code-diffusion-transformer-flow-matching-vit',
]);
assert.deepEqual(sorted.filter(entry => entry.tags.includes('llm扫盲2610')).map(entry => entry.title), [
  'LLM 入门（六）：大模型训练与推理的工程关键技术',
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
  selectedCategory: 'LLM', selectedTag: 'llm扫盲2610', allowedTags,
  taxonomy: JSON.parse(fs.readFileSync(path.join(knowledge, 'taxonomy.json'), 'utf8')).categories,
});
vm.runInContext(indexPage.slice(compareStart, compareEnd), filters);
filters.syncFilterUrl(false);
assert.equal(browser.location.searchParams.get('category'), 'LLM');
assert.equal(browser.location.searchParams.get('tag'), 'llm扫盲2610');
assert.equal(browser.location.searchParams.get('q'), 'GRPO');
browser.location = new URL('https://example.test/daily-papers/knowledge/?category=LLM&tag=llm&q=DeepSeek');
filters.restoreFiltersFromUrl();
assert.equal(filters.selectedCategory, 'LLM');
assert.equal(filters.selectedTag, 'llm');
assert.equal(filterInput.value, 'DeepSeek');
assert.match(indexPage, /category-links/);
assert.match(indexPage, /link\.href = `\?category=\$\{encodeURIComponent\(category\.name\)\}`/);
assert.match(indexPage, /selectedCategory = taxonomy\.some\(item => item\.name === params\.get\('category'\)\)/);
assert.doesNotMatch(indexPage, /document\.createElement\('details'\)/, 'Knowledge 分类不应使用展开式 details');
assert.match(indexPage, /taxonomy\.json/);
assert.match(indexPage, /searchInput\.addEventListener\('input', \(\) => \{ syncFilterUrl\(true\)/);
assert.match(indexPage, /window\.addEventListener\('popstate', \(\) => \{ restoreFiltersFromUrl\(\)/);
assert.match(indexPage, /<time datetime="\$\{escapeHtml\(entry\.date\)\}">\$\{escapeHtml\(entry\.date\)\}<\/time> · \$\{String\(entry\.sequence\)\.padStart\(2, '0'\)\}/);
assert.match(indexPage, /localStorage\.getItem\(readStorageKey\)/, 'Knowledge 目录应从浏览器本地读取已读状态');
assert.match(indexPage, /localStorage\.setItem\(readStorageKey/, 'Knowledge 目录应把已读状态保存到浏览器本地');
assert.match(indexPage, /class="read-button"/, 'Knowledge 卡片应提供已读按钮');
assert.match(indexPage, /window\.addEventListener\('storage'/, '已读状态应支持同源标签页同步');
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
  const rendered = context.renderMarkdownWithCollapses(source);
  const qaCount = (source.match(/^## QA\s*$/gm) || []).length;
  assert(qaCount <= 1, `${entry.slug} 至多只能有一个 QA 区块`);
  if (qaCount === 1) {
    assert.match(source, /\n## QA\s*\n[\s\S]*$/, `${entry.slug} 的 QA 应位于正文末尾`);
    assert.match(rendered, /<h2>QA<\/h2>/, `${entry.slug} 的 QA 应正常渲染`);
  }
}
const proteinEntry = entries.find(entry => entry.slug === 'protein-structure-prediction');
assert.deepEqual(proteinEntry?.tags, ['AI4S']);
const proteinSource = fs.readFileSync(path.join(knowledge, proteinEntry.path), 'utf8');
assert.match(proteinSource, /^# 蛋白质结构预测入门：从氨基酸序列到三维形状$/m);
assert.match(proteinSource, /^## 回到你给的文章：Claude 设计抗蝎毒蛋白做了什么？$/m);
for (const imagePath of ['alphafold2-figure1.png', 'alphafold3-figure1.png', 'anthropic-design-funnel.png']) {
  assert.match(proteinSource, new RegExp(`!\\[[^\\]]+\\]\\(assets/${imagePath.replace('.', '\\.')}\\)`));
  assert(fs.existsSync(path.join(knowledge, 'posts/protein-structure-prediction/assets', imagePath)));
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
    slug: 'uv-unwrapping-methods',
    heading: '从 3D 生成到可用资产：Meshy、Tripo、Hi3D 与 Rodin 的 UV 展开证据',
    path: 'posts/uv-unwrapping-methods/article.md',
  },
  {
    slug: 'llm-recursive-self-improvement',
    heading: 'LLM 的递归自我改进：从反思到自我改写的 Agent',
    path: 'posts/llm-recursive-self-improvement/article.md',
    requiredImage: 'assets/rsi-loop.svg',
  },
  {
    slug: 'ai-3d-character-rigging',
    heading: '从静态模型到可动角色：3D 绑骨入门与自动绑骨方法',
    path: 'posts/ai-3d-character-rigging/article.md',
    requiredImages: ['assets/pinocchio-overview.png', 'assets/unirig-pipeline.png'],
  },
  {
    slug: 'pi-vla-robot',
    heading: '从 VLM 到机器人动作：以 π0、π0.5 理解 VLA',
    path: 'posts/pi-vla-robot/article.md',
    requiredImages: ['assets/pi0-overview.png', 'assets/pi05-overview.png'],
  },
  {
    slug: 'embodied-intelligence-introduction',
    heading: '具身智能入门：让模型在真实世界里行动',
    path: 'posts/embodied-intelligence-introduction/article.md',
    requiredImage: 'assets/rt2-fig1.png',
  },
  {
    slug: 'partpacker-omnipart-bang',
    heading: '一件物体如何变成可编辑的零件：PartPacker、OmniPart 与 BANG',
    path: 'posts/partpacker-omnipart-bang/article.md',
    requiredImages: ['assets/partpacker-method.png', 'assets/omnipart-method.png', 'assets/bang-overview.jpg'],
  },
  {
    slug: 'octree-t3lescope',
    heading: '八叉树入门：从空间细分到 T3lescope 的场景重建',
    path: 'posts/octree-t3lescope/article.md',
    requiredImages: ['assets/method-figure.svg', 'assets/octree-schematic.svg'],
  },
  {
    slug: 'image-to-svg-llm',
    heading: '看图生成 SVG：LLM 真能把图片画成矢量图吗？',
    path: 'posts/image-to-svg-llm/article.md',
    requiredImage: 'assets/refinesvg-flow.svg',
  },
  {
    slug: 'matrix-game-world-model',
    heading: '世界模型入门：让引擎管世界、模型管画面',
    path: 'posts/matrix-game-world-model/article.md',
    requiredImages: [
      'assets/world-model-03.png',
      'assets/world-model-12.png',
      'assets/world-model-14.png',
    ],
  },
  {
    slug: 'minimax-h3-video-generation',
    heading: 'MiniMax-H3：从视频生成器到可控世界模型的范式',
    path: 'posts/minimax-h3-video-generation/article.md',
    requiredImage: 'assets/h3-world-method.png',
  },
  {
    slug: 'wan30-video-generation',
    heading: 'Wan 3.0：从视频生成范式到公开能力边界',
    path: 'posts/wan30-video-generation/article.md',
  },
  {
    slug: 'video-generation-introduction',
    heading: '视频生成入门：从文本或图像到连续画面',
    path: 'posts/video-generation-introduction/article.md',
  },
  {
    slug: 'reinforce-to-grpo',
    heading: '从 REINFORCE 到 GRPO：把大模型强化学习的训练链路讲清楚',
    path: 'posts/reinforce-to-grpo/article.md',
    requiredImages: [
      'assets/figure-01.png',
      'assets/figure-02.png',
      'assets/figure-03.png',
      'assets/figure-04.png',
      'assets/figure-05.png',
    ],
  },
  {
    slug: 'llm-rl-course-project',
    heading: '用真实的奖励错配题完成第一个 GRPO 项目',
    path: 'posts/llm-rl-course-project/article.md',
  },
  {
    slug: 'csa-hca-cache-compression',
    heading: 'LLM 长上下文工程：CSA、HCA 与分块 KV 缓存压缩',
    path: 'posts/csa-hca-cache-compression/article.md',
    requiredImage: 'assets/user-csa-hca-reference.png',
  },
  {
    slug: 'llm-engineering-primer',
    heading: 'LLM 入门（六）：大模型训练与推理的工程关键技术',
    path: 'posts/llm-engineering-primer/article.md',
  },
  {
    slug: 'deepspeed-pretraining-framework',
    heading: '预训练 LLM 框架：DeepSpeed 怎么把大模型训练跑起来',
    path: 'posts/deepspeed-pretraining-framework/article.md',
    requiredImage: 'assets/zero-memory-figure.png',
  },
  {
    slug: 'trl-grpo-framework',
    heading: 'LLM 强化学习框架：用 TRL 跑通 GRPO',
    path: 'posts/trl-grpo-framework/article.md',
    requiredImage: 'assets/grpo_pipeline.png',
  },
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
  {
    slug: 'llm-svg-training',
    heading: 'LLM 如何学会画 SVG',
    path: 'posts/llm-svg-training/article.md',
    requiredImage: 'assets/starvector-arch.png',
  },
  {
    slug: 'blenderworld-benchmark',
    heading: 'BlenderWorld：怎样检验一个智能体是否真的会用 Blender 做 3D',
    path: 'posts/blenderworld-benchmark/article.md',
    requiredImages: ['assets/benchmark-overview.jpg', 'assets/blenderworld-evaluation-pipeline.png'],
  },
  {
    slug: 'associative-memory',
    heading: '从记忆理解 Transformer',
    path: 'posts/associative-memory/article.md',
  },
  {
    slug: 'diffusion-langevin-sde',
    heading: '从朗之万动力学到随机微分方程：扩散模型的连续时间视角',
    path: 'posts/diffusion-langevin-sde/article.md',
  },
  {
    slug: 'edenlive-generative-rendering',
    heading: 'EdenLive：把可交互世界实时渲染成视频',
    path: 'posts/edenlive-generative-rendering/article.md',
    requiredImages: ['assets/system-overview.png', 'assets/streaming-pipeline.png'],
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
assert.match(page, /window\.MathJax\s*=\s*\{/,
  'Knowledge 文章页必须配置 MathJax');
assert(page.includes("displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']]"),
  'Knowledge 文章页必须支持 \\[...\\] 和 $$...$$ 公式');
assert.match(page, /await typesetArticleMath\(\)/,
  'Knowledge 文章加载后必须执行公式 typeset');
assert.match(page, /function normalizeMathDelimiters\(source\)/,
  'Knowledge 文章页必须保留 text-preview 公式定界符');
console.log('Knowledge 标签与代码块渲染检查通过');
