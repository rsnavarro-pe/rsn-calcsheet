/**
 * US Structural & Civil/Site Reference Databases
 * All values stored in canonical US units (in, lbf, s) or returned with their US unit.
 */

export const AISC_W_SHAPES = {
  'W8x18':  { A: 5.26, d: 8.14, bf: 5.25, tw: 0.230, tf: 0.330, Ix: 61.9,  Sx: 15.2, Zx: 17.0, rx: 3.43, ry: 1.23 },
  'W10x22': { A: 6.49, d: 10.2, bf: 5.75, tw: 0.240, tf: 0.360, Ix: 118,   Sx: 23.2, Zx: 26.0, rx: 4.27, ry: 1.33 },
  'W12x26': { A: 7.65, d: 12.2, bf: 6.49, tw: 0.230, tf: 0.380, Ix: 204,   Sx: 33.4, Zx: 37.2, rx: 5.17, ry: 1.51 },
  'W12x40': { A: 11.7, d: 11.9, bf: 8.01, tw: 0.295, tf: 0.515, Ix: 307,   Sx: 51.5, Zx: 57.0, rx: 5.13, ry: 1.94 },
  'W14x22': { A: 6.49, d: 13.7, bf: 5.00, tw: 0.230, tf: 0.335, Ix: 199,   Sx: 29.0, Zx: 33.2, rx: 5.54, ry: 1.04 },
  'W14x30': { A: 8.85, d: 13.8, bf: 6.73, tw: 0.270, tf: 0.385, Ix: 291,   Sx: 42.0, Zx: 47.3, rx: 5.73, ry: 1.49 },
  'W16x36': { A: 10.6, d: 15.9, bf: 6.99, tw: 0.295, tf: 0.430, Ix: 448,   Sx: 56.5, Zx: 64.0, rx: 6.51, ry: 1.52 },
  'W16x40': { A: 11.8, d: 16.0, bf: 7.00, tw: 0.305, tf: 0.505, Ix: 518,   Sx: 64.7, Zx: 73.0, rx: 6.63, ry: 1.57 },
  'W18x35': { A: 10.3, d: 17.7, bf: 6.00, tw: 0.300, tf: 0.425, Ix: 510,   Sx: 57.6, Zx: 66.5, rx: 7.04, ry: 1.22 },
  'W18x50': { A: 14.7, d: 18.0, bf: 7.50, tw: 0.355, tf: 0.570, Ix: 800,   Sx: 88.9, Zx: 101,  rx: 7.38, ry: 1.65 },
  'W21x44': { A: 13.0, d: 20.7, bf: 6.50, tw: 0.350, tf: 0.450, Ix: 843,   Sx: 81.6, Zx: 95.4, rx: 8.06, ry: 1.26 },
  'W21x62': { A: 18.3, d: 21.0, bf: 8.24, tw: 0.400, tf: 0.615, Ix: 1330,  Sx: 127,  Zx: 144,  rx: 8.54, ry: 1.77 },
  'W24x55': { A: 16.2, d: 23.6, bf: 7.01, tw: 0.395, tf: 0.505, Ix: 1350,  Sx: 114,  Zx: 134,  rx: 9.11, ry: 1.34 },
  'W24x84': { A: 24.7, d: 24.1, bf: 9.02, tw: 0.470, tf: 0.770, Ix: 2370,  Sx: 196,  Zx: 224,  rx: 9.79, ry: 1.95 }
};

export const NDS_LUMBER = {
  '2x4':  { b: 1.5, d: 3.5,  A: 5.25,  S: 3.063,  I: 5.359 },
  '2x6':  { b: 1.5, d: 5.5,  A: 8.25,  S: 7.563,  I: 20.80 },
  '2x8':  { b: 1.5, d: 7.25, A: 10.88, S: 13.14,  I: 47.63 },
  '2x10': { b: 1.5, d: 9.25, A: 13.88, S: 21.39,  I: 98.93 },
  '2x12': { b: 1.5, d: 11.25,A: 16.88, S: 31.64,  I: 178.0 },
  '4x4':  { b: 3.5, d: 3.5,  A: 12.25, S: 7.146,  I: 12.51 },
  '4x6':  { b: 3.5, d: 5.5,  A: 19.25, S: 17.65,  I: 48.53 },
  '4x8':  { b: 3.5, d: 7.25, A: 25.38, S: 30.66,  I: 111.1 },
  '4x10': { b: 3.5, d: 9.25, A: 32.38, S: 49.91,  I: 230.8 },
  '4x12': { b: 3.5, d: 11.25,A: 39.38, S: 73.83,  I: 415.3 },
  '6x8':  { b: 5.5, d: 7.5,  A: 41.25, S: 51.56,  I: 193.4 },
  '6x10': { b: 5.5, d: 9.5,  A: 52.25, S: 82.73,  I: 393.0 },
  '6x12': { b: 5.5, d: 11.5, A: 63.25, S: 121.2,  I: 697.1 }
};

export const ACI_REBAR = {
  '#3':  { db: 0.375, area: 0.11, weight: 0.376 },
  '#4':  { db: 0.500, area: 0.20, weight: 0.668 },
  '#5':  { db: 0.625, area: 0.31, weight: 1.043 },
  '#6':  { db: 0.750, area: 0.44, weight: 1.502 },
  '#7':  { db: 0.875, area: 0.60, weight: 2.044 },
  '#8':  { db: 1.000, area: 0.79, weight: 2.670 },
  '#9':  { db: 1.128, area: 1.00, weight: 3.400 },
  '#10': { db: 1.270, area: 1.27, weight: 4.303 },
  '#11': { db: 1.410, area: 1.56, weight: 5.313 }
};

const PROP_DIMS = {
  A: [2, 0, 0, 0],
  d: [1, 0, 0, 0],
  b: [1, 0, 0, 0],
  bf: [1, 0, 0, 0],
  tw: [1, 0, 0, 0],
  tf: [1, 0, 0, 0],
  Ix: [4, 0, 0, 0],
  I: [4, 0, 0, 0],
  Sx: [3, 0, 0, 0],
  Zx: [3, 0, 0, 0],
  S: [3, 0, 0, 0],
  rx: [1, 0, 0, 0],
  ry: [1, 0, 0, 0],
  db: [1, 0, 0, 0],
  area: [2, 0, 0, 0],
  id: [1, 0, 0, 0],
  od: [1, 0, 0, 0],
  weight: [-1, 1, 0, 0] // plf -> scale 1/12
};

export const PIPE_SCH40 = {
  '2in':  { od: 2.375, id: 2.067 },
  '3in':  { od: 3.500, id: 3.068 },
  '4in':  { od: 4.500, id: 4.026 },
  '6in':  { od: 6.625, id: 6.065 },
  '8in':  { od: 8.625, id: 7.981 },
  '10in': { od: 10.75, id: 10.02 },
  '12in': { od: 12.75, id: 11.938 }
};

export function lookupSection(table, key, prop) {
  const row = table[key];
  if (!row) throw new Error(`Unknown section "${key}"`);
  if (row[prop] === undefined) throw new Error(`Unknown property "${prop}" for "${key}"`);
  const dim = PROP_DIMS[prop] || [0, 0, 0, 0];
  let val = row[prop];
  if (prop === 'weight') val = val / 12; // plf to lbf/in
  return { val, dim };
}
