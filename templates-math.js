/**
 * Remaining Mathematics Calculators (Volumes, Equations, Trigonometry — US Customary)
 */

export const MATH_TEMPLATES = {
  math_sphere: {
    title: 'M-1: Sphere (Volume & Surface Area)',
    discipline: 'Mathematics',
    codeRef: 'Solid Geometry',
    body: `# Sphere — Volume & Surface Area
## Dimensions
r = 6 in
## Volume & Surface Area
V = 4 * pi * r^3 / 3 -> in3
S = 4 * pi * r^2 -> in2`
  },

  math_cylinder: {
    title: 'M-2: Cylinder (Volume & Surface Area)',
    discipline: 'Mathematics',
    codeRef: 'Solid Geometry',
    body: `# Right Circular Cylinder
## Dimensions
r = 4 in
h = 12 in
## Volume & Surface Areas
V = pi * r^2 * h -> in3
S_lat = 2 * pi * r * h -> in2
S_tot = S_lat + 2 * pi * r^2 -> in2`
  },

  math_cone: {
    title: 'M-3: Cone (Volume & Surface Area)',
    discipline: 'Mathematics',
    codeRef: 'Solid Geometry',
    body: `# Right Circular Cone
## Dimensions
r = 5 in
h = 12 in
## Slant Height, Volume & Surface Area
s = sqrt(r^2 + h^2) -> in
V = pi * r^2 * h / 3 -> in3
S_tot = pi * r * (r + s) -> in2`
  },

  math_frustum: {
    title: 'M-4: Conical Frustum (Volume)',
    discipline: 'Mathematics',
    codeRef: 'Solid Geometry',
    body: `# Conical Frustum
## Dimensions
R_bot = 6 in
r_top = 3 in
h = 10 in
## Slant Height & Volume
s = sqrt((R_bot - r_top)^2 + h^2) -> in
V = pi * h * (R_bot^2 + R_bot * r_top + r_top^2) / 3 -> in3`
  },

  math_prism: {
    title: 'M-5: Rectangular Prism (Volume & Diagonal)',
    discipline: 'Mathematics',
    codeRef: 'Solid Geometry',
    body: `# Rectangular Prism (Box)
## Dimensions
a = 10 in
b = 6 in
c = 4 in
## Volume, Surface Area & Space Diagonal
V = a * b * c -> in3
S = 2 * (a * b + b * c + a * c) -> in2
d = sqrt(a^2 + b^2 + c^2) -> in`
  },

  math_quadratic: {
    title: 'M-6: Quadratic Equation (ax^2 + bx + c = 0)',
    discipline: 'Mathematics',
    codeRef: 'Algebra',
    body: `# Quadratic Equation Solver
## Coefficients (a*x^2 + b*x + c = 0)
a = 2
b = -7
c = 3
## Discriminant, Roots & Vertex
D = b^2 - 4 * a * c
x_1 = (-b + sqrt(D)) / (2 * a)
x_2 = (-b - sqrt(D)) / (2 * a)
x_v = -b / (2 * a)
y_v = a * x_v^2 + b * x_v + c`
  },

  math_linear_2x2: {
    title: 'M-7: 2x2 Linear System (Cramer)',
    discipline: 'Mathematics',
    codeRef: 'Linear Algebra',
    body: `# 2x2 Linear System (a1*x + b1*y = c1, a2*x + b2*y = c2)
## Coefficients
a_1 = 3
b_1 = 2
c_1 = 16
a_2 = 1
b_2 = -4
c_2 = -2
## Determinant & Solution
det = a_1 * b_2 - a_2 * b_1
x = (c_1 * b_2 - c_2 * b_1) / det
y = (a_1 * c_2 - a_2 * c_1) / det`
  },

  math_trig_sas: {
    title: 'M-8: Triangle Solver (SAS — Law of Cosines)',
    discipline: 'Mathematics',
    codeRef: 'Trigonometry',
    body: `# Triangle Solver (Side-Angle-Side)
## Given Sides & Included Angle
a = 8 in
b = 10 in
gamma = 60 deg
## Third Side, Area & Remaining Angles
c = sqrt(a^2 + b^2 - 2 * a * b * cos(gamma)) -> in
A = a * b * sin(gamma) / 2 -> in2
alpha = asin(a * sin(gamma) / c) -> deg
beta = 180 deg - alpha - gamma -> deg`
  }
};
