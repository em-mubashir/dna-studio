import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create pages
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read published pages
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'editor') return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
    // Admins and editors can update pages
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete pages
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
        description: 'URL-friendly identifier (e.g., "home", "about", "contact")',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'heading_en',
          type: 'text',
          label: 'Heading (English)',
        },
        {
          name: 'heading_ar',
          type: 'text',
          label: 'Heading (Arabic)',
        },
        {
          name: 'subheading_en',
          type: 'textarea',
          label: 'Subheading (English)',
        },
        {
          name: 'subheading_ar',
          type: 'textarea',
          label: 'Subheading (Arabic)',
        },
        {
          name: 'background_video',
          type: 'text',
          label: 'Background Video (Vimeo ID)',
          admin: {
            description: 'Enter the Vimeo video ID (e.g., "123456789")',
          },
        },
        {
          name: 'background_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: {
            description: 'Fallback image if video is not available',
          },
        },
        {
          name: 'cta_text_en',
          type: 'text',
          label: 'CTA Button Text (English)',
        },
        {
          name: 'cta_text_ar',
          type: 'text',
          label: 'CTA Button Text (Arabic)',
        },
        {
          name: 'cta_link',
          type: 'text',
          label: 'CTA Button Link',
          admin: {
            description: 'URL or path (e.g., "/contact" or "https://example.com")',
          },
        },
      ],
    },
    // Flexible Content Sections
    {
      name: 'sections',
      type: 'array',
      label: 'Page Sections',
      admin: {
        description: 'Add flexible content sections to build your page',
      },
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          required: true,
          label: 'Section Type',
          options: [
            {
              label: 'Rich Text Content',
              value: 'richText',
            },
            {
              label: 'Two Column Layout',
              value: 'twoColumn',
            },
            {
              label: 'Image Gallery',
              value: 'gallery',
            },
            {
              label: 'Call to Action',
              value: 'cta',
            },
            {
              label: 'Custom HTML',
              value: 'custom',
            },
          ],
        },
        {
          name: 'heading_en',
          type: 'text',
          label: 'Section Heading (English)',
        },
        {
          name: 'heading_ar',
          type: 'text',
          label: 'Section Heading (Arabic)',
        },
        {
          name: 'content_en',
          type: 'richText',
          label: 'Content (English)',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'richText' || siblingData?.sectionType === 'twoColumn'
            },
          },
        },
        {
          name: 'content_ar',
          type: 'richText',
          label: 'Content (Arabic)',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'richText' || siblingData?.sectionType === 'twoColumn'
            },
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'twoColumn'
            },
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'right',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'twoColumn'
            },
          },
        },
        {
          name: 'images',
          type: 'array',
          label: 'Gallery Images',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'gallery'
            },
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
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
        },
        {
          name: 'cta_text_en',
          type: 'text',
          label: 'CTA Text (English)',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'cta'
            },
          },
        },
        {
          name: 'cta_text_ar',
          type: 'text',
          label: 'CTA Text (Arabic)',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'cta'
            },
          },
        },
        {
          name: 'cta_link',
          type: 'text',
          label: 'CTA Link',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'cta'
            },
          },
        },
        {
          name: 'customHtml',
          type: 'textarea',
          label: 'Custom HTML',
          admin: {
            description: 'Use with caution. HTML will be sanitized on the frontend.',
            condition: (data, siblingData) => {
              return siblingData?.sectionType === 'custom'
            },
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'white',
          options: [
            {
              label: 'White',
              value: 'white',
            },
            {
              label: 'Light Gray',
              value: 'light-gray',
            },
            {
              label: 'Primary Light',
              value: 'primary-light',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
          ],
        },
      ],
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
            description: 'Recommended: 50-60 characters',
          },
        },
        {
          name: 'meta_title_ar',
          type: 'text',
          label: 'Meta Title (Arabic)',
          admin: {
            description: 'Recommended: 50-60 characters',
          },
        },
        {
          name: 'meta_description_en',
          type: 'textarea',
          label: 'Meta Description (English)',
          admin: {
            description: 'Recommended: 150-160 characters',
          },
        },
        {
          name: 'meta_description_ar',
          type: 'textarea',
          label: 'Meta Description (Arabic)',
          admin: {
            description: 'Recommended: 150-160 characters',
          },
        },
        {
          name: 'og_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
          admin: {
            description: 'Recommended size: 1200×630px for social media sharing',
          },
        },
        {
          name: 'keywords_en',
          type: 'text',
          label: 'Keywords (English)',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
        {
          name: 'keywords_ar',
          type: 'text',
          label: 'Keywords (Arabic)',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
        {
          name: 'canonical_url',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            description: 'Optional: Specify the canonical URL if different from the page URL',
          },
        },
        {
          name: 'noindex',
          type: 'checkbox',
          label: 'No Index',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this page',
          },
        },
        {
          name: 'nofollow',
          type: 'checkbox',
          label: 'No Follow',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from following links on this page',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
