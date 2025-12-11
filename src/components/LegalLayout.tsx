'use client';

import { ReactNode } from 'react';

interface LegalLayoutProps {
    title: string;
    date?: string;
    children: ReactNode;
}

export function LegalLayout({ title, date, children }: LegalLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">

                    {/* Header */}
                    <div className="px-6 py-8 sm:px-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                            {title}
                        </h1>
                        {date && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                Last updated: {date}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="px-6 py-8 sm:px-10">
                        <div className="prose prose-slate dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
