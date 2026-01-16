import { CompressionSettings, ImageFormat } from "@/lib/image-compressor/compressionService";
import { Globe, Mail, Printer, FileDown, Zap } from "lucide-react";

// Predefined compression presets
const PRESETS = [
  { 
    id: "web", 
    label: "Web", 
    icon: Globe, 
    settings: { maxSizeMB: 0.5, maxWidthOrHeight: 1920, initialQuality: 0.8, fileType: "image/webp" as ImageFormat },
    description: "Optimized for websites"
  },
  { 
    id: "email", 
    label: "Email", 
    icon: Mail, 
    settings: { maxSizeMB: 0.3, maxWidthOrHeight: 1200, initialQuality: 0.75, fileType: "image/jpeg" as ImageFormat },
    description: "Small enough for email"
  },
  { 
    id: "print", 
    label: "Print", 
    icon: Printer, 
    settings: { maxSizeMB: 5, maxWidthOrHeight: 4000, initialQuality: 0.95, fileType: undefined },
    description: "High quality for printing"
  },
  { 
    id: "100kb", 
    label: "≤100KB", 
    icon: FileDown, 
    settings: { maxSizeMB: 0.1, maxWidthOrHeight: 1200, initialQuality: 0.6, fileType: "image/webp" as ImageFormat },
    description: "Under 100KB guaranteed"
  },
  { 
    id: "50kb", 
    label: "≤50KB", 
    icon: Zap, 
    settings: { maxSizeMB: 0.05, maxWidthOrHeight: 800, initialQuality: 0.5, fileType: "image/webp" as ImageFormat },
    description: "Ultra-compressed"
  },
];

// Persona-based presets for different user types
import { Code, Palette, Megaphone } from "lucide-react";

const PERSONA_PRESETS = [
  {
    id: "developer",
    label: "Developer",
    icon: Code,
    color: "blue",
    settings: { maxSizeMB: 0.5, maxWidthOrHeight: 1920, initialQuality: 0.8, fileType: "image/webp" as ImageFormat },
    description: "WebP @ 80% quality, max 500KB - Perfect for web apps, APIs, and build pipelines"
  },
  {
    id: "designer", 
    label: "Designer",
    icon: Palette,
    color: "purple",
    settings: { maxSizeMB: 5, maxWidthOrHeight: 4000, initialQuality: 0.95, fileType: "image/png" as ImageFormat },
    description: "PNG @ 95% quality, up to 5MB - High-fidelity exports for portfolios and clients"
  },
  {
    id: "marketer",
    label: "Marketer",
    icon: Megaphone,
    color: "orange",
    settings: { maxSizeMB: 0.2, maxWidthOrHeight: 1200, initialQuality: 0.75, fileType: "image/jpeg" as ImageFormat },
    description: "JPG @ 75% quality, max 200KB - Optimized for email campaigns and social media"
  },
];

interface CompressionControlsProps {
  settings: CompressionSettings;
  onSettingsChange: (newSettings: Partial<CompressionSettings>) => void;
  disabled: boolean;
}

export function CompressionControls({ settings, onSettingsChange, disabled }: CompressionControlsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
        Compression Settings
      </h3>

      {/* Persona-Based Presets - Our USP */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          I am a...
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">NEW</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PERSONA_PRESETS.map((persona) => (
            <button
              key={persona.id}
              onClick={() => onSettingsChange(persona.settings)}
              disabled={disabled}
              title={persona.description}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-[1.02] disabled:opacity-50 ${
                persona.color === "blue" 
                  ? "border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : persona.color === "purple"
                  ? "border-purple-200 dark:border-purple-800 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "border-orange-200 dark:border-orange-800 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400"
              }`}
            >
              <persona.icon size={20} />
              <span className="text-xs font-bold">{persona.label}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 text-center">Click a persona to auto-configure optimal settings</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">or customize</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Quick Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSettingsChange(preset.settings)}
              disabled={disabled}
              title={preset.description}
              className="flex flex-col items-center gap-1 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
            >
              <preset.icon size={18} />
              <span className="text-xs font-medium">{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quality Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Image Quality
          </label>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
            {Math.round(settings.initialQuality * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={settings.initialQuality}
          onChange={(e) => onSettingsChange({ initialQuality: parseFloat(e.target.value) })}
          disabled={disabled}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>Smaller Size</span>
          <span>Better Quality</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Max Size */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
             Max Size (MB)
           </label>
           <input 
             type="number"
             value={settings.maxSizeMB} 
             onChange={(e) => onSettingsChange({ maxSizeMB: parseFloat(e.target.value) })}
             disabled={disabled}
             min="0.1"
             step="0.1"
             className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
           />
        </div>
        
        {/* Max Dimension */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
             Max Dimension (px)
           </label>
           <input 
             type="number"
             value={settings.maxWidthOrHeight || ""}
             placeholder="Auto"
             onChange={(e) => onSettingsChange({ maxWidthOrHeight: e.target.value ? parseInt(e.target.value) : undefined })}
             disabled={disabled}
             className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
           />
        </div>
      </div>

      {/* Format Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
           Output Format
        </label>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
           {[
             { label: "Original", value: undefined }, 
             { label: "JPG", value: "image/jpeg" }, 
             { label: "PNG", value: "image/png" }, 
             { label: "WebP", value: "image/webp" }
           ].map((opt) => (
             <button
                key={opt.label}
                onClick={() => onSettingsChange({ fileType: opt.value as ImageFormat | undefined })}
                disabled={disabled}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                   settings.fileType === opt.value
                     ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                     : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
             >
               {opt.label}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}
