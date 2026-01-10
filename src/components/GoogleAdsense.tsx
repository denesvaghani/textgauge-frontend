"use client";

import { useEffect } from "react";

interface GoogleAdsenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  layout?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function GoogleAdsense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  layout,
  style = { display: "block" },
  className = "",
}: GoogleAdsenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is added by the script tag
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
      data-ad-layout={layout}
    />
  );
}
