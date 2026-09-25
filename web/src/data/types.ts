import type { ControlKind, InterestValue, LightLevel, ProductSlug } from './enums';

export interface ImageAsset {
  /** Builds a CDN URL at the requested pixel width */
  srcFor: (width: number) => string;
  alt: string;
  width: number;
  height: number;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface OptionRow {
  name: string;
  description: string;
  level?: LightLevel;
}

export interface Spec {
  label: string;
  value: string;
  /** true = placeholder value, confirm with the client */
  confirm?: boolean;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  shortName: string;
  titleLines: string[];
  tagline: string;
  summary: string;
  /** Factual one-line distinction used by the home collection index. */
  homeDescription: string;
  seoDescription: string;
  heroImage: ImageAsset;
  tileImage: ImageAsset;
  benefits: [Benefit, Benefit, Benefit];
  opacities: OptionRow[];
  controls: ControlKind[];
  specs: Spec[];
  order: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface LinkAction {
  label: string;
  href: string;
}

export interface ControlOption {
  kind: ControlKind;
  label: string;
  body: string;
  icon: string;
}

export interface LogoConcept {
  id: 'A' | 'B' | 'C';
  name: string;
  rationale: string;
  component: 'horizon' | 'slatted' | 'radiant';
}

export interface PaletteSwatch {
  name: string;
  hex: string;
  token: string;
  role: string;
}

export interface InterestOption {
  value: InterestValue;
  label: string;
}
