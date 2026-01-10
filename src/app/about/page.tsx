import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';
import { Shield, Zap, CircleDollarSign } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About TextGauge | Developer Tools Suite',
    description: 'Learn about TextGauge - The free, privacy-focused developer tools suite. JSON Formatter, YAML Validator, Diff Checker, Converters, and more.',
};

export default function AboutPage() {
    return (
        <LegalLayout title="About TextGauge">
            <p className="lead">
                Free, secure, and efficient developer tools suite for the modern web.
            </p>

            <h2>Our Mission</h2>
            <p>
                TextGauge was built with a simple mission: to provide developers, writers, and data analysts with
                fast, reliable, and privacy-focused tools. We believe that simple tasks like counting characters,
                formatting JSON, or analyzing text shouldn't require sending your sensitive data to a remote server.
            </p>

            <h2>Why TextGauge?</h2>

            <div className="not-prose grid gap-6 my-8">
                <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            All processing happens in your browser. Your data never leaves your device. We don't
                            collect, store, or transmit the content you process through our tools.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Client-side processing means instant results. No waiting for server responses or dealing
                            with network latency. Your work flows smoothly and efficiently.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <CircleDollarSign className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Completely Free</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            No subscriptions, no hidden fees, no paywalls. All features are free to use, forever.
                            We're supported by non-intrusive advertising.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Our Tools</h2>
            <p>TextGauge offers a growing suite of text analysis and formatting tools:</p>
            <ul>
                <li><strong>Developer Utilities:</strong> Format, validate, and minify JSON, TOML, and YAML with advanced editors.</li>
                <li><strong>Data Converters:</strong> Instantly convert between JSON, CSV, XML, and YAML formats.</li>
                <li><strong>Diff Tools:</strong> Compare text and code side-by-side to spot differences immediately.</li>
                <li><strong>Text Analysis:</strong> Count characters, words, and analyze text density for SEO.</li>
            </ul>

            <h2>Built for Everyone</h2>
            <p>
                Whether you're a developer debugging API responses, a writer tracking word counts, or a student
                analyzing essays, TextGauge has tools designed to make your work easier and more efficient.
            </p>

            <h2>Open Source & Community</h2>
            <p>
                We believe in transparency and community-driven development. While TextGauge is currently a closed-source
                project, we're committed to listening to user feedback and continuously improving our tools based on
                your needs.
            </p>

            <h2>Contact & Support</h2>
            <p>
                We value your feedback! If you have suggestions for new tools or improvements, please feel free
                to reach out through our <a href="/contact">contact page</a>. We're constantly working to make
                TextGauge better for everyone.
            </p>

            <h2>The Team</h2>
            <p>
                TextGauge is developed and maintained by a passionate team of developers who care about creating
                useful, privacy-respecting tools for the web.
            </p>
        </LegalLayout>
    );
}
