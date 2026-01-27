import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';
import { BookOpen, Search, Zap, Shield, HelpCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Help & FAQ | TextGauge',
    description: 'Get help with TextGauge developer tools. Find answers to common questions about JSON formatters, image compression, text comparison, and more.',
    alternates: {
        canonical: 'https://www.countcharacters.org/help',
    },
};

// FAQ Schema for SEO
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is TextGauge really free to use?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All TextGauge tools are completely free with unlimited usage. We sustain our platform through non-intrusive advertising. There are no paywalls, premium tiers, or feature limits."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data private? Do you upload my files to your servers?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely private! All processing happens 100% locally in your browser. Your images, JSON files, text, and data never leave your device. We don't collect, store, or transmit any user content. This applies to all our tools including the character counter, image compressor, JSON formatter, and more."
            }
        },
        {
            "@type": "Question",
            "name": "Which browsers are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "TextGauge works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience. Mobile browsers are fully supported as well."
            }
        },
        {
            "@type": "Question",
            "name": "Why do some tools require JavaScript?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "All our tools process data in your browser using JavaScript. This is what ensures your privacy—since processing happens locally, your data never needs to be sent to a server. JavaScript is required for all formatting, conversion, and compression features."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use TextGauge offline?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Once a page loads, many tools work offline thanks to your browser's cache. However, you'll need an internet connection for the initial page load and to access updates or new features."
            }
        },
        {
            "@type": "Question",
            "name": "What file size limits do you have?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "File size limits depend on your device's capabilities since all processing happens in your browser. Most modern devices can handle: Images up to 50MB, JSON/YAML files up to 10MB, and text files up to 5MB. Larger files may work but could slow down performance."
            }
        },
        {
            "@type": "Question",
            "name": "How do I report a bug or request a feature?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We'd love to hear from you! Please contact us through our contact page or email us at denesdvaghani9200@gmail.com with your bug reports or feature requests. We typically respond within 24-48 hours."
            }
        },
        {
            "@type": "Question",
            "name": "Why do you show ads?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We show non-intrusive ads to keep TextGauge free for everyone. Ads help us cover server costs, development time, and infrastructure expenses. We carefully place ads to minimize disruption while maintaining a quality experience."
            }
        }
    ]
};

