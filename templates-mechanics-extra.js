/**
 * Additional Mechanics Beam & Frame Load Cases (US Customary, Non-Duplicated)
 */

export const MECHANICS_EXTRA_TEMPLATES = {
  mech_ss_moment: {
    title: 'MC-1: Simply Supported — Concentrated Moment',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Simply Supported)',
    body: `# Simply Supported Beam — Concentrated Moment
## Geometry & Moment
M_0 = 40 kip-ft
L = 20 ft
a = 8 ft
b = L - a -> ft
## Reactions & Peak Moments
R_A = -M_0 / L -> kip
R_B = M_0 / L -> kip
M_left = M_0 * a / L -> kip-ft
M_right = M_0 * b / L -> kip-ft`
  },

  mech_ss_triangular: {
    title: 'MC-2: Simply Supported — Triangular Load',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Linearly Varying)',
    body: `# Simply Supported Beam — Triangular Load (0 to w_max)
## Geometry & Load
w_max = 2.4 klf
L = 24 ft
E = 29000 ksi
I_x = 518 in4
## Reactions, Moment & Deflection
R_A = w_max * L / 6 -> kip
R_B = w_max * L / 3 -> kip
M_max = w_max * L^2 / (9 * sqrt(3)) -> kip-ft
delta_max = 0.00652 * w_max * L^4 / (E * I_x) -> in`
  },

  mech_ss_partial_udl: {
    title: 'MC-3: Simply Supported — Partial UDL',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Partial UDL)',
    body: `# Simply Supported Beam — Partial UDL (Length c from Left)
## Geometry & Load
w = 2.0 klf
c = 10 ft
L = 24 ft
## Reactions & Maximum Moment
R_A = w * c * (L - c / 2) / L -> kip
R_B = w * c^2 / (2 * L) -> kip
x_max = R_A / w -> ft
M_max = R_A^2 / (2 * w) -> kip-ft`
  },

  mech_cant_moment: {
    title: 'MC-4: Cantilever — End Moment',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Cantilever)',
    body: `# Cantilever Beam — Concentrated End Moment
## Geometry & Moment
M_0 = 30 kip-ft
L = 10 ft
E = 29000 ksi
I_x = 307 in4
## Tip Slope & Deflection
M_max = M_0 -> kip-ft
delta_tip = M_0 * L^2 / (2 * E * I_x) -> in`
  },

  mech_cant_tri: {
    title: 'MC-5: Cantilever — Triangular Load',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Cantilever)',
    body: `# Cantilever Beam — Triangular Load (0 at tip to w_max at wall)
## Geometry & Load
w_max = 2.0 klf
L = 10 ft
E = 29000 ksi
I_x = 307 in4
## Shear, Moment & Tip Deflection
V_max = w_max * L / 2 -> kip
M_max = w_max * L^2 / 6 -> kip-ft
delta_tip = w_max * L^4 / (30 * E * I_x) -> in`
  },

  mech_propped_point: {
    title: 'MC-6: Propped Cantilever — Midspan Point Load',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Propped Cantilever)',
    body: `# Propped Cantilever — Point Load at Midspan
## Geometry & Load
P = 16 kip
L = 20 ft
E = 29000 ksi
I_x = 448 in4
## Reactions, Moments & Deflection
R_A = 11 * P / 16 -> kip
R_B = 5 * P / 16 -> kip
M_A = 3 * P * L / 16 -> kip-ft
M_mid = 5 * P * L / 32 -> kip-ft
delta_mid = 7 * P * L^3 / (768 * E * I_x) -> in`
  },

  mech_fixed_point: {
    title: 'MC-7: Fixed-Ended Beam — Midspan Point Load',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Fixed-Ended)',
    body: `# Fixed-Ended Beam — Point Load at Midspan
## Geometry & Load
P = 20 kip
L = 20 ft
E = 29000 ksi
I_x = 448 in4
## Reactions, Moments & Deflection
R_A = P / 2 -> kip
M_end = P * L / 8 -> kip-ft
M_mid = P * L / 8 -> kip-ft
delta_max = P * L^3 / (192 * E * I_x) -> in`
  },

  mech_fixed_moment: {
    title: 'MC-8: Fixed-Ended Beam — Concentrated Moment',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Fixed-Ended)',
    body: `# Fixed-Ended Beam — Concentrated Moment at Distance a
## Geometry & Moment
M_0 = 40 kip-ft
L = 20 ft
a = 8 ft
b = L - a -> ft
## Fixed-End Moments & Shear
M_A = M_0 * b * (2 * a - b) / L^2 -> kip-ft
M_B = M_0 * a * (2 * b - a) / L^2 -> kip-ft
R_A = 6 * M_0 * a * b / L^3 -> kip`
  },

  mech_overhang_udl: {
    title: 'MC-9: Beam with Overhang — Full UDL',
    discipline: 'Mechanics',
    codeRef: 'Beam Formulas (Overhang)',
    body: `# Simply Supported Beam with Cantilever Overhang (UDL)
## Geometry & Load
w = 1.5 klf
L = 20 ft
a_ovh = 6 ft
## Reactions & Controlling Moments
R_B = w * (L + a_ovh)^2 / (2 * L) -> kip
R_A = w * (L + a_ovh) - R_B -> kip
M_neg = w * a_ovh^2 / 2 -> kip-ft
M_pos = R_A^2 / (2 * w) -> kip-ft`
  },

  mech_3span_udl: {
    title: 'MC-10: Three-Span Continuous Beam — UDL',
    discipline: 'Mechanics',
    codeRef: 'Continuous Beam (Equal Spans)',
    body: `# Three-Span Continuous Beam — Equal Spans (UDL)
## Geometry & Load
w = 1.5 klf
L = 20 ft
## Reactions & Support/Span Moments
R_ext = 0.40 * w * L -> kip
R_int = 1.10 * w * L -> kip
M_int = 0.10 * w * L^2 -> kip-ft
M_ext_span = 0.08 * w * L^2 -> kip-ft`
  },

  mech_portal_frame: {
    title: 'MC-11: Portal Frame — Lateral Load',
    discipline: 'Mechanics',
    codeRef: 'Frame Analysis (Pinned Bases)',
    body: `# Symmetric Portal Frame (Pinned Bases, Lateral Load H)
## Geometry & Lateral Load
H_lat = 10 kip
h_col = 14 ft
L_beam = 24 ft
## Base Reactions & Knee Moment
H_A = H_lat / 2 -> kip
V_B = H_lat * h_col / L_beam -> kip
M_knee = H_lat * h_col / 2 -> kip-ft`
  }
};
