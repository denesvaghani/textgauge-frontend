import { describe, it, expect } from 'vitest';
import { 
  TOOL_REGISTRY, 
  getAllTools, 
  getToolsByCategory, 
  getNavCategories,
  getCategoryIcon,
  getToolByHref,
  getRelatedTools,
  COMPANY_PAGES,
  type ToolDefinition,
  type ToolCategory
} from '../src/config/toolRegistry';
import { flowerThemes } from '../src/config/flowerThemes';

describe('Tool Registry', () => {
  // ==================== Registry Integrity Tests ====================
  describe('Registry Integrity', () => {
    it('has at least 10 tools defined', () => {
      const tools = getAllTools();
      expect(tools.length).toBeGreaterThanOrEqual(10);
    });

    it('all tools have required properties', () => {
      const tools = getAllTools();
      tools.forEach(tool => {
        expect(tool.href).toBeDefined();
        expect(tool.href).toMatch(/^\//); // Starts with /
        expect(tool.label).toBeDefined();
        expect(tool.label.length).toBeGreaterThan(0);
        expect(tool.title).toBeDefined();
        expect(tool.title.length).toBeGreaterThan(0);
        expect(tool.description).toBeDefined();
        expect(tool.description.length).toBeGreaterThan(20);
        expect(tool.category).toBeDefined();
        expect(tool.theme).toBeDefined();
        expect(tool.hoverStyles).toBeDefined();
      });
    });

    it('all tools have valid theme structure', () => {
      const tools = getAllTools();
      tools.forEach(tool => {
        expect(tool.theme.name).toBeDefined();
        expect(tool.theme.image).toBeDefined();
        expect(tool.theme.image).toMatch(/\.(webp|jpg|png)$/);
        expect(tool.theme.colors).toBeDefined();
        expect(tool.theme.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(tool.theme.colors.secondary).toBeDefined();
        expect(tool.theme.colors.accent).toBeDefined();
        expect(tool.theme.colors.glow).toBeDefined();
      });
    });

    it('all tools have valid hover styles', () => {
      const tools = getAllTools();
      tools.forEach(tool => {
        expect(tool.hoverStyles.border).toContain('hover:border-');
        expect(tool.hoverStyles.shadow).toContain('hover:shadow-');
        expect(tool.hoverStyles.text).toContain('group-hover:text-');
      });
    });

    it('has no duplicate hrefs', () => {
      const tools = getAllTools();
      const hrefs = tools.map(t => t.href);
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(hrefs.length);
    });

    it('has no duplicate tool keys', () => {
      const keys = Object.keys(TOOL_REGISTRY);
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(keys.length);
    });

    // CRITICAL: This test prevents deployment if the same logo is used for multiple tools
    it('has no duplicate logos - each tool must have a unique image', () => {
      const tools = getAllTools();
      const images = tools.map(t => t.theme.image);
      const uniqueImages = new Set(images);
      
      if (uniqueImages.size !== images.length) {
        // Find the duplicates for a helpful error message
        const duplicates = images.filter((img, idx) => images.indexOf(img) !== idx);
        const duplicateTools = tools.filter(t => duplicates.includes(t.theme.image));
        console.error('DUPLICATE LOGOS DETECTED:', duplicateTools.map(t => `${t.title}: ${t.theme.image}`));
      }
      
      expect(uniqueImages.size).toBe(images.length);
    });
  });

  // ==================== Category Tests ====================
  describe('Category Functions', () => {
    const validCategories: ToolCategory[] = [
      'Text Tools',
      'Formatters',
      'Converters',
      'Design Tools',
      'Media Tools',
      'Comparison',
      'Generators'
    ];

    it('getToolsByCategory returns tools for each category', () => {
      validCategories.forEach(category => {
        const tools = getToolsByCategory(category);
        expect(Array.isArray(tools)).toBe(true);
        tools.forEach(tool => {
          expect(tool.category).toBe(category);
        });
      });
    });

    it('Formatters category has at least 3 tools', () => {
      const formatters = getToolsByCategory('Formatters');
      expect(formatters.length).toBeGreaterThanOrEqual(3);
    });

    it('Generators category has at least 4 tools', () => {
      const generators = getToolsByCategory('Generators');
      expect(generators.length).toBeGreaterThanOrEqual(4);
    });

    it('getCategoryIcon returns valid image path for each category', () => {
      validCategories.forEach(category => {
        const icon = getCategoryIcon(category);
        if (category !== 'Company') {
          expect(icon).toMatch(/\.(webp|jpg|png)$/);
        }
      });
    });
  });

  // ==================== Navigation Functions ====================
  describe('Navigation Functions', () => {
    it('getNavCategories returns object with category keys', () => {
      const nav = getNavCategories();
      expect(typeof nav).toBe('object');
      expect(Object.keys(nav).length).toBeGreaterThan(5);
    });

    it('each nav category has tools with required properties', () => {
      const nav = getNavCategories();
      Object.entries(nav).forEach(([category, tools]) => {
        expect(Array.isArray(tools)).toBe(true);
        tools.forEach(tool => {
          expect(tool.href).toBeDefined();
          expect(tool.label).toBeDefined();
        });
      });
    });

    it('Company pages are included in nav categories', () => {
      const nav = getNavCategories();
      expect(nav['Company']).toBeDefined();
      expect(nav['Company'].length).toBe(COMPANY_PAGES.length);
    });
  });

  // ==================== Helper Functions ====================
  describe('Helper Functions', () => {
    it('getToolByHref returns correct tool', () => {
      const tool = getToolByHref('/json-formatter');
      expect(tool).toBeDefined();
      expect(tool?.title).toBe('JSON Formatter');
      expect(tool?.category).toBe('Formatters');
    });

    it('getToolByHref returns undefined for unknown href', () => {
      const tool = getToolByHref('/unknown-tool');
      expect(tool).toBeUndefined();
    });

    it('getRelatedTools excludes current tool', () => {
      const currentHref = '/json-formatter';
      const related = getRelatedTools(currentHref);
      expect(related.every(t => t.href !== currentHref)).toBe(true);
    });

    it('getRelatedTools prioritizes same category', () => {
      const currentHref = '/json-formatter';
      const currentTool = getToolByHref(currentHref);
      const related = getRelatedTools(currentHref, 3);
      
      // First related tools should be from same category if available
      const sameCategoryCount = related.filter(t => t.category === currentTool?.category).length;
      expect(sameCategoryCount).toBeGreaterThan(0);
    });

    it('getRelatedTools respects limit', () => {
      const related = getRelatedTools('/json-formatter', 5);
      expect(related.length).toBeLessThanOrEqual(5);
    });
  });

  // ==================== Consistency Tests ====================
  describe('Theme Consistency', () => {
    it('JSON to CSV uses lilac theme consistently', () => {
      const tool = getToolByHref('/json-to-csv-converter');
      expect(tool?.theme.name).toBe('Lilac');
    });

    it('UUID Generator uses peony theme consistently', () => {
      const tool = getToolByHref('/uuid-generator');
      expect(tool?.theme.name).toBe('Peony');
    });

    it('Diff Checker uses redRose theme consistently', () => {
      const tool = getToolByHref('/diff-checker');
      expect(tool?.theme.name).toBe('Red Rose');
    });

    it('JSON Formatter uses cherryBlossom theme consistently', () => {
      const tool = getToolByHref('/json-formatter');
      expect(tool?.theme.name).toBe('Cherry Blossom');
    });

    it('Image Compressor uses gorilla theme consistently', () => {
      const tool = getToolByHref('/image-compressor');
      expect(tool?.theme.name).toBe('Gorilla');
    });
  });

  // ==================== Specific Tool Tests ====================
  describe('Specific Tools', () => {
    it('Character Counter is the homepage (/)', () => {
      const tool = getToolByHref('/');
      expect(tool).toBeDefined();
      expect(tool?.title).toBe('Character Counter');
      expect(tool?.category).toBe('Text Tools');
    });

    it('all image tools have animal themes', () => {
      const imageTools = getToolsByCategory('Media Tools');
      const animalNames = ['Gorilla', 'Lion', 'Giraffe', 'Wolf'];
      imageTools.forEach(tool => {
        expect(animalNames).toContain(tool.theme.name);
      });
    });
  });
});
