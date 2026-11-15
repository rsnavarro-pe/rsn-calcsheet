/**
 * Combined US Structural & Civil/Site Templates (Zero Eurocode)
 */
import { STRUCTURAL_TEMPLATES } from './templates-structural.js';
import { CIVIL_TEMPLATES } from './templates-civil.js';

export const TEMPLATES = {
  ...STRUCTURAL_TEMPLATES,
  ...CIVIL_TEMPLATES
};
