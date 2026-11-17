/**
 * Interactive CalcPad-Style Input Form (Middle Column)
 * Renders editable pale-yellow input boxes for literal inputs and typeset formulas.
 */
import { formatVarName, formatMathExpr } from './math-format.js';

const INPUT_RE = /^(-?\d+(?:\.\d+)?)(?:\s+([a-zA-Z][a-zA-Z0-9^/%-]*))?$/;
const FTIN_RE = /^(\d+(?:\.\d+)?'-\d+(?:\.\d+)?(?:\s+\d+\/\d+)?")$/;

export function parseInputLiteral(formula) {
  const s = String(formula || '').trim();
  const ftin = s.match(FTIN_RE);
  if (ftin) return { val: ftin[1], unit: '', isFtIn: true };
  const m = s.match(INPUT_RE);
  if (m) return { val: m[1], unit: m[2] || '', isFtIn: false };
  return null;
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

export function renderInputForm(container, sheet, results, diagramHtml, onLineUpdate) {
  const floatDiag = diagramHtml
    ? `<div class="cp-diagram-float">${diagramHtml}</div>`
    : '';

  const linesHtml = results.map((r) => {
    if (r.type === 'blank') return '<div class="cp-spacer"></div>';
    if (r.type === 'h1') return `<h1 class="cp-h1">${esc(r.text)}</h1>`;
    if (r.type === 'h2') return `<h2 class="cp-h2">${esc(r.text)}</h2>`;
    if (r.type === 'h3') return `<h3 class="cp-h3">${esc(r.text)}</h3>`;
    if (r.type === 'note') return `<p class="cp-note">${esc(r.text)}</p>`;
    if (r.type === 'error') return `<div class="calc-error">Line ${r.lineNo}: ${esc(r.message)}</div>`;
    if (r.type === 'check') {
      return `<div class="cp-line cp-check-ref">${esc(r.label)} (DCR ≤ 1.00)</div>`;
    }
    if (r.type === 'calc') {
      const lit = parseInputLiteral(r.formula);
      if (lit) {
        return `<div class="cp-line math-expr">
          <span class="cp-var">${formatVarName(r.name)}</span> =
          <input class="cp-input-box" type="text" data-lineno="${r.lineNo}" data-unit="${esc(lit.unit)}" value="${esc(lit.val)}" aria-label="${esc(r.name)}">
          ${lit.unit ? `<span class="cp-unit">${esc(lit.unit)}</span>` : ''}
        </div>`;
      }
      return `<div class="cp-line math-expr">
        <span class="cp-var">${formatVarName(r.name)}</span> = ${formatMathExpr(r.formula)}
      </div>`;
    }
    if (r.type === 'expr') {
      return `<div class="cp-line math-expr">${formatMathExpr(r.formula)}</div>`;
    }
    return '';
  }).join('');

  container.innerHTML = `<div class="cp-sheet">${floatDiag}<div class="cp-flow">${linesHtml}</div></div>`;

  container.querySelectorAll('.cp-input-box').forEach((inp) => {
    inp.addEventListener('change', () => {
      const lineNo = parseInt(inp.getAttribute('data-lineno'), 10);
      const unit = inp.getAttribute('data-unit') || '';
      const nextVal = inp.value.trim();
      if (nextVal) onLineUpdate(lineNo, nextVal, unit);
    });
  });
}
