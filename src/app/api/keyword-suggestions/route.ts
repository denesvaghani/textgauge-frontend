import { NextRequest, NextResponse } from "next/server";
import { trendingKeywords } from "@/data/trendingKeywords";

interface KeywordSuggestion {
  keyword: string;
  searchVolume?: string;
  category?: string;
  difficulty?: "low" | "medium" | "high";
}

/**
 * GET /api/keyword-suggestions?keyword=character+counter
 * 
 * Returns top 5 related keyword suggestions with search volumes.
 * 
 * Strategy:
 * 1. Search our curated trending keywords database first
 * 2. Use semantic matching to find related keywords
 * 3. Return top 5 by relevance and search volume
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");

    if (!keyword || keyword.trim().length === 0) {
      return NextResponse.json(
        { error: "Keyword parameter is required" },
        { status: 400 }
      );
    }

    const normalizedKeyword = keyword.toLowerCase().trim();

    // Get suggestions from our database
    const suggestions = getSuggestionsFromDatabase(normalizedKeyword);

    return NextResponse.json({
      keyword,
      suggestions,
      source: "curated",
    });
  } catch (error) {
    console.error("Keyword suggestions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch keyword suggestions" },
      { status: 500 }
    );
  }
}

/**
 * Find related keywords from our curated database using:
 * - Direct word matches (strict relevance)
 * - Semantic similarity
 * - Category matching
 * - Search volume as tie-breaker
 */
function getSuggestionsFromDatabase(
  inputKeyword: string
): KeywordSuggestion[] {
  const suggestions: Array<KeywordSuggestion & { score: number }> = [];
  const inputWords = inputKeyword.split(/\s+/).filter(w => w.length > 2); // Ignore short words

  trendingKeywords.forEach((kw) => {
    const kwLower = kw.keyword.toLowerCase();
    let score = 0;

    // Exact match (excluding itself)
    if (kwLower === inputKeyword) {
      return; // Skip exact match to show only related keywords
    }

    // STRICT RELEVANCE: Must have at least one meaningful word in common
    const kwWords = kwLower.split(/\s+/).filter(w => w.length > 2);
    
    // Count exact word matches
    const exactMatches = inputWords.filter(inputWord =>
      kwWords.some(kwWord => kwWord === inputWord || inputWord === kwWord)
    );
    
    // Count partial matches (e.g., "character" matches "characters")
    const partialMatches = inputWords.filter(inputWord =>
      kwWords.some(kwWord => 
        (kwWord.includes(inputWord) && kwWord !== inputWord) ||
        (inputWord.includes(kwWord) && inputWord !== kwWord)
      )
    );

    // Must have at least one match to be considered relevant
    if (exactMatches.length === 0 && partialMatches.length === 0) {
      return; // Skip completely unrelated keywords
    }

    // Score based on word overlap
    score += exactMatches.length * 100; // Exact word match = high relevance
    score += partialMatches.length * 50; // Partial match = medium relevance

    // Substring bonus (e.g., "game" in "game development")
    if (kwLower.includes(inputKeyword) || inputKeyword.includes(kwLower)) {
      score += 80;
    }

    // Search volume as tie-breaker (not primary factor)
    const volumeNum = parseSearchVolume(kw.searchVolume);
    if (volumeNum > 100000) score += 10;
    else if (volumeNum > 50000) score += 7;
    else if (volumeNum > 10000) score += 5;

    // Small bonus for low difficulty
    if (kw.difficulty === "low") score += 5;
    else if (kw.difficulty === "medium") score += 3;

    // Small bonus for trending
    if (kw.trending === "up") score += 8;
    else if (kw.trending === "new") score += 5;

    suggestions.push({
      keyword: kw.keyword,
      searchVolume: kw.searchVolume,
      category: kw.category,
      difficulty: kw.difficulty,
      score,
    });
  });

  // If we don't have enough relevant suggestions, add popular keywords from the same domain
  if (suggestions.length < 5) {
    const popularKeywords = trendingKeywords
      .filter(
        (kw) =>
          !suggestions.some((s) => s.keyword === kw.keyword) &&
          kw.keyword.toLowerCase() !== inputKeyword
      )
      .sort(
        (a, b) => parseSearchVolume(b.searchVolume) - parseSearchVolume(a.searchVolume)
      )
      .slice(0, 5 - suggestions.length);

    popularKeywords.forEach((kw) => {
      suggestions.push({
        keyword: kw.keyword,
        searchVolume: kw.searchVolume,
        category: kw.category,
        difficulty: kw.difficulty,
        score: 5, // Low base score for popular fallbacks
      });
    });
  }

  // Sort by score and return top 5
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ keyword, searchVolume, category, difficulty }) => ({
      keyword,
      searchVolume,
      category,
      difficulty,
    }));
}

/**
 * Parse search volume string to number for comparison
 * Examples: "165k/mo" -> 165000, "12k/mo" -> 12000
 */
function parseSearchVolume(volume: string): number {
  const match = volume.match(/(\d+(?:\.\d+)?)\s*k/i);
  if (match) {
    return parseFloat(match[1]) * 1000;
  }
  return 0;
}
