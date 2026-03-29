import type { CollectionConfig } from 'payload'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['year', 'title_en', 'type', 'order'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create timeline items
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read timeline items
    read: () => true,
    // Admins and editors can update timeline items
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete timeline items
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Year',
      admin: {
        description: 'Year of the milestone or award (e.g., 2024)',
      },
    },
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Title (English)',
      admin: {
        description: 'Milestone or award title (e.g., "Company Founded", "Best Video Production Award")',
      },
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Title (Arabic)',
      admin: {
        description: 'Milestone or award title in Arabic',
      },
    },
    {
      name: 'description_en',
      type: 'textarea',
      required: true,
      label: 'Description (English)',
      admin: {
        description: 'Brief description of the milestone or award (100-200 characters)',
      },
    },
    {
      name: 'description_ar',
      type: 'textarea',
      required: true,
      label: 'Description (Arabic)',
      admin: {
        description: 'Brief description of the milestone or award in Arabic (100-200 characters)',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Type',
      options: [
        {
          label: 'Milestone',
          value: 'milestone',
        },
        {
          label: 'Award',
          value: 'award',
        },
      ],
      admin: {
        description: 'Categorize as a company milestone or an award received',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon/Image',
      admin: {
        description: 'Optional icon or image for this timeline item (recommended: 200×200px)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first (0 = highest priority). Typically ordered by year.',
      },
    },
  ],
  timestamps: true,
}
