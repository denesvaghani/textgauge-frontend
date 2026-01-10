'use client';

import { useState, useEffect } from 'react';
import { CodeEditor } from './CodeEditor';
import { TrustPanel } from '@/components/TrustPanel';
import { useConverter } from '@/hooks/useConverter';
import { ConversionFormat } from '@/types/converter';
import { ArrowRight, Loader2, Copy, Check } from 'lucide-react';

const FORMATS: { value: ConversionFormat; label: string }[] = [
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'csv', label: 'CSV' },
    { value: 'toml', label: 'TOML' },
];

interface ConverterLayoutProps {
    defaultFrom?: ConversionFormat;
    defaultTo?: ConversionFormat;
}

export function ConverterLayout({ defaultFrom = 'json', defaultTo = 'yaml' }: ConverterLayoutProps) {
    const [input, setInput] = useState('');
    const [fromFormat, setFromFormat] = useState<ConversionFormat>(defaultFrom);
    const [toFormat, setToFormat] = useState<ConversionFormat>(defaultTo);
    const [copied, setCopied] = useState(false);

    // Sync props to state if they change (e.g. navigation)
    useEffect(() => {
        setFromFormat(defaultFrom);
        setToFormat(defaultTo);
    }, [defaultFrom, defaultTo]);

    const { convert, isConverting, result, error } = useConverter();

    useEffect(() => {
        // Auto-convert when result changes from worker
        // You might want to debounce input and auto-convert, 
        // but for now let's keep it manual or triggered by format change
    }, [result]);

    const handleConvert = () => {
        convert(input, fromFormat, toFormat);
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-4 p-4 max-w-[1920px] mx-auto">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <select
                        value={fromFormat}
                        onChange={(e) => setFromFormat(e.target.value as ConversionFormat)}
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                        {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>

                    <ArrowRight className="w-5 h-5 text-slate-400" />

                    <select
                        value={toFormat}
                        onChange={(e) => setToFormat(e.target.value as ConversionFormat)}
                        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                        {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                </div>

                <button
                    onClick={handleConvert}
                    disabled={isConverting || !input}
                    className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isConverting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Converting...</>
                    ) : (
                        'Convert'
                    )}
                </button>
            </div>

            {/* Editor Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-2 min-h-0">
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Input</span>
                    <CodeEditor
                        value={input}
                        onChange={(val) => setInput(val || '')}
                        language={fromFormat}
                    />
                </div>

                <div className="flex flex-col gap-2 min-h-0 relative">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Output</span>
                        {result && (
                            <button
                                onClick={copyToClipboard}
                                className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded transition-colors"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </div>

                    <div className="flex-1 relative min-h-0 border rounded-lg overflow-hidden border-slate-200 dark:border-slate-800 bg-[#1e1e1e]">
                        {error ? (
                            <div className="absolute inset-0 p-4 text-red-400 font-mono text-sm overflow-auto">
                                <p className="font-bold mb-2">Error during conversion:</p>
                                {error}
                            </div>
                        ) : (
                            <CodeEditor
                                value={result || ''}
                                readOnly={true}
                                language={toFormat}
                            />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="mt-4">
                <TrustPanel />
            </div>
        </div>
    );
}
