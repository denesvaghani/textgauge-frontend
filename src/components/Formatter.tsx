"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Copy,
  Minimize2,
  Download,
  Upload,
  Globe,
  Check,
  AlertTriangle,
  ArrowLeft,
  Wand2
} from "lucide-react";
import { UrlLoader } from "./UrlLoader";
import { GoogleAdsense } from "./GoogleAdsense";
import { useTheme } from "@/contexts/ThemeContext";
import { SimpleCodeEditor } from "@/components/SimpleCodeEditor";

interface FormatterProps {
  title: string;
  description: string;
  inputType: "json" | "yaml" | "text" | "csv" | "toml";
  outputType: "json" | "yaml" | "text" | "csv" | "toml";
  defaultValue?: string;
  onTransform: (input: string, tabSize: number) => Promise<string>;
  onMinify?: (input: string) => Promise<string>;
  sampleData?: string;
  id?: string;
  customActions?: React.ReactNode;
  actionLabel?: string;
}

export function Formatter({
  title,
  description,
  inputType,
  outputType,
  defaultValue = "",
  onTransform,
  onMinify,
  sampleData,
  id,
  customActions,
  actionLabel = "Beautify"
}: FormatterProps) {
  const { theme } = useTheme();
  const storageKey = id ? `textgauge_input_${id}_v2` : `textgauge_input_${inputType}_v2`;

  const [inputCode, setInputCode] = useState(defaultValue);
  const [outputCode, setOutputCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tabSize, setTabSize] = useState(2);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setInputCode(saved);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(storageKey, inputCode);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputCode, mounted, storageKey]);

  const handleFormat = useCallback(async () => {
    setError(null);
    if (!inputCode.trim()) {
      setOutputCode("");
      return;
    }
    try {
      const result = await onTransform(inputCode, tabSize);
      setOutputCode(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    }
  }, [inputCode, tabSize, onTransform]);

  const handleMinify = useCallback(async () => {
    setError(null);
    if (!onMinify || !inputCode.trim()) return;
    try {
      const result = await onMinify(inputCode);
      setOutputCode(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    }
  }, [inputCode, onMinify]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFormat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFormat]);

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
    setError(null);
    localStorage.removeItem(storageKey);
  };

  const handleLoadUrl = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const text = await res.text();
      setInputCode(text);
    } catch (err: unknown) {
      throw err;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        setInputCode(text);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleLoadSample = () => {
    if (sampleData) setInputCode(sampleData);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const getStats = (text: string) => {
    if (!text) return { lines: 0, chars: 0, size: 0 };
    return {
      chars: text.length,
      lines: text.split('\n').length,
      size: new Blob([text]).size
    };
  };

  return (
    <div className="h-screen supports-[height:100dvh]:h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200 overflow-hidden font-sans">

      {/* Header Section */}
      <header className="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 w-fit">
                {title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium hidden sm:block">{description}</p>
            </div>

            {/* Top Ad Slot */}
            <div className="flex justify-center shrink-0">
              <div className="w-full max-w-[728px] h-[90px] rounded-lg overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">
                <GoogleAdsense
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || "example_slot"}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Action Bar - ABOVE Editors */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm py-3 px-4 mb-4 border border-indigo-200/50 dark:border-indigo-800/30 rounded-xl shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleFormat}
                disabled={!inputCode.trim()}
                className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                title="⌘+Enter / Ctrl+Enter"
              >
                <Wand2 size={16} />
                {actionLabel}
              </button>

              {customActions}

              {onMinify && (
                <button
                  onClick={handleMinify}
                  disabled={!inputCode.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
                >
                  <Minimize2 size={14} />
                  Minify
                </button>
              )}

              <button
                onClick={() => {
                  if (outputCode) {
                    setInputCode(outputCode);
                    setOutputCode("");
                  }
                }}
                disabled={!outputCode}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
              >
                <ArrowLeft size={14} />
                Swap
              </button>

              {sampleData && (
                <button
                  onClick={handleLoadSample}
                  className="inline-flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium rounded-lg transition-colors"
                >
                  Load Sample
                </button>
              )}
            </div>

            {/* Right Side: Indentation */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Indent
              </label>
              <select
                value={tabSize}
                onChange={(e) => setTabSize(Number(e.target.value))}
                className="appearance-none px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value={2}>2 Spaces</option>
                <option value={3}>3 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>
          </div>
        </div>

        {/* Two-Panel Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Input Editor */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-indigo-200/50 dark:border-indigo-800/30 overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-indigo-50/50 dark:bg-indigo-900/20 border-b border-indigo-200/50 dark:border-indigo-800/30 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Input
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                  title="Upload File"
                >
                  <Upload size={16} strokeWidth={2} />
                  <input type="file" id="file-upload" className="hidden" accept=".json,.yaml,.yml,.txt,.toml,.csv" onChange={handleFileUpload} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsUrlModalOpen(true)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                  title="Load from URL"
                >
                  <Globe size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                  title="Clear"
                >
                  <Trash2 size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            <div className="h-[450px]">
              <SimpleCodeEditor
                value={inputCode}
                onChange={setInputCode}
                placeholder="Paste your code here..."
                language={inputType}
              />
            </div>
            <div className="px-4 py-2 bg-indigo-50/50 dark:bg-indigo-900/20 border-t border-indigo-200/50 dark:border-indigo-800/30 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>Lines: {getStats(inputCode).lines}</span>
              <span>Chars: {getStats(inputCode).chars}</span>
              <span>Size: {formatSize(getStats(inputCode).size)}</span>
            </div>
          </div>

          {/* Output Editor */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-indigo-200/50 dark:border-indigo-800/30 overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-indigo-50/50 dark:bg-indigo-900/20 border-b border-indigo-200/50 dark:border-indigo-800/30 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Output
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([outputCode], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `formatted.${outputType}`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                  title="Download"
                >
                  <Download size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            <div className="h-[450px] relative">
              {
                error ? (
                  <div className="absolute inset-0 p-6 z-10 overflow-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/30 dark:bg-red-900/10 shadow-sm">
                      <div className="flex items-center gap-3 text-red-700 dark:text-red-400 font-bold mb-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <AlertTriangle size={20} />
                        </div>
                        <span>Validation Error</span>
                      </div>
                      <pre className="text-sm text-red-600 dark:text-red-300 whitespace-pre-wrap font-mono leading-relaxed pl-11">
                        {error}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <SimpleCodeEditor
                    value={outputCode}
                    readOnly={true}
                    placeholder="Result will appear here..."
                    language={outputType === "text" ? "text" : outputType}
                  />
                )}
            </div>
            <div className="px-4 py-2 bg-indigo-50/50 dark:bg-indigo-900/20 border-t border-indigo-200/50 dark:border-indigo-800/30 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>Lines: {getStats(outputCode).lines}</span>
              <span>Chars: {getStats(outputCode).chars}</span>
              <span>Size: {formatSize(getStats(outputCode).size)}</span>
            </div>
          </div>
        </div>

      </main>

      <UrlLoader
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onLoad={handleLoadUrl}
      />
    </div>
  );
}
