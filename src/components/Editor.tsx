"use client";

import { useEffect, useRef, useState } from "react";
import { useLiveMetrics } from "../lib/useLiveMetrics";
import type { Metrics } from "../lib/types";
import RelatedKeywords from "./RelatedKeywords";

export function Editor() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [keyword, setKeyword] = useState("");
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [rephraseError, setRephraseError] = useState<string | null>(null);

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

  // Helper: apply transform to all text nodes under a root node
  const applyTransformToTextNodes = (root: Node, fn: (s: string) => string) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const toChange: Text[] = [];

    let current = walker.nextNode();
    while (current) {
      const textNode = current as Text;
      const value = textNode.nodeValue ?? "";
      // Skip pure whitespace nodes so we don't mess with layout spacing
      if (value.trim().length > 0) {
        toChange.push(textNode);
      }
      current = walker.nextNode();
    }

    toChange.forEach((node) => {
      const original = node.nodeValue ?? "";
      node.nodeValue = fn(original);
    });
  };

  // Transform all text in the editor, preserving structure
  const transformAllText = (fn: (s: string) => string) => {
    if (!divRef.current) return;

    applyTransformToTextNodes(divRef.current, fn);

    const html = divRef.current.innerHTML;
    pushHistory(html);
    analyze(getPlainText(), keyword.trim());
  };

  // Transform only the current selection (fallback to all text if no real selection)
  const transformSelection = (fn: (s: string) => string) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      transformAllText(fn);
      return;
    }

    const range = sel.getRangeAt(0);
    if (!divRef.current || !divRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    // If selection is just a caret, treat as "transform all"
    if (range.collapsed) {
      transformAllText(fn);
      return;
    }

    // Extract the selected fragment, transform its text nodes, and re-insert
    const fragment = range.extractContents();
    applyTransformToTextNodes(fragment, fn);
    range.insertNode(fragment);

    // Move caret to end of editor
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

  const toSentenceCase = (str: string) => {
    // Split by sentence delimiters. This is a basic implementation.
    // It handles . ! ? followed by space or end of string.
    return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toSnakeCase = (str: string) => {
    // Check if already in snake_case (contains underscores, no spaces, all lowercase)
    const isSnakeCase = str.includes('_') && !str.includes(' ') && str === str.toLowerCase();

    if (isSnakeCase) {
      // Convert back to normal text: replace underscores with spaces
      return str.replace(/_/g, ' ');
    }

    // Convert to snake_case (preserve hyphens, only replace spaces with underscores)
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s\-]/g, "")  // Keep letters, numbers, spaces, and hyphens
      .trim()
      .replace(/\s+/g, "_");  // Only replace spaces with underscores
  };

  const exec = (cmd: string) => {
    document.execCommand(cmd, false);
    if (divRef.current) {
      const html = divRef.current.innerHTML;
      pushHistory(html);
      analyze(getPlainText(), keyword.trim());
    }
  };

  const handleRephrase = async () => {
    setRephraseError(null);

    // Get selected text or all text
    const sel = window.getSelection();
    const selectedText = sel?.toString() || "";
    const textToRephrase = selectedText.trim() || getPlainText();

    if (!textToRephrase) {
      setRephraseError("No text to rephrase");
      return;
    }

    if (textToRephrase.length > 5000) {
      setRephraseError("Text too long (max 5000 characters)");
      return;
    }

    setIsRephrasing(true);

    try {
      const response = await fetch('/api/rephrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToRephrase,
          tone: 'professional'
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to rephrase');
      }

      // Replace text
      if (selectedText) {
        // Replace selection
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(data.rephrased));
        }
      } else {
        // Replace all text
        if (divRef.current) {
          const lines = data.rephrased.split('\n');
          const html = lines.map((line: string) => `<div>${line || '<br>'}</div>`).join('');
          divRef.current.innerHTML = html;
        }
      }

      // Update history and metrics
      if (divRef.current) {
        const html = divRef.current.innerHTML;
        pushHistory(html);
        analyze(getPlainText(), keyword.trim());
      }

    } catch (error: unknown) {
      console.error('Rephrase error:', error);
      const msg = error instanceof Error ? error.message : 'Failed to rephrase text';
      setRephraseError(msg);
    } finally {
      setIsRephrasing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left column */}
      <div className="space-y-6 lg:col-span-9">
        {/* Card 1: Live Statistics */}
        <div className="rounded-lg bg-white p-6 shadow-xl transition-colors duration-200 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
            Live Statistics
          </h2>
          <StatsBar metrics={metrics} />
        </div>

        {/* Card 2: Editor & Tools */}
        <div className="rounded-lg bg-white p-6 shadow-xl transition-colors duration-200 dark:bg-slate-900">

          {/* Key Editor wrapper: toolbar + editor + SEO + Ad */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
            {/* Toolbar - Mobile optimized */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-slate-200 bg-slate-50 px-2 sm:px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-900/60">
              {/* Left cluster: History + Format + Case tools */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* Clear */}
                <button
                  type="button"
                  title="Clear all text"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    clearAll();
                  }}
                  className="rounded-md bg-rose-500 px-2.5 sm:px-3 py-2 sm:py-1.5 font-bold text-white shadow-sm shadow-rose-500/20 hover:bg-rose-600 hover:shadow-rose-500/30 transition-all active:scale-95 min-h-[44px] sm:min-h-0"
                >
                  Clear
                </button>

                {/* Undo */}
                <button
                  type="button"
                  title="Undo last change"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (canUndo) undo();
                  }}
                  disabled={!canUndo}
                  className="rounded-md bg-white border border-slate-200 px-2.5 sm:px-3 py-2 sm:py-1.5 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 min-h-[44px] sm:min-h-0"
                >
                  Undo
                </button>

                {/* Redo */}
                <button
                  type="button"
                  title="Redo last change"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (canRedo) redo();
                  }}
                  disabled={!canRedo}
                  className="rounded-md bg-white border border-slate-200 px-2.5 sm:px-3 py-2 sm:py-1.5 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 min-h-[44px] sm:min-h-0"
                >
                  Redo
                </button>

                <div className="hidden sm:block w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1"></div>

                {/* Bold - Hidden on mobile */}
                <button
                  type="button"
                  title="Bold (Ctrl+B)"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    exec("bold");
                  }}
                  className="hidden sm:block rounded-md bg-white border border-slate-200 px-3 py-1.5 font-bold text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all"
                >
                  B
                </button>

                {/* Italic - Hidden on mobile */}
                <button
                  type="button"
                  title="Italic (Ctrl+I)"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    exec("italic");
                  }}
                  className="hidden sm:block rounded-md bg-white border border-slate-200 px-3 py-1.5 italic text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all"
                >
                  i
                </button>

                <div className="hidden sm:block w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1"></div>

                {/* Case transformation group label - Hidden on mobile */}
                <span className="hidden sm:inline text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mr-1">Case:</span>

                {/* Title case - Hidden on mobile */}
                <button
                  type="button"
                  title="Title Case – Capitalize Each Word"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    transformSelection(toTitleCase);
                  }}
                  className="hidden sm:block rounded-md bg-emerald-500 px-3 py-1.5 font-bold text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all active:scale-95"
                >
                  Title
                </button>

                {/* Sentence case - Hidden on mobile */}
                <button
                  type="button"
                  title="Sentence case – Capitalize first letter of each sentence"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    transformSelection(toSentenceCase);
                  }}
                  className="hidden sm:block rounded-md bg-emerald-500 px-3 py-1.5 font-bold text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all active:scale-95"
                >
                  Sentence
                </button>

                {/* lowercase - Hidden on mobile */}
                <button
                  type="button"
                  title="lowercase – convert all to lowercase"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    transformSelection((s) => s.toLowerCase());
                  }}
                  className="hidden sm:block rounded-md bg-emerald-500 px-3 py-1.5 font-bold text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all active:scale-95"
                >
                  lower
                </button>

                {/* UPPERCASE - Hidden on mobile */}
                <button
                  type="button"
                  title="UPPERCASE – CONVERT ALL TO UPPERCASE"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    transformSelection((s) => s.toUpperCase());
                  }}
                  className="hidden sm:block rounded-md bg-emerald-500 px-3 py-1.5 font-bold text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all active:scale-95"
                >
                  UPPER
                </button>

                {/* snake_case - Hidden on mobile */}
                <button
                  type="button"
                  title="snake_case – convert_words_to_snake_case"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    transformSelection(toSnakeCase);
                  }}
                  className="hidden sm:block rounded-md bg-emerald-500 px-3 py-1.5 font-bold text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all active:scale-95"
                >
                  snake_case
                </button>
              </div>

              {/* Right cluster: AI rephrase */}
              <div className="ml-auto flex items-center">
                <button
                  type="button"
                  title="AI-powered text rephrasing"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleRephrase();
                  }}
                  disabled={isRephrasing}
                  className={`flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isRephrasing ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Rephrasing…</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>Rephrase</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error message under toolbar */}
            {rephraseError && (
              <div className="mx-3 mt-2 mb-1 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">
                ⚠️ {rephraseError}
              </div>
            )}

            {/* Editor Text Area */}
            <div
              ref={divRef}
              contentEditable
              onInput={handleInput}
              className="
                w-full
                min-h-[900px]
                bg-transparent
                px-4 sm:px-6
                py-5
                text-[14px]
                leading-[24px]
                text-slate-900 dark:text-slate-100
                outline-none
                placeholder:text-slate-400
                text-left
              "
              data-placeholder="Start typing here or paste your content..."
              style={{ 
                overflowY: "auto", 
                fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace",
                caretColor: "currentColor",
                textAlign: "left"
              }}
            />

            {/* SEO Keyword Input - Integrated Footer Style */}
            <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-4">
              <div className="relative group">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-[10px]">🎯</span>
                    </div>
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => {
                        const next = e.target.value;
                        setKeyword(next);
                        const text = getPlainText();
                        analyze(text, next.trim());
                      }}
                      placeholder="Target SEO Keyword (e.g., best laptops under 50000)"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                    />
                    {!keyword && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                      </div>
                    )}
                  </div>
                  {keyword && (
                    <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-bold ring-1 ring-indigo-100 dark:ring-indigo-800">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      Monitoring
                    </div>
                  )}
                </div>

                {/* Related Keywords (Collapsible/Hidden by default if empty?) */}
                <div className="mt-2">
                  <RelatedKeywords
                    keyword={keyword}
                    onSelectKeyword={(selectedKeyword) => {
                      setKeyword(selectedKeyword);
                      const text = getPlainText();
                      analyze(text, selectedKeyword.trim());
                    }}
                  />
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="lg:col-span-3">
        <Sidebar
          metrics={metrics}
          keyword={keyword}
          onKeywordSelect={(kw) => {
            setKeyword(kw);
            const text = getPlainText();
            analyze(text, kw.trim());
          }}
        />
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
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
          className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-inner text-center transition-colors duration-200"
        >
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {String(value)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Sidebar({
  metrics,
  keyword,
  onKeywordSelect
}: {
  metrics: Metrics;
  keyword: string;
  onKeywordSelect: (keyword: string) => void;
}) {
  const m = metrics;

  return (
    <div className="sticky top-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Analysis Dashboard</h2>

      {/* Keyword Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
          SEO Keyword Metrics
        </h3>
        {keyword && (
          <div className="mb-3 px-3 py-2 bg-blue-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
            <span className="text-xs text-gray-600 dark:text-gray-400">Tracking:</span>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 break-words">
              &quot;{keyword}&quot;
            </p>
          </div>
        )}
        {m.keywordCount > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Occurrences:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{m.keywordCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Density:</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">{m.keywordDensity}%</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic text-sm">
            {m.wordCount > 0 && keyword ? "Keyword not found in text" : m.wordCount > 0 ? "Enter a keyword above to track" : "Start typing and add a keyword..."}
          </p>
        )}
      </div>

      {/* Repeated Phrases */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
          Repeated Phrases
        </h3>
        <div className="h-40 overflow-y-auto text-xs space-y-1">
          {m.repeatedPhrases.length > 0 ? (
            m.repeatedPhrases.map((p) => (
              <div
                key={p.phrase + p.count}
                className="flex justify-between items-center border-b border-gray-100 dark:border-gray-600 py-1"
              >
                <span className="text-gray-700 dark:text-gray-300">{p.phrase}</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-bold">
                  {p.count}x
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic text-center mt-4">
              {m.wordCount > 0 ? "No repeated phrases found" : "Start typing to see patterns..."}
            </p>
          )}
        </div>
      </div>


    </div>
  );
}
