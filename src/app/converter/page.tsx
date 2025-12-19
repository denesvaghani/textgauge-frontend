import Link from 'next/link';
import { Metadata } from 'next';
import { FileCode, ArrowRightLeft, Database } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Universal Code Converter - Free Developer Tools',
    description: 'Convert between JSON, YAML, CSV, and TOML formats instantly. Secure, client-side conversion for developers.',
};

const FORMATS = ['JSON', 'YAML', 'CSV', 'TOML'];

export default function ConverterIndex() {
    const pairs = [];
    for (const from of FORMATS) {
        for (const to of FORMATS) {
            if (from !== to) {
                pairs.push({ from, to, slug: `${from.toLowerCase()}-to-${to.toLowerCase()}` });
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">
                        Universal Code Converter
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Transform data formats instantly using our secure, client-side engine.
                        No data is ever sent to a server.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pairs.map((pair) => (
                        <Link
                            key={pair.slug}
                            href={`/converter/${pair.slug}`}
                            className="group block p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                        <Database className="w-5 h-5" />
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-slate-100">
                                        {pair.from} <span className="text-slate-400 mx-1">→</span> {pair.to}
                                    </span>
                                </div>
                                <ArrowRightLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Convert {pair.from} structures to {pair.to} format with strict validation.
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
