'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        We use cookies to enhance your experience and analyze traffic. By continuing to visit this site you agree to our use of cookies.{' '}
                        <Link
                            href="/cookie-policy"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            Learn more
                        </Link>
                    </p>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
