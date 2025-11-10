import { Editor } from "@/components/Editor";

export default function Page() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            TextGauge - Free Word Counter & SEO Analyzer
          </h1>
          <p className="text-gray-600">
            Analyze word count, character count, reading time, keyword density, and repeated phrases instantly.
          </p>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Editor />
      </section>
    </main>
  );
}
