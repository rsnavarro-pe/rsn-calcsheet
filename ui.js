/**
 * Deterministic DOM Rendering & Event Wiring — Open CalcSheet Studio Layout (US-Only)
 */
import {
  state, getActiveSheet, setActiveSheet, updateActiveSheetBody,
  updateActiveSheetMeta, updateProjectMeta, addSheetFromTemplate,
  addCustomSheet, deleteSheet, replaceProjectState
} from './state.js';
import { evaluateSheet } from './parser.js';
import { openModuleModal } from './modal.js';
import { openFormulaModal } from './formula-modal.js';
import { formatVarName, formatMathExpr } from './math-format.js';
import { renderSheetDiagram } from './diagrams.js';
import { highlightCode } from './highlight.js';
import { renderInputForm, parseInputLiteral } from './input-form.js';

const $ = (id) => document.getElementById(id);
let viewMode = 'split'; // 'split' | 'preview' | 'project'
let midMode = 'form'; // 'form' | 'code'

export function initUI() {
  bindTopBar();
  bindModeTabs();
  bindEditor();
  bindReferenceDrawer();
  renderAll();
}

function bindTopBar() {
  $('btn-open-modal').addEventListener('click', () => {
    openModuleModal((key) => {
      addSheetFromTemplate(key);
      viewMode = 'split';
      renderAll();
    });
  });

  $('btn-open-formulas').addEventListener('click', () => {
    openFormulaModal({
      onInsert: (f) => {
        const editor = $('calc-editor');
        const prefix = editor.value.trim() ? '\n\n' : '';
        editor.value = editor.value + prefix + f.code;
        updateActiveSheetBody(editor.value);
        viewMode = 'split';
        renderAll();
      },
      onNewSheet: (f) => {
        addCustomSheet({ title: f.title, codeRef: f.group, body: `# ${f.title}\n// ${f.desc}\n\n${f.code}` });
        viewMode = 'split';
        renderAll();
      }
    });
  });

  $('btn-print').addEventListener('click', () => window.print());

  $('btn-export-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${state.meta.projectNumber || 'rsn-calcsheet'}-project.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $('input-import-json').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      replaceProjectState(JSON.parse(await file.text()));
      renderAll();
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    }
    e.target.value = '';
  });

  const metaFields = [
    ['meta-firm', 'firmName'], ['meta-project', 'projectName'],
    ['meta-number', 'projectNumber'], ['meta-engineer', 'engineer'],
    ['meta-checker', 'checker'], ['meta-code', 'codeEdition']
  ];
  for (const [elId, key] of metaFields) {
    $(elId).addEventListener('input', (e) => {
      updateProjectMeta({ [key]: e.target.value });
      renderPreview();
    });
  }
}

function bindModeTabs() {
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      viewMode = btn.getAttribute('data-mode');
      applyViewMode();
    });
  });
  $('btn-mid-form').addEventListener('click', () => { midMode = 'form'; applyMidMode(); });
  $('btn-mid-code').addEventListener('click', () => { midMode = 'code'; applyMidMode(); });
}

function applyMidMode() {
  $('btn-mid-form').classList.toggle('active', midMode === 'form');
  $('btn-mid-code').classList.toggle('active', midMode === 'code');
  $('input-form-pane').classList.toggle('hidden', midMode !== 'form');
  $('code-editor-area').classList.toggle('hidden', midMode !== 'code');
}

function applyViewMode() {
  document.querySelectorAll('[data-mode]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-mode') === viewMode);
  });
  $('split-workspace').classList.toggle('hidden', viewMode === 'project');
  $('split-workspace').classList.toggle('preview-only', viewMode === 'preview');
  $('project-data-pane').classList.toggle('hidden', viewMode !== 'project');
}

function bindEditor() {
  const editor = $('calc-editor');
  const gutter = $('line-gutter');

  $('sheet-title-input').addEventListener('input', (e) => {
    updateActiveSheetMeta({ title: e.target.value });
    renderSidebar();
    renderPreview();
  });
  $('sheet-code-input').addEventListener('input', (e) => {
    updateActiveSheetMeta({ codeRef: e.target.value });
    renderPreview();
  });
  editor.addEventListener('input', (e) => {
    updateActiveSheetBody(e.target.value);
    renderLineGutter();
    renderSidebar();
    renderPreview();
  });
  editor.addEventListener('scroll', () => {
    gutter.scrollTop = editor.scrollTop;
    const hl = $('code-highlight');
    hl.scrollTop = editor.scrollTop;
    hl.scrollLeft = editor.scrollLeft;
  });
}

