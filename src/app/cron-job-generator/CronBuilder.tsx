"use client";

import { useState } from "react";
import { CRON_Presets, CRON_OPTS } from "@/lib/cron-utils";

interface CronBuilderProps {
  cronExpression: string;
  onChange: (newCron: string) => void;
  // We pass the current split fields so we can highlight active tabs correctly
  fields: {
    minute: string;
    hour: string;
    dayMonth: string;
    month: string;
    dayWeek: string;
  };
}

type TabKey = keyof typeof CRON_OPTS;

export function CronBuilder({ cronExpression, onChange, fields }: CronBuilderProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("minute");

  const updateField = (field: TabKey, value: string) => {
    // Reconstruct the cron string with the new value
    // Current breakdown:
    const parts = {
     minute: fields.minute,
     hour: fields.hour,
     dayMonth: fields.dayMonth,
     month: fields.month,
     dayWeek: fields.dayWeek,
    };

    // Update specific part
    parts[field] = value;

    // Join back
    onChange(`${parts.minute} ${parts.hour} ${parts.dayMonth} ${parts.month} ${parts.dayWeek}`);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "minute", label: "Minutes" },
    { key: "hour", label: "Hours" },
    { key: "dayMonth", label: "Day" },
    { key: "month", label: "Month" },
    { key: "dayWeek", label: "Week" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* LEFT: Quick Builder */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Tab Header */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-[80px] py-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab.key
                  ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content: Radio Options */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CRON_OPTS[activeTab].map((opt) => {
              const isActive = fields[activeTab] === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`cron-${activeTab}`}
                    value={opt.value}
                    checked={isActive}
                    onChange={() => updateField(activeTab, opt.value)}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              );
            })}
          </div>
          
           {/* Fallback msg for custom values */}
           {!CRON_OPTS[activeTab].some(o => o.value === fields[activeTab]) && (
             <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-500 text-center border border-dashed border-slate-300 dark:border-slate-700">
               Current value <code>{fields[activeTab]}</code> is custom. Select a preset above to override.
             </div>
           )}
        </div>
      </div>

      {/* RIGHT: Common Expressions List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full max-h-[400px]">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
           <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide">
             Quick Templates
           </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
           {CRON_Presets.map((preset) => (
             <button
                key={preset.name}
                onClick={() => onChange(preset.value)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-all group ${
                  cronExpression === preset.value
                   ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
             >
               <div className="flex justify-between items-center mb-1">
                 <span>{preset.name}</span>
                 {cronExpression === preset.value && (
                   <span className="w-2 h-2 rounded-full bg-blue-500" />
                 )}
               </div>
               <code className="text-[10px] bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-slate-500 font-mono group-hover:bg-white dark:group-hover:bg-slate-900 transition-colors">
                  {preset.value}
               </code>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}
