/**
 * Crane TP-410 Four-Module Calculator Suite (US Customary — Chapter 7 Basis)
 */

export const CRANE_TEMPLATES = {
  crane_pipe: {
    title: 'CT-1: Pipe Flow & Reynolds Number (Crane 7-1)',
    discipline: 'Crane TP-410',
    codeRef: 'Crane TP-410 Ch. 7 (Ex. 7-1)',
    body: `# Crane TP-410 Module 1: Pipe Flow & Reynolds Number
// Ex. 7-1: Water at 80 F through 70 ft of 2-in standard-wall smooth plastic pipe.

## 1. Fluid & Pipe Inputs
Q = 50 gpm
d = pipe("2in", "id") -> in
L = 70 ft
rho = 62.212 pcf
mu_cP = 0.85

## 2. Velocity & Reynolds Number (Crane Eq. 3-2)
A_pipe = pi * d^2 / 4 -> ft2
V = Q / A_pipe -> fps
// Crane US form: Re = 50.6 * Q_gpm * rho_pcf / (d_in * mu_cP)
Re = 50.6 * (Q / 1 gpm) * (rho / 1 pcf) / ((d / 1 in) * mu_cP)

## 3. Smooth-Pipe Friction Factor & Head Loss (Blasius / Darcy)
f_smooth = 0.3164 / Re^0.25
g = 32.174 fps / 1 s
h_f = f_smooth * (L / d) * (V^2 / (2 * g)) -> ft
dP = h_f * rho -> psi
check(V, 8.0 fps, "Pipe Velocity Screening (V <= 8.0 ft/s)")`
  },

  crane_valve_k: {
    title: 'CT-2: Valve & Fitting K-Factor & Cv (Crane 7-2)',
    discipline: 'Crane TP-410',
    codeRef: 'Crane TP-410 Ch. 7 (Ex. 7-2)',
    body: `# Crane TP-410 Module 2: Valve & Fitting Head Loss
// Ex. 7-2: 6-in Class 125 Y-pattern globe valve (Cv = 600) on 6-in Sch 40 pipe.

## 1. Valve & Pipe Inputs
Cv = 600
// Pipe inside diameter (default 6-in Sch 40 = 6.065 in; editable)
d = 6.065 in
f_T = 0.015
Q = 350 gpm

## 2. Resistance Coefficient K & Equivalent Length (Crane Eq. 2-15)
// Crane US relation: K = 891 * d_in^4 / Cv^2
K_valve = 891 * (d / 1 in)^4 / Cv^2
L_over_D = K_valve / f_T
L_equiv = L_over_D * d -> ft

## 3. Valve Head Loss & Pressure Drop at Flow Q
V = Q / (pi * d^2 / 4) -> fps
g = 32.174 fps / 1 s
h_L = K_valve * V^2 / (2 * g) -> ft
dP_valve = h_L * 62.32 pcf -> psi
check(dP_valve, 5.0 psi, "Valve Pressure Drop (dP <= 5.0 psi)")`
  },

  crane_pump: {
    title: 'CT-3: Pump Sizing & Brake Horsepower (Crane 7-15)',
    discipline: 'Crane TP-410',
    codeRef: 'Crane TP-410 Ch. 7 (Ex. 7-15)',
    body: `# Crane TP-410 Module 3: Pump Total Head & Brake Horsepower
// Ex. 7-15: Water at 70 F, 100 gpm through 500 ft of 3-in Sch 40 steel pipe, 400 ft lift.

## 1. System Geometry & Flow
Q = 100 gpm
L = 500 ft
z_lift = 400 ft
d = pipe("3in", "id") -> in
gamma_w = 62.30 pcf
eta = 0.70

## 2. Friction & Fittings Head Loss
// f = 0.022 (3-in Sch 40 commercial steel), sum(K) = 4*30*f_T + 8*f_T + 600*f_T
f = 0.022
K_fittings = 13.1
A_pipe = pi * d^2 / 4 -> ft2
V = Q / A_pipe -> fps
g = 32.174 fps / 1 s
h_f = (f * (L / d) + K_fittings) * (V^2 / (2 * g)) -> ft

## 3. Total Dynamic Head & Brake Horsepower
TDH = z_lift + h_f -> ft
WHP = Q * TDH * gamma_w -> hp
BHP = WHP / eta -> hp
check(BHP, 20 hp, "Pump Driver Sizing (BHP <= 20 hp)")`
  },

  crane_gas_steam: {
    title: 'CT-4: Gas & Steam Pipeline Pressure Drop (Crane 7-10)',
    discipline: 'Crane TP-410',
    codeRef: 'Crane TP-410 Ch. 7 (Ex. 7-10)',
    body: `# Crane TP-410 Module 4: Steam & Gas Pipeline Flow
// Ex. 7-10: 600 psig steam at 850 F, 90,000 lb/hr through 400 ft of 6-in Sch 80 pipe.

## 1. Steam & Pipe Properties
W_lbhr = 90000
L = 400 ft
d_in = 5.761
v_spec = 1.217
f = 0.0155
K_fittings = 4.65

## 2. Equivalent Total Resistance & Pressure Drop (Crane Eq. 3-14)
K_pipe = f * (L / (d_in * 1 in))
K_total = K_pipe + K_fittings
// Crane Darcy mass-flow form: dP_psi = 0.000000336 * K_total * W_lbhr^2 * v_spec / d_in^4
dP_steam = 0.000000336 * K_total * W_lbhr^2 * v_spec / d_in^4 * 1 psi -> psi
P_inlet = 600 psi
dP_pct = dP_steam / P_inlet
check(dP_pct, 0.10, "Pressure Drop Ratio (dP / P_inlet <= 10%)")`
  }
};
