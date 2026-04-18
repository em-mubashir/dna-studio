const { withPayload } = require('@payloadcms/next/withPayload')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Skip type checking during build - the .next/dev/types auto-generated
  // stubs reference PrefetchForTypeCheckInternal which doesn't exist in 16.2.1
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image configuration for Next.js Image component
  images: {
    remotePatterns: [
      {
        // Payload CMS media API — images are proxied through Payload which
        // authenticates with S3 (bucket is private). In dev this is localhost,
        // in production it will be the deployed domain.
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        // DO Spaces CDN endpoint (enable CDN in your Space settings)
        protocol: 'https',
        hostname: '*.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Webpack configuration for Payload CMS
  webpack: (config) => {
    // Payload CMS requires these configurations
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    }
    
    return config
  },
}

module.exports = withPayload(nextConfig)
