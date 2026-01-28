import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | TextGauge',
    description: 'Learn about how TextGauge uses cookies and similar technologies.',
    alternates: {
        canonical: 'https://www.countcharacters.org/cookie-policy',
    },
};

export default function CookiePolicyPage() {
    return (
        <LegalLayout title="Cookie Policy">
            <p className="lead">
                Last updated: January 27, 2025
            </p>

            <h2>What Are Cookies</h2>
            <p>
                Cookies are small text files that are placed on your device when you visit a website. They are widely
                used to make websites work more efficiently and provide information to website owners.
            </p>

            <h2>How We Use Cookies</h2>
            <p>TextGauge uses cookies for the following purposes:</p>

            <h3>Essential Cookies</h3>
            <p>
                These cookies are necessary for the website to function properly. They enable basic functions like page
                navigation and access to secure areas of the website. The website cannot function properly without these cookies.
            </p>

            {/* Cookie Table */}
            <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-slate-200 dark:border-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Cookie Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Purpose</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-3 text-sm">theme</td>
                            <td className="px-4 py-3 text-sm">Stores your dark/light mode preference</td>
                            <td className="px-4 py-3 text-sm">1 year</td>
                        </tr>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-3 text-sm">cookieConsent</td>
                            <td className="px-4 py-3 text-sm">Remembers your cookie consent choice</td>
                            <td className="px-4 py-3 text-sm">1 year</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Analytics Cookies</h3>
            <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously.
            </p>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-slate-200 dark:border-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Cookie Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Purpose</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-3 text-sm">_ga</td>
                            <td className="px-4 py-3 text-sm">Google Analytics - distinguishes unique users</td>
                            <td className="px-4 py-3 text-sm">2 years</td>
                        </tr>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-3 text-sm">_ga_*</td>
                            <td className="px-4 py-3 text-sm">Google Analytics - persists session state</td>
                            <td className="px-4 py-3 text-sm">2 years</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Advertising Cookies</h3>
            <p>
                These cookies are used to deliver advertisements that are relevant to you. They also limit the number
                of times you see an advertisement and help measure the effectiveness of advertising campaigns.
            </p>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-slate-200 dark:border-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Service</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Purpose</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border-b border-slate-200 dark:border-slate-700">Provider</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-3 text-sm">Google AdSense</td>
                            <td className="px-4 py-3 text-sm">Displays relevant advertisements and measures ad performance</td>
                            <td className="px-4 py-3 text-sm">Google LLC</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Third-Party Cookies</h2>
            <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics
                of the service and deliver advertisements. These third parties have their own privacy policies:
            </p>
            <ul>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google Privacy Policy</a></li>
                <li><a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google AdSense and Cookies</a></li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
                computer and you can set most browsers to prevent them from being placed. However, if you do this, you
                may have to manually adjust some preferences every time you visit a site and some services and functionalities
                may not work.
            </p>

            <h3>Browser Settings</h3>
            <p>Most web browsers allow some control of cookies through the browser settings:</p>
            <ul>
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>

            <h3>Opt-Out Options</h3>
            <p>You can opt out of interest-based advertising from Google:</p>
            <ul>
                <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google Ads Settings</a> - Manage personalized advertising</li>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                <li><a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Digital Advertising Alliance (DAA) Opt-Out</a></li>
            </ul>

            <h2>More Information</h2>
            <p>To find out more about cookies, including how to see what cookies have been set and how to manage them, visit:</p>
            <ul>
                <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">www.aboutcookies.org</a></li>
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">www.allaboutcookies.org</a></li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
                new Cookie Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about our use of cookies, please contact us at:{' '}
                <a href="mailto:denesdvaghani9200@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">denesdvaghani9200@gmail.com</a>
            </p>

        </LegalLayout>
    );
}
