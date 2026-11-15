/**
 * Flow-of-Water Hydraulics Templates (US Customary — ASME B36.10M, Crane TP-410, Hazen-Williams)
 */

export const HYDRAULICS_TEMPLATES = {
  wf_pipe: {
    title: 'H-1: Pipe Flow (Darcy-Weisbach & Hazen-Williams)',
    discipline: 'Hydraulics',
    codeRef: 'ASME B36.10M / Darcy-Weisbach & Hazen-Williams',
    body: `# Municipal Water Pipe Flow (6" Sch 40 Steel)
// Steady incompressible water at 68 F (gamma = 62.32 pcf, g = 32.174 ft/s^2).

## 1. Pipe Geometry & Flow
D = pipe("6in", "id") -> in
L = 500 ft
Q = 350 gpm
A_pipe = pi * D^2 / 4 -> ft2
V = Q / A_pipe -> fps
g = 32.174 fps / 1 s

## 2. Darcy-Weisbach Major & Minor Losses
// Friction factor f = 0.01790 (Swamee-Jain / Colebrook at Re = 182,400)
f = 0.01790
K_sum = 3.15
h_f_DW = f * (L / D) * (V^2 / (2 * g)) -> ft
h_minor = K_sum * (V^2 / (2 * g)) -> ft
h_tot_DW = h_f_DW + h_minor -> ft
dP_DW = h_tot_DW * 62.32 pcf -> psi

## 3. Hazen-Williams Comparison (C = 120)
C_hw = 120
// US Customary form: hf = 4.53 * L_ft * (Q_gpm / C)^1.852 / D_in^4.87 (psi)
dP_f_HW = 4.52 * (L / 1 ft) * ((Q / 1 gpm) / C_hw)^1.852 / (D / 1 in)^4.87 * 1 psi -> psi
h_f_HW = dP_f_HW / 62.32 pcf -> ft
h_tot_HW = h_f_HW + h_minor -> ft
check(V, 8.0 fps, "Pipe Velocity Screening (V <= 8.0 ft/s)")`
  },

  wf_valves: {
    title: 'H-2: Valves, Fittings & Enlargement (Cv / K)',
    discipline: 'Hydraulics',
    codeRef: 'Crane TP-410 / Minor Losses',
    body: `# Valves, Fittings & Sudden/Gradual Enlargement
// Minor loss evaluation using resistance coefficient K and valve Cv.

## 1. Upstream & Downstream Pipe Sizes
d_1 = pipe("4in", "id") -> in
d_2 = pipe("6in", "id") -> in
Q = 350 gpm
g = 32.174 fps / 1 s
V_2 = Q / (pi * d_2^2 / 4) -> fps

## 2. Enlargement & Fitting Loss (K-Method)
K_enlarge = 0.7275
h_L_K = K_enlarge * V_2^2 / (2 * g) -> ft
dP_K = h_L_K * 62.32 pcf -> psi

## 3. Control Valve Pressure Drop (Cv-Method)
Cv = 600
SG = 1.0
dP_valve = ((Q / 1 gpm) / Cv)^2 * SG * 1 psi -> psi
h_L_valve = dP_valve / 62.32 pcf -> ft
check(dP_valve, 5.0 psi, "Control Valve Drop (dP <= 5.0 psi)")`
  },

  wf_meter: {
    title: 'H-3: Venturi Differential-Pressure Flow Meter',
    discipline: 'Hydraulics',
    codeRef: 'ISO 5167 / ASME MFC-3M (US Customary)',
    body: `# Venturi Flow Meter Evaluation
// Throat diameter d = 3.50 in in 6" Sch 40 pipe (D = 6.065 in).

## 1. Meter Geometry & Beta Ratio
D = pipe("6in", "id") -> in
d_throat = 3.50 in
beta = d_throat / D
C_d = 0.98
g = 32.174 fps / 1 s

## 2. Differential Pressure & Flow Recovery
dP = 0.8481 psi
gamma_w = 62.32 pcf
dH = dP / gamma_w -> ft
A_t = pi * d_throat^2 / 4 -> ft2
Q_meter = C_d * A_t * sqrt(2 * g * dH / (1 - beta^4)) -> gpm
check(beta, 0.75, "Venturi Beta Ratio Screening (beta <= 0.75)")
check(Q_meter, 400 gpm, "Meter Capacity Check (Q <= 400 gpm)")`
  },

  wf_pump: {
    title: 'H-4: Centrifugal Pump Power & NPSHa',
    discipline: 'Hydraulics',
    codeRef: 'HI / Centrifugal Pump Sizing (US Customary)',
    body: `# Centrifugal Pump Brake Horsepower & NPSHa
// Municipal water transfer duty point: 350 gpm @ 65 ft TDH.

## 1. Duty Point & Brake Horsepower
Q = 350 gpm
H_tdh = 65 ft
eta = 0.75
SG = 1.0
gamma_w = 62.32 pcf
WHP = Q * H_tdh * gamma_w -> hp
BHP = WHP / eta -> hp
check(BHP, 10 hp, "Motor Sizing Check (BHP <= 10 hp)")

## 2. Net Positive Suction Head Available (NPSHa)
P_atm = 14.696 psi
P_vap = 0.339 psi
H_suction = 5.0 ft
h_f_suction = 2.0 ft
NPSHa = (P_atm - P_vap) / gamma_w + H_suction - h_f_suction -> ft
NPSHr_req = 12.0 ft
check(NPSHr_req, NPSHa, "Cavitation Margin (NPSHr <= NPSHa)")`
  },

  wf_system: {
    title: 'H-5: Pump & System Curve Operating Point',
    discipline: 'Hydraulics',
    codeRef: 'System Hydraulics (H = H_static + R*Q^2)',
    body: `# Pump & System Curve Operating Point
// System curve H_sys = H_static + R*Q^2 vs. manufacturer pump curve.

## 1. System Resistance Curve (from 350 gpm @ 65 ft, H_static = 25 ft)
H_static = 25 ft
Q_ref = 350 gpm
H_ref = 65 ft
R_sys = (H_ref - H_static) / (Q_ref / 1 gpm)^2 -> ft

## 2. Operating Point Verification (Q_op = 365.29 gpm)
Q_op = 365.29 gpm
H_sys_op = H_static + R_sys * (Q_op / 1 gpm)^2 -> ft
// Fitted quadratic pump curve: H_pump = 95 - 0.04143*Q - 0.00008449*Q^2
H_pump_op = (95 - 0.04143 * (Q_op / 1 gpm) - 0.00008449 * (Q_op / 1 gpm)^2) * 1 ft -> ft
residual = abs(H_pump_op - H_sys_op) -> ft
check(residual, 0.5 ft, "Curve Intersection Residual (|H_pump - H_sys| <= 0.5 ft)")`
  }
};
