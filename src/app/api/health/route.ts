import { getPayload } from 'payload'
import config from '@/src/payload/payload.config'

export async function GET() {
  const checks: Record<string, any> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URI: process.env.DATABASE_URI
        ? `${process.env.DATABASE_URI.slice(0, 30)}...` // partial, safe to log
        : 'MISSING',
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'set' : 'MISSING',
      NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'MISSING',
      S3_BUCKET: process.env.S3_BUCKET || 'MISSING',
      S3_ENDPOINT: process.env.S3_ENDPOINT || 'MISSING',
      NODE_ENV: process.env.NODE_ENV,
    },
    db: 'untested',
  }

  try {
    const payload = await getPayload({ config })
    // Run a lightweight query to confirm DB is reachable
    await payload.find({ collection: 'users', limit: 1 })
    checks.db = 'connected'
  } catch (err: any) {
    checks.db = 'error'
    checks.db_error = err?.message || String(err)
    checks.status = 'degraded'
  }

  const statusCode = checks.status === 'ok' ? 200 : 503
  return Response.json(checks, { status: statusCode })
}
