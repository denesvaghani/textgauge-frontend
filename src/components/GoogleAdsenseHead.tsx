"use client";

import { useEffect } from "react";

export function GoogleAdsenseHead() {
  useEffect(() => {
    const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
    if (!client) return;

    // avoid inserting twice
    if (document.querySelector('script[data-adsbygoogle-head="true"]')) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-adsbygoogle-head", "true");

    document.head.appendChild(script);

    return () => {
      // leave script in place, no cleanup needed
    };
  }, []);

  return null;
}
