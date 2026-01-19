import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';
import { Shield, Zap, CircleDollarSign } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About TextGauge | Developer Tools Suite',
    description: 'Learn about TextGauge - Free developer tools for image compression, JSON formatting, text comparison, UUID generation, and more. 100% browser-based.',
    alternates: {
        canonical: 'https://www.countcharacters.org/about',
    },
};

export default function AboutPage() {
    return (
        <LegalLayout title="About countcharacters.org (Powered by TextGauge)">
            <p className="lead">
                The ultimate character counting and developer tool suite, built for speed, privacy, and precision.
            </p>

            <h2>Our Mission</h2>
            <p>
                <strong>countcharacters.org</strong> was founded with a clear primary mission: to provide the fastest, most reliable character counter on the web. As the site evolved, we integrated the <strong>TextGauge</strong> developer suite to offer a comprehensive set of tools for writers, developers, and data analysts.
            </p>
            <p>
                We believe that simple tasks like counting characters, formatting JSON, or comparing code shouldn't require sending your sensitive data to a remote server. Everything we build runs 100% on your device.
            </p>

            <h2>Why Choose This Platform?</h2>

            <div className="not-prose grid gap-6 my-8">
                <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Privacy & Security</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Security is our priority. All processing happens locally in your browser. Your data—whether it's an essay, a password, or proprietary JSON—never leaves your device.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Edge Performance</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            By leveraging modern web technology (like Web Workers for diff checking), we provide instant results without server latency. It's the speed of a local app on the web.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <CircleDollarSign className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Ad-Supported, User-Focused</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            We keep our tools free through non-intrusive advertising. We prioritize a clean UX over "ad-heavy" layouts found on legacy tool sites.
                        </p>
                    </div>
                </div>
            </div>

            <h2>The TextGauge Engine</h2>
            <p>Our platform is powered by the TextGauge engine, offering:</p>
            <ul>
                <li><strong>Advanced Character Analysis:</strong> Real-time counts for characters, words, sentences, and SEO density.</li>
                <li><strong>Modern Formatters:</strong> Professional editors for JSON, TOML, and YAML with real-time validation.</li>
                <li><strong>AI-Ready Converters:</strong> Unique formats like <strong>JSON to TOON</strong> designed to save tokens in LLM prompts.</li>
                <li><strong>Image Optimization:</strong> 100% client-side compression that maintains quality without risking your privacy.</li>
            </ul>

            <h2>Trust & Transparency</h2>
            <p>
                TextGauge is developed by a dedicated team of software engineers focused on "AI-Accelerated Development". We use the latest technologies to ensure our tools are ahead of the curve, providing features like CSV flattening and Monaco-based editing that most free tools lack.
            </p>

            <h2>Contact & Support</h2>
            <p>
                We value your feedback! If you have suggestions for new tools or improvements, please feel free
                to reach out through our <a href="/contact">contact page</a>.
            </p>
        </LegalLayout>
    );
}
