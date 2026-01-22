import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/ArticleLayout';
import { 
  LEARN_ARTICLES, 
  getArticleBySlug, 
  getAllArticleSlugs 
} from '@/config/learnArticles';

// Generate static params for all articles
export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata dynamically for each article
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const baseUrl = 'https://www.countcharacters.org';
  
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `${baseUrl}/learn/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `${baseUrl}/learn/${article.slug}`,
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate || article.publishDate,
      authors: ['TextGauge Team'],
      tags: article.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

// Generate article schema for SEO
function generateArticleSchema(article: typeof LEARN_ARTICLES[0]) {
  const baseUrl = 'https://www.countcharacters.org';
  
  const schemas = [
    // Article schema
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: `${baseUrl}/images/og-image.png`,
      datePublished: article.publishDate,
      dateModified: article.updatedDate || article.publishDate,
      author: {
        '@type': 'Organization',
        name: 'TextGauge',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'TextGauge',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo/sunflower-logo.webp`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/learn/${article.slug}`,
      },
      keywords: article.keywords.join(', '),
    },
  ];

  // Add FAQPage schema if article has FAQs
  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    } as any);
  }

  return schemas;
}

export default async function LearnArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const schemas = generateArticleSchema(article);

  return (
    <>
      {/* Schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ArticleLayout article={article} />
    </>
  );
}
