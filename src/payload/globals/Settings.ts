import type { GlobalConfig } from 'payload'

/**
 * Global Site Settings
 *
 * Contains only truly global/shared data used across the entire site:
 * - Contact info, social links, branding, SEO defaults
 * - Navigation, business hours, footer
 *
 * Page-specific content (hero, tagline, CTA, etc.) lives in the Pages collection.
 */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    group: 'Configuration',
    description: 'Global site settings — contact, social, branding, navigation, footer',
  },
  access: {
    update: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
  },
  fields: [
    // ──────────────────────────────────────────
    // Contact Information
    // ──────────────────────────────────────────
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', required: true, label: 'Email Address', admin: { description: 'Primary contact email' } },
        { name: 'phone', type: 'text', required: true, label: 'Phone Number', admin: { description: 'e.g., "+966 12 345 6789"' } },
        { name: 'address_en', type: 'textarea', required: true, label: 'Address (English)' },
        { name: 'address_ar', type: 'textarea', required: true, label: 'Address (Arabic)' },
        { name: 'mapUrl', type: 'text', label: 'Google Maps Embed URL' },
      ],
    },

    // ──────────────────────────────────────────
    // Social Media Links
    // ──────────────────────────────────────────
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'twitter', type: 'text', label: 'Twitter/X URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'tiktok', type: 'text', label: 'TikTok URL' },
        { name: 'vimeo', type: 'text', label: 'Vimeo URL' },
      ],
    },

    // ──────────────────────────────────────────
    // Branding
    // ──────────────────────────────────────────
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo', admin: { description: 'SVG or PNG recommended' } },
        { name: 'logoAlt_en', type: 'text', label: 'Logo Alt Text (English)' },
        { name: 'logoAlt_ar', type: 'text', label: 'Logo Alt Text (Arabic)' },
        { name: 'favicon', type: 'upload', relationTo: 'media', label: 'Favicon', admin: { description: '32×32px or 64×64px PNG/ICO' } },
      ],
    },

    // ──────────────────────────────────────────
    // Default SEO
    // ──────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO Settings',
      fields: [
        { name: 'site_name_en', type: 'text', label: 'Site Name (English)' },
        { name: 'site_name_ar', type: 'text', label: 'Site Name (Arabic)' },
        { name: 'site_description_en', type: 'textarea', label: 'Site Description (English)', admin: { description: 'Fallback meta description' } },
        { name: 'site_description_ar', type: 'textarea', label: 'Site Description (Arabic)' },
        { name: 'og_image', type: 'upload', relationTo: 'media', label: 'Default OG Image', admin: { description: '1200×630px recommended' } },
      ],
    },

    // ──────────────────────────────────────────
    // Business Hours
    // ──────────────────────────────────────────
    {
      name: 'businessHours',
      type: 'group',
      label: 'Business Hours',
      fields: [
        { name: 'hours_en', type: 'textarea', label: 'Business Hours (English)', admin: { description: 'e.g., "Sunday - Thursday: 9:00 AM - 6:00 PM"' } },
        { name: 'hours_ar', type: 'textarea', label: 'Business Hours (Arabic)' },
      ],
    },

    // ──────────────────────────────────────────
    // Header Navigation
    // ──────────────────────────────────────────
    {
      name: 'navigation',
      type: 'group',
      label: 'Header Navigation',
      fields: [
        {
          name: 'menuItems',
          type: 'array',
          label: 'Menu Items',
          fields: [
            { name: 'label_en', type: 'text', required: true, label: 'Label (English)' },
            { name: 'label_ar', type: 'text', required: true, label: 'Label (Arabic)' },
            { name: 'description_en', type: 'text', label: 'Description (English)' },
            { name: 'description_ar', type: 'text', label: 'Description (Arabic)' },
            { name: 'url', type: 'text', required: true, label: 'URL', admin: { description: 'Relative URL without language prefix (e.g., "/about")' } },
            { name: 'order', type: 'number', required: true, label: 'Order', admin: { description: 'Lower numbers appear first' } },
          ],
        },
      ],
    },

    // ──────────────────────────────────────────
    // Footer
    // ──────────────────────────────────────────
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Content',
      fields: [
        { name: 'office_heading_en', type: 'text', label: 'Office Heading (English)', defaultValue: 'OFFICE' },
        { name: 'office_heading_ar', type: 'text', label: 'Office Heading (Arabic)', defaultValue: 'المكتب' },
        { name: 'mail_heading_en', type: 'text', label: 'Mail Heading (English)', defaultValue: 'MAIL US' },
        { name: 'mail_heading_ar', type: 'text', label: 'Mail Heading (Arabic)', defaultValue: 'راسلنا' },
        { name: 'follow_heading_en', type: 'text', label: 'Follow Heading (English)', defaultValue: 'FOLLOW US' },
        { name: 'follow_heading_ar', type: 'text', label: 'Follow Heading (Arabic)', defaultValue: 'تابعنا' },
        {
          name: 'emails',
          type: 'array',
          label: 'Email Addresses',
          fields: [
            { name: 'label', type: 'text', label: 'Label', admin: { description: 'e.g., "General Inquiries"' } },
            { name: 'email', type: 'email', required: true, label: 'Email Address' },
          ],
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          fields: [
            { name: 'platform', type: 'text', required: true, label: 'Platform Name' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
          ],
        },
        { name: 'copyright_en', type: 'text', label: 'Copyright (English)', defaultValue: '© DNA - ALL RIGHTS RESERVED' },
        { name: 'copyright_ar', type: 'text', label: 'Copyright (Arabic)', defaultValue: '© DNA - جميع الحقوق محفوظة' },
        { name: 'terms_en', type: 'text', label: 'Terms Text (English)', defaultValue: 'GENERAL TERMS' },
        { name: 'terms_ar', type: 'text', label: 'Terms Text (Arabic)', defaultValue: 'الشروط العامة' },
        { name: 'terms_link', type: 'text', label: 'Terms Link' },
        { name: 'background_image', type: 'upload', relationTo: 'media', label: 'Footer Background Image', admin: { description: '1908×213px recommended' } },
      ],
    },
  ],
}
