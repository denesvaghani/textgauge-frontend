"use client";

import { useState, useEffect, useRef } from "react";
import * as Diff from "diff";
import { highlightJson, highlightYaml, highlightToml, highlightCsv, escapeHtml } from "@/lib/syntax-highlighter";
import { Loader2 } from "lucide-react";

interface DiffViewerProps {
    original: string;
    modified: string;
    viewMode: "side-by-side" | "unified";
    language?: "text" | "json" | "yaml" | "toml" | "csv";
}

interface WorkerResult {
    originalLines: Array<{ text: string, type: string, pairIndex?: number }>;
    modifiedLines: Array<{ text: string, type: string, pairIndex?: number }>;
    stats: { added: number, removed: number };
}

// Helper to highlight a single line based on language
function highlightLine(line: string, language: string | undefined): string {
    if (!line) return " ";
    if (!language || language === "text") return escapeHtml(line);
    
    try {
        if (language === "json") return highlightJson(line);
        if (language === "yaml") return highlightYaml(line);
        if (language === "toml") return highlightToml(line);
        if (language === "csv") return highlightCsv(line, { isFragment: true });
        return escapeHtml(line);
    } catch (e) {
        return escapeHtml(line);
    }
}

// Helper to render word-level diff within a line
function renderWordDiff(oldText: string, newText: string, type: "added" | "removed") {
    const wordDiff = Diff.diffWords(oldText, newText);
    
    return wordDiff.map((part, index) => {
        if (type === "removed") {
            if (part.removed) {
                return (
                    <span
                        key={index}
                        className="bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 font-semibold rounded px-0.5"
                    >
                        {part.value}
                    </span>
                );
            } else if (!part.added) {
                return <span key={index}>{part.value}</span>;
            }
            return null;
        } else {
            if (part.added) {
                return (
                    <span
                        key={index}
                        className="bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100 font-semibold rounded px-0.5"
                    >
                        {part.value}
                    </span>
                );
            } else if (!part.removed) {
                return <span key={index}>{part.value}</span>;
            }
            return null;
        }
    });
}

