"use client";

import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export function TrustPanel() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Privacy Promise
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your content never leaves your browser. All processing happens locally on your device using JavaScript. We do not store, record, or transmit your input data to any server.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
             <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <Lock className="w-4 h-4 text-indigo-500" />
                <span>Client-Side Processing</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <EyeOff className="w-4 h-4 text-indigo-500" />
                <span>No Server Logs</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
