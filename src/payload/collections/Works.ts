import type { CollectionConfig } from 'payload'

export const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    useAsTitle: 'project_en',
    defaultColumns: ['project_en', 'slug', 'industry_en', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'editor') return true
      return { status: { equals: 'published' } }
    },
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // Basic Info
    { name: 'project_en', type: 'text', required: true, label: 'Project Name (English)' },
    { name: 'project_ar', type: 'text', required: true, label: 'Project Name (Arabic)' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: { description: 'URL-friendly identifier (e.g., "my-project")' },
    },
    { name: 'industry_en', type: 'text', required: true, label: 'Industry (English)' },
    { name: 'industry_ar', type: 'text', required: true, label: 'Industry (Arabic)' },
    {
      name: 'description_en',
      type: 'textarea',
      label: 'Description (English)',
      admin: { description: 'Project description shown on the detail page' },
    },
    {
      name: 'description_ar',
      type: 'textarea',
      label: 'Description (Arabic)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
      admin: { description: 'Square image recommended (896×896px). Used in the works grid.' },
    },
    { name: 'order', type: 'number', label: 'Order', defaultValue: 0 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },

    // Videos (carousel on detail page)
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      admin: { description: 'Videos shown in the horizontal carousel on the detail page' },
      fields: [
        { name: 'url', type: 'text', required: true, label: 'Video URL', admin: { description: 'Vimeo URL (e.g. https://vimeo.com/123456789) or direct video file URL (.mp4)' } },
        { name: 'thumbnail', type: 'text', label: 'Thumbnail URL', admin: { description: 'Optional — only used for direct video files, not Vimeo' } },
        { name: 'title', type: 'text', label: 'Video Title' },
      ],
    },

    // Credits
    {
      name: 'credits',
      type: 'group',
      label: 'Credits',
      fields: [
        { name: 'client_en', type: 'text', label: 'Client (English)' },
        { name: 'client_ar', type: 'text', label: 'Client (Arabic)' },
        { name: 'agency_en', type: 'text', label: 'Agency (English)' },
        { name: 'agency_ar', type: 'text', label: 'Agency (Arabic)' },
        { name: 'director_en', type: 'text', label: 'Director (English)' },
        { name: 'director_ar', type: 'text', label: 'Director (Arabic)' },
        { name: 'dop_en', type: 'text', label: 'DOP (English)' },
        { name: 'dop_ar', type: 'text', label: 'DOP (Arabic)' },
        { name: 'executiveProducer_en', type: 'text', label: 'Executive Producer (English)' },
        { name: 'executiveProducer_ar', type: 'text', label: 'Executive Producer (Arabic)' },
        { name: 'industry_en', type: 'text', label: 'Industry (English)' },
        { name: 'industry_ar', type: 'text', label: 'Industry (Arabic)' },
      ],
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        { name: 'meta_title_en', type: 'text', label: 'Meta Title (English)' },
        { name: 'meta_title_ar', type: 'text', label: 'Meta Title (Arabic)' },
        { name: 'meta_description_en', type: 'textarea', label: 'Meta Description (English)' },
        { name: 'meta_description_ar', type: 'textarea', label: 'Meta Description (Arabic)' },
        { name: 'og_image', type: 'upload', relationTo: 'media', label: 'Open Graph Image' },
      ],
    },
  ],
  timestamps: true,
}
