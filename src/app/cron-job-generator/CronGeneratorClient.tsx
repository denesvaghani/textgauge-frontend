"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { CRON_Presets, describeCron, isValidPart } from "@/lib/cron-utils";
import { TrustPanel } from "@/components/TrustPanel";
import { RelatedTools } from "@/components/RelatedTools";
import { Clock, Copy, Info } from "lucide-react";
import { useEffect, useState } from "react";

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

  const updateField = (field: keyof typeof fields, value: string) => {
    const newFields = { ...fields, [field]: value };
    setFields(newFields);
    setCronExpression(
      `${newFields.minute} ${newFields.hour} ${newFields.dayMonth} ${newFields.month} ${newFields.dayWeek}`
    );
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
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 mb-8 text-center transition-all hover:shadow-xl">
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

                {/* Field Editors */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    {['minute', 'hour', 'dayMonth', 'month', 'dayWeek'].map((field) => {
                        // Validation Logic
                        const val = fields[field as keyof typeof fields];
                        let isValid = true;
                        if (field === 'minute') isValid = isValidPart(val, 0, 59);
                        if (field === 'hour') isValid = isValidPart(val, 0, 23);
                        if (field === 'dayMonth') isValid = isValidPart(val, 1, 31);
                        if (field === 'month') isValid = isValidPart(val, 1, 12);
                        if (field === 'dayWeek') isValid = isValidPart(val, 0, 6);

                        return (
                        <div key={field} className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border ${isValid ? 'border-slate-200 dark:border-slate-800' : 'border-red-500 dark:border-red-500'} flex flex-col items-center transition-colors`}>
                            <label className={`block text-xs font-bold uppercase mb-2 ${isValid ? 'text-slate-500 dark:text-slate-400' : 'text-red-500'}`}>
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={fields[field as keyof typeof fields]}
                                    onChange={(e) => {
                                        let newVal = e.target.value;
                                        // Smart Input: If current val is "*" and user types a number, clear the "*"
                                        // Exception: If user types "/" (for steps), keep it.
                                        if (fields[field as keyof typeof fields] === "*" && /^\d$/.test(newVal.slice(-1)) && newVal.length > 1) {
                                            newVal = newVal.slice(-1);
                                        }
                                        updateField(field as keyof typeof fields, newVal);
                                    }}
                                    onBlur={() => {
                                        // Auto-Fill: If empty, revert to "*"
                                        if (fields[field as keyof typeof fields].trim() === "") {
                                            updateField(field as keyof typeof fields, "*");
                                        }
                                    }}
                                    className={`w-full text-center font-mono text-lg bg-transparent border-b-2 ${isValid ? 'border-slate-200 dark:border-slate-700 focus:border-blue-500' : 'border-red-500 focus:border-red-500'} outline-none py-1 transition-colors text-slate-900 dark:text-white pr-8`}
                                />
                                {/* Inline Range Indicator */}
                                <span className={`absolute right-0 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none select-none ${isValid ? 'text-slate-400' : 'text-red-400'}`}>
                                    {field === 'minute' && '0-59'}
                                    {field === 'hour' && '0-23'}
                                    {field === 'dayMonth' && '1-31'}
                                    {field === 'month' && '1-12'}
                                    {field === 'dayWeek' && '0-6'}
                                </span>
                            </div>
                        </div>
                        );
                    })}
                </div>

                <div className="mt-2 mb-0">
                    <DynamicAd 
                        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                        layout="in-article"
                        style={{ display: 'block', width: '100%', maxWidth: '100%' }}
                    />
                </div>
            </div>

            {/* Quick Reference / Cheat Sheet */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <h2 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-6">
                    Quick Reference / Cheat Sheet
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CRON_Presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => {
                                setCronExpression(preset.value);
                                // Also update fields to match
                                const parts = preset.value.split(" ");
                                setFields({
                                    minute: parts[0],
                                    hour: parts[1],
                                    dayMonth: parts[2],
                                    month: parts[3],
                                    dayWeek: parts[4]
                                });
                            }}
                            className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all text-left group"
                        >
                            <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {preset.name}
                            </div>
                            <code className="text-xs bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-500 font-mono">
                                {preset.value}
                            </code>
                        </button>
                    ))}
                </div>
            </section>

           {/* Educational Content */}
           <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 bg-white/50 dark:bg-slate-900/50">
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
