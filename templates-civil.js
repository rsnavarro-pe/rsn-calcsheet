/**
 * US Civil / Site Engineering Templates (FHWA HEC-22, HEC-15, US Customary)
 */

export const CIVIL_TEMPLATES = {
  rational_runoff: {
    title: 'C-1: Rational Method Storm Runoff',
    discipline: 'Civil / Site',
    codeRef: 'Local Drainage Manual / FHWA HEC-22',
    body: `# Rational Method Peak Runoff (Q = C * i * A)
// Commercial parking lot & roof sub-basin (10-year storm).

## 1. Sub-Basin Areas
A_roof = 0.85 ac
A_pave = 1.40 ac
A_lawn = 0.65 ac
A_total = A_roof + A_pave + A_lawn -> ac

## 2. Composite Runoff Coefficient (C)
C_roof = 0.90
C_pave = 0.85
C_lawn = 0.25
C_comp = (C_roof * A_roof + C_pave * A_pave + C_lawn * A_lawn) / A_total

## 3. Rainfall Intensity & Peak Discharge
// 10-yr storm intensity for Tc = 12 min
i_10 = 4.65 in/hr
Q_10 = C_comp * i_10 * A_total -> cfs

## 4. Downstream 18" RCP Pipe Capacity Check
D_pipe = 18 in -> ft
A_pipe = pi * D_pipe^2 / 4 -> ft2
Q_cap = 10.5 cfs
check(Q_10, Q_cap, "18-in RCP Capacity (Q10 / Qcap)")`
  },

  mannings_channel: {
    title: 'C-2: Open-Channel Manning Flow',
    discipline: 'Civil / Site',
    codeRef: 'FHWA HEC-15 / US Customary Manning',
    body: `# Trapezoidal Riprap Swale (Manning's Equation)
// US Customary form: Q = (1.486 / n) * A * R^(2/3) * S^(1/2)

## 1. Channel Geometry
b = 4'-0" -> ft
z = 3
y = 1.5 ft
S = 0.012
n = 0.035

## 2. Hydraulic Properties
A_flow = (b + z * y) * y -> ft2
P_wet = b + 2 * y * sqrt(1 + z^2) -> ft
R_h = A_flow / P_wet -> ft

## 3. Velocity & Discharge (US Customary k = 1.486)
V = (1.486 / n) * (R_h / 1 ft)^(2/3) * S^(1/2) * 1 fps -> fps
Q = V * A_flow -> cfs

## 4. Permissible Velocity & Design Flow Check
V_max = 6.0 fps
check(V, V_max, "Max Permissible Velocity (Riprap)")
Q_design = 38.0 cfs
check(Q_design, Q, "Channel Conveyance (Q_design / Q_cap)")`
  }
};
