"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Search, Check, X, ArrowDown, ArrowUp, Replace, ReplaceAll, ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";

interface SimpleCodeEditorProps {
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
    language?: "json" | "yaml" | "text" | "csv";
}

export function SimpleCodeEditor({
    value,
    onChange,
    readOnly = false,
    placeholder,
    className = "",
    language = "text",
}: SimpleCodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    // Find & Replace State
    const [showFindReplace, setShowFindReplace] = useState(false);
    const [showReplaceField, setShowReplaceField] = useState(false); // Toggle for replace row
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [matchCount, setMatchCount] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

    // Search Options
    const [matchCase, setMatchCase] = useState(false);
    const [useRegex, setUseRegex] = useState(false);
    const [wholeWord, setWholeWord] = useState(false);

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

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
                e.preventDefault();
                setShowFindReplace(true);
                // Focus find input after render
                setTimeout(() => document.getElementById('find-input')?.focus(), 0);
            }
            if (e.key === 'Escape' && showFindReplace) {
                setShowFindReplace(false);
                textareaRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showFindReplace]);

    // Build Regex
    const getSearchRegex = () => {
        if (!findText) return null;
        try {
            let pattern = findText;

            if (!useRegex) {
                // Escape special chars if not using regex
                pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            if (wholeWord) {
                // Determine boundary based on regex or plain text
                // Simple \b works for simple words, but might fail for symbols
                // For this editor, standard \b wrapper is acceptable
                pattern = `\\b${pattern}\\b`;
            }

            const flags = matchCase ? 'g' : 'gi';
            return new RegExp(pattern, flags);
        } catch (e) {
            return null;
        }
    };

    // Find Logic (Count)
    useEffect(() => {
        const regex = getSearchRegex();
        if (!regex || !findText) {
            setMatchCount(0);
            setCurrentMatchIndex(-1);
            return;
        }
        const matches = value.match(regex);
        setMatchCount(matches ? matches.length : 0);
    }, [findText, value, matchCase, useRegex, wholeWord]);


    const findNext = () => {
        if (!textareaRef.current || !findText) return;

        const regex = getSearchRegex();
        if (!regex) return;

        const text = value;
        const startSearchPos = textareaRef.current.selectionEnd;

        // Convert regex to sticky or use exec loop?
        // Simpler approach: match all, find first one after current pos
        // But for huge files this is slow. 
        // Let's use simple search logic:

        let nextIndex = -1;

        // We need to find the match location. 
        // native 'search' doesn't support offset.
        // We will execute regex against the substring? No, regex might anchor.
        // Global exec loop is safer.

        // Reset lastIndex
        regex.lastIndex = 0;
        let match;
        let foundAfter = -1;
        let firstMatch = -1;

        while ((match = regex.exec(text)) !== null) {
            if (firstMatch === -1) firstMatch = match.index;

            if (match.index >= startSearchPos) {
                foundAfter = match.index;
                break;
            }
        }

        if (foundAfter !== -1) {
            nextIndex = foundAfter;
        } else if (firstMatch !== -1) {
            nextIndex = firstMatch; // Wrap around
        }

        if (nextIndex !== -1) {
            textareaRef.current.focus();
            // We need to know the length of the *actual* match for highlighting (regex match length can vary)
            // Re-run exec to get exact match length at that index?
            // The logic above relied on the loop, so 'match' variable holds the correct data if foundAfter.
            // If wrap around 'firstMatch', we need to re-find it?

            // To be robust:
            // Since we know the index, let's just match using the same regex but ensuring we hit that index?
            // Actually, we can just store the length in the loop.

            // Re-calc length for clarity:
            const matchLength = match ? match[0].length : (() => {
                // wrapped around case, need to re-find first match length
                regex.lastIndex = 0;
                return regex.exec(text)?.[0].length || 0;
            })();

            if (matchLength > 0) {
                textareaRef.current.setSelectionRange(nextIndex, nextIndex + matchLength);
            }
        }
    };

    const replaceCurrent = () => {
        if (readOnly || !onChange || !textareaRef.current || !findText) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        // Check if current selection matches logic
        // We need to verify if the selected text *matches* the search pattern
        // Just checking string equality is not enough for Regex/Case Insensitive

        let isMatch = false;
        if (!useRegex && !matchCase && !wholeWord) {
            isMatch = selectedText.toLowerCase() === findText.toLowerCase();
        } else {
            // Validate using regex against selected text
            const regex = getSearchRegex();
            if (regex) {
                const match = selectedText.match(regex);
                isMatch = match !== null && match[0] === selectedText;
            } else {
                isMatch = false;
            }
        }

        if (isMatch || (selectedText && !useRegex && !matchCase)) { // Fallback for simple case
            const newValue = value.substring(0, start) + replaceText + value.substring(end);
            onChange(newValue);

            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(start, start + replaceText.length);
                }
            });
        } else {
            findNext();
        }
    };

    const replaceAll = () => {
        if (readOnly || !onChange || !findText) return;
        const regex = getSearchRegex();
        if (!regex) return;

        const newValue = value.replace(regex, replaceText);
        onChange(newValue);
    };

    return (
        <div className={`relative flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 ${className}`}>

            {/* Absolute Copy Button - Top Right (always visible, low profile) */}
            <div className="absolute top-2 right-2 z-10">
                <button
                    onClick={handleCopy}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all"
                    title="Copy"
                >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
            </div>

            {/* Floating Find Widget */}
            {showFindReplace && (
                <div className="absolute top-2 right-12 z-20 w-[320px] bg-white dark:bg-slate-900 rounded-lg shadow-xl ring-1 ring-slate-900/10 dark:ring-white/10 p-1.5 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* Find Row */}
                    <div className="flex items-center gap-1">
                        <div className="flex-1 relative flex items-center bg-slate-100 dark:bg-slate-800 rounded px-1 group focus-within:ring-1 focus-within:ring-indigo-500">
                            {!readOnly && (
                                <button
                                    onClick={() => setShowReplaceField(!showReplaceField)}
                                    className={`p-0.5 rounded text-slate-400 transition-transform duration-200 ${showReplaceField ? 'rotate-90' : ''}`}
                                >
                                    <ChevronRight size={12} />
                                </button>
                            )}
                            <input
                                id="find-input"
                                type="text"
                                placeholder="Find"
                                value={findText}
                                onChange={(e) => setFindText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') findNext();
                                    if (e.key === 'Escape') setShowFindReplace(false);
                                }}
                                className="flex-1 bg-transparent border-none outline-none text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 ml-1 h-6 min-w-0"
                                autoFocus
                            />

                            {/* Search Options Toggles */}
                            <div className="flex items-center gap-0.5 px-1">
                                <button
                                    onClick={() => setMatchCase(!matchCase)}
                                    className={`p-0.5 text-[10px] font-bold rounded ${matchCase ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    title="Match Case"
                                >
                                    Aa
                                </button>
                                <button
                                    onClick={() => setWholeWord(!wholeWord)}
                                    className={`p-0.5 text-[10px] font-bold rounded ${wholeWord ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    title="Match Whole Word"
                                >
                                    ab
                                </button>
                                <button
                                    onClick={() => setUseRegex(!useRegex)}
                                    className={`p-0.5 text-[10px] font-bold rounded ${useRegex ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    title="Use Regular Expression"
                                >
                                    .*
                                </button>
                            </div>

                            {findText && (
                                <button onClick={() => setFindText("")} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5">
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-0.5 pl-1">
                            <button onClick={findNext} className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded" title="Find Next (Enter)">
                                <ArrowDown size={14} />
                            </button>
                            {/* Match Count Badge */}
                            <div className="text-[10px] text-slate-400 px-1 select-none min-w-[30px] text-right">
                                {matchCount > 0 ? matchCount : ''}
                            </div>
                            <button onClick={() => setShowFindReplace(false)} className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded" title="Close (Esc)">
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Replace Row - Collapsible */}
                    {showReplaceField && !readOnly && (
                        <div className="flex items-center gap-1">
                            <div className="flex-1 relative flex items-center bg-slate-100 dark:bg-slate-800 rounded px-1 group ml-[22px] focus-within:ring-1 focus-within:ring-indigo-500">
                                <input
                                    type="text"
                                    placeholder="Replace"
                                    value={replaceText}
                                    onChange={(e) => setReplaceText(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 h-6 min-w-0"
                                />
                                {replaceText && (
                                    <button onClick={() => setReplaceText("")} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5">
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-0.5">
                                <button onClick={replaceCurrent} className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded" title="Replace">
                                    <Replace size={14} />
                                </button>
                                <button onClick={replaceAll} className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded" title="Replace All">
                                    <ReplaceAll size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Editor Area */}
            <div className="flex-1 flex relative min-h-0 bg-white dark:bg-slate-950 group">
                {/* Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className="hidden sm:block w-10 shrink-0 text-right pr-2 pt-4 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-600 text-xs font-mono select-none overflow-hidden"
                >
                    {lineNumbers.map(n => (
                        <div key={n} className="h-5 leading-5">{n}</div>
                    ))}
                </div>

                {/* CSV Syntax Highlighting Overlay */}
                {language === "csv" && value && (
                    <div 
                        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden"
                        style={{ paddingLeft: 'calc(2.5rem + 1rem)' }} // Account for line numbers + padding
                    >
                        <div className="p-4 text-sm font-mono leading-5 whitespace-pre">
                            {value.split('\n').map((line, idx) => {
                                if (idx === 0 && line.trim()) {
                                    // Header row - special rendering
                                    const headers = line.split(',');
                                    return (
                                        <div 
                                            key={idx} 
                                            className="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/30 px-1 -mx-1 rounded"
                                            style={{ letterSpacing: '0.02em' }}
                                        >
                                            {headers.map((header, i) => (
                                                <span key={i}>
                                                    {header}
                                                    {i < headers.length - 1 && <span className="text-slate-400 dark:text-slate-600">,</span>}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                }
                                return (
                                    <div key={idx} className="text-transparent">
                                        {line}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Text Area */}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => !readOnly && onChange?.(e.target.value)}
                    readOnly={readOnly}
                    onScroll={handleScroll}
                    placeholder={placeholder}
                    className={`flex-1 w-full h-full p-4 resize-none outline-none border-none bg-transparent text-sm font-mono leading-5 placeholder:text-slate-300 whitespace-pre ${
                        language === "csv" ? "text-slate-800 dark:text-slate-200" : "text-slate-800 dark:text-slate-200"
                    }`}
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>
        </div>
    );
}
