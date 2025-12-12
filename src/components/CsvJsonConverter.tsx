'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import Editor from '@monaco-editor/react';
import { Upload, FileText, Download, Copy, AlertCircle, Check } from 'lucide-react';
import { GoogleAdsense } from './GoogleAdsense';
import { useTheme } from "@/contexts/ThemeContext";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export function CsvJsonConverter() {
    const { theme } = useTheme();
    // Monaco theme: 'vs' (light), 'vs-dark' (dark)
    const editorTheme = theme === "dark" ? "vs-dark" : "light";

    const [csvInput, setCsvInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError(`File size exceeds limit (Max: 25MB). Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            return;
        }

        setFileName(file.name);
        setError(null);
        setIsProcessing(true);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setJsonOutput(JSON.stringify(results.data, null, 2));
                setCsvInput(file.size < 1024 * 1024 ? 'File content loaded directly (omitted for performance)' : `[File Loaded: ${file.name}]`);
                setIsProcessing(false);
            },
            error: (err) => {
                setError(`Parsing Error: ${err.message}`);
                setIsProcessing(false);
            }
        });
    };

    const handleConvertText = () => {
        if (!csvInput.trim()) return;

        // If it's just the placeholder for the file, ignore
        if (fileName && csvInput.startsWith('[File Loaded:')) return;

        setError(null);
        setIsProcessing(true);

        Papa.parse(csvInput, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<unknown>) => {
                if (results.errors.length > 0) {
                    // If mostly successful but some errors, we still show data but warn
                    console.warn('CSV Parse Warnings:', results.errors);
                }
                setJsonOutput(JSON.stringify(results.data, null, 2));
                setIsProcessing(false);
                setFileName(null);
            },
            error: (err: Papa.ParseError) => {
                setError(`Parsing Error: ${err.message}`);
                setIsProcessing(false);
            }
        } as Papa.ParseConfig);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([jsonOutput], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = (fileName ? fileName.replace('.csv', '') : 'converted') + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setCsvInput('');
        setJsonOutput('');
        setFileName(null);
        setError(null);
    };

    return (
        <div className="h-screen supports-[height:100dvh]:h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200 overflow-hidden font-sans">
            {/* Header Section - Minimal & Clean with Glassmorphism */}
            <header className="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 w-fit">
                                CSV to JSON Converter
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium hidden sm:block">
                                Convert CSV files or text to JSON instantly. Supports files up to 25MB.
                            </p>
                        </div>

                        {/* Top Ad Slot - Compact */}
                        {process.env.NEXT_PUBLIC_AD_SLOT_HEADER && (
                            <div className="flex justify-center shrink-0">
                                <div className="w-full max-w-[728px] h-[90px] rounded-lg overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">

                                    <GoogleAdsense
                                        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER}
                                        style={{ display: 'block', width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col min-h-0 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[600px]">
                    {/* Input Section */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
                            <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">CSV Input</span>
                                    {/* Modern Badge */}
                                    <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                                        <div className={`w-1 h-1 rounded-full ${csvInput ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                        <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">{fileName ? 'File Loaded' : 'Active'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById("csv-upload")?.click()}
                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200"
                                        title="Upload CSV"
                                    >
                                        <Upload size={16} strokeWidth={2} />
                                        <input type="file" id="csv-upload" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
                                    </button>
                                    {(csvInput || fileName) && (
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                                            title="Clear"
                                        >
                                            <div className="w-4 h-4 flex items-center justify-center font-bold">×</div>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 relative p-0 min-h-0">
                                {/* Overlay for large file */}
                                {fileName && !isProcessing && (
                                    <div className="absolute inset-0 z-10 bg-slate-50/90 dark:bg-slate-900/90 flex flex-col items-center justify-center text-center p-6">
                                        <FileText size={48} className="text-blue-500 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{fileName}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">File loaded and converted successfully!</p>
                                        <button
                                            onClick={handleReset}
                                            className="text-sm text-slate-500 hover:text-red-500 underline decoration-dotted"
                                        >
                                            Remove file
                                        </button>
                                    </div>
                                )}

                                <Editor
                                    height="100%"
                                    defaultLanguage="plaintext"
                                    value={csvInput}
                                    onChange={(val) => {
                                        setCsvInput(val || '');
                                        setFileName(null); // Clear filename if manually editing
                                    }}
                                    theme={editorTheme}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        padding: { top: 12 },
                                        wordWrap: 'off',
                                        automaticLayout: true,
                                        lineNumbers: 'off',
                                        glyphMargin: false,
                                        folding: false,
                                        lineDecorationsWidth: 0,
                                        lineNumbersMinChars: 0,
                                        scrollBeyondLastLine: false,
                                        renderLineHighlight: 'none',
                                        overviewRulerBorder: false,
                                        overviewRulerLanes: 0,
                                        hideCursorInOverviewRuler: true,
                                    }}
                                    className="h-full"
                                />
                            </div>

                            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                {!fileName && (
                                    <button
                                        onClick={handleConvertText}
                                        disabled={!csvInput.trim() || isProcessing}
                                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? 'Converting...' : 'Convert to JSON →'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    {/* Output Section */}
                    <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
                        <div className="shrink-0 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">JSON Output</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopy}
                                    disabled={!jsonOutput}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 text-xs font-bold ${copied
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                                        } disabled:opacity-50`}
                                    title="Copy to Clipboard"
                                >
                                    {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2} />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    disabled={!jsonOutput}
                                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-md transition-all duration-200 disabled:opacity-50"
                                    title="Download"
                                >
                                    <Download size={16} strokeWidth={2} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 bg-slate-50/30 dark:bg-black/20">
                            <Editor
                                height="100%"
                                defaultLanguage="json"
                                value={jsonOutput}
                                theme={editorTheme}
                                options={{
                                    minimap: { enabled: false }, // Output doesn't need minimap usually for clean look
                                    fontSize: 13,
                                    readOnly: true,
                                    padding: { top: 12 },
                                    automaticLayout: true,
                                    lineNumbers: 'off',
                                    glyphMargin: false,
                                    folding: false,
                                    lineDecorationsWidth: 0,
                                    lineNumbersMinChars: 0,
                                    scrollBeyondLastLine: false,
                                    renderLineHighlight: 'none',
                                    overviewRulerBorder: false,
                                    overviewRulerLanes: 0,
                                    hideCursorInOverviewRuler: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
