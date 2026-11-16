/**
 * Formula Library: Mechanics & Classical Mechanics (US Customary)
 */
import { BEAM_FORMULAS } from './formula-beams.js';

export const FORMULA_GROUPS = [
  'Mechanics — Beams',
  'Mechanics — Section Properties',
  'Mechanics — Stress & Strain',
  'Mechanics — Buckling & Vibration',
  'Classical Mechanics'
];

export const FORMULAS = [
  ...BEAM_FORMULAS,

  // Mechanics — Section Properties
  {
    id: 'sec-rect',
    group: 'Mechanics — Section Properties',
    title: 'Rectangular section',
    desc: 'Area A, section modulus S_x, moment of inertia I_x & radius of gyration r_x.',
    code: `## Rectangular Section Properties
b = 5.5 in
h = 11.25 in
A = b * h -> in2
S_x = b * h^2 / 6 -> in3
I_x = b * h^3 / 12 -> in4
r_x = sqrt(I_x / A) -> in`
  },
  {
    id: 'sec-circ',
    group: 'Mechanics — Section Properties',
    title: 'Solid circular section',
    desc: 'Area A, moment of inertia I, section modulus S & polar moment J.',
    code: `## Solid Circular Section
d = 6 in
A = pi * d^2 / 4 -> in2
I_c = pi * d^4 / 64 -> in4
S_c = pi * d^3 / 32 -> in3
J_c = pi * d^4 / 32 -> in4`
  },
  {
    id: 'sec-hss-round',
    group: 'Mechanics — Section Properties',
    title: 'Circular hollow section (pipe / round HSS)',
    desc: 'Area, I, S & J from outside diameter D and wall thickness t.',
    code: `## Circular Hollow Section
D = 8.625 in
t = 0.322 in
d_i = D - 2 * t -> in
A = pi * (D^2 - d_i^2) / 4 -> in2
I_c = pi * (D^4 - d_i^4) / 64 -> in4
S_c = 2 * I_c / D -> in3`
  },
  {
    id: 'sec-i',
    group: 'Mechanics — Section Properties',
    title: 'Doubly symmetric I-section',
    desc: 'Exact A, I_x, S_x & Z_x from flange/web dimensions.',
    code: `## Doubly Symmetric I-Section
d = 14 in
b_f = 6.75 in
t_f = 0.385 in
t_w = 0.270 in
h_w = d - 2 * t_f -> in
A = 2 * b_f * t_f + h_w * t_w -> in2
I_x = (b_f * d^3 - (b_f - t_w) * h_w^3) / 12 -> in4
S_x = 2 * I_x / d -> in3
Z_x = b_f * t_f * (d - t_f) + t_w * h_w^2 / 4 -> in3`
  },
  {
    id: 'sec-parallel-axis',
    group: 'Mechanics — Section Properties',
    title: 'Parallel axis theorem (Steiner)',
    desc: 'Transferred moment of inertia I = I_0 + A * d^2.',
    code: `## Parallel Axis Theorem
I_0 = 199 in4
A = 6.49 in2
d_off = 4.5 in
I_tot = I_0 + A * d_off^2 -> in4`
  },

  // Mechanics — Stress & Strain
  {
    id: 'str-axial',
    group: 'Mechanics — Stress & Strain',
    title: 'Axial stress & elongation (Hooke)',
    desc: 'Normal stress sigma = P/A and axial deformation delta = P*L/(A*E).',
    code: `## Axial Stress & Elongation
P = 45 kip
A = 6.49 in2
L = 12 ft
E = 29000 ksi
sigma = P / A -> ksi
delta = P * L / (A * E) -> in`
  },
  {
    id: 'str-bending',
    group: 'Mechanics — Stress & Strain',
    title: 'Bending stress & combined axial + bending',
    desc: 'Extreme-fiber flexural stress M/S and combined P/A + M/S.',
    code: `## Combined Axial & Bending Stress
P = 30 kip
M = 45 kip-ft
A = 8.85 in2
S_x = 42.0 in3
sigma_a = P / A -> ksi
sigma_b = M / S_x -> ksi
sigma_max = sigma_a + sigma_b -> ksi`
  },
  {
    id: 'str-torsion',
    group: 'Mechanics — Stress & Strain',
    title: 'Torsion of a solid circular shaft',
    desc: 'Max shear stress tau = T*r/J and angle of twist theta = T*L/(G*J).',
    code: `## Torsion of Solid Circular Shaft
T = 25 kip-in
d = 3.0 in
L = 6 ft
G = 11200 ksi
J = pi * d^4 / 32 -> in4
tau_max = T * (d / 2) / J -> ksi
theta = T * L / (G * J) * 1 rad -> deg`
  },
  {
    id: 'str-von-mises',
    group: 'Mechanics — Stress & Strain',
    title: 'Von Mises equivalent stress (plane stress)',
    desc: 'Equivalent stress sigma_v = sqrt(sx^2 - sx*sy + sy^2 + 3*tau^2).',
    code: `## Von Mises Equivalent Stress
sigma_x = 18 ksi
sigma_y = -6 ksi
tau_xy = 8 ksi
sigma_vm = sqrt(sigma_x^2 - sigma_x * sigma_y + sigma_y^2 + 3 * tau_xy^2) -> ksi`
  },

  // Mechanics — Buckling & Vibration
  {
    id: 'stab-euler',
    group: 'Mechanics — Buckling & Vibration',
    title: 'Euler buckling load & slenderness',
    desc: 'Critical load P_cr = pi^2*E*I/(K*L)^2, slenderness KL/r & critical stress.',
    code: `## Euler Buckling Load & Stress
E = 29000 ksi
I_min = 19.3 in4
A = 6.49 in2
L = 14 ft
K = 1.0
r = sqrt(I_min / A) -> in
KL_r = K * L / r
P_cr = pi^2 * E * I_min / (K * L)^2 -> kip
sigma_cr = P_cr / A -> ksi`
  },
  {
    id: 'stab-freq-ss',
    group: 'Mechanics — Buckling & Vibration',
    title: 'Natural frequency, simply supported beam',
    desc: 'Fundamental frequency f_1 = (pi / 2L^2) * sqrt(E*I / m_bar).',
    code: `## Natural Frequency — Simply Supported Beam
E = 29000 ksi
I_x = 448 in4
L = 24 ft
w_line = 36 plf
g = 32.174 fps / 1 s
// Mass per unit length m_bar = w / g
f_1 = (pi / (2 * L^2)) * sqrt(E * I_x * g / w_line) -> Hz`
  },

  // Classical Mechanics
  {
    id: 'cm-mohr',
    group: 'Classical Mechanics',
    title: "Mohr's circle — principal stresses & max shear",
    desc: 'Center sigma_avg, radius R, principal stresses sigma_1, sigma_2 & tau_max.',
    code: `## Mohr's Circle (Plane Stress)
sigma_x = 16 ksi
sigma_y = -4 ksi
tau_xy = 7 ksi
sigma_avg = (sigma_x + sigma_y) / 2 -> ksi
R_mohr = sqrt(((sigma_x - sigma_y) / 2)^2 + tau_xy^2) -> ksi
sigma_1 = sigma_avg + R_mohr -> ksi
sigma_2 = sigma_avg - R_mohr -> ksi
tau_max = R_mohr -> ksi`
  },
  {
    id: 'cm-jourawski',
    group: 'Classical Mechanics',
    title: 'Jourawski shear flow & shear stress (VQ / Ib)',
    desc: 'Shear flow q = V*Q/I and web shear stress tau = q/b.',
    code: `## Jourawski Shear Stress (V * Q / (I * b))
V = 35 kip
Q_stat = 32.0 in3
I_x = 448 in4
b_web = 0.295 in
q_flow = V * Q_stat / I_x -> klf
tau_web = V * Q_stat / (I_x * b_web) -> ksi`
  },
  {
    id: 'cm-virtual-work',
    group: 'Classical Mechanics',
    title: 'Virtual work — beam midspan deflection',
    desc: 'Unit-load method integral for simply supported beam under UDL.',
    code: `## Virtual Work — Midspan Deflection (Simply Supported UDL)
w = 1.2 klf
L = 22 ft
E = 29000 ksi
I_x = 307 in4
M_real_mid = w * L^2 / 8 -> kip-ft
m_virt_mid = L / 4 -> ft
// Parabolic M(x) with triangular m(x): integral = (5/12) * M_real * m_virt * L / (EI)
delta_vw = (5 / 12) * M_real_mid * m_virt_mid * L / (E * I_x) -> in`
  }
];
