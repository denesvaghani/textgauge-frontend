'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type ConsentState = 'granted' | 'denied';

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    
    // Default: Denied until explicit action
    const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(true);
    const [adsConsent, setAdsConsent] = useState<boolean>(true);

    const updateGtmConsent = (analytics: ConsentState, ads: ConsentState) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'analytics_storage': analytics,
                'ad_storage': ads,
                'ad_user_data': ads,
                'ad_personalization': ads
            });
        }
    };

    useEffect(() => {
        const savedConsent = localStorage.getItem('cookie-consent');
        if (!savedConsent) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowBanner(true);
            // Set default denied in GTM if not already set (usually handled in layout script)
            updateGtmConsent('denied', 'denied');
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', 'all');
        updateGtmConsent('granted', 'granted');
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        localStorage.setItem('cookie-consent', 'necessary');
        updateGtmConsent('denied', 'denied');
        setShowBanner(false);
    };

    const handleSaveSettings = () => {
        localStorage.setItem('cookie-consent', 'custom');
        updateGtmConsent(
            analyticsConsent ? 'granted' : 'denied',
            adsConsent ? 'granted' : 'denied'
        );
        setShowBanner(false);
    };

    if (!showBanner) return null;

    if (settingsOpen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold mb-4">Cookie Preferences</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div>
                                <p className="font-semibold">Necessary</p>
                                <p className="text-sm text-slate-500">Required for the site to work.</p>
                            </div>
                            <input type="checkbox" checked disabled className="w-5 h-5 text-indigo-600 rounded bg-slate-200" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                             <div>
                                <p className="font-semibold">Analytics</p>
                                <p className="text-sm text-slate-500">Help us improve with usage data.</p>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={analyticsConsent} 
                                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                                className="w-5 h-5 text-indigo-600 rounded border-slate-300" 
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                             <div>
                                <p className="font-semibold">Advertising</p>
                                <p className="text-sm text-slate-500">Personalized ads support us.</p>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={adsConsent} 
                                onChange={(e) => setAdsConsent(e.target.checked)}
                                className="w-5 h-5 text-indigo-600 rounded border-slate-300" 
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button onClick={() => setSettingsOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Back</button>
                        <button onClick={handleSaveSettings} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Preferences</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                        <Link href="/cookie-policy" className="text-indigo-600 underline ml-1">Read Policy</Link>
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                    <button onClick={() => setSettingsOpen(true)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        Customize
                    </button>
                    <button onClick={handleRejectAll} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        Reject All
                    </button>
                    <button onClick={handleAcceptAll} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-transform active:scale-95">
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
