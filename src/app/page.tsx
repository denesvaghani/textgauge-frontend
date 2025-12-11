'use client';

import { Editor } from "@/components/Editor";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Page() {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <ThemeToggle />
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            <strong>Character Counter</strong> - Free <strong>Word Count</strong> & <strong>Character Count</strong> Tool
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Free online <strong>character counter</strong> and <strong>word count</strong> tool.
            Instantly <strong>count characters</strong>, <strong>count words</strong>, sentences, and paragraphs.
            Convert case, find repeating phrases, and analyze keyword density for SEO.
            Perfect for writers, bloggers, and content creators.
          </p>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Editor />
      </section>

      {/* SEO Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Free Character Counter & Word Count Tool
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">📊 Character Count & Word Count</h3>
              <p>
                Instantly <strong>count characters</strong> and <strong>count words</strong> as you type.
                Our free <strong>character counter</strong> and <strong>word counter</strong> shows real-time statistics
                including sentences, paragraphs, reading time, and speaking time. Perfect for Twitter posts (280 characters),
                meta descriptions (155-160 characters), SMS messages, essays, and articles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">🔄 Convert the Case</h3>
              <p>
                Convert case online free - transform text to Title Case, lowercase, UPPERCASE, or snake_case.
                Apply italic formatting and other text transformations with one click. Perfect for formatting
                content quickly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">🔍 Find Repeating Phrases</h3>
              <p>
                Detect repeating phrases automatically. Our tool identifies repeated 3-word phrases
                in your content, helping you improve readability and avoid redundancy. Great for
                content editing and quality improvement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">🎯 SEO Keyword Density</h3>
              <p>
                Free SEO tool with keyword density checker. Track keyword occurrences, analyze density
                percentage, calculate reading time, and optimize your content for search engines.
                Essential for content creators and bloggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            More Free Developer Tools
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <a href="/json-formatter" className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-lg mb-1 text-blue-600 dark:text-blue-400">JSON Formatter & Validator →</h3>
              <p className="text-gray-600 dark:text-gray-300">Format, validate, and beautify your JSON data instantly.</p>
            </a>
            <a href="/yaml-formatter" className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-lg mb-1 text-blue-600 dark:text-blue-400">YAML Formatter & Validator →</h3>
              <p className="text-gray-600 dark:text-gray-300">Format YAML, convert JSON to YAML, and validate syntax.</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <summary className="font-semibold cursor-pointer text-gray-800 dark:text-white">
                How do I count characters in my text?
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Simply paste or type your text in the editor above. The <strong>character count</strong>
                updates instantly as you type. Our free <strong>character counter</strong> counts all
                characters including spaces, punctuation, and special characters. The tool also shows
                <strong> word count</strong>, sentence count, and paragraph count simultaneously.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <summary className="font-semibold cursor-pointer text-gray-800 dark:text-white">
                Can I count words and characters at the same time?
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Yes! Our tool displays both <strong>word count</strong> and <strong>character count</strong> simultaneously.
                You'll also see sentence count, paragraph count, reading time, and speaking time. It's a complete
                text analysis tool for all your content needs.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <summary className="font-semibold cursor-pointer text-gray-800 dark:text-white">
                Is this character counter free to use?
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Absolutely! Our <strong>character counter</strong> and <strong>word count</strong> tool is 100% free
                with no registration required. Count unlimited characters and words without any restrictions.
                No hidden fees, no paywalls - completely free forever.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <summary className="font-semibold cursor-pointer text-gray-800 dark:text-white">
                Does the character count include spaces?
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Yes, our <strong>character counter</strong> includes spaces by default. This is the standard
                for most platforms including Twitter (280 character limit), SMS messages (160 characters),
                and SEO meta descriptions (155-160 characters). All spaces and punctuation are counted.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <summary className="font-semibold cursor-pointer text-gray-800 dark:text-white">
                What is the word count limit?
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                There is no limit! You can <strong>count words</strong> and <strong>count characters</strong> for
                any length of text - from a single sentence to entire books. Our <strong>word counter</strong>
                handles unlimited text instantly with real-time updates.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <summary className="font-semibold cursor-pointer text-gray-800 dark:text-white">
                How accurate is the word count?
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Our <strong>word count</strong> tool is extremely accurate. It counts words based on industry-standard
                algorithms, treating any sequence of characters separated by spaces as a word. The count matches
                what you'd get from Microsoft Word, Google Docs, and other professional word processors.
              </p>
            </details>
          </div>
        </div>
      </section >
    </main >
  );
}
