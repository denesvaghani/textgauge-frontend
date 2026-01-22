import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, Search, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LEARN_ARTICLES, type ArticleCategory } from '@/config/learnArticles';

export const metadata: Metadata = {
  title: 'Learn - Developer Guides & Tutorials | TextGauge',
  description: 'Free developer guides and tutorials on JSON, CSV, TOON formats, data conversion, and developer tools. Comprehensive, SEO-optimized content for developers.',
  alternates: {
    canonical: 'https://www.countcharacters.org/learn',
  },
  openGraph: {
    title: 'Learn - Developer Guides & Tutorials',
    description: 'Free developer guides and tutorials on JSON, CSV, TOON formats, data conversion, and developer tools.',
    type: 'website',
  },
};

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <BookOpen className={className} />;
  return <Icon className={className} />;
}

// Category colors
const categoryColors: Record<ArticleCategory, { bg: string; text: string; border: string }> = {
  'Fundamentals': {
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  'Guides': {
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
  'Tutorials': {
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  'Comparisons': {
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
};

// Group articles by category
function getArticlesByCategory() {
  const grouped: Record<ArticleCategory, typeof LEARN_ARTICLES> = {
    'Fundamentals': [],
    'Guides': [],
    'Tutorials': [],
    'Comparisons': [],
  };

  LEARN_ARTICLES.forEach((article) => {
    if (grouped[article.category]) {
      grouped[article.category].push(article);
    }
  });

  return grouped;
}

export default function LearnPage() {
  const articlesByCategory = getArticlesByCategory();
  const categories = Object.entries(articlesByCategory).filter(([_, articles]) => articles.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Developer Resources
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Learn Data Formats & Tools
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Comprehensive guides on JSON, CSV, TOON, and developer tools. 
            Written by developers, for developers.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span><strong className="text-indigo-600 dark:text-indigo-400">{LEARN_ARTICLES.length}</strong> Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles by Category */}
      <section className="py-12 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          {categories.map(([category, articles]) => (
            <div key={category} className="mb-16 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {category}
                </h2>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${categoryColors[category as ArticleCategory].bg} ${categoryColors[category as ArticleCategory].text}`}>
                  {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/learn/${article.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl ${categoryColors[article.category].bg}`}>
                          <DynamicIcon 
                            name={article.icon} 
                            className={`w-5 h-5 ${categoryColors[article.category].text}`} 
                          />
                        </div>
                        <span className={`text-xs font-medium uppercase tracking-wide ${categoryColors[article.category].text}`}>
                          {article.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                        <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-2 transition-all">
                          Read article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try Our Tools?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Put your knowledge into practice with our free developer tools.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/json-formatter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              JSON Formatter
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/json-to-toon-converter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/30 text-white font-bold rounded-xl border border-white/30 hover:bg-indigo-500/50 transition-colors"
            >
              JSON to TOON
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/json-to-csv-converter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/30 text-white font-bold rounded-xl border border-white/30 hover:bg-indigo-500/50 transition-colors"
            >
              JSON to CSV
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
