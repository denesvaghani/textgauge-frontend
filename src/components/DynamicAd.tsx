"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleAdsense } from "./GoogleAdsense";

interface DynamicAdProps {
  adSlot: string;
  adFormat?: string;
  layout?: string;
  style?: React.CSSProperties;
  className?: string;
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
  const [adStatus, setAdStatus] = useState<'loading' | 'filled' | 'unfilled'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const insElement = container.querySelector('ins.adsbygoogle');
    
    if (insElement) {
        const initialStatus = insElement.getAttribute("data-ad-status");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (initialStatus === "filled") setAdStatus("filled");
        if (initialStatus === "unfilled") setAdStatus("unfilled");

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

        // Timeout to auto-collapse if no ad loads after 5 seconds
        const timeout = setTimeout(() => {
          if (adStatus === 'loading') {
            setAdStatus('unfilled');
          }
        }, 5000);

        return () => {
          observer.disconnect();
          clearTimeout(timeout);
        };
    }
  }, [adStatus]);

  // Hide completely when unfilled - no visible placeholder
  if (adStatus === 'unfilled') {
    return null;
  }

  return (
    <div 
        ref={containerRef}
        className={`w-full flex justify-center transition-all duration-300 ${className}`}
    >
        <div className={`w-full transition-all duration-300 overflow-hidden ${
          adStatus === 'loading' ? 'min-h-[90px]' : ''
        }`}>
            {adStatus === 'filled' && (
                 <span className="block text-center text-[10px] text-slate-400 uppercase tracking-widest mb-1">
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