function bindReferenceDrawer() {
  document.querySelectorAll('[data-insert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const editor = $('calc-editor');
      const snippet = btn.getAttribute('data-insert');
      const start = editor.selectionStart;
      const val = editor.value;
      editor.value = val.slice(0, start) + snippet + val.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = start + snippet.length;
      editor.focus();
      updateActiveSheetBody(editor.value);
      renderLineGutter();
      renderSidebar();
      renderPreview();
    });
  });
}

export function renderAll() {
  applyViewMode();
  renderMetaInputs();
  renderEditorInputs();
  renderLineGutter();
  renderSidebar();
  renderPreview();
}

function renderMetaInputs() {
  $('meta-firm').value = state.meta.firmName || '';
  $('meta-project').value = state.meta.projectName || '';
  $('meta-number').value = state.meta.projectNumber || '';
  $('meta-engineer').value = state.meta.engineer || '';
  $('meta-checker').value = state.meta.checker || '';
  $('meta-code').value = state.meta.codeEdition || '';
}

function getGoverningDCR(results) {
  const checks = results.filter(r => r.type === 'check' && Number.isFinite(r.dcr));
  if (!checks.length) return null;
  return Math.max(...checks.map(c => c.dcr));
}

function renderSidebar() {
  const list = $('sheet-list');
  list.innerHTML = '';
  $('sheet-count').textContent = state.sheets.length;

  state.sheets.forEach((s, idx) => {
    const res = evaluateSheet(s.body || '');
    const gov = getGoverningDCR(res);
    const item = document.createElement('div');
    item.className = `sheet-item ${s.id === state.activeSheetId ? 'active' : ''}`;

    const btn = document.createElement('button');
    btn.className = 'sheet-select-btn';
    const dcrHtml = gov !== null
      ? `<span class="sheet-dcr ${gov <= 1 ? 'pass' : 'fail'}">${gov.toFixed(2)}</span>`
      : '';
    btn.innerHTML = `<span class="sheet-name">${esc(s.title)}</span><span class="sheet-num">#${idx + 1}</span>${dcrHtml}`;
    btn.addEventListener('click', () => {
      setActiveSheet(s.id);
      if (viewMode === 'project') viewMode = 'split';
      renderAll();
    });

    item.appendChild(btn);
    if (state.sheets.length > 1) {
      const del = document.createElement('button');
      del.className = 'sheet-del-btn';
      del.title = 'Delete sheet';
      del.textContent = '×';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSheet(s.id);
        renderAll();
      });
      item.appendChild(del);
    }
    list.appendChild(item);
  });

  renderContentsTree();
}

