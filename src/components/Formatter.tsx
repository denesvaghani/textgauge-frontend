"use client";

import { useState } from "react";
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

  const [inputCode, setInputCode] = useState(defaultValue);
  const [outputCode, setOutputCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tabSize, setTabSize] = useState(2);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ref to the input editor instance to potentially grab value directly or manipulate


  const handleFormat = async () => {
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
      // Determine if error line number is available (often in 'msg')
    }
  };

  const handleMinify = async () => {
    setError(null);
    if (!onMinify || !inputCode.trim()) return;
    try {
      const result = await onMinify(inputCode);
      setOutputCode(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    }
  };

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
  };

  const handleLoadUrl = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Myailed to fetch: ${res.statusText}`);
      const text = await res.text();
      setInputCode(text);
      // Auto-format on load
      // setTimeout(() => handleFormat(), 100); 
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
    // Reset value so same file can be selected again
    e.target.value = "";
  };

  const handleLoadSample = () => {
    if (sampleData) setInputCode(sampleData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-200">

      {/* Header Section */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* Reduced py-6 to py-4 */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h1> {/* Reduced text size slightly */}
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-3xl">{description}</p>

          {/* Top Ad Slot placement */}
          <div className="mt-3 flex justify-center min-h-[90px] w-full rounded overflow-hidden">
            <GoogleAdsense
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || "example_slot"}
              style={{ display: 'block', width: '100%', maxWidth: '970px', height: '90px' }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* Reduced py-8 to py-4 */}

        {/* 3-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-250px)] min-h-[600px]"> {/* Adjusted height calc */}

          {/* LEFT COLUMN: Input Editor (Allocating ~40% width) */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 lg:w-[40%]">
            {/* Toolbar */}
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-t-lg gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Input</span>
                {/* Check for errors icon */}
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
            <div className="flex-1 relative overflow-hidden">
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
          </div>

          {/* MIDDLE COLUMN: Controls (Allocating ~200px fixed or ~15%) */}
          <div className="flex flex-col gap-4 lg:w-[220px] shrink-0">

            {/* Main Actions */}
            <div className="flex flex-col gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              <button
                onClick={handleFormat}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-sm hover:shadow transition-all active:scale-[0.98] border border-blue-600"
              >
                <Play size={16} className="fill-current" />
                Beautify {">>"}
              </button>

              {onMinify && (
                <button
                  onClick={handleMinify}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded shadow-sm transition-all active:scale-[0.98]"
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
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded shadow-sm transition-all active:scale-[0.98]"
                title="Replace Input with Output"
              >
                <ArrowLeft size={16} />
                {"<< Replace"}
              </button>
            </div>

            {/* Tab Settings */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
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

            {sampleData && (
              <button
                onClick={handleLoadSample}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline text-center"
              >
                Load Sample Data
              </button>
            )}

            {/* Ad Slot - Sticky/Sidebar style */}
            <div className="flex-1 rounded overflow-hidden min-h-[250px] flex items-center justify-center">
              <GoogleAdsense
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "example_sidebar"}
                style={{ display: 'block', width: '100%' }}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Output Editor (Allocating ~40% width) */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 lg:w-[40%]">
            {/* Toolbar */}
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-t-lg gap-2">
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
            <div className="flex-1 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30">
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
