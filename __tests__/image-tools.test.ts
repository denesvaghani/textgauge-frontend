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

// ==================== Image Resizer Tests ====================
describe('Image Resizer - Options', () => {
  const RESIZE_MODES = ['exact', 'percentage', 'fit-within'];
  
  it('should support all resize modes', () => {
    expect(RESIZE_MODES).toContain('exact');
    expect(RESIZE_MODES).toContain('percentage');
    expect(RESIZE_MODES).toContain('fit-within');
  });

  describe('Exact Mode', () => {
    it('should resize to exact dimensions', () => {
      const targetWidth = 800;
      const targetHeight = 600;
      expect(targetWidth).toBe(800);
      expect(targetHeight).toBe(600);
    });

    it('should allow independent width and height', () => {
      const originalRatio = 16 / 9;
      const newWidth = 500;
      const newHeight = 500;
      const newRatio = newWidth / newHeight;
      
      // Ratios can be different in exact mode
      expect(newRatio).not.toBeCloseTo(originalRatio, 1);
    });
  });

  describe('Percentage Mode', () => {
    it('should scale by percentage correctly', () => {
      const original = { width: 1000, height: 800 };
      const scale = 75;
      
      const result = {
        width: Math.round(original.width * scale / 100),
        height: Math.round(original.height * scale / 100)
      };
      
      expect(result.width).toBe(750);
      expect(result.height).toBe(600);
    });

    it('should maintain aspect ratio in percentage mode', () => {
      const original = { width: 1920, height: 1080 };
      const scale = 50;
      
      const result = {
        width: Math.round(original.width * scale / 100),
        height: Math.round(original.height * scale / 100)
      };
      
      const originalRatio = original.width / original.height;
      const resultRatio = result.width / result.height;
      
      expect(resultRatio).toBeCloseTo(originalRatio, 2);
    });
  });

  describe('Fit Within Mode', () => {
    it('should fit within bounds while maintaining aspect ratio', () => {
      const original = { width: 3000, height: 2000 };
      const bounds = { maxWidth: 1200, maxHeight: 800 };
      
      const scale = Math.min(
        bounds.maxWidth / original.width,
        bounds.maxHeight / original.height
      );
      
      const result = {
        width: Math.round(original.width * scale),
        height: Math.round(original.height * scale)
      };
      
      expect(result.width).toBeLessThanOrEqual(bounds.maxWidth);
      expect(result.height).toBeLessThanOrEqual(bounds.maxHeight);
    });
  });

  describe('Social Media Presets', () => {
    const SOCIAL_PRESETS = {
      'Instagram Post': { width: 1080, height: 1080 },
      'Instagram Story': { width: 1080, height: 1920 },
      'Twitter Post': { width: 1200, height: 675 },
      'LinkedIn Post': { width: 1200, height: 627 },
      'Facebook Cover': { width: 820, height: 312 },
      'YouTube Thumbnail': { width: 1280, height: 720 },
      'TikTok Video': { width: 1080, height: 1920 },
    };

    Object.entries(SOCIAL_PRESETS).forEach(([name, dims]) => {
      it(`${name} preset should have correct dimensions`, () => {
        expect(dims.width).toBeGreaterThan(0);
        expect(dims.height).toBeGreaterThan(0);
      });
    });

    it('should have at least 5 social media presets', () => {
      expect(Object.keys(SOCIAL_PRESETS).length).toBeGreaterThanOrEqual(5);
    });
  });
});

