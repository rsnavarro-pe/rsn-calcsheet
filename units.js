/**
 * US Customary Dimensional Analysis & Unit Engine
 * Canonical base vector: [L (in), F (lbf), T (s), A (rad)]
 */

export const DIM_ZERO = [0, 0, 0, 0];

const UNIT_DEFS = {
  // Dimensionless
  '': { scale: 1, dim: [0, 0, 0, 0], label: '' },
  '%': { scale: 0.01, dim: [0, 0, 0, 0], label: '%' },

  // Length (base: in)
  'in': { scale: 1, dim: [1, 0, 0, 0], label: 'in' },
  'ft': { scale: 12, dim: [1, 0, 0, 0], label: 'ft' },
  'yd': { scale: 36, dim: [1, 0, 0, 0], label: 'yd' },
  'mi': { scale: 63360, dim: [1, 0, 0, 0], label: 'mi' },

  // Area & Section Properties
  'in2': { scale: 1, dim: [2, 0, 0, 0], label: 'in²' },
  'in^2': { scale: 1, dim: [2, 0, 0, 0], label: 'in²' },
  'ft2': { scale: 144, dim: [2, 0, 0, 0], label: 'ft²' },
  'ft^2': { scale: 144, dim: [2, 0, 0, 0], label: 'ft²' },
  'sf': { scale: 144, dim: [2, 0, 0, 0], label: 'sf' },
  'ac': { scale: 43560 * 144, dim: [2, 0, 0, 0], label: 'ac' },
  'in3': { scale: 1, dim: [3, 0, 0, 0], label: 'in³' },
  'in^3': { scale: 1, dim: [3, 0, 0, 0], label: 'in³' },
  'ft3': { scale: 1728, dim: [3, 0, 0, 0], label: 'ft³' },
  'ft^3': { scale: 1728, dim: [3, 0, 0, 0], label: 'ft³' },
  'cf': { scale: 1728, dim: [3, 0, 0, 0], label: 'cf' },
  'in4': { scale: 1, dim: [4, 0, 0, 0], label: 'in⁴' },
  'in^4': { scale: 1, dim: [4, 0, 0, 0], label: 'in⁴' },

  // Force (base: lbf)
  'lb': { scale: 1, dim: [0, 1, 0, 0], label: 'lb' },
  'lbf': { scale: 1, dim: [0, 1, 0, 0], label: 'lbf' },
  'kip': { scale: 1000, dim: [0, 1, 0, 0], label: 'kip' },
  'kips': { scale: 1000, dim: [0, 1, 0, 0], label: 'kip' },

  // Distributed Line Load (F / L)
  'plf': { scale: 1 / 12, dim: [-1, 1, 0, 0], label: 'plf' },
  'klf': { scale: 1000 / 12, dim: [-1, 1, 0, 0], label: 'klf' },

  // Pressure / Stress / Bearing (F / L^2)
  'psi': { scale: 1, dim: [-2, 1, 0, 0], label: 'psi' },
  'ksi': { scale: 1000, dim: [-2, 1, 0, 0], label: 'ksi' },
  'psf': { scale: 1 / 144, dim: [-2, 1, 0, 0], label: 'psf' },
  'ksf': { scale: 1000 / 144, dim: [-2, 1, 0, 0], label: 'ksf' },

  // Unit Weight / Density (F / L^3)
  'pci': { scale: 1, dim: [-3, 1, 0, 0], label: 'pci' },
  'pcf': { scale: 1 / 1728, dim: [-3, 1, 0, 0], label: 'pcf' },
  'kcf': { scale: 1000 / 1728, dim: [-3, 1, 0, 0], label: 'kcf' },

  // Moment / Torque (F * L)
  'lb-in': { scale: 1, dim: [1, 1, 0, 0], label: 'lb·in' },
  'lb-ft': { scale: 12, dim: [1, 1, 0, 0], label: 'lb·ft' },
  'kip-in': { scale: 1000, dim: [1, 1, 0, 0], label: 'kip·in' },
  'k-in': { scale: 1000, dim: [1, 1, 0, 0], label: 'kip·in' },
  'kip-ft': { scale: 12000, dim: [1, 1, 0, 0], label: 'kip·ft' },
  'k-ft': { scale: 12000, dim: [1, 1, 0, 0], label: 'kip·ft' },

  // Time (base: s)
  's': { scale: 1, dim: [0, 0, 1, 0], label: 's' },
  'sec': { scale: 1, dim: [0, 0, 1, 0], label: 's' },
  'min': { scale: 60, dim: [0, 0, 1, 0], label: 'min' },
  'hr': { scale: 3600, dim: [0, 0, 1, 0], label: 'hr' },

  // Civil/Site Velocity & Flow
  'fps': { scale: 12, dim: [1, 0, -1, 0], label: 'ft/s' },
  'mph': { scale: 63360 / 3600, dim: [1, 0, -1, 0], label: 'mph' },
  'in/hr': { scale: 1 / 3600, dim: [1, 0, -1, 0], label: 'in/hr' },
  'cfs': { scale: 1728, dim: [3, 0, -1, 0], label: 'cfs' },
  'gpm': { scale: 231 / 60, dim: [3, 0, -1, 0], label: 'gpm' },
  'gal': { scale: 231, dim: [3, 0, 0, 0], label: 'gal' },
  'hp': { scale: 6600, dim: [1, 1, -1, 0], label: 'hp' },

  // Angle (base: rad)
  'rad': { scale: 1, dim: [0, 0, 0, 1], label: 'rad' },
  'deg': { scale: Math.PI / 180, dim: [0, 0, 0, 1], label: 'deg' }
};

