/**
 * Self-contained Mathematical Notation Formatter (Zero external dependencies)
 * Converts engineering expressions into typeset HTML math (fractions, subscripts, Greek, powers).
 */

const GREEK = {
  phi: 'φ',
  delta: 'δ',
  sigma: 'σ',
  tau: 'τ',
  gamma: 'γ',
  pi: 'π',
  omega: 'ω',
  Omega: 'Ω',
  alpha: 'α',
  beta: 'β'
};

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

export function formatVarName(name) {
  const parts = String(name).split('_');
  const base = GREEK[parts[0]] || esc(parts[0]);
  if (parts.length === 1) return `<var>${base}</var>`;
  const sub = parts.slice(1).map(p => GREEK[p] || esc(p)).join(',');
  return `<var>${base}</var><sub>${sub}</sub>`;
}

function formatIdentifiersAndPowers(expr) {
  let out = esc(expr);
  // sqrt(...) -> √(...)
  out = out.replace(/\bsqrt\(([^()]+)\)/g, '<span class="sqrt">√<span class="radicand">$1</span></span>');
  // Unit/number powers: ^2, ^3, ^4, ^(2/3)
  out = out.replace(/\^\(([^)]+)\)/g, '<sup>($1)</sup>');
  out = out.replace(/\^(\d+(?:\.\d+)?)/g, '<sup>$1</sup>');
  // Multiplication dot
  out = out.replace(/\s*\*\s*/g, ' · ');
  // Variable names with subscripts (e.g. w_u, phi_Mn, delta_L) outside HTML tags
  out = out.replace(/(?<!<[^>]*)\b([a-zA-Z]+_[a-zA-Z0-9_]+)\b(?![^<]*>)/g, (_, id) => formatVarName(id));
  // Standalone Greek words
  out = out.replace(/(?<!<[^>]*)\b(phi|delta|sigma|tau|gamma|pi|omega|Omega|alpha|beta)\b(?![^<]*>)/g, (_, g) => `<var>${GREEK[g]}</var>`);
  return out;
}

/**
 * Splits a top-level `num / den` into a stacked fraction when clean,
 * otherwise formats inline with `/` and proper math typography.
 */
export function formatMathExpr(expr) {
  const s = String(expr ?? '').trim();
  const slashIdx = findTopLevelSlash(s);
  if (slashIdx > 0) {
    const num = stripOuterParens(s.slice(0, slashIdx).trim());
    const den = stripOuterParens(s.slice(slashIdx + 1).trim());
    // Avoid stacking unit-only slashes like "10 in/hr"
    if (den && !/^(hr|s|ft|in|min)$/.test(den)) {
      return `<span class="frac"><span class="num">${formatIdentifiersAndPowers(num)}</span><span class="den">${formatIdentifiersAndPowers(den)}</span></span>`;
    }
  }
  return formatIdentifiersAndPowers(s);
}

function findTopLevelSlash(s) {
  let depth = 0, quote = null, lastSlash = -1;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quote) { if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (c === '/' && depth === 0) lastSlash = i;
  }
  return lastSlash;
}

function stripOuterParens(s) {
  if (s.startsWith('(') && s.endsWith(')')) {
    let d = 0;
    for (let i = 0; i < s.length - 1; i++) {
      if (s[i] === '(') d++;
      else if (s[i] === ')') d--;
      if (d === 0) return s;
    }
    return s.slice(1, -1);
  }
  return s;
}
