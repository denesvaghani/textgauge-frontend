"use client";

import { useEffect } from "react";

interface GoogleAdsenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  layout?: string;
  style?: React.CSSProperties;
}

export function GoogleAdsense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  layout,
  style = { display: "block" },
}: GoogleAdsenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is added by the script tag
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // Ads are temporarily disabled to improve UI/UX
  return null;
}
