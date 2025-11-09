"use client";

import { useEffect, useRef, useState } from "react";
import { useLiveMetrics } from "../lib/useLiveMetrics";
import type { Metrics } from "../lib/types";

interface Props {}

export function Editor(_: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [keyword, setKeyword] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { metrics, analyze } = useLiveMetrics();

  // init history
  useEffect(() => {
    if (!divRef.current) return;
    const initial = divRef.current.innerHTML;
    setHistory([initial]);
    setHistoryIndex(0);
  }, []);

  function getPlainText() {
    if (!divRef.current) return "";
    return (divRef.current.textContent || "").replace(/\u00A0/g, " ");
  }

  function pushHistory(html: string) {
    setHistory((prev) => {
      if (historyIndex >= 0 && prev[historyIndex] === html) return prev;
      const sliced = prev.slice(0, historyIndex + 1);
      const next = [...sliced, html].slice(-50);
      setHistoryIndex(next.length - 1);
      return next;
    });
  }

  function onInput(e: React.FormEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    const html = target.innerHTML;

    // detect paste by inputType if available
    const inputType = (e as any).nativeEvent?.inputType || "";
    const text = getPlainText();
    const mode = inputType.includes("insertFromPaste") ? "paste" : "live";

    pushHistory(html);
    analyze(text, keyword.trim(), mode);
  }

  function clearAll() {
    if (!divRef.current) return;
    divRef.current.innerHTML = "";
    pushHistory("");
    analyze("", keyword.trim(), "live");
  }

  function undo() {
    setHistoryIndex((idx) => {
      if (idx <= 0) return idx;
      const next = idx - 1;
      if (divRef.current) {
        divRef.current.innerHTML = history[next];
      }
      analyze(getPlainText(), keyword.trim(), "live");
      return next;
    });
  }

  function redo() {
    setHistoryIndex((idx) => {
      if (idx >= history.length - 1) return idx;
      const next = idx + 1;
      if (divRef.current) {
        divRef.current.innerHTML = history[next];
      }
      analyze(getPlainText(), keyword.trim(), "live");
      return next;
    });
  }

  function transformSelection(fn: (s: string) => string) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!divRef.current || !divRef.current.contains(range.commonAncestorNode)) return;
    const selected = sel.toString();
    if (!selected) return;
    const node = document.createTextNode(fn(selected));
    range.deleteContents();
    range.insertNode(node);
    sel.removeAllRanges();
    pushHistory(divRef.current.innerHTML);
    analyze(getPlainText(), keyword.trim(), "live");
  }

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());
  }

  function toSnakeCase(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s-]+/g, "_");
  }

  function exec(cmd: string) {
    document.execCommand(cmd, false);
    if (divRef.current) {
      pushHistory(divRef.current.innerHTML);
      analyze(getPlainText(), keyword.trim(), "live");
    }
  }

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex >= 0 && historyIndex < history.length - 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Left */}
      <div className="lg:col-span-7 bg-white rounded-lg shadow-xl p-6">
        {/* Stats */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Live Statistics</h2>
        <StatsBar metrics={metrics} />
        {/* Tools */}
        <div className="mt-4 p-4 bg-gray-50 rounded-t-lg shadow-inner border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Text Tools</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={clearAll}
              className="bg-red-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-red-600 text-xs"
            >
              🗑️ Clear
            </button>
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`bg-gray-300 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs ${
                !canUndo && "opacity-50"
              }`}
            >
              ↩️ Undo
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`bg-gray-300 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs ${
                !canRedo && "opacity-50"
              }`}
            >
              ↪️ Redo
            </button>
            <button
              onClick={() => exec("bold")}
              className="bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg hover:bg-blue-600 text-xs"
            >
              B
            </button>
            <button
              onClick={() => exec("italic")}
              className="bg-blue-500 text-white italic py-1.5 px-3 rounded-lg hover:bg-blue-600 text-xs"
            >
              I
            </button>
            <button
              onClick={() => transformSelection(toTitleCase)}
              className="bg-green-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-green-600 text-xs"
            >
              Aa
            </button>
            <button
              onClick={() => transformSelection((s) => s.toLowerCase())}
              className="bg-green-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-green-600 text-xs"
            >
              abc
            </button>
            <button
              onClick={() => transformSelection(toSnakeCase)}
              className="bg-green-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-green-600 text-xs"
            >
              snake_case
            </button>
          </div>
        </div>
        {/* Editor */}
        <div
          ref={divRef}
          contentEditable
          onInput={onInput}
          className="bg-white rounded-b-lg text-lg min-h-[24rem] p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start typing here or paste your content...
        </div>
        {/* Keyword */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Target SEO Keyword:
          </label>
          <input
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              analyze(getPlainText(), e.target.value.trim(), "live");
            }}
            placeholder="e.g., best laptops under 50000"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* Right */}
      <div className="lg:col-span-3">
        <Sidebar metrics={metrics} />
      </div>
    </div>
  );
}

function StatsBar({ metrics }: { metrics: Metrics | null }) {
  const m = metrics;
  const fmt = (sec?: number) => {
    if (!sec || sec <= 0) return "0 sec";
    const s = Math.ceil(sec);
    if (s < 60) return `${s} sec`;
    const min = Math.floor(s / 60);
    const rem = s % 60;
    return rem ? `${min} min ${rem} sec` : `${min} min`;
  };
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
      {[
        ["Words", m?.wordCount ?? 0],
        ["Chars", m?.characters ?? 0],
        ["Sentences", m?.sentenceCount ?? 0],
        ["Paragraphs", m?.paragraphCount ?? 0],
        ["Read Time", fmt(m?.readingTimeSeconds)],
        ["Speak Time", fmt(m?.speakingTimeSeconds)],
      ].map(([label, value]) => (
        <div key={label} className="bg-gray-50 p-3 rounded-lg shadow-inner text-center">
          <div className="text-xl font-bold text-blue-600">{value as any}</div>
          <div className="text-xs text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ metrics }: { metrics: Metrics | null }) {
  const m = metrics;
  return (
    <div className="sticky top-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Analysis Dashboard</h2>
      {/* SEO */}
      {m && m.keyword && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">SEO Stats</h3>
          <Row label="Keyword" value={m.keyword} />
          <Row label="Keyword Count" value={m.keywordCount} />
          <Row label="Keyword Density" value={`${m.keywordDensity}%`} />
          <Row label="Page Estimate" value={m.pageCount} />
        </div>
      )}
      {/* Repeated Phrases */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Repeated Phrases</h3>
        <div className="h-40 overflow-y-auto text-xs space-y-1">
          {m && m.repeatedPhrases && m.repeatedPhrases.length > 0 ? (
            m.repeatedPhrases.slice(0, 10).map((p) => (
              <div
                key={p.phrase + p.count}
                className="flex justify-between items-center border-b border-gray-100 py-1"
              >
                <span className="text-gray-700">{p.phrase}</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold">
                  {p.count}x
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center mt-4">
              Start typing to see patterns...
            </p>
          )}
        </div>
      </div>
      {/* Warnings */}
      {m && m.warnings && m.warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs space-y-1">
          <div className="font-bold text-yellow-800 mb-1">Insights</div>
          {m.warnings.map((w, i) => (
            <div key={i} className="text-yellow-900">• {w}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-100">
      <span className="text-gray-700 font-semibold text-xs">{label}:</span>
      <span className="text-gray-900 font-bold text-xs">{value}</span>
    </div>
  );
}
