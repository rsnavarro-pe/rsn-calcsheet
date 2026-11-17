/**
 * Calcpad-Documented Numeric Keypad (Numbers, Operators, Functions with inv/hyp, Other)
 */

let invMode = false;
let hypMode = false;

function trigLabel(base) {
  const pre = invMode ? 'a' : '';
  const suf = hypMode ? 'h' : '';
  return `${pre}${base}${suf}(`;
}

export function renderKeypad(container, onInsert, onAction) {
  const rows = [
    ['7', '8', '9', '/', 'sqrt(', '^2', trigLabel('sin'), 'min(', 'max(', 'ft', 'in', 'kip'],
    ['4', '5', '6', '*', '^', '^3', trigLabel('cos'), 'abs(', 'round(', 'klf', 'psi', 'ksi'],
    ['1', '2', '3', '-', 'ln(', 'log10(', trigLabel('tan'), 'floor(', 'ceil(', 'psf', 'gpm', 'cfs'],
    ['0', '.', '=', '+', '≡', '-> ', 'pi', '(', ')', 'check(', 'hp', 'deg']
  ];

  container.innerHTML = '';
  for (const row of rows) {
    const rowEl = document.createElement('div');
    rowEl.className = 'kp-row';
    for (const label of row) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `kp-btn ${/^[0-9.]$/.test(label) ? 'kp-num' : /^[+\-*/=^≡]$/.test(label) ? 'kp-op' : 'kp-fn'}`;
      btn.textContent = label;
      btn.addEventListener('click', () => onInsert(label));
      rowEl.appendChild(btn);
    }
    container.appendChild(rowEl);
  }

  const ctrlRow = document.createElement('div');
  ctrlRow.className = 'kp-row kp-ctrl-row';

  const invBtn = mkCtrl('inv', () => { invMode = !invMode; renderKeypad(container, onInsert, onAction); }, invMode);
  const hypBtn = mkCtrl('hyp', () => { hypMode = !hypMode; renderKeypad(container, onInsert, onAction); }, hypMode);
  const cBtn = mkCtrl('C (Backspace)', () => onAction('backspace'));
  const acBtn = mkCtrl('AC (Line / 2x All)', () => onAction('clearline'));
  acBtn.addEventListener('dblclick', () => onAction('clearall'));
  const entBtn = mkCtrl('↵ Enter', () => onAction('newline'));

  ctrlRow.append(invBtn, hypBtn, cBtn, acBtn, entBtn);
  container.appendChild(ctrlRow);
}

function mkCtrl(text, onClick, active = false) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = `kp-btn kp-ctrl ${active ? 'active' : ''}`;
  b.textContent = text;
  b.addEventListener('click', onClick);
  return b;
}
