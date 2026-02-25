import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'slug', 'category', 'status', 'publishedDate'],
    group: 'Content',
  },
  access: {
    // Admins and editors can create blog posts
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Anyone can read published posts
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'editor') return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
    // Admins and editors can update posts
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    // Only admins can delete posts
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
        description: 'URL-friendly identifier (e.g., "my-blog-post")',
      },
    },
    {
      name: 'excerpt_en',
      type: 'textarea',
      required: true,
      label: 'Excerpt (English)',
      admin: {
        description: 'Short summary for blog listing pages (150-200 characters)',
      },
    },
    {
      name: 'excerpt_ar',
      type: 'textarea',
      required: true,
      label: 'Excerpt (Arabic)',
      admin: {
        description: 'Short summary for blog listing pages (150-200 characters)',
      },
    },
    {
      name: 'content_en',
      type: 'richText',
      required: true,
      label: 'Content (English)',
    },
    {
      name: 'content_ar',
      type: 'richText',
      required: true,
      label: 'Content (Arabic)',
    },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      admin: {
        description: 'Main image for the blog post (recommended: 1200×630px)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        {
          label: 'Video Production',
          value: 'video-production',
        },
        {
          label: 'Industry News',
          value: 'industry-news',
        },
        {
          label: 'Case Studies',
          value: 'case-studies',
        },
        {
          label: 'Tips & Tutorials',
          value: 'tips-tutorials',
        },
        {
          label: 'Company News',
          value: 'company-news',
        },
      ],
    },
    {
      name: 'tags_en',
      type: 'text',
      label: 'Tags (English)',
      admin: {
        description: 'Comma-separated tags (e.g., "video, editing, production")',
      },
    },
    {
      name: 'tags_ar',
      type: 'text',
      label: 'Tags (Arabic)',
      admin: {
        description: 'Comma-separated tags in Arabic',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Author',
      admin: {
        description: 'Select the author of this blog post',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      admin: {
        description: 'The date this post was or will be published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Status',
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
            description: 'Recommended: 50-60 characters. Defaults to post title if empty.',
          },
        },
        {
          name: 'meta_title_ar',
          type: 'text',
          label: 'Meta Title (Arabic)',
          admin: {
            description: 'Recommended: 50-60 characters. Defaults to post title if empty.',
          },
        },
        {
          name: 'meta_description_en',
          type: 'textarea',
          label: 'Meta Description (English)',
          admin: {
            description: 'Recommended: 150-160 characters. Defaults to excerpt if empty.',
          },
        },
        {
          name: 'meta_description_ar',
          type: 'textarea',
          label: 'Meta Description (Arabic)',
          admin: {
            description: 'Recommended: 150-160 characters. Defaults to excerpt if empty.',
          },
        },
        {
          name: 'og_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
          admin: {
            description: 'Recommended size: 1200×630px. Defaults to featured image if empty.',
          },
        },
        {
          name: 'canonical_url',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            description: 'Optional: Specify the canonical URL if different from the post URL',
          },
        },
        {
          name: 'noindex',
          type: 'checkbox',
          label: 'No Index',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this post',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
