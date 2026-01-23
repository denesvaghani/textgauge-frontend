"use client";

import Link from "next/link";
import Image from "next/image";
import { DynamicAd } from "./DynamicAd";

export function Footer() {
    // 1. Formatters (Text focused)
    const formatterLinks = [
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'YAML Formatter', href: '/yaml-formatter' },
        { name: 'TOML Formatter', href: '/toml-formatter' },
        { name: 'Character Counter', href: '/' },
        { name: 'Diff Checker', href: '/diff-checker' },
        { name: 'List Diff Tool', href: '/list-diff' },
    ];

    // 2. Converters & Media (Grouped together)
    const mediaLinks = [
        { name: 'JSON to CSV', href: '/json-to-csv-converter' },
        { name: 'JSON to TOON', href: '/json-to-toon-converter' },
        { name: 'Image Compressor', href: '/image-compressor' },
        { name: 'Image Converter', href: '/image-converter' },
        { name: 'Image Resizer', href: '/image-resizer' },
        { name: 'Palette Forge', href: '/palette-forge' },
    ];

    // 3. Utilities (Generators)
    const utilityLinks = [
        { name: 'UUID Generator', href: '/uuid-generator' },
        { name: 'Hash Generator', href: '/hash-generator' },
        { name: 'Cron Generator', href: '/cron-job-generator' },
        { name: 'Base64 Encoder', href: '/base64-encoder' },
        { name: 'URL Encoder', href: '/url-encoder' },
    ];

    // 4. Resources (Learn & Benchmarks)
    // 4. Resources (Learn) - Latest 5
    const resourceLinks = [
        { name: 'Cron Expressions Guide', href: '/learn/mastering-cron-expressions' },
        { name: 'Image Optimization', href: '/learn/image-optimization-guide' },
        { name: 'YAML vs JSON', href: '/learn/yaml-vs-json-guide' },
        { name: 'JSON vs TOON', href: '/benchmarks/json-vs-toon' },
        { name: 'JSON vs CSV', href: '/benchmarks/json-vs-csv' },
    ];

    // 5. Company & Legal
    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ];

    return (
        <>
            {/* Optional Pre-Footer Ad Slot */}
            {process.env.NEXT_PUBLIC_AD_SLOT_FOOTER_LEADERBOARD && (
                <div className="bg-slate-50 dark:bg-slate-950 py-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="container mx-auto px-4 text-center">
                        <DynamicAd
                            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER_LEADERBOARD}
                            adFormat="horizontal"
                            style={{ minHeight: '90px' }}
                        />
                    </div>
                </div>
            )}

            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 gap-y-12">
                        
                        {/* Brand Column (Span 2 on large screens if needed, mostly Col 1) */}
                        <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-12">
                            <Link href="/" className="flex items-center gap-2 mb-6">
                                <Image
                                    src="/images/logo/sunflower-logo.webp"
                                    alt="TextGauge Logo"
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                />
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                                    TextGauge
                                </span>
                            </Link>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                                Free, privacy-first developer tools. Format JSON/YAML, compress images, generate UUIDs, 
                                and compare data formats. 100% browser-based, no server uploads.
                            </p>
                            <div className="text-sm text-slate-400">
                                © 2025 TextGauge. All rights reserved.
                            </div>
                        </div>

                        {/* Column 2: Formatters */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-5">Formatters</h3>
                            <ul className="space-y-3">
                                {formatterLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Converters/Media */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-5">Media & Convert</h3>
                            <ul className="space-y-3">
                                {mediaLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Utilities */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-5">Utilities</h3>
                            <ul className="space-y-3">
                                {utilityLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 5: Learn & Company (Merged) */}
                        {/* Column 5: Learn */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-5">Learn</h3>
                            <ul className="space-y-3">
                                {resourceLinks.slice(0, 5).map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/learn" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
                                        View All <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 6: Company */}
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-5">Company</h3>
                            <ul className="space-y-3">
                                {companyLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
