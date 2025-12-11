'use client';

import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 mb-4 block w-fit">
                            TextGauge
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Free, secure, and privacy-focused developer tools for text analysis and data conversion.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Tools</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Character Counter</Link></li>
                            <li><Link href="/json-formatter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">JSON Formatter</Link></li>
                            <li><Link href="/yaml-formatter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">YAML Formatter</Link></li>
                            <li><Link href="/csv-to-json" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">CSV to JSON</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</Link></li>
                            <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        &copy; {currentYear} TextGauge. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                        Designed for privacy & speed.
                    </p>
                </div>
            </div>
        </footer>
    );
}
