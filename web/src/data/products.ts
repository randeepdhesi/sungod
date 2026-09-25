import type { ProductSlug } from './enums';
import { images } from './images';
import type { InterestOption, Product, Spec } from './types';

/** Shared draft specs. Values flagged `confirm` must be verified with Brent. */
const baseSpecs: Spec[] = [
  { label: 'Motor', value: 'Quiet tubular motor', confirm: true },
  { label: 'Power', value: 'Rechargeable battery or hardwired', confirm: true },
  { label: 'Control', value: 'Remote, wall switch, app, voice' },
  { label: 'Automation', value: 'Schedules, scenes & sun-tracking' },
  { label: 'Warranty', value: 'Manufacturer warranty, confirmed at quote', confirm: true },
  { label: 'Lead time', value: 'Typically a few weeks after measure', confirm: true }
];

export const products: Product[] = [
  {
    slug: 'motorized-roller-shades',
    name: 'Motorized Roller Shades',
    shortName: 'Roller Shades',
    titleLines: ['Motorized', 'Roller Shades'],
    tagline: 'Clean lines. One touch.',
    summary:
      'A slim fabric panel on a whisper-quiet motor. Lower one window or the whole house from a remote, your phone, your voice or a schedule that follows the sun.',
    homeDescription: 'A simple fabric panel for filtered daylight, glare control or a darker bedroom.',
    seoDescription:
      'Motorized roller shades for Vancouver and Lower Mainland homes. Solar, light-filtering and blackout fabrics with remote, app, voice and scheduled control.',
    heroImage: images.rollerHero,
    tileImage: images.rollerTile,
    benefits: [
      {
        title: 'Quiet motor',
        body: 'Near-silent motors glide every shade to its stop, so rooms stay calm, even first thing in the morning.'
      },
      {
        title: 'Perfect alignment',
        body: 'Group shades by room or elevation and they move together, stopping on the same line every time.'
      },
      {
        title: 'Cordless and child-safe',
        body: 'No cords, chains or wands. Cleaner windows and a safer home for kids and pets.'
      }
    ],
    opacities: [
      { name: 'Sheer / Solar screen', description: 'Cuts glare and UV while keeping the view.', level: 4 },
      { name: 'Light-filtering', description: 'Soft, diffused daylight with daytime privacy.', level: 3 },
      { name: 'Room-darkening', description: 'Deep dimming for media rooms and slow mornings.', level: 2 },
      { name: 'Blackout', description: 'Near-total darkness for bedrooms and nurseries.', level: 1 }
    ],
    controls: ['remote', 'wall-switch', 'app', 'voice', 'schedule'],
    specs: baseSpecs,
    order: 1
  },
  {
    slug: 'motorized-dual-shades',
    name: 'Motorized Dual Shades',
    shortName: 'Dual Shades',
    titleLines: ['Motorized', 'Dual Shades'],
    tagline: 'Soft bands of light, on command.',
    summary:
      'Two layers of alternating sheer and solid bands, often called zebra shades. Line up the sheers for a filtered view or offset them for privacy, all without raising the shade.',
    homeDescription: 'Alternating sheer and solid bands shift between a view and privacy without raising the shade.',
    seoDescription:
      'Motorized dual (zebra) shades in Vancouver. Alternating sheer and solid bands for instant view or privacy, controlled by remote, app, voice or schedule.',
    heroImage: images.dualHero,
    tileImage: images.dualTile,
    benefits: [
      {
        title: 'View or privacy, instantly',
        body: 'Shift the bands a few centimetres and a room goes from open and airy to fully private.'
      },
      {
        title: 'Scenes for every hour',
        body: 'Save favourite positions (morning, work, evening) and recall them with one tap.'
      },
      {
        title: 'Tailored, modern look',
        body: 'A compact cassette headrail hides the roll and motor for a clean, finished line.'
      }
    ],
    opacities: [
      { name: 'Light-filtering bands', description: 'Sheer and soft-solid bands for gentle privacy.', level: 3 },
      { name: 'Room-darkening bands', description: 'Denser solid bands for bedrooms and media rooms.', level: 2 }
    ],
    controls: ['remote', 'wall-switch', 'app', 'voice', 'schedule'],
    specs: baseSpecs,
    order: 2
  },
  {
    slug: 'motorized-honeycomb-shades',
    name: 'Motorized Honeycomb Shades',
    shortName: 'Honeycomb Shades',
    titleLines: ['Motorized', 'Honeycomb Shades'],
    tagline: 'Insulating light, beautifully controlled.',
    summary:
      'Cellular fabric traps a layer of air at the window, softening light while helping rooms stay warmer in winter and cooler in summer. Motorized, they close themselves when the sun gets strong.',
    homeDescription: 'Cellular fabric softens daylight and adds a layer of insulation at the glass.',
    seoDescription:
      'Motorized honeycomb (cellular) shades for Lower Mainland homes. Insulating, energy-saving and fully automated with schedules and sun-tracking.',
    heroImage: images.honeycombHero,
    tileImage: images.honeycombTile,
    benefits: [
      {
        title: 'Year-round insulation',
        body: 'Air-trapping cells add a buffer at the glass, helping reduce heat loss and solar gain.'
      },
      {
        title: 'Smarter energy use',
        body: 'Schedule shades to close on hot afternoons and at dusk so heating and cooling work less.'
      },
      {
        title: 'Soft, even light',
        body: 'Pleated cells diffuse daylight evenly, without hard lines across the room.'
      }
    ],
    opacities: [
      { name: 'Light-filtering cells', description: 'Glowing, diffused light with daytime privacy.', level: 3 },
      { name: 'Blackout cells', description: 'A foil-lined cell for bedrooms and nurseries.', level: 1 }
    ],
    controls: ['remote', 'wall-switch', 'app', 'voice', 'schedule'],
    specs: baseSpecs,
    order: 3
  }
].sort((a, b) => a.order - b.order) as Product[];

export const getProduct = (slug: ProductSlug) => products.find((p) => p.slug === slug);

export const interestOptions: InterestOption[] = [
  ...products.map((p) => ({ value: p.slug, label: p.name })),
  { value: 'phantom-door-screens', label: 'Phantom Door Screens' },
  { value: 'not-sure', label: 'Not sure yet' }
];
