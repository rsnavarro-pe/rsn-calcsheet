/**
 * US Structural Templates (AISC 360, NDS, ACI 318, ASCE 7-22, IBC 2024)
 */

export const STRUCTURAL_TEMPLATES = {
  steel_beam: {
    title: 'S-1: Steel Floor Beam (AISC 360-22 LRFD)',
    discipline: 'Structural',
    codeRef: 'IBC 2024 / ASCE 7-22 / AISC 360-22',
    body: `# Simply Supported Steel Floor Beam (AISC 360-22 LRFD)
// Simply supported W-shape floor beam under AISC 360-22 Ch. F (Flexure) & Ch. G (Shear).

## 1. Geometry & Section Properties (W16x36, A992)
L = 24'-0" -> ft
trib = 10'-0" -> ft
d = aisc("W16x36", "d")
tw = aisc("W16x36", "tw")
Ix = aisc("W16x36", "Ix")
Zx = aisc("W16x36", "Zx")
Fy = 50 ksi
Es = 29000 ksi

## 2. Loads & ASCE 7-22 LRFD Combination (1.2D + 1.6L)
w_D = 48 psf * trib + 36 plf -> klf
w_L = 50 psf * trib -> klf
w_u = 1.2 * w_D + 1.6 * w_L -> klf

## 3. Flexure & Shear Checks (AISC Ch. F & G)
Mu = w_u * L^2 / 8 -> kip-ft
phi_Mn = 0.90 * Fy * Zx -> kip-ft
check(Mu, phi_Mn, "Flexure (Mu / phi*Mn)")

Vu = w_u * L / 2 -> kip
phi_Vn = 1.00 * 0.6 * Fy * (d * tw) -> kip
check(Vu, phi_Vn, "Web Shear (Vu / phi*Vn)")

## 4. Live Load Deflection (IBC Table 1604.3, L/360)
delta_L = (5 * w_L * L^4) / (384 * Es * Ix) -> in
delta_allow = L / 360 -> in
check(delta_L, delta_allow, "Live Load Deflection (L/360)")`
  },

  wood_joist: {
    title: 'S-2: Timber Floor Joist (NDS 2024 ASD)',
    discipline: 'Structural',
    codeRef: 'IBC 2024 / NDS 2024',
    body: `# Dimension Lumber Floor Joist (NDS 2024 ASD)
// Timber floor joist check per NDS 2024 ASD.

## 1. Member & Geometry (2x10 DF-L No. 2 @ 16" o.c.)
L = 14'-6" -> ft
spacing = 16 in -> ft
b = nds("2x10", "b")
d = nds("2x10", "d")
A_g = nds("2x10", "A")
S_x = nds("2x10", "S")
I_x = nds("2x10", "I")

## 2. NDS Reference Values & Adjustment Factors
Fb = 900 psi
Fv = 180 psi
E_min = 1600000 psi
CD = 1.0
CF = 1.1
Cr = 1.15
Fb_prime = Fb * CD * CF * Cr -> psi
Fv_prime = Fv * CD -> psi

## 3. Applied Loads (ASD: D + L)
w_D = 15 psf * spacing -> plf
w_L = 40 psf * spacing -> plf
w_tot = w_D + w_L -> plf

## 4. Bending, Shear & Deflection Checks
M_max = w_tot * L^2 / 8 -> lb-ft
fb = M_max / S_x -> psi
check(fb, Fb_prime, "Bending Stress (fb / Fb')")

V_max = w_tot * (L / 2 - d) -> lbf
fv = 1.5 * V_max / A_g -> psi
check(fv, Fv_prime, "Horizontal Shear (fv / Fv')")

delta_L = (5 * w_L * L^4) / (384 * E_min * I_x) -> in
check(delta_L, L / 360, "Live Load Deflection (L/360)")`
  },

  concrete_beam: {
    title: 'S-3: Reinforced Concrete Beam (ACI 318-19)',
    discipline: 'Structural',
    codeRef: 'IBC 2024 / ACI 318-19',
    body: `# Singly Reinforced Concrete Beam (ACI 318-19)
// Reinforced concrete beam design per ACI 318-19.

## 1. Cross-Section & Materials
b = 12 in
h = 22 in
d = 19.5 in
fc = 4000 psi
fy = 60 ksi
n_bars = 3
As = n_bars * rebar("#7", "area") -> in2

## 2. Factored Demand (ASCE 7-22: 1.2D + 1.6L)
L = 20'-0" -> ft
w_u = 2.85 klf
Mu = w_u * L^2 / 8 -> kip-ft
Vu = w_u * L / 2 -> kip

## 3. Flexural Strength (ACI 318 Ch. 9 & 22)
a = (As * fy) / (0.85 * fc * b) -> in
phi_Mn = 0.90 * As * fy * (d - a / 2) -> kip-ft
check(Mu, phi_Mn, "Flexural Strength (Mu / phi*Mn)")

## 4. Shear Strength with #3 Stirrups @ 8" o.c. (ACI 318 Ch. 22.5)
phi_Vc = 0.75 * 2 * sqrt(4000) * 1 psi * b * d -> kip
Av = 2 * rebar("#3", "area") -> in2
s_stir = 8 in
phi_Vs = 0.75 * Av * fy * d / s_stir -> kip
phi_Vn = phi_Vc + phi_Vs -> kip
check(Vu, phi_Vn, "Total Shear (Vu / phi*(Vc + Vs))")`
  },

  footing: {
    title: 'S-4: Spread Footing (IBC / ACI 318-19)',
    discipline: 'Structural',
    codeRef: 'IBC 2024 / ACI 318-19',
    body: `# Square Spread Footing Bearing & One-Way Shear
// Pad foundation bearing and one-way shear check per IBC 2024 & ACI 318-19.

## 1. Soil & Concrete Parameters
q_allow = 3000 psf
fc = 4000 psi
gamma_c = 150 pcf
B = 6'-6" -> ft
h = 18 in
d_eff = 14.5 in

## 2. Service Bearing Pressure (ASD)
P_D = 65 kip
P_L = 45 kip
W_ftg = B * B * h * gamma_c -> kip
q_actual = (P_D + P_L + W_ftg) / (B * B) -> psf
check(q_actual, q_allow, "Allowable Soil Bearing (ASD)")

## 3. Factored One-Way Shear (ACI 318-19)
P_u = 1.2 * P_D + 1.6 * P_L -> kip
q_u = P_u / (B * B) -> ksf
c_col = 16 in
x_crit = (B - c_col) / 2 - d_eff -> ft
V_u = q_u * B * x_crit -> kip
phi_Vc = 0.75 * 2 * sqrt(4000) * 1 psi * B * d_eff -> kip
check(V_u, phi_Vc, "One-Way Beam Shear (Vu / phi*Vc)")`
  },

  wind_snow: {
    title: 'S-5: Wind & Snow Loads (ASCE 7-22)',
    discipline: 'Structural',
    codeRef: 'IBC 2024 / ASCE 7-22 Ch. 7 & 26–27',
    body: `# Environmental Loads: Snow & Wind (ASCE 7-22)
// Roof snow and wind pressure calculations per ASCE 7-22.

## 1. Roof Snow Load (ASCE 7-22 Ch. 7)
pg = 30 psf
Ce = 1.0
Ct = 1.0
Is = 1.0
pf = 0.7 * Ce * Ct * Is * pg -> psf
pf_min = 20 psf * Is -> psf
p_snow = max(pf, pf_min) -> psf

## 2. Wind Velocity Pressure (ASCE 7-22 Eq. 26.10-1)
// Basic wind speed V = 115 mph, Exposure C, h = 25 ft
V = 115
Kz = 0.94
Kzt = 1.0
Kd = 0.85
Ke = 1.0
qz = 0.00256 * Kz * Kzt * Kd * Ke * V^2 * 1 psf -> psf

## 3. MWFRS Windward Wall Pressure
G = 0.85
Cp_ww = 0.8
p_windward = qz * G * Cp_ww -> psf
check(p_windward, 25 psf, "Windward Pressure vs. 25 psf Design Envelope")`
  }
};
