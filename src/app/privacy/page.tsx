import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | TextGauge',
    description: 'TextGauge Privacy Policy: Your data stays private with 100% browser-based processing. Learn how we protect your information with zero data collection and no server uploads.',
    alternates: {
        canonical: 'https://www.countcharacters.org/privacy',
    },
};

export default function PrivacyPage() {
    return (
        <LegalLayout title="Privacy Policy">
            <p className="lead">
                Last updated: January 22, 2026
            </p>

            <h2>Introduction</h2>
            <p>
                TextGauge ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, and safeguard your information when you use our website and services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <p>
                TextGauge is designed with privacy in mind. All processing (data formatting, conversion, diff checking, text analysis) happens entirely in your browser. We do not collect, store, or transmit the content you
                process through our tools.
            </p>

            <h3>Automatically Collected Information</h3>
            <p>We may collect certain information automatically, including:</p>
            <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>IP address (anonymized)</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the automatically collected information to:</p>
            <ul>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Detect and prevent technical issues</li>
                <li>Ensure security and prevent fraud</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie
                preferences through your browser settings. Essential cookies are required for the website to function
                properly.
            </p>

            <h2>Third-Party Services</h2>
            <p>We may use third-party services for analytics and advertising, including:</p>
            
            <h3>Google Analytics</h3>
            <p>
                We use Google Analytics to understand how visitors use our site. This helps us improve our tools and user experience.
                Google Analytics collects information such as:
            </p>
            <ul>
                <li>Pages you visit and time spent on each page</li>
                <li>How you arrived at our site (search engine, direct visit, etc.)</li>
                <li>Your approximate location (country/city level)</li>
                <li>Browser and device information</li>
            </ul>
            <p>
                This data is collected anonymously and does not identify you personally. You can opt out of Google Analytics tracking by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Google Analytics opt-out browser add-on
                </a>.
            </p>

            <h3>Google AdSense</h3>
            <p>
                We display advertisements through Google AdSense to keep TextGauge free for everyone. Here's what you should know:
            </p>
            <ul>
                <li><strong>Personalized Ads:</strong> Google may use cookies and browsing data to show you relevant advertisements based on your interests</li>
                <li><strong>Data Collection:</strong> Google collects information about your visits to our site and other websites to provide targeted advertising</li>
                <li><strong>Ad Preferences:</strong> You can control personalized advertising through{' '}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Google Ads Settings
                    </a>
                </li>
                <li><strong>Opt-Out:</strong> You can opt out of personalized ads while continuing to see non-personalized ads</li>
            </ul>
            <p>
                Please refer to{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Google's Privacy Policy
                </a>{' '}
                and{' '}
                <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Google AdSense Privacy Information
                </a>{' '}
                for more details on how Google processes your information.
            </p>

            <h2>Data Security</h2>
            <p>
                We implement appropriate technical and organizational measures to protect your information. However,
                no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
                <li>Access to your personal information</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Objection to processing</li>
                <li>Data portability</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information
                from children under 13. If you believe we have collected such information, please contact us.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:denesdvaghani9200@gmail.com">denesdvaghani9200@gmail.com</a>
            </p>
        </LegalLayout>
    );
}
