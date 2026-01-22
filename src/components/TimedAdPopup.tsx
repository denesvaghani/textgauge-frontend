"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { DynamicAd } from "./DynamicAd";

// Timings in milliseconds: 1 min, 5 min, 10 min
const AD_TIMINGS = [60 * 1000, 5 * 60 * 1000, 10 * 60 * 1000];

export function TimedAdPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [seenCounts, setSeenCounts] = useState(0); 
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        
        // Don't run if no ad slot is configured
        if (!process.env.NEXT_PUBLIC_AD_SLOT_POPUP) return;

        const timers: NodeJS.Timeout[] = [];

        AD_TIMINGS.forEach((timing, index) => {
            // Only schedule if we haven't shown this interval's ad yet
            // (Simple session logic: refresh resets timers, which is standard for web)
            const timer = setTimeout(() => {
                if (isMounted.current) {
                    setIsOpen(true);
                    setSeenCounts(prev => prev + 1);
                }
            }, timing);
            timers.push(timer);
        });

        return () => {
            isMounted.current = false;
            timers.forEach(clearTimeout);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
                
                {/* Close Button */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-3 -right-3 p-2 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-200 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 transition-transform hover:scale-110 active:scale-95"
                    aria-label="Close ad"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>

                {/* Ad Label */}
                <div className="text-center mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Advertisement</span>
                </div>

                {/* Ad Container */}
                <div className="flex justify-center min-h-[250px] bg-slate-50 dark:bg-slate-950 rounded-lg overflow-hidden">
                     <DynamicAd
                        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_POPUP || ""}
                        adFormat="rectangle"
                        style={{ display: 'block', width: '336px', height: '280px' }} // Large Rectangle size
                    />
                </div>

                {/* Action / Dismiss */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        Continue to site
                    </button>
                </div>
            </div>
        </div>
    );
}
