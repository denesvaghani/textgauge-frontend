"use client";

import { useMemo } from "react";
import * as Diff from "diff";

interface DiffViewerProps {
    original: string;
    modified: string;
    viewMode: "side-by-side" | "unified";
}

// Helper to render word-level diff within a line
function renderWordDiff(oldText: string, newText: string, type: "added" | "removed") {
    const wordDiff = Diff.diffWords(oldText, newText);
    
    return wordDiff.map((part, index) => {
        if (type === "removed") {
            // For removed lines, highlight the removed parts with darker red
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
            // For added lines, highlight the added parts with darker green
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

export function DiffViewer({ original, modified, viewMode }: DiffViewerProps) {
    const diffResult = useMemo(() => {
        if (!original && !modified) return [];
        return Diff.diffLines(original, modified);
    }, [original, modified]);

    const stats = useMemo(() => {
        let added = 0;
        let removed = 0;
        diffResult.forEach((part) => {
            const lines = part.value.split("\n").filter(Boolean).length;
            if (part.added) added += lines;
            if (part.removed) removed += lines;
        });
        return { added, removed };
    }, [diffResult]);

    // Build paired lines for side-by-side with word-level diff
    const { pairedLines, originalLines, modifiedLines } = useMemo(() => {
        const origLines: { text: string; type: "unchanged" | "removed"; pairIndex?: number }[] = [];
        const modLines: { text: string; type: "unchanged" | "added"; pairIndex?: number }[] = [];
        
        let removedBuffer: string[] = [];
        let addedBuffer: string[] = [];
        
const levenshtein = (a: string, b: string): number => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    )
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

const calculateSimilarity = (str1: string, str2: string): number => {
    if (!str1 && !str2) return 1;
    if (!str1 || !str2) return 0;
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 1.0;
    const distance = levenshtein(str1, str2);
    return 1 - (distance / maxLength);
};

const flushBuffers = () => {
    // Pair up removed and added lines for word-level diff
    const maxLen = Math.max(removedBuffer.length, addedBuffer.length);
    for (let i = 0; i < maxLen; i++) {
        const hasRemoved = i < removedBuffer.length;
        const hasAdded = i < addedBuffer.length;
        
        if (hasRemoved && hasAdded) {
            // Both exist - CHECK SIMILARITY
            const similarity = calculateSimilarity(removedBuffer[i], addedBuffer[i]);
            
            if (similarity > 0.4) {
                 // Good match - Pair them for word-level diff
                const pairIdx = origLines.length;
                origLines.push({ 
                    text: removedBuffer[i], 
                    type: "removed", 
                    pairIndex: pairIdx 
                });
                modLines.push({ 
                    text: addedBuffer[i], 
                    type: "added",
                    pairIndex: pairIdx
                });
            } else {
                // Bad match - treat as separate remove then add
                // 1. Removed line
                origLines.push({ 
                    text: removedBuffer[i], 
                    type: "removed"
                });
                modLines.push({ 
                    text: "", 
                    type: "unchanged"
                });
                
                // 2. Added line
                origLines.push({ 
                    text: "", 
                    type: "unchanged"
                });
                modLines.push({ 
                    text: addedBuffer[i], 
                    type: "added"
                });
            }
        } else if (hasRemoved) {
            // Only removed line - no pair, show as deleted
            origLines.push({ 
                text: removedBuffer[i], 
                type: "removed"
            });
            modLines.push({ 
                text: "", 
                type: "unchanged"
            });
        } else if (hasAdded) {
            // Only added line - NEW LINE, highlight as addition
            origLines.push({ 
                text: "", 
                type: "unchanged"
            });
            modLines.push({ 
                text: addedBuffer[i], 
                type: "added"
            });
        }
    }
    removedBuffer = [];
    addedBuffer = [];
};

        diffResult.forEach((part) => {
            const lines = part.value.split("\n").filter((l, i, arr) => l || i < arr.length - 1);
            
            if (part.removed) {
                removedBuffer.push(...lines);
            } else if (part.added) {
                addedBuffer.push(...lines);
            } else {
                flushBuffers();
                lines.forEach((line) => {
                    origLines.push({ text: line, type: "unchanged" });
                    modLines.push({ text: line, type: "unchanged" });
                });
            }
        });
        
        flushBuffers();

        // Ensure equal length
        while (origLines.length < modLines.length) {
            origLines.push({ text: "", type: "unchanged" });
        }
        while (modLines.length < origLines.length) {
            modLines.push({ text: "", type: "unchanged" });
        }

        return { pairedLines: true, originalLines: origLines, modifiedLines: modLines };
    }, [diffResult]);

    if (!original && !modified) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-500">
                Enter text in both editors and click &quot;Compare&quot; to see differences
            </div>
        );
    }

    // Unified View
    if (viewMode === "unified") {
        return (
            <div className="font-mono text-sm overflow-x-auto">
                {/* Stats Bar */}
                <div className="flex gap-4 mb-4 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                        +{stats.added} additions
                    </span>
                    <span className="text-red-600 dark:text-red-400">
                        -{stats.removed} deletions
                    </span>
                </div>

                {/* Unified Diff View with Word-Level Highlighting */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <pre className="p-4 overflow-x-auto">
                        {(() => {
                            const elements: React.ReactNode[] = [];
                            let removedLines: string[] = [];
                            let addedLines: string[] = [];
                            let keyCounter = 0;

                            const flushPairs = () => {
                                const maxLen = Math.max(removedLines.length, addedLines.length);
                                for (let i = 0; i < maxLen; i++) {
                                    const oldLine = i < removedLines.length ? removedLines[i] : "";
                                    const newLine = i < addedLines.length ? addedLines[i] : "";
                                    
                                    if (oldLine && newLine) {
                                        // Both exist - show word-level diff with base light bg
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 px-2 py-0.5 border-l-4 border-red-500"
                                            >
                                                <span className="select-none mr-2 text-red-400">-</span>
                                                {renderWordDiff(oldLine, newLine, "removed")}
                                            </div>
                                        );
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 px-2 py-0.5 border-l-4 border-green-500"
                                            >
                                                <span className="select-none mr-2 text-green-400">+</span>
                                                {renderWordDiff(oldLine, newLine, "added")}
                                            </div>
                                        );
                                    } else if (oldLine) {
                                        // Unpaired removed line - STRONG EMPHASIS
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="bg-red-200 dark:bg-red-900/60 text-red-900 dark:text-red-50 font-bold px-2 py-0.5 border-l-4 border-red-600"
                                            >
                                                <span className="select-none mr-2 text-red-600 font-extrabold">-</span>
                                                {oldLine}
                                            </div>
                                        );
                                    } else if (newLine) {
                                        // Unpaired added line - STRONG EMPHASIS
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="bg-green-200 dark:bg-green-900/60 text-green-900 dark:text-green-50 font-bold px-2 py-0.5 border-l-4 border-green-600"
                                            >
                                                <span className="select-none mr-2 text-green-600 font-extrabold">+</span>
                                                {newLine}
                                            </div>
                                        );
                                    }
                                }
                                removedLines = [];
                                addedLines = [];
                            };

                            diffResult.forEach((part) => {
                                const lines = part.value.split("\n");
                                const filteredLines = lines.filter((l, i) => l || i < lines.length - 1);
                                
                                if (part.removed) {
                                    removedLines.push(...filteredLines);
                                } else if (part.added) {
                                    addedLines.push(...filteredLines);
                                } else {
                                    flushPairs();
                                    filteredLines.forEach((line) => {
                                        elements.push(
                                            <div
                                                key={keyCounter++}
                                                className="text-slate-700 dark:text-slate-300 px-2 py-0.5 border-l-4 border-transparent"
                                            >
                                                <span className="select-none mr-2 text-slate-400"> </span>
                                                {line || " "}
                                            </div>
                                        );
                                    });
                                }
                            });
                            
                            flushPairs();
                            return elements;
                        })()}
                    </pre>
                </div>
            </div>
        );
    }

    // Side-by-Side View with Word-Level Highlighting
    return (
        <div className="font-mono text-sm">
            {/* Stats Bar */}
            <div className="flex gap-4 mb-4 text-sm">
                <span className="text-green-600 dark:text-green-400">
                    +{stats.added} additions
                </span>
                <span className="text-red-600 dark:text-red-400">
                    -{stats.removed} deletions
                </span>
            </div>

            {/* Side-by-Side View */}
            <div className="grid grid-cols-2 gap-0.5 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                {/* Original Side */}
                <div className="bg-slate-50 dark:bg-slate-900/50">
                    <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Original
                    </div>
                    <pre className="p-2 overflow-x-auto max-h-[600px] overflow-y-auto">
                        {originalLines.map((line, index) => {
                            const pairedModLine = line.pairIndex !== undefined ? modifiedLines[index] : null;
                            const showWordDiff = line.type === "removed" && pairedModLine?.type === "added";
                            
                            // Determine style based on whether it is paired (word diff) or unpaired (full line diff)
                            let lineStyle = "text-slate-700 dark:text-slate-300";
                            if (line.type === "removed") {
                                if (showWordDiff) {
                                    lineStyle = "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100";
                                } else {
                                    lineStyle = "bg-red-200 dark:bg-red-900/60 text-red-900 dark:text-red-50 font-bold";
                                }
                            }

                            return (
                                <div
                                    key={index}
                                    className={`px-2 py-0.5 ${lineStyle}`}
                                >
                                    <span className="select-none mr-2 text-slate-400 text-xs w-6 inline-block text-right">
                                        {index + 1}
                                    </span>
                                    {showWordDiff && pairedModLine
                                        ? renderWordDiff(line.text, pairedModLine.text, "removed")
                                        : (
                                            <span className={line.type === "removed" && !showWordDiff ? "text-red-800 dark:text-red-100" : ""}>
                                                {line.text || " "}
                                            </span>
                                        )}
                                </div>
                            );
                        })}
                    </pre>
                </div>

                {/* Modified Side */}
                <div className="bg-slate-50 dark:bg-slate-900/50">
                    <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Modified
                    </div>
                    <pre className="p-2 overflow-x-auto max-h-[600px] overflow-y-auto">
                        {modifiedLines.map((line, index) => {
                            const pairedOrigLine = line.pairIndex !== undefined ? originalLines[line.pairIndex] : null;
                            const showWordDiff = line.type === "added" && pairedOrigLine?.type === "removed";
                            
                            // Determine style based on whether it is paired (word diff) or unpaired (full line diff)
                            let lineStyle = "text-slate-700 dark:text-slate-300";
                            if (line.type === "added") {
                                if (showWordDiff) {
                                    lineStyle = "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100";
                                } else {
                                    lineStyle = "bg-green-200 dark:bg-green-900/60 text-green-900 dark:text-green-50 font-bold";
                                }
                            }

                            return (
                                <div
                                    key={index}
                                    className={`px-2 py-0.5 ${lineStyle}`}
                                >
                                    <span className="select-none mr-2 text-slate-400 text-xs w-6 inline-block text-right">
                                        {index + 1}
                                    </span>
                                    {showWordDiff && pairedOrigLine
                                        ? renderWordDiff(pairedOrigLine.text, line.text, "added")
                                        : (
                                            <span className={line.type === "added" && !showWordDiff ? "text-green-800 dark:text-green-100" : ""}>
                                                {line.text || " "}
                                            </span>
                                        )}
                                </div>
                            );
                        })}
                    </pre>
                </div>
            </div>
        </div>
    );
}
