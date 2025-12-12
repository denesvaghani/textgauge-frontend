import { editor } from "monaco-editor";

/**
 * Shared "Clean" configuration for Monaco Editor.
 * Disables all visual noise (minimap, rulers, guides) for a notepad-like experience.
 */
export const CLEAN_MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    // Core Visuals
    minimap: { enabled: false },
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,

    // Layout & Scrolling
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    padding: { top: 16, bottom: 16 },

    // Styling & Anti-Noise
    renderLineHighlight: 'none',       // No current line highlight
    renderLineHighlightOnlyWhenFocus: false,
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,

    // Guides (The "Grid" look)
    guides: {
        indentation: false,
        bracketPairs: false,
        bracketPairsHorizontal: false,
        highlightActiveIndentation: false,
        highlightActiveBracketPair: false,
    },

    // Rendering
    renderWhitespace: 'none',
    matchBrackets: 'never',

    // Interacton & Highlighting (The "Blue Box")
    selectionHighlight: false,
    occurrencesHighlight: 'off',

    // Accessibility & Borders
    accessibilitySupport: 'off', // Prevents screen reader optimized borders which look like boxes

    // Font
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",

    // Misc
    contextmenu: false, // Cleaner feel
    scrollBeyondLastColumn: 0,

    // UX Improvements
    cursorStyle: 'line',
    fixedOverflowWidgets: true,
};
