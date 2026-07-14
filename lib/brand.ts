function hexToRgb(hex: string): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return '46 123 255';
  return `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}`;
}

const color      = process.env.NEXT_PUBLIC_BRAND_COLOR       ?? '#2e7bff';
const colorLight = process.env.NEXT_PUBLIC_BRAND_COLOR_LIGHT ?? '#7db0ff';

export const brand = {
  name:          process.env.NEXT_PUBLIC_BRAND_NAME         ?? 'Savaget',
  complement:    process.env.NEXT_PUBLIC_BRAND_COMPLEMENT   ?? 'INFO',
  initials:      process.env.NEXT_PUBLIC_BRAND_INITIALS     ?? 'SI',
  color,
  colorStrong:   process.env.NEXT_PUBLIC_BRAND_COLOR_STRONG ?? '#3d87ff',
  colorLight,
  colorRgb:      hexToRgb(color),
  colorLightRgb: hexToRgb(colorLight),
  hueRotate:     Number(process.env.NEXT_PUBLIC_BRAND_HUE_ROTATE ?? '0'),
  url:           process.env.NEXT_PUBLIC_BRAND_URL          ?? 'https://savaget.info',
  email:         process.env.NEXT_PUBLIC_BRAND_EMAIL        ?? 'contato@savaget.info',
  founded:       process.env.NEXT_PUBLIC_BRAND_FOUNDED      ?? '2020',
  description:   process.env.NEXT_PUBLIC_BRAND_DESCRIPTION
                   ?? 'Sua loja de informática completa.',
} as const;

export const colorometria = {
  hue:        Number(process.env.NEXT_PUBLIC_COLOROMETRIA_HUE        ?? '0'),
  brightness: Number(process.env.NEXT_PUBLIC_COLOROMETRIA_BRIGHTNESS ?? '100'),
  contrast:   Number(process.env.NEXT_PUBLIC_COLOROMETRIA_CONTRAST   ?? '100'),
  saturate:   Number(process.env.NEXT_PUBLIC_COLOROMETRIA_SATURATE   ?? '100'),
  grayscale:  Number(process.env.NEXT_PUBLIC_COLOROMETRIA_GRAYSCALE  ?? '0'),
  sepia:      Number(process.env.NEXT_PUBLIC_COLOROMETRIA_SEPIA      ?? '0'),
  invert:     Number(process.env.NEXT_PUBLIC_COLOROMETRIA_INVERT     ?? '0'),
  blur:       Number(process.env.NEXT_PUBLIC_COLOROMETRIA_BLUR       ?? '0'),
} as const;

export const colorometriaFilter =
  `hue-rotate(${colorometria.hue}deg) ` +
  `brightness(${colorometria.brightness}%) ` +
  `contrast(${colorometria.contrast}%) ` +
  `saturate(${colorometria.saturate}%) ` +
  `grayscale(${colorometria.grayscale}%) ` +
  `sepia(${colorometria.sepia}%) ` +
  `invert(${colorometria.invert}%) ` +
  `blur(${colorometria.blur}px)`;
