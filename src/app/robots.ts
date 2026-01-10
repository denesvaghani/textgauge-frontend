import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
 
export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = 'https://www.countcharacters.org'
 
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
