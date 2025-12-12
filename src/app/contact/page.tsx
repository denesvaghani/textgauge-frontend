import { LegalLayout } from "@/components/LegalLayout";
import { Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <LegalLayout title="Contact Us">
            <p className="lead text-lg">
                We&apos;d love to hear from you. Whether you have a question about our features, pricing, need a demo,
                or anything else, our team is ready to answer all your questions.
            </p>

            <div className="my-8 p-6 bg-indigo-50 dark:bg-slate-800/50 rounded-xl border border-indigo-100 dark:border-slate-700 flex items-start gap-4 not-prose">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Email Us</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                        For general inquiries, bug reports, and feedback.
                    </p>
                    <a href="mailto:support@textgauge.com" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                        support@textgauge.com
                    </a>
                </div>
            </div>

            <h3>Frequently Asked Questions</h3>

            <h4>How can I report a bug?</h4>
            <p>
                Please send us an email with a screenshot and description of the issue. We try to fix critical bugs within 24 hours.
            </p>

            <h4>Can I request a new tool?</h4>
            <p>
                Absolutely! We are always looking to expand our suite. Let us know what you need.
            </p>
        </LegalLayout>
    );
}
