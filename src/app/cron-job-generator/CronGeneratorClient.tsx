"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { describeCron } from "@/lib/cron-utils";
import { TrustPanel } from "@/components/TrustPanel";
import { RelatedTools } from "@/components/RelatedTools";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { CronBuilder } from "./CronBuilder";


export default function CronGeneratorClient() {
  const theme = flowerThemes.morningGlory;
  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState({
    minute: "*",
    hour: "*",
    dayMonth: "*",
    month: "*",
    dayWeek: "*",
  });

  useEffect(() => {
    // Generate description
    setDescription(describeCron(cronExpression));
  }, [cronExpression]);

  const updateAll = (newCron: string) => {
    setCronExpression(newCron);
    const parts = newCron.split(" ");
    if (parts.length === 5) {
        setFields({
            minute: parts[0],
            hour: parts[1],
            dayMonth: parts[2],
            month: parts[3],
            dayWeek: parts[4],
        });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cronExpression);
  };

  return (
    <FlowerBackground theme={theme} badgeText="Cron Tool">
       <SchemaMarkup
        name="Cron Job Generator"
        description="Free online Cron expression generator and text describer. Create, test, and understand cron schedules easily."
        url="https://www.countcharacters.org/cron-job-generator"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="Cron Generator"
          theme={theme}
        />

        <main className="flex-grow w-full">
            <div className="container mx-auto px-4 pt-8 pb-0 max-w-[1920px]">
                <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
                    Create and understand cron schedules for your scripts and jobs.
                </div>

                {/* Display & Copy */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 mb-8 text-center transition-all hover:shadow-xl sticky top-4 z-10">
                    <div className="text-4xl md:text-5xl font-mono font-bold text-slate-800 dark:text-white mb-4 tracking-wider">
                    {cronExpression}
                    </div>
                    <div className={`text-lg font-medium mb-6 h-8 ${
                        description.toLowerCase().startsWith('invalid') 
                            ? 'text-red-500 dark:text-red-400 font-bold' 
                            : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                    {description}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all active:scale-95 shadow-md shadow-blue-500/20"
                    >
                    <Copy size={18} />
                    Copy Expression
                    </button>
                </div>

                {/* NEW: Tabbed Builder */}
                <CronBuilder 
                   cronExpression={cronExpression} 
                   onChange={updateAll}
                   fields={fields}
                />

                <div className="mt-8 mb-0">
                    <DynamicAd 
                        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                        layout="in-article"
                        style={{ display: 'block', width: '100%', maxWidth: '100%' }}
                    />
                </div>
            </div>

            {/* Educational Content */}
           <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
            <div className="max-w-[1920px] mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding Cron Expressions</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  A cron expression is a string of 5 characters separated by spaces that represents a schedule. 
                  It is the standard way to schedule recurring tasks on Unix/Linux servers.
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
                    <p className="whitespace-pre text-slate-700 dark:text-slate-300">
{`*    *    *    *    *
|    |    |    |    |
|    |    |    |    +---- Day of Week (0-6) (Sun=0)
|    |    |    +--------- Month (1-12)
|    |    +-------------- Day of Month (1-31)
|    +------------------- Hour (0-23)
+------------------------ Minute (0-59)`}
                    </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Common Cron Use Cases</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                  <li><strong>Database Backups:</strong> Run a dump script every night at 2 AM (<code>0 2 * * *</code>).</li>
                  <li><strong>Email Newsletters:</strong> Send weekly updates every Monday morning at 9 AM (<code>0 9 * * 1</code>).</li>
                  <li><strong>Log Rotation:</strong> Clear old logs every 1st of the month (<code>0 0 1 * *</code>).</li>
                  <li><strong>Status Checks:</strong> Ping a server every 5 minutes to check uptime (<code>*/5 * * * *</code>).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Trust Panel (Item 6) */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
             <TrustPanel />
          </section>

          {/* FAQ Section */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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

          {/* Related Tools */}
          <RelatedTools currentPath="/cron-job-generator" />

        </main>
      </div>
    </FlowerBackground>
  );
}

