#!/usr/bin/env python3
"""Generate one user-facing arXiv 3D daily page.

This is the arXiv counterpart of the existing daily workflow.  The caller
supplies a date and a scope request; discovery, semantic filtering, short
summaries, source-figure collection, and page rendering are performed here.
Debug records stay in ``data_root`` and are never copied into the website.
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import time
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET


ATOM = "{http://www.w3.org/2005/Atom}"
OPEN_SEARCH = "{http://a9.com/-/spec/opensearch/1.1/}"
PRIMARY_CATEGORIES = frozenset({"cs.CV", "cs.GR", "cs.LG"})
SECONDARY_CATEGORIES = frozenset({"cs.RO", "cs.AI", "eess.IV"})
RECALL_RE = re.compile(
    r"\b(?:3[ -]?d|three[ -]?dimensional|gaussian splatt?ing|point ?cloud|"
    r"mesh(?:es)?|reconstruction|radiance field|spatial|depth|slam|lidar|"
    r"world model|articulat(?:ed|ion)|neural rendering|scene generation|"
    r"geometry|geometric|volumetric|pose estimation)\b", re.I,
)

TOPICS = {
    "3d generation": "生成新的三维物体、场景或三维表示，而不是仅分析已有三维数据",
    "3d texture generation": "为三维资产生成、补全或优化纹理、材质或表面外观",
    "3d animation generation": "生成三维角色、物体或场景的运动、骨骼动画或动态三维表示；普通二维人物视频动画不属于此项",
    "3d articulation": "建模或生成带关节物体的部件结构、关节参数、可动关系或运动状态",
    "3d scene generation": "生成包含空间布局和多个元素的完整三维场景，而非单物体生成",
    "3D reconstruction": "从图像、视频、点云或传感器观测恢复已有物体/场景的三维几何或三维表示",
    "3D world model": "显式在三维空间或三维场景表示中预测、模拟环境动态与交互结果",
}
TOPIC_GROUPS = {
    "3d generation": "3D", "3d texture generation": "3D",
    "3d animation generation": "3D", "3d articulation": "3D",
    "3d scene generation": "3D", "3D reconstruction": "3D",
    "3D world model": "3D",
}


def _json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def _get(url: str, timeout: float = 90) -> bytes:
    request = Request(url, headers={"User-Agent": "paper-reading-arxiv-3d/1.0"})
    with urlopen(request, timeout=timeout) as response:
        return response.read()


def _query(day: date) -> str:
    stamp = day.strftime("%Y%m%d")
    return f"submittedDate:[{stamp}0000 TO {stamp}2359]"


def discover_all(day: date, data_root: Path) -> list[dict[str, object]]:
    """Fetch every Atom page, checking total count and duplicate IDs."""
    destination = data_root / "discovery" / day.isoformat()
    destination.mkdir(parents=True, exist_ok=True)
    query = _query(day)
    records: list[dict[str, object]] = []
    total: int | None = None
    for start in range(0, 10000, 100):
        page = destination / f"page-{start:05d}.xml"
        if not page.exists():
            url = "https://export.arxiv.org/api/query?" + urlencode({
                "search_query": query, "start": start, "max_results": 100,
                "sortBy": "submittedDate", "sortOrder": "descending",
            })
            page.write_bytes(_get(url, timeout=120))
        root = ET.fromstring(page.read_bytes())
        page_total = int(root.findtext(f"{OPEN_SEARCH}totalResults", "-1"))
        if page_total < 0 or (total is not None and page_total != total):
            raise RuntimeError("arXiv pagination returned inconsistent totalResults")
        total = page_total
        entries = root.findall(f"{ATOM}entry")
        for entry in entries:
            raw_id = entry.findtext(f"{ATOM}id", "")
            match = re.search(r"/(\d{4}\.\d{4,5})(?:v\d+)?$", raw_id)
            published = entry.findtext(f"{ATOM}published", "")
            if not match or not published.startswith(day.isoformat()):
                raise RuntimeError("arXiv returned an entry outside the requested date")
            records.append({
                "id": match.group(1),
                "title": " ".join(entry.findtext(f"{ATOM}title", "").split()),
                "abstract": " ".join(entry.findtext(f"{ATOM}summary", "").split()),
                "published": published,
                "url": f"https://arxiv.org/abs/{match.group(1)}",
                "categories": [x.attrib["term"] for x in entry.findall(f"{ATOM}category")],
            })
        if total is not None and len(records) >= total:
            break
        if not entries:
            raise RuntimeError("arXiv pagination ended before totalResults")
        time.sleep(2)
    if total is None or len(records) != total or len({x["id"] for x in records}) != total:
        raise RuntimeError("arXiv discovery is incomplete or contains duplicate IDs")
    _json(destination / "records.json", {"query": query, "total": total, "records": records})
    return records


def _recall(records: list[dict[str, object]]) -> list[dict[str, object]]:
    result = []
    for item in records:
        categories = set(item["categories"])
        text = f"{item['title']} {item['abstract']}"
        if categories & PRIMARY_CATEGORIES or (categories & SECONDARY_CATEGORIES and RECALL_RE.search(text)):
            result.append(item)
    return result


def _parse_json(text: str) -> object:
    raw = text.strip()
    if raw.startswith("```"):
        raw = "\n".join(raw.splitlines()[1:-1]).strip()
        if raw.lower().startswith("json"):
            raw = raw[4:].strip()
    return json.loads(raw)


def _llm(model: str):
    from paper_reading.lumina_llm import create_lumina_call
    key = os.environ.get("CODEX_API_KEY")
    if not key:
        raise RuntimeError("CODEX_API_KEY is not set")
    return create_lumina_call(model=model, api_key=key, timeout=900)


def classify(records: list[dict[str, object]], data_root: Path, day: date, model: str, request: str) -> dict[str, list[str]]:
    path = data_root / "classification" / f"{day.isoformat()}.json"
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))["decisions"]
    from paper_reading.contracts import PaperText
    from paper_reading.select import select

    call = _llm(model)

    def scoped_call(prompt: str) -> str:
        return call(
            "用户给本次 arXiv 3D 日报的范围要求如下：\n" + request +
            "\n请严格按该范围判断；范围中的 3D 方向保持现有日报定义，视频方向不纳入。\n\n" + prompt
        )

    decisions_list = select(
        [PaperText(str(x["id"]), str(x["title"]), str(x["abstract"])) for x in records],
        llm_call=scoped_call,
        topics=tuple(TOPICS),
        topic_groups=TOPIC_GROUPS,
    )
    decisions = {decision.paper_id: list(decision.topics) for decision in decisions_list}
    _json(path, {"model": model, "request": request, "decisions": decisions})
    return decisions


def summaries(records: list[dict[str, object]], decisions: dict[str, list[str]], data_root: Path, day: date, model: str) -> dict[str, str]:
    path = data_root / "summaries" / f"{day.isoformat()}.json"
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    from paper_reading.analyze import summarize

    call = _llm(model)
    selected = [x for x in records if decisions.get(x["id"])]
    result: dict[str, str] = {}
    for item in selected:
        brief = summarize(
            paper_id=str(item["id"]), title=str(item["title"]),
            abstract=str(item["abstract"]), generator=call,
        )
        result[str(item["id"])] = brief.one_line_summary
    if set(result) != {str(x["id"]) for x in selected} or any(not x for x in result.values()):
        raise RuntimeError("summary generator did not cover every selected paper")
    _json(path, result)
    return result


class _FigureParser:
    """Small HTML parser for the first source-backed arXiv figure."""
    def __init__(self, page_url: str):
        from html.parser import HTMLParser
        self.page_url = page_url
        self.base = page_url
        self.stack: list[dict[str, object]] = []
        self.figures: list[dict[str, str]] = []
        self._parser_cls = HTMLParser

    def parse(self, raw: bytes) -> list[dict[str, str]]:
        parser = self._parser_cls()
        owner = self
        parser.handle_starttag = lambda tag, attrs: owner._start(tag, dict(attrs))
        parser.handle_data = lambda data: owner._data(data)
        parser.handle_endtag = lambda tag: owner._end(tag)
        parser.feed(raw.decode("utf-8", "replace")); parser.close()
        return self.figures

    def _start(self, tag: str, attrs: dict[str, str]) -> None:
        if tag == "base" and attrs.get("href"):
            self.base = urljoin(self.page_url, attrs["href"])
        if tag == "figure":
            self.stack.append({"image": "", "caption": "", "depth": 0})
        elif self.stack and tag == "figcaption":
            self.stack[-1]["depth"] = int(self.stack[-1]["depth"]) + 1
        elif self.stack and tag in {"img", "object"} and not self.stack[-1]["image"]:
            source = attrs.get("src", "") if tag == "img" else attrs.get("data", "")
            if source and not source.startswith("data:"):
                self.stack[-1]["image"] = urljoin(self.base, source)

    def _data(self, data: str) -> None:
        if self.stack and int(self.stack[-1]["depth"]):
            self.stack[-1]["caption"] += data

    def _end(self, tag: str) -> None:
        if not self.stack:
            return
        if tag == "figcaption":
            self.stack[-1]["depth"] = max(0, int(self.stack[-1]["depth"]) - 1)
        elif tag == "figure":
            figure = self.stack.pop()
            if figure["image"]:
                self.figures.append({"url": str(figure["image"]), "caption": " ".join(str(figure["caption"]).split())})


def figures(records: list[dict[str, object]], decisions: dict[str, list[str]], data_root: Path, site_day: Path) -> dict[str, str]:
    """Archive selected papers using the same source-backed bundle path as daily."""
    from paper_reading.archive import archive
    from paper_reading.contracts import PaperRef

    assets_dir = site_day / "assets"
    internal_assets_dir = data_root / "figures" / "assets"
    internal_assets_dir.mkdir(parents=True, exist_ok=True)
    # This directory is generated exclusively by this Agent.  Rebuilding it
    # avoids stale files from an earlier run and, importantly, prevents two
    # papers whose source figure is both named ``figure-01.png`` from
    # overwriting each other.
    if assets_dir.exists():
        for old_asset in assets_dir.iterdir():
            if old_asset.is_file() or old_asset.is_symlink():
                old_asset.unlink()
    assets_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = data_root / "figures" / f"{site_day.name}.json"
    # The manifest is an internal cache, but its ``asset`` field also makes a
    # resumed run deterministic: the page always points to the exact local
    # copy associated with that paper.
    cached: dict[str, object] = {}
    if manifest_path.exists():
        try:
            value = json.loads(manifest_path.read_text(encoding="utf-8"))
            if isinstance(value, dict):
                cached = value
        except (json.JSONDecodeError, OSError):
            cached = {}
    result: dict[str, str] = {}
    manifest: dict[str, object] = dict(cached)
    # Rehydrate all already archived assets first.  A paper with a prior
    # ``error`` entry is intentionally not retried on every page rebuild.
    for paper_id, value in cached.items():
        if not isinstance(value, dict) or not value.get("asset"):
            continue
        asset = assets_dir / str(value["asset"])
        bundle = data_root / "papers" / f"arxiv_{paper_id}" / "v1"
        source_path = bundle / "figures" / asset.name.split("-", 1)[-1]
        if not source_path.is_file():
            source_path = internal_assets_dir / asset.name
        if source_path.is_file():
            shutil.copy2(source_path, asset)
            result[paper_id] = f"assets/{asset.name}"
    selected = [x for x in records if decisions.get(x["id"])]
    for item in selected:
        paper_id = str(item["id"])
        # Only papers absent from the manifest need archive work.  This keeps
        # a resumed run offline and makes repeated page builds cheap.
        if paper_id in cached:
            continue
        try:
            ref = PaperRef.from_url(str(item["url"]), str(item["title"]))
            bundle = data_root / "papers" / ref.paper_id / "v1"
            archived = archive(
                ref, output_dir=bundle, no_html=False,
                refresh=False, figure_selection="method_or_first",
            )
            manifest_file = archived.figure_manifest
            if manifest_file is None or not manifest_file.is_file():
                continue
            figure_values = json.loads(manifest_file.read_text(encoding="utf-8"))
            if not figure_values:
                continue
            figure = figure_values[0]
            source_path = (manifest_file.parent.parent / str(figure["path"])).resolve()
            if not source_path.is_file():
                continue
            # Include the arXiv identifier so filenames are unique across
            # papers even when the source archive calls every first figure
            # ``figure-01.png``.
            asset = assets_dir / f"{paper_id}-{source_path.name}"
            shutil.copy2(source_path, asset)
            result[paper_id] = f"assets/{asset.name}"
            manifest[paper_id] = {
                "asset": asset.name,
                "source_url": figure.get("source_url", ""),
                "caption": figure.get("caption", ""),
            }
        except Exception as error:
            manifest[paper_id] = {"error": type(error).__name__}
    # A PDF-only paper may not expose HTML figures.  Keep the paper in the
    # report, but create a source-backed first-page preview so the daily page
    # retains the same reference-image affordance when possible.
    for item in selected:
        paper_id = str(item["id"])
        if paper_id in result:
            continue
        bundle = data_root / "papers" / f"arxiv_{paper_id}" / "v1"
        pdf = bundle / "source" / "paper.pdf"
        if not pdf.is_file():
            continue
        try:
            import fitz
            document = fitz.open(pdf)
            page = document[0]
            pixmap = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
            asset = assets_dir / f"{paper_id}-first-page.png"
            pixmap.save(asset)
            document.close()
            shutil.copy2(asset, internal_assets_dir / asset.name)
            result[paper_id] = f"assets/{asset.name}"
            manifest[paper_id] = {"asset": asset.name, "source_url": str(item["url"]), "caption": "论文 PDF 首页（原文）"}
        except Exception as error:
            manifest[paper_id] = {"error": type(error).__name__}
    _json(manifest_path, manifest)
    return result


def _report_markdown(day: date, rows: list[dict[str, object]]) -> str:
    """Compose the short daily report consumed by the shared renderer."""
    labels = {
        "3d generation": "3D 生成", "3d scene generation": "3D 场景",
        "3D reconstruction": "3D 重建", "3D world model": "3D 世界模型",
        "3d texture generation": "3D 纹理", "3d animation generation": "3D 动画",
        "3d articulation": "3D 可动结构",
    }
    groups = tuple(labels)
    lines = [
        "[arXiv 3D 目录](../) · [论文阅读主页](../../) · [日报目录](../../date/) · [周报目录](../../week/) · [月报目录](../../month/)",
        "", f"# {day.isoformat()} · arXiv 3D 论文", "",
        "> 今日 arXiv 中与现有 3D 关注方向相关的论文。每篇提供一句话理解、论文参考图和原文链接。", "",
        "## 今日论文", "", "| 论文 | 方向 | 一句话介绍 |", "| --- | --- | --- |",
    ]
    for item in rows:
        topics = " / ".join(labels.get(str(t), str(t)) for t in item["topics"])
        title = str(item["title"]).replace("|", "\\|")
        summary = str(item["summary"]).replace("|", "\\|")
        lines.append(f"| [{title}]({item['url']}) | {topics} | {summary} |")
    for group in groups:
        items = [item for item in rows if group in item["topics"]]
        if not items:
            continue
        lines.extend(["", f"## {labels[group]}", ""])
        for item in items:
            topics = " / ".join(labels.get(str(t), str(t)) for t in item["topics"])
            lines.extend([f"### {item['title']}", "", f"**方向：** {topics}", "", str(item["summary"]), ""])
            if item.get("image"):
                lines.extend([f"![论文方法图（来源：论文原文）]({item['image']})", ""])
            lines.extend([f"**来源：** [arXiv 摘要]({item['url']}) · [PDF]({item['pdf']})", ""])
    return "\n".join(lines).rstrip() + "\n"


def _write_day_index(site_root: Path, day: date) -> None:
    """Keep all generated arXiv days and expose them newest first."""
    root = site_root / "daily-arxiv"
    index_json = root / "index.json"
    previous: list[dict[str, str]] = []
    if index_json.exists():
        try:
            value = json.loads(index_json.read_text(encoding="utf-8"))
            previous = [
                {"date": str(item["date"]), "href": str(item.get("href", f"{item['date']}/"))}
                for item in value.get("days", [])
                if isinstance(item, dict) and item.get("date")
            ]
        except (json.JSONDecodeError, OSError, KeyError, TypeError):
            previous = []
    by_date = {item["date"]: item for item in previous}
    by_date[day.isoformat()] = {"date": day.isoformat(), "href": f"{day.isoformat()}/"}
    days = [by_date[key] for key in sorted(by_date, reverse=True)]
    _json(index_json, {"source": "arxiv", "days": days})
    links = "".join(
        f'<li><a href="{html.escape(item["href"], quote=True)}">'
        f'{html.escape(item["date"])} · 今日论文</a></li>'
        for item in days
    )
    (root / "index.html").write_text(
        '<!doctype html><html lang="zh-CN"><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>arXiv 3D</title><style>body{font:16px system-ui,sans-serif;'
        'max-width:900px;margin:48px auto;padding:0 24px;color:#24364a}'
        'a{color:#1769aa}h1{color:#1769aa}li{margin:10px 0}</style>'
        '<h1>arXiv 3D</h1><p>按天浏览 arXiv 中与 3D 相关的论文。</p>'
        f'<ul>{links}</ul></html>', encoding="utf-8"
    )


def run(*, day: date, request: str, data_root: Path, site_root: Path, model: str = "glm-5.3") -> Path:
    data_root.mkdir(parents=True, exist_ok=True)
    site_day = site_root / "daily-arxiv" / day.isoformat()
    site_day.mkdir(parents=True, exist_ok=True)
    records_path = data_root / "discovery" / day.isoformat() / "records.json"
    if records_path.exists():
        records = json.loads(records_path.read_text(encoding="utf-8"))["records"]
    else:
        records = discover_all(day, data_root)
    candidates = _recall(records)
    _json(data_root / "selection" / f"{day.isoformat()}-candidates.json", {"count": len(candidates), "records": candidates})
    decisions = classify(candidates, data_root, day, model, request)
    short = summaries(candidates, decisions, data_root, day, model)
    asset_map = figures(candidates, decisions, data_root, site_day)
    rows = []
    for item in candidates:
        topics = decisions.get(item["id"], [])
        if not topics:
            continue
        rows.append({"id": item["id"], "title": item["title"], "topics": topics, "summary": short[item["id"]], "url": item["url"], "pdf": f"https://arxiv.org/pdf/{item['id']}", "image": asset_map.get(item["id"])})
    rows.sort(key=lambda x: x["id"], reverse=True)
    _write_day_index(site_root, day)
    report_path = site_day / "report.md"
    report_path.write_text(_report_markdown(day, rows), encoding="utf-8")
    # All daily paper pages use the shared text-preview academic renderer. The
    # short report has no paper article links, so no expandable正文 is emitted.
    from paper_reading.presentation import render_academic_markdown
    render_academic_markdown(
        report_path, site_day / "index.html",
        title=f"{day.isoformat()} · arXiv 3D 论文",
        toc_depth=3, html_link_mode="navigate",
    )
    return site_day / "index.html"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--day", required=True, type=date.fromisoformat)
    parser.add_argument("--request", required=True, help="User-facing scope request")
    parser.add_argument("--data-root", required=True, type=Path)
    parser.add_argument("--site-root", required=True, type=Path)
    parser.add_argument("--model", default="glm-5.3")
    args = parser.parse_args()
    print(run(day=args.day, request=args.request, data_root=args.data_root.resolve(), site_root=args.site_root.resolve(), model=args.model))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
