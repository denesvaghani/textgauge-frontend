"use client";

import { useEffect, useRef, useState } from "react";
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

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const WS_BASE = (process.env.NEXT_PUBLIC_WS_BASE_URL || "").replace(/\/$/, "");

export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics>(EMPTY);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!WS_BASE) return;

    const ws = new WebSocket(`${WS_BASE}/ws/analyze`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "metrics" && data.ok) {
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
        console.error("WS parse error", err);
      }
    };

    ws.onerror = (e) => console.error("WS error", e);

    return () => {
      ws.close();
    };
  }, []);

  const analyze = async (
    text: string,
    keyword: string,
    mode: "live" | "paste" = "live"
  ) => {
    const payload = { text, keyword };

    if (mode === "live" && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
      return;
    }

    if (!API_BASE) return;

    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
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
      console.error("REST analyze error", err);
    }
  };

  const reset = () => setMetrics(EMPTY);

  return { metrics, analyze, reset };
}
