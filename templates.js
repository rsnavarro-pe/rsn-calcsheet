/**
 * Combined US Structural, Civil/Site, Hydraulics, Crane TP-410 & Pipe Systems Templates
 */
import { STRUCTURAL_TEMPLATES } from './templates-structural.js';
import { CIVIL_TEMPLATES } from './templates-civil.js';
import { HYDRAULICS_TEMPLATES } from './templates-hydraulics.js';
import { CRANE_TEMPLATES } from './templates-crane.js';
import { PIPE_SYSTEMS_TEMPLATES } from './templates-pipe-systems.js';

export const TEMPLATES = {
  ...STRUCTURAL_TEMPLATES,
  ...CIVIL_TEMPLATES,
  ...HYDRAULICS_TEMPLATES,
  ...CRANE_TEMPLATES,
  ...PIPE_SYSTEMS_TEMPLATES
};