function renderContentsTree() {
  const toc = $('contents-list');
  const active = getActiveSheet();
  const headings = (active.body || '').split('\n')
    .filter(l => l.startsWith('# ') || l.startsWith('## '))
    .map(l => ({ level: l.startsWith('## ') ? 2 : 1, text: l.replace(/^#+\s*/, '') }));

  let html = headings.map((h, i) =>
    `<div class="toc-row lvl-${h.level}"><span>${esc(h.text)}</span></div>`
  ).join('');
  html += `<div class="toc-divider">Detailed calculations</div>`;
  html += state.sheets.map((s, i) =>
    `<div class="toc-row lvl-1"><span>A.${i + 1} ${esc(s.title)}</span></div>`
  ).join('');
  toc.innerHTML = html;
}

function renderEditorInputs() {
  const sheet = getActiveSheet();
  $('sheet-title-input').value = sheet.title || '';
  $('sheet-code-input').value = sheet.codeRef || '';
  $('calc-editor').value = sheet.body || '';
}

function renderLineGutter() {
  const val = $('calc-editor').value || '';
  const lines = val.split('\n').length;
  $('line-count-label').textContent = `${lines} lines`;
  $('line-gutter').textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  $('code-highlight').innerHTML = highlightCode(val);
}

function renderPreview() {
  const sheet = getActiveSheet();
  const results = evaluateSheet(sheet.body || '');
  const gov = getGoverningDCR(results);
  const govEl = $('gov-dcr-status');
  if (gov === null) {
    govEl.textContent = 'No DCR checks';
    govEl.className = 'gov-status';
  } else {
    govEl.textContent = `Governing DCR ${gov.toFixed(2)} — ${gov <= 1 ? 'passes' : 'fails'}`;
    govEl.className = `gov-status ${gov <= 1 ? 'pass' : 'fail'}`;
  }

  const sheetIndex = state.sheets.findIndex(s => s.id === sheet.id) + 1;
  const diagramHtml = renderSheetDiagram(sheet, results);
  renderInputForm($('input-form-pane'), sheet, results, diagramHtml, (lineNo, nextVal, unit) => {
    const lines = (sheet.body || '').split('\n');
    const idx = lineNo - 1;
    if (lines[idx] === undefined) return;
    const eqPos = lines[idx].indexOf('=');
    const arrowPos = lines[idx].lastIndexOf('->');
    const lhs = lines[idx].slice(0, eqPos + 1);
    const arrow = arrowPos > eqPos ? ' ' + lines[idx].slice(arrowPos) : '';
    lines[idx] = `${lhs} ${nextVal}${unit ? ' ' + unit : ''}${arrow}`;
    const nextBody = lines.join('\n');
    updateActiveSheetBody(nextBody);
    $('calc-editor').value = nextBody;
    renderLineGutter();
    renderSidebar();
    renderPreview();
  });

  $('sheet-preview').innerHTML = `
    <div class="title-block">
      <div class="tb-main">
        ${state.meta.firmName ? `<div class="tb-eyebrow">${esc(state.meta.firmName)}</div>` : ''}
        <div class="tb-project">${esc(state.meta.projectName)}</div>
        <div class="tb-sheet-title">${esc(sheet.title)}</div>
      </div>
      <div class="tb-meta-grid">
        <div><span>Project #</span><strong>${esc(state.meta.projectNumber)}</strong></div>
        <div><span>Sheet</span><strong>${sheetIndex} of ${state.sheets.length}</strong></div>
        <div><span>By / Chk</span><strong>${esc(state.meta.engineer)} / ${esc(state.meta.checker)}</strong></div>
        <div><span>Code</span><strong>${esc(sheet.codeRef || state.meta.codeEdition)}</strong></div>
      </div>
    </div>
    <div class="cp-sheet">
      ${diagramHtml ? `<div class="cp-diagram-float">${diagramHtml}</div>` : ''}
      <div class="cp-flow">${results.map(renderLine).join('')}</div>
    </div>
  `;
}

function renderLine(r) {
  switch (r.type) {
    case 'blank': return '<div class="cp-spacer"></div>';
    case 'h1': return `<h1 class="cp-h1">${esc(r.text)}</h1>`;
    case 'h2': return `<h2 class="cp-h2">${esc(r.text)}</h2>`;
    case 'h3': return `<h3 class="cp-h3">${esc(r.text)}</h3>`;
    case 'note': return `<p class="cp-note">${esc(r.text)}</p>`;
    case 'calc': {
      const lit = parseInputLiteral(r.formula);
      if (lit) {
        return `<div class="cp-line math-expr"><span class="cp-var">${formatVarName(r.name)}</span> = <span class="cp-input-val">${esc(lit.val)}</span>${lit.unit ? ` <span class="cp-unit">${esc(lit.unit)}</span>` : ''}</div>`;
      }
      return `<div class="cp-line math-expr"><span class="cp-var">${formatVarName(r.name)}</span> = ${formatMathExpr(r.formula)} = ${formatMathExpr(r.substituted)} = <strong class="cp-res">${esc(r.result)}</strong></div>`;
    }
    case 'expr':
      return `<div class="cp-line math-expr">${formatMathExpr(r.formula)} = ${formatMathExpr(r.substituted)} = <strong class="cp-res">${esc(r.result)}</strong></div>`;
    case 'check': {
      const pct = Math.min(100, Math.max(0, r.dcr * 100));
      const cls = r.pass ? 'pass' : 'fail';
      return `<div class="dcr-card ${cls}"><div class="dcr-top"><span class="dcr-label">${esc(r.label)}</span><span class="dcr-ratio">DCR = ${r.dcr.toFixed(3)} (${esc(r.demandText)} / ${esc(r.capacityText)})</span><span class="dcr-badge ${cls}">${r.pass ? 'PASS' : 'FAIL'}</span></div><div class="dcr-bar"><div class="dcr-fill ${cls}" style="width:${pct.toFixed(1)}%"></div></div></div>`;
    }
    case 'error':
      return `<div class="calc-error">Line ${r.lineNo}: ${esc(r.message)} <code>${esc(r.raw)}</code></div>`;
    default: return '';
  }
}

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
