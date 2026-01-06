"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { CRON_Presets, describeCron } from "@/lib/cron-utils";
import { Clock, Copy, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function CronGeneratorClient() {
  const theme = flowerThemes.morningGlory;
  const [cronString, setCronString] = useState("* * * * *");
  const [humanDesc, setHumanDesc] = useState("Every minute");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHumanDesc(describeCron(cronString));
  }, [cronString]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cronString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FlowerBackground theme={theme} badgeText="Cron Tool">
      <SchemaMarkup
        name="Cron Job Generator"
        description="Free online Cron expression generator. Visual builder for cron jobs with human-readable explanations and quick presets."
        url="https://www.countcharacters.org/cron-job-generator"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="Cron Job Generator"
          theme={theme}
        />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">

          <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
             Generate standard crontab expressions for Linux/Unix scheduling.
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-8 mb-8">
            
            {/* Display & Output */}
            <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative w-full max-w-2xl">
                    <input
                        type="text"
                        value={cronString}
                        onChange={(e) => setCronString(e.target.value)}
                        className="w-full text-center text-4xl md:text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-6 px-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none tracking-widest"
                    />
                    <button 
                        onClick={handleCopy}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <span className="text-green-500 text-sm font-bold">Copied</span> : <Copy size={24} />}
                    </button>
                </div>
                
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-lg bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                    <Info size={20} />
                    <span>{humanDesc}</span>
                </div>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {CRON_Presets.map((preset) => (
                    <button
                        key={preset.name}
                        onClick={() => setCronString(preset.value)}
                        className="text-sm px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors text-left"
                    >
                        {preset.name}
                    </button>
                ))}
            </div>

            <GoogleAdsense 
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                layout="in-article"
            />
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">How to check your jobs?</h2>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono inline-block text-left text-sm md:text-base">
                <p># List all cron jobs</p>
                <p className="text-green-400">crontab -l</p>
                <br />
                <p># Edit cron jobs</p>
                <p className="text-green-400">crontab -e</p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="w-full max-w-[1920px] mx-auto pb-16 mt-16">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 w-full">
              {[
                { q: "What is Cron?", a: "Cron is a time-based job scheduler in Unix-like computer operating systems. Users can schedule jobs (commands or scripts) to run periodically at fixed times, dates, or intervals." },
                { q: "How do I use the generated expression?", a: "Copy the expression (e.g., '*/5 * * * *') and paste it into your crontab file. You can edit your crontab by running 'crontab -e' in your terminal." },
                { q: "What does the * mean?", a: "The asterisk (*) represents 'every'. For example, a * in the minute field means 'every minute'." },
                { q: "Can I use this for non-Linux systems?", a: "The syntax generated here is standard standard Vixie Cron, compatible with most Unix/Linux systems. Some systems (like Quartz or Jenkins) may have slightly different variations." }
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
