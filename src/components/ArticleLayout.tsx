'use client';

import Link from 'next/link';
import { ChevronRight, Clock, Calendar, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { DynamicAd } from '@/components/DynamicAd';
import type { LearnArticle, ArticleSection, FAQ } from '@/config/learnArticles';
import { getRelatedArticles } from '@/config/learnArticles';

interface ArticleLayoutProps {
  article: LearnArticle;
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// Table of Contents & Sidebar
function TableOfContents({ sections }: { sections: ArticleSection[] }) {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* Table of Contents */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">
            On This Page
          </h3>
          <nav>
            <ul className="space-y-3 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500 pl-3 -ml-3"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="block text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500 pl-3 -ml-3"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar Ad / Widget */}
        {process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR && (
            <div className="min-h-[600px] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <DynamicAd
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
                  adFormat="vertical"
                  style={{ display: 'block' }}
                />
            </div>
        )}
      </div>
    </aside>
  );
}

// Code Block Component
function CodeBlock({ code }: { code: { language: string; content: string; filename?: string } }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
      {code.filename && (
        <div className="px-4 py-2 bg-slate-800 text-slate-400 text-sm font-mono border-b border-slate-700 flex items-center justify-between">
            <span>{code.filename}</span>
            <span className="text-xs uppercase text-slate-500">{code.language}</span>
        </div>
      )}
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
        <code className={`language-${code.language} text-slate-100 font-mono`}>
          {code.content}
        </code>
      </pre>
    </div>
  );
}

// Comparison Table Component
function ComparisonTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="my-8 overflow-x-auto shadow-sm rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full bg-white dark:bg-slate-900 overflow-hidden">
        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            {table.headers.map((header, i) => (
              <th 
                key={i} 
                className="px-6 py-4 text-left text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {table.rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// FAQ Accordion Component  
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section id="faq" className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
          >
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-lg">
              {faq.question}
              <span className="text-slate-400 group-open:rotate-180 transition-transform ml-4">▼</span>
            </summary>
            <div className="px-5 pb-6 text-slate-600 dark:text-slate-400 text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 bg-slate-50/50 dark:bg-slate-900/50">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection({ article }: { article: LearnArticle }) {
  return (
    <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-10 text-white shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{article.ctaTitle}</h2>
          <p className="text-indigo-100 text-lg leading-relaxed">{article.ctaDescription}</p>
        </div>
        <Link
          href={article.ctaLink}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 shrink-0"
        >
          {article.ctaLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

// Related Articles Component
function RelatedArticlesSection({ slug }: { slug: string }) {
  const relatedArticles = getRelatedArticles(slug);
  
  if (relatedArticles.length === 0) return null;
  
  return (
    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((related) => (
          <Link
            key={related.slug}
            href={`/learn/${related.slug}`}
            className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                <DynamicIcon name={related.icon} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                {related.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 leading-tight">
              {related.title.split(':')[0].split('?')[0].trim()}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm">
              {related.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Main Article Layout Component
export function ArticleLayout({ article }: ArticleLayoutProps) {
  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <Link href="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Learn
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 dark:text-white truncate max-w-[300px]">
              {article.title.split(':')[0].split('?')[0].trim()}
            </span>
          </nav>

          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <DynamicIcon name={article.icon} className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-bold rounded-full tracking-wide uppercase">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-indigo-500" />
                {article.keywords.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0))]" />
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* LEFT: Article Content */}
          <article className="flex-1 min-w-0">
            {/* Intro */}
            <div 
              className="prose prose-lg md:prose-xl dark:prose-invert prose-indigo max-w-none mb-12 text-slate-600 dark:text-slate-300 leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: article.intro }}
            />

            {/* Ad: After intro */}
            {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
              <div className="my-12 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden">
                <DynamicAd
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                  adFormat="fluid"
                  layout="in-article"
                />
              </div>
            )}

            {/* Sections */}
            {article.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="mb-16 scroll-mt-32 group">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  {section.heading}
                  <a href={`#${section.id}`} className="opacity-0 group-hover:opacity-100 text-slate-300 dark:text-slate-600 hover:text-indigo-500 transition-all text-2xl no-underline" aria-label="Link to section">#</a>
                </h2>
                
                <div 
                  className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 leading-8"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                
                {section.code && <CodeBlock code={section.code} />}
                {section.table && <ComparisonTable table={section.table} />}

                {/* Ad: After every 3rd section */}
                {(index + 1) % 3 === 0 && process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                  <div className="my-12 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden">
                    <DynamicAd
                      adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                      adFormat="fluid"
                      layout="in-article"
                    />
                  </div>
                )}
              </section>
            ))}

            {/* FAQ Section */}
            {article.faqs && article.faqs.length > 0 && (
              <FAQSection faqs={article.faqs} />
            )}

            {/* CTA Section */}
            <CTASection article={article} />

            {/* Related Articles */}
            <RelatedArticlesSection slug={article.slug} />

            {/* Ad: Bottom multiplex */}
            {process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX && (
              <div className="mt-16">
                <DynamicAd
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                  adFormat="autorelaxed"
                />
              </div>
            )}
          </article>

          {/* RIGHT: Sidebar (Sticky) */}
          <TableOfContents sections={article.sections} />
          
        </div>
      </div>
    </div>
  );
}
