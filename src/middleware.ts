import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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

    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous'
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
  matcher: ['/api/contact/:path*', '/api/blog/:path*', '/api/health/:path*'],
}
