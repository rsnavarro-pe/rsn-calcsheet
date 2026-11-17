/**
 * Geometrical Properties of Sections (Calcpad Library — US Customary Units)
 */

export const GEOMETRY_TEMPLATES = {
  geo_pipe: {
    title: 'G-1: Geometrical Properties of Circular Pipe',
    discipline: 'Geometry',
    codeRef: 'Mechanics of Materials / Section Properties',
    body: `# Geometrical Properties of Circular Pipe

## Dimensions
d = 12 in
t = 0.5 in
d_1 = d - 2 * t -> in

## Area
A = pi * (d^2 - d_1^2) / 4 -> in2

## Centroid
y_c = d / 2 -> in
z_c = d / 2 -> in

## Perimeter
P = pi * d -> in

## Second moments of area
I_y = pi * (d^4 - d_1^4) / 64 -> in4
I_z = I_y -> in4

## Polar moment of area
I_x = 2 * I_y -> in4

## Torsional constant & section modulus
I_t = pi * (d^4 - d_1^4) / 32 -> in4
W_t = 2 * I_t / d -> in3

## Radii of gyration
r_y = sqrt(I_y / A) -> in
r_x = sqrt(I_x / A) -> in`
  },

  geo_rect: {
    title: 'G-2: Geometrical Properties of Rectangle',
    discipline: 'Geometry',
    codeRef: 'Mechanics of Materials / Section Properties',
    body: `# Geometrical Properties of Rectangle

## Dimensions
b = 6 in
h = 12 in

## Area & Perimeter
A = b * h -> in2
P = 2 * (b + h) -> in

## Centroid
y_c = b / 2 -> in
z_c = h / 2 -> in

## Second moments of area & Section moduli
I_y = b * h^3 / 12 -> in4
I_z = h * b^3 / 12 -> in4
W_y = b * h^2 / 6 -> in3
W_z = h * b^2 / 6 -> in3

## Radii of gyration
r_y = sqrt(I_y / A) -> in
r_z = sqrt(I_z / A) -> in`
  },

  geo_right_tri: {
    title: 'G-3: Geometrical Properties of Right Triangle',
    discipline: 'Geometry',
    codeRef: 'Mechanics of Materials / Section Properties',
    body: `# Geometrical Properties of Right Triangle

## Dimensions
b = 8 in
h = 6 in
c = sqrt(b^2 + h^2) -> in

## Area & Perimeter
A = b * h / 2 -> in2
P = b + h + c -> in

## Centroid (from right-angle corner)
y_c = b / 3 -> in
z_c = h / 3 -> in

## Second moments of area & Radii of gyration
I_y = b * h^3 / 36 -> in4
I_z = h * b^3 / 36 -> in4
r_y = sqrt(I_y / A) -> in
r_z = sqrt(I_z / A) -> in`
  },

  geo_ellipse_pipe: {
    title: 'G-4: Geometrical Properties of Elliptical Pipe',
    discipline: 'Geometry',
    codeRef: 'Mechanics of Materials / Section Properties',
    body: `# Geometrical Properties of Elliptical Pipe

## Dimensions (Major a, Minor b, Wall t)
a = 6 in
b = 4 in
t = 0.375 in
a_1 = a - t -> in
b_1 = b - t -> in

## Area
A = pi * (a * b - a_1 * b_1) -> in2

## Second moments of area
I_y = pi * (a * b^3 - a_1 * b_1^3) / 4 -> in4
I_z = pi * (b * a^3 - b_1 * a_1^3) / 4 -> in4

## Radii of gyration
r_y = sqrt(I_y / A) -> in
r_z = sqrt(I_z / A) -> in`
  },

  geo_equi_tri: {
    title: 'G-5: Geometrical Properties of Equilateral Triangle',
    discipline: 'Geometry',
    codeRef: 'Mechanics of Materials / Section Properties',
    body: `# Geometrical Properties of Equilateral Triangle

## Dimensions
a = 10 in
h = a * sqrt(3) / 2 -> in

## Area & Perimeter
A = a^2 * sqrt(3) / 4 -> in2
P = 3 * a -> in

## Centroid
y_c = a / 2 -> in
z_c = h / 3 -> in

## Second moments of area & Radius of gyration
I_y = a * h^3 / 36 -> in4
I_z = I_y -> in4
r_y = sqrt(I_y / A) -> in`
  }
};
