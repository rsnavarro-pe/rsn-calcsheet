/**
 * Mechanics & Classical Mechanics SVG Diagrams with Bending Moment Diagrams (BMD)
 */

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

export function wrapSvg(caption, inner, height = 132) {
  return `<figure class="sheet-diagram">
    <svg viewBox="0 0 460 ${height}" class="diagram-svg" fill="none" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>
    <figcaption>${esc(caption)}</figcaption>
  </figure>`;
}

export function bmdPanel(pathD, labelsHtml, x1 = 60, x2 = 400) {
  return `
    <line x1="${x1}" y1="156" x2="${x2}" y2="156" stroke="#6E6E73" stroke-width="1.2"/>
    <text x="14" y="160" font-size="10" fill="#6E6E73" font-weight="700">BMD</text>
    <path d="${pathD}" fill="#90472D" fill-opacity="0.14" stroke="#90472D" stroke-width="2"/>
    ${labelsHtml}
  `;
}

const PIN_L = `<polygon points="60,71 51,88 69,88" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/><line x1="46" y1="92" x2="74" y2="92" stroke="#2C2C2E" stroke-width="1.5"/>`;
const ROLLER_R = `<polygon points="400,71 391,86 409,86" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/><circle cx="395" cy="89" r="2.5" stroke="#2C2C2E" stroke-width="1.2"/><circle cx="405" cy="89" r="2.5" stroke="#2C2C2E" stroke-width="1.2"/><line x1="386" y1="93" x2="414" y2="93" stroke="#2C2C2E" stroke-width="1.5"/>`;
const WALL_L = `<line x1="60" y1="42" x2="60" y2="96" stroke="#2C2C2E" stroke-width="3"/><path d="M50,48 L60,42 M50,58 L60,52 M50,68 L60,62 M50,78 L60,72 M50,88 L60,82 M50,96 L60,90" stroke="#6E6E73" stroke-width="1.2"/>`;
const WALL_R = `<line x1="400" y1="42" x2="400" y2="96" stroke="#2C2C2E" stroke-width="3"/><path d="M400,48 L410,42 M400,58 L410,52 M400,68 L410,62 M400,78 L410,72 M400,88 L410,82 M400,96 L410,90" stroke="#6E6E73" stroke-width="1.2"/>`;

function udlBlock(label, x2 = 400) {
  const w = x2 - 60;
  const cx = 60 + w / 2;
  return `<rect x="60" y="34" width="${w}" height="22" fill="#90472D" fill-opacity="0.12" stroke="#90472D" stroke-width="1.2"/>
    <path d="M90,34 V62 M140,34 V62 M190,34 V62 M240,34 V62 M290,34 V62 M340,34 V62" stroke="#90472D" stroke-width="1.3"/>
    <text x="${cx}" y="24" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">${esc(label)}</text>`;
}

function pointArrow(x, label) {
  return `<line x1="${x}" y1="22" x2="${x}" y2="62" stroke="#90472D" stroke-width="2.5"/>
    <polygon points="${x},65 ${x - 5},54 ${x + 5},54" fill="#90472D"/>
    <text x="${x}" y="15" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">${esc(label)}</text>`;
}

