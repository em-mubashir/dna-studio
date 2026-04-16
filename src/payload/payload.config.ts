import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'
import { Team } from './collections/Team'
import { Clients } from './collections/Clients'
import { Timeline } from './collections/Timeline'
import { Works } from './collections/Works'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- DNA Studio CMS',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [Users, Pages, Blog, Works, Team, Clients, Timeline, Media],

  globals: [Settings],

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/dna-media',
    connectOptions: {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
      compressors: ['zlib'],
      appName: 'DNA-Studio-Website',
    },
  }),

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
    ],
  }),

  secret: process.env.PAYLOAD_SECRET || 'dna-studio-dev-secret-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, '../payload-types.ts'),
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),

  // Disable GraphQL to reduce dependencies — enable later if needed
  graphQL: {
    disable: true,
  },

  telemetry: false,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION || 'nyc3',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: false,
      },
    }),
  ],
})
