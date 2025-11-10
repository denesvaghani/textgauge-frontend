import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface RepeatedPhrase {
  phrase: string;
  count: number;
}

interface Metrics {
  ok: boolean;
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number; // seconds
  speakingTime: number; // seconds
  keywordCount: number;
  keywordDensity: number; // %
  repeatedPhrases: RepeatedPhrase[];
}

type AnalyzePayload = { text: string; keyword: string };

// Bug fix #1: Escape special regex characters to prevent injection
function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function analyzeText(rawText = "", rawKeyword = ""): Metrics {
  const text = String(rawText);
  const keyword = String(rawKeyword || "").trim().toLowerCase();

  const words = text.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  const charCount = text.length;

  // Bug fix #4: Count last sentence even without trailing punctuation
  const sentenceMatches = text.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
  const sentenceCount = sentenceMatches.filter(
    (s) => s.trim().length > 0
  ).length;

  // Bug fix #5: Ensure at least 1 paragraph for non-empty text
  const paragraphCandidates = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const paragraphCount =
    text.trim().length > 0 ? Math.max(1, paragraphCandidates.length) : 0;

  const readingTimeSeconds = wordCount / 3.75; // ~225 wpm
  const speakingTimeSeconds = wordCount / 2.5; // ~150 wpm

  let keywordCount = 0;
  let keywordDensity = 0;
  if (keyword) {
    // Bug fix #1: Use escapeRegex to safely handle special characters
    const safeKeyword = escapeRegex(keyword);
    // Only use word boundaries if the keyword doesn't contain special chars/spaces
    const hasSpecialChars = /[^a-z0-9]/i.test(keyword);
    const pattern = hasSpecialChars
      ? safeKeyword
      : `\\b${safeKeyword}\\b`;
    const regex = new RegExp(pattern, "gi");
    keywordCount = (text.match(regex) || []).length;
    keywordDensity = wordCount
      ? Number(((keywordCount / wordCount) * 100).toFixed(2))
      : 0;
  }

  // Repeated 3-word phrases (top 5)
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const phrases: Record<string, number> = {};
  for (let i = 0; i < tokens.length - 2; i++) {
    const phrase = `${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`;
    if (phrase.length <= 10) continue;
    phrases[phrase] = (phrases[phrase] || 0) + 1;
  }

  const repeatedPhrases = Object.entries(phrases)
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([phrase, count]) => ({ phrase, count }));

  return {
    ok: true,
    wordCount,
    charCount,
    sentenceCount,
    paragraphCount,
    readingTime: Math.ceil(readingTimeSeconds),
    speakingTime: Math.ceil(speakingTimeSeconds),
    keywordCount,
    keywordDensity,
    repeatedPhrases,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<AnalyzePayload>;
    
    // Validate input
    if (
      !body ||
      typeof body.text !== "string" ||
      typeof body.keyword !== "string"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid payload. Expected { text: string, keyword: string }.",
        },
        { status: 400 }
      );
    }

    const metrics = analyzeText(body.text, body.keyword);
    return NextResponse.json(metrics, { status: 200 });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json(
      { ok: false, error: "ANALYZE_FAILED" },
      { status: 500 }
    );
  }
}
