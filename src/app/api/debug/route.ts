import { getPayload } from 'payload'
import config from '@/src/payload/payload.config'

export async function GET() {
  const report: Record<string, any> = {
    timestamp: new Date().toISOString(),
    node_version: process.version,
    env: {
      DATABASE_URI: process.env.DATABASE_URI
        ? `${process.env.DATABASE_URI.substring(0, 25)}...${process.env.DATABASE_URI.substring(process.env.DATABASE_URI.indexOf('@'))}` 
        : 'MISSING',
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? `set (${process.env.PAYLOAD_SECRET.length} chars)` : 'MISSING',
      NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'MISSING',
      NODE_ENV: process.env.NODE_ENV || 'MISSING',
      S3_BUCKET: process.env.S3_BUCKET || 'MISSING',
      S3_REGION: process.env.S3_REGION || 'MISSING',
      S3_ENDPOINT: process.env.S3_ENDPOINT || 'MISSING',
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID ? `set (${process.env.S3_ACCESS_KEY_ID.length} chars)` : 'MISSING',
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ? `set (${process.env.S3_SECRET_ACCESS_KEY.length} chars)` : 'MISSING',
    },
    db: 'untested',
    payload_init: 'untested',
    users_count: 'untested',
    collections: 'untested',
  }

  // Step 1: Try to initialize Payload
  let payload: any = null
  try {
    payload = await getPayload({ config })
    report.payload_init = 'success'
    report.collections = payload.collections
      ? Object.keys(payload.collections)
      : 'none'
  } catch (err: any) {
    report.payload_init = 'FAILED'
    report.payload_init_error = err?.message || String(err)
    report.payload_init_stack = err?.stack?.split('\n').slice(0, 5)
    return Response.json(report, { status: 503 })
  }

  // Step 2: Try a DB query
  try {
    const users = await payload.find({ collection: 'users', limit: 1 })
    report.db = 'connected'
    report.users_count = users.totalDocs
    report.has_admin = users.totalDocs > 0
  } catch (err: any) {
    report.db = 'FAILED'
    report.db_error = err?.message || String(err)
    report.db_error_name = err?.name
    report.db_error_code = err?.code
    report.db_error_stack = err?.stack?.split('\n').slice(0, 5)
  }

  const statusCode = report.db === 'connected' ? 200 : 503
  return Response.json(report, { status: statusCode })
}
