import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const languages = ['en', 'ar']
const defaultLanguage = 'en'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle language routing for frontend pages
  // Skip if it's an API route, admin route, or static file
  if (
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/_next') &&
    !pathname.includes('.')
  ) {
    // Check if pathname starts with a language code
    const pathnameHasLocale = languages.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // If no language in pathname and it's the root, redirect to default language
    if (!pathnameHasLocale && pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url))
    }

    // If no language in pathname but it's not root, redirect to default language with path
    if (!pathnameHasLocale && pathname !== '/') {
      return NextResponse.redirect(new URL(`/${defaultLanguage}${pathname}`, request.url))
    }
  }

  // Only rate-limit custom API routes (not Payload's own API)
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  // Skip rate limiting if Redis is not configured
  if (!redisUrl || !redisToken || !redisUrl.startsWith('https://')) {
    return NextResponse.next()
  }

  try {
    // Dynamic import so the module never loads when credentials are absent
    const { Ratelimit } = await import('@upstash/ratelimit')
    const { Redis } = await import('@upstash/redis')

    const redis = new Redis({ url: redisUrl, token: redisToken })
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: 'dna-media-ratelimit',
    })

    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous'
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    const response = success
      ? NextResponse.next()
      : NextResponse.json({ error: 'Too many requests.' }, { status: 429 })

    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())
    return response
  } catch {
    // If rate limiting fails, allow the request through
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes (handled separately)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
