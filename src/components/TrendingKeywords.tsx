'use client';

import { useState } from 'react';
import { 
  getTopTrending, 
  getBySearchVolume,
  getCategoryEmoji,
  getTrendingIcon,
  getDifficultyColor,
  type TrendingKeyword 
} from '@/data/trendingKeywords';

interface TrendingKeywordsProps {
  onKeywordClick: (keyword: string) => void;
}

export function TrendingKeywords({ onKeywordClick }: TrendingKeywordsProps) {
  const [view, setView] = useState<'trending' | 'popular'>('trending');
  
  const keywords = view === 'trending' 
    ? getTopTrending(6) 
    : getBySearchVolume().slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          🔥 Trending Keywords
        </h3>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('trending')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${ 
            view === 'trending'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          📈 Trending
        </button>
        <button
          onClick={() => setView('popular')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
            view === 'popular'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          🔥 Popular
        </button>
      </div>

      {/* Keywords List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {keywords.map((kw, index) => (
          <KeywordCard
            key={index}
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