export function DiffViewer({ original, modified, viewMode, language }: DiffViewerProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WorkerResult | null>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Initialize worker
        workerRef.current = new Worker(new URL('../workers/diff.worker.ts', import.meta.url));
        
        workerRef.current.onmessage = (event) => {
            const { originalLines, modifiedLines, stats, error } = event.data;
            if (error) {
                console.error("Diff computation error:", error);
            } else {
                setResult({ originalLines, modifiedLines, stats });
            }
            setLoading(false);
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    useEffect(() => {
        if (!original && !modified) {
            setResult(null);
            return;
        }

        // Start loading with a delay to prevent flash for fast operations
        const timer = setTimeout(() => {
            setLoading(true);
        }, 150); // Only show loader if it takes > 150ms

        // Post message to worker
        workerRef.current?.postMessage({ original, modified });

        // Cleanup timer if we finish fast
        return () => clearTimeout(timer);

    }, [original, modified]);

    if (!original && !modified) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-500">
                Enter text in both editors and click &quot;Compare&quot; to see differences
            </div>
        );
    }

    if (loading) {
        return (
             <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-400 gap-3">
                <Loader2 className="animate-spin text-indigo-500" size={32} />
                <p>Analyzing differences...</p>
            </div>
        );
    }

    if (!result) return null;

    const { originalLines, modifiedLines, stats } = result;

    // Unified View
    if (viewMode === "unified") {
        return (
            <div className="font-mono text-sm overflow-x-auto">
                <div className="flex gap-4 mb-4 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                        +{stats.added} additions
                    </span>
                    <span className="text-red-600 dark:text-red-400">
                        -{stats.removed} deletions
                    </span>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <pre className="py-4 overflow-x-auto">
                        <div className="inline-block min-w-full">
                        {(() => {
                            const elements: React.ReactNode[] = [];
                            let removedLines: { text: string; type: string }[] = [];
                            let addedLines: { text: string; type: string }[] = [];
                            let keyCounter = 0;

                            const flushPairs = () => {
                                const maxLen = Math.max(removedLines.length, addedLines.length);
                                for (let i = 0; i < maxLen; i++) {
                                    const oldLine = i < removedLines.length ? removedLines[i].text : "";
                                    const newLine = i < addedLines.length ? addedLines[i].text : "";
                                    
                                    if (oldLine && newLine) {
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="flex w-full bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 py-0.5 border-l-4 border-red-500"
                                            >
                                                <span className="select-none px-2 text-red-400 shrink-0 sticky left-0 bg-red-100 dark:bg-red-900/30">-</span>
                                                <span className="pr-2 whitespace-pre">{renderWordDiff(oldLine, newLine, "removed")}</span>
                                            </div>
                                        );
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="flex w-full bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 py-0.5 border-l-4 border-green-500"
                                            >
                                                <span className="select-none px-2 text-green-400 shrink-0 sticky left-0 bg-green-100 dark:bg-green-900/30">+</span>
                                                <span className="pr-2 whitespace-pre">{renderWordDiff(oldLine, newLine, "added")}</span>
                                            </div>
                                        );
                                    } else if (oldLine) {
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="flex w-full bg-red-200 dark:bg-red-900/60 text-red-900 dark:text-red-50 font-bold py-0.5 border-l-4 border-red-600"
                                            >
                                                <span className="select-none px-2 text-red-600 font-extrabold shrink-0 sticky left-0 bg-red-200 dark:bg-red-900/60">-</span>
                                                <span className="pr-2 whitespace-pre" dangerouslySetInnerHTML={{ __html: highlightLine(oldLine, language) }} />
                                            </div>
                                        );
                                    } else if (newLine) {
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="flex w-full bg-green-200 dark:bg-green-900/60 text-green-900 dark:text-green-50 font-bold py-0.5 border-l-4 border-green-600"
                                            >
                                                <span className="select-none px-2 text-green-600 font-extrabold shrink-0 sticky left-0 bg-green-200 dark:bg-green-900/60">+</span>
                                                <span className="pr-2 whitespace-pre" dangerouslySetInnerHTML={{ __html: highlightLine(newLine, language) }} />
                                            </div>
                                        );
                                    }
                                }
                                removedLines = [];
                                addedLines = [];
                            };

                            originalLines.forEach((origLine, idx) => {
                                const modLine = modifiedLines[idx];
                                const isRemoved = origLine.type === "removed";
                                const isAdded = modLine.type === "added";
                                const isUnchanged = origLine.type === "unchanged"; 

                                if (isUnchanged) {
                                    flushPairs();
                                    elements.push(
                                        <div
                                            key={keyCounter++}
                                            className={`flex w-full py-0.5 border-l-4 border-transparent ${language ? "text-slate-800 dark:text-slate-200" : "text-slate-700 dark:text-slate-300"}`}
                                        >
                                            <span className="select-none px-2 text-slate-400 shrink-0 sticky left-0 bg-white dark:bg-slate-900"> </span>
                                            <span 
                                                className="pr-2 whitespace-pre"
                                                dangerouslySetInnerHTML={{ __html: highlightLine(origLine.text, language) }}
                                            />
                                        </div>
                                    );
                                } else {
                                    if (origLine.type === 'removed' && modLine.type === 'added') {
                                        flushPairs();
                                        elements.push(
                                             <div key={keyCounter++} className="flex w-full bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 py-0.5 border-l-4 border-red-500">
                                                <span className="select-none px-2 text-red-400 shrink-0 sticky left-0 text-right">-</span>
                                                <span className="pr-2 whitespace-pre">{renderWordDiff(origLine.text, modLine.text, "removed")}</span>
                                            </div>
                                        );
                                        elements.push(
                                             <div key={keyCounter++} className="flex w-full bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 py-0.5 border-l-4 border-green-500">
                                                <span className="select-none px-2 text-green-400 shrink-0 sticky left-0 text-right">+</span>
                                                <span className="pr-2 whitespace-pre">{renderWordDiff(origLine.text, modLine.text, "added")}</span>
                                            </div>
                                        );
                                    } else {
                                        if (isRemoved) removedLines.push(origLine);
                                        if (isAdded) addedLines.push(modLine);
                                        
                                        // Simple flush for single lines if we drift apart? 
                                        // But we assume worker aligned them.
                                        // If we have just Remove and then later Add, the loop handles it via flushPairs() at next Unchanged.
                                    }
                                }
                            });
                            flushPairs(); // Final flush
                            return elements;
                        })()}
                        </div>
                    </pre>
                </div>
            </div>
        );
    }

    // Side-by-Side View
    return (
        <div className="font-mono text-sm">
            <div className="flex gap-4 mb-4 text-sm">
                <span className="text-green-600 dark:text-green-400">
                    +{stats.added} additions
                </span>
                <span className="text-red-600 dark:text-red-400">
                    -{stats.removed} deletions
                </span>
            </div>

            <div className="grid grid-cols-2 gap-0.5 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-900/50">
                    <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Original
                    </div>
                    <pre className="py-2 overflow-x-auto max-h-[700px] overflow-y-auto">
                        <div className="inline-block min-w-full">
                        {originalLines.map((line, index) => {
                            const pairedModLine = modifiedLines[index];
                            const showWordDiff = line.type === "removed" && pairedModLine?.type === "added";
                            
                            let lineStyle = `text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50`;
                            let lineNumBg = "bg-slate-50 dark:bg-slate-900/50";
                            
                            if (language) {
                                lineStyle = "text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50";
                            }

                            if (line.type === "removed") {
                                if (showWordDiff) {
                                    lineStyle = "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100";
                                    lineNumBg = "bg-red-100 dark:bg-red-900/30";
                                } else {
                                    lineStyle = "bg-red-200 dark:bg-red-900/60 text-red-900 dark:text-red-50 font-bold";
                                    lineNumBg = "bg-red-200 dark:bg-red-900/60";
                                }
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex w-full py-0.5 ${lineStyle}`}
                                >
                                    <span className={`select-none px-2 text-slate-400 text-xs w-8 shrink-0 text-right sticky left-0 ${lineNumBg}`}>
                                        {index + 1}
                                    </span>
                                    <span className="pr-2 whitespace-pre">
                                    {showWordDiff && pairedModLine
                                        ? renderWordDiff(line.text, pairedModLine.text, "removed")
                                        : (
                                            <span 
                                                className={line.type === "removed" && !showWordDiff ? "text-red-800 dark:text-red-100" : ""}
                                                dangerouslySetInnerHTML={{ __html: highlightLine(line.text, language) }}
                                            />
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                        </div>
                    </pre>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50">
                    <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Modified
                    </div>
                    <pre className="py-2 overflow-x-auto max-h-[700px] overflow-y-auto">
                        <div className="inline-block min-w-full">
                        {modifiedLines.map((line, index) => {
                            const pairedOrigLine = originalLines[index];
                            const showWordDiff = line.type === "added" && pairedOrigLine?.type === "removed";
                            
                            let lineStyle = "text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50";
                            let lineNumBg = "bg-slate-50 dark:bg-slate-900/50";

                            if (language) {
                                lineStyle = "text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50";
                            }

                            if (line.type === "added") {
                                if (showWordDiff) {
                                    lineStyle = "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100";
                                    lineNumBg = "bg-green-100 dark:bg-green-900/30";
                                } else {
                                    lineStyle = "bg-green-200 dark:bg-green-900/60 text-green-900 dark:text-green-50 font-bold";
                                    lineNumBg = "bg-green-200 dark:bg-green-900/60";
                                }
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex w-full py-0.5 ${lineStyle}`}
                                >
                                    <span className={`select-none px-2 text-slate-400 text-xs w-8 shrink-0 text-right sticky left-0 ${lineNumBg}`}>
                                        {index + 1}
                                    </span>
                                    <span className="pr-2 whitespace-pre">
                                    {showWordDiff && pairedOrigLine
                                        ? renderWordDiff(pairedOrigLine.text, line.text, "added")
                                        : (
                                            <span 
                                                className={line.type === "added" && !showWordDiff ? "text-green-800 dark:text-green-100" : ""}
                                                dangerouslySetInnerHTML={{ __html: highlightLine(line.text, language) }}
                                            />
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                        </div>
                    </pre>
                </div>
            </div>
        </div>
    );
}
