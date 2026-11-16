/**
 * Parametric Engineering SVG Illustrations for Worksheets
 */
import { renderMechanicsDiagram, wrapSvg, bmdPanel } from './diagrams-mechanics.js';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

export function renderSheetDiagram(sheet, results) {
  const vars = {};
  for (const r of results) {
    if (r.type === 'calc') vars[r.name] = r.result;
  }
  const title = (sheet.title || '').toLowerCase();
  const bodyHead = (sheet.body || '').slice(0, 300).toLowerCase();
  const text = `${title} ${bodyHead}`;

  const mech = renderMechanicsDiagram(text, vars);
  if (mech) return mech;

  if (title.includes('steel') || (title.includes('beam') && !title.includes('concrete'))) {
    return beamDiagram(vars.L || '24 ft', vars.w_u || vars.w || 'w_u', vars.Mu || vars.M_max || 'M_u');
  }
  if (title.includes('timber') || title.includes('wood') || title.includes('joist')) {
    return timberJoistDiagram(vars.L || '14.5 ft', vars.spacing || '16 in');
  }
  if (title.includes('concrete')) {
    return concreteSectionDiagram(vars.b || '12 in', vars.d || '19.5 in');
  }
  if (title.includes('footing')) {
    return footingDiagram(vars.B || '6.5 ft', vars.h || '18 in', vars.q_actual || 'q_act');
  }
  if (title.includes('wind') || title.includes('snow')) {
    return windSnowDiagram(vars.p_snow || 'p_snow', vars.p_windward || 'p_w');
  }
  if (title.includes('runoff') || title.includes('rational')) {
    return runoffDiagram(vars.A_total || 'A', vars.Q_10 || 'Q_10');
  }
  if (title.includes('manning') || title.includes('channel')) {
    return channelDiagram(vars.b || '4 ft', vars.y || '1.5 ft', vars.V || 'V');
  }
  if (title.includes('pipe flow') || title.includes('darcy')) {
    return pipeFlowDiagram(vars.D || '6.065 in', vars.L || '500 ft', vars.V || 'V', vars.h_tot_DW || 'h_tot');
  }
  if (title.includes('valve') || title.includes('enlargement')) {
    return enlargementDiagram(vars.d_1 || '4.03 in', vars.d_2 || '6.07 in', vars.dP_valve || 'dP');
  }
  if (title.includes('venturi') || title.includes('meter')) {
    return venturiDiagram(vars.D || '6.07 in', vars.d_throat || '3.50 in', vars.Q_meter || 'Q');
  }
  if (title.includes('pump power') || title.includes('npsha')) {
    return pumpDiagram(vars.Q || '350 gpm', vars.H_tdh || '65 ft', vars.BHP || 'BHP');
  }
  if (title.includes('system curve') || title.includes('operating point')) {
    return systemCurveDiagram(vars.Q_op || '365 gpm', vars.H_sys_op || '68.6 ft');
  }
  return '';
}

function beamDiagram(L, wu, mu) {
  const bmd = bmdPanel(
    'M60,156 Q230,224 400,156 Z',
    `<text x="230" y="203" text-anchor="middle" font-size="10" fill="#90472D" font-weight="600">+${esc(mu)}</text>`
  );
  return wrapSvg(`Simply Supported Beam — Span L = ${L}, Load = ${wu}, M_max = ${mu}`, `
    <line x1="60" y1="68" x2="400" y2="68" stroke="#2C2C2E" stroke-width="4"/>
    <polygon points="60,71 51,88 69,88" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/>
    <polygon points="400,71 391,88 409,88" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/>
    <line x1="46" y1="92" x2="74" y2="92" stroke="#2C2C2E" stroke-width="1.5"/>
    <line x1="386" y1="92" x2="414" y2="92" stroke="#2C2C2E" stroke-width="1.5"/>
    <rect x="60" y="34" width="340" height="22" fill="#90472D" fill-opacity="0.12" stroke="#90472D" stroke-width="1.2"/>
    <path d="M90,34 V62 M140,34 V62 M190,34 V62 M240,34 V62 M290,34 V62 M340,34 V62 M380,34 V62" stroke="#90472D" stroke-width="1.3"/>
    <text x="230" y="24" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">w = ${esc(wu)}</text>
    <text x="230" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">L = ${esc(L)}</text>
    ${bmd}`, 212);
}

