"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

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

    const links = [
        { href: "/", label: "Character Counter" },
        { href: "/json-formatter", label: "JSON Formatter" },
        { href: "/yaml-formatter", label: "YAML Formatter" },
        { href: "/toml-formatter", label: "TOML Formatter" },
        { href: "/json-to-csv-converter", label: "JSON to CSV" },
        { href: "/json-to-toon-converter", label: "JSON to TOON" },
        { href: "/diff-checker", label: "Diff Checker" },
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
                    
                    {/* Desktop Navigation Links - Hidden on mobile */}
                    <div className="hidden md:flex space-x-1 overflow-x-auto">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`inline-flex items-center px-3 h-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
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
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center px-6 py-3 text-base font-medium transition-colors ${
                                    isActive
                                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-500"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
