import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';
import { Mail, MessageSquare, Github } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | TextGauge',
    description: 'Contact TextGauge for support, feature requests, or partnership inquiries. Our developer team responds within 24-48 hours. Get help with JSON formatters, image tools, and more.',
    alternates: {
        canonical: 'https://www.countcharacters.org/contact',
    },
};

// ContactPage Schema for SEO
const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.countcharacters.org/contact#contact",
    "url": "https://www.countcharacters.org/contact",
    "name": "Contact TextGauge",
    "description": "Get in touch with the TextGauge team for support, feedback, or partnership inquiries."
};

export default function ContactPage() {
    return (
        <LegalLayout title="Contact Us">
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            
            <p className="lead">
                Have questions about <strong>countcharacters.org</strong> or our <strong>TextGauge</strong> tools? We'd love to hear from you. 
                Our team is dedicated to building the web's most privacy-focused developer utility suite.
            </p>

            <h2>Get in Touch</h2>

            <div className="not-prose grid gap-6 my-8">
                <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">General Inquiries</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            For any questions about our tools, brand partnerships, or general feedback.
                        </p>
                        <a
                            href="mailto:denesdvaghani9200@gmail.com"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                            denesdvaghani9200@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                    <Github className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Technical Support & Bugs</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Found an issue with a conversion or formatting tool? Our engineering team will look into it.
                        </p>
                        <a
                            href="mailto:denesdvaghani9200@gmail.com"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                            denesdvaghani9200@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <h2>Why We Use Gmail</h2>
            <p>
                As a privacy-focused team of independent developers, we use a centralized support address to ensure we don't miss any of your valuable feedback while we transition to a full domain-based support system. You can expect a response from a real human developer.
            </p>

            <h2>Business & Advertising</h2>
            <p>
                For advertising inquiries or to discuss custom tool development using our TextGauge engine, please contact us directly at{' '}
                <a href="mailto:denesdvaghani9200@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                    denesdvaghani9200@gmail.com
                </a>
            </p>

            <h2>Response Time</h2>
            <p>
                We typically respond within <strong>24-48 hours</strong>. Please note that we are located in India (IST), so response times may vary based on your time zone.
            </p>
        </LegalLayout>
    );
}
