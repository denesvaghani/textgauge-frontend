"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowLeftRight, Trash2, GitCompare, Eye, FileJson, FileCode, AlignLeft } from "lucide-react";
import Link from "next/link";
import { SimpleCodeEditor } from "@/components/SimpleCodeEditor";
import { DiffViewer } from "@/components/DiffViewer";

type ViewMode = "side-by-side" | "unified";

export default function DiffCheckerPage() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [showDiff, setShowDiff] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("side-by-side");

    const handleCompare = useCallback(() => {
        setShowDiff(true);
    }, []);

    const handleSwap = useCallback(() => {
        const temp = original;
        setOriginal(modified);
        setModified(temp);
        // Automatically trigger diff if there's content
        if (original || modified) {
            setShowDiff(true);
        }
    }, [original, modified]);

    const handleClearAll = useCallback(() => {
        setOriginal("");
        setModified("");
        setShowDiff(false);
    }, []);

    const sampleOriginal = `{
  "name": "TextGauge",
  "version": "1.0.0",
  "description": "Developer tools",
  "features": ["json", "yaml"]
}`;

    const sampleModified = `{
  "name": "TextGauge",
  "version": "2.0.0",
  "description": "Free developer tools",
  "features": ["json", "yaml", "toml", "diff"],
  "author": "TextGauge Team"
}`;

    const loadSample = () => {
        setOriginal(sampleOriginal);
        setModified(sampleModified);
        setShowDiff(false);
    };

    const originalFileRef = useRef<HTMLInputElement>(null);
    const modifiedFileRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setContent: (val: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setContent(text);
        };
        reader.readAsText(file);
    };

    const getStats = (text: string) => {
        if (!text) return { lines: 0, chars: 0, size: "0 B" };
        const lines = text.split('\n').length;
        const chars = text.length;
        const bytes = new Blob([text]).size;
        const size = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;
        return { lines, chars, size };
    };

    const originalStats = getStats(original);
    const modifiedStats = getStats(modified);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                if (original || modified) {
                    handleCompare();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleCompare, original, modified]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* ... hidden inputs ... */}
            <input 
                type="file" 
                ref={originalFileRef} 
                className="hidden" 
                onChange={(e) => handleFileUpload(e, setOriginal)}
            />
            <input 
                type="file" 
                ref={modifiedFileRef} 
                className="hidden" 
                onChange={(e) => handleFileUpload(e, setModified)}
            />

            {/* Header */}
            <section className="bg-white/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 pt-8 pb-12">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <GitCompare size={14} />
                        Dev Tool
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        Diff Checker
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
                        Professional-grade text comparison. Uses Myers Diff Algorithm for precise line-by-line analysis.
                    </p>

                    {/* Format Badges */}
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                         {["JSON", "YAML", "TOML", "XML", "SQL", "Config"].map((fmt) => (
                             <span key={fmt} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono font-medium rounded border border-slate-200 dark:border-slate-700">
                                 {fmt}
                             </span>
                         ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                {/* Editors Grid ... */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {/* Original Editor */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Original Text
                            </span>
                        </div>
                        <div className="h-[450px]">
                            <SimpleCodeEditor
                                value={original}
                                onChange={setOriginal}
                                placeholder="Paste original text here..."
                                language="text"
                                onUpload={() => originalFileRef.current?.click()}
                                onClear={() => setOriginal("")}
                            />
                        </div>
                        {/* Info Bar */}
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                            <span>Lines: {originalStats.lines}</span>
                            <span>Chars: {originalStats.chars}</span>
                            <span>Size: {originalStats.size}</span>
                        </div>
                    </div>

                    {/* Modified Editor */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Modified Text
                            </span>
                        </div>
                        <div className="h-[450px]">
                            <SimpleCodeEditor
                                value={modified}
                                onChange={setModified}
                                placeholder="Paste modified text here..."
                                language="text"
                                onUpload={() => modifiedFileRef.current?.click()}
                                onClear={() => setModified("")}
                            />
                        </div>
                        {/* Info Bar */}
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                            <span>Lines: {modifiedStats.lines}</span>
                            <span>Chars: {modifiedStats.chars}</span>
                            <span>Size: {modifiedStats.size}</span>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="sticky top-14 z-40 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Primary Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleCompare}
                                disabled={!original && !modified}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                                title="Ctrl + Enter"
                            >
                                <GitCompare size={18} />
                                Compare
                            </button>
                            <button
                                onClick={handleSwap}
                                disabled={!original && !modified}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
                            >
                                <ArrowLeftRight size={18} />
                                Swap
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                                Clear All
                            </button>
                            <button
                                onClick={loadSample}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
                            >
                                Load Sample
                            </button>

                            <div className="mx-2 h-8 w-px bg-slate-300 dark:bg-slate-700 hidden lg:block"></div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href="/json-formatter"
                                    className="inline-flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-600 dark:text-slate-400 font-medium text-sm rounded-lg transition-colors"
                                    title="Go to JSON Formatter"
                                >
                                    <FileJson size={16} />
                                    <span className="hidden xl:inline">JSON</span>
                                </Link>
                                <Link
                                    href="/yaml-formatter"
                                    className="inline-flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-600 dark:text-slate-400 font-medium text-sm rounded-lg transition-colors"
                                    title="Go to YAML Formatter"
                                >
                                    <AlignLeft size={16} />
                                    <span className="hidden xl:inline">YAML</span>
                                </Link>
                                <Link
                                    href="/toml-formatter"
                                    className="inline-flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-600 dark:text-slate-400 font-medium text-sm rounded-lg transition-colors"
                                    title="Go to TOML Formatter"
                                >
                                    <FileCode size={16} />
                                    <span className="hidden xl:inline">TOML</span>
                                </Link>
                            </div>
                            
                            {/* Keyboard Legend */}
                            <div className="hidden lg:flex items-center gap-3 ml-4 text-xs text-slate-400 font-mono border-l border-slate-200 dark:border-slate-700 pl-4">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-500 dark:text-slate-400">⌘</kbd> 
                                    + 
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-500 dark:text-slate-400">Enter</kbd>
                                    <span>to Compare</span>
                                </span>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        {/* ... (no change to view mode UI structure, just ensuring it's preserved if needed by diff match logic, though we moved it in previous step. Wait, previous step moved it inside diff result. So this block should actually check if I need to REMOVE it from here if I accidentally reverted it. The ReplacementContent starts from `return (` so I am replacing the entire block. I must be careful not to ADD it back if it was removed. The previous step moved it to `Differences` box. This replacement covers `Header` through `Action Bar`. The `View Mode` was REMOVED from Action Bar in previous step. I should NOT put it back here. My replacement content above DOES NOT include View Mode toggle in Action Bar. Good.) */}
                    </div>
                </div>

                {/* Diff Result */}
                {showDiff && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Differences
                            </h2>
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2">
                                <Eye size={16} className="text-slate-400" />
                                <select
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                                    className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 cursor-pointer"
                                >
                                    <option value="side-by-side">Side by Side</option>
                                    <option value="unified">Unified View</option>
                                </select>
                            </div>
                        </div>
                        <DiffViewer
                            original={original}
                            modified={modified}
                            viewMode={viewMode}
                        />
                    </div>
                )}
            </section>

            {/* Technical Features Section */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Technical Specifications
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-600 dark:text-slate-300">
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                Myers Diff Algorithm
                            </h3>
                            <p className="leading-relaxed">
                                We utilize the industry-standard Myers difference algorithm (O(ND)) to minimize edit distance, ensuring that the computed diffs are as human-readable and concise as possible.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Zero-Latency Evaluation
                            </h3>
                            <p className="leading-relaxed">
                                Unlike server-side solutions, our diff engine runs entirely in your browser's main thread or worker (future), proving near-instant feedback even for large config files.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Privacy by Design
                            </h3>
                            <p className="leading-relaxed">
                                Your data never leaves your RAM. There are no API calls, no database writes, and no analytics tracking your file contents. Secure for proprietary code and sensitive keys.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                    Developer FAQ
                </h2>
                <div className="space-y-4 w-full">
                    {[
                        {
                            q: "Which diff algorithm is used?",
                            a: "We use a JavaScript implementation of the Myers Diff Algorithm, optimized for both line-by-line and character/word-level granularity."
                        },
                        {
                            q: "What are the file size limits?",
                            a: "Since processing happens locally, the limit depends on your browser's memory. We recommend files under 1MB (approx 10k lines) for optimal performance."
                        },
                        {
                            q: "Do you support syntax highlighting?",
                            a: "Currently, we provide diff-aware highlighting (green/red backgrounds). Full syntax highlighting for languages like Python or JS is on our roadmap."
                        },
                        {
                            q: "Is my proprietary code safe?",
                            a: "Yes. No data is transmitted. You can even disconnect your internet and the tool will continue to work perfectly."
                        }
                    ].map((faq, i) => (
                        <details
                            key={i}
                            className="w-full group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                        >
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                {faq.q}
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                                    ▼
                                </span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
