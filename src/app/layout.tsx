import type { ReactNode } from 'react'

/* Root layout — intentionally minimal.
   Each route group ((frontend) and (payload)) provides its own <html>/<body>. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
