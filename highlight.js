/**
 * Lightweight Syntax Highlighter for RSN CalcSheet Editor
 * Highlights variable names (bold) and editable numeric/string values (highlighted).
 */

function esc(s) {
  return String(s).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

export function highlightCode(text) {
  return text.split('\n').map(highlightLine).join('\n') + '\n';
}

function highlightLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('#')) return `<span class="hl-head">${esc(line)}</span>`;
  if (trimmed.startsWith('//')) return `<span class="hl-comm">${esc(line)}</span>`;

  const eqIdx = line.indexOf('=');
  if (eqIdx > 0 && !trimmed.startsWith('check(')) {
    const lhs = line.slice(0, eqIdx);
    const rhs = line.slice(eqIdx + 1);
    return `<span class="hl-var">${esc(lhs)}</span>=${highlightExpr(rhs)}`;
  }
  return highlightExpr(line);
}

function highlightExpr(expr) {
  // Tokenize strings, ft-in literals, numbers, arrows/units, and identifiers
  const re = /("(?:[^"]*)"|\d+(?:\.\d+)?'-\d+(?:\.\d+)?(?:\s+\d+\/\d+)?"|\b\d+(?:\.\d+)?\b|->|[a-zA-Z_][a-zA-Z0-9_]*)/g;
  let out = '';
  let last = 0;
  for (const m of expr.matchAll(re)) {
    out += esc(expr.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('"') || tok.includes("'-") || /^\d/.test(tok)) {
      out += `<span class="hl-val">${esc(tok)}</span>`;
    } else if (tok === '->') {
      out += `<span class="hl-op">-&gt;</span>`;
    } else if (/^(aisc|nds|rebar|pipe|check|sqrt|abs|min|max|sin|cos|tan|atan|round|ceil|floor|ln|log10)$/.test(tok)) {
      out += `<span class="hl-fn">${esc(tok)}</span>`;
    } else if (/^(in|ft|yd|mi|in2|ft2|sf|ac|in3|ft3|cf|in4|lb|lbf|kip|kips|plf|klf|psi|ksi|psf|ksf|pci|pcf|kcf|s|sec|min|hr|fps|mph|cfs|gpm|gal|hp|rad|deg)$/.test(tok)) {
      out += `<span class="hl-unit">${esc(tok)}</span>`;
    } else {
      out += `<span class="hl-ref">${esc(tok)}</span>`;
    }
    last = m.index + tok.length;
  }
  out += esc(expr.slice(last));
  return out;
}
