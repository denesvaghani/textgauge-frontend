/**
 * Token generation for design systems
 * Creates primitive, semantic, and component-level tokens
 */

import type { ExtractedColor } from './colorExtractor';
import { generateColorScale, type ColorScale } from './colorUtils';

export interface TokenLayers {
  primitive: Record<string, string>;
  semantic: Record<string, string>;
  component: Record<string, string>;
}

export interface ColorWithScale extends ExtractedColor {
  scale: ColorScale;
}

/**
 * Generate all three layers of tokens from extracted colors
 */
export function generateTokens(colors: ExtractedColor[]): TokenLayers {
  const colorsWithScales = colors.map(color => ({
    ...color,
    scale: generateColorScale(color.hex),
  }));

  return {
    primitive: generatePrimitiveTokens(colorsWithScales),
    semantic: generateSemanticTokens(colorsWithScales),
    component: generateComponentTokens(colorsWithScales),
  };
}

/**
 * Generate color scales for all extracted colors
 */
export function generateColorScales(colors: ExtractedColor[]): ColorWithScale[] {
  return colors.map(color => ({
    ...color,
    scale: generateColorScale(color.hex),
  }));
}

/**
 * Convert color name to a valid CSS variable name
 */
function toTokenName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Generate primitive layer tokens (raw color values)
 * Format: --color-{name}-{shade}
 */
function generatePrimitiveTokens(colors: ColorWithScale[]): Record<string, string> {
  const tokens: Record<string, string> = {};

  colors.forEach((color, index) => {
    const baseName = toTokenName(color.name) || `color-${index + 1}`;
    
    // Add base color
    tokens[`--color-${baseName}`] = color.hex;
    
    // Add all scale values
    const scaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
    for (const shade of scaleKeys) {
      tokens[`--color-${baseName}-${shade}`] = color.scale[shade];
    }
  });

  return tokens;
}

/**
 * Generate semantic layer tokens (purpose-based)
 * Format: --color-{purpose}
 */
function generateSemanticTokens(colors: ColorWithScale[]): Record<string, string> {
  const tokens: Record<string, string> = {};

  // Find colors by role
  const primary = colors.find(c => c.role === 'primary');
  const secondary = colors.find(c => c.role === 'secondary');
  const accent = colors.find(c => c.role === 'accent');
  const neutral = colors.find(c => c.role === 'neutral');
  const background = colors.find(c => c.role === 'background');

  // Primary colors
  if (primary) {
    tokens['--color-primary'] = primary.hex;
    tokens['--color-primary-light'] = primary.scale['300'];
    tokens['--color-primary-dark'] = primary.scale['700'];
    tokens['--color-primary-foreground'] = primary.scale['50'];
  }

  // Secondary colors
  if (secondary) {
    tokens['--color-secondary'] = secondary.hex;
    tokens['--color-secondary-light'] = secondary.scale['300'];
    tokens['--color-secondary-dark'] = secondary.scale['700'];
    tokens['--color-secondary-foreground'] = secondary.scale['50'];
  } else if (primary) {
    // Generate secondary from primary if not found
    tokens['--color-secondary'] = primary.scale['600'];
    tokens['--color-secondary-light'] = primary.scale['400'];
    tokens['--color-secondary-dark'] = primary.scale['800'];
  }

  // Accent colors
  if (accent) {
    tokens['--color-accent'] = accent.hex;
    tokens['--color-accent-light'] = accent.scale['300'];
    tokens['--color-accent-dark'] = accent.scale['700'];
    tokens['--color-accent-foreground'] = accent.scale['950'];
  }

  // Text colors
  const textSource = neutral || colors[colors.length - 1];
  if (textSource) {
    tokens['--color-text-primary'] = textSource.scale['900'];
    tokens['--color-text-secondary'] = textSource.scale['600'];
    tokens['--color-text-muted'] = textSource.scale['400'];
    tokens['--color-text-inverse'] = textSource.scale['50'];
  }

  // Background colors
  const bgSource = background || neutral || colors[colors.length - 1];
  if (bgSource) {
    tokens['--color-bg-primary'] = bgSource.scale['50'];
    tokens['--color-bg-secondary'] = bgSource.scale['100'];
    tokens['--color-bg-tertiary'] = bgSource.scale['200'];
    tokens['--color-bg-inverse'] = bgSource.scale['900'];
  }

  // Border colors
  if (textSource) {
    tokens['--color-border-primary'] = textSource.scale['200'];
    tokens['--color-border-secondary'] = textSource.scale['300'];
    tokens['--color-border-focus'] = primary?.hex || textSource.scale['500'];
  }

  // Status colors (derive from existing or use defaults)
  tokens['--color-success'] = '#10B981';
  tokens['--color-warning'] = '#F59E0B';
  tokens['--color-error'] = '#EF4444';
  tokens['--color-info'] = '#3B82F6';

  return tokens;
}

