import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DNA Media',
  description: 'Premium video production company',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
