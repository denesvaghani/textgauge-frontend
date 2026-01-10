"use client";

import { useState } from "react";
import type { Metrics } from "./types";
import { analyzeText, EMPTY_METRICS } from "./analyzeText";

export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics>(EMPTY_METRICS);

  // Kept async so Editor.tsx doesn't need to change its call signature
  const analyze = async (text: string, keyword: string) => {
    const result = analyzeText(text, keyword);
    setMetrics(result);
  };

  const reset = () => setMetrics(EMPTY_METRICS);

  return { metrics, analyze, reset };
}
