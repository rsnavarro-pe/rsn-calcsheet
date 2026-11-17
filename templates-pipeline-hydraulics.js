/**
 * Pipeline Hydraulics Repository — Unique Calculators (US Customary, Non-Duplicated)
 */

export const PIPELINE_HYDRAULICS_TEMPLATES = {
  ph_gravity_sewer: {
    title: 'PH-1: Circular Gravity Sewer (Manning Full/Half)',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'ASCE / WEF Gravity Sewer',
    body: `# Circular Gravity Sewer (Manning's Equation)
## Pipe Geometry & Slope
D = 18 in -> ft
S = 0.005
n = 0.013
## Full-Pipe Hydraulic Properties
A_full = pi * D^2 / 4 -> ft2
R_full = D / 4 -> ft
V_full = (1.486 / n) * (R_full / 1 ft)^(2/3) * S^(1/2) * 1 fps -> fps
Q_full = V_full * A_full -> cfs
check(2.0 fps, V_full, "Minimum Cleansing Velocity (V_full >= 2.0 ft/s)")`
  },

  ph_box_culvert: {
    title: 'PH-2: Concrete Box Culvert (FHWA HDS-5)',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'FHWA HDS-5 Box Culvert',
    body: `# Precast Concrete Box Culvert (Outlet Control)
## Barrel Geometry & Flow
B_span = 6 ft
D_rise = 4 ft
L = 80 ft
n = 0.012
K_e = 0.5
Q = 120 cfs
## Friction & Entrance Head Loss
A_box = B_span * D_rise -> ft2
P_box = 2 * (B_span + D_rise) -> ft
R_h = A_box / P_box -> ft
V = Q / A_box -> fps
g = 32.174 fps / 1 s
H_f = (29 * n^2 * (L / 1 ft) / (R_h / 1 ft)^1.333) * (V^2 / (2 * g)) -> ft
H_e = K_e * (V^2 / (2 * g)) -> ft
H_total = H_f + H_e + V^2 / (2 * g) -> ft
check(H_total, 4.0 ft, "Total Barrel Head Loss (H <= 4.0 ft)")`
  },

  ph_hyd_jump: {
    title: 'PH-3: Hydraulic Jump & Stilling Basin (Belanger)',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'USBR Stilling Basin / Belanger',
    body: `# Hydraulic Jump & Energy Dissipation
## Upstream Supercritical Flow
y_1 = 1.2 ft
V_1 = 22 fps
g = 32.174 fps / 1 s
## Froude Number & Sequent Depth (y_2)
Fr_1 = V_1 / sqrt(g * y_1)
y_2 = (y_1 / 2) * (sqrt(1 + 8 * Fr_1^2) - 1) -> ft
dE = (y_2 - y_1)^3 / (4 * y_1 * y_2) -> ft
L_basin = 6.0 * y_2 -> ft
check(1.7, Fr_1, "Supercritical Regime Check (Fr_1 >= 1.7)")`
  },

  ph_thrust_block: {
    title: 'PH-4: Thrust Block & Bearing Sizing',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'AWWA M9 / M11 Thrust Restraint',
    body: `# Horizontal Bend Thrust Block Sizing
## Pipe, Test Pressure & Soil Bearing
D_od = 12.75 in
P_test = 200 psi
theta = 45 deg
q_allow = 2500 psf
## Resultant Thrust & Required Bearing Area
A_pipe = pi * D_od^2 / 4 -> in2
T_thrust = 2 * P_test * A_pipe * sin(theta / 2) -> kip
A_req = T_thrust / q_allow -> ft2
A_prov = 12 ft2
check(A_req, A_prov, "Soil Bearing Area (A_req / A_prov)")`
  },

  ph_nat_gas_weymouth: {
    title: 'PH-5: Natural Gas Line (Weymouth Equation)',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'Crane TP-410 / Weymouth Gas',
    body: `# Natural Gas Transmission (Weymouth)
## Pipeline & Gas Inputs
P_1 = 400 psi
P_2 = 320 psi
D_in = 8.071
L_mi = 15
SG_g = 0.60
T_R = 520
## Weymouth Standard Flow (SCFD)
Q_scfd = 433.5 * (520 / 14.7) * sqrt((P_1 / 1 psi)^2 - (P_2 / 1 psi)^2) * D_in^(8/3) / sqrt(SG_g * L_mi * T_R)
Q_mmscfd = Q_scfd / 1000000`
  },

  ph_choked_gas: {
    title: 'PH-6: Compressible Gas Sonic Choked Flow',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'Crane TP-410 Ex. 16',
    body: `# Compressible Gas & Sonic Choked Limit
## Gas & Upstream Pressure
P_1 = 150 psi
P_2 = 60 psi
k_gas = 1.40
## Critical Pressure Ratio & Choked Pressure
r_c = (2 / (k_gas + 1))^(k_gas / (k_gas - 1))
P_choked = r_c * P_1 -> psi
check(P_choked, P_2, "Unchoked Check (P_2 >= P_choked)")`
  },

  ph_control_valve_cav: {
    title: 'PH-7: Control Valve Sizing & Cavitation (F_L)',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'ISA S75.01 / Crane Ex. 20',
    body: `# Liquid Control Valve Sizing & Choked Cavitation
## Operating Conditions (Water at 68 F)
Q = 450 gpm
P_1 = 120 psi
P_2 = 45 psi
P_v = 0.34 psi
F_L = 0.85
SG = 1.0
## Choked Pressure Drop & Required Cv
dP_actual = P_1 - P_2 -> psi
dP_choked = F_L^2 * (P_1 - 0.96 * P_v) -> psi
dP_eff = min(dP_actual, dP_choked) -> psi
Cv_req = (Q / 1 gpm) / sqrt((dP_eff / 1 psi) / SG)
check(dP_actual, dP_choked, "Cavitation Screening (dP_actual / dP_choked)")`
  },

  ph_asme_wall: {
    title: 'PH-8: ASME B31.8 / B31.4 Pipe Wall (Barlow)',
    discipline: 'Pipeline Hydraulics',
    codeRef: 'ASME B31.8 / B31.4 Barlow',
    body: `# Pipeline Wall Thickness (Barlow's Formula)
## Design Pressure, Pipe OD & Grade X52
P_design = 1000 psi
D_od = 12.75 in
SMYS = 52000 psi
F_loc = 0.72
E_joint = 1.0
T_derate = 1.0
CA = 0.0625 in
## Minimum Required & Nominal Wall Thickness
t_press = (P_design * D_od) / (2 * SMYS * F_loc * E_joint * T_derate) -> in
t_req = t_press + CA -> in
t_nom = 0.375 in
check(t_req, t_nom, "Wall Thickness Check (t_req / t_nom)")`
  }
};
