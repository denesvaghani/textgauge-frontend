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
  /* CLS Fix: Start as 'loading' to reserve space, preventing layout shifts. 
     Only collapse if explicitly 'unfilled'. */
  const [adStatus, setAdStatus] = useState<'loading' | 'filled' | 'unfilled'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we're strictly in development and want to simulate a filled ad for testing:
    // setAdStatus('filled'); 

    const container = containerRef.current;
    if (!container) return;

    // Find the 'ins' tag injected by GoogleAdsense
    const insElement = container.querySelector('ins.adsbygoogle');
    
    if (insElement) {
        // Check initial state
        const initialStatus = insElement.getAttribute("data-ad-status");
        if (initialStatus === "filled") setAdStatus("filled");
        if (initialStatus === "unfilled") setAdStatus("unfilled");

        // Observer to watch for data-ad-status attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
                    const status = insElement.getAttribute("data-ad-status");
                    if (status === "filled") {
                        setAdStatus("filled");
                    } else if (status === "unfilled") {
                        setAdStatus("unfilled");
                    }
                }
            });
        });

        observer.observe(insElement, { attributes: true });

        return () => observer.disconnect();
    }
  }, []);

  // CLS Fix: Always reserve space for the ad, regardless of status.
  // This prevents layout shifts when the ad loads or if it fails to load.
  const shouldShow = true; 
  
  // Reserve height based on layout to minimize CLS
  const minHeightClass = layout === 'in-article' ? 'min-h-[100px]' : 'min-h-[250px]';

  return (
    <div 
        ref={containerRef}
        className={`w-full flex justify-center transition-all duration-300 mb-8 pt-4 pb-4 ${className}`}
    >
        <div className={`w-full transition-all duration-300 bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden ${minHeightClass} border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 relative`}>
            {/* Label for advertisement */}
            {adStatus === 'filled' && (
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
