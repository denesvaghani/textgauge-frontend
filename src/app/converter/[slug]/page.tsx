import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConverterLayout } from '@/components/converter/ConverterLayout';
import { ConversionFormat } from '@/types/converter';

type Props = {
    params: Promise<{ slug: string }>;
};

const VALID_FORMATS: ConversionFormat[] = ['json', 'yaml', 'csv', 'toml'];

function parseSlug(slug: string): { from: ConversionFormat; to: ConversionFormat } | null {
    const parts = slug.split('-to-');
    if (parts.length !== 2) return null;

    const from = parts[0] as ConversionFormat;
    const to = parts[1] as ConversionFormat;

    if (VALID_FORMATS.includes(from) && VALID_FORMATS.includes(to) && from !== to) {
        return { from, to };
    }

    return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parsed = parseSlug(slug);

    if (!parsed) {
        return { title: 'Converter Not Found' };
    }

    const from = parsed.from.toUpperCase();
    const to = parsed.to.toUpperCase();

    return {
        title: `Convert ${from} to ${to} Online - Free Developer Tool`,
        description: `Fast, secure, and free online ${from} to ${to} converter. Transform your data instantly in your browser without sending files to server.`,
        alternates: {
            canonical: `https://www.countcharacters.org/converter/${slug}`,
        },
    };
}

export default async function ConverterPage({ params }: Props) {
    const { slug } = await params;
    const parsed = parseSlug(slug);

    if (!parsed) {
        notFound();
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
                        {parsed.from.toUpperCase()} to {parsed.to.toUpperCase()} Converter
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Professional developer tool to convert {parsed.from.toUpperCase()} data to {parsed.to.toUpperCase()} format safely in your browser.
                    </p>
                </div>
            </div>

            <ConverterLayout defaultFrom={parsed.from} defaultTo={parsed.to} />
        </div>
    );
}

// Generate static params for common pairs to speed up build/runtime
export function generateStaticParams() {
    const pairs: { slug: string }[] = [];

    for (const from of VALID_FORMATS) {
        for (const to of VALID_FORMATS) {
            if (from !== to) {
                pairs.push({ slug: `${from}-to-${to}` });
            }
        }
    }

    return pairs;
}
