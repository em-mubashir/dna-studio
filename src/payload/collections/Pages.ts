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
    // Hero Section (home, team, about, contact — NOT works)
    // ──────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        condition: (data) => data?.slug !== 'works',
      },
      fields: [
        { name: 'heading_en', type: 'textarea', label: 'Heading (English)' },
        { name: 'heading_ar', type: 'textarea', label: 'Heading (Arabic)' },
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
    // Hero Section 2 (team/about pages — second hero banner)
    // ──────────────────────────────────────────
    {
      name: 'hero2',
      type: 'group',
      label: 'Hero Section 2',
      admin: {
        condition: (data) => data?.slug === 'team' || data?.slug === 'about',
        description: 'Second hero banner (used on team and about pages)',
      },
      fields: [
        { name: 'heading_en', type: 'textarea', label: 'Heading (English)' },
        { name: 'heading_ar', type: 'textarea', label: 'Heading (Arabic)' },
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
        { name: 'button_link', type: 'text', label: 'Button Link', defaultValue: '/works' },
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
        condition: (data) => data?.slug === 'home' || data?.slug === 'team',
        description: 'About DNA Studio section (homepage and team page)',
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
        condition: (data) => data?.slug === 'home' || data?.slug === 'about' || data?.slug === 'works',
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
    // About Page Sections
    // ──────────────────────────────────────────

    // About Hero (animated text lines)
    {
      name: 'aboutHero',
      type: 'group',
      label: 'About Hero Section',
      admin: {
        condition: (data) => data?.slug === 'about',
        description: 'Hero section with animated text overlay for the about page',
      },
      fields: [
        {
          name: 'textLines',
          type: 'array',
          label: 'Animated Text Lines',
          admin: { description: 'Text lines that animate over the hero image' },
          fields: [
            { name: 'text_en', type: 'text', required: true, label: 'Text (English)' },
            { name: 'text_ar', type: 'text', required: true, label: 'Text (Arabic)' },
          ],
        },
      ],
    },

    // ──────────────────────────────────────────
    // Works Page Sections
    // ──────────────────────────────────────────
    {
      name: 'worksHeading',
      type: 'group',
      label: 'Works Page Heading',
      admin: {
        condition: (data) => data?.slug === 'works',
        description: 'Heading text shown at the top of the works page',
      },
      fields: [
        {
          name: 'heading_en',
          type: 'text',
          label: 'Heading (English)',
          defaultValue: 'AT DNA, WE EMBODY THE ESSENCE OF THE ART GENE',
        },
        {
          name: 'heading_ar',
          type: 'text',
          label: 'Heading (Arabic)',
          defaultValue: 'في DNA، نجسّد جوهر الفن الإبداعي',
        },
      ],
    },
    {
      name: 'worksGrid',
      type: 'array',
      label: 'Works Grid Items',
      admin: {
        condition: (data) => data?.slug === 'works',
        description: 'Add work items that appear in the 2-column grid on the works page',
      },
      fields: [
        { name: 'project_en', type: 'text', required: true, label: 'Project Name (English)' },
        { name: 'project_ar', type: 'text', required: true, label: 'Project Name (Arabic)' },
        { name: 'industry_en', type: 'text', required: true, label: 'Industry (English)' },
        { name: 'industry_ar', type: 'text', required: true, label: 'Industry (Arabic)' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Cover Image',
          admin: { description: 'Square image recommended (896×896px). Covers the full card.' },
        },
        { name: 'link', type: 'text', label: 'Link URL', admin: { description: 'Optional link when clicking the card' } },
        { name: 'order', type: 'number', label: 'Order', defaultValue: 0 },
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
