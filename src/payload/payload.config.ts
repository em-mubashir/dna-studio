import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { lexicalEditorConfig } from './editor/lexical.config'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- DNA Media CMS',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [Users],

  globals: [],

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
      appName: 'DNA-Media-Website',
    },
  }),

  editor: lexicalEditor(lexicalEditorConfig),

  secret: process.env.PAYLOAD_SECRET || 'dna-media-dev-secret-change-in-production',

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
  plugins: [],
})
