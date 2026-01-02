/**
 * Color extraction from images using Canvas API
 * Implements median cut algorithm for dominant color extraction
 */

import { rgbToHex, rgbToHsl, type RGB, type HSL } from './colorUtils';

export interface ExtractedColor {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  population: number; // percentage of image
  name: string; // auto-generated name
  role?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'background';
}

interface ColorBox {
  colors: RGB[];
  volume: number;
}

/**
 * Extract dominant colors from an image file
 */
export async function extractColorsFromImage(
  file: File,
  colorCount: number = 8
): Promise<ExtractedColor[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    img.onload = () => {
      // Scale down large images for performance
      const maxSize = 200;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxSize) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width / height) * maxSize;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = getPixelColors(imageData);
      const dominantColors = medianCut(pixels, colorCount);
      
      const totalPixels = pixels.length;
      const extracted = dominantColors.map((color, index) => {
        const hex = rgbToHex(color.rgb);
        return {
          hex,
          rgb: color.rgb,
          hsl: rgbToHsl(color.rgb),
          population: Math.round((color.count / totalPixels) * 100),
          name: generateColorName(color.rgb),
          role: suggestColorRole(color.rgb, index, dominantColors.length),
        };
      });

      // Sort by perceived importance (combination of saturation and population)
      extracted.sort((a, b) => {
        const scoreA = a.population * (a.hsl.s / 100 + 0.5);
        const scoreB = b.population * (b.hsl.s / 100 + 0.5);
        return scoreB - scoreA;
      });

      resolve(extracted);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Get all pixel colors from image data
 */
function getPixelColors(imageData: ImageData): RGB[] {
  const pixels: RGB[] = [];
  const data = imageData.data;

  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip transparent pixels
    if (a < 128) continue;

    // Skip near-white and near-black pixels
    if ((r > 250 && g > 250 && b > 250) || (r < 5 && g < 5 && b < 5)) continue;

    pixels.push({ r, g, b });
  }

  return pixels;
}

/**
 * Median cut algorithm for color quantization
 */
function medianCut(
  pixels: RGB[],
  targetColors: number
): { rgb: RGB; count: number }[] {
  if (pixels.length === 0) {
    return [];
  }

  // Start with all pixels in one box
  const boxes: ColorBox[] = [
    {
      colors: pixels,
      volume: calculateVolume(pixels),
    },
  ];

  // Split boxes until we have enough
  while (boxes.length < targetColors) {
    // Find the box with the largest volume
    boxes.sort((a, b) => b.volume - a.volume);
    const boxToSplit = boxes.shift();
    
    if (!boxToSplit || boxToSplit.colors.length <= 1) break;

    // Find the axis with the largest range
    const axis = findLongestAxis(boxToSplit.colors);
    
    // Sort colors by that axis
    boxToSplit.colors.sort((a, b) => a[axis] - b[axis]);
    
    // Split at median
    const mid = Math.floor(boxToSplit.colors.length / 2);
    const left = boxToSplit.colors.slice(0, mid);
    const right = boxToSplit.colors.slice(mid);

    if (left.length > 0) {
      boxes.push({ colors: left, volume: calculateVolume(left) });
    }
    if (right.length > 0) {
      boxes.push({ colors: right, volume: calculateVolume(right) });
    }
  }

  // Get average color of each box
  return boxes.map((box) => ({
    rgb: averageColor(box.colors),
    count: box.colors.length,
  }));
}

/**
 * Calculate the volume of a color box in RGB space
 */
function calculateVolume(colors: RGB[]): number {
  if (colors.length === 0) return 0;
  
  let minR = 255, maxR = 0;
  let minG = 255, maxG = 0;
  let minB = 255, maxB = 0;

  for (const c of colors) {
    minR = Math.min(minR, c.r);
    maxR = Math.max(maxR, c.r);
    minG = Math.min(minG, c.g);
    maxG = Math.max(maxG, c.g);
    minB = Math.min(minB, c.b);
    maxB = Math.max(maxB, c.b);
  }

  return (maxR - minR) * (maxG - minG) * (maxB - minB);
}

/**
 * Find the RGB axis with the longest range
 */
