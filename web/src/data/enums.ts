export type ProductSlug =
  | 'motorized-roller-shades'
  | 'motorized-dual-shades'
  | 'motorized-honeycomb-shades';

export type InterestValue = ProductSlug | 'phantom-door-screens' | 'not-sure';

export type SectionTone = 'lace' | 'band' | 'graphite';
export type SectionPad = 'none' | 'sm' | 'md' | 'lg';

export type ButtonVariant = 'primary' | 'ghost' | 'link';
export type ButtonSize = 'md' | 'lg';

export type LogoVariant = 'full' | 'mark' | 'compact';
export type LogoTone = 'light' | 'dark';

export type ControlKind = 'remote' | 'wall-switch' | 'app' | 'voice' | 'schedule';

/** 4 = most light through, 1 = darkest */
export type LightLevel = 1 | 2 | 3 | 4;

export type HeadingLevel = 'h1' | 'h2' | 'h3';
