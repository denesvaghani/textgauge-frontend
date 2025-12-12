'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { GoogleAnalytics } from './GoogleAnalytics';

interface CookieConsentProps {
    gaId?: string;
    adsenseId?: string;
}

export function CookieConsent({ gaId, adsenseId }: CookieConsentProps) {
    const [consent, setConsent] = useState<boolean | null>(null); // null = not yet decided
    const [showBanner, setShowBanner] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // Check localStorage on mount
        const stored = localStorage.getItem('cookie_consent');
        if (stored === 'true') {
            setConsent(true);
        } else if (stored === 'false') {
            setConsent(false);
        } else {
            // IMPLIED CONSENT: We do NOT set consent to false. 
            // We treat null as "implicitly accepted" for script loading, 
            // but we still show the banner.
            setConsent(null);

            // Delay banner slightly for smoother UX
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setConsent(true);
        setShowBanner(false);
    };

    // REVENUE FRIENDLY LOGIC:
    // Load scripts if consent is TRUE (accepted) OR NULL (implied/default).
    // Only block if explicitly FALSE (user disabled it previously).
    const shouldLoadScripts = consent === true || consent === null;

    return (
        <>
            {/* Conditionally Load Scripts based on Consent */}
            {shouldLoadScripts && (
                <>
                    {gaId && <GoogleAnalytics measurementId={gaId} />}
                    {adsenseId && (
                        <Script
                            id="adsense-script"
                            strategy="afterInteractive"
                            async
                            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
                            crossOrigin="anonymous"
                        />
                    )}
                </>
            )}

            {/* Banner - Notice Only Style */}
            {showBanner && (
                <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                We use cookies to enhance your experience and analyze traffic. By continuing to visit this site you agree to our use of cookies. <Link href="/cookie-policy" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">Learn more</Link>.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
