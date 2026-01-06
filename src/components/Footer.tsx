'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
    const { theme } = useTheme();

    const toolLinks = [
        { name: 'Character Counter', href: '/' },
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'YAML Formatter', href: '/yaml-formatter' },
        { name: 'TOML Formatter', href: '/toml-formatter' },
        { name: 'JSON to CSV', href: '/json-to-csv-converter' },
        { name: 'JSON to TOON', href: '/json-to-toon-converter' },
        { name: 'Diff Checker', href: '/diff-checker' },
        { name: 'UUID Generator', href: '/uuid-generator' },
        { name: 'Cron Generator', href: '/cron-job-generator' },
        { name: 'Base64 Tool', href: '/base64-encoder' },
        { name: 'PaletteForge', href: '/palette-forge' },
        { name: 'Image Compressor', href: '/image-compressor' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
    ];

    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/images/logo/sunflower-logo.webp"
                                alt="TextGauge Logo"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <span className="text-2xl font-bold text-slate-800 dark:text-white">
                                TextGauge
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            Free, secure, and privacy-focused developer tools suite. JSON Formatter, Diff Checker, Converters, and more - all in your browser.
                        </p>
                    </div>

                    {/* Tools Column 1 */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Formatters & Converters</h3>
                        <ul className="space-y-2">
                            {toolLinks.slice(0, 6).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools Column 2 */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Generators & Utilities</h3>
                        <ul className="space-y-2">
                            {toolLinks.slice(6).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} TextGauge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
