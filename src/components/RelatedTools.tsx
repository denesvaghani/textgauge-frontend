import Link from 'next/link';
import Image from 'next/image';
import { getRelatedTools } from '@/config/toolRegistry';

export function RelatedTools({ currentPath }: { currentPath: string }) {
  // Get related tools from the central registry
  const suggestions = getRelatedTools(currentPath, 3);

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
