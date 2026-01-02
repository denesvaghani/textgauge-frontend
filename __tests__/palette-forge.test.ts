import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  calculateContrast,
  getWCAGRating,
  generateColorScale,
  getTextColorForBackground,
  detectColorHarmony,
} from '../src/lib/palette-forge/colorUtils';
import { generateTokens } from '../src/lib/palette-forge/tokenGenerator';
import {
  exportToCSS,
  exportToTailwind,
  exportToSCSS,
  exportToJSON,
} from '../src/lib/palette-forge/exportFormats';
import type { ExtractedColor } from '../src/lib/palette-forge/colorExtractor';

// ==================== Color Utils Tests ====================
describe('Color Utilities', () => {
  describe('hexToRgb', () => {
    it('converts hex to RGB correctly', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('handles lowercase hex', () => {
      expect(hexToRgb('#ff5500')).toEqual({ r: 255, g: 85, b: 0 });
    });

    it('handles hex without hash', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });
  });

  describe('rgbToHex', () => {
    it('converts RGB to hex correctly', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
    });

    it('pads single digit hex values', () => {
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
      expect(rgbToHex({ r: 15, g: 15, b: 15 })).toBe('#0f0f0f');
    });
  });

  describe('rgbToHsl', () => {
    it('converts RGB to HSL correctly', () => {
      const red = rgbToHsl({ r: 255, g: 0, b: 0 });
      expect(red.h).toBe(0);
      expect(red.s).toBe(100);
      expect(red.l).toBe(50);

      const green = rgbToHsl({ r: 0, g: 255, b: 0 });
      expect(green.h).toBe(120);

      const blue = rgbToHsl({ r: 0, g: 0, b: 255 });
      expect(blue.h).toBe(240);
    });

    it('handles grayscale colors', () => {
      const gray = rgbToHsl({ r: 128, g: 128, b: 128 });
      expect(gray.s).toBe(0);
    });
  });

  describe('hslToRgb', () => {
    it('converts HSL to RGB correctly', () => {
      expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 });
      expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('handles grayscale', () => {
      const gray = hslToRgb({ h: 0, s: 0, l: 50 });
      expect(gray.r).toBe(gray.g);
      expect(gray.g).toBe(gray.b);
    });
  });

  describe('calculateContrast', () => {
    it('calculates WCAG contrast ratio correctly', () => {
      // Black on white should be 21:1 (max contrast)
      const blackWhite = calculateContrast('#000000', '#FFFFFF');
      expect(blackWhite).toBeCloseTo(21, 0);

      // Same color should be 1:1
      const same = calculateContrast('#FF0000', '#FF0000');
      expect(same).toBeCloseTo(1, 0);
    });

    it('returns same value regardless of order', () => {
      const contrast1 = calculateContrast('#000000', '#FFFFFF');
      const contrast2 = calculateContrast('#FFFFFF', '#000000');
      expect(contrast1).toBeCloseTo(contrast2, 5);
    });
  });

  describe('getWCAGRating', () => {
    it('returns AAA for contrast >= 7', () => {
      expect(getWCAGRating(7)).toBe('AAA');
      expect(getWCAGRating(21)).toBe('AAA');
    });

    it('returns AA for contrast >= 4.5 and < 7', () => {
      expect(getWCAGRating(4.5)).toBe('AA');
      expect(getWCAGRating(6.9)).toBe('AA');
    });

    it('returns Fail for contrast < 4.5', () => {
      expect(getWCAGRating(4.4)).toBe('Fail');
      expect(getWCAGRating(1)).toBe('Fail');
    });
  });

  describe('generateColorScale', () => {
    it('generates 11 shades (50-950)', () => {
      const scale = generateColorScale('#8B5CF6');
      expect(Object.keys(scale)).toHaveLength(11);
      expect(scale['50']).toBeDefined();
      expect(scale['500']).toBeDefined();
      expect(scale['950']).toBeDefined();
    });

    it('generates valid hex colors', () => {
      const scale = generateColorScale('#3B82F6');
      for (const shade of Object.values(scale)) {
        expect(shade).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });

    it('creates lighter shades for lower numbers', () => {
      const scale = generateColorScale('#3B82F6');
      // 50 should be lighter than 950
      const rgb50 = hexToRgb(scale['50']);
      const rgb950 = hexToRgb(scale['950']);
      const brightness50 = (rgb50.r + rgb50.g + rgb50.b) / 3;
      const brightness950 = (rgb950.r + rgb950.g + rgb950.b) / 3;
      expect(brightness50).toBeGreaterThan(brightness950);
    });
  });

  describe('getTextColorForBackground', () => {
    it('returns white for dark backgrounds', () => {
      expect(getTextColorForBackground('#000000')).toBe('#FFFFFF');
      expect(getTextColorForBackground('#1a1a1a')).toBe('#FFFFFF');
    });

    it('returns black for light backgrounds', () => {
      expect(getTextColorForBackground('#FFFFFF')).toBe('#000000');
      expect(getTextColorForBackground('#f0f0f0')).toBe('#000000');
    });
  });

  describe('detectColorHarmony', () => {
    it('detects monochromatic palettes', () => {
      const result = detectColorHarmony(['#FF0000', '#FF1010', '#FF2020']);
      expect(result.type).toBe('Monochromatic');
    });

    it('returns 100 score for single color', () => {
      const result = detectColorHarmony(['#FF0000']);
      expect(result.score).toBe(100);
    });
  });
});

