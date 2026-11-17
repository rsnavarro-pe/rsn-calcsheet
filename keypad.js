/**
 * Built-In Engineering Calculator Keypad (Inserts at cursor in #calc-editor)
 */

const KEY_ROWS = [
  ['7', '8', '9', '/', 'sqrt(', '^2', 'sin(', 'cos(', 'tan(', 'pi', '(', ')'],
  ['4', '5', '6', '*', '^', '^3', 'asin(', 'acos(', 'atan(', 'min(', 'max(', 'abs('],
  ['1', '2', '3', '-', 'ln(', 'log10(', 'round(', 'ceil(', 'floor(', 'ft', 'in', 'kip'],
  ['0', '.', '=', '+', '-> ', 'check(', 'klf', 'psi', 'ksi', 'psf', 'gpm', 'cfs']
];

export function renderKeypad(container, onInsert, onAction) {
  container.innerHTML = '';
  for (const row of KEY_ROWS) {
    const rowEl = document.createElement('div');
    rowEl.className = 'kp-row';
    for (const label of row) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `kp-btn ${/^[0-9.]$/.test(label) ? 'kp-num' : /^[+\-*/=^]$/.test(label) ? 'kp-op' : 'kp-fn'}`;
      btn.textContent = label;
      btn.addEventListener('click', () => onInsert(label));
      rowEl.appendChild(btn);
    }
    container.appendChild(rowEl);
  }
  const ctrlRow = document.createElement('div');
  ctrlRow.className = 'kp-row kp-ctrl-row';
  for (const [label, act] of [['⌫ Backspace', 'backspace'], ['AC Clear Line', 'clearline'], ['↵ New Line', 'newline']]) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kp-btn kp-ctrl';
    btn.textContent = label;
    btn.addEventListener('click', () => onAction(act));
    ctrlRow.appendChild(btn);
  }
  container.appendChild(ctrlRow);
}
