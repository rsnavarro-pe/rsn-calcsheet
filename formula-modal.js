/**
 * Formula Library Modal — Mechanics & Classical Mechanics (US Customary)
 */
import { FORMULA_GROUPS, FORMULAS } from './formula-library.js';

let selectedId = FORMULAS[0].id;
let activeGroup = 'ALL';

export function openFormulaModal({ onInsert, onNewSheet }) {
  const modal = document.getElementById('formula-modal');
  const search = document.getElementById('formula-search');
  search.value = '';
  activeGroup = 'ALL';
  selectedId = FORMULAS[0].id;
  modal.classList.remove('hidden');
  renderFilters();
  renderList('');
  search.focus();

  search.oninput = (e) => renderList(e.target.value);
  document.getElementById('fmodal-close-btn').onclick = close;
  document.getElementById('fmodal-cancel-btn').onclick = close;
  document.getElementById('fmodal-insert-btn').onclick = () => {
    const f = FORMULAS.find(x => x.id === selectedId);
    if (f) onInsert(f);
    close();
  };
  document.getElementById('fmodal-newsheet-btn').onclick = () => {
    const f = FORMULAS.find(x => x.id === selectedId);
    if (f) onNewSheet(f);
    close();
  };
  modal.onclick = (e) => { if (e.target === modal) close(); };

  function close() {
    modal.classList.add('hidden');
  }
}

function renderFilters() {
  const bar = document.getElementById('formula-group-bar');
  bar.innerHTML = '';
  for (const grp of ['ALL', ...FORMULA_GROUPS]) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `f-pill ${grp === activeGroup ? 'active' : ''}`;
    btn.textContent = grp === 'ALL' ? 'All Formulas' : grp;
    btn.onclick = () => {
      activeGroup = grp;
      renderFilters();
      renderList(document.getElementById('formula-search').value);
    };
    bar.appendChild(btn);
  }
}

function renderList(query) {
  const q = query.trim().toLowerCase();
  const listEl = document.getElementById('formula-list');
  const previewEl = document.getElementById('formula-code-preview');
  const filtered = FORMULAS.filter(f =>
    (activeGroup === 'ALL' || f.group === activeGroup) &&
    (!q || f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q) || f.group.toLowerCase().includes(q))
  );

  if (!filtered.some(f => f.id === selectedId) && filtered.length) {
    selectedId = filtered[0].id;
  }

  listEl.innerHTML = '';
  for (const f of filtered) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `f-item ${f.id === selectedId ? 'active' : ''}`;
    item.innerHTML = `<div class="f-item-grp">${f.group}</div><div class="f-item-title">${f.title}</div><div class="f-item-desc">${f.desc}</div>`;
    item.onclick = () => {
      selectedId = f.id;
      renderList(document.getElementById('formula-search').value);
    };
    listEl.appendChild(item);
  }

  const sel = FORMULAS.find(f => f.id === selectedId);
  previewEl.textContent = sel ? sel.code : 'No matching formulas.';
}
