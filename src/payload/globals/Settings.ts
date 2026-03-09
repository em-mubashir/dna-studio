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
    // Header Navigation
    {
      name: 'navigation',
      type: 'group',
      label: 'Header Navigation',
      fields: [
        {
          name: 'menuItems',
          type: 'array',
          label: 'Menu Items',
          admin: {
            description: 'Navigation menu items that appear in the header',
          },
          fields: [
            {
              name: 'label_en',
              type: 'text',
              required: true,
              label: 'Label (English)',
              admin: {
                description: 'Menu item label in English (e.g., "Home")',
              },
            },
            {
              name: 'label_ar',
              type: 'text',
              required: true,
              label: 'Label (Arabic)',
              admin: {
                description: 'Menu item label in Arabic (e.g., "المنزل")',
              },
            },
            {
              name: 'description_en',
              type: 'text',
              label: 'Description (English)',
              admin: {
                description: 'Short description in English (e.g., "Main page")',
              },
            },
            {
              name: 'description_ar',
              type: 'text',
              label: 'Description (Arabic)',
              admin: {
                description: 'Short description in Arabic (e.g., "الصفحة الرئيسية")',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
              admin: {
                description: 'Relative URL without language prefix (e.g., "/" for home, "/about" for about)',
              },
            },
            {
              name: 'order',
              type: 'number',
              required: true,
              label: 'Order',
              admin: {
                description: 'Display order (lower numbers appear first)',
              },
            },
          ],
        },
      ],
    },
    // Tagline Section
    {
      name: 'tagline',
      type: 'group',
      label: 'Tagline Section',
      fields: [
        {
          name: 'text_en',
          type: 'textarea',
          required: true,
          label: 'Tagline Text (English)',
          defaultValue: 'ONE FRAME AT A TIME. YOUR FULL-FLEDGED CREATIVE AND PRODUCTION PARTNER.',
          admin: {
            description: 'Main tagline text displayed on homepage',
          },
        },
        {
          name: 'text_ar',
          type: 'textarea',
          required: true,
          label: 'Tagline Text (Arabic)',
          defaultValue: 'إطار واحد في كل مرة. شريكك الإبداعي والإنتاجي المتكامل.',
          admin: {
            description: 'Main tagline text in Arabic',
          },
        },
        {
          name: 'button_text_en',
          type: 'text',
          label: 'Button Text (English)',
          defaultValue: 'VIEW ALL WORKS',
        },
        {
          name: 'button_text_ar',
          type: 'text',
          label: 'Button Text (Arabic)',
          defaultValue: 'عرض جميع الأعمال',
        },
        {
          name: 'button_link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '/portfolio',
          admin: {
            description: 'Relative URL without language prefix (e.g., "/portfolio")',
          },
        },
      ],
    },
    // Featured Work Section
    {
      name: 'featuredWork',
      type: 'group',
      label: 'Featured Work Section',
      fields: [
        {
          name: 'projectNumber',
          type: 'text',
          label: 'Project Number',
          defaultValue: '01',
          admin: {
            description: 'Project number displayed in top-left (e.g., "01", "02")',
          },
        },
        {
          name: 'serviceType_en',
          type: 'text',
          label: 'Service Type (English)',
          defaultValue: 'SERVICE',
          admin: {
            description: 'Service type displayed in top-right',
          },
        },
        {
          name: 'serviceType_ar',
          type: 'text',
          label: 'Service Type (Arabic)',
          defaultValue: 'خدمة',
          admin: {
            description: 'Service type in Arabic',
          },
        },
        {
          name: 'projectTitle_en',
          type: 'text',
          label: 'Project Title (English)',
          defaultValue: 'PROJECT TITLE',
          admin: {
            description: 'Project title displayed in bottom-left',
          },
        },
        {
          name: 'projectTitle_ar',
          type: 'text',
          label: 'Project Title (Arabic)',
          defaultValue: 'عنوان المشروع',
          admin: {
            description: 'Project title in Arabic',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          required: true,
          admin: {
            description: 'Background image for featured work section (1824×920px recommended)',
          },
        },
        {
          name: 'backgroundVideo',
          type: 'text',
          label: 'Background Video (Vimeo ID)',
          admin: {
            description: 'Optional Vimeo video ID (e.g., "123456789"). Video will overlay the image.',
          },
        },
        {
          name: 'projectLink',
          type: 'text',
          label: 'Project Link',
          admin: {
            description: 'Link to project detail page (e.g., "/portfolio/project-slug")',
          },
        },
        {
          name: 'soundOn_en',
          type: 'text',
          label: 'Sound On Text (English)',
          defaultValue: 'SOUND ON',
        },
        {
          name: 'soundOn_ar',
          type: 'text',
          label: 'Sound On Text (Arabic)',
          defaultValue: 'الصوت مفعل',
        },
        {
          name: 'soundOff_en',
          type: 'text',
          label: 'Sound Off Text (English)',
          defaultValue: 'SOUND OFF',
        },
        {
          name: 'soundOff_ar',
          type: 'text',
          label: 'Sound Off Text (Arabic)',
          defaultValue: 'الصوت مغلق',
        },
      ],
    },
    // About Section
    {
      name: 'about',
      type: 'group',
      label: 'About Section',
      fields: [
        {
          name: 'label_en',
          type: 'text',
          label: 'Label (English)',
          defaultValue: 'DNA STUDIO',
          admin: {
            description: 'Label text displayed on the left side',
          },
        },
        {
          name: 'label_ar',
          type: 'text',
          label: 'Label (Arabic)',
          defaultValue: 'دي إن إيه ستوديو',
          admin: {
            description: 'Label text in Arabic',
          },
        },
        {
          name: 'heading_en',
          type: 'textarea',
          required: true,
          label: 'Heading (English)',
          defaultValue: 'BREAKING NORMS, SETTING STANDARDS: WHERE CREATIVITY MEETS EXCELLENCE',
          admin: {
            description: 'Main heading text (will be displayed in uppercase)',
          },
        },
        {
          name: 'heading_ar',
          type: 'textarea',
          required: true,
          label: 'Heading (Arabic)',
          defaultValue: 'كسر القواعد، وضع المعايير: حيث يلتقي الإبداع بالتميز',
          admin: {
            description: 'Main heading text in Arabic',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'About Image',
          admin: {
            description: 'Main image for about section (1368×618px recommended)',
          },
        },
        {
          name: 'description_en',
          type: 'textarea',
          required: true,
          label: 'Description (English)',
          defaultValue: 'AT DNA STUDIO, WE EMBODY THE ESSENCE OF THE ART GENE. FROM SCRIPT WRITING TO WRAP MOMENT, WE THRIVE ON LIMITLESS CREATIVITY.',
          admin: {
            description: 'Body text (will be displayed in uppercase)',
          },
        },
        {
          name: 'description_ar',
          type: 'textarea',
          required: true,
          label: 'Description (Arabic)',
          defaultValue: 'في دي إن إيه ستوديو، نحن نجسد جوهر جين الفن. من كتابة السيناريو إلى لحظة الانتهاء، نحن نزدهر بالإبداع اللامحدود.',
          admin: {
            description: 'Body text in Arabic',
          },
        },
      ],
    },
    // CTA Section
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Section',
      fields: [
        {
          name: 'heading_en',
          type: 'text',
          required: true,
          label: 'Heading (English)',
          defaultValue: "LET'S CREATE TOGETHER",
          admin: {
            description: 'Main CTA heading (will be displayed in uppercase)',
          },
        },
        {
          name: 'heading_ar',
          type: 'text',
          required: true,
          label: 'Heading (Arabic)',
          defaultValue: 'لنبدع معاً',
          admin: {
            description: 'Main CTA heading in Arabic',
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
          defaultValue: '/contact',
          admin: {
            description: 'Link for the CTA button (e.g., "/contact")',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
          admin: {
            description: 'Background image for CTA section (1824×1080px recommended)',
          },
        },
        {
          name: 'circleImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Circle Image',
          admin: {
            description: 'Circular masked image (500×500px recommended)',
          },
        },
      ],
    },
    // Footer Content
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Content',
      fields: [
        {
          name: 'office_heading_en',
          type: 'text',
          label: 'Office Heading (English)',
          defaultValue: 'OFFICE',
        },
        {
          name: 'office_heading_ar',
          type: 'text',
          label: 'Office Heading (Arabic)',
          defaultValue: 'المكتب',
        },
        {
          name: 'mail_heading_en',
          type: 'text',
          label: 'Mail Heading (English)',
          defaultValue: 'MAIL US',
        },
        {
          name: 'mail_heading_ar',
          type: 'text',
          label: 'Mail Heading (Arabic)',
          defaultValue: 'راسلنا',
        },
        {
          name: 'follow_heading_en',
          type: 'text',
          label: 'Follow Heading (English)',
          defaultValue: 'FOLLOW US',
        },
        {
          name: 'follow_heading_ar',
          type: 'text',
          label: 'Follow Heading (Arabic)',
          defaultValue: 'تابعنا',
        },
        {
          name: 'emails',
          type: 'array',
          label: 'Email Addresses',
          admin: {
            description: 'Email addresses to display in footer',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              admin: {
                description: 'Optional label (e.g., "General Inquiries")',
              },
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              label: 'Email Address',
            },
          ],
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          admin: {
            description: 'Social media links to display in footer',
          },
          fields: [
            {
              name: 'platform',
              type: 'text',
              required: true,
              label: 'Platform Name',
              admin: {
                description: 'e.g., "Instagram", "LinkedIn", "Facebook"',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
        {
          name: 'copyright_en',
          type: 'text',
          label: 'Copyright Text (English)',
          defaultValue: '© DNA - ALL RIGHTS RESERVED',
        },
        {
          name: 'copyright_ar',
          type: 'text',
          label: 'Copyright Text (Arabic)',
          defaultValue: '© DNA - جميع الحقوق محفوظة',
        },
        {
          name: 'terms_en',
          type: 'text',
          label: 'Terms Text (English)',
          defaultValue: 'GENERAL TERMS',
        },
        {
          name: 'terms_ar',
          type: 'text',
          label: 'Terms Text (Arabic)',
          defaultValue: 'الشروط العامة',
        },
        {
          name: 'terms_link',
          type: 'text',
          label: 'Terms Link',
          admin: {
            description: 'URL for terms page (e.g., "/terms")',
          },
        },
        {
          name: 'background_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Footer Background Image',
          admin: {
            description: 'Background image for footer (1908×213px recommended)',
          },
        },
      ],
    },
  ],
}
