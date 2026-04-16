import Link from 'next/link'

// Minimal root not-found — each route group ((frontend), (payload)) handles its own 404
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <p>Page not found. <Link href="/en">Go home</Link></p>
      </body>
    </html>
  )
}
