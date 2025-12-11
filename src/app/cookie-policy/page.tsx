import { LegalLayout } from "@/components/LegalLayout";

export default function CookiePolicyPage() {
    return (
        <LegalLayout title="Cookie Policy" date={new Date().toLocaleDateString()}>
            <p className="lead">
                This Cookie Policy explains how TextGauge uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <h3>What are cookies?</h3>
            <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
                as well as to provide reporting information.
            </p>

            <h3>How we use cookies</h3>
            <ul>
                <li>
                    <strong>Essential Cookies:</strong> These are strictly necessary for the website to function properly (e.g., saving your Theme preference).
                </li>
                <li>
                    <strong>Analytics Cookies:</strong> We use Google Analytics to collect information about how you interact with our website to improve our services.
                </li>
                <li>
                    <strong>Advertising Cookies:</strong> We use Google AdSense, which may set cookies to serve personalized ads based on your visits to this and other websites.
                </li>
            </ul>

            <h3>Your Choices</h3>
            <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your browser controls to accept or refuse cookies.
            </p>
        </LegalLayout>
    );
}
