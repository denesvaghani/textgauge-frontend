import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.countcharacters.org'
 
  return {
    rules: [
      {
        // Primary crawlers - full access
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        // AI crawlers - allow for visibility
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'Anthropic-AI'],
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // All other bots
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
