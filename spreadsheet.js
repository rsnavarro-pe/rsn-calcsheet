/**
 * Zero-Dependency Engineering Spreadsheet Engine & Renderer (US Customary)
 */

export const SAMPLE_SPREADSHEETS = {
  beam_schedule: {
    title: 'SP-1: Steel Beam Schedule (AISC 360-22)',
    codeRef: 'AISC 360-22 LRFD',
    rows: [
      ['Beam', 'Span (ft)', 'wu (klf)', 'Mu (kip-ft)', 'phi*Mn (kip-ft)', 'DCR', 'Status'],
      ['B-1', '24', '1.85', '=B2^2*C2/8', '288', '=D2/E2', '=IF(F2<=1,"PASS","FAIL")'],
      ['B-2', '20', '2.10', '=B3^2*C3/8', '210', '=D3/E3', '=IF(F3<=1,"PASS","FAIL")'],
      ['B-3', '28', '1.60', '=B4^2*C4/8', '288', '=D4/E4', '=IF(F4<=1,"PASS","FAIL")'],
      ['B-4', '18', '2.40', '=B5^2*C5/8', '144', '=D5/E5', '=IF(F5<=1,"PASS","FAIL")'],
      ['Max', '=MAX(B2:B5)', '=MAX(C2:C5)', '=MAX(D2:D5)', '', '=MAX(F2:F5)', '=IF(F6<=1,"PASS","FAIL")']
    ]
  },
  storm_schedule: {
    title: 'SP-2: Storm Drain Pipe Schedule (HEC-22)',
    codeRef: 'FHWA HEC-22 Rational Method',
    rows: [
      ['Run', 'Area (ac)', 'C', 'i (in/hr)', 'Q (cfs)', 'Qcap (cfs)', 'DCR'],
      ['P-1', '1.20', '0.85', '4.65', '=B2*C2*D2', '6.50', '=E2/F2'],
      ['P-2', '0.95', '0.75', '4.65', '=B3*C3*D3', '6.50', '=E3/F3'],
      ['P-3', '2.10', '0.80', '4.20', '=B4*C4*D4', '10.50', '=E4/F4'],
      ['Total', '=SUM(B2:B4)', '', '', '=SUM(E2:E4)', '', '=MAX(G2:G4)']
    ]
  }
};

function colLabel(c) { return String.fromCharCode(65 + c); }
function parseRef(ref) {
  const m = /^([A-Z]+)(\d+)$/.exec(ref.toUpperCase());
  if (!m) return null;
  return { r: parseInt(m[2], 10) - 1, c: m[1].charCodeAt(0) - 65 };
}

export function evalSpreadsheet(rows) {
  const cache = new Map();
  const visiting = new Set();

  function getVal(r, c) {
    const key = `${r},${c}`;
    if (cache.has(key)) return cache.get(key);
    const raw = rows[r]?.[c] ?? '';
    if (typeof raw !== 'string' || !raw.startsWith('=')) {
      const n = Number(raw);
      const v = raw.trim() !== '' && Number.isFinite(n) ? n : raw;
      cache.set(key, v);
      return v;
    }
    if (visiting.has(key)) return '#CYCLE!';
    visiting.add(key);
    let out;
    try {
      out = evalFormula(raw.slice(1).trim(), getVal);
    } catch {
      out = '#ERR';
    }
    visiting.delete(key);
    cache.set(key, out);
    return out;
  }

  return rows.map((row, r) => row.map((_, c) => getVal(r, c)));
}

function evalFormula(expr, getVal) {
  // Range functions: SUM, AVERAGE, MIN, MAX
  const replaced = expr.replace(/\b(SUM|AVERAGE|MIN|MAX)\(([A-Z]+\d+):([A-Z]+\d+)\)/gi, (_, fn, a, b) => {
    const p1 = parseRef(a), p2 = parseRef(b);
    if (!p1 || !p2) return '0';
    const vals = [];
    for (let r = Math.min(p1.r, p2.r); r <= Math.max(p1.r, p2.r); r++) {
      for (let c = Math.min(p1.c, p2.c); c <= Math.max(p1.c, p2.c); c++) {
        const v = Number(getVal(r, c));
        if (Number.isFinite(v)) vals.push(v);
      }
    }
    if (!vals.length) return '0';
    const u = fn.toUpperCase();
    if (u === 'SUM') return String(vals.reduce((s, x) => s + x, 0));
    if (u === 'AVERAGE') return String(vals.reduce((s, x) => s + x, 0) / vals.length);
    if (u === 'MIN') return String(Math.min(...vals));
    return String(Math.max(...vals));
  });

  // IF(cond, t, f)
  const ifMatch = replaced.match(/^IF\((.+),(.+),(.+)\)$/i);
  if (ifMatch) {
    const cond = evalArith(ifMatch[1], getVal);
    return cond ? evalArith(ifMatch[2], getVal) : evalArith(ifMatch[3], getVal);
  }
  return evalArith(replaced, getVal);
}

