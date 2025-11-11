"use client";

import { useEffect, useRef, useState } from "react";
import { useLiveMetrics } from "../lib/useLiveMetrics";
import type { Metrics } from "../lib/types";

export function Editor() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [keyword, setKeyword] = useState("");

  // history: keep items + index together
  const [historyState, setHistoryState] = useState<{
    items: string[];
    index: number;
  }>({ items: [""], index: 0 });

  const { metrics, analyze, reset } = useLiveMetrics();

  // ensure editor starts empty
  useEffect(() => {
    if (divRef.current && divRef.current.innerHTML !== "") {
      divRef.current.innerHTML = "";
    }
  }, []);

  const getPlainText = () => {
    if (!divRef.current) return "";
    // innerText keeps line breaks more naturally than textContent
    const text = (divRef.current.innerText || "").replace(/\u00A0/g, " ");
    // Fix: trim to handle edge case where empty editor returns whitespace/newline
    return text.trim() === "" ? "" : text;
  };

  const pushHistory = (html: string) => {
    setHistoryState((prev) => {
      const { items, index } = prev;
      if (items[index] === html) return prev;

      const sliced = items.slice(0, index + 1);
      const nextItems = [...sliced, html].slice(-50);
      const nextIndex = nextItems.length - 1;

      return { items: nextItems, index: nextIndex };
    });
  };

  const handleInput = () => {
    if (!divRef.current) return;
    const html = divRef.current.innerHTML;
    const text = getPlainText();
    pushHistory(html);
    analyze(text, keyword.trim());
  };

  const clearAll = () => {
    if (divRef.current) {
      divRef.current.innerHTML = "";
    }
    setHistoryState({ items: [""], index: 0 });
    reset();
  };

  const undo = () => {
    if (historyState.index <= 0) return;
    
    const nextIndex = historyState.index - 1;
    const html = historyState.items[nextIndex];
    
    if (divRef.current) {
      divRef.current.innerHTML = html;
      // Wait for DOM to update before analyzing
      setTimeout(() => {
        const text = getPlainText();
        analyze(text, keyword.trim());
      }, 0);
    }
    
    setHistoryState((prev) => ({ ...prev, index: nextIndex }));
  };

  const redo = () => {
    if (historyState.index >= historyState.items.length - 1) return;
    
    const nextIndex = historyState.index + 1;
    const html = historyState.items[nextIndex];
    
    if (divRef.current) {
      divRef.current.innerHTML = html;
      // Wait for DOM to update before analyzing
      setTimeout(() => {
        const text = getPlainText();
        analyze(text, keyword.trim());
      }, 0);
    }
    
    setHistoryState((prev) => ({ ...prev, index: nextIndex }));
  };

  const canUndo = historyState.index > 0;
  const canRedo = historyState.index < historyState.items.length - 1;

  // Transform all text in editor
  const transformAllText = (fn: (s: string) => string) => {
    if (!divRef.current) return;
    const text = getPlainText();
    if (!text) return;
    
    const transformed = fn(text);
    // Split by newlines and wrap each line in a div to preserve line breaks
    const lines = transformed.split('\n');
    const html = lines.map(line => `<div>${line || '<br>'}</div>`).join('');
    
    divRef.current.innerHTML = html;
    pushHistory(html);
    analyze(transformed, keyword.trim());
  };
  
  // transform only within a single text node to avoid breaking layout
  const transformSelection = (fn: (s: string) => string) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      // If no selection, transform all text
      transformAllText(fn);
      return;
    }
  
    const range = sel.getRangeAt(0);
    if (!divRef.current || !divRef.current.contains(range.commonAncestorContainer)) {
      return;
    }
  
    const selected = range.toString();
    if (!selected) {
      // If empty selection, transform all text
      transformAllText(fn);
      return;
    }
  
    const transformed = fn(selected);
  
    // Replace selection, preserving newlines with <br> tags
    range.deleteContents();
    const fragment = document.createDocumentFragment();
    const lines = transformed.split('\n');
    lines.forEach((line, i) => {
      fragment.appendChild(document.createTextNode(line));
      if (i < lines.length - 1) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    range.insertNode(fragment);
  
    // Move caret to end of inserted text
    sel.removeAllRanges();
    const caret = document.createRange();
    caret.selectNodeContents(divRef.current);
    caret.collapse(false);
    sel.addRange(caret);
  
    // Sync history + metrics
    if (divRef.current) {
      const html = divRef.current.innerHTML;
      pushHistory(html);
      analyze(getPlainText(), keyword.trim());
    }
  };
  

  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());

  const toSnakeCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s-]+/g, "_");

  const exec = (cmd: string) => {
    document.execCommand(cmd, false);
    if (divRef.current) {
      const html = divRef.current.innerHTML;
      pushHistory(html);
      analyze(getPlainText(), keyword.trim());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left column */}
      <div className="lg:col-span-9 bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Live Statistics</h2>
        <StatsBar metrics={metrics} />

        {/* SEO Keyword Input - Moved to top for better visibility */}
        <div className="mb-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <span className="text-blue-600 mr-2">🎯</span>
            Target SEO Keyword:
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              const next = e.target.value;
              setKeyword(next);
              const text = getPlainText();
              analyze(text, next.trim());
            }}
            placeholder="e.g., best laptops under 50000"
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {keyword && (
            <p className="mt-2 text-xs text-gray-600">
              Tracking: <span className="font-semibold text-blue-700">"{keyword}"</span>
            </p>
          )}
        </div>

        {/* Text tools */}
        <div className="mt-4 p-4 bg-gray-50 rounded-t-lg shadow-inner border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Text Tools</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                clearAll();
              }}
              className="bg-red-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-red-600 text-xs"
            >
              🗑️ Clear
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                if (canUndo) undo();
              }}
              disabled={!canUndo}
              className={`bg-gray-300 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs ${
                !canUndo && "opacity-50"
              }`}
            >
              ↩️ Undo
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                if (canRedo) redo();
              }}
              disabled={!canRedo}
              className={`bg-gray-300 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs ${
                !canRedo && "opacity-50"
              }`}
            >
              ↪️ Redo
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                exec("bold");
              }}
              className="bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg hover:bg-blue-600 text-xs"
            >
              B
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                exec("italic");
              }}
              className="bg-blue-500 text-white italic py-1.5 px-3 rounded-lg hover:bg-blue-600 text-xs"
            >
              /
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                transformSelection(toTitleCase);
              }}
              className="bg-green-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-green-600 text-xs"
            >
              Aa
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                transformSelection((s) => s.toLowerCase());
              }}
              className="bg-green-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-green-600 text-xs"
            >
              abc
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                transformSelection(toSnakeCase);
              }}
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
          onInput={handleInput}
          className="bg-white rounded-b-lg text-lg min-h-[32rem] p-6 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          data-placeholder="Start typing here or paste your content..."
          style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}
        />
      </div>

      {/* Right column */}
      <div className="lg:col-span-3">
        <Sidebar metrics={metrics} keyword={keyword} />
      </div>
    </div>
  );
}

