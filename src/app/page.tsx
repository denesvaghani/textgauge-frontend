import { Editor } from "@/components/Editor";

export default function Page() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Count Characters, Convert Case & Find Repeating Phrases - Free Online Tool
          </h1>
          <p className="text-gray-600 mt-2">
            <strong>Count the character</strong>, <strong>convert the case</strong> (italic, uppercase, lowercase), 
            detect <strong>repeating phrases</strong>, and analyze SEO with our free online text tool. 
            Perfect for writers, bloggers, and content creators.
          </p>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Editor />
      </section>
      
      {/* SEO Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free Online Text Analysis & Formatting Tool
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">📊 Count the Character</h3>
              <p>
                Instantly count characters, words, sentences, and paragraphs. Our character counter 
                shows real-time statistics as you type, perfect for social media posts, essays, and articles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🔄 Convert the Case</h3>
              <p>
                Convert case online free - transform text to Title Case, lowercase, UPPERCASE, or snake_case. 
                Apply italic formatting and other text transformations with one click.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🔍 Find Repeating Phrases</h3>
              <p>
                Detect repeating phrases automatically. Our tool identifies repeated 3-word phrases 
                in your content, helping you improve readability and avoid redundancy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🎯 SEO Analysis</h3>
              <p>
                Free SEO tool with keyword density checker. Track keyword occurrences, analyze density 
                percentage, calculate reading time, and optimize your content for search engines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
