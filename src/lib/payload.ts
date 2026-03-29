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
      depth: 2, // Populate media relationships
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
 * Fetch blog posts with pagination and optional category filter
 * @param page - Page number (1-indexed)
 * @param limit - Number of posts per page (default: 12)
 * @param category - Optional category filter
 * @returns Object with blog posts and pagination info
 */
export async function getBlogPosts(page: number = 1, limit: number = 12, category?: string) {
  try {
    const payload = await getPayloadClient()
    
    const where: any = {
      status: {
        equals: 'published',
      },
    }

    if (category) {
      where.category = {
        equals: category,
      }
    }

    const result = await payload.find({
      collection: 'blog',
      where,
      limit,
      page,
      sort: '-publishedDate',
    })

    return {
      docs: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

/**
 * Fetch a single blog post by slug
 * @param slug - Blog post slug
 * @returns Blog post data or null if not found
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    
    const result = await payload.find({
      collection: 'blog',
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
    console.error(`Error fetching blog post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all published blog post slugs for static generation
 * @returns Array of blog post slugs
 */
export async function getAllBlogSlugs() {
  try {
    const payload = await getPayloadClient()
    
    const result = await payload.find({
      collection: 'blog',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    })

    return result.docs.map((post: any) => post.slug)
  } catch (error) {
    console.error('Error fetching blog slugs:', error)
    return []
  }
}
