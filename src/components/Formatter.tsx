"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Trash2,
  Copy,
  Minimize2,
  Download,
  Upload,
  Globe,
  Check,
  AlertTriangle,
  ArrowLeft
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
      size: new Blob([text]).size // approximate bytes
    };
  };

  return (
    // Changed root to h-screen flex flex-col for full window height
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-200 overflow-hidden">

      {/* Header Section - Reduced padding from py-4 to py-2 */}
      <header className="shrink-0 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200 z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-3xl hidden sm:block">{description}</p>
            </div>

            {/* Top Ad Slot - Made more compact if possible */}
            <div className="flex justify-center shrink-0">
              <div className="w-full max-w-[728px] h-[90px] overflow-hidden">
                <GoogleAdsense
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || "example_slot"}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Flex-1 to fill remaining space, min-h-0 to allow nested scrolling */}
      <main className="flex-1 flex flex-col min-h-0 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-2">

        {/* 3-Column Layout - h-full to take all available space */}
        <div className="flex flex-col lg:flex-row gap-4 h-full">

          {/* LEFT COLUMN: Input Editor */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 lg:w-[40%] min-h-0">
            {/* Toolbar */}
            <div className="shrink-0 px-3 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-t-lg gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Input</span>
                <span className="text-[10px] text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600">Auto-saved</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Upload File"
                >
                  <Upload size={16} />
                  <input type="file" id="file-upload" className="hidden" accept=".json,.yaml,.yml,.txt" onChange={handleFileUpload} />
                </button>
                <button
                  onClick={() => setIsUrlModalOpen(true)}
                  className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Load from URL"
                >
                  <Globe size={16} />
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  title="Clear"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative overflow-hidden min-h-0">
              <Editor
                height="100%"
                defaultLanguage={inputType}
                language={inputType}
                theme={editorTheme}
                value={inputCode}
                onChange={(val) => setInputCode(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: tabSize,
                  formatOnPaste: true,
                  wordWrap: 'on'
                }}
              />
            </div>

            {/* Status Bar */}
            <div className="shrink-0 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
              <div className="flex gap-3">
                <span>{getStats(inputCode).lines} Lines</span>
                <span>{getStats(inputCode).chars} Chars</span>
              </div>
              <div>
                {(getStats(inputCode).size / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Controls */}
          <div className="flex flex-col gap-3 lg:w-[220px] shrink-0 h-full overflow-y-auto">

            {/* Main Actions */}
            <div className="flex flex-col gap-2 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 shrink-0">
              <button
                onClick={handleFormat}
                className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-sm hover:shadow transition-all active:scale-[0.98] border border-blue-600 group text-sm"
                title="Ctrl + Enter"
              >
                <Play size={16} className="fill-current group-hover:scale-110 transition-transform" />
                Beautify {">>"}
              </button>

              {onMinify && (
                <button
                  onClick={handleMinify}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded shadow-sm transition-all active:scale-[0.98] text-sm"
                >
                  <Minimize2 size={16} />
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
                className="flex items-center justify-center gap-2 w-full py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded shadow-sm transition-all active:scale-[0.98] text-sm"
                title="Replace Input with Output"
              >
                <ArrowLeft size={16} />
                {"<< Replace"}
              </button>
            </div>

            {/* Tab Settings */}
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 shrink-0">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Tab Size
              </label>
              <select
                value={tabSize}
                onChange={(e) => setTabSize(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={2}>2 Spaces</option>
                <option value={3}>3 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>

            {/* Fix the select onChange bug here manually in the string */}

            {sampleData && (
              <button
                onClick={handleLoadSample}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline text-center shrink-0"
              >
                Load Sample Data
              </button>
            )}

            {/* Ad Slot - Sticky/Sidebar style */}
            <div className="flex-1 rounded overflow-hidden min-h-[250px] flex items-center justify-center bg-transparent">
              <GoogleAdsense
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "example_sidebar"}
                style={{ display: 'block', width: '100%' }}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Output Editor */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 lg:w-[40%] min-h-0">
            {/* Toolbar */}
            <div className="shrink-0 px-3 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-t-lg gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Output</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors text-xs font-medium ${copied ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  title="Copy to Clipboard"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
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
                  className="p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Download"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Editor/Error Area */}
            <div className="flex-1 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30 min-h-0">
              {error ? (
                <div className="absolute inset-0 p-6 z-10 overflow-auto bg-white/95 dark:bg-gray-900/95">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold mb-2">
                      <AlertTriangle size={20} />
                      <span>Validation Error</span>
                    </div>
                    <pre className="text-sm text-red-600 dark:text-red-300 whitespace-pre-wrap font-mono">
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
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on'
                  }}
                />
              )}
            </div>

            {/* Status Bar */}
            <div className="shrink-0 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800 flex justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
              <div className="flex gap-3">
                <span>{getStats(outputCode).lines} Lines</span>
                <span>{getStats(outputCode).chars} Chars</span>
              </div>
              <div>
                {(getStats(outputCode).size / 1024).toFixed(2)} KB
              </div>
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
