/**
 * Application State — Single Source of Truth
 */
import { TEMPLATES } from './templates.js';

const STORAGE_KEY = 'us_calcsheet_studio_v1';

function createInitialState() {
  return {
    meta: {
      projectName: 'Oakridge Commercial Building',
      projectNumber: '2026-0412',
      engineer: 'J. Doe, PE',
      checker: 'A. Smith, SE',
      codeEdition: 'IBC 2024 / ASCE 7-22',
      firmName: 'RSN Engineering'
    },
    activeSheetId: 's1',
    sheets: [
      { id: 's1', ...TEMPLATES.steel_beam },
      { id: 's2', ...TEMPLATES.rational_runoff }
    ]
  };
}

export let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.sheets) && parsed.sheets.length > 0) {
        return parsed;
      }
    }
  } catch { /* ignore corrupted storage */ }
  return createInitialState();
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore quota errors */ }
}

export function getActiveSheet() {
  return state.sheets.find(s => s.id === state.activeSheetId) || state.sheets[0];
}

export function setActiveSheet(id) {
  state.activeSheetId = id;
  saveState();
}

export function updateActiveSheetBody(body) {
  const sheet = getActiveSheet();
  if (sheet) {
    sheet.body = body;
    saveState();
  }
}

export function updateActiveSheetMeta(fields) {
  const sheet = getActiveSheet();
  if (sheet) {
    Object.assign(sheet, fields);
    saveState();
  }
}

export function updateProjectMeta(fields) {
  Object.assign(state.meta, fields);
  saveState();
}

export function addSheetFromTemplate(templateKey) {
  const tpl = TEMPLATES[templateKey] || {
    title: `Sheet ${state.sheets.length + 1}`,
    discipline: 'Structural',
    codeRef: state.meta.codeEdition,
    body: '# New Calculation Sheet\n// Enter US Customary calculations below.\n\nL = 20 ft\nw = 1.5 klf\nM = w * L^2 / 8 -> kip-ft'
  };
  const id = 's' + Date.now();
  state.sheets.push({ id, ...tpl });
  state.activeSheetId = id;
  saveState();
}

export function addCustomSheet({ title, codeRef, body }) {
  const id = 's' + Date.now();
  state.sheets.push({
    id,
    title: title || `Sheet ${state.sheets.length + 1}`,
    discipline: 'Mechanics',
    codeRef: codeRef || 'Mechanics & Classical Mechanics',
    body: body || ''
  });
  state.activeSheetId = id;
  saveState();
}

export function deleteSheet(id) {
  if (state.sheets.length <= 1) return;
  state.sheets = state.sheets.filter(s => s.id !== id);
  if (state.activeSheetId === id) {
    state.activeSheetId = state.sheets[0].id;
  }
  saveState();
}

export function replaceProjectState(nextState) {
  if (!nextState || typeof nextState !== 'object' || Array.isArray(nextState)) {
    throw new Error('Invalid project JSON file.');
  }
  if (!Array.isArray(nextState.sheets) || !nextState.sheets.length || nextState.sheets.length > 100) {
    throw new Error('Project must contain between 1 and 100 sheets.');
  }
  const str = (v, max = 200) => (typeof v === 'string' ? v.slice(0, max) : '');
  const m = nextState.meta && typeof nextState.meta === 'object' ? nextState.meta : {};
  const cleanMeta = {
    projectName: str(m.projectName),
    projectNumber: str(m.projectNumber, 64),
    engineer: str(m.engineer, 100),
    checker: str(m.checker, 100),
    codeEdition: str(m.codeEdition, 120),
    firmName: str(m.firmName, 120)
  };
  const cleanSheets = nextState.sheets.map((s, idx) => {
    if (!s || typeof s !== 'object') throw new Error(`Invalid sheet at index ${idx}`);
    return {
      id: str(s.id, 64) || `s${idx + 1}`,
      title: str(s.title, 160) || `Sheet ${idx + 1}`,
      discipline: str(s.discipline, 64) || 'Structural',
      codeRef: str(s.codeRef, 120),
      body: str(s.body, 100000)
    };
  });
  const activeId = cleanSheets.some(s => s.id === nextState.activeSheetId)
    ? nextState.activeSheetId
    : cleanSheets[0].id;
  state = { meta: cleanMeta, activeSheetId: activeId, sheets: cleanSheets };
  saveState();
}
