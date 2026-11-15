/**
 * Combined US Structural, Civil/Site & Hydraulics Templates
 */
import { STRUCTURAL_TEMPLATES } from './templates-structural.js';
import { CIVIL_TEMPLATES } from './templates-civil.js';
import { HYDRAULICS_TEMPLATES } from './templates-hydraulics.js';

export const TEMPLATES = {
  ...STRUCTURAL_TEMPLATES,
  ...CIVIL_TEMPLATES,
  ...HYDRAULICS_TEMPLATES
};