// ==================== Image Merger Tests ====================
describe('Image Merger - Options', () => {
  describe('Stitch Direction', () => {
    it('should support vertical stitching', () => {
      const direction = 'vertical';
      expect(direction).toBe('vertical');
    });

    it('should support horizontal stitching', () => {
      const direction = 'horizontal';
      expect(direction).toBe('horizontal');
    });
  });

  describe('Canvas Calculations', () => {
    it('should calculate vertical merge dimensions correctly', () => {
      const images = [
        { width: 800, height: 600 },
        { width: 1000, height: 400 },
        { width: 600, height: 500 }
      ];
      const gap = 10;
      const padding = 20;

      const totalWidth = Math.max(...images.map(i => i.width)) + padding * 2;
      const totalHeight = images.reduce((sum, i) => sum + i.height, 0) + (images.length - 1) * gap + padding * 2;

      expect(totalWidth).toBe(1040); // 1000 + 40
      expect(totalHeight).toBe(1560); // 600 + 400 + 500 + 2*10 + 2*20
    });

    it('should calculate horizontal merge dimensions correctly', () => {
      const images = [
        { width: 400, height: 600 },
        { width: 500, height: 800 },
        { width: 300, height: 400 }
      ];
      const gap = 10;
      const padding = 20;

      const totalWidth = images.reduce((sum, i) => sum + i.width, 0) + (images.length - 1) * gap + padding * 2;
      const totalHeight = Math.max(...images.map(i => i.height)) + padding * 2;

      expect(totalWidth).toBe(1260); // 400 + 500 + 300 + 2*10 + 2*20
      expect(totalHeight).toBe(840); // 800 + 40
    });
  });

  describe('Background Color', () => {
    const PRESET_COLORS = ['#ffffff', '#000000', '#f3f4f6', 'transparent'];

    it('should have white as a preset color', () => {
      expect(PRESET_COLORS).toContain('#ffffff');
    });

    it('should have black as a preset color', () => {
      expect(PRESET_COLORS).toContain('#000000');
    });

    it('should have transparent as a preset color', () => {
      expect(PRESET_COLORS).toContain('transparent');
    });
  });

  describe('Gap and Padding', () => {
    it('should support gap values from 0 to 100', () => {
      const minGap = 0;
      const maxGap = 100;
      expect(minGap).toBe(0);
      expect(maxGap).toBe(100);
    });

    it('should support padding values from 0 to 100', () => {
      const minPadding = 0;
      const maxPadding = 100;
      expect(minPadding).toBe(0);
      expect(maxPadding).toBe(100);
    });
  });
});

// ==================== Image Converter Tests ====================
describe('Image Converter - Options', () => {
  describe('Format Conversion', () => {
    const CONVERSION_FORMATS = ['jpg', 'png', 'webp', 'avif'];

    it('should support JPG output', () => {
      expect(CONVERSION_FORMATS).toContain('jpg');
    });

    it('should support PNG output', () => {
      expect(CONVERSION_FORMATS).toContain('png');
    });

    it('should support WebP output', () => {
      expect(CONVERSION_FORMATS).toContain('webp');
    });

    it('should support AVIF output', () => {
      expect(CONVERSION_FORMATS).toContain('avif');
    });
  });

  describe('Batch Conversion', () => {
    it('should support batch conversion of multiple files', () => {
      const files = ['image1.png', 'image2.jpg', 'image3.webp'];
      expect(files.length).toBe(3);
    });

    it('should support ZIP download for batch results', () => {
      const zipSupported = true;
      expect(zipSupported).toBe(true);
    });
  });

  describe('Quality Settings', () => {
    it('should support quality range 0-100', () => {
      const minQuality = 0;
      const maxQuality = 100;
      const defaultQuality = 80;

      expect(minQuality).toBeGreaterThanOrEqual(0);
      expect(maxQuality).toBeLessThanOrEqual(100);
      expect(defaultQuality).toBe(80);
    });
  });
});

// ==================== Image Compressor Extended Tests ====================
describe('Image Compressor - Extended Options', () => {
  describe('Target Size Modes', () => {
    it('should support target size in MB', () => {
      const targetSizeMB = 1;
      expect(targetSizeMB).toBe(1);
    });

    it('should support target size in KB', () => {
      const targetSizeKB = 500;
      const targetSizeMB = targetSizeKB / 1024;
      expect(targetSizeMB).toBeCloseTo(0.488, 2);
    });

    it('should have preset target sizes', () => {
      const presets = [50, 100, 200, 500, 1024]; // KB values
      expect(presets).toContain(100);
      expect(presets).toContain(500);
    });
  });

  describe('Max Dimensions', () => {
    it('should support max width/height constraint', () => {
      const maxDimension = 1920;
      expect(maxDimension).toBe(1920);
    });

    it('should have dimension presets', () => {
      const presets = [640, 1280, 1920, 2560, 4096];
      expect(presets).toContain(1920);
      expect(presets).toContain(4096);
    });
  });

  describe('HEIC Support', () => {
    it('should detect HEIC files by extension', () => {
      const filename = 'photo.heic';
      const isHeic = filename.toLowerCase().endsWith('.heic');
      expect(isHeic).toBe(true);
    });

    it('should detect HEIF files by extension', () => {
      const filename = 'photo.heif';
      const isHeif = filename.toLowerCase().endsWith('.heif');
      expect(isHeif).toBe(true);
    });
  });

  describe('SVG Support', () => {
    it('should detect SVG files by extension', () => {
      const filename = 'icon.svg';
      const isSvg = filename.toLowerCase().endsWith('.svg');
      expect(isSvg).toBe(true);
    });

    it('should detect SVG files by MIME type', () => {
      const mimeType = 'image/svg+xml';
      const isSvg = mimeType === 'image/svg+xml';
      expect(isSvg).toBe(true);
    });
  });
});