// ==================== Token Generator Tests ====================
describe('Token Generator', () => {
  const mockColors: ExtractedColor[] = [
    {
      hex: '#8B5CF6',
      rgb: { r: 139, g: 92, b: 246 },
      hsl: { h: 263, s: 89, l: 66 },
      population: 30,
      name: 'Vivid Purple',
      role: 'primary',
    },
    {
      hex: '#6366F1',
      rgb: { r: 99, g: 102, b: 241 },
      hsl: { h: 239, s: 84, l: 67 },
      population: 25,
      name: 'Indigo',
      role: 'secondary',
    },
    {
      hex: '#94A3B8',
      rgb: { r: 148, g: 163, b: 184 },
      hsl: { h: 215, s: 20, l: 65 },
      population: 45,
      name: 'Gray',
      role: 'neutral',
    },
  ];

  describe('generateTokens', () => {
    it('generates all three token layers', () => {
      const tokens = generateTokens(mockColors);
      expect(tokens.primitive).toBeDefined();
      expect(tokens.semantic).toBeDefined();
      expect(tokens.component).toBeDefined();
    });

    it('generates primitive tokens with color scales', () => {
      const tokens = generateTokens(mockColors);
      // Should have base colors and scales
      expect(Object.keys(tokens.primitive).length).toBeGreaterThan(3);
      // Check for scale tokens
      const hasScaleTokens = Object.keys(tokens.primitive).some(k => k.includes('-500'));
      expect(hasScaleTokens).toBe(true);
    });

    it('generates semantic tokens for primary color', () => {
      const tokens = generateTokens(mockColors);
      expect(tokens.semantic['--color-primary']).toBe('#8B5CF6');
      expect(tokens.semantic['--color-primary-light']).toBeDefined();
      expect(tokens.semantic['--color-primary-dark']).toBeDefined();
    });

    it('generates component tokens for buttons', () => {
      const tokens = generateTokens(mockColors);
      expect(tokens.component['--button-primary-bg']).toBe('#8B5CF6');
      expect(tokens.component['--button-primary-text']).toBeDefined();
    });
  });
});

// ==================== Export Formats Tests ====================
describe('Export Formats', () => {
  const mockTokens = {
    primitive: {
      '--color-purple': '#8B5CF6',
      '--color-purple-500': '#8B5CF6',
    },
    semantic: {
      '--color-primary': '#8B5CF6',
      '--color-text-primary': '#1a1a1a',
    },
    component: {
      '--button-primary-bg': '#8B5CF6',
    },
  };

  const mockColors: ExtractedColor[] = [
    {
      hex: '#8B5CF6',
      rgb: { r: 139, g: 92, b: 246 },
      hsl: { h: 263, s: 89, l: 66 },
      population: 100,
      name: 'Purple',
      role: 'primary',
    },
  ];

  describe('exportToCSS', () => {
    it('generates valid CSS variables', () => {
      const css = exportToCSS(mockTokens);
      expect(css).toContain(':root {');
      expect(css).toContain('--color-primary: #8B5CF6;');
      expect(css).toContain('}');
    });

    it('includes all token layers', () => {
      const css = exportToCSS(mockTokens);
      expect(css).toContain('--color-purple');
      expect(css).toContain('--color-primary');
      expect(css).toContain('--button-primary-bg');
    });
  });

  describe('exportToTailwind', () => {
    it('generates valid Tailwind config structure', () => {
      const config = exportToTailwind(mockColors);
      expect(config).toContain('module.exports');
      expect(config).toContain('theme:');
      expect(config).toContain('colors:');
    });

    it('includes color scales', () => {
      const config = exportToTailwind(mockColors);
      expect(config).toContain('500:');
      expect(config).toContain('DEFAULT:');
    });
  });

  describe('exportToSCSS', () => {
    it('generates valid SCSS variables', () => {
      const scss = exportToSCSS(mockTokens);
      expect(scss).toContain('$color-primary: #8B5CF6;');
      expect(scss).toContain('$button-primary-bg: #8B5CF6;');
    });
  });

  describe('exportToJSON', () => {
    it('generates valid JSON', () => {
      const json = exportToJSON(mockColors);
      const parsed = JSON.parse(json);
      expect(parsed.color).toBeDefined();
    });

    it('includes color scales in Style Dictionary format', () => {
      const json = exportToJSON(mockColors);
      const parsed = JSON.parse(json);
      const colorName = Object.keys(parsed.color)[0];
      expect(parsed.color[colorName]['500'].value).toBeDefined();
      expect(parsed.color[colorName]['500'].type).toBe('color');
    });
  });
});
