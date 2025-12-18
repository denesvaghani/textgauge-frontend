'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface LegalLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold mt-4">{title}</h1>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {children}
                </div>
            </main>
        </div>
    );
}
