/**
 * Structural Design Calculators (ACI 318-19 & ASCE 7-22 — US Customary)
 */

export const STRUCTURAL_DESIGN_TEMPLATES = {
  sd_rc_column: {
    title: 'SD-1: RC Column Axial & Bending (ACI 318-19)',
    discipline: 'Structural',
    codeRef: 'ACI 318-19 Ch. 22.4',
    body: `# Tied Reinforced Concrete Column (ACI 318-19)
## Section & Materials (16" x 16", 8-#8 bars)
b = 16 in
h = 16 in
A_g = b * h -> in2
f_c = 4000 psi
f_y = 60 ksi
A_st = 8 * rebar("#8", "area") -> in2
## Factored Loads & Nominal Axial Capacity
P_u = 320 kip
M_u = 95 kip-ft
P_0 = 0.85 * f_c * (A_g - A_st) + f_y * A_st -> kip
phi_Pn_max = 0.80 * 0.65 * P_0 -> kip
check(P_u, phi_Pn_max, "Axial Compression (Pu / phi*Pn,max)")`
  },

  sd_punching_shear: {
    title: 'SD-2: Two-Way Punching Shear (ACI 318-19 §22.6)',
    discipline: 'Structural',
    codeRef: 'ACI 318-19 §22.6.5',
    body: `# Interior Column Two-Way Punching Shear
## Slab & Column Geometry
c_1 = 18 in
c_2 = 18 in
d = 7.5 in
f_c = 4000 psi
## Critical Perimeter & Factored Shear
b_0 = 2 * (c_1 + d) + 2 * (c_2 + d) -> in
V_u = 115 kip
phi_Vc = 0.75 * 4 * sqrt(4000) * 1 psi * b_0 * d -> kip
check(V_u, phi_Vc, "Two-Way Punching Shear (Vu / phi*Vc)")`
  },

  sd_rc_slab_sls: {
    title: 'SD-3: RC Serviceability & Effective Inertia (ACI 318)',
    discipline: 'Structural',
    codeRef: 'ACI 318-19 Ch. 24.2',
    body: `# RC Beam Serviceability (Cracking & Deflection)
## Section & Material Properties
b = 12 in
h = 20 in
L = 22 ft
f_c = 4000 psi
E_c = 57000 * sqrt(4000) * 1 psi -> ksi
I_g = b * h^3 / 12 -> in4
f_r = 7.5 * sqrt(4000) * 1 psi -> psi
M_cr = f_r * I_g / (h / 2) -> kip-ft
## Service Moment & Effective Inertia (Branson)
M_a = 65 kip-ft
I_cr = 3200 in4
ratio = M_cr / M_a
I_eff = min(I_g, ratio^3 * I_g + (1 - ratio^3) * I_cr) -> in4
w_serv = 1.4 klf
delta_inst = 5 * w_serv * L^4 / (384 * E_c * I_eff) -> in
check(delta_inst, L / 360, "Immediate Deflection (L/360)")`
  },

  sd_seismic_base: {
    title: 'SD-4: Seismic Base Shear — ELF (ASCE 7-22)',
    discipline: 'Structural',
    codeRef: 'ASCE 7-22 Ch. 12.8',
    body: `# Equivalent Lateral Force Seismic Base Shear
## Site & Structural Parameters
S_DS = 0.65
S_D1 = 0.32
R = 5.0
I_e = 1.0
T = 0.55
W_seis = 2400 kip
## Seismic Response Coefficient Cs
C_s_calc = S_DS / (R / I_e)
C_s_max = S_D1 / (T * (R / I_e))
C_s_min = max(0.044 * S_DS * I_e, 0.01)
C_s = max(C_s_min, min(C_s_calc, C_s_max))
## Base Shear
V_base = C_s * W_seis -> kip
check(V_base, 400 kip, "Base Shear vs. 400 kip Foundation Capacity")`
  },

  sd_shear_wall: {
    title: 'SD-5: RC Shear Wall In-Plane Shear (ACI 318-19)',
    discipline: 'Structural',
    codeRef: 'ACI 318-19 Ch. 11.5',
    body: `# Reinforced Concrete Shear Wall (In-Plane)
## Wall Geometry & Materials
l_w = 14 ft
t_w = 10 in
f_c = 4000 psi
f_y = 60 ksi
rho_t = 0.0025
## Factored Shear & Capacity
V_u = 185 kip
A_cv = l_w * t_w -> in2
phi_Vn = 0.75 * A_cv * (2 * sqrt(4000) * 1 psi + rho_t * f_y) -> kip
check(V_u, phi_Vn, "In-Plane Wall Shear (Vu / phi*Vn)")`
  },

  sd_snow_drift: {
    title: 'SD-6: Roof Snow Drift at Step/Parapet (ASCE 7-22)',
    discipline: 'Structural',
    codeRef: 'ASCE 7-22 §7.7–7.8',
    body: `# Roof Snow Drift (ASCE 7-22)
## Ground Snow & Roof Step Geometry
p_g = 35 psf
gamma_s = min(30 pcf, 0.13 * (p_g / 1 psf) * 1 pcf + 14 pcf) -> pcf
l_u = 80 ft
h_step = 4.5 ft
h_b = 25 psf / gamma_s -> ft
h_c = h_step - h_b -> ft
## Drift Height & Surcharge Load
h_d = min(h_c, 0.43 * (l_u / 1 ft)^(1/3) * ((p_g / 1 psf) + 10)^(1/4) * 1 ft - 1.5 ft) -> ft
p_d = h_d * gamma_s -> psf
check(p_d, 80 psf, "Drift Surcharge vs. 80 psf Roof Capacity")`
  }
};
