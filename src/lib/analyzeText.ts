import type { Metrics, RepeatedPhrase } from "./types";

const READING_WORDS_PER_SECOND = 3.75; // 225 wpm
const SPEAKING_WORDS_PER_SECOND = 2.5; // 150 wpm

export const EMPTY_METRICS: Metrics = {
  ok: true,
  wordCount: 0,
  charCount: 0,
  sentenceCount: 0,
  paragraphCount: 0,
  readingTime: 0,      // seconds
  speakingTime: 0,     // seconds
  keywordCount: 0,
  keywordDensity: 0,   // %
  repeatedPhrases: [],
};

export function analyzeText(rawText: string, rawKeyword: string): Metrics {
  const text = (rawText ?? "").toString();
  const keyword = (rawKeyword ?? "").toString().trim();

  if (!text.length) {
    return { ...EMPTY_METRICS };
  }

  // ✅ Characters: JS .length (emojis count as 2+ code units, per docs)
  const charCount = text.length;

  // ✅ Normalize tokens for words & phrases
  const tokens = text
    .split(/\s+/)
    .map((token) =>
      token
        .trim()
        // strip leading/trailing non-alphanumeric (keep inner digits/apostrophes)
        .replace(/[^A-Za-z0-9]+$/g, "")
        .replace(/^[^A-Za-z0-9]+/g, "")
    )
    // drop empty / pure punctuation / emoji
    .filter((t) => t.length > 0);

  const wordCount = tokens.length;

  // ✅ Sentences: simple split on punctuation
  const sentenceCount = text
    .split(/[.!?]+/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0).length;

  // ✅ Paragraphs: non-empty line groups, default to 1 if there is any text
  const paragraphCount =
    text
      .split(/\n+/g)
      .map((p) => p.trim())
      .filter((p) => p.length > 0).length || (text.trim().length ? 1 : 0);

  // ✅ Reading & speaking time (seconds) – matches READING_TIME_STANDARDS.md
  const readingTime =
    wordCount > 0 ? wordCount / READING_WORDS_PER_SECOND : 0;
  const speakingTime =
    wordCount > 0 ? wordCount / SPEAKING_WORDS_PER_SECOND : 0;

  // ✅ Keyword stats (case-insensitive, whole word/phrase match)
  let keywordCount = 0;
  let keywordDensity = 0;

  if (keyword && wordCount > 0) {
    const escaped = escapeRegExp(keyword);
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    const matches = text.match(regex);
    keywordCount = matches ? matches.length : 0;

    if (keywordCount > 0) {
      const density = (keywordCount / wordCount) * 100;
      // one decimal place
      keywordDensity = Math.round(density * 10) / 10;
    }
  }

  // ✅ Repeated phrases: 3-word n-grams used at least 2 times, top 5
  const repeatedPhrases = findRepeatedPhrases(tokens);

  return {
    ok: true,
    wordCount,
    charCount,
    sentenceCount,
    paragraphCount,
    readingTime,
    speakingTime,
    keywordCount,
    keywordDensity,
    repeatedPhrases,
  };
}

function escapeRegExp(str: string): string {
  // Standard escape for regex special chars
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 3-word phrases (n-grams) that appear at least twice, top 5
function findRepeatedPhrases(tokens: string[]): RepeatedPhrase[] {
  const counts = new Map<string, number>();

  if (tokens.length < 3) return [];

  for (let i = 0; i <= tokens.length - 3; i++) {
    const phrase = tokens
      .slice(i, i + 3)
      .map((t) => t.toLowerCase())
      .join(" ");
    counts.set(phrase, (counts.get(phrase) ?? 0) + 1);
  }

  const items: RepeatedPhrase[] = [];
  for (const [phrase, count] of counts.entries()) {
    if (count >= 2) {
      items.push({ phrase, count });
    }
  }

  return items
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.phrase.localeCompare(b.phrase);
    })
    .slice(0, 5);
}
