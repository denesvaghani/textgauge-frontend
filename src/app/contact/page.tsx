import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';
import { Mail, MessageSquare, Github } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | TextGauge',
    description: 'Get in touch with the TextGauge team. We\'d love to hear from you!',
};

export default function ContactPage() {
    return (
        <LegalLayout title="Contact Us">
            <p className="lead">
                We'd love to hear from you! Whether you have a question, feedback, or just want to say hello,
                feel free to reach out.
            </p>

            <h2>Get in Touch</h2>

            <div className="not-prose grid gap-6 my-8">
                <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            For general inquiries, support, or feedback
                        </p>
                        <a
                            href="mailto:denesdvaghani9200@gmail.com"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            denesdvaghani9200@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                    <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Feedback</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            We value your feedback and suggestions for improvement
                        </p>
                        <a
                            href="mailto:denesdvaghani9200@gmail.com"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            denesdvaghani9200@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                    <Github className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Bug Reports</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Found a bug? Let us know so we can fix it
                        </p>
                        <a
                            href="mailto:denesdvaghani9200@gmail.com"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            denesdvaghani9200@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <h2>Frequently Asked Questions</h2>
            <p>
                Before reaching out, you might find answers to common questions in our FAQ section (coming soon).
            </p>

            <h2>Business Inquiries</h2>
            <p>
                For partnership opportunities, advertising, or business-related questions, please contact:{' '}
                <a href="mailto:denesdvaghani9200@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                    denesdvaghani9200@gmail.com
                </a>
            </p>

            <h2>Response Time</h2>
            <p>
                We typically respond to emails within 24-48 hours during business days. Thank you for your patience!
            </p>
        </LegalLayout>
    );
}
