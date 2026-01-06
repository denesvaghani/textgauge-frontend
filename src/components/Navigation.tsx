"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { flowerThemes } from "@/config/flowerThemes";

const navCategories = {
    "Text Tools": [
        { href: "/", label: "Character Counter", image: flowerThemes.sunflower.image },
    ],
    "Formatters": [
        { href: "/json-formatter", label: "JSON Formatter", image: flowerThemes.cherryBlossom.image },
        { href: "/yaml-formatter", label: "YAML Formatter", image: flowerThemes.whiteLily.image },
        { href: "/toml-formatter", label: "TOML Formatter", image: flowerThemes.frangipani.image },
    ],
    "Converters": [
        { href: "/json-to-csv-converter", label: "JSON to CSV", image: flowerThemes.sunflower.image },
        { href: "/json-to-toon-converter", label: "JSON to TOON", image: flowerThemes.lavender.image },
    ],
    "Design Tools": [
        { href: "/palette-forge", label: "PaletteForge", image: flowerThemes.orchid.image },
    ],
    "Media Tools": [
        { href: "/image-compressor", label: "Image Compressor", image: flowerThemes.hydrangea.image },
    ],
    "Comparison": [
        { href: "/diff-checker", label: "Diff Checker", image: flowerThemes.redRose.image },
    ],
    "Generators": [
        { href: "/uuid-generator", label: "UUID Generator", image: flowerThemes.dahlia.image },
        { href: "/cron-job-generator", label: "Cron Generator", image: flowerThemes.morningGlory.image },
        { href: "/base64-encoder", label: "Base64 Tool", image: flowerThemes.blueIris.image },
    ],
};

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const isLinkActive = (href: string) => pathname === href;
    const isCategoryActive = (category: string) => {
        return navCategories[category as keyof typeof navCategories]?.some(
            link => pathname === link.href
        );
    };

    // Flatten all links for mobile menu
    const allLinks = [
        { href: "/", label: "Character Counter" },
        ...Object.values(navCategories).flat(),
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-700 mr-2">
                        <Image
                            src="/images/logo/sunflower-logo.webp"
                            alt="TextGauge Logo"
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <span className="font-bold text-lg text-slate-800 dark:text-white hidden sm:block">
                            TextGauge
                        </span>
                    </Link>
                    
                    {/* Desktop Navigation - Category Dropdowns */}
                    <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>

                        {/* Category Dropdowns */}
                        {Object.entries(navCategories).map(([category, links]) => (
                            <div key={category} className="relative">
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === category ? null : category)}
                                    className={`inline-flex items-center gap-1 px-3 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        isCategoryActive(category) || openDropdown === category
                                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    {category}
                                    <ChevronDown 
                                        size={14} 
                                        className={`transition-transform duration-200 ${openDropdown === category ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {openDropdown === category && (
                                    <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                                        {links.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setOpenDropdown(null)}
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                                    isLinkActive(link.href)
                                                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                                }`}
                                            >
                                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm relative">
                                                    <Image 
                                                        src={link.image} 
                                                        alt="" 
                                                        fill
                                                        sizes="32px"
                                                        className="object-cover"
                                                        priority
                                                    />
                                                </div>
                                                <span className="font-medium">{link.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon size={18} className="text-gray-700" />
                            ) : (
                                <Sun size={18} className="text-yellow-400" />
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 top-14 bg-black/50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div 
                className={`md:hidden fixed top-14 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                        ? 'translate-y-0 opacity-100' 
                        : '-translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto py-2">
                    {/* Home Link */}
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-6 py-3 text-base font-medium transition-colors ${
                            pathname === "/"
                                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-500"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent"
                        }`}
                    >
                        Character Counter
                    </Link>

                    {/* Categories with grouped links */}
                    {Object.entries(navCategories).map(([category, links]) => (
                        <div key={category}>
                            <div className="px-6 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-2">
                                {category}
                            </div>
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center px-6 py-3 text-base font-medium transition-colors ${
                                        isLinkActive(link.href)
                                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-500"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}

