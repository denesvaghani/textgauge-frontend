/**
 * Trending Keywords Data
 * Manually curated high-value SEO keywords
 * 
 * Update weekly with current trending topics
 * Data source: Google Trends, SEMrush, Ahrefs, or manual research
 */

export interface TrendingKeyword {
  keyword: string;
  searchVolume: string; // e.g., "135k", "45k"
  category: 'writing' | 'seo' | 'social' | 'ai' | 'marketing' | 'general';
  difficulty: 'low' | 'medium' | 'high';
  trending: 'up' | 'steady' | 'new';
}

/**
 * Current trending keywords
 * Last updated: December 2024
 */
export const trendingKeywords: TrendingKeyword[] = [
  // AI & Technology (Hot right now!)
  {
    keyword: 'AI writing tools',
    searchVolume: '90k',
    category: 'ai',
    difficulty: 'medium',
    trending: 'up',
  },
  {
    keyword: 'ChatGPT prompts',
    searchVolume: '165k',
    category: 'ai',
    difficulty: 'high',
    trending: 'up',
  },
  {
    keyword: 'AI content generator',
    searchVolume: '74k',
    category: 'ai',
    difficulty: 'high',
    trending: 'up',
  },

  // Writing & Content Creation
  {
    keyword: 'character counter',
    searchVolume: '135k',
    category: 'writing',
    difficulty: 'medium',
    trending: 'steady',
  },
  {
    keyword: 'word count tool',
    searchVolume: '110k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'content writing tips',
    searchVolume: '49k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'blog post ideas',
    searchVolume: '60k',
    category: 'writing',
    difficulty: 'medium',
    trending: 'steady',
  },

  // SEO Keywords
  {
    keyword: 'SEO optimization',
    searchVolume: '90k',
    category: 'seo',
    difficulty: 'high',
    trending: 'steady',
  },
  {
    keyword: 'keyword research',
    searchVolume: '74k',
    category: 'seo',
    difficulty: 'medium',
    trending: 'steady',
  },
  {
    keyword: 'meta description',
    searchVolume: '49k',
    category: 'seo',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'backlink checker',
    searchVolume: '33k',
    category: 'seo',
    difficulty: 'medium',
    trending: 'steady',
  },

  // Social Media
  {
    keyword: 'Instagram captions',
    searchVolume: '201k',
    category: 'social',
    difficulty: 'medium',
    trending: 'steady',
  },
  {
    keyword: 'Twitter character limit',
    searchVolume: '27k',
    category: 'social',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'LinkedIn post ideas',
    searchVolume: '18k',
    category: 'social',
    difficulty: 'low',
    trending: 'up',
  },

  // Marketing
  {
    keyword: 'email marketing',
    searchVolume: '135k',
    category: 'marketing',
    difficulty: 'high',
    trending: 'steady',
  },
  {
    keyword: 'content strategy',
    searchVolume: '40k',
    category: 'marketing',
    difficulty: 'medium',
    trending: 'steady',
  },

  // More Writing Tools
  {
    keyword: 'text counter',
    searchVolume: '82k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'letter count',
    searchVolume: '67k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'sentence counter',
    searchVolume: '34k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'paragraph counter',
    searchVolume: '28k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'reading time calculator',
    searchVolume: '22k',
    category: 'writing',
    difficulty: 'low',
    trending: 'up',
  },
  {
    keyword: 'text analyzer',
    searchVolume: '45k',
    category: 'writing',
    difficulty: 'low',
    trending: 'up',
  },
  {
    keyword: 'grammar checker',
    searchVolume: '301k',
    category: 'writing',
    difficulty: 'high',
    trending: 'steady',
  },
  {
    keyword: 'plagiarism checker',
    searchVolume: '246k',
    category: 'writing',
    difficulty: 'high',
    trending: 'steady',
  },
  {
    keyword: 'paraphrasing tool',
    searchVolume: '673k',
    category: 'writing',
    difficulty: 'medium',
    trending: 'up',
  },
  {
    keyword: 'essay word counter',
    searchVolume: '18k',
    category: 'writing',
    difficulty: 'low',
    trending: 'steady',
  },

  // General Use Cases
  {
    keyword: 'copy and paste',
    searchVolume: '450k',
    category: 'general',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'text to speech',
    searchVolume: '368k',
    category: 'general',
    difficulty: 'medium',
    trending: 'steady',
  },
  {
    keyword: 'case converter',
    searchVolume: '55k',
    category: 'general',
    difficulty: 'low',
    trending: 'steady',
  },
  {
    keyword: 'duplicate word finder',
    searchVolume: '12k',
    category: 'writing',
    difficulty: 'low',
    trending: 'new',
  },
];

/**
 * Get keywords by category
 */
export function getKeywordsByCategory(category: TrendingKeyword['category']): TrendingKeyword[] {
  return trendingKeywords.filter(k => k.category === category);
}

/**
 * Get top N trending keywords
 */
export function getTopTrending(limit: number = 5): TrendingKeyword[] {
  return trendingKeywords
    .filter(k => k.trending === 'up')
    .slice(0, limit);
}

/**
 * Get N random trending keywords
 */
export function getRandomTrending(limit: number = 6): TrendingKeyword[] {
  const shuffled = [...trendingKeywords]
    .filter(k => k.trending === 'up' || k.trending === 'new') // Prioritize hot topics
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

/**
 * Get keywords sorted by search volume
 */
export function getBySearchVolume(): TrendingKeyword[] {
  return [...trendingKeywords].sort((a, b) => {
    const volA = parseInt(a.searchVolume.replace(/[^0-9]/g, ''));
    const volB = parseInt(b.searchVolume.replace(/[^0-9]/g, ''));
    return volB - volA;
  });
}

/**
 * Search keywords by text
 */
export function searchKeywords(query: string): TrendingKeyword[] {
  const lowerQuery = query.toLowerCase();
  return trendingKeywords.filter(k =>
    k.keyword.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get category emoji
 */
export function getCategoryEmoji(category: TrendingKeyword['category']): string {
  const emojiMap = {
    ai: '🤖',
    writing: '✍️',
    seo: '🎯',
    social: '📱',
    marketing: '📊',
    general: '🔥',
  };
  return emojiMap[category];
}

/**
 * Get trending icon
 */
export function getTrendingIcon(trending: TrendingKeyword['trending']): string {
  const iconMap = {
    up: '📈',
    steady: '➡️',
    new: '✨',
  };
  return iconMap[trending];
}

/**
 * Get difficulty color (Tailwind classes)
 */
export function getDifficultyColor(difficulty: TrendingKeyword['difficulty']): {
  bg: string;
  text: string;
} {
  const colorMap = {
    low: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
    medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
    high: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
  };
  return colorMap[difficulty];
}
