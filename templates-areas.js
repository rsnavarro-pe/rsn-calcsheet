/**
 * 15 Area & Perimeter Calculators (Calcpad Areas Category — US Customary Units)
 */

export const AREAS_TEMPLATES = {
  area_circle: {
    title: 'A-1: Circle (Area & Circumference)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Circle
## Dimensions
r = 6 in
d = 2 * r -> in
## Area & Circumference
A = pi * r^2 -> in2
P = 2 * pi * r -> in`
  },

  area_triangle: {
    title: 'A-2: Triangle (3 Sides — Heron)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Triangle (3 Sides)
## Dimensions
a = 7 in
b = 8 in
c = 9 in
## Semi-perimeter & Area
P = a + b + c -> in
s = P / 2 -> in
A = sqrt(s * (s - a) * (s - b) * (s - c)) -> in2`
  },

  area_triangle_h: {
    title: 'A-3: Triangle (Base & Height)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Triangle (Height)
## Dimensions
b = 10 in
h = 6 in
## Area
A = b * h / 2 -> in2`
  },

  area_right_tri: {
    title: 'A-4: Right Triangle',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Right Triangle
## Dimensions
a = 6 in
b = 8 in
## Hypotenuse, Area & Perimeter
c = sqrt(a^2 + b^2) -> in
A = a * b / 2 -> in2
P = a + b + c -> in`
  },

  area_equi_tri: {
    title: 'A-5: Equilateral Triangle',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Equilateral Triangle
## Dimensions
a = 10 in
## Height, Area & Perimeter
h = a * sqrt(3) / 2 -> in
A = a^2 * sqrt(3) / 4 -> in2
P = 3 * a -> in`
  },

  area_rect: {
    title: 'A-6: Rectangle',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Rectangle
## Dimensions
a = 12 in
b = 8 in
## Area, Perimeter & Diagonal
A = a * b -> in2
P = 2 * (a + b) -> in
d = sqrt(a^2 + b^2) -> in`
  },

  area_square: {
    title: 'A-7: Square',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Square
## Dimensions
a = 10 in
## Area, Perimeter & Diagonal
A = a^2 -> in2
P = 4 * a -> in
d = a * sqrt(2) -> in`
  },

  area_trapezoid: {
    title: 'A-8: Trapezoid',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Trapezoid
## Dimensions
a = 12 in
b = 8 in
h = 5 in
## Midsegment & Area
m = (a + b) / 2 -> in
A = (a + b) * h / 2 -> in2`
  },

  area_polygon: {
    title: 'A-9: Regular Polygon',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Regular Polygon
## Dimensions
n = 6
a = 5 in
## Apothem, Circumradius, Perimeter & Area
P = n * a -> in
r_in = a / (2 * tan(180 deg / n)) -> in
R_out = a / (2 * sin(180 deg / n)) -> in
A = P * r_in / 2 -> in2`
  },

  area_ellipse: {
    title: 'A-10: Ellipse',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Ellipse
## Semi-Axes
a = 8 in
b = 5 in
## Area & Perimeter (Ramanujan)
A = pi * a * b -> in2
P = pi * (3 * (a + b) - sqrt((3 * a + b) * (a + 3 * b))) -> in`
  },

  area_parabola: {
    title: 'A-11: Parabola',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Parabolic Segment
## Dimensions
b = 12 in
h = 4 in
## Area
A = 2 * b * h / 3 -> in2`
  },

  area_sector_chord: {
    title: 'A-12: Circular Sector (Chord)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Circular Sector (Chord)
## Dimensions
r = 10 in
c = 12 in
## Central Angle, Arc & Area
alpha = 2 * asin(c / (2 * r)) -> deg
s = r * (alpha / 1 rad) -> in
A = r * s / 2 -> in2`
  },

  area_sector_angle: {
    title: 'A-13: Circular Sector (Angle)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Circular Sector (Angle)
## Dimensions
r = 10 in
alpha = 60 deg
## Arc, Chord & Area
s = r * (alpha / 1 rad) -> in
c = 2 * r * sin(alpha / 2) -> in
A = r^2 * (alpha / 1 rad) / 2 -> in2`
  },

  area_segment_chord: {
    title: 'A-14: Circular Segment (Chord)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Circular Segment (Chord)
## Dimensions
r = 10 in
c = 12 in
## Angle, Rise & Area
alpha = 2 * asin(c / (2 * r)) -> deg
h = r * (1 - cos(alpha / 2)) -> in
A = r^2 * ((alpha / 1 rad) - sin(alpha)) / 2 -> in2`
  },

  area_segment_angle: {
    title: 'A-15: Circular Segment (Angle)',
    discipline: 'Areas',
    codeRef: 'Plane Geometry',
    body: `# Area of Circular Segment (Angle)
## Dimensions
r = 10 in
alpha = 90 deg
## Rise, Chord & Area
h = r * (1 - cos(alpha / 2)) -> in
c = 2 * r * sin(alpha / 2) -> in
A = r^2 * ((alpha / 1 rad) - sin(alpha)) / 2 -> in2`
  }
};
