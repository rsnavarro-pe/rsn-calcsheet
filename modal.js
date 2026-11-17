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
      { key: 'footing', title: 'Spread footing (IBC / ACI 318)', desc: 'Allowable bearing & one-way shear', badge: 'published', icon: 'footing' },
      { key: 'sd_rc_column', title: 'SD-1: RC column axial & bending', desc: 'ACI 318-19 tied column Pu / phi*Pn', badge: 'published', icon: 'concrete' },
      { key: 'sd_punching_shear', title: 'SD-2: Two-way punching shear', desc: 'ACI 318-19 §22.6 interior column b_0', badge: 'published', icon: 'footing' },
      { key: 'sd_rc_slab_sls', title: 'SD-3: RC serviceability (I_eff)', desc: 'ACI 318 Ch. 24 cracking & deflection', badge: 'published', icon: 'concrete' },
      { key: 'sd_shear_wall', title: 'SD-5: RC shear wall in-plane', desc: 'ACI 318-19 Ch. 11 wall shear Vu/phi*Vn', badge: 'published', icon: 'concrete' }
    ]
  },
  {
    group: 'ENVIRONMENTAL LOADS',
    items: [
      { key: 'wind_snow', title: 'Wind & snow loads (ASCE 7-22)', desc: 'Flat-roof snow & MWFRS wind pressure', badge: 'published', icon: 'wind' },
      { key: 'sd_seismic_base', title: 'SD-4: Seismic base shear (ELF)', desc: 'ASCE 7-22 Ch. 12.8 Cs & V_base', badge: 'published', icon: 'wind' },
      { key: 'sd_snow_drift', title: 'SD-6: Roof snow drift (ASCE 7-22)', desc: 'Step/parapet drift height & surcharge', badge: 'published', icon: 'wind' }
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
    group: 'PIPELINE HYDRAULICS (UNIQUE MODULES)',
    items: [
      { key: 'ph_gravity_sewer', title: 'PH-1: Circular gravity sewer', desc: "Manning's full-pipe V & Q", badge: 'published', icon: 'pipe' },
      { key: 'ph_box_culvert', title: 'PH-2: Concrete box culvert (HDS-5)', desc: 'Barrel friction & entrance head loss', badge: 'published', icon: 'channel' },
      { key: 'ph_hyd_jump', title: 'PH-3: Hydraulic jump (Belanger)', desc: 'Fr_1, sequent depth y_2 & basin L', badge: 'published', icon: 'channel' },
      { key: 'ph_thrust_block', title: 'PH-4: Thrust block & bearing', desc: 'Bend resultant thrust & soil area', badge: 'published', icon: 'footing' },
      { key: 'ph_nat_gas_weymouth', title: 'PH-5: Natural gas (Weymouth)', desc: 'High-pressure gas SCFD & MMSCFD', badge: 'published', icon: 'steam' },
      { key: 'ph_choked_gas', title: 'PH-6: Sonic choked gas flow', desc: 'Critical pressure ratio & P_choked', badge: 'published', icon: 'steam' },
      { key: 'ph_control_valve_cav', title: 'PH-7: Control valve & cavitation', desc: 'Choked dP (F_L) & required Cv', badge: 'published', icon: 'valve' },
      { key: 'ph_asme_wall', title: 'PH-8: ASME B31.8 / B31.4 wall', desc: "Barlow's formula & corrosion allow.", badge: 'published', icon: 'circpipe' }
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
  },
  {
    group: 'MATHEMATICS (VOLUMES & ALGEBRA)',
    items: [
      { key: 'math_sphere', title: 'M-1: Sphere', desc: 'Volume & surface area', badge: 'published', icon: 'circle' },
      { key: 'math_cylinder', title: 'M-2: Cylinder', desc: 'Volume & lateral/total surface area', badge: 'published', icon: 'concrete' },
      { key: 'math_cone', title: 'M-3: Cone', desc: 'Slant height, volume & surface area', badge: 'published', icon: 'geotri' },
      { key: 'math_frustum', title: 'M-4: Conical frustum', desc: 'Slant height & frustum volume', badge: 'published', icon: 'trapezoid' },
      { key: 'math_prism', title: 'M-5: Rectangular prism', desc: 'Volume, surface area & diagonal', badge: 'published', icon: 'concrete' },
      { key: 'math_quadratic', title: 'M-6: Quadratic equation', desc: 'Discriminant, roots x1/x2 & vertex', badge: 'published', icon: 'parabola' },
      { key: 'math_linear_2x2', title: 'M-7: 2x2 linear system', desc: "Cramer's rule determinant, x & y", badge: 'published', icon: 'curve' },
      { key: 'math_trig_sas', title: 'M-8: Triangle solver (SAS)', desc: 'Law of cosines, area & angles', badge: 'published', icon: 'geotri' }
    ]
  },
  {
    group: 'MECHANICS — BEAMS & FRAMES',
    items: [
      { key: 'mech_ss_moment', title: 'MC-1: Simply supported — moment', desc: 'Concentrated moment M_0 at a', badge: 'published', icon: 'steel' },
      { key: 'mech_ss_triangular', title: 'MC-2: Simply supported — triangular', desc: 'Linearly varying load 0 to w_max', badge: 'published', icon: 'steel' },
      { key: 'mech_ss_partial_udl', title: 'MC-3: Simply supported — partial UDL', desc: 'Partial UDL w over length c', badge: 'published', icon: 'steel' },
      { key: 'mech_cant_moment', title: 'MC-4: Cantilever — end moment', desc: 'Tip moment M_0 & deflection', badge: 'published', icon: 'steel' },
      { key: 'mech_cant_tri', title: 'MC-5: Cantilever — triangular load', desc: 'Linear load w_max & tip deflection', badge: 'published', icon: 'steel' },
      { key: 'mech_propped_point', title: 'MC-6: Propped cantilever — point load', desc: 'Midspan P, M_A & M_mid', badge: 'published', icon: 'steel' },
      { key: 'mech_fixed_point', title: 'MC-7: Fixed-ended — point load', desc: 'Midspan P, M_end & M_mid', badge: 'published', icon: 'steel' },
      { key: 'mech_fixed_moment', title: 'MC-8: Fixed-ended — moment', desc: 'Concentrated moment M_0 at a', badge: 'published', icon: 'steel' },
      { key: 'mech_overhang_udl', title: 'MC-9: Beam with overhang — UDL', desc: 'Cantilever overhang M_neg & M_pos', badge: 'published', icon: 'steel' },
      { key: 'mech_3span_udl', title: 'MC-10: Three-span continuous — UDL', desc: 'Equal spans reactions & moments', badge: 'published', icon: 'steel' },
      { key: 'mech_portal_frame', title: 'MC-11: Portal frame — lateral load', desc: 'Pinned-base reactions & knee moment', badge: 'published', icon: 'steel' }
    ]
  },
  {
    group: 'SPREADSHEETS (SCHEDULES & FINANCE)',
    items: [
      { key: 'sp:beam_schedule', title: 'SP-1: Steel beam schedule', desc: 'Multi-beam Mu, phi*Mn & DCR grid', badge: 'published', icon: 'steel' },
      { key: 'sp:storm_schedule', title: 'SP-2: Storm drain pipe schedule', desc: 'Rational Q = CiA & Qcap grid', badge: 'published', icon: 'runoff' },
      { key: 'sp:interest_schedule', title: 'SP-3: Simple & compound interest', desc: 'Annual, quarterly, monthly & daily FV', badge: 'published', icon: 'curve' },
      { key: 'sp:loan_schedule', title: 'SP-4: Loan & equipment PMT', desc: 'Amortized monthly payment schedule', badge: 'published', icon: 'curve' },
      { key: 'sp:npv_schedule', title: 'SP-5: Project cash flow & NPV', desc: 'Discounted present worth & viability', badge: 'published', icon: 'curve' }
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
