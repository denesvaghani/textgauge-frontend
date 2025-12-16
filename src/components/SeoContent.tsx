import Link from "next/link";

interface SeoLink {
    label: string;
    href: string;
}

interface SeoContentProps {
    toolName: string; // e.g., "JSON"
    description?: string;
    knowMoreLinks: SeoLink[];
    helperTasks: SeoLink[];
    discoverLinks: SeoLink[];
    features?: string[];
    contentSections?: {
        id: string;
        title: string;
        content: React.ReactNode;
    }[];
}

export function SeoContent({
    toolName,
    description,
    knowMoreLinks,
    helperTasks,
    discoverLinks,
    features,
    contentSections,
}: SeoContentProps) {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-12 space-y-12 bg-white dark:bg-slate-950">

            {/* Know More Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Know more about {toolName}.
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-indigo-500 dark:text-indigo-400">
                    {knowMoreLinks.map((link, i) => (
                        <li key={i}>
                            <Link href={link.href} className="hover:underline">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Description / Subtitle */}
            {description && (
                <section>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                        {description}
                    </p>
                </section>
            )}

            {/* Helper Tasks Section */}
            <section className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {toolName} Beautifier helps to perform below tasks:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8 text-sm text-indigo-500 dark:text-indigo-400">
                    {helperTasks.map((link, i) => (
                        <div key={i}>
                            <Link href={link.href} className="hover:underline block py-1">
                                {link.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features List Section */}
            {features && features.length > 0 && (
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        Key Features
                    </h3>
                    <ul className="space-y-3">
                        {features.map((feature, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Content Sections (Definitions, Examples, etc.) */}
            {contentSections && contentSections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        {section.title}
                    </h3>
                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                        {section.content}
                    </div>
                </section>
            ))}

            {/* Discover More Section */}
            {discoverLinks && discoverLinks.length > 0 && (
                <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Discover more
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {discoverLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4" />
                                        <path d="M12 8h.01" />
                                    </svg>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
