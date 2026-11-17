/**
 * Zero-Dependency, CSP-Safe Engineering Spreadsheet Engine & Dynamic SVG Renderer
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
  },
  interest_schedule: {
    title: 'SP-3: Simple & Compound Interest Schedule',
    codeRef: 'Engineering Economics / Finance',
    rows: [
      ['Option', 'Principal ($)', 'Rate (dec)', 'Years', 'Comp/Yr (n)', 'Simple FV ($)', 'Compound FV ($)'],
      ['Annual', '10000', '0.06', '5', '1', '=B2*(1+C2*D2)', '=B2*(1+C2/E2)^(E2*D2)'],
      ['Quarterly', '10000', '0.06', '5', '4', '=B3*(1+C3*D3)', '=B3*(1+C3/E3)^(E3*D3)'],
      ['Monthly', '10000', '0.06', '5', '12', '=B4*(1+C4*D4)', '=B4*(1+C4/E4)^(E4*D4)'],
      ['Daily', '10000', '0.06', '5', '365', '=B5*(1+C5*D5)', '=B5*(1+C5/E5)^(E5*D5)'],
      ['Max FV', '', '', '', '', '=MAX(F2:F5)', '=MAX(G2:G5)']
    ]
  },
  loan_schedule: {
    title: 'SP-4: Loan & Equipment Financing (PMT)',
    codeRef: 'Engineering Economics / Finance',
    rows: [
      ['Scenario', 'Principal ($)', 'Annual Rate', 'Years', 'Mo. Rate', 'Months', 'Monthly PMT ($)'],
      ['3-Yr Equip', '50000', '0.065', '3', '=C2/12', '=D2*12', '=B2*E2/(1-(1+E2)^(-F2))'],
      ['5-Yr Equip', '50000', '0.065', '5', '=C3/12', '=D3*12', '=B3*E3/(1-(1+E3)^(-F3))'],
      ['10-Yr Cap', '150000', '0.055', '10', '=C4/12', '=D4*12', '=B4*E4/(1-(1+E4)^(-F4))'],
      ['Min PMT', '', '', '', '', '', '=MIN(G2:G4)']
    ]
  },
  npv_schedule: {
    title: 'SP-5: Project Cash Flow & NPV Analysis',
    codeRef: 'Engineering Economics / Present Worth',
    rows: [
      ['Year', 'Cash Flow ($)', 'Disc. Rate', 'PV Factor', 'Present Worth ($)', 'Decision'],
      ['0', '-100000', '0.07', '=1/(1+C2)^A2', '=B2*D2', ''],
      ['1', '28000', '0.07', '=1/(1+C3)^A3', '=B3*D3', ''],
      ['2', '30000', '0.07', '=1/(1+C4)^A4', '=B4*D4', ''],
      ['3', '32000', '0.07', '=1/(1+C5)^A5', '=B5*D5', ''],
      ['4', '35000', '0.07', '=1/(1+C6)^A6', '=B6*D6', ''],
      ['NPV', '=SUM(B2:B6)', '', '', '=SUM(E2:E6)', '=IF(E7>=0,"PASS","FAIL")']
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
    try { out = evalFormula(raw.slice(1).trim(), getVal); } catch { out = '#ERR'; }
    visiting.delete(key);
    cache.set(key, out);
    return out;
  }

  return rows.map((row, r) => row.map((_, c) => getVal(r, c)));
}

function evalFormula(expr, getVal) {
  const expanded = expr.replace(/\b(SUM|AVERAGE|MIN|MAX)\(([A-Z]+\d+):([A-Z]+\d+)\)/gi, (_, fn, a, b) => {
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

  const ifMatch = expanded.match(/^IF\(([^,]+),([^,]+),([^)]+)\)$/i);
  if (ifMatch) {
    return evalSafeExpr(ifMatch[1], getVal) ? evalSafeExpr(ifMatch[2], getVal) : evalSafeExpr(ifMatch[3], getVal);
  }
  return evalSafeExpr(expanded, getVal);
}

function evalSafeExpr(expr, getVal) {
  const s = expr.trim();
  if (/^"[^"]*"$/.test(s)) return s.slice(1, -1);

  const tokens = [];
  let i = 0;
  while (i < s.length) {
    if (/\s/.test(s[i])) { i++; continue; }
    const two = s.slice(i, i + 2);
    if (['<=', '>=', '!=', '<>'].includes(two)) { tokens.push({ t: 'OP', v: two }); i += 2; continue; }
    if ('+-*/^()<>=,'.includes(s[i])) { tokens.push({ t: 'OP', v: s[i++] }); continue; }
    if (/\d|\./.test(s[i])) {
      let num = '';
      while (i < s.length && /[\d.]/.test(s[i])) num += s[i++];
      tokens.push({ t: 'NUM', v: parseFloat(num) });
      continue;
    }
    if (/[A-Za-z_]/.test(s[i])) {
      let id = '';
      while (i < s.length && /[A-Za-z0-9_]/.test(s[i])) id += s[i++];
      tokens.push({ t: 'ID', v: id });
      continue;
    }
    throw new Error('Bad token');
  }

  let p = 0;
  const peek = () => tokens[p];
  const next = () => tokens[p++];

  function parseCmp() {
    let left = parseAdd();
    while (peek()?.t === 'OP' && ['<=', '>=', '<', '>', '=', '!=', '<>'].includes(peek().v)) {
      const op = next().v;
      const right = parseAdd();
      if (op === '<=') left = left <= right ? 1 : 0;
      else if (op === '>=') left = left >= right ? 1 : 0;
      else if (op === '<') left = left < right ? 1 : 0;
      else if (op === '>') left = left > right ? 1 : 0;
      else if (op === '=') left = left === right ? 1 : 0;
      else left = left !== right ? 1 : 0;
    }
    return left;
  }
  function parseAdd() {
    let l = parseMul();
    while (peek()?.t === 'OP' && (peek().v === '+' || peek().v === '-')) {
      l = next().v === '+' ? l + parseMul() : l - parseMul();
    }
    return l;
  }
  function parseMul() {
    let l = parsePow();
    while (peek()?.t === 'OP' && (peek().v === '*' || peek().v === '/')) {
      l = next().v === '*' ? l * parsePow() : l / parsePow();
    }
    return l;
  }
  function parsePow() {
    let b = parseUnary();
    if (peek()?.t === 'OP' && peek().v === '^') { next(); return Math.pow(b, parsePow()); }
    return b;
  }
  function parseUnary() {
    if (peek()?.t === 'OP' && peek().v === '-') { next(); return -parseUnary(); }
    if (peek()?.t === 'OP' && peek().v === '+') { next(); return parseUnary(); }
    return parsePrim();
  }
  function parsePrim() {
    const tk = next();
    if (!tk) throw new Error('EOF');
    if (tk.t === 'NUM') return tk.v;
    if (tk.t === 'OP' && tk.v === '(') {
      const v = parseCmp();
      if (next()?.v !== ')') throw new Error(')');
      return v;
    }
    if (tk.t === 'ID') {
      if (peek()?.v === '(') {
        next();
        const arg = parseCmp();
        if (next()?.v !== ')') throw new Error(')');
        const u = tk.v.toUpperCase();
        if (u === 'SQRT') return Math.sqrt(arg);
        if (u === 'ABS') return Math.abs(arg);
        throw new Error('Fn');
      }
      const ref = parseRef(tk.v);
      if (ref) {
        const v = Number(getVal(ref.r, ref.c));
        return Number.isFinite(v) ? v : 0;
      }
    }
    throw new Error('Syntax');
  }
  return parseCmp();
}

