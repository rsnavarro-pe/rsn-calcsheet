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
      firmName: 'Navarro Structural & Civil'
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

export function deleteSheet(id) {
  if (state.sheets.length <= 1) return;
  state.sheets = state.sheets.filter(s => s.id !== id);
  if (state.activeSheetId === id) {
    state.activeSheetId = state.sheets[0].id;
  }
  saveState();
}

export function replaceProjectState(nextState) {
  if (!nextState || !Array.isArray(nextState.sheets) || !nextState.sheets.length) {
    throw new Error('Invalid project JSON file.');
  }
  state = nextState;
  saveState();
}
