"use client";

import { useState } from "react";
import type { Metrics } from "./types";

const EMPTY: Metrics = {
  ok: true,
  wordCount: 0,
  charCount: 0,
  sentenceCount: 0,
  paragraphCount: 0,
  readingTime: 0,
  speakingTime: 0,
  keywordCount: 0,
  keywordDensity: 0,
  repeatedPhrases: [],
};

export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics>(EMPTY);

  const analyze = async (text: string, keyword: string) => {
    const payload = { text, keyword };

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.ok) {
        setMetrics({
          ok: true,
          wordCount: data.wordCount ?? 0,
          charCount: data.charCount ?? 0,
          sentenceCount: data.sentenceCount ?? 0,
          paragraphCount: data.paragraphCount ?? 0,
          readingTime: data.readingTime ?? 0,
          speakingTime: data.speakingTime ?? 0,
          keywordCount: data.keywordCount ?? 0,
          keywordDensity: data.keywordDensity ?? 0,
          repeatedPhrases: data.repeatedPhrases ?? [],
        });
      }
    } catch (err) {
      console.error("Analyze error:", err);
    }
  };

  const reset = () => setMetrics(EMPTY);

  return { metrics, analyze, reset };
}
