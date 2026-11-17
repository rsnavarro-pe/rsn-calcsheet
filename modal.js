/**
 * Module Picker Modal — Open CalcSheet Studio style (US-Only Modules)
 */
import { MODAL_ICONS } from './modal-icons.js';

const MODULE_GROUPS = [
  {
    group: 'BLANK SHEETS',
    items: [
      { key: 'blank', title: 'Blank calc sheet', desc: 'US Customary line-by-line sheet', badge: 'US Units', icon: 'blank' }
    ]
  },
  {
    group: 'GENERAL & STEEL',
    items: [
      { key: 'steel_beam', title: 'Steel floor beam (AISC 360-22)', desc: 'LRFD flexure, web shear, L/360 deflection', badge: 'published', icon: 'steel' }
    ]
  },
  {
    group: 'TIMBER',
    items: [
      { key: 'wood_joist', title: 'Timber floor joist (NDS 2024)', desc: 'ASD bending, horizontal shear, L/360', badge: 'published', icon: 'timber' }
    ]
  },
  {
    group: 'CONCRETE & FOUNDATION',
    items: [
      { key: 'concrete_beam', title: 'Reinforced concrete beam (ACI 318)', desc: 'Flexure & #3 stirrup shear strength', badge: 'published', icon: 'concrete' },
      { key: 'footing', title: 'Spread footing (IBC / ACI 318)', desc: 'Allowable bearing & one-way shear', badge: 'published', icon: 'footing' }
    ]
  },
  {
    group: 'ENVIRONMENTAL LOADS',
    items: [
      { key: 'wind_snow', title: 'Wind & snow loads (ASCE 7-22)', desc: 'Flat-roof snow & MWFRS wind pressure', badge: 'published', icon: 'wind' }
    ]
  },
  {
    group: 'CIVIL / SITE',
    items: [
      { key: 'rational_runoff', title: 'Rational storm runoff (HEC-22)', desc: 'Composite C, Q = CiA & 18" RCP check', badge: 'published', icon: 'runoff' },
      { key: 'mannings_channel', title: "Open-channel Manning's (HEC-15)", desc: 'Trapezoidal swale velocity & capacity', badge: 'published', icon: 'channel' }
    ]
  },
  {
    group: 'HYDRAULICS — FLOW OF WATER',
    items: [
      { key: 'wf_pipe', title: 'Pipe flow (Darcy & Hazen-Williams)', desc: 'ASME Sch 40 ID, head loss & velocity', badge: 'published', icon: 'pipe' },
      { key: 'wf_valves', title: 'Valves, fittings & enlargement', desc: 'Crane TP-410 K-method & valve Cv drop', badge: 'published', icon: 'valve' },
      { key: 'wf_meter', title: 'Venturi differential flow meter', desc: 'Beta ratio, dP head & flow recovery', badge: 'published', icon: 'meter' },
      { key: 'wf_pump', title: 'Centrifugal pump power & NPSHa', desc: 'BHP, water HP & cavitation margin', badge: 'published', icon: 'pump' },
      { key: 'wf_system', title: 'Pump & system curve operating point', desc: 'H = H_static + R*Q^2 intersection', badge: 'published', icon: 'curve' }
    ]
  },
  {
    group: 'CRANE TP-410 MODULES',
    items: [
      { key: 'crane_pipe', title: 'CT-1: Pipe flow & Reynolds number', desc: 'Crane 7-1: Re, smooth-pipe f & dP', badge: 'published', icon: 'reynolds' },
      { key: 'crane_valve_k', title: 'CT-2: Valve & fitting K-factor / Cv', desc: 'Crane 7-2: K = 891*d^4/Cv^2 & L_eq', badge: 'published', icon: 'valve' },
      { key: 'crane_pump', title: 'CT-3: Pump sizing & BHP (400 ft lift)', desc: 'Crane 7-15: TDH, WHP & BHP', badge: 'published', icon: 'pump' },
      { key: 'crane_gas_steam', title: 'CT-4: Steam & gas pipeline drop', desc: 'Crane 7-10: Mass-flow Darcy dP', badge: 'published', icon: 'steam' }
    ]
  },
  {
    group: 'PIPE SYSTEMS (NETWORKS & SURGE)',
    items: [
      { key: 'ps_series_parallel', title: 'PS-1: Series & parallel pipe network', desc: 'Branch flow split & combined head loss', badge: 'published', icon: 'network' },
      { key: 'ps_surge', title: 'PS-2: Water hammer & surge screening', desc: 'Wave speed a, Joukowsky dP & peak P', badge: 'published', icon: 'surge' },
      { key: 'ps_station', title: 'PS-3: Lift station wet well & firm cap', desc: 'Firm capacity & active drawdown volume', badge: 'published', icon: 'wetwell' },
      { key: 'ps_bypass', title: 'PS-4: Minimum-flow bypass orifice', desc: 'Recirculation orifice sizing (Cd, dH)', badge: 'published', icon: 'orifice' },
      { key: 'ps_vfd', title: 'PS-5: VFD affinity & energy savings', desc: 'Speed ratio r, P ~ r^3 & annual kWh', badge: 'published', icon: 'vfd' }
    ]
  },
  {
    group: 'GEOMETRICAL PROPERTIES',
    items: [
      { key: 'geo_pipe', title: 'G-1: Circular pipe section', desc: 'Area, centroid, I_y, I_x, I_t, W_t & r', badge: 'published', icon: 'circpipe' },
      { key: 'geo_rect', title: 'G-2: Rectangular section', desc: 'Area, perimeter, I_y, I_z, W_y, W_z & r', badge: 'published', icon: 'georect' },
      { key: 'geo_right_tri', title: 'G-3: Right triangle section', desc: 'Area, centroid (b/3, h/3), I & r', badge: 'published', icon: 'geotri' },
      { key: 'geo_ellipse_pipe', title: 'G-4: Elliptical pipe section', desc: 'Area, I_y, I_z & radii of gyration', badge: 'published', icon: 'circpipe' },
      { key: 'geo_equi_tri', title: 'G-5: Equilateral triangle section', desc: 'Height, area, centroid, I & r', badge: 'published', icon: 'geotri' }
    ]
  },
  {
    group: 'AREAS (15 CALCULATORS)',
    items: [
      { key: 'area_circle', title: 'A-1: Circle', desc: 'Area & circumference', badge: 'published', icon: 'circle' },
      { key: 'area_triangle', title: 'A-2: Triangle (3 sides)', desc: "Heron's formula & perimeter", badge: 'published', icon: 'geotri' },
      { key: 'area_triangle_h', title: 'A-3: Triangle (height)', desc: 'Base & height area', badge: 'published', icon: 'geotri' },
      { key: 'area_right_tri', title: 'A-4: Right triangle', desc: 'Hypotenuse, area & perimeter', badge: 'published', icon: 'geotri' },
      { key: 'area_equi_tri', title: 'A-5: Equilateral triangle', desc: 'Height, area & perimeter', badge: 'published', icon: 'geotri' },
      { key: 'area_rect', title: 'A-6: Rectangle', desc: 'Area, perimeter & diagonal', badge: 'published', icon: 'georect' },
      { key: 'area_square', title: 'A-7: Square', desc: 'Area, perimeter & diagonal', badge: 'published', icon: 'georect' },
      { key: 'area_trapezoid', title: 'A-8: Trapezoid', desc: 'Midsegment & area', badge: 'published', icon: 'trapezoid' },
      { key: 'area_polygon', title: 'A-9: Regular polygon', desc: 'Apothem, circumradius & area', badge: 'published', icon: 'polygon' },
      { key: 'area_ellipse', title: 'A-10: Ellipse', desc: 'Area & Ramanujan perimeter', badge: 'published', icon: 'ellipse' },
      { key: 'area_parabola', title: 'A-11: Parabola', desc: 'Parabolic segment area', badge: 'published', icon: 'parabola' },
      { key: 'area_sector_chord', title: 'A-12: Sector (chord)', desc: 'Angle, arc & sector area', badge: 'published', icon: 'sector' },
      { key: 'area_sector_angle', title: 'A-13: Sector (angle)', desc: 'Arc, chord & sector area', badge: 'published', icon: 'sector' },
      { key: 'area_segment_chord', title: 'A-14: Segment (chord)', desc: 'Angle, rise & segment area', badge: 'published', icon: 'segment' },
      { key: 'area_segment_angle', title: 'A-15: Segment (angle)', desc: 'Rise, chord & segment area', badge: 'published', icon: 'segment' }
    ]
  }
];

