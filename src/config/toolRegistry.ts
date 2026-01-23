/**
 * Centralized Tool Registry
 * Single source of truth for all tool definitions, logos, and themes.
 * Used by Navigation, HomeClient, and RelatedTools to ensure consistency.
 */

import { flowerThemes, type FlowerTheme } from './flowerThemes';

// Tool categories
export type ToolCategory = 
  | 'Text Tools'
  | 'Formatters'
  | 'Converters'
  | 'Design Tools'
  | 'Media Tools'
  | 'Comparison'
  | 'Generators'
  | 'Company';

// Hover styles for tool cards
export interface HoverStyles {
  border: string;
  shadow: string;
  text: string;
}

// Complete tool definition
export interface ToolDefinition {
  href: string;
  label: string;           // Short label for navigation
  title: string;           // Full title for cards
  description: string;     // Tool description
  category: ToolCategory;
  theme: FlowerTheme;
  hoverStyles: HoverStyles;
}

// Media tools use custom animal themes
const animalThemes = {
  gorilla: {
    name: "Gorilla",
    slug: "gorilla",
    image: "/images/animals/gorilla.webp",
    significance: "Represents raw power and compression strength.",
    colors: {
      primary: "#374151",
      secondary: "#4B5563",
      accent: "#E5E7EB",
      glow: "rgba(75, 85, 99, 0.3)",
      text: "text-slate-600",
      textDark: "dark:text-slate-400",
    },
    gradient: {
      light: "from-slate-500 to-gray-500",
      dark: "from-slate-600 to-gray-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-slate-950/30 dark:via-gray-950/20 dark:to-slate-950",
    },
  },
  lion: {
    name: "Lion",
    slug: "lion",
    image: "/images/animals/lion.webp",
    significance: "Represents bold transformation and format mastery.",
    colors: {
      primary: "#B45309",
      secondary: "#D97706",
      accent: "#FEF3C7",
      glow: "rgba(217, 119, 6, 0.3)",
      text: "text-amber-600",
      textDark: "dark:text-amber-400",
    },
    gradient: {
      light: "from-amber-500 to-orange-500",
      dark: "from-amber-600 to-orange-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-amber-50 via-orange-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-950",
    },
  },
  giraffe: {
    name: "Giraffe",
    slug: "giraffe",
    image: "/images/animals/giraffe.webp",
    significance: "Represents reaching new heights through precise resizing.",
    colors: {
      primary: "#92400E",
      secondary: "#B45309",
      accent: "#FEF3C7",
      glow: "rgba(146, 64, 14, 0.3)",
      text: "text-orange-600",
      textDark: "dark:text-orange-400",
    },
    gradient: {
      light: "from-orange-500 to-amber-500",
      dark: "from-orange-600 to-amber-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-orange-50 via-amber-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-orange-950/30 dark:via-amber-950/20 dark:to-slate-950",
    },
  },
  wolf: {
    name: "Wolf",
    slug: "wolf",
    image: "/images/animals/wolf.webp",
    significance: "Represents pack unity and seamless merging.",
    colors: {
      primary: "#475569",
      secondary: "#64748B",
      accent: "#E2E8F0",
      glow: "rgba(100, 116, 139, 0.3)",
      text: "text-slate-600",
      textDark: "dark:text-slate-400",
    },
    gradient: {
      light: "from-slate-500 to-gray-500",
      dark: "from-slate-600 to-gray-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-slate-950/30 dark:via-gray-950/20 dark:to-slate-950",
    },
  },
} as const;

/**
 * TOOL_REGISTRY - Single source of truth for all tools
 * When adding a new tool, add it here first.
 */
