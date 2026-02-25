import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'slug', 'category', 'featured', 'order'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create services
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read services
    read: () => true,
    // Admins and editors can update services
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete services
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Title (English)',
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Title (Arabic)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly identifier (e.g., "video-production")',
      },
    },
    {
      name: 'description_en',
      type: 'textarea',
      required: true,
      label: 'Description (English)',
      admin: {
        description: 'Short description of the service (150-200 characters)',
      },
    },
    {
      name: 'description_ar',
      type: 'textarea',
      required: true,
      label: 'Description (Arabic)',
      admin: {
        description: 'Short description of the service (150-200 characters)',
      },
    },
    {
      name: 'content_en',
      type: 'richText',
      label: 'Full Content (English)',
      admin: {
        description: 'Detailed service information (optional)',
      },
    },
    {
      name: 'content_ar',
      type: 'richText',
      label: 'Full Content (Arabic)',
      admin: {
        description: 'Detailed service information (optional)',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Service Icon',
      admin: {
        description: 'Icon or image representing this service (recommended: 200×200px)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        {
          label: 'Video Production',
          value: 'video-production',
        },
        {
          label: 'Post Production',
          value: 'post-production',
        },
        {
          label: 'Animation',
          value: 'animation',
        },
        {
          label: 'Photography',
          value: 'photography',
        },
        {
          label: 'Consulting',
          value: 'consulting',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        description: 'Categorize this service for filtering',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Service',
      defaultValue: false,
      admin: {
        description: 'Display this service prominently on the homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first (0 = highest priority)',
      },
    },
  ],
  timestamps: true,
}
