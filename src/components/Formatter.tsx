"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
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
  Wand2 // Swapped Play for Wand2 for a more magical/modern feel, or keep Play if preferred. Let's stick to sleek icons.
} from "lucide-react";
import { UrlLoader } from "./UrlLoader";
import { GoogleAdsense } from "./GoogleAdsense"; // Ensure this path is correct
import { useTheme } from "@/contexts/ThemeContext";

interface FormatterProps {
  title: string;
  description: string;
  inputType: "json" | "yaml";
  outputType: "json" | "yaml" | "text";
  defaultValue?: string;
  onTransform: (input: string, tabSize: number) => Promise<string>;
  onMinify?: (input: string) => Promise<string>;
  sampleData?: string;
}

export function Formatter({
  title,
  description,
  inputType,
  outputType,
  defaultValue = "",
  onTransform,
  onMinify,
  sampleData
}: FormatterProps) {
  const { theme } = useTheme();
  // Monaco theme: 'vs' (light), 'vs-dark' (dark)
  const editorTheme = theme === "dark" ? "vs-dark" : "light";
  const storageKey = `textgauge_input_${inputType}`;

  const [inputCode, setInputCode] = useState(defaultValue);
  const [outputCode, setOutputCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tabSize, setTabSize] = useState(2);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Auto-load from storage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setInputCode(saved);
    }
  }, [storageKey]);

  // Auto-save to storage
  useEffect(() => {
    if (!mounted) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(storageKey, inputCode);
    }, 500); // 500ms debounce
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

  // Keyboard Shortcuts
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

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      throw err; // Passed back to UrlLoader
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

  const getStats = (text: string) => {
    return {
      chars: text.length,
      lines: text.split('\n').length,
      size: new Blob([text]).size
    };
  };

  return (
    <div className="h-screen supports-[height:100dvh]:h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200 overflow-hidden font-sans">

      {/* Header Section - Minimal & Clean with Glassmorphism */}
      <header className="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 w-fit">
                {title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium hidden sm:block">{description}</p>
            </div>

            {/* Top Ad Slot - Compact */}
            {process.env.NEXT_PUBLIC_AD_SLOT_HEADER && (
              <div className="flex justify-center shrink-0">
                <div className="w-full max-w-[728px] h-[90px] rounded-lg overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">
                  <GoogleAdsense
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER}
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Layout Container - Optimized for Maximum Editor Space */}
        <div className="flex flex-col lg:flex-row gap-4 h-full">

          {/* LEFT COLUMN: Input Editor */}
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 lg:w-[calc(50%-110px)] min-h-0 overflow-hidden transition-all duration-200">
            {/* Toolbar */}
            <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Input</span>
                {/* Modern Badge */}
                <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">Saved</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                  title="Upload File"
                >
                  <Upload size={16} strokeWidth={2} />
                  <input type="file" id="file-upload" className="hidden" accept=".json,.yaml,.yml,.txt" onChange={handleFileUpload} />
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

            {/* Editor Area */}
            <div className="flex-1 relative min-h-0 bg-slate-50/30 dark:bg-black/20" >
              <Editor
                height="100%"
                defaultLanguage="plaintext"
                language="plaintext"
                theme={editorTheme}
                value={inputCode}
                onChange={(val) => setInputCode(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace", // Better font stack if available
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: tabSize,
                  formatOnPaste: true,
                  wordWrap: 'on',
                  padding: { top: 12, bottom: 12 },
                  lineNumbers: 'on',
                  glyphMargin: true,
                  folding: true,
                  renderLineHighlight: 'all', // clearer highlight
                  overviewRulerBorder: false,
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                }}
              />
            </div >

            {/* Status Bar */}
            < div className="shrink-0 px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium font-mono bg-white dark:bg-slate-900" >
              <div className="flex gap-3">
                <span>{getStats(inputCode).lines} LN</span>
                <span>{getStats(inputCode).chars} CH</span>
              </div>
              <div>
                {(getStats(inputCode).size / 1024).toFixed(2)} KB
              </div>
            </div >
          </div >

          {/* MIDDLE COLUMN: Controls - Narrower & Cleaner */}
          < div className="flex flex-col gap-3 lg:w-[200px] shrink-0 h-full overflow-y-auto py-1 scrollbar-hide" >

            {/* Main Actions - Premium Gradient Button */}
            < div className="flex flex-col gap-2 shrink-0" >
              <button
                onClick={handleFormat}
                className="relative group w-full py-3 px-3 rounded-lg font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-500/30 active:translate-y-0 active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-600 transition-all duration-300 group-hover:scale-105"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <Wand2 size={16} className="transition-transform group-hover:rotate-12" />
                  <span className="text-sm">Beautify</span>
                </div>
              </button>

              {
                onMinify && (
                  <button
                    onClick={handleMinify}
                    className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Minimize2 size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                    Minify
                  </button>
                )
              }

              <button
                onClick={() => {
                  if (outputCode) {
                    setInputCode(outputCode);
                    setOutputCode("");
                  }
                }}
                className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                title="Replace Input with Output"
              >
                <ArrowLeft size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                Swap
              </button>
            </div >

            {/* Tab Settings Card */}
            < div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 shrink-0" >
              <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                Indentation
              </label>
              <div className="relative">
                <select
                  value={tabSize}
                  onChange={(e) => setTabSize(Number(e.target.value))}
                  className="w-full appearance-none p-2 pl-3 pr-8 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-950/50 text-xs font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={3}>3 Spaces</option>
                  <option value={4}>4 Spaces</option>
                  <option value={8}>8 Spaces</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div >

            {sampleData && (
              <button
                onClick={handleLoadSample}
                className="text-xs font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:underline text-center shrink-0 transition-colors py-1"
              >
                Load Sample
              </button>
            )}

            {/* Ad Slot - Conditionally Rendered */}
            {
              process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR && (
                <div className="flex-1 rounded-lg overflow-hidden min-h-[150px] flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800">
                  <GoogleAdsense
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
                    style={{ display: 'block', width: '100%' }}
                  />
                </div>
              )
            }

          </div >

          {/* RIGHT COLUMN: Output Editor */}
          < div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 lg:w-[calc(50%-110px)] min-h-0 overflow-hidden transition-all duration-200" >
            {/* Toolbar */}
            < div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900" >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Output</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 text-xs font-bold ${copied
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                    }`}
                  title="Copy to Clipboard"
                >
                  {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2} />}
                  {copied ? "Copied" : "Copy"}
                </button>
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
            </div >

            {/* Editor/Error Area */}
            < div className="flex-1 relative min-h-0 bg-slate-50/30 dark:bg-black/20" >
              {
                error ? (
                  <div className="absolute inset-0 p-6 z-10 overflow-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm" >
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
                  <Editor
                    height="100%"
                    defaultLanguage={outputType === 'text' ? 'plaintext' : outputType}
                    language={outputType === 'text' ? 'plaintext' : outputType}
                    theme={editorTheme}
                    value={outputCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      wordWrap: 'on',
                      padding: { top: 12, bottom: 12 },
                      lineNumbers: 'on',
                      glyphMargin: true,
                      folding: true,
                      renderLineHighlight: 'all',
                      overviewRulerBorder: false,
                      overviewRulerLanes: 0,
                      hideCursorInOverviewRuler: true,
                    }}
                  />
                )}
            </div >

            {/* Status Bar */}
            < div className="shrink-0 px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium font-mono bg-white dark:bg-slate-900" >
              <div className="flex gap-3">
                <span>{getStats(outputCode).lines} LN</span>
                <span>{getStats(outputCode).chars} CH</span>
              </div>
              <div>
                {(getStats(outputCode).size / 1024).toFixed(2)} KB
              </div>
            </div >
          </div >

        </div >
      </main >

      <UrlLoader
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onLoad={handleLoadUrl}
      />
    </div >
  );
}