export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  // ============ TEXT TOOLS ============
  characterCounter: {
    href: "/",
    label: "Character Counter",
    title: "Character Counter",
    description: "Count characters, words, sentences, and paragraphs with real-time analysis.",
    category: "Text Tools",
    theme: flowerThemes.sunflower,
    hoverStyles: {
      border: "hover:border-yellow-400/60 dark:hover:border-yellow-400/40",
      shadow: "hover:shadow-yellow-500/20",
      text: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
    },
  },

  // ============ FORMATTERS ============
  jsonFormatter: {
    href: "/json-formatter",
    label: "JSON Formatter",
    title: "JSON Formatter",
    description: "Validate, beautify, and minify JSON data with our advanced Monaco-based editor.",
    category: "Formatters",
    theme: flowerThemes.cherryBlossom,
    hoverStyles: {
      border: "hover:border-pink-400/60 dark:hover:border-pink-400/40",
      shadow: "hover:shadow-pink-500/20",
      text: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    },
  },
  yamlFormatter: {
    href: "/yaml-formatter",
    label: "YAML Formatter",
    title: "YAML Formatter",
    description: "Convert, validate, and format YAML files with syntax highlighting and error detection.",
    category: "Formatters",
    theme: flowerThemes.whiteLily,
    hoverStyles: {
      border: "hover:border-emerald-400/60 dark:hover:border-emerald-400/40",
      shadow: "hover:shadow-emerald-500/20",
      text: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
  },
  tomlFormatter: {
    href: "/toml-formatter",
    label: "TOML Formatter",
    title: "TOML Formatter",
    description: "Validate, format, and beautify TOML configuration files (Cargo.toml, pyproject.toml) instantly.",
    category: "Formatters",
    theme: flowerThemes.frangipani,
    hoverStyles: {
      border: "hover:border-orange-400/60 dark:hover:border-orange-400/40",
      shadow: "hover:shadow-orange-500/20",
      text: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    },
  },

  // ============ CONVERTERS ============
  jsonToCsv: {
    href: "/json-to-csv-converter",
    label: "JSON to CSV",
    title: "JSON to CSV",
    description: "Convert JSON data to CSV format instantly. Reduces file size by 50-60% for easy spreadsheet use.",
    category: "Converters",
    theme: flowerThemes.lilac,
    hoverStyles: {
      border: "hover:border-violet-400/60 dark:hover:border-violet-400/40",
      shadow: "hover:shadow-violet-500/20",
      text: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    },
  },
  jsonToToon: {
    href: "/json-to-toon-converter",
    label: "JSON to TOON",
    title: "JSON to TOON",
    description: "AI-optimized format. Reduce token usage by 30-60% for ChatGPT, Claude, and other LLMs.",
    category: "Converters",
    theme: flowerThemes.lavender,
    hoverStyles: {
      border: "hover:border-violet-400/60 dark:hover:border-violet-400/40",
      shadow: "hover:shadow-violet-500/20",
      text: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    },
  },

  // ============ DESIGN TOOLS ============
  paletteForge: {
    href: "/palette-forge",
    label: "PaletteForge",
    title: "PaletteForge",
    description: "Extract colors from images and generate design tokens. Export to CSS, Tailwind, SCSS, Figma, and more.",
    category: "Design Tools",
    theme: flowerThemes.orchid,
    hoverStyles: {
      border: "hover:border-stone-400/60 dark:hover:border-stone-400/40",
      shadow: "hover:shadow-stone-500/20",
      text: "group-hover:text-stone-600 dark:group-hover:text-stone-400",
    },
  },

  // ============ MEDIA TOOLS ============
  imageCompressor: {
    href: "/image-compressor",
    label: "Image Compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG, WebP images to any size. Client-side processing - your images never leave your browser.",
    category: "Media Tools",
    theme: animalThemes.gorilla,
    hoverStyles: {
      border: "hover:border-slate-400/60 dark:hover:border-slate-400/40",
      shadow: "hover:shadow-slate-500/20",
      text: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
    },
  },
  imageConverter: {
    href: "/image-converter",
    label: "Image Converter",
    title: "Image Converter",
    description: "Convert images between JPG, PNG, WebP, and AVIF formats. Batch conversion with ZIP download.",
    category: "Media Tools",
    theme: animalThemes.lion,
    hoverStyles: {
      border: "hover:border-amber-400/60 dark:hover:border-amber-400/40",
      shadow: "hover:shadow-amber-500/20",
      text: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    },
  },
  imageResizer: {
    href: "/image-resizer",
    label: "Image Resizer",
    title: "Image Resizer",
    description: "Resize images to exact dimensions or percentages. Social media presets for Instagram, Twitter, and more.",
    category: "Media Tools",
    theme: animalThemes.giraffe,
    hoverStyles: {
      border: "hover:border-orange-400/60 dark:hover:border-orange-400/40",
      shadow: "hover:shadow-orange-500/20",
      text: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    },
  },
  imageMerger: {
    href: "/image-merger",
    label: "Image Merger",
    title: "Image Merger",
    description: "Combine multiple images into one. Stitch photos vertically for scrolling screenshots or horizontally for comparisons.",
    category: "Media Tools",
    theme: animalThemes.wolf,
    hoverStyles: {
      border: "hover:border-slate-400/60 dark:hover:border-slate-400/40",
      shadow: "hover:shadow-slate-500/20",
      text: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
    },
  },

  // ============ COMPARISON ============
  diffChecker: {
    href: "/diff-checker",
    label: "Diff Checker",
    title: "Diff Checker",
    description: "Compare two texts and see differences instantly. Perfect for code reviews and config comparisons.",
    category: "Comparison",
    theme: flowerThemes.redRose,
    hoverStyles: {
      border: "hover:border-rose-400/60 dark:hover:border-rose-400/40",
      shadow: "hover:shadow-rose-500/20",
      text: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    },
  },
  listDiff: {
    href: "/list-diff",
    label: "List Diff Tool",
    title: "List Diff & Unique Extractor",
    description: "Clean lists, extract unique IDs, and find differences between two lists. Ideal for data reconciliation.",
    category: "Comparison",
    theme: flowerThemes.protea,
    hoverStyles: {
      border: "hover:border-pink-400/60 dark:hover:border-pink-400/40",
      shadow: "hover:shadow-pink-500/20",
      text: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    },
  },

  // ============ GENERATORS ============
  uuidGenerator: {
    href: "/uuid-generator",
    label: "UUID Generator",
    title: "UUID Generator",
    description: "Generate random UUIDs (v4) in bulk. Fast, free, and secure generation for developers.",
    category: "Generators",
    theme: flowerThemes.peony,
    hoverStyles: {
      border: "hover:border-red-400/60 dark:hover:border-red-400/40",
      shadow: "hover:shadow-red-500/20",
      text: "group-hover:text-red-600 dark:group-hover:text-red-400",
    },
  },
  hashGenerator: {
    href: "/hash-generator",
    label: "Hash Generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Verify file integrity with checksums.",
    category: "Generators",
    theme: flowerThemes.magnolia,
    hoverStyles: {
      border: "hover:border-emerald-400/60 dark:hover:border-emerald-400/40",
      shadow: "hover:shadow-emerald-500/20",
      text: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
  },
  cronGenerator: {
    href: "/cron-job-generator",
    label: "Cron Generator",
    title: "Cron Generator",
    description: "Build cron schedules visually. Translate complex cron expressions into human-readable text.",
    category: "Generators",
    theme: flowerThemes.morningGlory,
    hoverStyles: {
      border: "hover:border-indigo-400/60 dark:hover:border-indigo-400/40",
      shadow: "hover:shadow-indigo-500/20",
      text: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    },
  },
  base64Encoder: {
    href: "/base64-encoder",
    label: "Base64 Tool",
    title: "Base64 Tool",
    description: "Encode and decode Base64 strings and files. Supports Unicode and emoji handling.",
    category: "Generators",
    theme: flowerThemes.blueIris,
    hoverStyles: {
      border: "hover:border-blue-400/60 dark:hover:border-blue-400/40",
      shadow: "hover:shadow-blue-500/20",
      text: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
  },
  urlEncoder: {
    href: "/url-encoder",
    label: "URL Encoder",
    title: "URL Encoder",
    description: "Encode and decode URLs, parse query parameters, and build URLs visually. Full UTF-8 support.",
    category: "Generators",
    theme: flowerThemes.jasmine,
    hoverStyles: {
      border: "hover:border-yellow-400/60 dark:hover:border-yellow-400/40",
      shadow: "hover:shadow-yellow-500/20",
      text: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
    },
  },
};

// Company pages (non-tool pages, no themes needed for cards)
export const COMPANY_PAGES = [
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

// ============ HELPER FUNCTIONS ============

/**
 * Get all tools as an array
 */
export function getAllTools(): ToolDefinition[] {
  return Object.values(TOOL_REGISTRY);
}

/**
 * Get tools filtered by category
 */
export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return getAllTools().filter(tool => tool.category === category);
}

/**
 * Get navigation categories with their tools
 * Returns an object mapping category names to arrays of tools
 */
export function getNavCategories(): Record<string, Array<{ href: string; label: string; image: string }>> {
  const categories: Record<string, Array<{ href: string; label: string; image: string }>> = {};
  
  getAllTools().forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push({
      href: tool.href,
      label: tool.label,
      image: tool.theme.image,
    });
  });

  // Add company pages without images
  categories['Company'] = COMPANY_PAGES.map(page => ({
    href: page.href,
    label: page.label,
    image: '',
  }));

  return categories;
}