let selectedKey = 'steel_beam';

export function openModuleModal(onAdd) {
  const modal = document.getElementById('module-modal');
  const searchInput = document.getElementById('module-search');
  searchInput.value = '';
  selectedKey = 'steel_beam';
  modal.classList.remove('hidden');
  renderModuleGrid('');
  searchInput.focus();

  searchInput.oninput = (e) => renderModuleGrid(e.target.value);
  document.getElementById('modal-close-btn').onclick = close;
  document.getElementById('modal-cancel-btn').onclick = close;
  document.getElementById('modal-add-btn').onclick = () => {
    onAdd(selectedKey);
    close();
  };
  modal.onclick = (e) => { if (e.target === modal) close(); };

  function close() {
    modal.classList.add('hidden');
  }
}

function renderModuleGrid(query) {
  const q = query.trim().toLowerCase();
  const body = document.getElementById('module-modal-body');
  body.innerHTML = '';

  for (const grp of MODULE_GROUPS) {
    const matches = grp.items.filter(it =>
      !q || it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q) || grp.group.toLowerCase().includes(q)
    );
    if (!matches.length) continue;

    const sec = document.createElement('div');
    sec.className = 'mod-group';
    sec.innerHTML = `<div class="mod-group-title">${grp.group} <span>${matches.length}</span></div>`;

    const grid = document.createElement('div');
    grid.className = 'mod-grid';

    for (const item of matches) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `mod-card ${item.key === selectedKey ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="mod-thumb">${MODAL_ICONS[item.icon] || MODAL_ICONS.blank}</div>
        <div class="mod-title"><span class="mod-dot"></span>${item.title}</div>
        <div class="mod-meta"><span class="mod-desc">${item.desc}</span><span class="mod-badge">${item.badge}</span></div>
      `;
      card.onclick = () => {
        selectedKey = item.key;
        renderModuleGrid(document.getElementById('module-search').value);
      };
      card.ondblclick = () => {
        selectedKey = item.key;
        document.getElementById('modal-add-btn').click();
      };
      grid.appendChild(card);
    }
    sec.appendChild(grid);
    body.appendChild(sec);
  }
}
