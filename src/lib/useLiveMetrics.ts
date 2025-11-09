"use client";

import { useEffect, useRef, useState } from "react";
import type { Metrics } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const WS_BASE = process.env.NEXT_PUBLIC_WS_BASE_URL!;

export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const wsTimerRef = useRef<any>(null);
  const lastPayloadRef = useRef<{ text: string; keyword: string }>({
    text: "",
    keyword: "",
  });

  useEffect(() => {
    initWebSocket();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (wsTimerRef.current) clearTimeout(wsTimerRef.current);
    };
  }, []);

  function initWebSocket() {
    try {
      const url = `${WS_BASE}/ws/analyze`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        // no-op
      };

      ws.onclose = () => {
        setTimeout(initWebSocket, 1500);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "metrics" && msg.metrics) {
            setMetrics(msg.metrics as Metrics);
          }
        } catch {
          // ignore
        }
      };
    } catch {
      // ignore
    }
  }

  async function analyzeViaRest(text: string, keyword: string) {
    if (!text.trim()) {
      setMetrics(null);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, keyword }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.metrics) setMetrics(data.metrics as Metrics);
    } catch {
      // ignore
    }
  }

  function analyze(text: string, keyword: string, mode: "live" | "paste") {
    lastPayloadRef.current = { text, keyword };

    if (mode === "paste") {
      analyzeViaRest(text, keyword);
      return;
    }

    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      analyzeViaRest(text, keyword);
      return;
    }

    if (wsTimerRef.current) clearTimeout(wsTimerRef.current);
    wsTimerRef.current = setTimeout(() => {
      ws.send(JSON.stringify({ text, keyword }));
    }, 150);
  }

  return { metrics, analyze };
}
