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
  { name: 'Old Lace', hex: '#F7EFDE', token: 'lace', role: 'Page' },
  { name: 'Warm Band', hex: '#E5E2D9', token: 'band', role: 'Section band' },
  { name: 'Graphite', hex: '#303236', token: 'graphite', role: 'Text' },
  { name: 'Rusty Spice', hex: '#A94D25', token: 'spice', role: 'Action' },
  { name: 'Honey Bronze', hex: '#D9A545', token: 'honey', role: 'Sun' },
  { name: 'Golden Chestnut', hex: '#C57C37', token: 'chestnut', role: 'Warm wash' }
];
