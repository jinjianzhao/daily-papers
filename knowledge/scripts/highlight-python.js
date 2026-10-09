import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import python from 'shiki/langs/python.mjs';
import lightPlus from 'shiki/themes/light-plus.mjs';

// Bundle only Python and VS Code's Light+ theme for the static Knowledge site.
const highlighter = createHighlighterCore({
  langs: [python],
  themes: [lightPlus],
  engine: createJavaScriptRegexEngine(),
});

window.highlightKnowledgePython = async function (source) {
  const ready = await highlighter;
  const html = ready.codeToHtml(source, { lang: 'python', theme: 'light-plus' });
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.querySelector('code').innerHTML;
};
