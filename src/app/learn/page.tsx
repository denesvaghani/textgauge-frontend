'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { BookOpen, Clock, ChevronRight, Search, ArrowRight, Filter, Sparkles, Tag } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LEARN_ARTICLES, type ArticleCategory } from '@/config/learnArticles';

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <BookOpen className={className} />;
  return <Icon className={className} />;
}

// Category colors using Tailwind classes
const categoryColors: Record<ArticleCategory | 'All', { bg: string; text: string; hover: string; border: string }> = {
  'All': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', hover: 'hover:bg-slate-200 dark:hover:bg-slate-700', border: 'border-slate-200 dark:border-slate-700' },
  'Fundamentals': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/40', border: 'border-blue-200 dark:border-blue-800' },
  'Guides': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40', border: 'border-purple-200 dark:border-purple-800' },
  'Tutorials': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', hover: 'hover:bg-emerald-200 dark:hover:bg-emerald-800/40', border: 'border-emerald-200 dark:border-emerald-800' },
  'Comparisons': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', hover: 'hover:bg-amber-200 dark:hover:bg-amber-800/40', border: 'border-amber-200 dark:border-amber-800' },
};

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles logic
  const filteredArticles = useMemo(() => {
    return LEARN_ARTICLES.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredArticle = filteredArticles[0]; // First matching result is featured
  const remainingArticles = filteredArticles.slice(1);

  const categories: (ArticleCategory | 'All')[] = ['All', 'Fundamentals', 'Guides', 'Tutorials', 'Comparisons'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Header & Search */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                     <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
                        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 dark:text-white">Learn</span>
                    </nav>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        Developer Resources
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search guides, tutorials..."
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar: Categories */}
            <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-36 space-y-2">
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Browse by Topic
                </div>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeCategory === category
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm'
                        }`}
                    >
                        <span>{category}</span>
                        {activeCategory === category && <ChevronRight className="w-4 h-4" />}
                    </button>
                ))}

                {/* Quick Stats Widget */}
                <div className="mt-8 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-indigo-600 dark:text-indigo-400">
                             <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            New Content
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        We add new guides weekly. Check back for more tutorials on data formats and optimization.
                    </p>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No articles found</h3>
                        <p className="text-slate-500">Try adjusting your search or category filter.</p>
                         <button 
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Featured Article (Hero Card) */}
                        {featuredArticle && (
                            <Link href={`/learn/${featuredArticle.slug}`} className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                     <DynamicIcon name={featuredArticle.icon} className="w-48 h-48 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                
                                <div className="relative p-8 md:p-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30">
                                            Featured
                                        </span>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${categoryColors[featuredArticle.category].bg} ${categoryColors[featuredArticle.category].text}`}>
                                            {featuredArticle.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 ml-auto">
                                            <Clock className="w-3.5 h-3.5" />
                                            {featuredArticle.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                                        {featuredArticle.title}
                                    </h2>
                                    
                                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl line-clamp-2 leading-relaxed">
                                        {featuredArticle.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold group-hover:gap-3 transition-all">
                                        Read Article
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Recent Articles Grid (Compact) */}
                        {remainingArticles.length > 0 && (
                             <div className="grid md:grid-cols-2 gap-6">
                                {remainingArticles.map(article => (
                                    <Link 
                                        key={article.slug} 
                                        href={`/learn/${article.slug}`}
                                        className="group bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 flex flex-col"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-2.5 rounded-lg ${categoryColors[article.category].bg}`}>
                                                <DynamicIcon name={article.icon} className={`w-6 h-6 ${categoryColors[article.category].text}`} />
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${categoryColors[article.category].bg} ${categoryColors[article.category].text}`}>
                                                {article.category}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                            {article.title.split(':')[0].trim()}
                                        </h3>
                                        
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
                                            {article.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                                            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {article.readTime}
                                                </span>
                                                 {article.keywords[0] && (
                                                    <span className="flex items-center gap-1">
                                                        <Tag className="w-3.5 h-3.5" />
                                                        {article.keywords[0]}
                                                    </span>
                                                 )}
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                    </Link>
                                ))}
                             </div>
                        )}
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
}
