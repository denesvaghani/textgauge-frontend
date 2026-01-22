"use client";

import { useState } from "react";
import { CRON_Presets, CRON_OPTS } from "@/lib/cron-utils";
import { Check, Clock, Calendar, Moon, Sun, Monitor } from "lucide-react";

interface CronBuilderProps {
  cronExpression: string;
  onChange: (newCron: string) => void;
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
    const parts = {
     minute: fields.minute,
     hour: fields.hour,
     dayMonth: fields.dayMonth,
     month: fields.month,
     dayWeek: fields.dayWeek,
    };
    parts[field] = value;
    onChange(`${parts.minute} ${parts.hour} ${parts.dayMonth} ${parts.month} ${parts.dayWeek}`);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "minute", label: "Minutes" },
    { key: "hour", label: "Hours" },
    { key: "dayMonth", label: "Day" },
    { key: "month", label: "Month" },
    { key: "dayWeek", label: "Week" },
  ];

  // Helper to choose an icon for presets
  const getPresetIcon = (name: string) => {
      const lower = name.toLowerCase();
      if (lower.includes("midnight")) return <Moon size={16} className="text-indigo-500" />;
      if (lower.includes("7am") || lower.includes("morning")) return <Sun size={16} className="text-amber-500" />;
      if (lower.includes("month") || lower.includes("week")) return <Calendar size={16} className="text-blue-500" />;
      if (lower.includes("minute") || lower.includes("hour")) return <Clock size={16} className="text-emerald-500" />;
      return <Monitor size={16} className="text-slate-400" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
      {/* LEFT: Quick Builder (8 Cols) */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Modern Tab Header */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-x-auto scrollbar-hide px-2 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 min-w-[100px] py-4 text-sm font-bold transition-all outline-none rounded-t-xl group ${
                activeTab === tab.key
                  ? "text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-800/80"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content: Modern Selectable Cards */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/20 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CRON_OPTS[activeTab].map((opt) => {
              const isActive = fields[activeTab] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => updateField(activeTab, opt.value)}
                  className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-200 outline-none group hover:scale-[1.01] active:scale-[0.99] ${
                    isActive
                      ? "bg-white dark:bg-slate-800 border-blue-500 shadow-md shadow-blue-500/10 z-10"
                      : "bg-white dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex w-full justify-between items-start mb-1">
                      <span className={`font-bold text-sm ${isActive ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-200"}`}>
                        {opt.label.split("(")[0].trim()}
                      </span>
                      {isActive && <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3} /></div>}
                  </div>
                  <code className={`text-[11px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                      isActive 
                        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                  }`}>
                      {opt.value}
                  </code>
                </button>
              );
            })}
          </div>
          
           {/* Fallback msg for custom values */}
           {!CRON_OPTS[activeTab].some(o => o.value === fields[activeTab]) && (
             <div className="mt-6 flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-800/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
               <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
               Current value <code>{fields[activeTab]}</code> is custom. Select a preset above to override.
             </div>
           )}
        </div>
      </div>

      {/* RIGHT: Modern Templates List (4 Cols) */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 flex flex-col h-full max-h-[500px]">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
             <span className="w-1 h-4 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></span>
             Quick Templates
           </h3>
           <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
               Popular
           </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
           {CRON_Presets.map((preset) => {
             const isSelected = cronExpression === preset.value;
             return (
                <button
                    key={preset.name}
                    onClick={() => onChange(preset.value)}
                    className={`w-full group relative flex items-center gap-4 p-3 pr-4 rounded-xl transition-all duration-200 border decoration-0 ${
                    isSelected
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
                        : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected 
                        ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm"
                }`}>
                    {getPresetIcon(preset.name)}
                </div>
                
                <div className="flex-1 text-left min-w-0">
                    <div className={`font-semibold text-sm truncate mb-0.5 transition-colors ${isSelected ? "text-blue-900 dark:text-blue-100" : "text-slate-700 dark:text-slate-200"}`}>
                        {preset.name}
                    </div>
                    <code className={`text-[10px] px-1.5 py-0.5 rounded font-mono transition-colors ${
                        isSelected 
                            ? "bg-blue-200/50 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200" 
                            : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-black/20"
                    }`}>
                        {preset.value}
                    </code>
                </div>
                
                {isSelected && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                )}
                </button>
             );
           })}
        </div>
      </div>
    </div>
  );
}
