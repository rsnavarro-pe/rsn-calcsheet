/**
 * Combined US Structural, Civil/Site, Hydraulics, Crane TP-410, Pipe Systems, Geometry, Areas & Math Templates
 */
import { STRUCTURAL_TEMPLATES } from './templates-structural.js';
import { STRUCTURAL_DESIGN_TEMPLATES } from './templates-structural-design.js';
import { CIVIL_TEMPLATES } from './templates-civil.js';
import { HYDRAULICS_TEMPLATES } from './templates-hydraulics.js';
import { CRANE_TEMPLATES } from './templates-crane.js';
import { PIPE_SYSTEMS_TEMPLATES } from './templates-pipe-systems.js';
import { GEOMETRY_TEMPLATES } from './templates-geometry.js';
import { AREAS_TEMPLATES } from './templates-areas.js';
import { MATH_TEMPLATES } from './templates-math.js';

export const TEMPLATES = {
  ...STRUCTURAL_TEMPLATES,
  ...STRUCTURAL_DESIGN_TEMPLATES,
  ...CIVIL_TEMPLATES,
  ...HYDRAULICS_TEMPLATES,
  ...CRANE_TEMPLATES,
  ...PIPE_SYSTEMS_TEMPLATES,
  ...GEOMETRY_TEMPLATES,
  ...AREAS_TEMPLATES,
  ...MATH_TEMPLATES
};
