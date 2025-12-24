"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Copy, Search, Check, X, ArrowDown, ArrowUp, Replace, ReplaceAll, ChevronDown, ChevronRight, Upload, Trash2, type LucideIcon } from "lucide-react";

// Escape HTML special characters
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Highlight JSON syntax with colors - using bold, saturated colors for readability
function highlightJson(code: string): string {
    if (!code.trim()) return '';
    
    // Regex to match JSON tokens - key pattern does NOT consume the colon
    const tokenRegex = /("(?:[^"\\]|\\.)*")(?=\s*:)|("(?:[^"\\]|\\.)*")|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([\[\]{}])|([:,])|(\s+)/g;
    
    let result = '';
    let lastIndex = 0;
    let match;
    let expectingColon = false;
    
    while ((match = tokenRegex.exec(code)) !== null) {
        // Add any unmatched text before this match
        if (match.index > lastIndex) {
            result += escapeHtml(code.substring(lastIndex, match.index));
        }
        
        const [fullMatch, key, string, number, bool, bracket, punctuation, whitespace] = match;
        
        if (key) {
            // Key (property name) - bold blue color
            result += `<span class="text-blue-700 dark:text-blue-300 font-semibold">${escapeHtml(key)}</span>`;
            expectingColon = true;
        } else if (string) {
            // String value - rich green
            result += `<span class="text-green-700 dark:text-green-300">${escapeHtml(string)}</span>`;
        } else if (number) {
            // Number - vivid orange
            result += `<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(number)}</span>`;
        } else if (bool) {
            // Boolean or null - bold magenta/pink
            result += `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(bool)}</span>`;
        } else if (bracket) {
            // Brackets - darker gray for visibility
            result += `<span class="text-slate-700 dark:text-slate-300 font-medium">${escapeHtml(bracket)}</span>`;
        } else if (punctuation) {
            // Colon and comma - visible dark color
            result += `<span class="text-slate-600 dark:text-slate-400">${escapeHtml(punctuation)}</span>`;
            expectingColon = false;
        } else if (whitespace) {
            // Preserve whitespace
            result += whitespace;
        } else {
            result += escapeHtml(fullMatch);
        }
        
        lastIndex = match.index + fullMatch.length;
    }
    
    // Add remaining text
    if (lastIndex < code.length) {
        result += escapeHtml(code.substring(lastIndex));
    }
    
    return result;
}


// Highlight YAML syntax with colors - matching JSON color scheme for consistency
function highlightYaml(code: string): string {
    if (!code.trim()) return '';
    
    const lines = code.split('\n');
    const highlightedLines = lines.map(line => {
        if (!line.trim()) return line;
        
        // Comment line
        if (line.trim().startsWith('#')) {
            return `<span class="text-gray-500 dark:text-gray-400 italic">${escapeHtml(line)}</span>`;
        }
        
        // Check if it's a key-value line
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const beforeColon = line.substring(0, colonIndex);
            const afterColon = line.substring(colonIndex + 1);
            
            // Check for leading dash (array item with key)
            const dashMatch = beforeColon.match(/^(\s*-\s*)/);
            let keyPart = beforeColon;
            let dashPart = '';
            
            if (dashMatch) {
                dashPart = `<span class="text-teal-600 dark:text-teal-400 font-medium">${escapeHtml(dashMatch[1])}</span>`;
                keyPart = beforeColon.substring(dashMatch[1].length);
            }
            
            // Highlight key - bold blue
            const highlightedKey = `<span class="text-blue-700 dark:text-blue-300 font-semibold">${escapeHtml(keyPart)}</span>`;
            const colonSpan = `<span class="text-slate-600 dark:text-slate-400">:</span>`;
            
            // Highlight value
            let highlightedValue = '';
            const valueTrimmed = afterColon.trim();
            
            if (valueTrimmed === '') {
                highlightedValue = afterColon; // Preserve whitespace
            } else if (valueTrimmed === 'true' || valueTrimmed === 'false' || valueTrimmed === 'null' || valueTrimmed === '~') {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(valueTrimmed)}</span>`;
            } else if (/^-?\d+\.?\d*$/.test(valueTrimmed)) {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(valueTrimmed)}</span>`;
            } else if (valueTrimmed.startsWith('"') || valueTrimmed.startsWith("'")) {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-green-700 dark:text-green-300">${escapeHtml(valueTrimmed)}</span>`;
            } else if (valueTrimmed.startsWith('[') || valueTrimmed.startsWith('{')) {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-slate-700 dark:text-slate-300 font-medium">${escapeHtml(valueTrimmed)}</span>`;
            } else {
                // Plain string value (no quotes in YAML) - rich green
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-green-700 dark:text-green-300">${escapeHtml(valueTrimmed)}</span>`;
            }
            
            return dashPart + highlightedKey + colonSpan + highlightedValue;
        }
        
        // Array item (just dash)
        const arrayMatch = line.match(/^(\s*)(-\s*)(.*)$/);
        if (arrayMatch) {
            const [, indent, dash, value] = arrayMatch;
            const dashSpan = `<span class="text-teal-600 dark:text-teal-400 font-medium">${escapeHtml(dash)}</span>`;
            
            let valueSpan = '';
            const valueTrimmed = value.trim();
            if (valueTrimmed === 'true' || valueTrimmed === 'false' || valueTrimmed === 'null') {
                valueSpan = `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(value)}</span>`;
            } else if (/^-?\d+\.?\d*$/.test(valueTrimmed)) {
                valueSpan = `<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(value)}</span>`;
            } else {
                valueSpan = `<span class="text-green-700 dark:text-green-300">${escapeHtml(value)}</span>`;
            }
            
            return indent + dashSpan + valueSpan;
        }
        
        // Default - return as plain text
        return escapeHtml(line);
    });
    
    return highlightedLines.join('\n');
}


