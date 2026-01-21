import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConverterLayout } from '@/components/converter/ConverterLayout';
import { ConversionFormat } from '@/types/converter';
import { SmartHeroHeader, HeroDescription } from '@/components/SmartHeroHeader';
import { flowerThemes } from '@/config/flowerThemes';

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
            <SmartHeroHeader 
                title={`${parsed.from.toUpperCase()} to ${parsed.to.toUpperCase()} Converter`}
                theme={flowerThemes.lavender}
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER}
            />

            <section className="max-w-5xl mx-auto px-4 py-4">
                <h2 className="sr-only">Convert {parsed.from.toUpperCase()} to {parsed.to.toUpperCase()} Online</h2>
            </section>
            
            <ConverterLayout defaultFrom={parsed.from} defaultTo={parsed.to} />

             <HeroDescription text={`Professional developer tool to convert ${parsed.from.toUpperCase()} data to ${parsed.to.toUpperCase()} format safely in your browser.`} />
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
