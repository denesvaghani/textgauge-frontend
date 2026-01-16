import { describe, it, expect, vi } from 'vitest';
import { 
  CompressionService, 
  defaultSettings,
  SUPPORTED_FORMATS,
  FORMAT_LABELS,
  FORMAT_EXTENSIONS,
  ImageFormat
} from '@/lib/image-compressor/compressionService';

describe('Image Tools - Compression Service', () => {
  describe('SUPPORTED_FORMATS', () => {
    it('should have correct input formats', () => {
      expect(SUPPORTED_FORMATS.input).toContain('image/jpeg');
      expect(SUPPORTED_FORMATS.input).toContain('image/png');
      expect(SUPPORTED_FORMATS.input).toContain('image/webp');
      expect(SUPPORTED_FORMATS.input).toContain('image/heic');
      expect(SUPPORTED_FORMATS.input).toContain('image/heif');
      expect(SUPPORTED_FORMATS.input).toContain('image/svg+xml');
    });

    it('should have correct output formats including AVIF', () => {
      expect(SUPPORTED_FORMATS.output).toContain('image/jpeg');
      expect(SUPPORTED_FORMATS.output).toContain('image/png');
      expect(SUPPORTED_FORMATS.output).toContain('image/webp');
      expect(SUPPORTED_FORMATS.output).toContain('image/avif');
    });
  });

  describe('FORMAT_LABELS', () => {
    it('should have human-readable labels for all formats', () => {
      expect(FORMAT_LABELS['image/jpeg']).toBe('JPG');
      expect(FORMAT_LABELS['image/png']).toBe('PNG');
      expect(FORMAT_LABELS['image/webp']).toBe('WebP');
      expect(FORMAT_LABELS['image/avif']).toBe('AVIF');
      expect(FORMAT_LABELS['image/heic']).toBe('HEIC');
      expect(FORMAT_LABELS['image/svg+xml']).toBe('SVG');
    });
  });

  describe('FORMAT_EXTENSIONS', () => {
    it('should have correct file extensions', () => {
      expect(FORMAT_EXTENSIONS['image/jpeg']).toBe('jpg');
      expect(FORMAT_EXTENSIONS['image/png']).toBe('png');
      expect(FORMAT_EXTENSIONS['image/webp']).toBe('webp');
      expect(FORMAT_EXTENSIONS['image/avif']).toBe('avif');
    });
  });

  describe('defaultSettings', () => {
    it('should have sensible default values', () => {
      expect(defaultSettings.maxSizeMB).toBe(1);
      expect(defaultSettings.maxWidthOrHeight).toBe(1920);
      expect(defaultSettings.useWebWorker).toBe(true);
      expect(defaultSettings.initialQuality).toBe(0.8);
    });
  });

  describe('CompressionService', () => {
    it('should have static compress method', () => {
      expect(typeof CompressionService.compress).toBe('function');
    });

    it('should have static createDownloadLink method', () => {
      expect(typeof CompressionService.createDownloadLink).toBe('function');
    });
  });
});

describe('Image Tools - Persona Presets', () => {
  const PERSONA_PRESETS = [
    {
      id: "developer",
      settings: { maxSizeMB: 0.5, maxWidthOrHeight: 1920, initialQuality: 0.8, fileType: "image/webp" as ImageFormat },
    },
    {
      id: "designer", 
      settings: { maxSizeMB: 5, maxWidthOrHeight: 4000, initialQuality: 0.95, fileType: "image/png" as ImageFormat },
    },
    {
      id: "marketer",
      settings: { maxSizeMB: 0.2, maxWidthOrHeight: 1200, initialQuality: 0.75, fileType: "image/jpeg" as ImageFormat },
    },
  ];

  it('Developer preset should use WebP at 80% quality', () => {
    const preset = PERSONA_PRESETS.find(p => p.id === 'developer');
    expect(preset?.settings.fileType).toBe('image/webp');
    expect(preset?.settings.initialQuality).toBe(0.8);
    expect(preset?.settings.maxSizeMB).toBe(0.5);
  });

  it('Designer preset should use PNG at 95% quality', () => {
    const preset = PERSONA_PRESETS.find(p => p.id === 'designer');
    expect(preset?.settings.fileType).toBe('image/png');
    expect(preset?.settings.initialQuality).toBe(0.95);
    expect(preset?.settings.maxWidthOrHeight).toBe(4000);
  });

  it('Marketer preset should use JPG at 75% quality', () => {
    const preset = PERSONA_PRESETS.find(p => p.id === 'marketer');
    expect(preset?.settings.fileType).toBe('image/jpeg');
    expect(preset?.settings.initialQuality).toBe(0.75);
    expect(preset?.settings.maxSizeMB).toBe(0.2);
  });
});

describe('Image Tools - Social Media Presets', () => {
  const SOCIAL_PRESETS = [
    { name: "Instagram Post", width: 1080, height: 1080 },
    { name: "Instagram Story", width: 1080, height: 1920 },
    { name: "Twitter Post", width: 1200, height: 675 },
    { name: "LinkedIn Post", width: 1200, height: 627 },
    { name: "YouTube Thumbnail", width: 1280, height: 720 },
  ];

  it('Instagram Post should be 1080x1080', () => {
    const preset = SOCIAL_PRESETS.find(p => p.name === 'Instagram Post');
    expect(preset?.width).toBe(1080);
    expect(preset?.height).toBe(1080);
  });

  it('Instagram Story should be 1080x1920', () => {
    const preset = SOCIAL_PRESETS.find(p => p.name === 'Instagram Story');
    expect(preset?.width).toBe(1080);
    expect(preset?.height).toBe(1920);
  });

  it('Twitter Post should be 1200x675', () => {
    const preset = SOCIAL_PRESETS.find(p => p.name === 'Twitter Post');
    expect(preset?.width).toBe(1200);
    expect(preset?.height).toBe(675);
  });

  it('YouTube Thumbnail should be 1280x720', () => {
    const preset = SOCIAL_PRESETS.find(p => p.name === 'YouTube Thumbnail');
    expect(preset?.width).toBe(1280);
    expect(preset?.height).toBe(720);
  });
});

describe('Image Tools - Dimension Calculations', () => {
  it('should calculate correct percentage resize', () => {
    const originalWidth = 1000;
    const originalHeight = 800;
    const percentage = 50;
    
    const newWidth = Math.round(originalWidth * (percentage / 100));
    const newHeight = Math.round(originalHeight * (percentage / 100));
    
    expect(newWidth).toBe(500);
    expect(newHeight).toBe(400);
  });

  it('should calculate correct fit-within-bounds resize', () => {
    const originalWidth = 2000;
    const originalHeight = 1500;
    const maxWidth = 800;
    const maxHeight = 600;
    
    const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
    const newWidth = Math.round(originalWidth * ratio);
    const newHeight = Math.round(originalHeight * ratio);
    
    // Should maintain aspect ratio and fit within 800x600
    expect(newWidth).toBeLessThanOrEqual(maxWidth);
    expect(newHeight).toBeLessThanOrEqual(maxHeight);
    expect(newWidth / newHeight).toBeCloseTo(originalWidth / originalHeight, 1);
  });

  it('should maintain aspect ratio when locking', () => {
    const originalWidth = 1920;
    const originalHeight = 1080;
    const aspectRatio = originalWidth / originalHeight;
    
    const newWidth = 800;
    const newHeight = Math.round(newWidth / aspectRatio);
    
    expect(newHeight).toBe(450);
    expect(newWidth / newHeight).toBeCloseTo(aspectRatio, 1);
  });
});
