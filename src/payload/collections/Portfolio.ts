import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'slug', 'category', 'client', 'featured', 'completedDate'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create portfolio items
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read published portfolio items
    read: () => true,
    // Admins and editors can update portfolio items
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete portfolio items
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
        description: 'URL-friendly identifier (e.g., "my-project")',
      },
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      label: 'Client Name',
      admin: {
        description: 'Name of the client for this project',
      },
    },
    {
      name: 'description_en',
      type: 'richText',
      required: true,
      label: 'Description (English)',
      admin: {
        description: 'Full project description and details',
      },
    },
    {
      name: 'description_ar',
      type: 'richText',
      required: true,
      label: 'Description (Arabic)',
      admin: {
        description: 'Full project description and details',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        {
          label: 'Commercial',
          value: 'commercial',
        },
        {
          label: 'Corporate',
          value: 'corporate',
        },
        {
          label: 'Documentary',
          value: 'documentary',
        },
        {
          label: 'Animation',
          value: 'animation',
        },
        {
          label: 'Event',
          value: 'event',
        },
      ],
    },
    {
      name: 'video_url',
      type: 'text',
      required: true,
      label: 'Video URL (Vimeo)',
      admin: {
        description: 'Full Vimeo URL (e.g., "https://vimeo.com/123456789") or just the ID',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Thumbnail Image',
      admin: {
        description: 'Project thumbnail for grid display (recommended: 1280×720px, 16:9 aspect ratio)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        description: 'Display this project on the homepage',
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
    {
      name: 'completedDate',
      type: 'date',
      required: true,
      label: 'Completion Date',
      admin: {
        description: 'When this project was completed',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    // SEO Fields
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'meta_title_en',
          type: 'text',
          label: 'Meta Title (English)',
          admin: {
            description: 'Recommended: 50-60 characters. Defaults to project title if empty.',
          },
        },
        {
          name: 'meta_title_ar',
          type: 'text',
          label: 'Meta Title (Arabic)',
          admin: {
            description: 'Recommended: 50-60 characters. Defaults to project title if empty.',
          },
        },
        {
          name: 'meta_description_en',
          type: 'textarea',
          label: 'Meta Description (English)',
          admin: {
            description: 'Recommended: 150-160 characters.',
          },
        },
        {
          name: 'meta_description_ar',
          type: 'textarea',
          label: 'Meta Description (Arabic)',
          admin: {
            description: 'Recommended: 150-160 characters.',
          },
        },
        {
          name: 'og_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
          admin: {
            description: 'Recommended size: 1200×630px. Defaults to thumbnail if empty.',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
