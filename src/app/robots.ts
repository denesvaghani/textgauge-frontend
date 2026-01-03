import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
 
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host') || 'www.countcharacters.org'
  const protocol = 'https' // Force HTTPS
  const domain = host.includes('countcharacters.in') ? 'www.countcharacters.in' : 'www.countcharacters.org'
  const baseUrl = `${protocol}://${domain}`
 
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
