import { formatTel } from '../lib/format';
import type { NavItem } from './types';

const phoneDisplay = '604.720.5471';

export const site = {
  name: 'Sungod Blinds',
  domain: 'sungodblinds.ca',
  url: 'https://sungodblinds.ca',
  principal: { name: 'Brent Repin', title: 'Principal' },
  phoneDisplay,
  phoneTel: formatTel(phoneDisplay),
  // TODO: confirm business email with Brent
  email: undefined as string | undefined,
  region: 'Metro Vancouver & Lower Mainland, BC',
  serviceAreas: [
    'Vancouver',
    'North Vancouver',
    'West Vancouver',
    'Burnaby',
    'New Westminster',
    'Richmond',
    'Delta',
    'Surrey',
    'White Rock',
    'Langley',
    'Coquitlam',
    'Port Moody'
  ],
  cta: { label: 'Get a Quote', href: '/quote' }
} as const;

/** Primary nav (Products is rendered as a disclosure from products.ts). */
export const primaryNav: NavItem[] = [
  { label: 'Pricing Estimator', href: '/estimate' },
  { label: 'Phantom Screens', href: '/phantom-screens' },
  { label: 'About', href: '/about' },
  { label: 'Brand Review', href: '/brand' }
];