const DEFAULT_DISPLAY = {
  '0,0,0,0': { unit: '', scale: 1 },
  '1,0,0,0': { unit: 'ft', scale: 12 },
  '2,0,0,0': { unit: 'in²', scale: 1 },
  '3,0,0,0': { unit: 'in³', scale: 1 },
  '4,0,0,0': { unit: 'in⁴', scale: 1 },
  '0,1,0,0': { unit: 'kip', scale: 1000 },
  '-1,1,0,0': { unit: 'klf', scale: 1000 / 12 },
  '-2,1,0,0': { unit: 'psi', scale: 1 },
  '-3,1,0,0': { unit: 'pcf', scale: 1 / 1728 },
  '1,1,0,0': { unit: 'kip·ft', scale: 12000 },
  '0,0,1,0': { unit: 's', scale: 1 },
  '1,0,-1,0': { unit: 'ft/s', scale: 12 },
  '3,0,-1,0': { unit: 'cfs', scale: 1728 },
  '1,1,-1,0': { unit: 'hp', scale: 6600 },
  '0,0,0,1': { unit: 'deg', scale: 180 / Math.PI }
};

export function hasUnit(name) {
  return Object.prototype.hasOwnProperty.call(UNIT_DEFS, name);
}

export function getUnit(name) {
  return UNIT_DEFS[name] || null;
}

export function sameDim(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

export function addDim(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

export function subDim(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
}

export function scaleDim(a, p) {
  return [a[0] * p, a[1] * p, a[2] * p, a[3] * p];
}

export function dimToString(d) {
  const names = ['in', 'lbf', 's', 'rad'];
  const parts = [];
  for (let i = 0; i < 4; i++) {
    if (Math.abs(d[i]) > 1e-9) {
      const exp = Number.isInteger(d[i]) ? d[i] : d[i].toFixed(2);
      parts.push(exp === 1 ? names[i] : `${names[i]}^${exp}`);
    }
  }
  return parts.length ? parts.join('·') : 'dimensionless';
}

export function parseFeetInches(str) {
  // Matches 12'-6", 12'-6 1/2", 12'-0.5"
  const m = str.match(/^(\d+(?:\.\d+)?)'-(\d+(?:\.\d+)?)(?:\s+(\d+)\/(\d+))?"$/);
  if (!m) return null;
  const feet = parseFloat(m[1]);
  let inches = parseFloat(m[2]);
  if (m[3] && m[4]) inches += parseFloat(m[3]) / parseFloat(m[4]);
  return { val: feet * 12 + inches, dim: [1, 0, 0, 0] };
}

export function formatFeetInches(inchesVal) {
  const sign = inchesVal < 0 ? '-' : '';
  const absIn = Math.abs(inchesVal);
  let feet = Math.floor(absIn / 12);
  let rem = absIn - feet * 12;
  const sixteenths = Math.round(rem * 16);
  if (sixteenths >= 192) {
    feet += 1;
    rem = 0;
  }
  const wholeIn = Math.floor(sixteenths / 16);
  let frac = sixteenths % 16;
  let fracStr = '';
  if (frac > 0) {
    let den = 16;
    while (frac % 2 === 0 && den > 1) {
      frac /= 2;
      den /= 2;
    }
    fracStr = ` ${frac}/${den}`;
  }
  return `${sign}${feet}'-${wholeIn}${fracStr}"`;
}

export function formatQuantity(val, dim, targetUnit = null) {
  if (!Number.isFinite(val)) return { text: 'NaN', unit: '' };
  if (targetUnit === 'ft-in') {
    if (!sameDim(dim, [1, 0, 0, 0])) {
      throw new Error(`Cannot format ${dimToString(dim)} as ft-in`);
    }
    return { text: formatFeetInches(val), unit: '' };
  }
  if (targetUnit) {
    const def = getUnit(targetUnit);
    if (!def) throw new Error(`Unknown unit "${targetUnit}"`);
    if (!sameDim(dim, def.dim)) {
      throw new Error(`Unit mismatch: cannot convert ${dimToString(dim)} to ${targetUnit}`);
    }
    return { text: formatNum(val / def.scale), unit: def.label };
  }
  const key = dim.map(x => (Math.abs(x) < 1e-9 ? 0 : Math.round(x * 100) / 100)).join(',');
  const def = DEFAULT_DISPLAY[key];
  if (def) {
    return { text: formatNum(val / def.scale), unit: def.unit };
  }
  return { text: formatNum(val), unit: dimToString(dim) };
}

export function formatNum(n) {
  if (Math.abs(n) < 1e-12) return '0';
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (abs >= 10) return Number(n.toFixed(2)).toString();
  if (abs >= 0.1) return Number(n.toFixed(3)).toString();
  return n.toPrecision(3);
}
