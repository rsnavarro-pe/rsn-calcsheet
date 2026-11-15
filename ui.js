/**
 * Deterministic DOM Rendering & Event Wiring
 */
import {
  state, getActiveSheet, setActiveSheet, updateActiveSheetBody,
  updateActiveSheetMeta, updateProjectMeta, addSheetFromTemplate,
  deleteSheet, replaceProjectState
} from './state.js';
import { evaluateSheet } from './parser.js';

const $ = (id) => document.getElementById(id);

export function initUI() {
  bindTopBar();
  bindEditor();
  bindReferenceDrawer();
  renderAll();
}

function bindTopBar() {
  $('btn-add-sheet').addEventListener('click', () => {
    const key = $('select-template').value;
    addSheetFromTemplate(key);
    renderAll();
  });

  $('btn-print').addEventListener('click', () => window.print());

  $('btn-export-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${state.meta.projectNumber || 'calcsheet'}-project.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $('input-import-json').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      replaceProjectState(parsed);
      renderAll();
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    }
    e.target.value = '';
  });

  const metaFields = [
    ['meta-firm', 'firmName'],
    ['meta-project', 'projectName'],
    ['meta-number', 'projectNumber'],
    ['meta-engineer', 'engineer'],
    ['meta-checker', 'checker'],
    ['meta-code', 'codeEdition']
  ];
  for (const [elId, key] of metaFields) {
    $(elId).addEventListener('input', (e) => {
      updateProjectMeta({ [key]: e.target.value });
      renderPreview();
    });
  }
}

function bindEditor() {
  $('sheet-title-input').addEventListener('input', (e) => {
    updateActiveSheetMeta({ title: e.target.value });
    renderSidebar();
    renderPreview();
  });

  $('sheet-code-input').addEventListener('input', (e) => {
    updateActiveSheetMeta({ codeRef: e.target.value });
    renderPreview();
  });

  $('calc-editor').addEventListener('input', (e) => {
    updateActiveSheetBody(e.target.value);
    renderPreview();
  });
}

function bindReferenceDrawer() {
  document.querySelectorAll('[data-insert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const editor = $('calc-editor');
      const snippet = btn.getAttribute('data-insert');
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const val = editor.value;
      editor.value = val.slice(0, start) + snippet + val.slice(end);
      editor.selectionStart = editor.selectionEnd = start + snippet.length;
      editor.focus();
      updateActiveSheetBody(editor.value);
      renderPreview();
    });
  });
}

export function renderAll() {
  renderMetaInputs();
  renderSidebar();
  renderEditorInputs();
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

function renderSidebar() {
  const list = $('sheet-list');
  list.innerHTML = '';
  state.sheets.forEach((s, idx) => {
    const item = document.createElement('div');
    item.className = `sheet-item ${s.id === state.activeSheetId ? 'active' : ''}`;

    const btn = document.createElement('button');
    btn.className = 'sheet-select-btn';
    btn.innerHTML = `<span class="sheet-badge">${idx + 1}</span><span class="sheet-name">${esc(s.title)}</span>`;
    btn.addEventListener('click', () => {
      setActiveSheet(s.id);
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
}

function renderEditorInputs() {
  const sheet = getActiveSheet();
  $('sheet-title-input').value = sheet.title || '';
  $('sheet-code-input').value = sheet.codeRef || '';
  $('calc-editor').value = sheet.body || '';
}

function renderPreview() {
  const sheet = getActiveSheet();
  const container = $('sheet-preview');
  const results = evaluateSheet(sheet.body || '');
  const sheetIndex = state.sheets.findIndex(s => s.id === sheet.id) + 1;

  const headerHtml = `
    <div class="title-block">
      <div class="tb-main">
        <div class="tb-eyebrow">${esc(state.meta.firmName)} — US ENGINEERING CALCULATION</div>
        <div class="tb-project">${esc(state.meta.projectName)}</div>
        <div class="tb-sheet-title">${esc(sheet.title)}</div>
      </div>
      <div class="tb-meta-grid">
        <div><span>Project #</span><strong>${esc(state.meta.projectNumber)}</strong></div>
        <div><span>Sheet</span><strong>${sheetIndex} of ${state.sheets.length}</strong></div>
        <div><span>By / Chk</span><strong>${esc(state.meta.engineer)} / ${esc(state.meta.checker)}</strong></div>
        <div><span>Code</span><strong>${esc(sheet.codeRef || state.meta.codeEdition)}</strong></div>
      </div>
      <div class="tb-seal">PE / SE<br>SEAL</div>
    </div>
  `;

  const bodyHtml = results.map(renderLine).join('');
  container.innerHTML = headerHtml + `<div class="calc-flow">${bodyHtml}</div>`;
}

function renderLine(r) {
  switch (r.type) {
    case 'blank': return '<div class="calc-spacer"></div>';
    case 'h1': return `<h1 class="calc-h1">${esc(r.text)}</h1>`;
    case 'h2': return `<h2 class="calc-h2">${esc(r.text)}</h2>`;
    case 'h3': return `<h3 class="calc-h3">${esc(r.text)}</h3>`;
    case 'note': return `<p class="calc-note">${esc(r.text)}</p>`;
    case 'calc':
      return `<div class="calc-row">
        <div class="calc-sym"><strong>${esc(r.name)}</strong> = ${esc(r.formula)}</div>
        <div class="calc-sub">= ${esc(r.substituted)}</div>
        <div class="calc-res">= <span>${esc(r.result)}</span></div>
      </div>`;
    case 'expr':
      return `<div class="calc-row">
        <div class="calc-sym">${esc(r.formula)}</div>
        <div class="calc-sub">= ${esc(r.substituted)}</div>
        <div class="calc-res">= <span>${esc(r.result)}</span></div>
      </div>`;
    case 'check': {
      const pct = Math.min(100, Math.max(0, r.dcr * 100));
      const cls = r.pass ? 'pass' : 'fail';
      return `<div class="dcr-card ${cls}">
        <div class="dcr-top">
          <span class="dcr-label">${esc(r.label)}</span>
          <span class="dcr-ratio">DCR = ${r.dcr.toFixed(3)} (${esc(r.demandText)} / ${esc(r.capacityText)})</span>
          <span class="dcr-badge ${cls}">${r.pass ? 'PASS' : 'FAIL'}</span>
        </div>
        <div class="dcr-bar"><div class="dcr-fill ${cls}" style="width:${pct.toFixed(1)}%"></div></div>
      </div>`;
    }
    case 'error':
      return `<div class="calc-error">Line ${r.lineNo}: ${esc(r.message)} <code>${esc(r.raw)}</code></div>`;
    default:
      return '';
  }
}

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, m => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
  ));
}
