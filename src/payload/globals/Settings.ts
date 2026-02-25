import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    group: 'Configuration',
    description: 'Global site settings including contact information and social media links',
  },
  access: {
    // Only admins can update settings
    update: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Anyone can read settings
    read: () => true,
  },
  fields: [
    // Contact Information
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email Address',
          admin: {
            description: 'Primary contact email for the company',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
          admin: {
            description: 'Primary contact phone number (e.g., "+966 12 345 6789")',
          },
        },
        {
          name: 'address_en',
          type: 'textarea',
          required: true,
          label: 'Address (English)',
          admin: {
            description: 'Full company address in English',
          },
        },
        {
          name: 'address_ar',
          type: 'textarea',
          required: true,
          label: 'Address (Arabic)',
          admin: {
            description: 'Full company address in Arabic',
          },
        },
        {
          name: 'mapUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'Google Maps embed URL for the contact page',
          },
        },
      ],
    },
    // Social Media Links
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          admin: {
            description: 'Full URL to Facebook page (e.g., "https://facebook.com/dnamedia")',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            description: 'Full URL to Instagram profile (e.g., "https://instagram.com/dnamedia")',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
          admin: {
            description: 'Full URL to Twitter/X profile (e.g., "https://twitter.com/dnamedia")',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            description: 'Full URL to LinkedIn company page (e.g., "https://linkedin.com/company/dnamedia")',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            description: 'Full URL to YouTube channel (e.g., "https://youtube.com/@dnamedia")',
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
          admin: {
            description: 'Full URL to TikTok profile (e.g., "https://tiktok.com/@dnamedia")',
          },
        },
        {
          name: 'vimeo',
          type: 'text',
          label: 'Vimeo URL',
          admin: {
            description: 'Full URL to Vimeo profile (e.g., "https://vimeo.com/dnamedia")',
          },
        },
      ],
    },
    // Branding
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          admin: {
            description: 'Company logo for header and footer (SVG or PNG recommended)',
          },
        },
        {
          name: 'logoAlt_en',
          type: 'text',
          label: 'Logo Alt Text (English)',
          admin: {
            description: 'Alternative text for the logo (for accessibility)',
          },
        },
        {
          name: 'logoAlt_ar',
          type: 'text',
          label: 'Logo Alt Text (Arabic)',
          admin: {
            description: 'Alternative text for the logo in Arabic',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
          admin: {
            description: 'Site favicon (32×32px or 64×64px PNG/ICO)',
          },
        },
      ],
    },
    // SEO Defaults
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO Settings',
      fields: [
        {
          name: 'site_name_en',
          type: 'text',
          label: 'Site Name (English)',
          admin: {
            description: 'Default site name for SEO (e.g., "DNA Media")',
          },
        },
        {
          name: 'site_name_ar',
          type: 'text',
          label: 'Site Name (Arabic)',
          admin: {
            description: 'Default site name in Arabic',
          },
        },
        {
          name: 'site_description_en',
          type: 'textarea',
          label: 'Site Description (English)',
          admin: {
            description: 'Default meta description for pages without custom descriptions',
          },
        },
        {
          name: 'site_description_ar',
          type: 'textarea',
          label: 'Site Description (Arabic)',
          admin: {
            description: 'Default meta description in Arabic',
          },
        },
        {
          name: 'og_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Default Open Graph Image',
          admin: {
            description: 'Default image for social media sharing (1200×630px recommended)',
          },
        },
      ],
    },
    // Business Hours
    {
      name: 'businessHours',
      type: 'group',
      label: 'Business Hours',
      fields: [
        {
          name: 'hours_en',
          type: 'textarea',
          label: 'Business Hours (English)',
          admin: {
            description: 'Operating hours in English (e.g., "Sunday - Thursday: 9:00 AM - 6:00 PM")',
          },
        },
        {
          name: 'hours_ar',
          type: 'textarea',
          label: 'Business Hours (Arabic)',
          admin: {
            description: 'Operating hours in Arabic',
          },
        },
      ],
    },
  ],
}
