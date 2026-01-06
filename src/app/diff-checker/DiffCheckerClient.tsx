"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowLeftRight, Trash2, GitCompare, Eye, Upload, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SimpleCodeEditor } from "@/components/SimpleCodeEditor";
import { DiffViewer } from "@/components/DiffViewer";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { SmartHeroHeader, HeroDescription } from "@/components/SmartHeroHeader";

type ViewMode = "side-by-side" | "unified";

const theme = flowerThemes.redRose;

export default function DiffCheckerPage() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [showDiff, setShowDiff] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("side-by-side");
    const [copiedOriginal, setCopiedOriginal] = useState(false);
    const [copiedModified, setCopiedModified] = useState(false);

    const handleCompare = useCallback(() => {
        setShowDiff(true);
        // Scroll to diff result after state updates
        setTimeout(() => {
            diffResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, []);

    const handleSwap = useCallback(() => {
        const temp = original;
        setOriginal(modified);
        setModified(temp);
        if (original || modified) {
            setShowDiff(true);
            // Scroll to diff result after swap
            setTimeout(() => {
                diffResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [original, modified]);

    const handleClearAll = useCallback(() => {
        setOriginal("");
        setModified("");
        setShowDiff(false);
        // Scroll to editors section
        setTimeout(() => {
            editorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
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
        // Scroll to editors section
        setTimeout(() => {
            editorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const originalFileRef = useRef<HTMLInputElement>(null);
    const modifiedFileRef = useRef<HTMLInputElement>(null);
    const diffResultRef = useRef<HTMLDivElement>(null);
    const editorsRef = useRef<HTMLDivElement>(null);

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
        <FlowerBackground theme={theme} badgeText="Diff Tool">
            <div className="flex flex-col min-h-screen">
                {/* Hidden file inputs */}
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

                {/* Header - V3 Smart Hero */}
                <SmartHeroHeader 
                    title="Diff Checker"
                    theme={theme}
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER}
                />

                {/* Main Content */}
                <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                    {/* Editors Grid */}
                    <div ref={editorsRef} className="grid md:grid-cols-2 gap-4 mb-6 scroll-mt-20">
                        {/* Original Editor */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden flex flex-col">
                            {/* Toolbar */}
                            <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Original</span>
                                    <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">Saved</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => originalFileRef.current?.click()}
                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                                        title="Upload File"
                                    >
                                        <Upload size={16} strokeWidth={2} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(original);
                                            setCopiedOriginal(true);
                                            setTimeout(() => setCopiedOriginal(false), 2000);
                                        }}
                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                                        title="Copy"
                                    >
                                        {copiedOriginal ? <Check size={16} className="text-green-500" /> : <Copy size={16} strokeWidth={2} />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOriginal("")}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                                        title="Clear"
                                    >
                                        <Trash2 size={16} strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                            {/* Editor Area */}
                            <div className="shrink-0 relative bg-slate-50/30 dark:bg-black/20" style={{ height: '700px' }}>
                                <SimpleCodeEditor
                                    value={original}
                                    onChange={setOriginal}
                                    placeholder="Paste original text here..."
                                    language="text"
                                    hideCopy
                                />
                            </div>
                            {/* Status Bar */}
                            <div className="shrink-0 px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium font-mono bg-white dark:bg-slate-900">
                                <div className="flex gap-3">
                                    <span>{originalStats.lines} LN</span>
                                    <span>{originalStats.chars} CH</span>
                                </div>
                                <div>{originalStats.size}</div>
                            </div>
                        </div>

                        {/* Modified Editor */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden flex flex-col">
                            {/* Toolbar */}
                            <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Modified</span>
                                    <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">Saved</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => modifiedFileRef.current?.click()}
                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                                        title="Upload File"
                                    >
                                        <Upload size={16} strokeWidth={2} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(modified);
                                            setCopiedModified(true);
                                            setTimeout(() => setCopiedModified(false), 2000);
                                        }}
                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                                        title="Copy"
                                    >
                                        {copiedModified ? <Check size={16} className="text-green-500" /> : <Copy size={16} strokeWidth={2} />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModified("")}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                                        title="Clear"
                                    >
                                        <Trash2 size={16} strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                            {/* Editor Area */}
                            <div className="shrink-0 relative bg-slate-50/30 dark:bg-black/20" style={{ height: '700px' }}>
                                <SimpleCodeEditor
                                    value={modified}
                                    onChange={setModified}
                                    placeholder="Paste modified text here..."
                                    language="text"
                                    hideCopy
                                />
                            </div>
                            {/* Status Bar */}
                            <div className="shrink-0 px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium font-mono bg-white dark:bg-slate-900">
                                <div className="flex gap-3">
                                    <span>{modifiedStats.lines} LN</span>
                                    <span>{modifiedStats.chars} CH</span>
                                </div>
                                <div>{modifiedStats.size}</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="sticky top-14 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6 border-b border-rose-200/50 dark:border-rose-800/30 rounded-lg">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            {/* Primary Actions */}
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={handleCompare}
                                    disabled={!original && !modified}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
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
                        </div>
                    </div>

                    {/* Diff Result */}
                    {showDiff && (
                        <div ref={diffResultRef} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-rose-200/50 dark:border-rose-800/30 p-6 scroll-mt-20">
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
                                        className="text-sm bg-white dark:bg-slate-800 border border-rose-200/50 dark:border-rose-800/30 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 cursor-pointer"
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
                
                <HeroDescription text="Professional-grade text comparison. Uses Myers Diff Algorithm for precise line-by-line analysis." />

                {/* Technical Features Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-200/50 dark:border-rose-800/30 p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Technical Specifications
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
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
                                    Unlike server-side solutions, our diff engine runs entirely in your browser&apos;s main thread or worker (future), proving near-instant feedback even for large config files.
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

                {/* Ad: In-Article 1 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                         <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800">
                             <GoogleAdsense
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                style={{ display: 'block', textAlign: 'center' }}
                                adFormat="fluid"
                                layout="in-article"
                             />
                        </div>
                    </div>
                )}

                {/* Related Tools Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            🌸 Related Tools 🌸
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">Format and validate your data before comparing</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                href: "/json-formatter",
                                theme: flowerThemes.cherryBlossom,
                                title: "JSON Formatter",
                                description: "Validate and beautify JSON data with syntax highlighting.",
                                hoverBorder: "hover:border-pink-400/60 dark:hover:border-pink-400/40",
                                hoverText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
                            },
                            {
                                href: "/yaml-formatter",
                                theme: flowerThemes.whiteLily,
                                title: "YAML Formatter",
                                description: "Convert and validate YAML files with error detection.",
                                hoverBorder: "hover:border-emerald-400/60 dark:hover:border-emerald-400/40",
                                hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
                            },
                            {
                                href: "/toml-formatter",
                                theme: flowerThemes.frangipani,
                                title: "TOML Formatter",
                                description: "Format TOML configuration files instantly.",
                                hoverBorder: "hover:border-orange-400/60 dark:hover:border-orange-400/40",
                                hoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
                            },
                        ].map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className={`group relative p-5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-rose-200/50 dark:border-rose-800/30 ${tool.hoverBorder} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                            >
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `radial-gradient(circle at 100% 0%, ${tool.theme.colors.glow}, transparent 50%)`,
                                    }}
                                />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
                                             style={{ boxShadow: `0 4px 20px ${tool.theme.colors.glow}`, borderColor: tool.theme.colors.primary }}>
                                            <Image
                                                src={tool.theme.image}
                                                alt={tool.theme.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform text-xl">→</span>
                                    </div>
                                    <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-1 ${tool.hoverText} transition-colors`}>
                                        {tool.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {tool.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Ad: In-Article 2 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                        <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800">
                             <GoogleAdsense
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                style={{ display: 'block', textAlign: 'center' }}
                                adFormat="fluid"
                                layout="in-article"
                             />
                        </div>
                    </div>
                )}

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
                                className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-rose-200/50 dark:border-rose-800/30 rounded-xl overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors">
                                    {faq.q}
                                    <span className="text-slate-400 group-open:rotate-180 transition-transform">
                                        ▼
                                    </span>
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-rose-100/50 dark:border-rose-800/30 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            </div>

                {/* Ad: Multiplex (Related Content) */}
                 {process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX && (
                    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[200px] border border-dashed border-slate-200 dark:border-slate-800 p-4">
                             <GoogleAdsense
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                                adFormat="autorelaxed"
                                style={{ display: 'block' }}
                             />
                        </div>
                    </section>
                )}
        </FlowerBackground>
    );
}
