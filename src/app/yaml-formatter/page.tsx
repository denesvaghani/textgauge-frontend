import { Metadata } from 'next';
import YamlFormatterClient from './YamlFormatterClient';

export const metadata: Metadata = {
    title: 'YAML Formatter, Validator & Beautifier | TextGauge',
    description: 'Free online YAML tool: Format, validate, and beautify YAML files. Convert JSON to YAML and fix syntax errors instantly.',
    keywords: ['yaml formatter', 'yaml validator', 'yaml beautifier', 'json to yaml', 'yaml parser', 'online yaml tool'],
    alternates: {
        canonical: 'https://textgauge.com/yaml-formatter',
    },
    openGraph: {
        title: 'YAML Formatter & Validator',
        description: 'Format, validate, and beautify YAML configuration files instantly.',
        url: 'https://textgauge.com/yaml-formatter',
        type: 'website',
    }
};

export default function YamlFormatterPage() {
    return <YamlFormatterClient />;
}
