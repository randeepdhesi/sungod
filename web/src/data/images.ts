import type { ImageAsset } from './types';

const pexels = (path: string) => (w: number) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}`;

const unsplash = (id: string) => (w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const asset = (
  srcFor: (w: number) => string,
  description: string,
  credit: string,
  width: number,
  height: number
): ImageAsset => ({ srcFor, alt: `${description} - Photo by ${credit}`, width, height });

/**
 * Draft stock imagery (hot-linked). Replace with Sungod install photography before launch.
 * GAPS: no genuine honeycomb-shade or Phantom-screen photos yet (stand-ins used).
 */
export const images = {
  homeHero: asset(
    pexels('29012628/pexels-photo-29012628.jpeg'),
    'Bright, airy living room with soft daylight filtering through window coverings',
    'Beyza Kılıçdere on Pexels',
    1600,
    2000
  ),
  fabricInset: asset(
    pexels('31034511/pexels-photo-31034511.jpeg'),
    'Close-up of premium woven shade fabric',
    'HS Studio By Hussnain on Pexels',
    800,
    800
  ),
  rollerTile: asset(
    unsplash('photo-1579034315349-c12e3ecbd3da'),
    'Window with a roller shade lowered behind a dark table, warm light glowing through the fabric',
    'Sebastian Herrmann on Unsplash',
    1600,
    1400
  ),
  rollerHero: asset(
    unsplash('photo-1549139730-104c10d8b879'),
    'White roller shade over a bright window',
    'Hannah Reinhardt on Unsplash',
    1600,
    2000
  ),
  dualTile: asset(
    pexels('37609127/pexels-photo-37609127.jpeg'),
    'Home office with banded dual shades over the window',
    '𝐏𝐀𝐍𝐎𝐑𝐈𝐍𝐀. on Pexels',
    1200,
    900
  ),
  dualHero: asset(
    pexels('9270061/pexels-photo-9270061.jpeg'),
    'Minimal interior with banded shades casting soft stripes of light',
    'Ella Wei on Pexels',
    1600,
    2000
  ),
  honeycombTile: asset(
    pexels('10096397/pexels-photo-10096397.jpeg'),
    'Pleated shade glowing with afternoon sunlight',
    'Диана Дунаева on Pexels',
    1200,
    900
  ),
  honeycombHero: asset(
    unsplash('photo-1591023960271-e21375bfb9cf'),
    'Soft white pleated fabric catching diffused light',
    'Elena Putina on Unsplash',
    1600,
    2000
  ),
  specDetail: asset(
    pexels('19166538/pexels-photo-19166538.jpeg'),
    'Detail of horizontal shade layers in raking light',
    'Jan van der Wolf on Pexels',
    1200,
    1500
  ),
  phantomPortrait: asset(
    pexels('29592284/pexels-photo-29592284.jpeg'),
    'Open doorway leading from a shaded interior out to a lush garden patio',
    'Lydia Griva on Pexels',
    1200,
    1600
  ),
  phantomHero: asset(
    pexels('27770697/pexels-photo-27770697.jpeg'),
    'Bright sitting room with wide doors open to a green garden',
    'Dave H on Pexels',
    1600,
    2000
  ),
  quotePanel: asset(
    unsplash('photo-1617614649797-16d75555a2bc'),
    'Warm sunlight and soft shadows across a plain plaster wall',
    'John Ettema on Unsplash',
    1400,
    1600
  ),
  aboutHero: asset(
    pexels('3284980/pexels-photo-3284980.png'),
    'Sunlit empty room with tall windows and warm wood floors',
    'Curtis Adams on Pexels',
    1600,
    2000
  ),
  aboutStory: asset(
    pexels('13242404/pexels-photo-13242404.jpeg'),
    'Warm-toned sheer curtain with leaf shadows on the wall',
    'Ece Ebrar TOYCU on Pexels',
    1000,
    1300
  )
} satisfies Record<string, ImageAsset>;
