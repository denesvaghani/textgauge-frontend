import { Metadata } from 'next';
import { CsvJsonConverter } from '@/components/CsvJsonConverter';

export const metadata: Metadata = {
    title: 'CSV to JSON Converter | Free Online Data Tool - TextGauge',
    description: 'Convert huge CSV files (up to 25MB) to JSON instantly. Secure, client-side CSV to JSON converter with drag & drop support. No file upload to server.',
    keywords: ['csv to json', 'convert csv to json', 'csv json converter', 'large csv converter', 'client side csv parser', 'json data tool'],
    openGraph: {
        title: 'CSV to JSON Converter | Free Online Data Tool',
        description: 'Convert huge CSV files (up to 25MB) to JSON instantly. Secure, client-side processing.',
        url: 'https://textgauge.com/csv-to-json',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CSV to JSON Converter - Fast & Secure',
        description: 'Convert CSV to JSON instantly in your browser. Supports 25MB+ files.',
    }
};

export default function CsvToJsonPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950/50">
            <CsvJsonConverter />

            {/* SEO Content Section */}
            <article className="max-w-4xl mx-auto px-6 py-12 prose dark:prose-invert">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    How to Convert CSV to JSON Online
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                    TextGauge&apos;s <strong>CSV to JSON Converter</strong> is designed for developers and data analysts who need to transform Comma Separated Values (CSV) into JavaScript Object Notation (JSON) quickly and securely. Unlike other tools, we process your data <strong>entirely in your browser</strong>, meaning your files are never uploaded to a server.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Why use this tool?</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                            <li><strong>Large File Support:</strong> Handle files up to 25MB.</li>
                            <li><strong>Privacy First:</strong> Data never leaves your device.</li>
                            <li><strong>Instant Preview:</strong> View your JSON before downloading.</li>
                            <li><strong>Validation:</strong> Catch CSV errors automatically.</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Supported Formats</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            We support standard CSV files (`.csv`) as well as tab-separated values or custom delimiters. The output is strictly formatted, minified, or pretty-printed JSON structure ready for API usage or NoSQL databases.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Is this CSV converter free?</h3>
                        <p className="text-slate-600 dark:text-slate-400">Yes, this tool is 100% free and open for unlimited use.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">How do I handle large CSV files?</h3>
                        <p className="text-slate-600 dark:text-slate-400">Simply drag and drop your file (up to 25MB) into the upload zone. Our engine streams the file content to prevent your browser from crashing.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Can I copy the JSON output?</h3>
                        <p className="text-slate-600 dark:text-slate-400">Yes, use the &quot;Copy&quot; button to copy the entire JSON object to your clipboard, or click &quot;Download&quot; to save it as a `.json` file.</p>
                    </div>
                </div>
            </article>
        </main>
    );
}