export default function HelpPage() {
    return (
        <LegalLayout title="Help & FAQ">
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <p className="lead">
                Welcome to the TextGauge Help Center. Find answers to common questions and learn how to get the most out of our developer tools.
            </p>

            <h2>Getting Started</h2>
            <div className="not-prose grid gap-6 my-8">
                <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Quick Start Guide</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            All TextGauge tools work the same way: simply navigate to the tool you need, input your data (paste text, upload a file, or use the editor), and the tool will process it instantly in your browser. No sign-up required!
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Your data never leaves your device. All processing happens locally in your browser using modern web technologies like Web Workers and WebAssembly. This means maximum privacy and instant results.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Learn More</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Check out our <Link href="/learn" className="text-indigo-600 dark:text-indigo-400 hover:underline">Learn section</Link> for in-depth guides on image optimization, data formats, cron expressions, and more.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Popular Tools</h2>
            <h3>Text Tools</h3>
            <ul>
                <li><Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Character Counter</Link> - Count characters, words, sentences, and analyze text in real-time</li>
                <li><Link href="/diff-checker" className="text-indigo-600 dark:text-indigo-400 hover:underline">Diff Checker</Link> - Compare two text files and highlight differences</li>
                <li><Link href="/list-comparator" className="text-indigo-600 dark:text-indigo-400 hover:underline">List Comparator</Link> - Find items unique to each list or common to both</li>
            </ul>

            <h3>Formatters</h3>
            <ul>
                <li><Link href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Formatter</Link> - Format, validate, and minify JSON with syntax highlighting</li>
                <li><Link href="/yaml-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">YAML Formatter</Link> - Format and validate YAML files</li>
                <li><Link href="/toml-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">TOML Formatter</Link> - Format and validate TOML configuration files</li>
            </ul>

            <h3>Image Tools</h3>
            <ul>
                <li><Link href="/image-compressor" className="text-indigo-600 dark:text-indigo-400 hover:underline">Image Compressor</Link> - Reduce image file size while maintaining quality</li>
                <li><Link href="/image-converter" className="text-indigo-600 dark:text-indigo-400 hover:underline">Image Converter</Link> - Convert between JPG, PNG, WebP, and more</li>
                <li><Link href="/image-resizer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Image Resizer</Link> - Resize images to specific dimensions</li>
            </ul>

            <h3>Converters</h3>
            <ul>
                <li><Link href="/json-to-csv-converter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON to CSV</Link> - Convert JSON arrays to CSV format</li>
                <li><Link href="/json-to-toon-converter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON to TOON</Link> - Convert JSON to compact TOON format (reduces LLM tokens by 30-60%)</li>
            </ul>

            <h3>Generators</h3>
            <ul>
                <li><Link href="/uuid-generator" className="text-indigo-600 dark:text-indigo-400 hover:underline">UUID Generator</Link> - Generate unique UUIDs (v4)</li>
                <li><Link href="/hash-generator" className="text-indigo-600 dark:text-indigo-400 hover:underline">Hash Generator</Link> - Generate MD5, SHA-1, SHA-256 hashes</li>
                <li><Link href="/cron-job-generator" className="text-indigo-600 dark:text-indigo-400 hover:underline">Cron Expression Generator</Link> - Build cron schedules with visual interface</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            
            <div className="space-y-6 my-8">
                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Is TextGauge really free to use?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Yes! All TextGauge tools are completely free with unlimited usage. We sustain our platform through non-intrusive advertising. There are no paywalls, premium tiers, or feature limits.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Is my data private? Do you upload my files to your servers?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Absolutely private! All processing happens 100% locally in your browser. Your images, JSON files, text, and data never leave your device. We don't collect, store, or transmit any user content. This applies to all our tools including the character counter, image compressor, JSON formatter, and more.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Which browsers are supported?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        TextGauge works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience. Mobile browsers are fully supported as well.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Why do some tools require JavaScript?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        All our tools process data in your browser using JavaScript. This is what ensures your privacy—since processing happens locally, your data never needs to be sent to a server. JavaScript is required for all formatting, conversion, and compression features.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Can I use TextGauge offline?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Once a page loads, many tools work offline thanks to your browser's cache. However, you'll need an internet connection for the initial page load and to access updates or new features.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        What file size limits do you have?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        File size limits depend on your device's capabilities since all processing happens in your browser. Most modern devices can handle:
                    </p>
                    <ul className="mt-2 text-slate-600 dark:text-slate-400">
                        <li>Images: up to 50MB</li>
                        <li>JSON/YAML/TOML files: up to 10MB</li>
                        <li>Text files: up to 5MB</li>
                    </ul>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Larger files may work but could slow down performance depending on your device.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        How do I report a bug or request a feature?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        We'd love to hear from you! Please contact us through our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact page</Link> or email us at <a href="mailto:denesdvaghani9200@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">denesdvaghani9200@gmail.com</a> with your bug reports or feature requests. We typically respond within 24-48 hours.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        Why do you show ads?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        We show non-intrusive ads to keep TextGauge free for everyone. Ads help us cover server costs, development time, and infrastructure expenses. We carefully place ads to minimize disruption while maintaining a quality experience.
                    </p>
                </div>
            </div>

            <h2>Still Need Help?</h2>
            <div className="not-prose bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 my-8">
                <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Contact Support</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Can't find what you're looking for? Our team is here to help!
                        </p>
                        <Link 
                            href="/contact" 
                            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Additional Resources</h2>
            <ul>
                <li><Link href="/about" className="text-indigo-600 dark:text-indigo-400 hover:underline">About TextGauge</Link> - Learn about our mission and team</li>
                <li><Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</Link> - How we protect your data</li>
                <li><Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</Link> - Our usage terms</li>
                <li><Link href="/learn" className="text-indigo-600 dark:text-indigo-400 hover:underline">Learn</Link> - In-depth guides and tutorials</li>
            </ul>
        </LegalLayout>
    );
}
