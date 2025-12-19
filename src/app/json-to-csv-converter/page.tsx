import type { Metadata } from 'next';
import JsonCsvClient from './JsonCsvClient';

export const metadata: Metadata = {
    title: 'JSON to CSV Converter - Free Online Tool',
    description: 'Convert JSON to CSV instantly. Free, secure, and fast. Flattens nested objects automatically. Perfect for developers and data analysts.',
    alternates: {
        canonical: 'https://www.countcharacters.org/json-to-csv-converter',
    },
    openGraph: {
        title: 'JSON to CSV Converter - Free Online Tool',
        description: 'Convert JSON to CSV instantly with nested object flattening.',
        url: 'https://www.countcharacters.org/json-to-csv-converter',
        type: 'website',
    },
};

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'JSON to CSV Converter',
        url: 'https://www.countcharacters.org/json-to-csv-converter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'Convert JSON to CSV instantly. Flatten nested objects, handle large files, and download results.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <JsonCsvClient />
        </>
    );
}
