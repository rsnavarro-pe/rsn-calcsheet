/**
 * Plane Geometry / Areas SVG Diagrams (15 Shapes)
 */
import { wrapSvg } from './diagrams-mechanics.js';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

export function renderAreaDiagram(title, vars) {
  const A = vars.A || 'A';
  if (title.includes('area of circle') || title.includes('circle (')) {
    return wrapSvg(`Circle — r = ${vars.r || 'r'}, A = ${A}`, `
      <circle cx="230" cy="66" r="46" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="230" y1="66" x2="276" y2="66" stroke="#90472D" stroke-width="2"/>
      <circle cx="230" cy="66" r="2.5" fill="#2C2C2E"/>
      <text x="253" y="60" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">r = ${esc(vars.r || '')}</text>
      <text x="230" y="92" text-anchor="middle" font-size="11" fill="#2C2C2E">A = ${esc(A)}</text>
    `);
  }
  if (title.includes('square')) {
    return wrapSvg(`Square — a = ${vars.a || 'a'}, A = ${A}`, `
      <rect x="184" y="20" width="92" height="92" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="184" y1="112" x2="276" y2="20" stroke="#90472D" stroke-width="1.2" stroke-dasharray="4 3"/>
      <text x="230" y="126" text-anchor="middle" font-size="11" fill="#2C2C2E">a = ${esc(vars.a || '')} | A = ${esc(A)}</text>
    `);
  }
  if (title.includes('area of rectangle') || title.includes('rectangle')) {
    return wrapSvg(`Rectangle — a = ${vars.a || ''}, b = ${vars.b || ''}, A = ${A}`, `
      <rect x="155" y="26" width="150" height="80" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <text x="230" y="122" text-anchor="middle" font-size="11" fill="#2C2C2E">a = ${esc(vars.a || '')} | A = ${esc(A)}</text>
      <text x="314" y="70" font-size="11" fill="#90472D">b = ${esc(vars.b || '')}</text>
    `);
  }
  if (title.includes('trapezoid')) {
    return wrapSvg(`Trapezoid — a = ${vars.a || ''}, b = ${vars.b || ''}, h = ${vars.h || ''}, A = ${A}`, `
      <polygon points="150,104 310,104 278,30 182,30" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="182" y1="30" x2="182" y2="104" stroke="#90472D" stroke-width="1.4" stroke-dasharray="4 3"/>
      <text x="230" y="22" text-anchor="middle" font-size="11" fill="#2C2C2E">b = ${esc(vars.b || '')}</text>
      <text x="230" y="120" text-anchor="middle" font-size="11" fill="#2C2C2E">a = ${esc(vars.a || '')} | A = ${esc(A)}</text>
      <text x="190" y="72" font-size="11" fill="#90472D">h = ${esc(vars.h || '')}</text>
    `);
  }
  if (title.includes('polygon')) {
    return wrapSvg(`Regular Polygon (n = ${vars.n || '6'}) — a = ${vars.a || ''}, A = ${A}`, `
      <polygon points="230,18 272,42 272,90 230,114 188,90 188,42" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="230" y1="66" x2="272" y2="66" stroke="#90472D" stroke-width="1.6"/>
      <text x="230" y="128" text-anchor="middle" font-size="11" fill="#2C2C2E">n = ${esc(vars.n || '')} | A = ${esc(A)}</text>
    `);
  }
  if (title.includes('ellipse')) {
    return wrapSvg(`Ellipse — a = ${vars.a || ''}, b = ${vars.b || ''}, A = ${A}`, `
      <ellipse cx="230" cy="66" rx="76" ry="44" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="230" y1="66" x2="306" y2="66" stroke="#90472D" stroke-width="1.6"/>
      <line x1="230" y1="66" x2="230" y2="22" stroke="#90472D" stroke-width="1.6"/>
      <text x="268" y="60" font-size="11" fill="#90472D">a=${esc(vars.a || '')}</text>
      <text x="236" y="44" font-size="11" fill="#90472D">b=${esc(vars.b || '')}</text>
    `);
  }
  if (title.includes('parabola')) {
    return wrapSvg(`Parabolic Segment — b = ${vars.b || ''}, h = ${vars.h || ''}, A = ${A}`, `
      <path d="M140,104 Q230,-10 320,104 Z" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="230" y1="47" x2="230" y2="104" stroke="#90472D" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="230" y="120" text-anchor="middle" font-size="11" fill="#2C2C2E">b = ${esc(vars.b || '')} | A = ${esc(A)}</text>
      <text x="236" y="80" font-size="11" fill="#90472D">h = ${esc(vars.h || '')}</text>
    `);
  }
  if (title.includes('sector')) {
    return wrapSvg(`Circular Sector — r = ${vars.r || ''}, α = ${vars.alpha || ''}, A = ${A}`, `
      <path d="M230,104 L182,36 A76,76 0 0,1 278,36 Z" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <text x="230" y="122" text-anchor="middle" font-size="11" fill="#2C2C2E">r = ${esc(vars.r || '')} | α = ${esc(vars.alpha || '')} | A = ${esc(A)}</text>
    `);
  }
  if (title.includes('segment')) {
    return wrapSvg(`Circular Segment — r = ${vars.r || ''}, c = ${vars.c || ''}, A = ${A}`, `
      <path d="M168,86 A72,72 0 0,1 292,86 Z" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <line x1="230" y1="54" x2="230" y2="86" stroke="#90472D" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="230" y="114" text-anchor="middle" font-size="11" fill="#2C2C2E">c = ${esc(vars.c || '')} | h = ${esc(vars.h || '')} | A = ${esc(A)}</text>
    `);
  }
  if (title.includes('triangle')) {
    const isRight = title.includes('right');
    const isEqui = title.includes('equilateral');
    const pts = isRight ? '170,106 290,106 170,24' : (isEqui ? '170,106 290,106 230,20' : '155,106 305,106 210,24');
    return wrapSvg(`Triangle — A = ${A}`, `
      <polygon points="${pts}" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.6"/>
      <text x="230" y="122" text-anchor="middle" font-size="11" fill="#2C2C2E">A = ${esc(A)}</text>
    `);
  }
  if (title.includes('sphere') || title.includes('cylinder') || title.includes('cone') || title.includes('frustum') || title.includes('prism')) {
    return wrapSvg(`Solid Geometry — V = ${vars.V || 'V'}`, `
      <ellipse cx="230" cy="36" rx="54" ry="16" fill="#F5DFA6" stroke="#2C2C2E" stroke-width="1.5"/>
      <path d="M176,36 V96 A54,16 0 0,0 284,96 V36" fill="#F5DFA6" fill-opacity="0.45" stroke="#2C2C2E" stroke-width="1.5"/>
      <text x="230" y="124" text-anchor="middle" font-size="11" fill="#2C2C2E">V = ${esc(vars.V || '')}</text>
    `);
  }
  if (title.includes('quadratic') || title.includes('linear')) {
    return wrapSvg(`${title.includes('quadratic') ? 'Quadratic' : '2x2 Linear'} — x = ${vars.x_1 || vars.x || ''}`, `
      <line x1="120" y1="66" x2="340" y2="66" stroke="#6E6E73" stroke-width="1.2"/>
      <line x1="230" y1="14" x2="230" y2="118" stroke="#6E6E73" stroke-width="1.2"/>
      <path d="${title.includes('quadratic') ? 'M155,22 Q230,130 305,22' : 'M150,96 L310,28 M150,32 L310,98'}" stroke="#90472D" stroke-width="2" fill="none"/>
    `);
  }
  return null;
}
