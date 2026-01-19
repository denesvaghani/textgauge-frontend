import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';
import { Shield, Zap, CircleDollarSign, Code, Users, Clock, Award, Lock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About TextGauge | Developer Tools Suite',
    description: 'Learn about TextGauge - Free developer tools for image compression, JSON formatting, text comparison, UUID generation, and more. 100% browser-based.',
    alternates: {
        canonical: 'https://www.countcharacters.org/about',
    },
    openGraph: {
        title: 'About TextGauge | Developer Tools Suite',
        description: 'Free, privacy-first developer tools built by experienced engineers. 100% browser-based processing.',
        type: 'website',
    },
};

// About page schema for SEO
const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://www.countcharacters.org/about#about",
    name: "About TextGauge",
    description: "TextGauge is a free developer tools suite offering image compression, JSON formatting, text comparison, and more. All processing happens locally in your browser.",
    mainEntity: {
        "@type": "Organization",
        name: "TextGauge",
        url: "https://www.countcharacters.org",
        foundingDate: "2025-11",
        founder: {
            "@type": "Person",
            name: "Denes Vaghani",
            url: "https://www.countcharacters.org/team",
            jobTitle: "Founder & CEO",
            sameAs: ["https://www.linkedin.com/in/denesvaghani/"]
        },
        description: "Free developer tools suite with 100% client-side processing for maximum privacy.",
    }
};

export default function AboutPage() {
    return (
        <LegalLayout title="About countcharacters.org (Powered by TextGauge)">
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />

            <p className="lead">
                The ultimate character counting and developer tool suite, built for speed, privacy, and precision by experienced software engineers.
            </p>

            <h2>Our Story</h2>
            <p>
                <strong>countcharacters.org</strong> was founded in November 2025 with a clear mission: to provide the fastest, most reliable character counter on the web—without compromising user privacy. What started as a simple character counting tool has evolved into <strong>TextGauge</strong>, a comprehensive developer tools suite serving thousands of users worldwide.
            </p>
            <p>
                Our founder, <Link href="/team" className="text-indigo-600 dark:text-indigo-400 hover:underline">Denes Vaghani</Link>, is a Senior Product Engineer with extensive experience in building enterprise AI solutions. Frustrated by the slow, ad-heavy, and privacy-invasive tools that dominated the market, he set out to create something better: professional-grade tools that run entirely in your browser.
            </p>

            <h2>Our Mission</h2>
            <p>
                We believe that simple tasks like counting characters, formatting JSON, or comparing code shouldn't require sending your sensitive data to a remote server. <strong>Every single tool on TextGauge processes data 100% locally in your browser.</strong> Your data never touches our servers—ever.
            </p>
            <p>
                This isn't just a feature; it's our founding principle. Whether you're working with proprietary code, sensitive documents, or personal information, you can trust that your data remains completely private.
            </p>

            <h2>Why Choose TextGauge?</h2>

            <div className="not-prose grid gap-6 my-8">
                <div className="flex items-start gap-4">
                    <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Zero Data Collection</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Unlike competitors who upload your files to their servers, we process everything locally. Your images, JSON files, and text never leave your browser. We don't collect, store, or transmit any user content—period.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Enterprise-Grade Security</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Built with security best practices including HTTPS everywhere, Content Security Policy headers, and strict input validation. Our architecture is designed for teams handling sensitive data.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Instant Performance</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            By leveraging modern web technologies like Web Workers, WebAssembly, and the Canvas API, we deliver instant results without network latency. Our diff checker handles 100,000+ line files without freezing.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <CircleDollarSign className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Free Forever</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            We sustain our platform through non-intrusive advertising. No paywalls, no feature limits, no "premium tiers" that lock essential functionality. Every tool is completely free with unlimited usage.
                        </p>
                    </div>
                </div>
            </div>

            <h2>The TextGauge Engine</h2>
            <p>Our platform is powered by the TextGauge engine, a modern tech stack built on Next.js 16, React 19, and TypeScript. Here's what we offer:</p>
            <ul>
                <li><strong>17+ Professional Tools:</strong> From character counting to image compression, JSON formatting to hash generation.</li>
                <li><strong>Advanced Character Analysis:</strong> Real-time counts for characters, words, sentences, paragraphs, and SEO keyword density.</li>
                <li><strong>Modern Code Editors:</strong> Monaco-based editors for JSON, YAML, and TOML with syntax highlighting, error detection, and auto-formatting.</li>
                <li><strong>AI-Ready Converters:</strong> Unique formats like <strong>JSON to TOON</strong> designed to reduce token usage by 30-60% in LLM prompts.</li>
                <li><strong>Image Optimization Suite:</strong> Compress, resize, convert, and merge images—all processed locally with before/after previews.</li>
                <li><strong>Developer Generators:</strong> UUID, hash, Base64, URL encoding, and cron expression tools for everyday development tasks.</li>
            </ul>

            <h2>Built by Developers, for Developers</h2>
            <p>
                TextGauge is developed by a small team of experienced software engineers who understand what developers need. We've worked in enterprise environments, built AI solutions, and faced the same frustrations with existing tools that you have.
            </p>
            <p>
                We practice what we call "AI-Accelerated Development"—using modern AI tools to move fast while maintaining code quality. This allows us to ship new features quickly and respond to user feedback within days, not months.
            </p>

            <div className="not-prose grid sm:grid-cols-3 gap-4 my-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 text-center">
                    <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">17+</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Professional Tools</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 text-center">
                    <Clock className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Client-Side Processing</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 text-center">
                    <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Data Sent to Servers</p>
                </div>
            </div>

            <h2>Our Commitment to Quality</h2>
            <p>
                We don't cut corners. Every tool is built with attention to detail:
            </p>
            <ul>
                <li><strong>Automated Testing:</strong> Comprehensive test suites ensure reliability.</li>
                <li><strong>Accessibility:</strong> Keyboard navigation, screen reader support, and WCAG compliance.</li>
                <li><strong>Mobile-First:</strong> Fully responsive design that works on any device.</li>
                <li><strong>Dark Mode:</strong> Easy on the eyes, day or night.</li>
            </ul>

            <h2>Contact & Support</h2>
            <p>
                We value your feedback! If you have suggestions for new tools, feature requests, or bug reports, please reach out through our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact page</Link>. You can also learn more about the people behind TextGauge on our <Link href="/team" className="text-indigo-600 dark:text-indigo-400 hover:underline">team page</Link>.
            </p>
            <p>
                Thank you for choosing TextGauge. We're committed to building the best developer tools on the web—tools you can trust with your most sensitive data.
            </p>
        </LegalLayout>
    );
}
