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
    default: 'DNA Studio - Premium Video Production',
    template: '%s | DNA Studio',
  },
  description: 'Premium video production company specializing in commercial, corporate, and documentary content',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DNA Studio',
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
    <html suppressHydrationWarning style={{ overflowX: 'hidden' }}>
      <body className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning style={{ overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
