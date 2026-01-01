"use client";

import { useState } from "react";
import {
    Trash2,
    Copy,
    Download,
    Upload,
    Globe,
    Check,
    AlertTriangle,
    ArrowRightLeft,
    Wand2,
    Minimize2
} from "lucide-react";
import { UrlLoader } from "./UrlLoader";
import { GoogleAdsense } from "./GoogleAdsense";
// ... imports
import { useTheme } from "@/contexts/ThemeContext";
import { CodeEditor } from "@/components/converter/CodeEditor";

interface ConverterProps {
    title: string;
    description: string;
    leftTitle: string;
    rightTitle: string;
    leftLanguage: "json" | "yaml" | "xml" | "text" | "csv";
    rightLanguage: "json" | "yaml" | "xml" | "text" | "csv";
    onConvertLeftToRight: (input: string) => Promise<string> | string;
    onConvertRightToLeft: (input: string) => Promise<string> | string;
    sampleData?: string;
    defaultLeft?: string;
    options?: React.ReactNode;
}

export function Converter({
    title,
    description,
    leftTitle,
    rightTitle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    leftLanguage,
    rightLanguage,
    onConvertLeftToRight,
    sampleData,
    defaultLeft = "",
    options
}: ConverterProps) {
    const { theme } = useTheme(); // Get theme from context
    const [leftCode, setLeftCode] = useState(defaultLeft);
    const [rightCode, setRightCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedLeft, setCopiedLeft] = useState(false);

    // Stats helper
    const getStats = (text: string) => {
        if (!text) return { lines: 0, chars: "0", size: "0 B" };
        const currChars = text.length;
        const currLines = text.split('\n').length;
        const sizeBytes = new Blob([text]).size;

        let sizeStr = "";
        if (sizeBytes < 1024) sizeStr = `${sizeBytes} B`;
        else if (sizeBytes < 1024 * 1024) sizeStr = `${(sizeBytes / 1024).toFixed(2)} KB`;
        else sizeStr = `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;

        return {
            chars: currChars.toLocaleString(),
            lines: currLines.toLocaleString(),
            size: sizeStr
        };
    };

    const handleConvert = async () => {
        setError(null);
        try {
            if (!leftCode.trim()) {
                setRightCode("");
                return;
            }
            const res = await onConvertLeftToRight(leftCode);
            setRightCode(res);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
        }
    };

    const handleSwap = () => {
        const temp = leftCode;
        setLeftCode(rightCode);
        setRightCode(temp);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyLeft = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedLeft(true);
        setTimeout(() => setCopiedLeft(false), 2000);
    };

    const handleLoadUrl = async (url: string) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed: ${res.statusText}`);
            const text = await res.text();
            setLeftCode(text);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (typeof ev.target?.result === "string") setLeftCode(ev.target.result);
        };
        reader.readAsText(file);
        e.target.value = "";
    };

    const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

    return (
        <div className="h-screen supports-[height:100dvh]:h-[100dvh] flex flex-col text-slate-900 dark:text-slate-50 transition-colors duration-200 overflow-hidden font-sans">

            {/* Header - Identical to Formatter.tsx */}
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

                <div className="flex flex-col lg:flex-row gap-4 h-full">

                    {/* LEFT COLUMN: Input Editor */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 lg:w-[calc(50%-110px)] min-h-0 overflow-hidden transition-all duration-200">
                        <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{leftTitle}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => document.getElementById('file-upload')?.click()} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200" title="Upload">
                                    <Upload size={16} strokeWidth={2} />
                                    <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
                                </button>
                                <button onClick={() => handleCopyLeft(leftCode)} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200" title="Copy Input">
                                    {copiedLeft ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} strokeWidth={2} />}
                                </button>
                                <button onClick={() => setIsUrlModalOpen(true)} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200" title="Load URL">
                                    <Globe size={16} strokeWidth={2} />
                                </button>
                                <button onClick={() => setLeftCode("")} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-all duration-200" title="Clear">
                                    <Trash2 size={16} strokeWidth={2} />
                                </button>
                            </div>
                        </div>

                        <div className="h-[700px] relative min-h-0 bg-slate-50/30 dark:bg-black/20">
                            <CodeEditor
                                value={leftCode}
                                onChange={(val) => setLeftCode(val || "")}
                                language={leftLanguage}
                                theme={editorTheme}
                            />
                        </div>

                        <div className="shrink-0 px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium font-mono bg-white dark:bg-slate-900">
                            <div className="flex gap-3">
                                <span>{getStats(leftCode).lines} LN</span>
                                <span>{getStats(leftCode).chars} CH</span>
                            </div>
                            <span>{getStats(leftCode).size}</span>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Controls */}
                    <div className="flex flex-col gap-3 lg:w-[200px] shrink-0 h-full overflow-y-auto py-1 scrollbar-hide">

                        {/* Main Convert Button */}
                        <button
                            onClick={handleConvert}
                            className="relative group w-full py-3 px-3 rounded-lg font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-500/30 active:translate-y-0 active:scale-[0.98] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-600 transition-all duration-300 group-hover:scale-105"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <Wand2 size={16} className="transition-transform group-hover:rotate-12" />
                                <span className="text-sm">Convert</span>
                            </div>
                        </button>

                        {/* Swap Button */}
                        <button
                            onClick={handleSwap}
                            className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <ArrowRightLeft size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                            Swap
                        </button>

                        {/* Options Panel (e.g. Flatten) */}
                        {options && (
                            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 shrink-0">
                                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Options</label>
                                {options}
                            </div>
                        )}

                        {sampleData && (
                            <button onClick={() => setLeftCode(sampleData)} className="text-xs font-medium text-indigo-500 hover:text-indigo-600 hover:underline text-center shrink-0 py-1">
                                Load Sample
                            </button>
                        )}

                        {/* Sidebar Ad */}
                        {process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR && (
                            <div className="w-full rounded-lg overflow-hidden min-h-[150px] flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 shrink-0">
                                <GoogleAdsense adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR} style={{ display: 'block', width: '100%' }} />
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Output Editor */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 lg:w-[calc(50%-110px)] min-h-0 overflow-hidden transition-all duration-200">
                        <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{rightTitle}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {rightCode && (
                                    <button
                                        onClick={() => handleCopy(rightCode)}
                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                                        title="Copy Output"
                                    >
                                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} strokeWidth={2} />}
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        const blob = new Blob([rightCode], { type: "text/plain" });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `converted.${rightLanguage}`;
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

                        <div className="h-[700px] relative min-h-0 bg-slate-50/30 dark:bg-black/20">
                            {error ? (
                                <div className="absolute inset-0 p-6 z-10 overflow-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/30 dark:bg-red-900/10 shadow-sm">
                                        <div className="flex items-center gap-3 text-red-700 dark:text-red-400 font-bold mb-3">
                                            <AlertTriangle size={20} />
                                            <span>Conversion Error</span>
                                        </div>
                                        <pre className="text-sm text-red-600 dark:text-red-300 whitespace-pre-wrap font-mono leading-relaxed">{error}</pre>
                                    </div>
                                </div>
                            ) : (
                                <CodeEditor
                                    value={rightCode}
                                    readOnly={true}
                                    language={rightLanguage}
                                    theme={editorTheme}
                                />
                            )}
                        </div>

                        <div className="shrink-0 px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium font-mono bg-white dark:bg-slate-900">
                            <div className="flex gap-3">
                                <span>{getStats(rightCode).lines} LN</span>
                                <span>{getStats(rightCode).chars} CH</span>
                            </div>
                            <span>{getStats(rightCode).size}</span>
                        </div>
                    </div>

                </div>
            </main>

            <UrlLoader isOpen={isUrlModalOpen} onClose={() => setIsUrlModalOpen(false)} onLoad={handleLoadUrl} />
        </div>
    );
}