export function renderMechanicsDiagram(text, vars) {
  const L = vars.L || 'L';
  const w = vars.w || vars.w_u || 'w';
  const P = vars.P || 'P';

  if (text.includes('propped cantilever')) {
    const mA = vars.M_A || 'wL²/8';
    const mS = vars.M_span || '9wL²/128';
    const bmd = bmdPanel(
      'M60,156 L60,122 Q102,140 145,156 Q272,196 400,156 Z',
      `<text x="66" y="118" font-size="10" fill="#90472D" font-weight="600">-${esc(mA)}</text>
       <text x="272" y="192" text-anchor="middle" font-size="10" fill="#2C2C2E" font-weight="600">+${esc(mS)}</text>`
    );
    return wrapSvg(`Propped Cantilever (Fixed-Pinned) — L = ${L}, M_A = ${mA}, M_span = ${mS}`, `
      <line x1="60" y1="68" x2="400" y2="68" stroke="#2C2C2E" stroke-width="4"/>
      ${WALL_L}${ROLLER_R}${udlBlock(`w = ${w}`)}
      <text x="230" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)} | R_A = ${esc(vars.R_A || '5wL/8')}</text>
      ${bmd}`, 206);
  }
  if (text.includes('fixed-ended') || text.includes('fixed end')) {
    const mE = vars.M_end || 'wL²/12';
    const mM = vars.M_mid || 'wL²/24';
    const bmd = bmdPanel(
      'M60,156 L60,124 Q230,214 400,124 L400,156 Z',
      `<text x="64" y="119" font-size="10" fill="#90472D" font-weight="600">-${esc(mE)}</text>
       <text x="396" y="119" text-anchor="end" font-size="10" fill="#90472D" font-weight="600">-${esc(mE)}</text>
       <text x="230" y="184" text-anchor="middle" font-size="10" fill="#2C2C2E" font-weight="600">+${esc(mM)}</text>`
    );
    return wrapSvg(`Fixed-Ended Beam — L = ${L}, M_end = ${mE}, M_mid = ${mM}`, `
      <line x1="60" y1="68" x2="400" y2="68" stroke="#2C2C2E" stroke-width="4"/>
      ${WALL_L}${WALL_R}${udlBlock(`w = ${w}`)}
      <text x="230" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)}</text>
      ${bmd}`, 206);
  }
  if (text.includes('cantilever')) {
    const isTip = text.includes('free end') || text.includes('tip point');
    const mMax = vars.M_max || 'M_max';
    const bmdPath = isTip ? 'M60,156 L60,120 L380,156 Z' : 'M60,156 L60,120 Q180,152 380,156 Z';
    const bmd = bmdPanel(bmdPath, `<text x="66" y="118" font-size="10" fill="#90472D" font-weight="600">-${esc(mMax)}</text>`, 60, 380);
    return wrapSvg(`Cantilever Beam — L = ${L}, M_max = ${mMax}`, `
      <line x1="60" y1="68" x2="380" y2="68" stroke="#2C2C2E" stroke-width="4"/>
      ${WALL_L}${isTip ? pointArrow(378, `P = ${P}`) : udlBlock(`w = ${w}`, 380)}
      <text x="220" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)} | δ_tip = ${esc(vars.delta_tip || 'δ_tip')}</text>
      ${bmd}`, 206);
  }
  if (text.includes('two-span') || text.includes('2-span')) {
    const mInt = vars.M_int || 'wL²/8';
    const mPos = vars.M_pos || '9wL²/128';
    const bmd = bmdPanel(
      'M60,156 Q122,194 185,156 Q208,138 230,122 Q252,138 275,156 Q338,194 400,156 Z',
      `<text x="230" y="116" text-anchor="middle" font-size="10" fill="#90472D" font-weight="600">-${esc(mInt)}</text>
       <text x="122" y="192" text-anchor="middle" font-size="10" fill="#2C2C2E" font-weight="600">+${esc(mPos)}</text>
       <text x="338" y="192" text-anchor="middle" font-size="10" fill="#2C2C2E" font-weight="600">+${esc(mPos)}</text>`
    );
    return wrapSvg(`Two-Span Continuous Beam — Spans L = ${L}, M_int = ${mInt}`, `
      <line x1="60" y1="68" x2="400" y2="68" stroke="#2C2C2E" stroke-width="4"/>
      ${PIN_L}${ROLLER_R}<polygon points="230,71 221,88 239,88" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/>
      ${udlBlock(`w = ${w}`)}
      <text x="145" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)}</text>
      <text x="315" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)}</text>
      ${bmd}`, 206);
  }
  if (text.includes('point load') || text.includes('symmetric')) {
    const isTwo = text.includes('two equal') || text.includes('symmetric');
    const isEcc = text.includes('eccentric') || text.includes('any position');
    const px = isEcc ? 180 : 230;
    const arrows = isTwo ? pointArrow(160, `P = ${P}`) + pointArrow(300, `P = ${P}`) : pointArrow(px, `P = ${P}`);
    const mMax = vars.M_max || 'M_max';
    const bmdPath = isTwo ? 'M60,156 L160,192 L300,192 L400,156 Z' : `M60,156 L${px},194 L400,156 Z`;
    const bmd = bmdPanel(bmdPath, `<text x="${isTwo ? 230 : px}" y="205" text-anchor="middle" font-size="10" fill="#90472D" font-weight="600">+${esc(mMax)}</text>`);
    return wrapSvg(`Simply Supported Beam (Point Load) — L = ${L}, M_max = ${mMax}`, `
      <line x1="60" y1="68" x2="400" y2="68" stroke="#2C2C2E" stroke-width="4"/>
      ${PIN_L}${ROLLER_R}${arrows}
      <text x="230" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)}</text>
      ${bmd}`, 212);
  }
  if (text.includes('mohr')) {
    return wrapSvg(`Mohr's Circle — σ_1 = ${vars.sigma_1 || 'σ_1'}, σ_2 = ${vars.sigma_2 || 'σ_2'}, τ_max = ${vars.tau_max || 'τ_max'}`, `
      <line x1="70" y1="64" x2="390" y2="64" stroke="#6E6E73" stroke-width="1.2"/>
      <line x1="210" y1="14" x2="210" y2="114" stroke="#6E6E73" stroke-width="1.2"/>
      <circle cx="245" cy="64" r="42" fill="#90472D" fill-opacity="0.1" stroke="#90472D" stroke-width="2"/>
      <circle cx="287" cy="64" r="3.5" fill="#2C2C2E"/><circle cx="203" cy="64" r="3.5" fill="#2C2C2E"/>
      <text x="305" y="54" font-size="11" fill="#2C2C2E" font-weight="600">σ₁ = ${esc(vars.sigma_1 || '')}</text>
      <text x="120" y="54" font-size="11" fill="#2C2C2E" font-weight="600">σ₂ = ${esc(vars.sigma_2 || '')}</text>
      <text x="245" y="16" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">τ_max = ${esc(vars.tau_max || '')}</text>
    `);
  }
  if (text.includes('euler') || text.includes('buckling')) {
    return wrapSvg(`Euler Column Buckling — L = ${L}, P_cr = ${vars.P_cr || 'P_cr'}, KL/r = ${vars.KL_r || ''}`, `
      <line x1="80" y1="66" x2="380" y2="66" stroke="#6E6E73" stroke-width="1" stroke-dasharray="4 3"/>
      <path d="M80,66 Q230,28 380,66" stroke="#90472D" stroke-width="2.5" fill="none"/>
      <circle cx="80" cy="66" r="4" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/>
      <circle cx="380" cy="66" r="4" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/>
      <line x1="420" y1="66" x2="388" y2="66" stroke="#2C2C2E" stroke-width="2.5"/>
      <polygon points="385,66 395,61 395,71" fill="#2C2C2E"/>
      <text x="230" y="106" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">P_cr = ${esc(vars.P_cr || 'P_cr')} | L = ${esc(L)}</text>
    `);
  }
  return null;
}