/**
 * Generate component layer tokens (UI-specific)
 * Format: --{component}-{property}
 */
function generateComponentTokens(colors: ColorWithScale[]): Record<string, string> {
  const tokens: Record<string, string> = {};

  const primary = colors.find(c => c.role === 'primary');
  const secondary = colors.find(c => c.role === 'secondary');
  const neutral = colors.find(c => c.role === 'neutral') || colors[colors.length - 1];

  // Button tokens
  if (primary) {
    tokens['--button-primary-bg'] = primary.hex;
    tokens['--button-primary-bg-hover'] = primary.scale['600'];
    tokens['--button-primary-bg-active'] = primary.scale['700'];
    tokens['--button-primary-text'] = primary.scale['50'];
    tokens['--button-primary-border'] = primary.hex;
  }

  if (secondary) {
    tokens['--button-secondary-bg'] = secondary.scale['100'];
    tokens['--button-secondary-bg-hover'] = secondary.scale['200'];
    tokens['--button-secondary-text'] = secondary.scale['700'];
    tokens['--button-secondary-border'] = secondary.scale['300'];
  }

  if (neutral) {
    tokens['--button-ghost-bg'] = 'transparent';
    tokens['--button-ghost-bg-hover'] = neutral.scale['100'];
    tokens['--button-ghost-text'] = neutral.scale['700'];
  }

  // Input tokens
  if (neutral && primary) {
    tokens['--input-bg'] = neutral.scale['50'];
    tokens['--input-bg-disabled'] = neutral.scale['100'];
    tokens['--input-border'] = neutral.scale['300'];
    tokens['--input-border-hover'] = neutral.scale['400'];
    tokens['--input-border-focus'] = primary.hex;
    tokens['--input-text'] = neutral.scale['900'];
    tokens['--input-placeholder'] = neutral.scale['400'];
    tokens['--input-ring'] = `${primary.hex}33`; // with alpha
  }

  // Card tokens
  if (neutral) {
    tokens['--card-bg'] = '#FFFFFF';
    tokens['--card-bg-hover'] = neutral.scale['50'];
    tokens['--card-border'] = neutral.scale['200'];
    tokens['--card-shadow'] = 'rgba(0, 0, 0, 0.1)';
  }

  // Badge tokens
  if (primary && secondary) {
    tokens['--badge-primary-bg'] = primary.scale['100'];
    tokens['--badge-primary-text'] = primary.scale['700'];
    tokens['--badge-secondary-bg'] = secondary.scale['100'];
    tokens['--badge-secondary-text'] = secondary.scale['700'];
  }

  // Link tokens
  if (primary) {
    tokens['--link-color'] = primary.hex;
    tokens['--link-color-hover'] = primary.scale['600'];
    tokens['--link-color-visited'] = primary.scale['700'];
  }

  // Navigation tokens
  if (neutral && primary) {
    tokens['--nav-bg'] = '#FFFFFF';
    tokens['--nav-border'] = neutral.scale['200'];
    tokens['--nav-item-text'] = neutral.scale['700'];
    tokens['--nav-item-text-hover'] = neutral.scale['900'];
    tokens['--nav-item-text-active'] = primary.hex;
    tokens['--nav-item-bg-hover'] = neutral.scale['100'];
    tokens['--nav-item-bg-active'] = primary.scale['50'];
  }

  return tokens;
}

/**
 * Get all token names for a layer
 */
export function getTokenNames(layer: keyof TokenLayers, tokens: TokenLayers): string[] {
  return Object.keys(tokens[layer]);
}

/**
 * Count tokens in each layer
 */
export function countTokens(tokens: TokenLayers): { primitive: number; semantic: number; component: number } {
  return {
    primitive: Object.keys(tokens.primitive).length,
    semantic: Object.keys(tokens.semantic).length,
    component: Object.keys(tokens.component).length,
  };
}
