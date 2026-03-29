import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Content',
  },
  access: {
    // Admins and editors can upload media
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read media
    read: () => true,
    // Admins and editors can update media
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete media
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 90 },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    filesRequiredOnCreate: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Auto-generate alt text from filename if missing on create
        if (!data.alt && operation === 'create' && data.filename) {
          data.alt = data.filename
            .replace(/\.[^/.]+$/, '') // Remove file extension
            .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
            .replace(/\b\w/g, (char: string) => char.toUpperCase()); // Capitalize first letter of each word
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Required for accessibility. Describe the image content.',
      },
    },
    {
      name: 'caption_en',
      type: 'text',
      label: 'Caption (English)',
    },
    {
      name: 'caption_ar',
      type: 'text',
      label: 'Caption (Arabic)',
    },
  ],
}
