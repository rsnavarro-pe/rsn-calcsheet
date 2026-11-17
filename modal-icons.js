/**
 * Function-Specific Isometric & Engineering SVG Thumbnails for Sheet Library Modal
 */

const A = 'viewBox="0 0 120 76" class="mod-svg" fill="none" stroke-linecap="round" stroke-linejoin="round"';

export const MODAL_ICONS = {
  blank: `<svg ${A}><polygon points="22,52 64,24 98,38 56,66" fill="#F5F0EC" stroke="#2C2C2E" stroke-width="1.4"/><line x1="42" y1="48" x2="72" y2="32" stroke="#90472D" stroke-width="2.5"/><polygon points="34,42 52,32 48,46" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.1"/></svg>`,

  steel: `<svg ${A}><line x1="18" y1="46" x2="82" y2="46" stroke="#2C2C2E" stroke-width="3"/><polygon points="18,48 13,56 23,56" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.2"/><polygon points="82,48 77,56 87,56" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.2"/><path d="M22,30 H78 M28,30 V45 M40,30 V45 M52,30 V45 M64,30 V45 M76,30 V45" stroke="#90472D" stroke-width="1.3"/><path d="M95,24 H107 M101,24 V52 M95,52 H107" stroke="#2C2C2E" stroke-width="2.5"/></svg>`,

  timber: `<svg ${A}><polygon points="16,52 62,24 104,34 58,64" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.2"/><line x1="26" y1="54" x2="72" y2="26" stroke="#90472D" stroke-width="2.5"/><line x1="38" y1="57" x2="84" y2="29" stroke="#90472D" stroke-width="2.5"/><line x1="50" y1="60" x2="96" y2="32" stroke="#90472D" stroke-width="2.5"/></svg>`,

  concrete: `<svg ${A}><polygon points="22,42 78,20 98,28 42,50" fill="#E6E1DC" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="22,42 42,50 42,64 22,56" fill="#D5CFC9" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="42,50 98,28 98,42 42,64" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.3"/><line x1="46" y1="56" x2="94" y2="37" stroke="#90472D" stroke-width="2"/></svg>`,

  footing: `<svg ${A}><polygon points="24,46 60,32 96,46 60,60" fill="#E6E1DC" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="24,46 60,60 60,68 24,54" fill="#D5CFC9" stroke="#2C2C2E" stroke-width="1.3"/><polygon points="60,60 96,46 96,54 60,68" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.3"/><rect x="52" y="16" width="16" height="24" fill="#90472D" fill-opacity="0.2" stroke="#90472D" stroke-width="1.5"/></svg>`,

  wind: `<svg ${A}><polygon points="48,38 74,24 100,38 100,62 48,62" fill="#F5F0EC" stroke="#2C2C2E" stroke-width="1.5"/><path d="M16,38 H42 M12,48 H42 M18,58 H42" stroke="#90472D" stroke-width="1.8"/><path d="M62,14 V26 M74,10 V20 M86,14 V26" stroke="#2C2C2E" stroke-width="1.4"/></svg>`,

  runoff: `<svg ${A}><path d="M16,32 C34,16 62,18 76,38 C64,56 32,58 16,44 Z" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.4"/><line x1="76" y1="40" x2="98" y2="48" stroke="#90472D" stroke-width="3"/><circle cx="98" cy="48" r="7" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.5"/></svg>`,

  channel: `<svg ${A}><polyline points="16,28 34,54 86,54 104,28" stroke="#2C2C2E" stroke-width="2.2"/><polygon points="24,38 96,38 86,54 34,54" fill="#90472D" fill-opacity="0.18" stroke="#90472D" stroke-width="1.4" stroke-dasharray="3 2"/></svg>`,

  pipe: `<svg ${A}><rect x="18" y="28" width="84" height="22" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><path d="M28,39 H54 M66,39 H90" stroke="#90472D" stroke-width="2"/><polygon points="90,35 97,39 90,43" fill="#90472D"/><line x1="22" y1="18" x2="98" y2="24" stroke="#6E6E73" stroke-width="1.2" stroke-dasharray="3 2"/></svg>`,

  valve: `<svg ${A}><polygon points="16,34 42,34 56,24 104,24 104,54 56,54 42,44 16,44" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.5"/><line x1="68" y1="14" x2="68" y2="39" stroke="#90472D" stroke-width="2"/><line x1="58" y1="14" x2="78" y2="14" stroke="#90472D" stroke-width="2.5"/></svg>`,

  meter: `<svg ${A}><polygon points="16,24 38,24 52,33 68,33 84,24 104,24 104,54 84,54 68,45 52,45 38,54 16,54" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.5"/><path d="M30,24 V14 H60 V33" stroke="#90472D" stroke-width="1.5"/></svg>`,

  pump: `<svg ${A}><circle cx="62" cy="42" r="18" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.8"/><circle cx="62" cy="42" r="6" fill="#90472D" fill-opacity="0.3" stroke="#90472D" stroke-width="1.4"/><line x1="20" y1="42" x2="44" y2="42" stroke="#2C2C2E" stroke-width="3.5"/><line x1="62" y1="24" x2="62" y2="10" stroke="#90472D" stroke-width="3.5"/></svg>`,

  curve: `<svg ${A}><polyline points="22,14 22,60 102,60" stroke="#2C2C2E" stroke-width="1.5"/><path d="M22,52 Q62,48 96,18" stroke="#2C2C2E" stroke-width="1.8"/><path d="M22,20 Q62,26 96,54" stroke="#90472D" stroke-width="1.8"/><circle cx="60" cy="37" r="3.5" fill="#90472D"/></svg>`,

  reynolds: `<svg ${A}><rect x="18" y="22" width="84" height="32" fill="#FAF8F6" stroke="#2C2C2E" stroke-width="1.6"/><path d="M26,38 Q56,28 92,38" stroke="#90472D" stroke-width="1.8"/><path d="M26,31 C45,27 65,35 90,31 M26,45 C45,49 65,41 90,45" stroke="#6E6E73" stroke-width="1.3"/></svg>`,

  steam: `<svg ${A}><rect x="16" y="30" width="88" height="22" rx="3" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.6"/><circle cx="60" cy="18" r="9" fill="#FFFFFF" stroke="#90472D" stroke-width="1.5"/><line x1="60" y1="18" x2="65" y2="13" stroke="#90472D" stroke-width="1.5"/><line x1="60" y1="27" x2="60" y2="30" stroke="#2C2C2E" stroke-width="1.5"/></svg>`,

  network: `<svg ${A}><line x1="14" y1="38" x2="34" y2="38" stroke="#2C2C2E" stroke-width="2.5"/><path d="M34,38 L46,22 H74 L86,38 L74,54 H46 Z" stroke="#90472D" stroke-width="2"/><line x1="86" y1="38" x2="106" y2="38" stroke="#2C2C2E" stroke-width="2.5"/></svg>`,

  surge: `<svg ${A}><polyline points="16,58 16,14" stroke="#6E6E73" stroke-width="1.2"/><line x1="16" y1="58" x2="104" y2="58" stroke="#6E6E73" stroke-width="1.2"/><polyline points="16,48 40,48 48,18 60,44 74,30 88,40 102,38" stroke="#90472D" stroke-width="2"/></svg>`,

  wetwell: `<svg ${A}><polyline points="26,16 26,62 94,62 94,16" stroke="#2C2C2E" stroke-width="2"/><rect x="28" y="34" width="64" height="26" fill="#90472D" fill-opacity="0.14"/><rect x="40" y="42" width="12" height="16" fill="#2C2C2E"/><rect x="68" y="42" width="12" height="16" fill="#2C2C2E"/><path d="M46,42 V14 M74,42 V14" stroke="#90472D" stroke-width="2"/></svg>`,

  orifice: `<svg ${A}><rect x="18" y="26" width="84" height="24" fill="#EFEAE6" stroke="#2C2C2E" stroke-width="1.5"/><line x1="58" y1="22" x2="58" y2="34" stroke="#90472D" stroke-width="3"/><line x1="58" y1="42" x2="58" y2="54" stroke="#90472D" stroke-width="3"/><path d="M26,38 H94" stroke="#90472D" stroke-width="1.6" stroke-dasharray="4 2"/></svg>`,

  vfd: `<svg ${A}><polyline points="22,14 22,60 102,60" stroke="#2C2C2E" stroke-width="1.5"/><path d="M22,20 Q62,24 96,46" stroke="#2C2C2E" stroke-width="1.8"/><path d="M22,34 Q54,38 80,54" stroke="#90472D" stroke-width="1.8" stroke-dasharray="3 2"/></svg>`,
  circpipe: `<svg ${A}><circle cx="60" cy="38" r="24" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><circle cx="60" cy="38" r="14" fill="#FFFFFF" stroke="#2C2C2E" stroke-width="1.4"/><line x1="28" y1="38" x2="92" y2="38" stroke="#6E6E73" stroke-width="1" stroke-dasharray="4 2"/><line x1="60" y1="10" x2="60" y2="66" stroke="#6E6E73" stroke-width="1" stroke-dasharray="4 2"/></svg>`,
  georect: `<svg ${A}><rect x="34" y="14" width="52" height="48" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><line x1="24" y1="38" x2="96" y2="38" stroke="#6E6E73" stroke-width="1" stroke-dasharray="4 2"/><line x1="60" y1="8" x2="60" y2="68" stroke="#6E6E73" stroke-width="1" stroke-dasharray="4 2"/></svg>`,
  geotri: `<svg ${A}><polygon points="30,60 90,60 30,16" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><circle cx="50" cy="45" r="2.5" fill="#90472D"/></svg>`,
  circle: `<svg ${A}><circle cx="60" cy="38" r="24" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><line x1="60" y1="38" x2="84" y2="38" stroke="#90472D" stroke-width="1.8"/></svg>`,
  trapezoid: `<svg ${A}><polygon points="24,58 96,58 80,18 40,18" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><line x1="40" y1="18" x2="40" y2="58" stroke="#90472D" stroke-width="1.3" stroke-dasharray="3 2"/></svg>`,
  polygon: `<svg ${A}><polygon points="60,12 84,26 84,52 60,66 36,52 36,26" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/></svg>`,
  ellipse: `<svg ${A}><ellipse cx="60" cy="38" rx="34" ry="20" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/><line x1="60" y1="38" x2="94" y2="38" stroke="#90472D" stroke-width="1.5"/></svg>`,
  parabola: `<svg ${A}><path d="M24,60 Q60,0 96,60 Z" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/></svg>`,
  sector: `<svg ${A}><path d="M60,58 L36,22 A42,42 0 0,1 84,22 Z" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/></svg>`,
  segment: `<svg ${A}><path d="M28,48 A38,38 0 0,1 92,48 Z" fill="#F2E4DD" stroke="#2C2C2E" stroke-width="1.6"/></svg>`
};
