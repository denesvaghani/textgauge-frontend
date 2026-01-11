import Link from 'next/link';
import Image from 'next/image';
import { flowerThemes } from '@/config/flowerThemes';

// Shared tool definition (can be imported from a central config later if desired)
const SITE_TOOLS = [
  // Formatters
  { href: "/json-formatter", title: "JSON Formatter", category: "Formatters", theme: flowerThemes.cherryBlossom },
  { href: "/yaml-formatter", title: "YAML Formatter", category: "Formatters", theme: flowerThemes.whiteLily },
  { href: "/toml-formatter", title: "TOML Formatter", category: "Formatters", theme: flowerThemes.frangipani },
  // Converters
  { href: "/json-to-csv-converter", title: "JSON to CSV", category: "Converters", theme: flowerThemes.sunflower },
  { href: "/json-to-toon-converter", title: "JSON to TOON", category: "Converters", theme: flowerThemes.lavender },
  // Design
  { href: "/palette-forge", title: "PaletteForge", category: "Design", theme: flowerThemes.orchid },
  // Media
  { href: "/image-compressor", title: "Image Compressor", category: "Media", theme: flowerThemes.hydrangea },
  // Comparison
  { href: "/diff-checker", title: "Diff Checker", category: "Utilities", theme: flowerThemes.redRose },
  // Generators
  { href: "/uuid-generator", title: "UUID Generator", category: "Generators", theme: flowerThemes.dahlia },
  { href: "/cron-job-generator", title: "Cron Generator", category: "Generators", theme: flowerThemes.morningGlory },
  { href: "/base64-encoder", title: "Base64 Tool", category: "Generators", theme: flowerThemes.blueIris },
  { href: "/url-encoder", title: "URL Encoder", category: "Generators", theme: flowerThemes.jasmine },
];

export function RelatedTools({ currentPath }: { currentPath: string }) {
  // Filter out current tool
  const otherTools = SITE_TOOLS.filter(t => t.href !== currentPath);
  
  // Simple suggestion logic: 
  // 1. Same category first
  // 2. Then "Generators" or "Formatters" as fallback
  const currentTool = SITE_TOOLS.find(t => t.href === currentPath);
  const category = currentTool?.category || "Utilities";

  const suggestions = otherTools
    .sort((a, b) => {
        // Prioritize same category
        if (a.category === category && b.category !== category) return -1;
        if (a.category !== category && b.category === category) return 1;
        return 0;
    })
    .slice(0, 3); // Take top 3

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
        More Developer Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700">
              <Image 
                src={tool.theme.image} 
                alt={tool.title} 
                width={48} 
                height={48}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {tool.category} Tool
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
