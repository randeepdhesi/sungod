const toRad = (deg: number) => (deg * Math.PI) / 180;
const round = (n: number) => Math.round(n * 100) / 100;

/** Point at radius r and angle deg (0 = east, 90 = north) around (cx, cy) in SVG space. */
export function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  return [round(cx + r * Math.cos(toRad(deg))), round(cy - r * Math.sin(toRad(deg)))];
}

/** Tapered ray polygon points: wide base at rInner, sharp tip at rOuter. */
export function taperedRay(
  cx: number,
  cy: number,
  deg: number,
  rInner: number,
  rOuter: number,
  halfWidth: number
): string {
  const [bx, by] = polar(cx, cy, rInner, deg);
  const [tx, ty] = polar(cx, cy, rOuter, deg);
  const px = Math.sin(toRad(deg)) * halfWidth;
  const py = Math.cos(toRad(deg)) * halfWidth;
  return `${round(bx - px)},${round(by - py)} ${tx},${ty} ${round(bx + px)},${round(by + py)}`;
}

export interface RadialLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Evenly spaced radial lines, alternating long and short. */
export function radialLines(
  cx: number,
  cy: number,
  count: number,
  rInner: number,
  rLong: number,
  rShort: number
): RadialLine[] {
  return Array.from({ length: count }, (_, i) => {
    const deg = 90 - (360 / count) * i;
    const [x1, y1] = polar(cx, cy, rInner, deg);
    const [x2, y2] = polar(cx, cy, i % 2 === 0 ? rLong : rShort, deg);
    return { x1, y1, x2, y2 };
  });
}
