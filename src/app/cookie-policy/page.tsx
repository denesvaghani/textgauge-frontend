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
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            <ul>
                <li><strong>Theme Preference:</strong> Remembers your dark/light mode preference</li>
                <li><strong>Local Storage:</strong> Saves your input data locally in your browser</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously.
            </p>
            <ul>
                <li><strong>Google Analytics:</strong> Tracks page views, session duration, and user behavior</li>
            </ul>

            <h3>Advertising Cookies</h3>
            <p>
                These cookies are used to deliver advertisements that are relevant to you. They also limit the number
                of times you see an advertisement and help measure the effectiveness of advertising campaigns.
            </p>
            <ul>
                <li><strong>Google AdSense:</strong> Displays relevant advertisements based on your interests</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics
                of the service and deliver advertisements.
            </p>

            <h2>Managing Cookies</h2>
            <p>
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
                computer and you can set most browsers to prevent them from being placed. However, if you do this, you
                may have to manually adjust some preferences every time you visit a site and some services and functionalities
                may not work.
            </p>

            <h3>Browser Settings</h3>
            <p>Most web browsers allow some control of cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit:</p>
            <ul>
                <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a></li>
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a></li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
                new Cookie Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about our use of cookies, please contact us at:{' '}
                <a href="mailto:denesdvaghani9200@gmail.com">denesdvaghani9200@gmail.com</a>
            </p>
        </LegalLayout>
    );
}
