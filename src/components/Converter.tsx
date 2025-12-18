"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Trash2,
    Copy,
    Download,
    Upload,
    Globe,
    Check,
    AlertTriangle,
    ArrowLeftRight,
    ArrowRight,
    RefreshCw,
    Loader2
} from "lucide-react";
import { UrlLoader } from "./UrlLoader"; // Reusing existing
import { GoogleAdsense } from "./GoogleAdsense"; // Reusing existing
import { SimpleCodeEditor } from "@/components/SimpleCodeEditor"; // Reusing existing

interface ConverterProps {
    title: string;
    description: string;
    leftTitle: string;
    rightTitle: string;
    leftLanguage: "json" | "yaml" | "xml" | "text" | "csv"; // Added csv
    rightLanguage: "json" | "yaml" | "xml" | "text" | "csv"; // Added csv
    onConvertLeftToRight: (input: string) => Promise<string> | string;
    onConvertRightToLeft: (input: string) => Promise<string> | string;
    sampleData?: string;
    defaultLeft?: string;
    options?: React.ReactNode; // For things like "Flatten" checkbox
}

export function Converter({
    title,
    description,
    leftTitle,
    rightTitle,
    leftLanguage,
    rightLanguage,
    onConvertLeftToRight,
    onConvertRightToLeft,
    sampleData,
    defaultLeft = "",
    options
}: ConverterProps) {
    const [leftCode, setLeftCode] = useState(defaultLeft);
    const [rightCode, setRightCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Stats helper with commas
    const getStats = (text: string) => {
        if (!text) return { lines: 0, chars: "0", size: "0 B" };
        const chars = text.length;
        const lines = text.split('\n').length;
        const sizeBytes = new Blob([text]).size;

        let sizeStr = "";
        if (sizeBytes < 1024) sizeStr = `${sizeBytes} B`;
        else if (sizeBytes < 1024 * 1024) sizeStr = `${(sizeBytes / 1024).toFixed(2)} KB`;
        else sizeStr = `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;

        return {
            chars: chars.toLocaleString(), // Comma separated
            lines: lines.toLocaleString(),
            size: sizeStr
        };
    };

    const handleConvert = async (direction: "left-to-right" | "right-to-left") => {
        setError(null);
        setIsConverting(true);
        try {
            if (direction === "left-to-right") {
                if (!leftCode.trim()) { setRightCode(""); return; }
                const res = await onConvertLeftToRight(leftCode);
                setRightCode(res);
            } else {
                if (!rightCode.trim()) { setLeftCode(""); return; }
                const res = await onConvertRightToLeft(rightCode);
                setLeftCode(res);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
        } finally {
            setIsConverting(false);
        }
    };

    const handleSwap = () => {
        const temp = leftCode;
        setLeftCode(rightCode);
        setRightCode(temp);
        // Ideally we would swap languages too if the parent component supported changing them,
        // but for now we essentially swap content. 
        // Usually a converter page is fixed (JSON -> CSV), so swapping content might mean
        // putting CSV in JSON box which is wrong.
        // BETTER UX: "Swap" usually implies changing the TOOL mode.
        // For this generic component, let's assume it just swaps TEXT for now,
        // but typically you use the "Right to Left" convert button for the reverse flow.
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
        e.target.value = ""; // reset
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans">

            {/* Header */}
            <header className="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
                <div className="max-w-[1920px] mx-auto px-4 py-3 pb-8 md:pb-3"> {/* Added padding bottom for mobile spacing if needed */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                                {title}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">{description}</p>
                        </div>

                        {/* Ad Slot */}
                        {process.env.NEXT_PUBLIC_AD_SLOT_HEADER && (
                            <div className="hidden md:block w-[320px] h-[50px] bg-slate-100 dark:bg-slate-800 rounded mx-auto overflow-hidden">
                                <GoogleAdsense adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER} style={{ display: 'block', width: '100%', height: '100%' }} />
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 py-6">

                {/* Controls / Options Bar */}
                {(options || sampleData) && (
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            {options}
                        </div>
                        {sampleData && (
                            <button onClick={() => setLeftCode(sampleData)} className="text-sm text-indigo-600 hover:underline">
                                Load Sample
                            </button>
                        )}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)] min-h-[500px]">

                    {/* LEFT PANEL */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                            <span className="font-bold text-xs uppercase tracking-wider text-slate-500">{leftTitle}</span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => document.getElementById('file-upload')?.click()} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition" title="Upload">
                                    <Upload size={16} className="text-slate-500" />
                                    <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
                                </button>
                                <button onClick={() => setIsUrlModalOpen(true)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition" title="URL">
                                    <Globe size={16} className="text-slate-500" />
                                </button>
                                <button onClick={() => setLeftCode("")} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition" title="Clear">
                                    <Trash2 size={16} className="text-slate-400 hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 relative bg-slate-50/50 dark:bg-black/20">
                            <SimpleCodeEditor value={leftCode} onChange={setLeftCode} className="w-full h-full" placeholder="Input..." />
                        </div>
                        <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex justify-between font-mono">
                            <div className="flex gap-3">
                                <span>{getStats(leftCode).chars} Chars</span>
                                <span>{getStats(leftCode).lines} Lines</span>
                            </div>
                            <span>{getStats(leftCode).size}</span>
                        </div>
                    </div>

                    {/* CENTER ACTIONS */}
                    <div className="flex lg:flex-col items-center justify-center gap-3 shrink-0">
                        <button
                            onClick={() => handleConvert("left-to-right")}
                            className="relative group p-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30 text-white hover:scale-110 active:scale-95 transition-all"
                            title="Convert to Output"
                        >
                            {isConverting ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={24} className="hidden lg:block" />}
                            {isConverting ? <Loader2 size={24} className="animate-spin lg:hidden" /> : <ArrowRight size={24} className="lg:hidden rotate-90" />}
                        </button>

                        {/* Optional Reverse Convert if needed, usually mostly one-way usage in these tools */}
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                            <span className="font-bold text-xs uppercase tracking-wider text-slate-500">{rightTitle}</span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => handleCopy(rightCode)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition" title="Copy">
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}
                                </button>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([rightCode], { type: 'text/plain' });
                                        const link = document.createElement('a');
                                        link.href = URL.createObjectURL(blob);
                                        link.download = `converted.${rightLanguage}`;
                                        link.click();
                                    }}
                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition" title="Download">
                                    <Download size={16} className="text-slate-500" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 relative bg-slate-50/50 dark:bg-black/20">
                            {error ? (
                                <div className="absolute inset-0 p-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm font-mono">
                                        <strong className="flex items-center gap-2 mb-2"><AlertTriangle size={16} /> Conversion Error</strong>
                                        {error}
                                    </div>
                                </div>
                            ) : (
                                <SimpleCodeEditor value={rightCode} readOnly className="w-full h-full" placeholder="Output..." />
                            )}
                        </div>
                        <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex justify-between font-mono">
                            <div className="flex gap-3">
                                <span>{getStats(rightCode).chars} Chars</span>
                                <span>{getStats(rightCode).lines} Lines</span>
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
