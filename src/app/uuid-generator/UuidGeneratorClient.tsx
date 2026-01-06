"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { generateUuidV4 } from "@/lib/uuid-utils";
import { Copy, Download, RefreshCw, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UuidGeneratorClient() {
  const theme = flowerThemes.morningGlory;
  const [count, setCount] = useState(10);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleGenerate();
  }, []); // Initial load

  const handleGenerate = () => {
    const uuids = generateUuidV4({
      count,
      hyphens,
      uppercase,
      version: 'v4',
    });
    setGeneratedUuids(uuids);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedUuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedUuids.join('\n')], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${generatedUuids.length}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <FlowerBackground theme={theme} badgeText="UUID Tool">
      <SchemaMarkup
        name="UUID Generator"
        description="Free online fast bulk UUID v4 generator. Generate up to 10,000 UUIDs instantly with options for hyphens and uppercase."
        url="https://www.countcharacters.org/uuid-generator"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="UUID Generator"
          theme={theme}
        />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          
          <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
             Generate random version 4 UUIDs (Universally Unique Identifier) in bulk.
          </div>

          {/* Controls */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-center gap-6 justify-between">
              
              <div className="flex flex-col gap-2 min-w-[200px] flex-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Quantity</span>
                  <span className="text-blue-600 font-bold">{count}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5000"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={hyphens}
                    onChange={(e) => setHyphens(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Hyphens</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Uppercase</span>
                </label>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                 <button
                  onClick={handleGenerate}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all active:scale-95 shadow-md shadow-blue-500/20"
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <GoogleAdsense 
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                layout="in-article"
            />
          </div>

          {/* Output Area */}
          <div className="relative">
             <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                    {copied ? <span className="text-green-500 font-bold">Copied!</span> : <><Copy size={16} /> Copy</>}
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                    title="Download as .txt"
                >
                    <Download size={16} />
                </button>
             </div>

            <textarea
                value={generatedUuids.join('\n')}
                readOnly
                className="w-full h-[500px] p-6 font-mono text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

        </main>
      </div>
    </FlowerBackground>
  );
}