function findLongestAxis(colors: RGB[]): 'r' | 'g' | 'b' {
  let minR = 255, maxR = 0;
  let minG = 255, maxG = 0;
  let minB = 255, maxB = 0;

  for (const c of colors) {
    minR = Math.min(minR, c.r);
    maxR = Math.max(maxR, c.r);
    minG = Math.min(minG, c.g);
    maxG = Math.max(maxG, c.g);
    minB = Math.min(minB, c.b);
    maxB = Math.max(maxB, c.b);
  }

  const rangeR = maxR - minR;
  const rangeG = maxG - minG;
  const rangeB = maxB - minB;

  if (rangeR >= rangeG && rangeR >= rangeB) return 'r';
  if (rangeG >= rangeR && rangeG >= rangeB) return 'g';
  return 'b';
}

/**
 * Calculate the average color of a set of pixels
 */
function averageColor(colors: RGB[]): RGB {
  if (colors.length === 0) return { r: 0, g: 0, b: 0 };
  
  let totalR = 0, totalG = 0, totalB = 0;
  
  for (const c of colors) {
    totalR += c.r;
    totalG += c.g;
    totalB += c.b;
  }

  return {
    r: Math.round(totalR / colors.length),
    g: Math.round(totalG / colors.length),
    b: Math.round(totalB / colors.length),
  };
}

/**
 * Generate a human-readable color name based on RGB
 */
function generateColorName(rgb: RGB): string {
  const hsl = rgbToHsl(rgb);
  const { h, s, l } = hsl;

  // Handle neutrals (low saturation)
  if (s < 10) {
    if (l < 15) return 'Charcoal';
    if (l < 30) return 'Dark Gray';
    if (l < 50) return 'Gray';
    if (l < 70) return 'Silver';
    if (l < 85) return 'Light Gray';
    return 'Off White';
  }

  // Handle very light colors
  if (l > 85) {
    if (h < 30 || h >= 330) return 'Blush';
    if (h < 60) return 'Cream';
    if (h < 90) return 'Mint';
    if (h < 150) return 'Seafoam';
    if (h < 210) return 'Ice Blue';
    if (h < 270) return 'Lavender';
    return 'Rose';
  }

  // Handle dark colors
  if (l < 20) {
    if (h < 30 || h >= 330) return 'Maroon';
    if (h < 60) return 'Brown';
    if (h < 150) return 'Forest';
    if (h < 270) return 'Navy';
    return 'Plum';
  }

  // Main hue names
  const hueNames: [number, string][] = [
    [15, 'Red'],
    [35, 'Orange'],
    [50, 'Gold'],
    [65, 'Yellow'],
    [85, 'Lime'],
    [120, 'Green'],
    [150, 'Teal'],
    [180, 'Cyan'],
    [210, 'Blue'],
    [250, 'Indigo'],
    [280, 'Purple'],
    [310, 'Magenta'],
    [340, 'Pink'],
    [360, 'Red'],
  ];

  let baseName = 'Red';
  for (const [threshold, name] of hueNames) {
    if (h < threshold) {
      baseName = name;
      break;
    }
  }

  // Add modifiers based on saturation and lightness
  if (l > 65) {
    return `Light ${baseName}`;
  } else if (l < 35) {
    return `Dark ${baseName}`;
  } else if (s > 70) {
    return `Vivid ${baseName}`;
  }

  return baseName;
}

/**
 * Suggest a role for the color based on its properties
 */
function suggestColorRole(
  rgb: RGB,
  index: number,
  totalColors: number
): ExtractedColor['role'] {
  const hsl = rgbToHsl(rgb);

  // High saturation, vibrant colors tend to be accents
  if (hsl.s > 70 && hsl.l > 30 && hsl.l < 70) {
    if (index === 0) return 'primary';
    if (index === 1) return 'secondary';
    return 'accent';
  }

  // Low saturation = neutral
  if (hsl.s < 20) {
    if (hsl.l > 80) return 'background';
    return 'neutral';
  }

  // First vibrant color is primary
  if (index === 0) return 'primary';
  if (index === 1) return 'secondary';
  if (index < totalColors / 2) return 'accent';
  
  return 'neutral';
}

/**
 * Validate if a file is a supported image type
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Get max file size in bytes (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Validate file size
 */
export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}
