/**
 * Mechanics — Beams Formula Blocks (US Customary)
 */

export const BEAM_FORMULAS = [
  {
    id: 'beam-ss-udl',
    group: 'Mechanics — Beams',
    title: 'Simply supported beam, uniformly distributed load',
    desc: 'Reactions, max shear, midspan moment & deflection under full UDL w.',
    code: `## Simply Supported Beam — UDL
w = 1.5 klf
L = 20 ft
E = 29000 ksi
I_x = 448 in4
R_A = w * L / 2 -> kip
R_B = w * L / 2 -> kip
V_max = w * L / 2 -> kip
M_max = w * L^2 / 8 -> kip-ft
delta_max = 5 * w * L^4 / (384 * E * I_x) -> in`
  },
  {
    id: 'beam-ss-mid',
    group: 'Mechanics — Beams',
    title: 'Simply supported beam, point load at midspan',
    desc: 'Reactions, moment under point load P & midspan deflection.',
    code: `## Simply Supported Beam — Midspan Point Load
P = 12 kip
L = 20 ft
E = 29000 ksi
I_x = 448 in4
R_A = P / 2 -> kip
R_B = P / 2 -> kip
M_max = P * L / 4 -> kip-ft
delta_max = P * L^3 / (48 * E * I_x) -> in`
  },
  {
    id: 'beam-ss-ecc',
    group: 'Mechanics — Beams',
    title: 'Simply supported beam, eccentric point load',
    desc: 'Point load P at distance a from A (b = L - a): reactions, moment & max deflection.',
    code: `## Simply Supported Beam — Eccentric Point Load
P = 12 kip
L = 20 ft
a = 7 ft
b = L - a -> ft
E = 29000 ksi
I_x = 448 in4
R_A = P * b / L -> kip
R_B = P * a / L -> kip
M_max = P * a * b / L -> kip-ft
delta_P = P * a^2 * b^2 / (3 * E * I_x * L) -> in
delta_max = P * min(a, b) * (L^2 - min(a, b)^2)^(3/2) / (9 * sqrt(3) * E * I_x * L) -> in`
  },
  {
    id: 'beam-ss-two',
    group: 'Mechanics — Beams',
    title: 'Simply supported beam, two equal symmetric loads',
    desc: 'Two point loads P at distance a from each support: constant moment P*a.',
    code: `## Simply Supported Beam — Two Symmetric Point Loads
P = 8 kip
L = 20 ft
a = 6 ft
E = 29000 ksi
I_x = 448 in4
R_A = P -> kip
M_max = P * a -> kip-ft
delta_max = P * a * (3 * L^2 - 4 * a^2) / (24 * E * I_x) -> in`
  },
  {
    id: 'beam-fixed-udl',
    group: 'Mechanics — Beams',
    title: 'Fixed-ended beam, uniformly distributed load',
    desc: 'End moments w*L^2/12, midspan moment w*L^2/24 & midspan deflection.',
    code: `## Fixed-Ended Beam — UDL
w = 1.5 klf
L = 20 ft
E = 29000 ksi
I_x = 448 in4
R_A = w * L / 2 -> kip
M_end = w * L^2 / 12 -> kip-ft
M_mid = w * L^2 / 24 -> kip-ft
delta_max = w * L^4 / (384 * E * I_x) -> in`
  },
  {
    id: 'beam-propped-udl',
    group: 'Mechanics — Beams',
    title: 'Propped cantilever, uniformly distributed load',
    desc: 'Fixed at A, roller at B: reactions, fixed-end moment & max span moment.',
    code: `## Propped Cantilever — UDL
w = 1.5 klf
L = 20 ft
E = 29000 ksi
I_x = 448 in4
R_A = 5 * w * L / 8 -> kip
R_B = 3 * w * L / 8 -> kip
M_A = w * L^2 / 8 -> kip-ft
M_span = 9 * w * L^2 / 128 -> kip-ft
delta_max = w * L^4 / (185 * E * I_x) -> in`
  },
  {
    id: 'beam-cant-udl',
    group: 'Mechanics — Beams',
    title: 'Cantilever beam, uniformly distributed load',
    desc: 'Fixed-end shear w*L, moment w*L^2/2 & tip deflection.',
    code: `## Cantilever Beam — UDL
w = 1.0 klf
L = 8 ft
E = 29000 ksi
I_x = 204 in4
V_max = w * L -> kip
M_max = w * L^2 / 2 -> kip-ft
delta_tip = w * L^4 / (8 * E * I_x) -> in`
  },
  {
    id: 'beam-cant-tip',
    group: 'Mechanics — Beams',
    title: 'Cantilever beam, point load at free end',
    desc: 'Fixed-end shear P, moment P*L & tip deflection P*L^3/(3EI).',
    code: `## Cantilever Beam — Tip Point Load
P = 5 kip
L = 8 ft
E = 29000 ksi
I_x = 204 in4
V_max = P -> kip
M_max = P * L -> kip-ft
delta_tip = P * L^3 / (3 * E * I_x) -> in`
  },
  {
    id: 'beam-2span-udl',
    group: 'Mechanics — Beams',
    title: 'Two-span continuous beam, equal spans UDL',
    desc: 'Interior support moment w*L^2/8 and reactions (0.375, 1.25, 0.375)*w*L.',
    code: `## Two-Span Continuous Beam — UDL
w = 1.5 klf
L = 20 ft
R_ext = 3 * w * L / 8 -> kip
R_int = 10 * w * L / 8 -> kip
M_int = w * L^2 / 8 -> kip-ft
M_pos = 9 * w * L^2 / 128 -> kip-ft`
  },
  {
    id: 'beam-at-x',
    group: 'Mechanics — Beams',
    title: 'Moment & shear at distance x (simply supported UDL)',
    desc: 'Shear V(x) and moment M(x) at any location x along span L.',
    code: `## Shear & Moment at Distance x
w = 1.5 klf
L = 20 ft
x = 5 ft
V_x = w * (L / 2 - x) -> kip
M_x = w * x * (L - x) / 2 -> kip-ft`
  }
];
