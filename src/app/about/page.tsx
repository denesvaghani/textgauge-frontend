export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
            <h1 className="mb-2">About TextGauge</h1>
            <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
                Free, secure, and efficient developer tools for the modern web.
            </p>

            <h2>Our Mission</h2>
            <p>
                TextGauge was built with a simple mission: to provide developers, writers, and data analysts with
                fast, reliable, and privacy-focused tools. We believe that simple tasks like formatting JSON or
                converting CSVs shouldn&apos;t require sending your sensitive data to a remote server.
            </p>

            <h2>Why Choose Us?</h2>
            <ul>
                <li><strong>Privacy First:s</strong> All data processing happens locally in your browser.</li>
                <li><strong>Speed:</strong> No server round-trips means instant results.</li>
                <li><strong>Free:</strong> Our tools are free to use, supported by unobtrusive advertising.</li>
            </ul>

            <h2>Our Tools</h2>
            <p>
                We continuously expand our suite of utilities. Currently, we offer:
            </p>
            <ul>
                <li><strong>Character Counter:</strong> Live analysis of words, characters, and sentences.</li>
                <li><strong>JSON Formatter:</strong> Validate, minify, and beautify JSON data.</li>
                <li><strong>YAML Formatter:</strong> Parse and format YAML configuration files.</li>
                <li><strong>CSV to JSON:</strong> Convert large datasets locally and securely.</li>
            </ul>

            <h2>Contact & Support</h2>
            <p>
                We value your feedback! If you have suggestions for new tools or improvements, please feel free
                to reach out. We are constantly working to make TextGauge better for everyone.
            </p>
        </div>
    );
}
