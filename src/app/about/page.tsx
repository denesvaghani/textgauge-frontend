import { LegalLayout } from "@/components/LegalLayout";
import { Shield, Zap, CircleDollarSign } from "lucide-react";

export default function AboutPage() {
    return (
        <LegalLayout title="About TextGauge">
            <p className="lead">
                Free, secure, and efficient developer tools for the modern web.
            </p>

            <h3>Our Mission</h3>
            <p>
                TextGauge was built with a simple mission: to provide developers, writers, and data analysts with
                fast, reliable, and privacy-focused tools. We believe that simple tasks like formatting JSON or
                converting CSVs shouldn&apos;t require sending your sensitive data to a remote server.
            </p>

            <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-3 not-prose">
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <h4 className="font-bold text-slate-900 dark:text-white m-0">Privacy First</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 m-0">All data processing happens locally in your browser.</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h4 className="font-bold text-slate-900 dark:text-white m-0">Lightning Fast</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 m-0">No server round-trips means instant results.</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <CircleDollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="font-bold text-slate-900 dark:text-white m-0">Always Free</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 m-0">Supported by unobtrusive advertising.</p>
                </div>
            </div>

            <h3>Our Tools</h3>
            <p>
                We continuously expand our suite of utilities. Currently, we offer:
            </p>
            <ul>
                <li><strong>Character Counter:</strong> Live analysis of words, characters, and sentences.</li>
                <li><strong>JSON Formatter:</strong> Validate, minify, and beautify JSON data.</li>
                <li><strong>YAML Formatter:</strong> Parse and format YAML configuration files.</li>
                <li><strong>CSV to JSON:</strong> Convert large datasets locally and securely.</li>
            </ul>

            <h3>Contact & Support</h3>
            <p>
                We value your feedback! If you have suggestions for new tools or improvements, please feel free
                to reach out. We are constantly working to make TextGauge better for everyone.
            </p>
        </LegalLayout>
    );
}