// Highlight TOML syntax
function highlightToml(code: string): string {
    if (!code.trim()) return '';

    const lines = code.split('\n');
    return lines.map(line => {
        if (!line.trim()) return line;

        // Comments
        const commentMatch = line.match(/^(.*)(#.*)$/);
        let content = line;
        let comment = '';

        if (line.trim().startsWith('#')) {
             return `<span class="text-gray-500 dark:text-gray-400 italic">${escapeHtml(line)}</span>`;
        }

        if (commentMatch) {
            content = commentMatch[1];
            comment = `<span class="text-gray-500 dark:text-gray-400 italic">${escapeHtml(commentMatch[2])}</span>`;
        }

        // Section [section]
        if (content.trim().startsWith('[')) {
             return `<span class="text-yellow-600 dark:text-yellow-400 font-bold">${escapeHtml(content)}</span>` + comment;
        }

        // Key = Value
        const equalIndex = content.indexOf('=');
        if (equalIndex > 0) {
            const key = content.substring(0, equalIndex);
            const value = content.substring(equalIndex + 1);

            const keySpan = `<span class="text-blue-700 dark:text-blue-300 font-semibold">${escapeHtml(key)}</span>`;
            const equalSpan = `<span class="text-slate-600 dark:text-slate-400">=</span>`;

            // Simple value highlighting
            let valueSpan = escapeHtml(value);
            const vTrim = value.trim();

             if (vTrim === 'true' || vTrim === 'false') {
                valueSpan = value.replace(vTrim, `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${vTrim}</span>`);
            } else if (/^-?\d/.test(vTrim)) { 
                 valueSpan = value.replace(vTrim, `<span class="text-orange-600 dark:text-orange-400 font-medium">${vTrim}</span>`);
            } else if (vTrim.startsWith('"') || vTrim.startsWith("'")) {
                valueSpan = `<span class="text-green-700 dark:text-green-300">${escapeHtml(value)}</span>`;
            }

            return keySpan + equalSpan + valueSpan + comment;
        }

        return escapeHtml(content) + comment;

    }).join('\n');
}

interface SimpleCodeEditorProps {

    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
    language?: "json" | "yaml" | "text" | "csv" | "toml";
    onUpload?: () => void;
    onClear?: () => void;
}

export function SimpleCodeEditor({
    value,
    onChange,
    readOnly = false,
    placeholder,
    className = "",
    language = "text",
    onUpload,
    onClear,
}: SimpleCodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const jsonOverlayRef = useRef<HTMLDivElement>(null);
    const yamlOverlayRef = useRef<HTMLDivElement>(null);
    const tomlOverlayRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    // Find & Replace State
    const [showFindReplace, setShowFindReplace] = useState(false);
    const [showReplaceField, setShowReplaceField] = useState(false); // Toggle for replace row
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [matchCount, setMatchCount] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
    const [matchPositions, setMatchPositions] = useState<number[]>([]); // Positions as percentages (0-100)

    // Search Options
    const [matchCase, setMatchCase] = useState(false);
    const [useRegex, setUseRegex] = useState(false);
    const [wholeWord, setWholeWord] = useState(false);

    // Sync Scroll (both vertical and horizontal)
    const handleScroll = () => {
        if (textareaRef.current) {
            const { scrollTop, scrollLeft } = textareaRef.current;
            if (lineNumbersRef.current) {
                lineNumbersRef.current.scrollTop = scrollTop;
            }
            if (jsonOverlayRef.current) {
                jsonOverlayRef.current.scrollTop = scrollTop;
                jsonOverlayRef.current.scrollLeft = scrollLeft;
            }
            if (yamlOverlayRef.current) {
                yamlOverlayRef.current.scrollTop = scrollTop;
                yamlOverlayRef.current.scrollLeft = scrollLeft;
            }
            if (tomlOverlayRef.current) {
                tomlOverlayRef.current.scrollTop = scrollTop;
                tomlOverlayRef.current.scrollLeft = scrollLeft;
            }
        }
    };

    // Apply search highlighting to already-highlighted content
    const applySearchHighlight = (htmlContent: string, searchText: string, isCaseSensitive: boolean, isRegex: boolean, isWholeWord: boolean): string => {
        if (!searchText || !htmlContent) return htmlContent;
        
        try {
            let pattern = searchText;
            
            if (!isRegex) {
                // Escape special regex chars
                pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }
            
            if (isWholeWord) {
                pattern = `\\b${pattern}\\b`;
            }
            
            const flags = isCaseSensitive ? 'g' : 'gi';
            const regex = new RegExp(`(${pattern})`, flags);
            
            // Split by HTML tags and only highlight in text content, not in tags
            const parts = htmlContent.split(/(<[^>]*>)/);
            return parts.map(part => {
                if (part.startsWith('<')) {
                    return part; // Return tags unchanged
                }
                // Highlight matches in text content
                return part.replace(regex, '<mark class="bg-amber-300 dark:bg-amber-500/50 px-0.5 rounded">$1</mark>');
            }).join('');
        } catch {
            return htmlContent;
        }
    };

    // Memoize highlighted content to avoid re-rendering on scroll
    const baseHighlightedJson = useMemo(() => language === 'json' && value ? highlightJson(value) : '', [language, value]);
    const baseHighlightedYaml = useMemo(() => language === 'yaml' && value ? highlightYaml(value) : '', [language, value]);
    const baseHighlightedToml = useMemo(() => language === 'toml' && value ? highlightToml(value) : '', [language, value]);
    
    // Apply search highlighting on top of syntax highlighting
    const highlightedJson = useMemo(() => 
        showFindReplace && findText ? applySearchHighlight(baseHighlightedJson, findText, matchCase, useRegex, wholeWord) : baseHighlightedJson,
        [baseHighlightedJson, showFindReplace, findText, matchCase, useRegex, wholeWord]
    );
    const highlightedYaml = useMemo(() => 
        showFindReplace && findText ? applySearchHighlight(baseHighlightedYaml, findText, matchCase, useRegex, wholeWord) : baseHighlightedYaml,
        [baseHighlightedYaml, showFindReplace, findText, matchCase, useRegex, wholeWord]
    );
    const highlightedToml = useMemo(() => 
        showFindReplace && findText ? applySearchHighlight(baseHighlightedToml, findText, matchCase, useRegex, wholeWord) : baseHighlightedToml,
        [baseHighlightedToml, showFindReplace, findText, matchCase, useRegex, wholeWord]
    );

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

    // Find Logic (Count and Positions for scrollbar markers - LINE BASED)
    useEffect(() => {
        const regex = getSearchRegex();
        if (!regex || !findText) {
            setMatchCount(0);
            setCurrentMatchIndex(-1);
            setMatchPositions([]);
            return;
        }
        
        // Find all matches and their LINE positions for scrollbar markers
        const positions: number[] = [];
        const lines = value.split('\n');
        const totalLines = lines.length;
        
        if (totalLines > 0) {
            let match;
            regex.lastIndex = 0;
            while ((match = regex.exec(value)) !== null) {
                // Calculate which line number this match is on
                const textBeforeMatch = value.substring(0, match.index);
                const lineNumber = textBeforeMatch.split('\n').length;
                // Calculate position as percentage based on LINE number
                const position = ((lineNumber - 1) / totalLines) * 100;
                // Avoid duplicate positions for same line
                if (positions.length === 0 || positions[positions.length - 1] !== position) {
                    positions.push(position);
                }
                // Prevent infinite loop for zero-length matches
                if (match[0].length === 0) regex.lastIndex++;
            }
        }
        
        setMatchCount(positions.length);
        setMatchPositions(positions);
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

            {/* Absolute Action Buttons - Top Right */}
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                 {onUpload && (
                     <button
                        onClick={onUpload}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all"
                        title="Upload File"
                    >
                        <Upload size={14} />
                    </button>
                )}
                {onClear && (
                     <button
                        onClick={onClear}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all"
                        title="Clear"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
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
            <div className="flex-1 flex relative min-h-0 overflow-hidden bg-white dark:bg-slate-950 group">
                {/* Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className="hidden sm:block w-10 shrink-0 text-right pr-2 pt-4 pb-4 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-600 text-xs font-mono select-none overflow-y-auto overflow-x-hidden scrollbar-hide"
                >
                    {lineNumbers.map(n => (
                        <div key={n} className="leading-[24px]">{n}</div>
                    ))}
                </div>

                {/* JSON Syntax Highlighting Overlay */}
                {language === "json" && value && (
                    <div 
                        ref={jsonOverlayRef}
                        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-auto"
                        style={{ paddingLeft: 'calc(2.5rem)' }}
                    >
                        <pre 
                            className="p-4 text-[14px] leading-[24px] whitespace-pre"
                            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace" }}
                            dangerouslySetInnerHTML={{ __html: highlightedJson }}
                        />
                    </div>
                )}

                {/* YAML Syntax Highlighting Overlay */}
                {language === "yaml" && value && (
                    <div 
                        ref={yamlOverlayRef}
                        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-auto"
                        style={{ paddingLeft: 'calc(2.5rem)' }}
                    >
                        <pre 
                            className="p-4 text-[14px] leading-[24px] whitespace-pre"
                            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace" }}
                            dangerouslySetInnerHTML={{ __html: highlightedYaml }}
                        />
                    </div>
                )}

                {/* TOML Syntax Highlighting Overlay */}
                {language === "toml" && value && (
                    <div 
                        ref={tomlOverlayRef}
                        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-auto"
                        style={{ paddingLeft: 'calc(2.5rem)' }}
                    >
                        <pre 
                            className="p-4 text-[14px] leading-[24px] whitespace-pre"
                            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace" }}
                            dangerouslySetInnerHTML={{ __html: highlightedToml }}
                        />
                    </div>
                )}

                {/* CSV Syntax Highlighting Overlay */}
                {language === "csv" && value && (
                    <div 
                        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-auto"
                        style={{ paddingLeft: 'calc(2.5rem)' }}
                    >
                        <pre 
                            className="p-4 text-[14px] leading-[24px] whitespace-pre"
                            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace" }}
                        >
                            {value.split('\n').map((line, idx) => {
                                if (idx === 0 && line.trim()) {
                                    // Header row - bold blue with highlight background
                                    const headers = line.split(',');
                                    return (
                                        <div 
                                            key={idx} 
                                            className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 px-2 -mx-2 rounded"
                                        >
                                            {headers.map((header, i) => (
                                                <span key={i}>
                                                    <span className="text-blue-800 dark:text-blue-200">{header}</span>
                                                    {i < headers.length - 1 && <span className="text-slate-500 dark:text-slate-400">,</span>}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                }
                                // Data rows - dark readable text
                                const cells = line.split(',');
                                return (
                                    <div key={idx} className="text-slate-700 dark:text-slate-300">
                                        {cells.map((cell, i) => (
                                            <span key={i}>
                                                <span>{cell}</span>
                                                {i < cells.length - 1 && <span className="text-slate-400 dark:text-slate-500">,</span>}
                                            </span>
                                        ))}
                                    </div>
                                );
                            })}
                        </pre>
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
                    className={`flex-1 w-full h-full p-4 resize-none outline-none border-none bg-transparent text-[14px] leading-[24px] placeholder:text-slate-400 whitespace-pre text-left overflow-auto ${
                        (language === "json" || language === "yaml" || language === "csv" || language === "toml") && value
                            ? "text-transparent caret-slate-800 dark:caret-slate-200"
                            : "text-slate-800 dark:text-slate-200"
                    }`}
                    style={{ 
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace",
                        textAlign: "left"
                    }}
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                />

                {/* Scrollbar Match Markers */}
                {showFindReplace && matchPositions.length > 0 && (
                    <div 
                        className="absolute top-0 right-0 w-3 h-full pointer-events-none z-5"
                        style={{ opacity: 0.9 }}
                    >
                        {matchPositions.map((position, idx) => (
                            <div
                                key={idx}
                                className="absolute right-0.5 w-2 h-1 bg-amber-400 dark:bg-amber-500 rounded-sm shadow-sm"
                                style={{
                                    top: `${position}%`,
                                    transform: 'translateY(-50%)',
                                }}
                                title={`Match ${idx + 1} of ${matchPositions.length}`}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