function evalArith(expr, getVal) {
  const s = expr.trim();
  if (/^"[^"]*"$/.test(s)) return s.slice(1, -1);
  // Replace cell refs and math functions
  const jsExpr = s
    .replace(/\b([A-Z]+\d+)\b/g, (_, ref) => {
      const p = parseRef(ref);
      const v = p ? Number(getVal(p.r, p.c)) : 0;
      return Number.isFinite(v) ? String(v) : '0';
    })
    .replace(/\bSQRT\(/gi, 'Math.sqrt(')
    .replace(/\bABS\(/gi, 'Math.abs(')
    .replace(/\^/g, '**');
  if (!/^[0-9+\-*/().<>=!\sMathsqrtabs]+$/.test(jsExpr)) {
    throw new Error('Unsafe formula');
  }
  return Function(`"use strict"; return (${jsExpr});`)();
}

function fmtCell(v) {
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : Number(v.toFixed(3)).toString();
  return String(v ?? '');
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

export function renderSpreadsheetEditor(container, sheet, onChange) {
  const rows = sheet.rows || [[]];
  const evald = evalSpreadsheet(rows);
  const cols = rows[0]?.length || 1;

  let html = `<div class="sp-toolbar">
    <span class="sp-hint">Use <code>=A1+B1</code>, <code>=SUM(B2:B5)</code>, <code>=MAX(...)</code>, <code>=IF(F2&lt;=1,"PASS","FAIL")</code></span>
    <div class="sp-btns"><button type="button" id="sp-add-row" class="btn">+ Row</button><button type="button" id="sp-add-col" class="btn">+ Col</button></div>
  </div><div class="sp-table-wrap"><table class="sp-grid"><thead><tr><th></th>`;
  for (let c = 0; c < cols; c++) html += `<th>${colLabel(c)}</th>`;
  html += `</tr></thead><tbody>`;

  rows.forEach((row, r) => {
    html += `<tr><td class="sp-rnum">${r + 1}</td>`;
    for (let c = 0; c < cols; c++) {
      const raw = row[c] ?? '';
      const isFormula = typeof raw === 'string' && raw.startsWith('=');
      html += `<td><input class="sp-cell ${isFormula ? 'sp-formula' : ''}" data-r="${r}" data-c="${c}" value="${esc(raw)}" title="${esc(fmtCell(evald[r][c]))}"></td>`;
    }
    html += `</tr>`;
  });
  html += `</tbody></table></div>`;
  container.innerHTML = html;

  container.querySelectorAll('.sp-cell').forEach(inp => {
    inp.addEventListener('change', () => {
      const r = +inp.dataset.r, c = +inp.dataset.c;
      rows[r][c] = inp.value;
      onChange(rows);
    });
  });
  container.querySelector('#sp-add-row').onclick = () => {
    rows.push(Array(cols).fill(''));
    onChange(rows);
  };
  container.querySelector('#sp-add-col').onclick = () => {
    rows.forEach(r => r.push(''));
    onChange(rows);
  };
}

export function renderSpreadsheetOutput(sheet) {
  const evald = evalSpreadsheet(sheet.rows || []);
  if (!evald.length) return '';
  let html = `<table class="sp-out-table"><thead><tr>`;
  evald[0].forEach(h => { html += `<th>${esc(h)}</th>`; });
  html += `</tr></thead><tbody>`;
  for (let r = 1; r < evald.length; r++) {
    html += `<tr>`;
    evald[r].forEach(v => {
      const txt = fmtCell(v);
      const cls = txt === 'PASS' ? 'sp-pass' : txt === 'FAIL' ? 'sp-fail' : '';
      html += `<td class="${cls}">${esc(txt)}</td>`;
    });
    html += `</tr>`;
  }
  return html + `</tbody></table>`;
}
