/** '604.720.5471' -> '+16047205471' */
export const formatTel = (display: string) => `+1${display.replace(/\D/g, '')}`;

/** 'v6b1a1' -> 'V6B 1A1' */
export const normalizePostal = (value: string) =>
  value
    .toUpperCase()
    .replace(/[\s-]+/g, '')
    .replace(/^(.{3})(.{3})$/, '$1 $2');

export const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
export const PHONE_RE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const pageTitle = (title?: string) =>
  title ? `${title} | Sungod Blinds` : 'Sungod Blinds | Motorized Blinds & Shades in Vancouver';
