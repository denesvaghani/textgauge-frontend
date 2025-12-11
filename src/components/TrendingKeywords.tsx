'use client';

import { useState, useEffect } from 'react';
import {
  getRandomTrending,
  getBySearchVolume,
  getCategoryEmoji,
  getTrendingIcon,
  getDifficultyColor,
  type TrendingKeyword
} from '@/data/trendingKeywords';
import { RefreshCw } from 'lucide-react';

interface TrendingKeywordsProps {
  onKeywordClick: (keyword: string) => void;
}

export function TrendingKeywords({ onKeywordClick }: TrendingKeywordsProps) {
  const [view, setView] = useState<'trending' | 'popular'>('trending');
  const [items, setItems] = useState<TrendingKeyword[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial fetch and view change handler
  useEffect(() => {
    updateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const updateItems = async () => {
    setIsRefreshing(true);

    try {
      if (view === 'trending') {
        try {
          // Fetch from our local API which proxies Google Trends RSS
          const res = await fetch('/api/trending-keywords');
          if (!res.ok) throw new Error('API failed');
          const data = await res.json();

          if (data.keywords && data.keywords.length > 0) {
            setItems(data.keywords.slice(0, 6));
          } else {
            // Fallback to random static if empty
            setItems(getRandomTrending(6));
          }
        } catch (err) {
          console.error('Failed to load trending keywords', err);
          // Fallback silence
          setItems(getRandomTrending(6));
        }
      } else {
        // Popular is static curated list
        const allPopular = getBySearchVolume();
        const shuffled = [...allPopular].sort(() => 0.5 - Math.random());
        setItems(shuffled.slice(0, 6));
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    updateItems();
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-6 transition-colors duration-200 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          🔥 Trending Keywords
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-500 transition-all ${isRefreshing ? 'animate-spin text-blue-500' : ''}`}
          title="Refresh keywords"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('trending')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${view === 'trending'
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
            : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
        >
          📈 Trending
        </button>
        <button
          onClick={() => setView('popular')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${view === 'popular'
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
            : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
        >
          🔥 Popular
        </button>
      </div>

      {/* Keywords List */}
      <div className={`space-y-2 max-h-[300px] overflow-y-auto transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
        {items.map((kw, index) => (
          <KeywordCard
            key={`${kw.keyword}-${index}`}
            keyword={kw}
            onClick={() => onKeywordClick(kw.keyword)}
          />
        ))}
      </div>

      {/* Help text */}
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Click any keyword to add to SEO tracker
      </p>
    </div>
  );
}

function KeywordCard({
  keyword,
  onClick
}: {
  keyword: TrendingKeyword;
  onClick: () => void;
}) {
  const difficultyColor = getDifficultyColor(keyword.difficulty);

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 border border-transparent hover:border-blue-300 dark:hover:border-blue-600 group"
    >
      {/* Keyword & Category */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">{getCategoryEmoji(keyword.category)}</span>
            <span className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {keyword.keyword}
            </span>
          </div>
        </div>
        <span className="text-xs">{getTrendingIcon(keyword.trending)}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 mt-2">
        {/* Search Volume */}
        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
          {keyword.searchVolume}/mo
        </span>

        {/* Difficulty */}
        <span className={`text-xs px-2 py-0.5 rounded ${difficultyColor.bg} ${difficultyColor.text}`}>
          {keyword.difficulty}
        </span>
      </div>
    </button>
  );
}
