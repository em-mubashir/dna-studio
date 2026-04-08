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
 * Fetch all team members ordered by display order
 */
export async function getTeamMembers() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'team',
      sort: 'order',
      limit: 50,
      depth: 1,
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

/**
 * Fetch all timeline items ordered by year/order
 */
export async function getTimelineItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'timeline',
      sort: 'order',
      limit: 50,
      depth: 1,
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching timeline items:', error)
    return []
  }
}

/**
 * Fetch all clients/partners ordered by display order
 */
export async function getClients() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'clients',
      sort: 'order',
      limit: 50,
      depth: 1,
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching clients:', error)
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
      depth: 2,
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


/**
 * Fetch related blog posts (same category, excluding current post)
 * @param currentSlug - Current blog post slug to exclude
 * @param category - Category to match
 * @param limit - Number of related posts to return (default: 2)
 * @returns Array of related blog posts
 */
export async function getRelatedBlogPosts(currentSlug: string, category: string, limit: number = 2) {
  try {
    const payload = await getPayloadClient()

    // First try same category
    const result = await payload.find({
      collection: 'blog',
      where: {
        slug: { not_equals: currentSlug },
        category: { equals: category },
        status: { equals: 'published' },
      },
      sort: '-publishedDate',
      limit,
      depth: 2,
    })

    let posts = result.docs || []

    // If not enough posts in same category, fill with any other published posts
    if (posts.length < limit) {
      const remaining = limit - posts.length
      const excludeSlugs = [currentSlug, ...posts.map((d: any) => d.slug)]
      const fallback = await payload.find({
        collection: 'blog',
        where: {
          slug: { not_in: excludeSlugs },
          status: { equals: 'published' },
        },
        sort: '-publishedDate',
        limit: remaining,
        depth: 2,
      })
      posts = [...posts, ...(fallback.docs || [])]
    }

    return posts
  } catch (error) {
    console.error('Error fetching related blog posts:', error)
    return []
  }
}


/**
 * Fetch all published works ordered by display order
 */
export async function getWorks() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'works',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 100,
      depth: 2,
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching works:', error)
    return []
  }
}

/**
 * Fetch a single work by slug
 */
export async function getWorkBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'works',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error(`Error fetching work with slug "${slug}":`, error)
    return null
  }
}