function fmtCell(v) {
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : Number(v.toFixed(3)).toString();
  return String(v ?? '');
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

export function renderSpreadsheetDiagram(sheet, evald) {
  if (!evald || evald.length < 2) return '';
  const headers = evald[0].map(h => String(h || '').toLowerCase());
  const dcrCol = headers.findIndex(h => h.includes('dcr'));
  const valCol = dcrCol >= 0 ? dcrCol : headers.findIndex((h, i) => i > 0 && typeof evald[1][i] === 'number');
  if (valCol < 0) return '';

  const items = [];
  for (let r = 1; r < evald.length; r++) {
    const label = String(evald[r][0] || '');
    const v = Number(evald[r][valCol]);
    if (label && !/^(max|total|min)$/i.test(label) && Number.isFinite(v)) {
      items.push({ label, v });
    }
  }
  if (!items.length) return '';

  const maxV = dcrCol >= 0 ? Math.max(1.2, ...items.map(x => x.v)) : Math.max(1, ...items.map(x => x.v)) * 1.15;
  const barH = 18, gap = 8, x0 = 64, wMax = 320;
  const h = 34 + items.length * (barH + gap);
  const limitX = dcrCol >= 0 ? x0 + (1.0 / maxV) * wMax : null;

  let inner = '';
  items.forEach((it, idx) => {
    const y = 14 + idx * (barH + gap);
    const bw = Math.max(2, Math.min(wMax, (it.v / maxV) * wMax));
    const color = dcrCol >= 0 ? (it.v <= 1 ? '#1F6B48' : '#A12B2B') : '#90472D';
    inner += `<text x="${x0 - 6}" y="${y + 13}" text-anchor="end" font-size="11" fill="#2C2C2E" font-weight="600">${esc(it.label)}</text>`;
    inner += `<rect x="${x0}" y="${y}" width="${wMax}" height="${barH}" rx="2" fill="#F5F0EC"/>`;
    inner += `<rect x="${x0}" y="${y}" width="${bw.toFixed(1)}" height="${barH}" rx="2" fill="${color}" fill-opacity="0.82"/>`;
    inner += `<text x="${x0 + bw + 6}" y="${y + 13}" font-size="11" fill="#2C2C2E" font-weight="600">${it.v.toFixed(3)}</text>`;
  });
  if (limitX !== null) {
    inner += `<line x1="${limitX.toFixed(1)}" y1="8" x2="${limitX.toFixed(1)}" y2="${h - 14}" stroke="#90472D" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    inner += `<text x="${limitX.toFixed(1)}" y="${h - 2}" text-anchor="middle" font-size="10" fill="#90472D" font-weight="600">DCR = 1.00</text>`;
  }

  return `<figure class="sheet-diagram">
    <svg viewBox="0 0 460 ${h}" class="diagram-svg" fill="none">${inner}</svg>
    <figcaption>${esc(sheet.title)} — ${dcrCol >= 0 ? 'Demand / Capacity Utilization (DCR)' : esc(evald[0][valCol])}</figcaption>
  </figure>`;
}

export function renderSpreadsheetEditor(container, sheet, onChange) {
  const rows = sheet.rows || [[]];
  const evald = evalSpreadsheet(rows);
  const cols = rows[0]?.length || 1;
  const diag = renderSpreadsheetDiagram(sheet, evald);

  let html = `${diag}<div class="sp-toolbar">
    <span class="sp-hint">Formulas: <code>=B2^2*C2/8</code>, <code>=SUM(B2:B5)</code>, <code>=MAX(...)</code>, <code>=IF(F2&lt;=1,"PASS","FAIL")</code></span>
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
    inp.addEventListener('change', () => { rows[+inp.dataset.r][+inp.dataset.c] = inp.value; onChange(rows); });
  });
  container.querySelector('#sp-add-row').onclick = () => { rows.push(Array(cols).fill('')); onChange(rows); };
  container.querySelector('#sp-add-col').onclick = () => { rows.forEach(r => r.push('')); onChange(rows); };
}

export function renderSpreadsheetOutput(sheet) {
  const evald = evalSpreadsheet(sheet.rows || []);
  if (!evald.length) return '';
  const diag = renderSpreadsheetDiagram(sheet, evald);
  let html = `${diag}<table class="sp-out-table"><thead><tr>`;
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
