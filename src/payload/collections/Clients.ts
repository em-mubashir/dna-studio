import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'website', 'order'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create clients
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read clients
    read: () => true,
    // Admins and editors can update clients
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete clients
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
      admin: {
        description: 'Name of the client or company',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Client Logo',
      admin: {
        description: 'Client logo image (recommended: max 200px width, transparent background)',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
      admin: {
        description: 'Client website URL (optional, e.g., "https://example.com")',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first in the carousel (0 = highest priority)',
      },
    },
  ],
  timestamps: true,
}
