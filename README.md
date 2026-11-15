# RSN CalcSheet

Browser-based US Customary engineering calculation and permit-submittal application for **Structural** and **Civil / Site** engineering.

## Features
- **US Customary Dimensional Engine:** `in`, `ft`, `ft-in` (`12'-6 1/2"`), `lb`/`lbf`, `kip`, `plf`, `klf`, `psf`, `ksf`, `psi`, `ksi`, `pcf`, `kip-ft`, `ac`, `cfs`, `gpm`, `fps`, `in/hr`.
- **Built-in US Material & Section Tables:** AISC W-shapes (`aisc(...)`), NDS dressed lumber (`nds(...)`), and ACI 318 rebar (`rebar(...)`).
- **US-Only Design Templates (Zero Eurocode):**
  - `S-1`: Steel Floor Beam (AISC 360-22 LRFD)
  - `S-2`: Timber Floor Joist (NDS 2024 ASD)
  - `S-3`: Reinforced Concrete Beam (ACI 318-19)
  - `S-4`: Spread Footing Bearing & Shear (IBC 2024 / ACI 318-19)
  - `S-5`: Wind & Snow Loads (ASCE 7-22)
  - `C-1`: Rational Method Storm Runoff (FHWA HEC-22)
  - `C-2`: Open-Channel Manning Flow (FHWA HEC-15)
- **Submittal-Ready Output:** `8.5" × 11"` US Letter print/PDF layout with PE/SE seal title block and JSON project export/import.
