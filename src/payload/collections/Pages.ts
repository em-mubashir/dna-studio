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
        condition: (data) => data?.slug !== 'works' && data?.slug !== 'contact' && data?.slug !== 'blog',
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
        description: 'CTA section with heading and button link',
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
    // Blog Page Hero Section
    // ──────────────────────────────────────────
    {
      name: 'blogCta',
      type: 'group',
      label: 'Blog CTA Section',
      admin: {
        condition: (data) => data?.slug === 'blog',
        description: 'Simple CTA banner with heading and button (shown before footer)',
      },
      fields: [
        { name: 'heading_en', type: 'text', label: 'Heading (English)', defaultValue: "LET'S CREATE TOGETHER" },
        { name: 'heading_ar', type: 'text', label: 'Heading (Arabic)', defaultValue: 'لنبدع معاً' },
        { name: 'buttonLink', type: 'text', label: 'Button Link', defaultValue: '/contact' },
      ],
    },
    {
      name: 'blogHero',
      type: 'group',
      label: 'Blog Hero Section',
      admin: {
        condition: (data) => data?.slug === 'blog',
        description: 'Featured hero section at the top of the blog page',
      },
      fields: [
        { name: 'title_en', type: 'textarea', label: 'Title (English)', admin: { description: 'Main heading displayed over the hero image (supports multiple lines)' } },
        { name: 'title_ar', type: 'textarea', label: 'Title (Arabic)' },
        { name: 'topic_en', type: 'textarea', label: 'Topic Label (English)', admin: { description: 'Small label shown above the title (e.g., "Topic")' } },
        { name: 'topic_ar', type: 'textarea', label: 'Topic Label (Arabic)' },
        { name: 'link', type: 'text', label: 'Read More Link', admin: { description: 'URL for the Read More button (e.g., "/en/blog/my-post")' } },
        {
          name: 'background_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: { description: 'Hero background image (1824×1027px recommended). Will be displayed in grayscale.' },
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

    // ──────────────────────────────────────────
    // Contact Page Sections
    // ──────────────────────────────────────────
    {
      name: 'contactSection',
      type: 'group',
      label: 'Contact Page Content',
      admin: {
        condition: (data) => data?.slug === 'contact',
        description: 'Content for the contact/let\'s work page',
      },
      fields: [
        // Tabs
        { name: 'tab1_en', type: 'text', label: 'Tab 1 Text (English)', admin: { description: 'e.g. "WORK"' } },
        { name: 'tab1_ar', type: 'text', label: 'Tab 1 Text (Arabic)' },
        { name: 'tab2_en', type: 'text', label: 'Tab 2 Text (English)', admin: { description: 'e.g. "COLLABORATE"' } },
        { name: 'tab2_ar', type: 'text', label: 'Tab 2 Text (Arabic)' },
        // Background image
        {
          name: 'background_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: { description: 'Full-width background image (1920×900px recommended)' },
        },
        // Office section
        { name: 'office_heading_en', type: 'text', label: 'Office Heading (English)' },
        { name: 'office_heading_ar', type: 'text', label: 'Office Heading (Arabic)' },
        { name: 'office_address_en', type: 'textarea', label: 'Office Address (English)' },
        { name: 'office_address_ar', type: 'textarea', label: 'Office Address (Arabic)' },
        // Mail section
        { name: 'mail_heading_en', type: 'text', label: 'Mail Heading (English)' },
        { name: 'mail_heading_ar', type: 'text', label: 'Mail Heading (Arabic)' },
        {
          name: 'emails',
          type: 'array',
          label: 'Email Addresses',
          fields: [
            { name: 'email', type: 'email', required: true, label: 'Email Address' },
          ],
        },
        // Follow section
        { name: 'follow_heading_en', type: 'text', label: 'Follow Heading (English)' },
        { name: 'follow_heading_ar', type: 'text', label: 'Follow Heading (Arabic)' },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          fields: [
            { name: 'platform', type: 'text', required: true, label: 'Platform Name' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
          ],
        },
        // Bottom heading
        { name: 'bottom_heading_en', type: 'text', label: 'Bottom Heading (English)' },
        { name: 'bottom_heading_ar', type: 'text', label: 'Bottom Heading (Arabic)' },

        // ── Work Form (Tab 1) ──
        {
          name: 'workForm',
          type: 'collapsible',
          label: 'Work Form (Tab 1)',
          admin: { description: 'Form fields shown when the "Work" tab is active' },
          fields: [
            { name: 'form_name_label_en', type: 'text', label: 'Name Label (English)' },
            { name: 'form_name_label_ar', type: 'text', label: 'Name Label (Arabic)' },
            { name: 'form_name_placeholder_en', type: 'text', label: 'Name Placeholder (English)' },
            { name: 'form_name_placeholder_ar', type: 'text', label: 'Name Placeholder (Arabic)' },
            { name: 'form_email_label_en', type: 'text', label: 'Email Label (English)' },
            { name: 'form_email_label_ar', type: 'text', label: 'Email Label (Arabic)' },
            { name: 'form_email_placeholder_en', type: 'text', label: 'Email Placeholder (English)' },
            { name: 'form_email_placeholder_ar', type: 'text', label: 'Email Placeholder (Arabic)' },
            { name: 'form_services_label_en', type: 'text', label: 'Services Label (English)' },
            { name: 'form_services_label_ar', type: 'text', label: 'Services Label (Arabic)' },
            {
              name: 'services',
              type: 'array',
              label: 'Service Options',
              admin: { description: 'Pill/tag options for services selection' },
              fields: [
                { name: 'label_en', type: 'text', required: true, label: 'Service Name (English)' },
                { name: 'label_ar', type: 'text', required: true, label: 'Service Name (Arabic)' },
              ],
            },
            { name: 'form_message_label_en', type: 'text', label: 'Message Label (English)' },
            { name: 'form_message_label_ar', type: 'text', label: 'Message Label (Arabic)' },
            { name: 'form_message_placeholder_en', type: 'text', label: 'Message Placeholder (English)' },
            { name: 'form_message_placeholder_ar', type: 'text', label: 'Message Placeholder (Arabic)' },
            { name: 'form_submit_en', type: 'text', label: 'Submit Button (English)' },
            { name: 'form_submit_ar', type: 'text', label: 'Submit Button (Arabic)' },
            { name: 'form_submitting_en', type: 'text', label: 'Submitting Text (English)' },
            { name: 'form_submitting_ar', type: 'text', label: 'Submitting Text (Arabic)' },
          ],
        },

        // ── Collaborate Form (Tab 2) ──
        {
          name: 'collaborateForm',
          type: 'collapsible',
          label: 'Collaborate Form (Tab 2)',
          admin: { description: 'Form fields shown when the "Collaborate" tab is active' },
          fields: [
            { name: 'collab_name_label_en', type: 'text', label: 'Name Label (English)' },
            { name: 'collab_name_label_ar', type: 'text', label: 'Name Label (Arabic)' },
            { name: 'collab_name_placeholder_en', type: 'text', label: 'Name Placeholder (English)' },
            { name: 'collab_name_placeholder_ar', type: 'text', label: 'Name Placeholder (Arabic)' },
            { name: 'collab_profession_label_en', type: 'text', label: 'Profession Label (English)' },
            { name: 'collab_profession_label_ar', type: 'text', label: 'Profession Label (Arabic)' },
            { name: 'collab_profession_placeholder_en', type: 'text', label: 'Profession Placeholder (English)' },
            { name: 'collab_profession_placeholder_ar', type: 'text', label: 'Profession Placeholder (Arabic)' },
            { name: 'collab_email_label_en', type: 'text', label: 'Email Label (English)' },
            { name: 'collab_email_label_ar', type: 'text', label: 'Email Label (Arabic)' },
            { name: 'collab_email_placeholder_en', type: 'text', label: 'Email Placeholder (English)' },
            { name: 'collab_email_placeholder_ar', type: 'text', label: 'Email Placeholder (Arabic)' },
            { name: 'collab_portfolio_label_en', type: 'text', label: 'Portfolio Label (English)' },
            { name: 'collab_portfolio_label_ar', type: 'text', label: 'Portfolio Label (Arabic)' },
            { name: 'collab_portfolio_placeholder_en', type: 'text', label: 'Portfolio Placeholder (English)' },
            { name: 'collab_portfolio_placeholder_ar', type: 'text', label: 'Portfolio Placeholder (Arabic)' },
            { name: 'collab_cover_letter_label_en', type: 'text', label: 'Cover Letter Label (English)' },
            { name: 'collab_cover_letter_label_ar', type: 'text', label: 'Cover Letter Label (Arabic)' },
            { name: 'collab_cover_letter_placeholder_en', type: 'text', label: 'Cover Letter Placeholder (English)' },
            { name: 'collab_cover_letter_placeholder_ar', type: 'text', label: 'Cover Letter Placeholder (Arabic)' },
            { name: 'collab_submit_en', type: 'text', label: 'Submit Button (English)' },
            { name: 'collab_submit_ar', type: 'text', label: 'Submit Button (Arabic)' },
            { name: 'collab_submitting_en', type: 'text', label: 'Submitting Text (English)' },
            { name: 'collab_submitting_ar', type: 'text', label: 'Submitting Text (Arabic)' },
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
