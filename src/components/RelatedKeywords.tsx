"use client";

import { useState, useEffect } from "react";
import { getCategoryEmoji } from "@/data/trendingKeywords";

// Simple helper for difficulty colors
const getDifficultyColorName = (difficulty: string): string => {
  if (difficulty === "low") return "green";
  if (difficulty === "medium") return "yellow";
  return "red";
};

interface KeywordSuggestion {
  keyword: string;
  searchVolume?: string;
  category?: 'writing' | 'seo' | 'social' | 'ai' | 'marketing' | 'general';
  difficulty?: "low" | "medium" | "high";
}

interface RelatedKeywordsProps {
  keyword: string;
  onSelectKeyword: (keyword: string) => void;
}

export default function RelatedKeywords({
  keyword,
  onSelectKeyword,
}: RelatedKeywordsProps) {
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if keyword has at least 2 characters
    if (!keyword || keyword.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/keyword-suggestions?keyword=${encodeURIComponent(keyword.trim())}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Error fetching keyword suggestions:", err);
        setError("Could not load suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls (wait 500ms after user stops typing)
    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  // Don't render anything if no keyword or too short
  if (!keyword || keyword.trim().length < 2) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="mt-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Finding related keywords...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-2 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // No suggestions
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 p-3 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">
      <p className="text-xs font-medium text-blue-900 dark:text-blue-200 mb-2">
        💡 Related Keywords (Click to use):
      </p>

      <div className="space-y-1.5">
        {suggestions.map((suggestion, index) => {
          const emoji = suggestion.category
            ? getCategoryEmoji(suggestion.category)
            : "🔍";
          const difficultyColor = suggestion.difficulty
            ? getDifficultyColorName(suggestion.difficulty)
            : "gray";

          return (
            <button
              key={`${suggestion.keyword}-${index}`}
              onClick={() => onSelectKeyword(suggestion.keyword)}
              className="w-full flex items-center justify-between gap-2 p-2 rounded-md 
                       bg-white dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700
                       hover:border-blue-400 dark:hover:border-blue-500
                       hover:bg-blue-50 dark:hover:bg-blue-900/30
                       transition-all duration-150 text-left group"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-base flex-shrink-0">{emoji}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {suggestion.keyword}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {suggestion.searchVolume && (
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {suggestion.searchVolume}
                  </span>
                )}
                {suggestion.difficulty && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      difficultyColor === "green"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : difficultyColor === "yellow"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {suggestion.difficulty}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
        Showing top {suggestions.length} related keyword
        {suggestions.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
