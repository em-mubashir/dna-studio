/**
 * Safely extract a URL from a Payload CMS media field.
 *
 * Media fields can be:
 *  - A populated object with a `url` property (normal case)
 *  - A raw string that is a full URL (already resolved)
 *  - A raw string that is just a Mongo ObjectId (unpopulated relation)
 *  - null / undefined
 *
 * This helper returns a usable URL string or null, filtering out
 * bare IDs that would break next/image.
 *
 * It also normalises Payload media proxy URLs so they work with next/image:
 *  - Strips the origin when it matches NEXT_PUBLIC_SERVER_URL (same-origin)
 *  - Removes query strings (e.g. ?prefix=media) that next/image rejects
 */
export function getImageUrl(field: unknown): string | null {
  if (!field) return null

  let raw: string | null = null

  // Populated object — grab .url
  if (typeof field === 'object' && field !== null && 'url' in field) {
    const url = (field as Record<string, unknown>).url
    if (typeof url === 'string') raw = url
  }

  // String — could be a URL or a bare ObjectId
  if (typeof field === 'string') raw = field

  if (!raw || !isValidImageSrc(raw)) return null

  return normaliseForNextImage(raw)
}

/**
 * Returns true when the string looks like a usable image src
 * (absolute URL or root-relative path).
 */
function isValidImageSrc(src: string): boolean {
  if (!src) return false
  return src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://')
}

/**
 * Make a Payload media URL compatible with next/image:
 *
 * 1. Convert same-origin absolute URLs to relative paths.
 *    next/image treats relative paths as same-origin and skips remotePatterns
 *    validation entirely — no need to whitelist localhost or the prod domain.
 *
 * 2. Strip query strings from /api/media/ paths.
 *    Payload appends ?prefix=media which next/image's optimiser rejects.
 *    The prefix is already baked into the pathname by the static handler.
 */
function normaliseForNextImage(url: string): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

  // Strip same-origin prefix → "/api/media/file/foo.png?prefix=media"
  let result = url
  if (serverUrl && result.startsWith(serverUrl)) {
    result = result.slice(serverUrl.length)
  }

  // For Payload media proxy paths, strip the query string.
  // The static handler resolves the prefix from the DB when no query param
  // is present, so the image still loads correctly.
  if (result.startsWith('/api/media/')) {
    const qIndex = result.indexOf('?')
    if (qIndex !== -1) {
      result = result.slice(0, qIndex)
    }
  }

  return result
}
