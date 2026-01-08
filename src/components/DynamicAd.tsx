"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleAdsense } from "./GoogleAdsense";

interface DynamicAdProps {
  adSlot: string;
  adFormat?: string;
  layout?: string;
  style?: React.CSSProperties;
  className?: string; // Additional classes for the visible state
  fullWidthResponsive?: boolean;
}

export function DynamicAd({ 
  adSlot, 
  adFormat = "auto", 
  layout, 
  style, 
  className = "",
  fullWidthResponsive = true 
}: DynamicAdProps) {
  const [isFilled, setIsFilled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we're strictly in development and want to simulate a filled ad for testing:
    // setIsFilled(true); // Uncomment to test styling locally if ads don't load

    const container = containerRef.current;
    if (!container) return;

    // Find the 'ins' tag injected by GoogleAdsense
    const insElement = container.querySelector('ins.adsbygoogle');
    
    if (insElement) {
        // Observer to watch for data-ad-status attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
                    const status = insElement.getAttribute("data-ad-status");
                    if (status === "filled") {
                        setIsFilled(true);
                    } else if (status === "unfilled") {
                        setIsFilled(false);
                    }
                }
            });
        });

        observer.observe(insElement, { attributes: true });

        // Check initial state in case we missed the mutation
        if (insElement.getAttribute("data-ad-status") === "filled") {
            setIsFilled(true);
        }

        return () => observer.disconnect();
    }
  }, []);

  return (
    <div 
        ref={containerRef}
        className={`w-full flex justify-center transition-all duration-300 ${
            isFilled 
                ? `opacity-100 mb-8 pt-4 pb-4 ${className}` 
                : "opacity-0 h-0 overflow-hidden m-0 p-0"
        }`}
    >
        <div className={`w-full transition-all duration-300 ${
            isFilled 
                ? "bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 relative"
                : "h-0 w-0 border-0"
        }`}>
            {/* Label for transparency */}
            {isFilled && (
                 <span className="absolute top-0 right-2 text-[10px] text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-b-md">
                    Advertisement
                 </span>
            )}
            
            <GoogleAdsense
                adSlot={adSlot}
                adFormat={adFormat}
                layout={layout}
                fullWidthResponsive={fullWidthResponsive}
                style={style || { display: 'block', textAlign: 'center', width: '100%' }}
            />
        </div>
    </div>
  );
}
