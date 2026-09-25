import type { LogoConcept, PaletteSwatch } from './types';

export const logoConcepts: LogoConcept[] = [
  {
    id: 'A',
    name: 'Horizon',
    rationale:
      "A rising sun resting on a shade's bottom rail. Sunrise meets the blind: the name and the product in one mark.",
    component: 'horizon'
  },
  {
    id: 'B',
    name: 'Slatted Sun',
    rationale:
      'A sun disc sliced by slats that open as they fall. Literally light through blinds, geometric and modern.',
    component: 'slatted'
  },
  {
    id: 'C',
    name: 'Fine-line Radiant',
    rationale:
      'A refined ring of fine rays with a classic, widely spaced serif. Premium and timeless, suited to high-end homes.',
    component: 'radiant'
  }
];

export const palette: PaletteSwatch[] = [
  { name: 'Architectural White', hex: '#FAF8F5', token: 'lace', role: 'Page Background' },
  { name: 'Warm Grey Band', hex: '#EEEBE3', token: 'band', role: 'Section Separation' },
  { name: 'Obsidian Charcoal', hex: '#121316', token: 'graphite', role: 'Headlines & Solid Text' },
  { name: 'Deep Slate', hex: '#2A2B30', token: 'mist', role: 'Readable Body & Details' },
  { name: 'Rusty Spice', hex: '#A94D25', token: 'spice', role: 'Action & CTAs' },
  { name: 'Honey Bronze', hex: '#C89332', token: 'honey', role: 'Sun & Badges' }
];
