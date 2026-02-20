const { withPayload } = require('@payloadcms/next/withPayload')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
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
