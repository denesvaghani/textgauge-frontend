import { Metadata } from 'next';
import { CsvJsonConverter } from '@/components/CsvJsonConverter';

export const metadata: Metadata = {
    title: 'CSV to JSON Converter | Free Online Data Tool - TextGauge',
    description: 'Convert CSV files (up to 25MB) to JSON format instantly. Free online CSV to JSON converter with file upload support.',
};

export default function CsvToJsonPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950/50">
            <CsvJsonConverter />
        </main>
    );
}
