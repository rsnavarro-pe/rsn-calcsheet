/**
 * Pipe Systems Toolkit Calculators (Series/Parallel, Surge, Wet Well, Bypass Orifice, VFD)
 * Distinct from single-pipe, valve, Venturi, and Crane TP-410 sheets (zero duplication).
 */

export const PIPE_SYSTEMS_TEMPLATES = {
  ps_series_parallel: {
    title: 'PS-1: Series & Parallel Pipe Network Split',
    discipline: 'Pipe Systems',
    codeRef: 'RSN Pipe Systems (Continuity & Energy)',
    body: `# Series & Parallel Pipe Network
// Parallel branches (1 & 2) feeding a common downstream series main (3).

## 1. Parallel Branch Geometry & Total Flow
Q_total = 600 gpm
L_1 = 400 ft
D_1 = pipe("4in", "id") -> in
f_1 = 0.020
L_2 = 300 ft
D_2 = pipe("6in", "id") -> in
f_2 = 0.018

## 2. Parallel Flow Split (Equal Head Loss: Q_i ~ D_i^2.5 / sqrt(f_i * L_i))
C_1 = (D_1 / 1 in)^2.5 / sqrt(f_1 * (L_1 / 1 ft))
C_2 = (D_2 / 1 in)^2.5 / sqrt(f_2 * (L_2 / 1 ft))
Q_1 = Q_total * C_1 / (C_1 + C_2) -> gpm
Q_2 = Q_total * C_2 / (C_1 + C_2) -> gpm

## 3. Branch & Series Main Head Loss
g = 32.174 fps / 1 s
V_1 = Q_1 / (pi * D_1^2 / 4) -> fps
h_parallel = f_1 * (L_1 / D_1) * (V_1^2 / (2 * g)) -> ft
L_3 = 800 ft
D_3 = pipe("8in", "id") -> in
V_3 = Q_total / (pi * D_3^2 / 4) -> fps
h_series = 0.017 * (L_3 / D_3) * (V_3^2 / (2 * g)) -> ft
h_total = h_parallel + h_series -> ft
check(V_1, 8.0 fps, "Branch 1 Velocity Screening (V <= 8.0 ft/s)")`
  },

  ps_surge: {
    title: 'PS-2: Water Hammer & Surge Screening',
    discipline: 'Pipe Systems',
    codeRef: 'Wylie & Streeter / Joukowsky & Michaud',
    body: `# Transient Surge Screening (Joukowsky / Michaud)
// Rapid valve closure or pump trip on 8-in Sch 40 steel force main.

## 1. Pipe & Fluid Properties
D = pipe("8in", "id") -> in
e_wall = 0.322 in
L = 2400 ft
V_0 = 5.5 fps
t_close = 1.5 s
// Water bulk modulus K_w = 319,000 psi; Steel E_p = 29,000,000 psi
K_w = 319000 psi
E_p = 29000000 psi
gamma_w = 62.4 pcf
g = 32.174 fps / 1 s

## 2. Wave Speed & Critical Closure Time (2L / a)
rho_slug = (gamma_w / g)
a_wave = sqrt(K_w / rho_slug) / sqrt(1 + (K_w * D) / (E_p * e_wall)) -> fps
t_crit = 2 * L / a_wave -> s

## 3. Surge Pressure Rise (Joukowsky) & Total Pressure
dP_surge = (gamma_w / g) * a_wave * V_0 -> psi
P_steady = 65 psi
P_peak = P_steady + dP_surge -> psi
P_allow = 450 psi
check(P_peak, P_allow, "Peak Surge vs. Pipe Allowable Pressure")`
  },

  ps_station: {
    title: 'PS-3: Lift Station Wet Well & Firm Capacity',
    discipline: 'Pipe Systems',
    codeRef: 'Davis 19-5 / Ten States Standards',
    body: `# Duplex Lift Station Wet Well & Firm Capacity
// Peak wet-weather inflow Q_peak with 2 pumps (1 duty + 1 standby).

## 1. Firm Capacity Check (Largest Pump Out of Service)
Q_peak = 320 gpm
Q_pump = 360 gpm
n_total = 2
n_firm = n_total - 1
Q_firm = n_firm * Q_pump -> gpm
check(Q_peak, Q_firm, "Firm Capacity (Q_peak <= Q_firm)")

## 2. Active Wet Well Volume (V = Q_pump * t_cycle / 4)
t_cycle = 10 min
V_well = Q_pump * t_cycle / 4 -> gal
D_well = 8 ft
A_well = pi * D_well^2 / 4 -> ft2
h_active = V_well / A_well -> ft
check(h_active, 6.0 ft, "Active Drawdown Depth (h <= 6.0 ft)")`
  },

  ps_bypass: {
    title: 'PS-4: Minimum-Flow Pump Bypass Orifice',
    discipline: 'Pipe Systems',
    codeRef: 'Pump Handbook 11.2.3',
    body: `# Minimum-Flow Bypass Orifice Sizing
// Continuous recirculation orifice returning Q_min to suction tank.

## 1. Pump Minimum Flow & Available Head
Q_min = 65 gpm
H_pump_min = 140 ft
h_loss_line = 12 ft
dH_orf = H_pump_min - h_loss_line -> ft
C_d = 0.61
g = 32.174 fps / 1 s

## 2. Orifice Area & Diameter (Q = Cd * A * sqrt(2*g*dH))
A_orf = Q_min / (C_d * sqrt(2 * g * dH_orf)) -> in2
d_orf = sqrt(4 * A_orf / pi) -> in
V_orf = Q_min / A_orf -> fps
check(d_orf, 2.0 in, "Orifice Bore Screening (d_orf <= 2.0 in)")`
  },

  ps_vfd: {
    title: 'PS-5: VFD Affinity & Annual Energy Savings',
    discipline: 'Pipe Systems',
    codeRef: 'Affinity Laws (H ~ r^2, P ~ r^3)',
    body: `# Variable-Speed Drive (VFD) Energy Comparison
// Comparing VFD speed reduction r = 0.75 vs. full-speed throttling.

## 1. Full-Speed Rated Duty & VFD Speed Ratio
Q_rated = 400 gpm
H_rated = 80 ft
P_rated = 11.0 hp
r_vfd = 0.75
hours_yr = 4000

## 2. Reduced-Speed Flow, Head & Power (Affinity Laws)
Q_vfd = r_vfd * Q_rated -> gpm
H_vfd = r_vfd^2 * H_rated -> ft
P_vfd = r_vfd^3 * P_rated -> hp
P_saved = P_rated - P_vfd -> hp
// Annual energy savings (kWh/yr = P_saved_hp * 0.7457 * hours)
E_saved_kWh = (P_saved / 1 hp) * 0.7457 * hours_yr
check(P_vfd, P_rated, "VFD Power Reduction (P_vfd / P_rated)")`
  }
};
