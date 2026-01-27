"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    customItems?: BreadcrumbItem[];
}

// Map of paths to friendly names
const pathNames: Record<string, string> = {
    'json-formatter': 'JSON Formatter',
    'yaml-formatter': 'YAML Formatter',
    'toml-formatter': 'TOML Formatter',
    'diff-checker': 'Diff Checker',
    'list-comparator': 'List Comparator',
    'image-compressor': 'Image Compressor',
    'image-converter': 'Image Converter',
    'image-resizer': 'Image Resizer',
    'image-merger': 'Image Merger',
    'json-to-csv-converter': 'JSON to CSV',
    'json-to-toon-converter': 'JSON to TOON',
    'uuid-generator': 'UUID Generator',
    'hash-generator': 'Hash Generator',
    'cron-job-generator': 'Cron Generator',
    'base64-encoder': 'Base64 Encoder',
    'url-encoder': 'URL Encoder',
    'palette-forge': 'Palette Forge',
    'about': 'About Us',
    'team': 'Team',
    'contact': 'Contact',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'cookie-policy': 'Cookie Policy',
    'help': 'Help & FAQ',
    'learn': 'Learn',
    'benchmarks': 'Benchmarks',
    'converter': 'Converter',
};

export function Breadcrumbs({ customItems }: BreadcrumbsProps) {
    const pathname = usePathname();

    const breadcrumbs = useMemo(() => {
        if (customItems) return customItems;

        const paths = pathname.split('/').filter(Boolean);
        
        const items: BreadcrumbItem[] = [
            { label: 'Home', href: '/' }
        ];

        let currentPath = '';
        for (const path of paths) {
            currentPath += `/${path}`;
            const label = pathNames[path] || path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            items.push({
                label,
                href: currentPath
            });
        }

        return items;
    }, [pathname, customItems]);

    // Don't show breadcrumbs on homepage
    if (pathname === '/') {
        return null;
    }

    // Generate JSON-LD breadcrumb schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://www.countcharacters.org${item.href}`
        }))
    };

    return (
        <>
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Visual breadcrumbs */}
            <nav 
                aria-label="Breadcrumb" 
                className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
            >
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <ol className="flex items-center gap-2 text-sm flex-wrap">
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            const isFirst = index === 0;

                            return (
                                <li key={item.href} className="flex items-center gap-2">
                                    {index > 0 && (
                                        <ChevronRight 
                                            className="w-4 h-4 text-slate-400 dark:text-slate-600" 
                                            aria-hidden="true"
                                        />
                                    )}
                                    {isLast ? (
                                        <span 
                                            className="text-slate-900 dark:text-white font-medium flex items-center gap-1"
                                            aria-current="page"
                                        >
                                            {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                                        >
                                            {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </nav>
        </>
    );
}
