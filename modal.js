/**
 * Module Picker Modal — Open CalcSheet Studio style (US-Only Modules)
 */
import { TEMPLATES } from './templates.js';

const SVG_ATTR = 'viewBox="0 0 120 76" class="mod-svg" fill="none" stroke-linecap="round" stroke-linejoin="round"';

const ICONS = {
  blank: `<svg ${SVG_ATTR}><polygon points="22,52 64,24 98,38 56,66" fill="#F5F0EC" stroke="#2C2C2E" stroke-width="1.4"/><line x1="42" y1="48" x2="72" y2="32" stroke="#90472D" stroke-width="2.5"/><polygon points="34,42 52,32 48,46" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.1"/></svg>`,
  steel: `<svg ${SVG_ATTR}><line x1="18" y1="46" x2="82" y2="46" stroke="#2C2C2E" stroke-width="3"/><polygon points="18,48 13,56 23,56" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.2"/><polygon points="82,48 77,56 87,56" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.2"/><path d="M22,30 H78 M28,30 V45 M40,30 V45 M52,30 V45 M64,30 V45 M76,30 V45" stroke="#90472D" stroke-width="1.3"/><path d="M95,24 H107 M101,24 V52 M95,52 H107" stroke="#2C2C2E" stroke-width="2.5"/></svg>`,
  timber: `<svg ${SVG_ATTR}><polygon points="16,52 62,24 104,34 58,64" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.2"/><line x1="26" y1="54" x2="72" y2="26" stroke="#90472D" stroke-width="2.5"/><line x1="38" y1="57" x2="84" y2="29" stroke="#90472D" stroke-width="2.5"/><line x1="50" y1="60" x2="96" y2="32" stroke="#90472D" stroke-width="2.5"/></svg>`,
  concrete: `<svg ${SVG_ATTR}><polygon points="22,42 78,20 98,28 42,50" fill="#E6E1DC" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="22,42 42,50 42,64 22,56" fill="#D5CFC9" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="42,50 98,28 98,42 42,64" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.3"/><line x1="46" y1="56" x2="94" y2="37" stroke="#90472D" stroke-width="2"/></svg>`,
  footing: `<svg ${SVG_ATTR}><polygon points="24,46 60,32 96,46 60,60" fill="#E6E1DC" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="24,46 60,60 60,68 24,54" fill="#D5CFC9" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="60,60 96,46 96,54 60,68" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.3"/><rect x="52" y="16" width="16" height="24" fill="#90472D" fill-opacity="0.2" stroke="#90472D" stroke-width="1.5"/></svg>`,
  wind: `<svg ${SVG_ATTR}><path d="M22,28 H68 C74,28 74,20 68,20 C64,20 63,23 63,24" stroke="#2C2C2E" stroke-width="1.8"/><path d="M18,38 H82 C88,38 88,46 82,46 C78,46 77,43 77,42" stroke="#90472D" stroke-width="1.8"/><polygon points="50,58 76,46 102,58" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.3"/></svg>`,
  civil: `<svg ${SVG_ATTR}><polygon points="18,46 34,46 44,58 76,58 86,46 102,46" stroke="#2C2C2E" stroke-width="1.8"/><path d="M39,52 H81" stroke="#90472D" stroke-width="2" stroke-dasharray="4 3"/><path d="M28,26 C38,20 48,32 58,26 C68,20 78,32 88,26" stroke="#2C2C2E" stroke-width="1.5"/></svg>`
};

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
      { key: 'rational_runoff', title: 'Rational storm runoff (HEC-22)', desc: 'Composite C, Q = CiA & 18" RCP check', badge: 'published', icon: 'civil' },
      { key: 'mannings_channel', title: "Open-channel Manning's (HEC-15)", desc: 'Trapezoidal swale velocity & capacity', badge: 'published', icon: 'civil' }
    ]
  },
  {
    group: 'HYDRAULICS — FLOW OF WATER',
    items: [
      { key: 'wf_pipe', title: 'Pipe flow (Darcy & Hazen-Williams)', desc: 'ASME Sch 40 ID, head loss & velocity', badge: 'published', icon: 'civil' },
      { key: 'wf_valves', title: 'Valves, fittings & enlargement', desc: 'Crane TP-410 K-method & valve Cv drop', badge: 'published', icon: 'civil' },
      { key: 'wf_meter', title: 'Venturi differential flow meter', desc: 'Beta ratio, dP head & flow recovery', badge: 'published', icon: 'civil' },
      { key: 'wf_pump', title: 'Centrifugal pump power & NPSHa', desc: 'BHP, water HP & cavitation margin', badge: 'published', icon: 'civil' },
      { key: 'wf_system', title: 'Pump & system curve operating point', desc: 'H = H_static + R*Q^2 intersection', badge: 'published', icon: 'civil' }
    ]
  },
  {
    group: 'CRANE TP-410 MODULES',
    items: [
      { key: 'crane_pipe', title: 'CT-1: Pipe flow & Reynolds number', desc: 'Crane 7-1: Re, smooth-pipe f & dP', badge: 'published', icon: 'civil' },
      { key: 'crane_valve_k', title: 'CT-2: Valve & fitting K-factor / Cv', desc: 'Crane 7-2: K = 891*d^4/Cv^2 & L_eq', badge: 'published', icon: 'civil' },
      { key: 'crane_pump', title: 'CT-3: Pump sizing & BHP (400 ft lift)', desc: 'Crane 7-15: TDH, WHP & BHP', badge: 'published', icon: 'civil' },
      { key: 'crane_gas_steam', title: 'CT-4: Steam & gas pipeline drop', desc: 'Crane 7-10: Mass-flow Darcy dP', badge: 'published', icon: 'civil' }
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
        <div class="mod-thumb">${ICONS[item.icon] || ICONS.blank}</div>
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
