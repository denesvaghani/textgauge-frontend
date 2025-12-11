import { LegalLayout } from "@/components/LegalLayout";
import Link from "next/link";

export default function TermsPage() {
    return (
        <LegalLayout title="Terms of Service" date={new Date().toLocaleDateString()}>
            <p className="lead">
                By accessing TextGauge, you agree to these terms. Please read them carefully.
            </p>

            <h3>1. Usage License</h3>
            <p>
                TextGauge grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site.
                All tools (Character Counter, Formatters, Converters) are free to use for personal and commercial purposes.
            </p>

            <h3>2. Disclaimer</h3>
            <p>
                The materials on TextGauge&apos;s website are provided on an &apos;as is&apos; basis.
                TextGauge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3>3. Data & Privacy</h3>
            <p>
                We prioritize your privacy. As detailed in our <Link href="/privacy">Privacy Policy</Link>,
                our core tools operate primarily client-side. We do not claim ownership of any data you process using our tools.
            </p>

            <h3>4. Limitations</h3>
            <p>
                In no event shall TextGauge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on TextGauge&apos;s website.
            </p>
        </LegalLayout>
    );
}
