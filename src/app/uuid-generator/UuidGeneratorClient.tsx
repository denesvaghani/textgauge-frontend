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
  const theme = flowerThemes.dahlia;
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

        <main className="flex-grow w-full">
          
          <div className="container mx-auto px-4 pt-8 pb-0 max-w-5xl">
            <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
               Generate random version 4 UUIDs (Universally Unique Identifier) in bulk.
            </div>

            {/* Controls */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-4">
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

            <div className="my-2">
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
                  className="w-full h-96 p-6 font-mono tracking-wider text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Educational Content */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white/50 dark:bg-slate-900/50">
            <div className="max-w-5xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why use a UUID Generator?</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  A <strong>UUID (Universally Unique Identifier)</strong> is essential when you need to identify information without a central coordination system. 
                  Unlike auto-incrementing database IDs (1, 2, 3...), UUIDs are unique across all space and time. This makes them perfect for:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                  <li><strong>Distributed Systems:</strong> Generate IDs on different servers without collision.</li>
                  <li><strong>Database Keys:</strong> Merge records from multiple databases securely.</li>
                  <li><strong>Security:</strong> Hide the total number of records (unlike ID #500 implies 500 records).</li>
                  <li><strong>Offline Generation:</strong> Create IDs in mobile apps before syncing to a server.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding UUID Version 4</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our tool generates <strong>Version 4 UUIDs</strong>. These are completely random, using 122 random bits. 
                  The chance of a collision (two same UUIDs) is so small it's effectively impossible—you would need to generate 
                  billions of UUIDs per second for years to even have a 50% chance of a single duplicate.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 w-full">
              {[
                { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit label used for information in computer systems. It creates a unique ID without a central coordination." },
                { q: "Are these UUIDs unique?", a: "Yes. We generate standard Version 4 UUIDs using a cryptographically strong random number generator. The probability of collision is astronomically low." },
                { q: "Is it free to use?", a: "Yes, you can generate up to 5,000 UUIDs at a time for free. There are no limits on daily usage." },
                { q: "Do you store my UUIDs?", a: "No. All generation happens locally in your browser. We never see or store the IDs you generate." }
              ].map((faq, i) => (
                <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                  <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    {faq.q}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 bg-white/50 dark:bg-slate-900/50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

        </main>
      </div>
    </FlowerBackground>
  );
}