function timberJoistDiagram(L, s) {
  return wrapSvg(`Timber Joist Framing — Span L = ${L}, Spacing = ${s}`, `
    <polygon points="80,96 220,32 390,52 250,116" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.3"/>
    <line x1="108" y1="100" x2="248" y2="36" stroke="#90472D" stroke-width="3"/>
    <line x1="146" y1="105" x2="286" y2="41" stroke="#90472D" stroke-width="3"/>
    <line x1="184" y1="109" x2="324" y2="45" stroke="#90472D" stroke-width="3"/>
    <line x1="222" y1="114" x2="362" y2="50" stroke="#90472D" stroke-width="3"/>
    <text x="150" y="54" font-size="11" fill="#2C2C2E" font-weight="600">L = ${esc(L)}</text>
    <text x="310" y="106" font-size="11" fill="#90472D" font-weight="600">s = ${esc(s)} o.c.</text>
  `);
}

function concreteSectionDiagram(b, d) {
  return wrapSvg(`Reinforced Concrete Section — b = ${b}, d = ${d}`, `
    <rect x="175" y="18" width="110" height="96" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="2"/>
    <rect x="184" y="26" width="92" height="80" rx="4" fill="none" stroke="#90472D" stroke-width="1.5" stroke-dasharray="4 2"/>
    <circle cx="196" cy="96" r="4.5" fill="#2C2C2E"/><circle cx="230" cy="96" r="4.5" fill="#2C2C2E"/><circle cx="264" cy="96" r="4.5" fill="#2C2C2E"/>
    <text x="230" y="12" text-anchor="middle" font-size="11" fill="#2C2C2E">b = ${esc(b)}</text>
    <text x="305" y="68" font-size="11" fill="#90472D" font-weight="600">d = ${esc(d)}</text>
  `);
}

function footingDiagram(B, h, q) {
  return wrapSvg(`Spread Footing — Width B = ${B}, Thickness h = ${h}, Bearing = ${q}`, `
    <rect x="210" y="14" width="40" height="40" fill="#D5CFC9" stroke="#2C2C2E" stroke-width="1.5"/>
    <rect x="135" y="54" width="190" height="32" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="2"/>
    <path d="M145,108 V90 M180,108 V90 M215,108 V90 M250,108 V90 M285,108 V90 M315,108 V90" stroke="#90472D" stroke-width="1.4"/>
    <line x1="135" y1="108" x2="325" y2="108" stroke="#90472D" stroke-width="1.4"/>
    <text x="230" y="124" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">q = ${esc(q)} (B = ${esc(B)}, h = ${esc(h)})</text>
  `);
}

function windSnowDiagram(snow, wind) {
  return wrapSvg(`Environmental Loads — Roof Snow = ${snow}, Windward Wall = ${wind}`, `
    <polygon points="150,58 230,28 310,58 310,108 150,108" fill="#F5F0EC" stroke="#2C2C2E" stroke-width="2"/>
    <path d="M170,18 V44 M210,14 V30 M250,14 V30 M290,18 V44" stroke="#2C2C2E" stroke-width="1.4"/>
    <path d="M85,68 H142 M85,84 H142 M85,100 H142" stroke="#90472D" stroke-width="1.8"/>
    <text x="230" y="124" text-anchor="middle" font-size="11" fill="#2C2C2E">Snow: ${esc(snow)} | Windward: ${esc(wind)}</text>
  `);
}

function runoffDiagram(A, Q) {
  return wrapSvg(`Drainage Sub-Basin — Area = ${A}, Peak Runoff Q = ${Q}`, `
    <path d="M90,34 C140,18 220,24 270,56 C240,94 140,96 90,68 Z" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/>
    <line x1="270" y1="62" x2="375" y2="74" stroke="#90472D" stroke-width="4"/>
    <circle cx="375" cy="74" r="10" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.8"/>
    <text x="175" y="60" text-anchor="middle" font-size="11" fill="#2C2C2E" font-weight="600">A = ${esc(A)}</text>
    <text x="325" y="54" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">Q = ${esc(Q)}</text>
  `);
}

