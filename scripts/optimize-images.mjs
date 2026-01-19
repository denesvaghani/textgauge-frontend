/**
 * Image Optimization Script for SEO
 * Compresses oversized images to <100KB WebP format
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = './public/images';
const BACKUP_DIR = './public/images/_backup';
const MAX_SIZE_KB = 100;
const QUALITY = 80;

// Images to optimize (>200KB from audit)
const TARGETS = [
  'flowers/protea.png',
  'flowers/gerbera.png', 
  'flowers/peony.png',
  'flowers/magnolia.jpg',
  'flowers/gardenia.jpg',
  'flowers/lilac.jpg',
  'flowers/jasmine.jpg',
  'animals/wolf.jpg',
  'animals/lion.jpg',
  'animals/gorilla.jpg',
  'animals/giraffe.jpg',
  'animals/horse.jpg',
  'tools/palette-forge.jpg',
];

async function getFileSizeKB(filePath) {
  const stats = await stat(filePath);
  return stats.size / 1024;
}

async function optimizeImage(relativePath) {
  const inputPath = join(IMAGES_DIR, relativePath);
  const ext = extname(relativePath);
  const baseName = basename(relativePath, ext);
  const dir = relativePath.replace(basename(relativePath), '');
  
  // Output as WebP for best compression
  const outputPath = join(IMAGES_DIR, dir, `${baseName}.webp`);
  
  const originalSize = await getFileSizeKB(inputPath);
  
  if (originalSize <= MAX_SIZE_KB) {
    console.log(`✓ ${relativePath} already optimal (${originalSize.toFixed(1)}KB)`);
    return;
  }

  console.log(`Processing ${relativePath} (${originalSize.toFixed(1)}KB)...`);

  try {
    // Create backup directory if needed
    if (!existsSync(BACKUP_DIR)) {
      await mkdir(BACKUP_DIR, { recursive: true });
    }

    // Resize large images and convert to WebP
    await sharp(inputPath)
      .resize(800, 800, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newSize = await getFileSizeKB(outputPath);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`  → ${baseName}.webp: ${newSize.toFixed(1)}KB (saved ${savings}%)`);

    // If still too large, reduce quality further
    if (newSize > MAX_SIZE_KB) {
      await sharp(inputPath)
        .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 60 })
        .toFile(outputPath);
      
      const finalSize = await getFileSizeKB(outputPath);
      console.log(`  → Re-optimized: ${finalSize.toFixed(1)}KB`);
    }

  } catch (error) {
    console.error(`  ✗ Error processing ${relativePath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Image Optimization for SEO');
  console.log('================================\n');

  for (const target of TARGETS) {
    const fullPath = join(IMAGES_DIR, target);
    if (existsSync(fullPath)) {
      await optimizeImage(target);
    } else {
      console.log(`⚠ Skipping ${target} (not found)`);
    }
  }

  console.log('\n✅ Done! Remember to update code references if using WebP versions.');
}

main().catch(console.error);
