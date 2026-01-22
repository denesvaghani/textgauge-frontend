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
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// Table of Contents
function TableOfContents({ sections }: { sections: ArticleSection[] }) {
  return (
    <nav className="hidden lg:block sticky top-20 w-64 shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">
          On This Page
        </h3>
        <ul className="space-y-2.5 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
              >
                {section.heading}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#faq"
              className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
            >
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Code Block Component
function CodeBlock({ code }: { code: { language: string; content: string; filename?: string } }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
      {code.filename && (
        <div className="px-4 py-2 bg-slate-800 text-slate-400 text-sm font-mono border-b border-slate-700">
          {code.filename}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${code.language} text-slate-100`}>
          {code.content}
        </code>
      </pre>
    </div>
  );
}

// Comparison Table Component
function ComparisonTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            {table.headers.map((header, i) => (
              <th 
                key={i} 
                className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
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
    <section id="faq" className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {faq.question}
              <span className="text-slate-400 group-open:rotate-180 transition-transform ml-4">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
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
    <section className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{article.ctaTitle}</h2>
          <p className="text-indigo-100">{article.ctaDescription}</p>
        </div>
        <Link
          href={article.ctaLink}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 shrink-0"
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
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((related) => (
          <Link
            key={related.slug}
            href={`/learn/${related.slug}`}
            className="group p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                <DynamicIcon name={related.icon} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase">
                {related.category}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
              {related.title.split(':')[0].split('?')[0].trim()}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Learn
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">
              {article.title.split(':')[0].split('?')[0].trim()}
            </span>
          </nav>

          {/* Article Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
              <DynamicIcon name={article.icon} className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {article.keywords.slice(0, 3).join(', ')}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-12">
          {/* Article Content */}
          <article className="flex-1 max-w-3xl">
            {/* Intro */}
            <div 
              className="prose prose-lg dark:prose-invert prose-indigo max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.intro }}
            />

            {/* Ad: After intro */}
            {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
              <div className="my-8">
                <DynamicAd
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                  adFormat="fluid"
                  layout="in-article"
                />
              </div>
            )}

            {/* Sections */}
            {article.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {section.heading}
                </h2>
                
                <div 
                  className="prose prose-slate dark:prose-invert prose-indigo max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                
                {section.code && <CodeBlock code={section.code} />}
                {section.table && <ComparisonTable table={section.table} />}

                {/* Ad: After every 3rd section */}
                {(index + 1) % 3 === 0 && process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                  <div className="my-8">
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
              <div className="mt-12">
                <DynamicAd
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                  adFormat="autorelaxed"
                />
              </div>
            )}
          </article>

          {/* Table of Contents Sidebar */}
          <TableOfContents sections={article.sections} />
        </div>
      </div>
    </div>
  );
}
