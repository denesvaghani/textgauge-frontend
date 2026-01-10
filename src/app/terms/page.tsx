import { LegalLayout } from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | TextGauge',
    description: 'Terms of Service for TextGauge - Read our terms and conditions for using our developer tools suite.',
};

export default function TermsPage() {
    return (
        <LegalLayout title="Terms of Service">
            <p className="lead">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>Agreement to Terms</h2>
            <p>
                By accessing or using TextGauge, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>

            <h2>Use License</h2>
            <p>
                Permission is granted to temporarily use TextGauge for personal, non-commercial purposes. This is the
                grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software contained on TextGauge</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
                The materials on TextGauge are provided on an 'as is' basis. TextGauge makes no warranties, expressed
                or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
            </p>

            <h2>Limitations</h2>
            <p>
                In no event shall TextGauge or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use TextGauge, even if TextGauge or an authorized representative has been notified orally or in writing
                of the possibility of such damage.
            </p>

            <h2>Accuracy of Materials</h2>
            <p>
                The materials appearing on TextGauge could include technical, typographical, or photographic errors.
                TextGauge does not warrant that any of the materials on its website are accurate, complete, or current.
                TextGauge may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2>Links</h2>
            <p>
                TextGauge has not reviewed all of the sites linked to its website and is not responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by TextGauge of the site.
                Use of any such linked website is at the user's own risk.
            </p>

            <h2>Modifications</h2>
            <p>
                TextGauge may revise these Terms of Service at any time without notice. By using this website you are
                agreeing to be bound by the then current version of these Terms of Service.
            </p>

            <h2>Third-Party AI Services</h2>
            <p>
                TextGauge's "Rephrase" feature uses Google's Gemini AI API to process your text. When you use this feature:
            </p>
            <ul>
                <li>Your text is sent to Google's Gemini API for processing</li>
                <li>Google's terms of service and privacy policy apply to this data</li>
                <li>We do not store the text you send or receive from the AI service</li>
                <li>This feature is optional and requires explicit user action to activate</li>
            </ul>
            <p>
                By using the Rephrase feature, you acknowledge and consent to your text being processed by Google's Gemini AI.
            </p>

            <h2>Governing Law</h2>
            <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of India. 
                Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction 
                of the courts located in Gujarat, India. By using TextGauge, you consent to the jurisdiction of such courts.
            </p>

            <h2>Contact Information</h2>
            <p>
                If you have any questions about these Terms of Service, please contact us at:{' '}
                <a href="mailto:denesdvaghani9200@gmail.com">denesdvaghani9200@gmail.com</a>
            </p>

            <p className="text-sm text-slate-500 mt-8">
                Version 1.1 • Effective: January 10, 2026
            </p>
        </LegalLayout>
    );
}
