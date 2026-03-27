import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'slug', 'status', 'updatedAt'],
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
    // ──────────────────────────────────────────
    // Basic Page Info
    // ──────────────────────────────────────────
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
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },

    // ──────────────────────────────────────────
    // Hero Section (all pages)
    // ──────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'heading_en', type: 'text', label: 'Heading (English)' },
        { name: 'heading_ar', type: 'text', label: 'Heading (Arabic)' },
        { name: 'subheading_en', type: 'textarea', label: 'Subheading (English)' },
        { name: 'subheading_ar', type: 'textarea', label: 'Subheading (Arabic)' },
        {
          name: 'background_video',
          type: 'text',
          label: 'Background Video (Vimeo ID)',
          admin: { description: 'Enter the Vimeo video ID (e.g., "123456789")' },
        },
        {
          name: 'background_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: { description: 'Fallback image if video is not available' },
        },
        { name: 'cta_text_en', type: 'text', label: 'CTA Button Text (English)' },
        { name: 'cta_text_ar', type: 'text', label: 'CTA Button Text (Arabic)' },
        {
          name: 'cta_link',
          type: 'text',
          label: 'CTA Button Link',
          admin: { description: 'URL or path (e.g., "/contact")' },
        },
      ],
    },

    // ──────────────────────────────────────────
    // Homepage-Only Sections
    // These fields only appear when editing the "home" page
    // ──────────────────────────────────────────

    // Tagline
    {
      name: 'tagline',
      type: 'group',
      label: 'Tagline Section',
      admin: {
        condition: (data) => data?.slug === 'home',
        description: 'Tagline displayed below the hero on the homepage',
      },
      fields: [
        {
          name: 'text_en',
          type: 'textarea',
          label: 'Tagline Text (English)',
          defaultValue: 'ONE FRAME AT A TIME. YOUR FULL-FLEDGED CREATIVE AND PRODUCTION PARTNER.',
        },
        {
          name: 'text_ar',
          type: 'textarea',
          label: 'Tagline Text (Arabic)',
          defaultValue: 'إطار واحد في كل مرة. شريكك الإبداعي والإنتاجي المتكامل.',
        },
        { name: 'button_text_en', type: 'text', label: 'Button Text (English)', defaultValue: 'VIEW ALL WORKS' },
        { name: 'button_text_ar', type: 'text', label: 'Button Text (Arabic)', defaultValue: 'عرض جميع الأعمال' },
        { name: 'button_link', type: 'text', label: 'Button Link', defaultValue: '/portfolio' },
      ],
    },

    // Featured Work
    {
      name: 'featuredWork',
      type: 'group',
      label: 'Featured Work Section',
      admin: {
        condition: (data) => data?.slug === 'home',
        description: 'Showcase a featured project on the homepage',
      },
      fields: [
        { name: 'projectNumber', type: 'text', label: 'Project Number', defaultValue: '01' },
        { name: 'serviceType_en', type: 'text', label: 'Service Type (English)', defaultValue: 'SERVICE' },
        { name: 'serviceType_ar', type: 'text', label: 'Service Type (Arabic)', defaultValue: 'خدمة' },
        { name: 'projectTitle_en', type: 'text', label: 'Project Title (English)', defaultValue: 'PROJECT TITLE' },
        { name: 'projectTitle_ar', type: 'text', label: 'Project Title (Arabic)', defaultValue: 'عنوان المشروع' },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: { description: '1824×920px recommended' },
        },
        {
          name: 'backgroundVideo',
          type: 'text',
          label: 'Background Video (Vimeo ID)',
          admin: { description: 'Optional Vimeo video ID. Video will overlay the image.' },
        },
        { name: 'projectLink', type: 'text', label: 'Project Link' },
        { name: 'soundOn_en', type: 'text', label: 'Sound On Text (English)', defaultValue: 'SOUND ON' },
        { name: 'soundOn_ar', type: 'text', label: 'Sound On Text (Arabic)', defaultValue: 'الصوت مفعل' },
        { name: 'soundOff_en', type: 'text', label: 'Sound Off Text (English)', defaultValue: 'SOUND OFF' },
        { name: 'soundOff_ar', type: 'text', label: 'Sound Off Text (Arabic)', defaultValue: 'الصوت مغلق' },
      ],
    },

    // About Section
    {
      name: 'aboutSection',
      type: 'group',
      label: 'About Section',
      admin: {
        condition: (data) => data?.slug === 'home',
        description: 'About DNA Studio section on the homepage',
      },
      fields: [
        { name: 'label_en', type: 'text', label: 'Label (English)', defaultValue: 'DNA STUDIO' },
        { name: 'label_ar', type: 'text', label: 'Label (Arabic)', defaultValue: 'دي إن إيه ستوديو' },
        {
          name: 'heading_en',
          type: 'textarea',
          label: 'Heading (English)',
          defaultValue: 'BREAKING NORMS, SETTING STANDARDS: WHERE CREATIVITY MEETS EXCELLENCE',
        },
        {
          name: 'heading_ar',
          type: 'textarea',
          label: 'Heading (Arabic)',
          defaultValue: 'كسر القواعد، وضع المعايير: حيث يلتقي الإبداع بالتميز',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'About Image',
          admin: { description: '1368×618px recommended' },
        },
        {
          name: 'description_en',
          type: 'textarea',
          label: 'Description (English)',
          defaultValue: 'AT DNA STUDIO, WE EMBODY THE ESSENCE OF THE ART GENE. FROM SCRIPT WRITING TO WRAP MOMENT, WE THRIVE ON LIMITLESS CREATIVITY.',
        },
        {
          name: 'description_ar',
          type: 'textarea',
          label: 'Description (Arabic)',
          defaultValue: 'في دي إن إيه ستوديو، نحن نجسد جوهر جين الفن. من كتابة السيناريو إلى لحظة الانتهاء، نحن نزدهر بالإبداع اللامحدود.',
        },
      ],
    },

    // CTA Section
    {
      name: 'ctaSection',
      type: 'group',
      label: 'CTA Section',
      admin: {
        condition: (data) => data?.slug === 'home',
        description: 'Call-to-action section on the homepage',
      },
      fields: [
        { name: 'heading_en', type: 'text', label: 'Heading (English)', defaultValue: "LET'S CREATE TOGETHER" },
        { name: 'heading_ar', type: 'text', label: 'Heading (Arabic)', defaultValue: 'لنبدع معاً' },
        { name: 'buttonLink', type: 'text', label: 'Button Link', defaultValue: '/contact' },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: { description: '1824×1080px recommended' },
        },
        {
          name: 'circleImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Circle Image',
          admin: { description: '500×500px recommended' },
        },
      ],
    },

    // ──────────────────────────────────────────
    // Flexible Content Sections (all pages)
    // ──────────────────────────────────────────
    {
      name: 'sections',
      type: 'array',
      label: 'Page Sections',
      admin: { description: 'Add flexible content sections to build your page' },
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          required: true,
          label: 'Section Type',
          options: [
            { label: 'Rich Text Content', value: 'richText' },
            { label: 'Two Column Layout', value: 'twoColumn' },
            { label: 'Image Gallery', value: 'gallery' },
            { label: 'Call to Action', value: 'cta' },
            { label: 'Custom HTML', value: 'custom' },
          ],
        },
        { name: 'heading_en', type: 'text', label: 'Section Heading (English)' },
        { name: 'heading_ar', type: 'text', label: 'Section Heading (Arabic)' },
        {
          name: 'content_en',
          type: 'richText',
          label: 'Content (English)',
          admin: {
            condition: (_data, siblingData) =>
              siblingData?.sectionType === 'richText' || siblingData?.sectionType === 'twoColumn',
          },
        },
        {
          name: 'content_ar',
          type: 'richText',
          label: 'Content (Arabic)',
          admin: {
            condition: (_data, siblingData) =>
              siblingData?.sectionType === 'richText' || siblingData?.sectionType === 'twoColumn',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (_data, siblingData) => siblingData?.sectionType === 'twoColumn',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'right',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            condition: (_data, siblingData) => siblingData?.sectionType === 'twoColumn',
          },
        },
        {
          name: 'images',
          type: 'array',
          label: 'Gallery Images',
          admin: {
            condition: (_data, siblingData) => siblingData?.sectionType === 'gallery',
          },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption_en', type: 'text', label: 'Caption (English)' },
            { name: 'caption_ar', type: 'text', label: 'Caption (Arabic)' },
          ],
        },
        {
          name: 'cta_text_en',
          type: 'text',
          label: 'CTA Text (English)',
          admin: { condition: (_data, siblingData) => siblingData?.sectionType === 'cta' },
        },
        {
          name: 'cta_text_ar',
          type: 'text',
          label: 'CTA Text (Arabic)',
          admin: { condition: (_data, siblingData) => siblingData?.sectionType === 'cta' },
        },
        {
          name: 'cta_link',
          type: 'text',
          label: 'CTA Link',
          admin: { condition: (_data, siblingData) => siblingData?.sectionType === 'cta' },
        },
        {
          name: 'customHtml',
          type: 'textarea',
          label: 'Custom HTML',
          admin: {
            description: 'Use with caution. HTML will be sanitized on the frontend.',
            condition: (_data, siblingData) => siblingData?.sectionType === 'custom',
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'white',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Light Gray', value: 'light-gray' },
            { label: 'Primary Light', value: 'primary-light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      ],
    },

    // ──────────────────────────────────────────
    // SEO Settings (all pages)
    // ──────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        { name: 'meta_title_en', type: 'text', label: 'Meta Title (English)', admin: { description: '50-60 characters recommended' } },
        { name: 'meta_title_ar', type: 'text', label: 'Meta Title (Arabic)', admin: { description: '50-60 characters recommended' } },
        { name: 'meta_description_en', type: 'textarea', label: 'Meta Description (English)', admin: { description: '150-160 characters recommended' } },
        { name: 'meta_description_ar', type: 'textarea', label: 'Meta Description (Arabic)', admin: { description: '150-160 characters recommended' } },
        { name: 'og_image', type: 'upload', relationTo: 'media', label: 'Open Graph Image', admin: { description: '1200×630px recommended' } },
        { name: 'keywords_en', type: 'text', label: 'Keywords (English)', admin: { description: 'Comma-separated keywords' } },
        { name: 'keywords_ar', type: 'text', label: 'Keywords (Arabic)', admin: { description: 'Comma-separated keywords' } },
        { name: 'canonical_url', type: 'text', label: 'Canonical URL', admin: { description: 'Optional: if different from the page URL' } },
        { name: 'noindex', type: 'checkbox', label: 'No Index', defaultValue: false, admin: { description: 'Prevent search engines from indexing' } },
        { name: 'nofollow', type: 'checkbox', label: 'No Follow', defaultValue: false, admin: { description: 'Prevent search engines from following links' } },
      ],
    },
  ],
  timestamps: true,
}
