export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
            <h1 className="mb-2">Privacy Policy</h1>
            <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
                Your privacy is our priority. We process your data locally in your browser.
            </p>

            <h2>1. Introduction</h2>
            <p>
                Welcome to TextGauge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy while you use our tools
                (Character Counter, JSON Formatter, etc.). This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>

            <h2>2. Data Processing</h2>
            <p>
                <strong>Client-Side Processing:</strong> Our core tools (Text Analysis, Converters, Formatters) operate entirely within your browser.
                When you paste text or upload a file (e.g., CSV to JSON), that data process happens locally on your device.
                We do <strong>not</strong> upload, store, or view your input data on our servers.
            </p>

            <h2>3. Information We Collect</h2>
            <ul>
                <li>
                    <strong>Usage Data:</strong> We use Google Analytics to collect anonymous information about how visitors use our site
                    (e.g., pages visited, time spent). This helps us improve the user experience.
                </li>
                <li>
                    <strong>Cookies:</strong> We use cookies to store your preferences (like Dark Mode) and for analytics purposes.
                    Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.
                </li>
            </ul>

            <h2>4. Advertising</h2>
            <p>
                We use Google AdSense to serve advertisements. Google&apos;s use of advertising cookies enables it and its partners to serve ads
                to you based on your visit to our site and/or other sites on the Internet.
            </p>
            <p>
                You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>

            <h2>5. Changes to This Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2>6. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
                Last updated: {new Date().toLocaleDateString()}
            </div>
        </div>
    );
}
