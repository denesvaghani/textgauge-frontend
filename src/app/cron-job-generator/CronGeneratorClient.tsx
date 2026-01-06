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
            <div className="container mx-auto px-4 pt-8 pb-0 max-w-5xl">
                <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
                    Create and understand cron schedules for your scripts and jobs.
                </div>

                {/* Display & Copy */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 mb-8 text-center transition-all hover:shadow-xl">
                    <div className="text-4xl md:text-5xl font-mono font-bold text-slate-800 dark:text-white mb-4 tracking-wider">
                    {cronExpression}
                    </div>
                    <div className="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-6 h-8">
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
                    {['minute', 'hour', 'dayMonth', 'month', 'dayWeek'].map((field) => (
                    <div key={field} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                        type="text"
                        value={fields[field as keyof typeof fields]}
                        onChange={(e) => updateField(field as keyof typeof fields, e.target.value)}
                        className="w-full text-center font-mono text-lg bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none py-1 transition-colors text-slate-900 dark:text-white"
                        />
                        <div className="mt-2 text-[10px] text-slate-400">
                        {field === 'minute' && '0-59'}
                        {field === 'hour' && '0-23'}
                        {field === 'dayMonth' && '1-31'}
                        {field === 'month' && '1-12'}
                        {field === 'dayWeek' && '0-6'}
                        </div>
                    </div>
                    ))}
                </div>

                <div className="mt-4 mb-2">
                    <GoogleAdsense 
                        adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                        layout="in-article"
                        style={{ display: 'block', width: '100%', maxWidth: '100%' }}
                    />
                </div>
            </div>

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

        </main>
      </div>
    </FlowerBackground>
  );
}
