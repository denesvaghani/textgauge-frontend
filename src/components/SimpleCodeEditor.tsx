"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Search, Check, X, ArrowDown, ArrowUp, Replace, ReplaceAll, ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";

interface SimpleCodeEditorProps {
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
}

export function SimpleCodeEditor({
    value,
    onChange,
    readOnly = false,
    placeholder,
    className = "",
}: SimpleCodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    // Find & Replace State
    const [showFindReplace, setShowFindReplace] = useState(false);
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [matchCount, setMatchCount] = useState(0);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

    // Sync Scroll
    const handleScroll = () => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const lineCount = value.split("\n").length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Find Logic
    useEffect(() => {
        if (!findText) {
            setMatchCount(0);
            setCurrentMatchIndex(-1);
            return;
        }
        // Simple count of occurrences
        // Escape regex characters
        try {
            const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'gi');
            const matches = value.match(regex);
            setMatchCount(matches ? matches.length : 0);
        } catch (e) {
            // invalid regex or other error, ignore
            setMatchCount(0);
        }
    }, [findText, value]);


    const findNext = () => {
        if (!textareaRef.current || !findText) return;

        // Naive Find Next using built-in browser capabilities isn't great for textareas. 
        // We'll use selection range manipulation.
        const text = value;
        const lowerText = text.toLowerCase();
        const lowerFind = findText.toLowerCase();

        const startSearchPos = textareaRef.current.selectionEnd;
        let nextIndex = lowerText.indexOf(lowerFind, startSearchPos);

        // Wrap around
        if (nextIndex === -1) {
            nextIndex = lowerText.indexOf(lowerFind, 0);
        }

        if (nextIndex !== -1) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(nextIndex, nextIndex + findText.length);

            // Update visual index for user (approximate since we just found the "next" one)
            // For a true "1 of N", we'd need to map all indices. 
            // This is a "simple" editor, so cyclical finding is acceptable.
        }
    };

    const replaceCurrent = () => {
        if (readOnly || !onChange || !textareaRef.current || !findText) return;

        const textarea = textareaRef.current;

        // Check if current selection matches findText (to avoid replacing something else)
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        if (selectedText.toLowerCase() === findText.toLowerCase()) {
            // Perform replacement
            const newValue = value.substring(0, start) + replaceText + value.substring(end);
            onChange(newValue);

            // Restore caret/selection
            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(start, start + replaceText.length);
                }
            });
        } else {
            // If not selected, try to find next first?
            findNext();
        }
    };

    const replaceAll = () => {
        if (readOnly || !onChange || !findText) return;

        const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'gi');
        const newValue = value.replace(regex, replaceText);
        onChange(newValue);
    };

    return (
        <div className={`relative flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 ${className}`}>

            {/* Toolbar / Header */}
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setShowFindReplace(!showFindReplace)}
                        className={`p-1.5 rounded-md transition-colors ${showFindReplace ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'}`}
                        title="Find & Replace"
                    >
                        <Search size={16} />
                    </button>
                    {showFindReplace && (
                        <span className="text-xs text-slate-400 ml-1 hidden sm:inline">Find & Replace</span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>

            {/* Find & Replace Panel */}
            {showFindReplace && (
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-sm">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex items-center gap-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Find..."
                                    value={findText}
                                    onChange={(e) => setFindText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && findNext()}
                                    className="w-full pl-2 pr-12 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-indigo-500 text-xs"
                                />
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                                    {matchCount > 0 ? matchCount : '0'} matches
                                </div>
                            </div>
                            <button onClick={findNext} className="p-1 text-slate-500 hover:text-indigo-600" title="Find Next">
                                <ArrowDown size={16} />
                            </button>
                        </div>

                        {!readOnly && (
                            <div className="flex-1 flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Replace with..."
                                    value={replaceText}
                                    onChange={(e) => setReplaceText(e.target.value)}
                                    className="flex-1 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-indigo-500 text-xs"
                                />
                                <button
                                    onClick={replaceCurrent}
                                    disabled={!findText}
                                    className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                                    title="Replace current selection"
                                >
                                    Replace
                                </button>
                                <button
                                    onClick={replaceAll}
                                    disabled={!findText}
                                    className="px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 rounded text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50"
                                    title="Replace All"
                                >
                                    All
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Editor Area */}
            <div className="flex-1 flex relative min-h-0 bg-white dark:bg-slate-950">
                {/* Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className="hidden sm:block w-10 shrink-0 text-right pr-2 pt-4 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-600 text-xs font-mono select-none overflow-hidden"
                >
                    {lineNumbers.map(n => (
                        <div key={n} className="h-5 leading-5">{n}</div>
                    ))}
                </div>

                {/* Text Area */}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => !readOnly && onChange?.(e.target.value)}
                    readOnly={readOnly}
                    onScroll={handleScroll}
                    placeholder={placeholder}
                    className="flex-1 w-full h-full p-4 resize-none outline-none border-none bg-transparent text-sm font-mono leading-5 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 whitespace-pre"
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>

            {/* Footer Info (optional, small stats) */}
            <div className="px-2 py-1 text-[10px] text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-2">
                <span>{lineCount} lines</span>
                <span>{value.length} chars</span>
            </div>
        </div>
    );
}
