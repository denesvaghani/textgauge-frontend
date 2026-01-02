/**
 * Color utility functions for PaletteForge
 * Handles color conversions, WCAG contrast calculations, and scale generation
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export type WCAGRating = 'AAA' | 'AA' | 'Fail';

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (c: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Calculate relative luminance per WCAG 2.1
 */
export function relativeLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate WCAG contrast ratio between two colors
 */
export function calculateContrast(color1: string, color2: string): number {
  const l1 = relativeLuminance(hexToRgb(color1));
  const l2 = relativeLuminance(hexToRgb(color2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get WCAG rating based on contrast ratio
 * AAA: >= 7:1, AA: >= 4.5:1, Fail: < 4.5:1
 */
export function getWCAGRating(contrast: number): WCAGRating {
  if (contrast >= 7) return 'AAA';
  if (contrast >= 4.5) return 'AA';
  return 'Fail';
}

/**
 * Generate a Tailwind-style color scale (50-950) from a base color
 */
export function generateColorScale(baseColor: string): ColorScale {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb);

  // Lightness values for each scale step (perceptually uniform)
  const lightnessMap: Record<keyof ColorScale, number> = {
    50: 97,
    100: 94,
    200: 86,
    300: 76,
    400: 64,
    500: 50,
    600: 42,
    700: 34,
    800: 26,
    900: 18,
    950: 10,
  };

  // Saturation adjustments (slightly reduce at extremes)
  const saturationMap: Record<keyof ColorScale, number> = {
    50: Math.max(hsl.s - 10, 10),
    100: Math.max(hsl.s - 5, 15),
    200: hsl.s,
    300: hsl.s,
    400: Math.min(hsl.s + 5, 100),
    500: Math.min(hsl.s + 10, 100),
    600: Math.min(hsl.s + 8, 100),
    700: Math.min(hsl.s + 5, 100),
    800: hsl.s,
    900: Math.max(hsl.s - 5, 20),
    950: Math.max(hsl.s - 10, 20),
  };

  const scale: ColorScale = {} as ColorScale;
  
  const scaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
  
  for (const k of scaleKeys) {
    const newHsl: HSL = {
      h: hsl.h,
      s: saturationMap[k],
      l: lightnessMap[k],
    };
    scale[k] = rgbToHex(hslToRgb(newHsl));
  }

  return scale;
}

/**
 * Generate a dark mode variant of a color
 */
export function generateDarkVariant(color: string): string {
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb);
  
  // For light colors, darken significantly
  // For dark colors, lighten slightly
  let newLightness: number;
  if (hsl.l > 50) {
    newLightness = Math.max(hsl.l - 40, 20);
  } else {
    newLightness = Math.min(hsl.l + 20, 70);
  }
  
  const newHsl: HSL = {
    h: hsl.h,
    s: Math.min(hsl.s + 10, 100),
    l: newLightness,
  };
  
  return rgbToHex(hslToRgb(newHsl));
}

/**
 * Determine the perceived brightness of a color (0-255)
 */
export function getPerceivedBrightness(color: string): number {
  const rgb = hexToRgb(color);
  // Using the formula for perceived luminance
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

/**
 * Determine if text on this background should be light or dark
 */
export function shouldUseLightText(backgroundColor: string): boolean {
  return getPerceivedBrightness(backgroundColor) < 128;
}

/**
 * Get suggested text color for a background
 */
export function getTextColorForBackground(backgroundColor: string): string {
  return shouldUseLightText(backgroundColor) ? '#FFFFFF' : '#000000';
}

/**
 * Color harmony types
 */
export type HarmonyType = 
  | 'Monochromatic'
  | 'Analogous'
  | 'Complementary'
  | 'Split-Complementary'
  | 'Triadic'
  | 'Tetradic'
  | 'Mixed';

/**
 * Detect color harmony type from a set of colors
 */
export function detectColorHarmony(colors: string[]): { type: HarmonyType; score: number } {
  if (colors.length < 2) {
    return { type: 'Monochromatic', score: 100 };
  }

  const hues = colors.map(c => rgbToHsl(hexToRgb(c)).h);
  const hueDiffs: number[] = [];
  
  for (let i = 0; i < hues.length; i++) {
    for (let j = i + 1; j < hues.length; j++) {
      let diff = Math.abs(hues[i] - hues[j]);
      if (diff > 180) diff = 360 - diff;
      hueDiffs.push(diff);
    }
  }

  const avgDiff = hueDiffs.reduce((a, b) => a + b, 0) / hueDiffs.length;
  const maxDiff = Math.max(...hueDiffs);
  const minDiff = Math.min(...hueDiffs);

  // Monochromatic: all hues within 15°
  if (maxDiff <= 15) {
    return { type: 'Monochromatic', score: 100 - maxDiff };
  }

  // Analogous: hues within 60° of each other
  if (maxDiff <= 60) {
    return { type: 'Analogous', score: 90 - (maxDiff - 30) };
  }

  // Complementary: two main hues ~180° apart
  if (hueDiffs.some(d => d >= 150 && d <= 180)) {
    return { type: 'Complementary', score: 85 };
  }

  // Triadic: three hues ~120° apart
  if (colors.length >= 3 && avgDiff >= 100 && avgDiff <= 140) {
    return { type: 'Triadic', score: 80 };
  }

  // Split-Complementary
  if (maxDiff >= 150 && minDiff >= 20 && minDiff <= 60) {
    return { type: 'Split-Complementary', score: 75 };
  }

  // Tetradic: four colors forming a rectangle
  if (colors.length >= 4 && avgDiff >= 70 && avgDiff <= 100) {
    return { type: 'Tetradic', score: 70 };
  }

  return { type: 'Mixed', score: 60 };
}
