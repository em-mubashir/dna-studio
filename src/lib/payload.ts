import { getPayload } from 'payload'
import config from '@/src/payload/payload.config'

let cachedPayload: any = null

/**
 * Get Payload client instance with caching
 * Reuses the same instance across requests for better performance
 */
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config })
  return cachedPayload
}

/**
 * Fetch a page by slug from Payload CMS
 * @param slug - Page slug (e.g., 'home', 'about')
 * @returns Page data or null if not found
 */
export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    return result.docs[0] || null
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch featured portfolio items
 * @param limit - Number of items to fetch (default: 6)
 * @returns Array of portfolio items
 */
export async function getFeaturedPortfolio(limit: number = 6) {
  try {
    const payload = await getPayloadClient()
    
    const result = await payload.find({
      collection: 'portfolio',
      where: {
        featured: {
          equals: true,
        },
      },
      limit,
      sort: '-order',
    })

    return result.docs
  } catch (error) {
    console.error('Error fetching featured portfolio:', error)
    return []
  }
}

/**
 * Fetch all services
 * @returns Array of services
 */
export async function getServices() {
  try {
    const payload = await getPayloadClient()
    
    const result = await payload.find({
      collection: 'services',
      sort: 'order',
    })

    return result.docs
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}