function channelDiagram(b, y, V) {
  return wrapSvg(`Trapezoidal Open Channel — Bottom b = ${b}, Depth y = ${y}, V = ${V}`, `
    <polyline points="85,34 155,96 305,96 375,34" stroke="#2C2C2E" stroke-width="2.5"/>
    <polygon points="116,60 344,60 305,96 155,96" fill="#90472D" fill-opacity="0.14" stroke="#90472D" stroke-width="1.5" stroke-dasharray="5 3"/>
    <text x="230" y="82" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">y = ${esc(y)} | V = ${esc(V)}</text>
    <text x="230" y="116" text-anchor="middle" font-size="11" fill="#2C2C2E">b = ${esc(b)}</text>
  `);
}

function pipeFlowDiagram(D, L, V, hTot) {
  return wrapSvg(`Pipe Flow — ID = ${D}, Length = ${L}, Velocity = ${V}, Total Head Loss = ${hTot}`, `
    <rect x="65" y="42" width="330" height="36" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="2"/>
    <path d="M95,60 H165 M205,60 H275 M315,60 H375" stroke="#90472D" stroke-width="2"/>
    <polygon points="375,55 387,60 375,65" fill="#90472D"/>
    <text x="230" y="30" text-anchor="middle" font-size="11" fill="#2C2C2E" font-weight="600">L = ${esc(L)} | ID = ${esc(D)}</text>
    <text x="230" y="102" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">V = ${esc(V)} | h_tot = ${esc(hTot)}</text>
  `);
}

function enlargementDiagram(d1, d2, dP) {
  return wrapSvg(`Enlargement & Valve — d1 = ${d1} to d2 = ${d2}, Valve Drop = ${dP}`, `
    <polygon points="75,46 175,46 215,30 385,30 385,90 215,90 175,74 75,74" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="2"/>
    <line x1="110" y1="60" x2="345" y2="60" stroke="#90472D" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="125" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">d1 = ${esc(d1)}</text>
    <text x="300" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">d2 = ${esc(d2)}</text>
    <text x="230" y="18" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">Valve dP = ${esc(dP)}</text>
  `);
}

function venturiDiagram(D, d, Q) {
  return wrapSvg(`Venturi Meter — Pipe D = ${D}, Throat d = ${d}, Flow Q = ${Q}`, `
    <polygon points="70,34 150,34 195,50 245,50 315,34 390,34 390,86 315,86 245,70 195,70 150,86 70,86" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="2"/>
    <line x1="115" y1="34" x2="115" y2="18" stroke="#90472D" stroke-width="1.5"/>
    <line x1="220" y1="50" x2="220" y2="18" stroke="#90472D" stroke-width="1.5"/>
    <text x="168" y="15" text-anchor="middle" font-size="11" fill="#90472D" font-weight="600">dP taps</text>
    <text x="230" y="108" text-anchor="middle" font-size="11" fill="#2C2C2E">D = ${esc(D)} | d = ${esc(d)} | Q = ${esc(Q)}</text>
  `);
}

function pumpDiagram(Q, H, BHP) {
  return wrapSvg(`Centrifugal Pump — Q = ${Q}, TDH = ${H}, Brake Power = ${BHP}`, `
    <circle cx="230" cy="60" r="30" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="2"/>
    <line x1="110" y1="60" x2="200" y2="60" stroke="#2C2C2E" stroke-width="4"/>
    <line x1="230" y1="30" x2="230" y2="12" stroke="#90472D" stroke-width="4"/>
    <text x="150" y="48" text-anchor="middle" font-size="11" fill="#2C2C2E">Q = ${esc(Q)}</text>
    <text x="295" y="55" font-size="11" fill="#90472D" font-weight="600">TDH = ${esc(H)}</text>
    <text x="295" y="72" font-size="11" fill="#2C2C2E" font-weight="600">BHP = ${esc(BHP)}</text>
  `);
}

function systemCurveDiagram(Qop, Hop) {
  return wrapSvg(`Pump & System Curve — Operating Point Q = ${Qop} gpm @ H = ${Hop}`, `
    <polyline points="90,22 90,104 370,104" stroke="#2C2C2E" stroke-width="1.6"/>
    <path d="M90,88 Q230,82 350,28" stroke="#2C2C2E" stroke-width="2" fill="none"/>
    <path d="M90,28 Q230,36 350,94" stroke="#90472D" stroke-width="2" fill="none"/>
    <circle cx="222" cy="60" r="5" fill="#90472D"/>
    <text x="235" y="56" font-size="11" fill="#90472D" font-weight="600">(${esc(Qop)} gpm, ${esc(Hop)})</text>
  `);
}