/* --- Stats & Sidebar components --- */

function StatsBar({ metrics }: { metrics: Metrics }) {
  const m = metrics;

  const fmt = (sec: number) => {
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
        ["Words", m.wordCount],
        ["Chars", m.charCount],
        ["Sentences", m.sentenceCount],
        ["Paragraphs", m.paragraphCount],
        ["Read Time", fmt(m.readingTime)],
        ["Speak Time", fmt(m.speakingTime)],
      ].map(([label, value]) => (
        <div
          key={label}
          className="bg-gray-50 p-3 rounded-lg shadow-inner text-center"
        >
          <div className="text-xl font-bold text-blue-600">
            {String(value)}
          </div>
          <div className="text-xs text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ metrics, keyword }: { metrics: Metrics; keyword: string }) {
  const m = metrics;

  return (
    <div className="sticky top-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Analysis Dashboard</h2>

      {/* Keyword Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          SEO Keyword Metrics
        </h3>
        {keyword && (
          <div className="mb-3 px-3 py-2 bg-blue-50 rounded-lg">
            <span className="text-xs text-gray-600">Tracking:</span>
            <p className="text-sm font-semibold text-blue-700 break-words">
              "{keyword}"
            </p>
          </div>
        )}
        {m.keywordCount > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Occurrences:</span>
              <span className="text-lg font-bold text-blue-600">{m.keywordCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Density:</span>
              <span className="text-lg font-bold text-green-600">{m.keywordDensity}%</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">
            {m.wordCount > 0 && keyword ? "Keyword not found in text" : m.wordCount > 0 ? "Enter a keyword above to track" : "Start typing and add a keyword..."}
          </p>
        )}
      </div>

      {/* Repeated Phrases */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Repeated Phrases
        </h3>
        <div className="h-40 overflow-y-auto text-xs space-y-1">
          {m.repeatedPhrases.length > 0 ? (
            m.repeatedPhrases.map((p) => (
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
              {m.wordCount > 0 ? "No repeated phrases found" : "Start typing to see patterns..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
