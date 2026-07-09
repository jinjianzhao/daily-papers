(function () {
    const FOCUS_SECTION = '3D生成与重建';
    const MEDICAL_EXCLUDE_RE = /(医学|医疗|临床|生物医学|病理|放射|医学影像|医学图像|影像诊断|内窥镜|手术|medical|biomedical|clinical|healthcare|radiology|pathology|surgical|endoscopic|computed tomography|\bCT\b|\bMRI\b|ultrasound)/i;

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function normalizeDate(date) {
        return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '';
    }

    function isoWeekKey(dateStr) {
        const d = new Date(`${dateStr}T00:00:00Z`);
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
    }

    async function loadDateIndex(path) {
        const resp = await fetch(path, { cache: 'no-store' });
        if (!resp.ok) throw new Error('date index not found');
        const data = await resp.json();
        return Array.isArray(data.dates)
            ? data.dates.map(normalizeDate).filter(Boolean)
            : [];
    }

    function groupDates(dates, mode) {
        const groups = new Map();
        for (const date of dates) {
            const key = mode === 'week' ? isoWeekKey(date) : date.slice(0, 7);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(date);
        }
        return groups;
    }

    function splitTags(tags) {
        return String(tags || '')
            .split(/[;；、,\n]/)
            .map((x) => x.trim())
            .filter(Boolean)
            .slice(0, 5);
    }

    function firstTextLine(value) {
        return String(value || '')
            .split('\n')
            .map((x) => x.trim())
            .filter(Boolean)[0] || '';
    }

    function isExcludedPaper(info, summary) {
        const text = [
            info.title,
            info.abstract,
            info.abstract_zh,
            summary.short_zh,
            summary.tags,
            summary.body_summary,
        ].join('\n');
        return MEDICAL_EXCLUDE_RE.test(text);
    }

    function initEntryPage() {
        const body = document.body;
        if (!Object.prototype.hasOwnProperty.call(body.dataset, 'archiveEntry')) return false;

        const indexPath = body.dataset.dateIndex || '../date/config.json';
        const status = document.getElementById('archive-entry-status');
        const monthsEl = document.getElementById('archive-entry-months');
        const weeksEl = document.getElementById('archive-entry-weeks');
        const latestMonth = document.getElementById('latest-month-link');
        const latestWeek = document.getElementById('latest-week-link');

        loadDateIndex(indexPath)
            .then((dates) => {
                if (dates.length === 0) throw new Error('date index is empty');
                const monthGroups = groupDates(dates, 'month');
                const weekGroups = groupDates(dates, 'week');
                const months = [...monthGroups.keys()].sort((a, b) => b.localeCompare(a));
                const weeks = [...weekGroups.keys()].sort((a, b) => b.localeCompare(a));

                monthsEl.innerHTML = months.map((month) => (
                    `<a class="archive-period-link" href="./month/?month=${encodeURIComponent(month)}">${escapeHtml(month)}</a>`
                )).join('');
                weeksEl.innerHTML = weeks.map((week) => (
                    `<a class="archive-period-link" href="./week/?week=${encodeURIComponent(week)}">${escapeHtml(week)}</a>`
                )).join('');

                latestMonth.href = `./month/?month=${encodeURIComponent(months[0])}`;
                latestWeek.href = `./week/?week=${encodeURIComponent(weeks[0])}`;
                status.textContent = `已加载 ${dates.length} 个日报日期`;
            })
            .catch(() => {
                status.textContent = '无法读取日期索引，请确认 date/config.json 已发布。';
            });
        return true;
    }

    function initAggregatePage() {
        const body = document.body;
        const mode = body.dataset.archiveMode === 'week' ? 'week' : 'month';
        const paramName = mode === 'week' ? 'week' : 'month';
        const indexPath = body.dataset.dateIndex || '../../date/config.json';
        const dateBase = body.dataset.dateBase || '../../date/';
        const dateConfigPath = (date) => `${dateBase}${date}/config.json`;

        const els = {
            subtitle: document.getElementById('archive-subtitle'),
            buttons: document.getElementById('period-buttons'),
            loading: document.getElementById('loading'),
            progressText: document.getElementById('progress-text'),
            progressBar: document.getElementById('progress-bar'),
            stats: document.getElementById('stats'),
            paperList: document.getElementById('paper-list'),
            empty: document.getElementById('empty'),
            error: document.getElementById('error'),
            errorText: document.getElementById('error-text'),
            rangeLabel: document.getElementById('range-label'),
        };

        let groups = new Map();
        let activeKey = '';

        function keyLabel(key, dates) {
            if (mode === 'month') return key;
            const sorted = [...dates].sort();
            return `${key} · ${sorted[0]} 至 ${sorted[sorted.length - 1]}`;
        }

        function updateUrl(key) {
            const url = new URL(window.location.href);
            url.search = '';
            url.searchParams.set(paramName, key);
            history.pushState({ key }, '', url);
        }

        function selectedFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const value = params.get(paramName);
            if (value) return value;
            const raw = window.location.search.slice(1).trim();
            return raw && !raw.includes('=') ? decodeURIComponent(raw) : '';
        }

        function setProgress(done, total) {
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            els.progressText.textContent = `正在加载 ${done} / ${total} 天`;
            els.progressBar.style.width = `${pct}%`;
        }

        function renderButtons(keys) {
            els.buttons.innerHTML = '';
            for (const key of keys) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.dataset.key = key;
                btn.className = key === activeKey ? 'period-btn is-active' : 'period-btn';
                btn.textContent = key;
                btn.addEventListener('click', () => {
                    if (key === activeKey) return;
                    updateUrl(key);
                    loadPeriod(key);
                });
                els.buttons.appendChild(btn);
            }
        }

        function renderStats(items, dates, failedDates) {
            const totalVotes = items.reduce((acc, item) => acc + item.votes, 0);
            els.stats.innerHTML = `
                <div class="rounded-2xl px-5 py-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">覆盖日期</p>
                    <p class="mt-1 text-2xl font-black text-slate-900">${dates.length}</p>
                </div>
                <div class="rounded-2xl px-5 py-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">重点论文</p>
                    <p class="mt-1 text-2xl font-black text-slate-900">${items.length}</p>
                </div>
                <div class="rounded-2xl px-5 py-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">HF Votes</p>
                    <p class="mt-1 text-2xl font-black text-slate-900">${totalVotes}</p>
                </div>
                <div class="rounded-2xl px-5 py-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">读取失败</p>
                    <p class="mt-1 text-2xl font-black text-slate-900">${failedDates.length}</p>
                </div>
            `;
        }

        function paperCard(item) {
            const tags = splitTags(item.tags);
            const tagsHtml = tags.map((tag) => (
                `<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">${escapeHtml(tag)}</span>`
            )).join('');
            const imageHtml = item.image
                ? `<div class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <img src="${escapeHtml(item.image)}" alt="" loading="lazy">
                   </div>`
                : '';
            const intro = item.body || item.short || item.abstractZh || item.abstract || '';
            const detail = item.short && item.short !== intro ? item.short : firstTextLine(item.abstractZh || item.abstract || '');

            return `
                <article>
                    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span class="font-mono">${escapeHtml(item.aid)}</span>
                        <span>·</span>
                        <span>${escapeHtml(item.date)}</span>
                        <span>·</span>
                        <span>${item.votes} votes</span>
                    </div>
                    <h3 class="mt-2 text-lg font-black leading-snug text-slate-950">
                        ${escapeHtml(item.title || item.aid)}
                    </h3>
                    ${tagsHtml ? `<div class="mt-3 flex flex-wrap gap-2">${tagsHtml}</div>` : ''}
                    ${intro ? `<p class="mt-4 text-sm leading-6 text-slate-700">${escapeHtml(firstTextLine(intro))}</p>` : ''}
                    ${detail ? `<p class="mt-2 text-sm leading-6 text-slate-500">${escapeHtml(detail)}</p>` : ''}
                    ${imageHtml}
                    <div class="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                        <a class="text-indigo-600 hover:text-indigo-800" href="../../date/${escapeHtml(item.date)}/">查看日报</a>
                        <a class="text-indigo-600 hover:text-indigo-800" href="https://arxiv.org/abs/${escapeHtml(item.aid)}" target="_blank" rel="noopener noreferrer">arXiv</a>
                        <a class="text-indigo-600 hover:text-indigo-800" href="${escapeHtml(item.hfLink)}" target="_blank" rel="noopener noreferrer">HuggingFace</a>
                    </div>
                </article>
            `;
        }

        function renderPapers(items) {
            const byDate = new Map();
            for (const item of items) {
                if (!byDate.has(item.date)) byDate.set(item.date, []);
                byDate.get(item.date).push(item);
            }

            const dates = [...byDate.keys()].sort((a, b) => b.localeCompare(a));
            els.paperList.innerHTML = dates.map((date) => {
                const cards = byDate.get(date).map(paperCard).join('');
                return `
                    <section class="mb-8">
                        <div class="mb-4 flex items-center gap-3">
                            <h2 class="text-xl font-black text-slate-950">${escapeHtml(date)}</h2>
                            <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">${byDate.get(date).length} 篇</span>
                            <span class="h-px flex-1 bg-slate-200"></span>
                        </div>
                        <div class="paper-grid">
                            ${cards}
                        </div>
                    </section>
                `;
            }).join('');
        }

        async function fetchDateConfig(date) {
            const resp = await fetch(dateConfigPath(date), { cache: 'no-store' });
            if (!resp.ok) throw new Error(`failed to load ${date}`);
            return resp.json();
        }

        function resolveFigurePath(path, date) {
            const value = String(path || '').trim();
            if (!value) return '';
            if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('/')) {
                return value;
            }
            return `${dateBase}${date}/${value.replace(/^\.?\//, '')}`;
        }

        async function loadPeriod(key) {
            activeKey = key;
            const keys = [...groups.keys()].sort((a, b) => b.localeCompare(a));
            renderButtons(keys);

            const dates = [...(groups.get(key) || [])].sort((a, b) => b.localeCompare(a));
            els.rangeLabel.textContent = keyLabel(key, dates);
            els.loading.classList.remove('hidden');
            els.empty.classList.add('hidden');
            els.error.classList.add('hidden');
            els.paperList.innerHTML = '';
            els.stats.innerHTML = '';
            setProgress(0, dates.length);

            const items = [];
            const seen = new Set();
            const failedDates = [];
            let done = 0;

            for (const date of dates) {
                try {
                    const cfg = await fetchDateConfig(date);
                    const focus = cfg.focus_sections && Array.isArray(cfg.focus_sections[FOCUS_SECTION])
                        ? cfg.focus_sections[FOCUS_SECTION]
                        : [];

                    for (const aid of focus) {
                        if (seen.has(aid)) continue;
                        seen.add(aid);

                        const info = (cfg.base_info && cfg.base_info[aid]) || {};
                        const summary = (cfg.summaries && cfg.summaries[aid]) || {};
                        if (isExcludedPaper(info, summary)) continue;
                        const figures = (cfg.figures && cfg.figures[aid]) || [];
                        const votes = cfg.hf_votes && typeof cfg.hf_votes[aid] === 'number' ? cfg.hf_votes[aid] : 0;
                        items.push({
                            date,
                            aid,
                            title: info.title || '',
                            abstract: info.abstract || '',
                            abstractZh: info.abstract_zh || '',
                            hfLink: info.hf_link || `https://huggingface.co/papers/${aid}`,
                            short: summary.short_zh || '',
                            tags: summary.tags || '',
                            body: summary.body_summary || '',
                            image: figures[0] && figures[0].path ? resolveFigurePath(figures[0].path, date) : '',
                            votes,
                        });
                    }
                } catch (err) {
                    failedDates.push(date);
                } finally {
                    done += 1;
                    setProgress(done, dates.length);
                }
            }

            els.loading.classList.add('hidden');
            renderStats(items, dates, failedDates);
            if (items.length === 0) {
                els.empty.classList.remove('hidden');
            } else {
                renderPapers(items);
            }

            if (failedDates.length > 0) {
                els.error.classList.remove('hidden');
                els.errorText.textContent = `以下日期读取失败：${failedDates.join('、')}`;
            }
        }

        async function init() {
            try {
                const dates = await loadDateIndex(indexPath);
                if (dates.length === 0) throw new Error('date index is empty');
                groups = groupDates(dates, mode);

                const keys = [...groups.keys()].sort((a, b) => b.localeCompare(a));
                const fromUrl = selectedFromUrl();
                const initial = groups.has(fromUrl) ? fromUrl : keys[0];
                activeKey = initial;
                renderButtons(keys);
                await loadPeriod(initial);
            } catch (err) {
                els.loading.classList.add('hidden');
                els.error.classList.remove('hidden');
                els.errorText.textContent = '无法读取日期索引，请确认 date/config.json 已发布。';
            }
        }

        window.addEventListener('popstate', () => {
            const key = selectedFromUrl();
            if (key && groups.has(key)) {
                loadPeriod(key);
            }
        });

        if (els.subtitle) {
            els.subtitle.textContent = mode === 'week'
                ? '按周聚合已有日报中的 3D 重点论文'
                : '按月聚合已有日报中的 3D 重点论文';
        }

        init();
    }

    if (!initEntryPage()) {
        initAggregatePage();
    }
})();
