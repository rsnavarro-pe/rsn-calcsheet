/**
 * Line-by-line US Engineering Calculation Parser & Evaluator
 */
import {
  DIM_ZERO, hasUnit, getUnit, sameDim, addDim, subDim, scaleDim,
  dimToString, parseFeetInches, formatQuantity, formatNum
} from './units.js';
import { AISC_W_SHAPES, NDS_LUMBER, ACI_REBAR, PIPE_SCH40, lookupSection } from './us-codes.js';

const FUNCTIONS = {
  sqrt: (a) => ({ val: Math.sqrt(a.val), dim: scaleDim(a.dim, 0.5) }),
  abs: (a) => ({ val: Math.abs(a.val), dim: a.dim }),
  round: (a) => ({ val: Math.round(a.val), dim: a.dim }),
  ceil: (a) => ({ val: Math.ceil(a.val), dim: a.dim }),
  floor: (a) => ({ val: Math.floor(a.val), dim: a.dim }),
  ln: (a) => {
    if (!sameDim(a.dim, DIM_ZERO)) throw new Error('ln() requires dimensionless input');
    return { val: Math.log(a.val), dim: DIM_ZERO };
  },
  log10: (a) => {
    if (!sameDim(a.dim, DIM_ZERO)) throw new Error('log10() requires dimensionless input');
    return { val: Math.log10(a.val), dim: DIM_ZERO };
  },
  sin: (a) => ({ val: Math.sin(a.val), dim: DIM_ZERO }),
  cos: (a) => ({ val: Math.cos(a.val), dim: DIM_ZERO }),
  tan: (a) => ({ val: Math.tan(a.val), dim: DIM_ZERO }),
  atan: (a) => ({ val: Math.atan(a.val), dim: [0, 0, 0, 1] }),
  asin: (a) => ({ val: Math.asin(a.val), dim: [0, 0, 0, 1] }),
  acos: (a) => ({ val: Math.acos(a.val), dim: [0, 0, 0, 1] }),
  sinh: (a) => ({ val: Math.sinh(a.val), dim: DIM_ZERO }),
  cosh: (a) => ({ val: Math.cosh(a.val), dim: DIM_ZERO }),
  tanh: (a) => ({ val: Math.tanh(a.val), dim: DIM_ZERO }),
  asinh: (a) => ({ val: Math.asinh(a.val), dim: DIM_ZERO }),
  acosh: (a) => ({ val: Math.acosh(a.val), dim: DIM_ZERO }),
  atanh: (a) => ({ val: Math.atanh(a.val), dim: DIM_ZERO }),
  min: (...args) => pickExtreme(args, Math.min),
  max: (...args) => pickExtreme(args, Math.max),
  aisc: (sec, prop) => lookupSection(AISC_W_SHAPES, sec, prop),
  nds: (sec, prop) => lookupSection(NDS_LUMBER, sec, prop),
  rebar: (bar, prop) => lookupSection(ACI_REBAR, bar, prop),
  pipe: (nps, prop) => lookupSection(PIPE_SCH40, nps, prop)
};

function pickExtreme(args, fn) {
  if (!args.length) throw new Error('min/max requires at least 1 argument');
  for (let i = 1; i < args.length; i++) {
    if (!sameDim(args[i].dim, args[0].dim)) {
      throw new Error('min/max arguments must share the same dimensions');
    }
  }
  return { val: fn(...args.map(a => a.val)), dim: args[0].dim };
}

