import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position_en', 'order'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create team members
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read team members
    read: () => true,
    // Admins and editors can update team members
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete team members
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        description: 'Team member\'s full name',
      },
    },
    {
      name: 'position_en',
      type: 'text',
      required: true,
      label: 'Position (English)',
      admin: {
        description: 'Job title or role (e.g., "Creative Director")',
      },
    },
    {
      name: 'position_ar',
      type: 'text',
      required: true,
      label: 'Position (Arabic)',
      admin: {
        description: 'Job title or role in Arabic',
      },
    },
    {
      name: 'bio_en',
      type: 'textarea',
      required: true,
      label: 'Bio (English)',
      admin: {
        description: 'Short biography (150-250 characters)',
      },
    },
    {
      name: 'bio_ar',
      type: 'textarea',
      required: true,
      label: 'Bio (Arabic)',
      admin: {
        description: 'Short biography in Arabic (150-250 characters)',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
      admin: {
        description: 'Team member photo (recommended: 400×400px, square aspect ratio)',
      },
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn URL',
      admin: {
        description: 'Full LinkedIn profile URL (optional)',
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