/**
 * Get category icon image for category tabs
 */
export function getCategoryIcon(category: ToolCategory): string {
  const categoryIcons: Record<ToolCategory, string> = {
    'Text Tools': flowerThemes.sunflower.image,
    'Formatters': flowerThemes.cherryBlossom.image,
    'Converters': flowerThemes.lilac.image,
    'Design Tools': flowerThemes.orchid.image,
    'Media Tools': animalThemes.gorilla.image,
    'Comparison': flowerThemes.redRose.image,
    'Generators': flowerThemes.peony.image,
    'Company': '',
  };
  return categoryIcons[category] || '';
}

/**
 * Get a tool definition by its href
 */
export function getToolByHref(href: string): ToolDefinition | undefined {
  return getAllTools().find(tool => tool.href === href);
}

/**
 * Get related tools for a given tool (same category first, then others)
 */
export function getRelatedTools(currentHref: string, limit: number = 3): ToolDefinition[] {
  const currentTool = getToolByHref(currentHref);
  const otherTools = getAllTools().filter(t => t.href !== currentHref);
  
  if (!currentTool) return otherTools.slice(0, limit);

  return otherTools
    .sort((a, b) => {
      // Same category first
      if (a.category === currentTool.category && b.category !== currentTool.category) return -1;
      if (a.category !== currentTool.category && b.category === currentTool.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