function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    if (/\s/.test(expr[i])) { i++; continue; }
    // Architectural feet-inches literal e.g. 12'-6 1/2"
    const ftInMatch = expr.slice(i).match(/^\d+(?:\.\d+)?'-\d+(?:\.\d+)?(?:\s+\d+\/\d+)?"/);
    if (ftInMatch) {
      tokens.push({ type: 'FTIN', value: ftInMatch[0] });
      i += ftInMatch[0].length;
      continue;
    }
    if (expr[i] === '"' || expr[i] === "'") {
      const q = expr[i++];
      let s = '';
      while (i < expr.length && expr[i] !== q) s += expr[i++];
      if (expr[i] !== q) throw new Error('Unterminated string literal');
      i++;
      tokens.push({ type: 'STR', value: s });
      continue;
    }
    if (/\d/.test(expr[i]) || (expr[i] === '.' && /\d/.test(expr[i + 1]))) {
      let num = '';
      while (i < expr.length && /[\d.]/.test(expr[i])) num += expr[i++];
      tokens.push({ type: 'NUM', value: parseFloat(num) });
      continue;
    }
    if (/[a-zA-Z_#%]/.test(expr[i])) {
      let id = '';
      while (i < expr.length && /[a-zA-Z0-9_#%/-]/.test(expr[i])) {
        // Stop before '-' if it's subtraction (not part of compound unit like kip-ft)
        if (expr[i] === '-') {
          const rest = expr.slice(i + 1);
          const candidate = id + '-' + (rest.match(/^[a-zA-Z0-9]+/) || [''])[0];
          if (!hasUnit(candidate)) break;
        }
        if (expr[i] === '/') {
          const rest = expr.slice(i + 1);
          const candidate = id + '/' + (rest.match(/^[a-zA-Z0-9]+/) || [''])[0];
          if (!hasUnit(candidate)) break;
        }
        id += expr[i++];
      }
      tokens.push({ type: 'ID', value: id });
      continue;
    }
    if ('+-*/^(),'.includes(expr[i])) {
      tokens.push({ type: 'OP', value: expr[i++] });
      continue;
    }
    throw new Error(`Unexpected character "${expr[i]}"`);
  }
  return tokens;
}

export function evaluateExpression(expr, scope) {
  if (expr.length > 2000) throw new Error('Expression exceeds maximum length (2000 chars)');
  const tokens = tokenize(expr);
  let pos = 0;
  let depth = 0;
  const MAX_DEPTH = 64;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  function parseAdd() {
    if (++depth > MAX_DEPTH) throw new Error('Expression nesting too deep');
    try {
      let left = parseMul();
    while (peek()?.type === 'OP' && (peek().value === '+' || peek().value === '-')) {
      const op = consume().value;
      const right = parseMul();
      if (!sameDim(left.dim, right.dim)) {
        throw new Error(`Dimension mismatch: cannot ${op === '+' ? 'add' : 'subtract'} ${dimToString(left.dim)} and ${dimToString(right.dim)}`);
      }
      left = {
        val: op === '+' ? left.val + right.val : left.val - right.val,
        dim: left.dim,
        sub: `${left.sub} ${op} ${right.sub}`
      };
    }
      return left;
    } finally {
      depth--;
    }
  }

  function parseMul() {
    let left = parsePow();
    while (peek()?.type === 'OP' && (peek().value === '*' || peek().value === '/')) {
      const op = consume().value;
      const right = parsePow();
      left = {
        val: op === '*' ? left.val * right.val : left.val / right.val,
        dim: op === '*' ? addDim(left.dim, right.dim) : subDim(left.dim, right.dim),
        sub: `${left.sub} ${op === '*' ? '·' : '/'} ${right.sub}`
      };
    }
    return left;
  }

  function parsePow() {
    let base = parseUnary();
    if (peek()?.type === 'OP' && peek().value === '^') {
      consume();
      const exp = parsePow();
      if (!sameDim(exp.dim, DIM_ZERO)) throw new Error('Exponent must be dimensionless');
      return {
        val: Math.pow(base.val, exp.val),
        dim: scaleDim(base.dim, exp.val),
        sub: `${base.sub}^${exp.sub}`
      };
    }
    return base;
  }

  function parseUnary() {
    if (peek()?.type === 'OP' && (peek().value === '-' || peek().value === '+')) {
      const op = consume().value;
      const inner = parseUnary();
      return {
        val: op === '-' ? -inner.val : inner.val,
        dim: inner.dim,
        sub: op === '-' ? `-${inner.sub}` : inner.sub
      };
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error('Unexpected end of expression');
    if (t.type === 'FTIN') {
      consume();
      const q = parseFeetInches(t.value);
      return { ...q, sub: t.value };
    }
    if (t.type === 'STR') {
      consume();
      return { str: t.value, sub: `"${t.value}"` };
    }
    if (t.type === 'NUM') {
      consume();
      let unitStr = '';
      if (peek()?.type === 'ID' && hasUnit(peek().value)) {
        unitStr = consume().value;
        // Support unit^exp like in^2 or ft^3
        if (peek()?.type === 'OP' && peek().value === '^' && tokens[pos + 1]?.type === 'NUM') {
          const cand = `${unitStr}^${tokens[pos + 1].value}`;
          if (hasUnit(cand)) {
            consume(); consume();
            unitStr = cand;
          }
        }
      }
      const def = getUnit(unitStr);
      const disp = unitStr ? `${t.value} ${def.label}` : `${t.value}`;
      return { val: t.value * def.scale, dim: def.dim, sub: disp };
    }
    if (t.type === 'OP' && t.value === '(') {
      consume();
      const inner = parseAdd();
      if (peek()?.value !== ')') throw new Error('Missing closing ")"');
      consume();
      return { ...inner, sub: `(${inner.sub})` };
    }
    if (t.type === 'ID') {
      consume();
      if (peek()?.type === 'OP' && peek().value === '(') {
        consume();
        const args = [];
        if (peek()?.value !== ')') {
          args.push(parseAdd());
          while (peek()?.value === ',') { consume(); args.push(parseAdd()); }
        }
        if (peek()?.value !== ')') throw new Error(`Missing ")" in ${t.value}()`);
        consume();
        const fn = FUNCTIONS[t.value];
        if (!fn) throw new Error(`Unknown function "${t.value}"`);
        const unwrapped = args.map(a => (a.str !== undefined ? a.str : a));
        const res = fn(...unwrapped);
        const f = formatQuantity(res.val, res.dim);
        return { ...res, sub: `${f.text}${f.unit ? ' ' + f.unit : ''}` };
      }
      if (t.value === 'pi') return { val: Math.PI, dim: DIM_ZERO, sub: 'π' };
      if (scope[t.value]) {
        const v = scope[t.value];
        return { val: v.val, dim: v.dim, sub: v.display };
      }
      throw new Error(`Undefined variable "${t.value}"`);
    }
    throw new Error(`Unexpected token "${t.value}"`);
  }

  const result = parseAdd();
  if (pos < tokens.length) throw new Error(`Unexpected "${tokens[pos].value}"`);
  return result;
}

export function evaluateSheet(text) {
  const lines = text.split('\n');
  const scope = {};
  const results = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const raw = lines[idx].trim();
    const lineNo = idx + 1;
    if (!raw) { results.push({ type: 'blank', lineNo }); continue; }
    if (raw.startsWith('### ')) { results.push({ type: 'h3', text: raw.slice(4), lineNo }); continue; }
    if (raw.startsWith('## ')) { results.push({ type: 'h2', text: raw.slice(3), lineNo }); continue; }
    if (raw.startsWith('# ')) { results.push({ type: 'h1', text: raw.slice(2), lineNo }); continue; }
    if (raw.startsWith('//')) { results.push({ type: 'note', text: raw.slice(2).trim(), lineNo }); continue; }

    try {
      // check(demand, capacity, "Label")
      const checkMatch = raw.match(/^check\((.+)\)$/i);
      if (checkMatch) {
        const parts = splitTopCommas(checkMatch[1]);
        if (parts.length < 2) throw new Error('check() requires demand and capacity');
        const dem = evaluateExpression(parts[0], scope);
        const cap = evaluateExpression(parts[1], scope);
        if (!sameDim(dem.dim, cap.dim)) {
          throw new Error(`DCR unit mismatch: ${dimToString(dem.dim)} vs ${dimToString(cap.dim)}`);
        }
        const label = parts[2] ? parts[2].replace(/^["']|["']$/g, '') : 'Unity Check (DCR)';
        const dcr = cap.val === 0 ? Infinity : dem.val / cap.val;
        const dFmt = formatQuantity(dem.val, dem.dim);
        const cFmt = formatQuantity(cap.val, cap.dim);
        results.push({
          type: 'check',
          lineNo,
          label,
          dcr,
          pass: dcr <= 1.0,
          demandText: `${dFmt.text} ${dFmt.unit}`.trim(),
          capacityText: `${cFmt.text} ${cFmt.unit}`.trim()
        });
        continue;
      }

      // Equality check: lhs ≡ rhs
      if (raw.includes('≡')) {
        const [lhs, rhs] = raw.split('≡').map(s => s.trim());
        const lRes = evaluateExpression(lhs, scope);
        const rRes = evaluateExpression(rhs, scope);
        const eq = sameDim(lRes.dim, rRes.dim) && Math.abs(lRes.val - rRes.val) < 1e-9;
        results.push({
          type: 'expr',
          lineNo,
          formula: raw,
          substituted: `${lRes.sub} ≡ ${rRes.sub}`,
          result: eq ? '1 (true)' : '0 (false)'
        });
        continue;
      }

      // Assignment: name = expr [-> unit]
      const eqIdx = raw.indexOf('=');
      if (eqIdx > 0) {
        const name = raw.slice(0, eqIdx).trim();
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
          throw new Error(`Invalid variable name "${name}"`);
        }
        let rhs = raw.slice(eqIdx + 1).trim();
        let targetUnit = null;
        const arrowIdx = rhs.lastIndexOf('->');
        if (arrowIdx > 0) {
          targetUnit = rhs.slice(arrowIdx + 2).trim();
          rhs = rhs.slice(0, arrowIdx).trim();
        }
        const evalRes = evaluateExpression(rhs, scope);
        const fmt = formatQuantity(evalRes.val, evalRes.dim, targetUnit);
        const display = `${fmt.text}${fmt.unit ? ' ' + fmt.unit : ''}`;
        scope[name] = { val: evalRes.val, dim: evalRes.dim, display };
        results.push({
          type: 'calc',
          lineNo,
          name,
          formula: rhs,
          substituted: evalRes.sub,
          result: display
        });
        continue;
      }

      // Standalone expression
      const evalRes = evaluateExpression(raw, scope);
      const fmt = formatQuantity(evalRes.val, evalRes.dim);
      results.push({
        type: 'expr',
        lineNo,
        formula: raw,
        substituted: evalRes.sub,
        result: `${fmt.text}${fmt.unit ? ' ' + fmt.unit : ''}`
      });
    } catch (err) {
      results.push({ type: 'error', lineNo, raw, message: err.message });
    }
  }
  return results;
}

function splitTopCommas(s) {
  const out = [];
  let depth = 0, start = 0, quote = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quote) { if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      out.push(s.slice(start, i).trim());
      start = i + 1;
    }
  }
  out.push(s.slice(start).trim());
  return out;
}
