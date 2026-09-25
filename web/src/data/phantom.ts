import { images } from './images';
import type { Benefit, OptionRow } from './types';

export const phantom = {
  titleLines: ['Phantom', 'Retractable Screens'],
  tagline: "Fresh air in. Bugs out. Gone when you don't need it.",
  summary:
    "Retractable screens for hinged, sliding and oversized doors. They glide out when you want a breeze and roll neatly out of sight when you don't.",
  seoDescription:
    'Phantom retractable door screens supplied and installed by Sungod Blinds across Vancouver and the Lower Mainland.',
  featureBody:
    'Our Phantom retractable screens roll out across hinged, French and sliding doors when you want the breeze, then disappear into a slim housing.',
  extendedBody: [
    'Phantom screens are custom-made for each opening and colour-matched to your frames, so they read as part of the door, not an afterthought.',
    'We measure, supply and install every screen alongside your motorized shades, with one team handling the whole house.'
  ],
  specs: [
    'Insect, privacy and solar mesh options',
    'Custom colour matching to your frames',
    'Retracts completely out of sight',
    'Professional measure and installation'
  ],
  heroImage: images.phantomHero,
  portraitImage: images.phantomPortrait
};

export const phantomBenefits: Benefit[] = [
  {
    title: 'Let in fresh air',
    body: 'Open the doors on warm evenings and let the breeze move through the house.'
  },
  {
    title: 'Keep bugs out',
    body: 'Fine insect mesh keeps mosquitoes and moths outside where they belong.'
  },
  {
    title: 'Disappears when retracted',
    body: 'The screen rolls into a slim housing, leaving your view and door frame clear.'
  }
];

export const phantomTypes: OptionRow[] = [
  {
    name: 'Door screens',
    description: 'For hinged, French and standard sliding doors. Pull across, release to retract.'
  },
  {
    name: 'Oversized door screens',
    description: 'For wide sliders, folding and lift-and-slide openings, up to large spans.'
  },
  {
    name: 'Motorized outdoor screens',
    description: 'Push-button screens for patios, pergolas and covered decks.'
  }
];
