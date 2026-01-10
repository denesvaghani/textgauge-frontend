/**
 * Export formats for design tokens
 * Supports CSS Variables, Tailwind, SCSS, JSON, and more
 */

import type { TokenLayers } from './tokenGenerator';
import type { ExtractedColor } from './colorExtractor';
import { generateColorScale } from './colorUtils';

export type ExportFormat = 'css' | 'tailwind' | 'scss' | 'json' | 'figma' | 'tokens-studio';

/**
 * Export tokens to CSS Variables
 */
export function exportToCSS(tokens: TokenLayers, includeComments = true): string {
  const lines: string[] = [];
  
  lines.push(':root {');
  
  // Primitive tokens
  if (includeComments) {
    lines.push('  /* Primitive Tokens */');
  }
  for (const [name, value] of Object.entries(tokens.primitive)) {
    lines.push(`  ${name}: ${value};`);
  }
  
  lines.push('');
  
  // Semantic tokens
  if (includeComments) {
    lines.push('  /* Semantic Tokens */');
  }
  for (const [name, value] of Object.entries(tokens.semantic)) {
    lines.push(`  ${name}: ${value};`);
  }
  
  lines.push('');
  
  // Component tokens
  if (includeComments) {
    lines.push('  /* Component Tokens */');
  }
  for (const [name, value] of Object.entries(tokens.component)) {
    lines.push(`  ${name}: ${value};`);
  }
  
  lines.push('}');
  
  return lines.join('\n');
}

/**
 * Export tokens to Tailwind CSS config
 */
export function exportToTailwind(colors: ExtractedColor[]): string {
  const tailwindColors: Record<string, Record<string, string>> = {};
  
  colors.forEach((color) => {
    const name = color.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || 'color';
    
    const scale = generateColorScale(color.hex);
    tailwindColors[name] = {
      '50': scale['50'],
      '100': scale['100'],
      '200': scale['200'],
      '300': scale['300'],
      '400': scale['400'],
      '500': scale['500'],
      '600': scale['600'],
      '700': scale['700'],
      '800': scale['800'],
      '900': scale['900'],
      '950': scale['950'],
      DEFAULT: color.hex,
    };
  });
  
  const config = {
    theme: {
      extend: {
        colors: tailwindColors,
      },
    },
  };
  
  return `// tailwind.config.js
module.exports = ${JSON.stringify(config, null, 2).replace(/"([^"]+)":/g, '$1:')}`;
}

/**
 * Export tokens to SCSS Variables
 */
export function exportToSCSS(tokens: TokenLayers): string {
  const lines: string[] = [];
  
  lines.push('// Primitive Tokens');
  for (const [name, value] of Object.entries(tokens.primitive)) {
    const scssName = name.replace('--', '$');
    lines.push(`${scssName}: ${value};`);
  }
  
  lines.push('');
  lines.push('// Semantic Tokens');
  for (const [name, value] of Object.entries(tokens.semantic)) {
    const scssName = name.replace('--', '$');
    lines.push(`${scssName}: ${value};`);
  }
  
  lines.push('');
  lines.push('// Component Tokens');
  for (const [name, value] of Object.entries(tokens.component)) {
    const scssName = name.replace('--', '$');
    lines.push(`${scssName}: ${value};`);
  }
  
  return lines.join('\n');
}

/**
 * Export tokens to JSON (Style Dictionary format)
 */
export function exportToJSON(colors: ExtractedColor[]): string {
  const styleDictionary: Record<string, unknown> = {
    color: {},
  };
  
  colors.forEach((color) => {
    const name = color.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || 'color';
    
    const scale = generateColorScale(color.hex);
    
    (styleDictionary.color as Record<string, unknown>)[name] = {
      '50': { value: scale['50'], type: 'color' },
      '100': { value: scale['100'], type: 'color' },
      '200': { value: scale['200'], type: 'color' },
      '300': { value: scale['300'], type: 'color' },
      '400': { value: scale['400'], type: 'color' },
      '500': { value: scale['500'], type: 'color' },
      '600': { value: scale['600'], type: 'color' },
      '700': { value: scale['700'], type: 'color' },
      '800': { value: scale['800'], type: 'color' },
      '900': { value: scale['900'], type: 'color' },
      '950': { value: scale['950'], type: 'color' },
      base: { value: color.hex, type: 'color' },
    };
  });
  
  return JSON.stringify(styleDictionary, null, 2);
}

/**
 * Export tokens to Figma Variables format
 */
export function exportToFigma(colors: ExtractedColor[]): string {
  const figmaVariables: Array<{
    name: string;
    resolvedType: string;
    valuesByMode: Record<string, { r: number; g: number; b: number; a: number }>;
  }> = [];
  
  colors.forEach((color) => {
    const baseName = color.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || 'color';
    
    const scale = generateColorScale(color.hex);
    
    const scaleEntries = Object.entries(scale);
    for (const [shade, hex] of scaleEntries) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      figmaVariables.push({
        name: `color/${baseName}/${shade}`,
        resolvedType: 'COLOR',
        valuesByMode: {
          'Mode 1': { r, g, b, a: 1 },
        },
      });
    }
  });
  
  return JSON.stringify({ variables: figmaVariables }, null, 2);
}

/**
 * Export tokens to Tokens Studio format
 */
export function exportToTokensStudio(colors: ExtractedColor[]): string {
  const tokensStudio: Record<string, unknown> = {
    global: {
      colors: {},
    },
  };
  
  const colorsObj = (tokensStudio.global as Record<string, unknown>).colors as Record<string, unknown>;
  
  colors.forEach((color) => {
    const name = color.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || 'color';
    
    const scale = generateColorScale(color.hex);
    
    colorsObj[name] = {};
    const colorEntry = colorsObj[name] as Record<string, unknown>;
    
    const scaleEntries = Object.entries(scale);
    for (const [shade, hex] of scaleEntries) {
      colorEntry[shade] = {
        value: hex,
        type: 'color',
      };
    }
    
    colorEntry['base'] = {
      value: color.hex,
      type: 'color',
    };
  });
  
  return JSON.stringify(tokensStudio, null, 2);
}

/**
 * Export to selected format
 */
export function exportTokens(
  format: ExportFormat,
  colors: ExtractedColor[],
  tokens: TokenLayers
): string {
  switch (format) {
    case 'css':
      return exportToCSS(tokens);
    case 'tailwind':
      return exportToTailwind(colors);
    case 'scss':
      return exportToSCSS(tokens);
    case 'json':
      return exportToJSON(colors);
    case 'figma':
      return exportToFigma(colors);
    case 'tokens-studio':
      return exportToTokensStudio(colors);
    default:
      return exportToCSS(tokens);
  }
}

/**
 * Get file extension for export format
 */
export function getFileExtension(format: ExportFormat): string {
  switch (format) {
    case 'css':
      return '.css';
    case 'tailwind':
      return '.js';
    case 'scss':
      return '.scss';
    case 'json':
    case 'figma':
    case 'tokens-studio':
      return '.json';
    default:
      return '.txt';
  }
}

/**
 * Get MIME type for export format
 */
export function getMimeType(format: ExportFormat): string {
  switch (format) {
    case 'css':
      return 'text/css';
    case 'tailwind':
    case 'scss':
      return 'text/plain';
    case 'json':
    case 'figma':
    case 'tokens-studio':
      return 'application/json';
    default:
      return 'text/plain';
  }
}

/**
 * Download exported tokens as a file
 */
export function downloadTokens(
  format: ExportFormat,
  content: string,
  filename = 'palette-tokens'
): void {
  const extension = getFileExtension(format);
  const mimeType = getMimeType(format);
  
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
