import { Metadata } from 'next';
import JsonFormatterClient from './JsonFormatterClient';

export const metadata: Metadata = {
    title: 'JSON Formatter, Validator & Beautifier | TextGauge',
    description: 'Free online JSON tool: Format, validate, minify, and beautify JSON instantly. Fix errors and clean up your code.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minify', 'online json tool', 'debug json'],
    alternates: {
        canonical: 'https://textgauge.com/json-formatter',
    },
    openGraph: {
        title: 'JSON Formatter & Validator',
        description: 'Format, validate, and beautify JSON data instantly in your browser.',
        url: 'https://textgauge.com/json-formatter',
        type: 'website',
    }
};

export default function JsonFormatterPage() {
    return <JsonFormatterClient />;
}
