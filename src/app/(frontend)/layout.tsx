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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'),
  title: {
    default: 'DNA Media - Premium Video Production',
    template: '%s | DNA Media',
  },
  description: 'Premium video production company specializing in commercial, corporate, and documentary content',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DNA Media',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
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
