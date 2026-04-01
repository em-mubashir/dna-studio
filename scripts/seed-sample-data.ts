/**
 * Seed Script for DNA Media Website
 * Adds sample content to all Payload CMS collections
 * 
 * Usage: tsx scripts/seed-sample-data.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload/payload.config'

async function seed() {
  console.log('🌱 Starting seed process...\n')

  try {
    const payload = await getPayload({ config })
    console.log('✅ Connected to Payload CMS\n')

    // 1. Seed Settings Global
    console.log('📝 Seeding Settings...')
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        contact: {
          email: 'info@dnamedia.sa',
          phone: '+966 50 123 4567',
          address_en: 'King Fahd Road, Al Olaya District\nRiyadh 12211\nSaudi Arabia',
          address_ar: 'طريق الملك فهد، حي العليا\nالرياض 12211\nالمملكة العربية السعودية',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.6753!3d24.7136',
        },
        social: {
          facebook: 'https://facebook.com/dnamedia',
          instagram: 'https://instagram.com/dnamedia',
          twitter: 'https://twitter.com/dnamedia',
          linkedin: 'https://linkedin.com/company/dnamedia',
          youtube: 'https://youtube.com/@dnamedia',
          vimeo: 'https://vimeo.com/dnamedia',
        },
        branding: {
          logoAlt_en: 'DNA Media Logo',
          logoAlt_ar: 'شعار دي إن إيه ميديا',
        },
        seo: {
          site_name_en: 'DNA Media',
          site_name_ar: 'دي إن إيه ميديا',
          site_description_en: 'Premium video production company in Saudi Arabia specializing in commercials, corporate videos, and documentaries.',
          site_description_ar: 'شركة إنتاج فيديو متميزة في المملكة العربية السعودية متخصصة في الإعلانات التجارية وفيديوهات الشركات والأفلام الوثائقية.',
        },
        businessHours: {
          hours_en: 'Sunday - Thursday: 9:00 AM - 6:00 PM\nFriday - Saturday: Closed',
          hours_ar: 'الأحد - الخميس: 9:00 صباحًا - 6:00 مساءً\nالجمعة - السبت: مغلق',
        },
        navigation: {
          menuItems: [
            {
              label_en: 'Home',
              label_ar: 'المنزل',
              description_en: 'Main page',
              description_ar: 'الصفحة الرئيسية',
              url: '/',
              order: 1,
            },
            {
              label_en: 'Team',
              label_ar: 'فريق',
              description_en: 'Who we are',
              description_ar: 'من نحن',
              url: '/team',
              order: 2,
            },
            {
              label_en: 'Works',
              label_ar: 'أعمال',
              description_en: 'What we do',
              description_ar: 'ما نقوم به',
              url: '/portfolio',
              order: 3,
            },
            {
              label_en: 'Blog',
              label_ar: 'مدونة',
              description_en: 'Useful articles',
              description_ar: 'مقالات مفيدة',
              url: '/blog',
              order: 4,
            },
            {
              label_en: "Let's work",
              label_ar: 'لنبدأ العمل',
              description_en: 'Contact us',
              description_ar: 'اتصل بنا',
              url: '/contact',
              order: 5,
            },
          ],
        },
        tagline: {
          text_en: 'ONE FRAME AT A TIME. YOUR FULL-FLEDGED CREATIVE AND PRODUCTION PARTNER.',
          text_ar: 'إطار واحد في كل مرة. شريكك الإبداعي والإنتاجي المتكامل.',
          button_text_en: 'VIEW ALL WORKS',
          button_text_ar: 'عرض جميع الأعمال',
          button_link: '/portfolio',
        },
        featuredWork: {
          projectNumber: '01',
          serviceType_en: 'COMMERCIAL',
          serviceType_ar: 'إعلان تجاري',
          projectTitle_en: 'LUXURY BRAND CAMPAIGN',
          projectTitle_ar: 'حملة علامة تجارية فاخرة',
          projectLink: '/portfolio',
          soundOn_en: 'SOUND ON',
          soundOn_ar: 'الصوت مفعل',
          soundOff_en: 'SOUND OFF',
          soundOff_ar: 'الصوت مغلق',
        },
        about: {
          label_en: 'DNA STUDIO',
          label_ar: 'دي إن إيه ستوديو',
          heading_en: 'BREAKING NORMS, SETTING STANDARDS: WHERE CREATIVITY MEETS EXCELLENCE',
          heading_ar: 'كسر القواعد، وضع المعايير: حيث يلتقي الإبداع بالتميز',
          description_en: 'AT DNA STUDIO, WE EMBODY THE ESSENCE OF THE ART GENE. FROM SCRIPT WRITING TO WRAP MOMENT, WE THRIVE ON LIMITLESS CREATIVITY.',
          description_ar: 'في دي إن إيه ستوديو، نحن نجسد جوهر جين الفن. من كتابة السيناريو إلى لحظة الانتهاء، نحن نزدهر بالإبداع اللامحدود.',
        },
        cta: {
          heading_en: "LET'S CREATE TOGETHER",
          heading_ar: 'لنبدع معاً',
          buttonLink: '/contact',
        },
        footer: {
          office_heading_en: 'OFFICE',
          office_heading_ar: 'المكتب',
          mail_heading_en: 'MAIL US',
          mail_heading_ar: 'راسلنا',
          follow_heading_en: 'FOLLOW US',
          follow_heading_ar: 'تابعنا',
          emails: [
            { email: 'info@dnamedia.sa' },
            { email: 'career@dnamedia.sa' },
          ],
          socialLinks: [
            { platform: 'Instagram', url: 'https://instagram.com/dnamedia' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/dnamedia' },
            { platform: 'Facebook', url: 'https://facebook.com/dnamedia' },
            { platform: 'YouTube', url: 'https://youtube.com/@dnamedia' },
          ],
          copyright_en: '© DNA - ALL RIGHTS RESERVED',
          copyright_ar: '© DNA - جميع الحقوق محفوظة',
          terms_en: 'GENERAL TERMS',
          terms_ar: 'الشروط العامة',
          terms_link: '/terms',
        },
      },
    })
    console.log('✅ Settings seeded\n')

    // 2. Seed Team Members (without photos for now - can be added via CMS)
    console.log('📝 Seeding Team Members...')
    console.log('⚠️  Skipping team members - photos are required. Add via CMS at /admin')
    // Team members require photo uploads which we can't seed programmatically
    // Users should add these via the CMS interface

    // 4. Seed Clients (without logos for now - can be added via CMS)
    console.log('📝 Seeding Clients...')
    console.log('⚠️  Skipping clients - logos are required. Add via CMS at /admin')
    // Clients require logo uploads which we can't seed programmatically
    // Users should add these via the CMS interface

    // 5. Seed Timeline
    console.log('📝 Seeding Timeline...')
    const timeline = [
      {
        year: 2015,
        title_en: 'DNA Media Founded',
        title_ar: 'تأسيس دي إن إيه ميديا',
        description_en: 'Started with a vision to revolutionize video production in Saudi Arabia.',
        description_ar: 'بدأنا برؤية لإحداث ثورة في إنتاج الفيديو في المملكة العربية السعودية.',
        type: 'milestone' as const,
      },
      {
        year: 2017,
        title_en: 'First Major Award',
        title_ar: 'أول جائزة كبرى',
        description_en: 'Won Best Commercial at the Middle East Video Awards.',
        description_ar: 'فزنا بجائزة أفضل إعلان تجاري في جوائز الفيديو في الشرق الأوسط.',
        type: 'award' as const,
      },
      {
        year: 2019,
        title_en: 'Expanded to Dubai',
        title_ar: 'التوسع إلى دبي',
        description_en: 'Opened our second office in Dubai to serve the wider GCC market.',
        description_ar: 'افتتحنا مكتبنا الثاني في دبي لخدمة سوق دول مجلس التعاون الخليجي الأوسع.',
        type: 'milestone' as const,
      },
      {
        year: 2021,
        title_en: 'Excellence in Documentary',
        title_ar: 'التميز في الأفلام الوثائقية',
        description_en: 'Received recognition for our documentary work at the Dubai International Film Festival.',
        description_ar: 'حصلنا على تقدير لعملنا الوثائقي في مهرجان دبي السينمائي الدولي.',
        type: 'award' as const,
      },
      {
        year: 2023,
        title_en: '100+ Projects Milestone',
        title_ar: 'إنجاز أكثر من 100 مشروع',
        description_en: 'Celebrated completing over 100 successful projects for leading brands.',
        description_ar: 'احتفلنا بإنجاز أكثر من 100 مشروع ناجح للعلامات التجارية الرائدة.',
        type: 'milestone' as const,
      },
    ]

    let timelineCreated = 0
    for (const item of timeline) {
      try {
        // Check if timeline item already exists
        const existing = await payload.find({
          collection: 'timeline',
          where: {
            year: {
              equals: item.year,
            },
            title_en: {
              equals: item.title_en,
            },
          },
        })

        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'timeline',
            data: item,
          })
          timelineCreated++
        } else {
          console.log(`   ⏭️  Timeline "${item.year} - ${item.title_en}" already exists, skipping...`)
        }
      } catch (error: unknown) {
        console.log(`   ⚠️  Error creating timeline item:`, (error as Error).message)
      }
    }
    console.log(`✅ ${timelineCreated} timeline items seeded (${timeline.length - timelineCreated} already existed)\n`)

    // 6. Seed Portfolio (without thumbnails for now - can be added via CMS)
    console.log('📝 Seeding Portfolio...')
    console.log('⚠️  Skipping portfolio items - thumbnails are required. Add via CMS at /admin')
    // Portfolio items require thumbnail uploads which we can't seed programmatically
    // Users should add these via the CMS interface

    // 7. Seed Blog Posts (without featured images for now - can be added via CMS)
    console.log('📝 Seeding Blog Posts...')
    console.log('⚠️  Skipping blog posts - featured images and author relationships are required. Add via CMS at /admin')
    // Blog posts require featured image uploads and author relationships
    // Users should add these via the CMS interface

    // 8. Seed Pages
    console.log('📝 Seeding Pages...')
    const pages = [
      {
        title_en: 'Home',
        title_ar: 'الرئيسية',
        slug: 'home',
        status: 'published' as const,
        hero: {
          heading_en: 'Crafting Visual Stories That Inspire',
          heading_ar: 'صياغة قصص بصرية تلهم',
          subheading_en: 'Premium video production services for brands that dare to stand out',
          subheading_ar: 'خدمات إنتاج فيديو متميزة للعلامات التجارية التي تجرؤ على التميز',
          cta_text_en: 'View Our Work',
          cta_text_ar: 'شاهد أعمالنا',
          cta_link: '/en/portfolio',
          background_video: '123456789',
        },
        sections: [],
        seo: {
          meta_title_en: 'DNA Media - Premium Video Production in Saudi Arabia',
          meta_title_ar: 'دي إن إيه ميديا - إنتاج فيديو متميز في السعودية',
          meta_description_en: 'Award-winning video production company specializing in commercials, corporate videos, and documentaries.',
          meta_description_ar: 'شركة إنتاج فيديو حائزة على جوائز متخصصة في الإعلانات التجارية وفيديوهات الشركات والأفلام الوثائقية.',
        },
      },
      {
        title_en: 'About Us',
        title_ar: 'من نحن',
        slug: 'about',
        status: 'published' as const,
        hero: {
          heading_en: 'We Are DNA Media',
          heading_ar: 'نحن دي إن إيه ميديا',
          subheading_en: 'A team of passionate storytellers dedicated to creating exceptional video content',
          subheading_ar: 'فريق من رواة القصص المتحمسين المكرسين لإنشاء محتوى فيديو استثنائي',
        },
        sections: [],
        seo: {
          meta_title_en: 'About DNA Media - Our Story & Team',
          meta_title_ar: 'عن دي إن إيه ميديا - قصتنا وفريقنا',
          meta_description_en: 'Learn about DNA Media\'s journey, our team of experts, and our commitment to excellence in video production.',
          meta_description_ar: 'تعرف على رحلة دي إن إيه ميديا وفريق خبرائنا والتزامنا بالتميز في إنتاج الفيديو.',
        },
      },
      {
        title_en: 'Contact Us',
        title_ar: 'اتصل بنا',
        slug: 'contact',
        status: 'published' as const,
        hero: {
          heading_en: 'Let\'s Create Something Amazing',
          heading_ar: 'لنصنع شيئًا مذهلاً',
          subheading_en: 'Get in touch to discuss your next video project',
          subheading_ar: 'تواصل معنا لمناقشة مشروع الفيديو القادم',
        },
        sections: [],
        seo: {
          meta_title_en: 'Contact DNA Media - Get in Touch',
          meta_title_ar: 'اتصل بدي إن إيه ميديا - تواصل معنا',
          meta_description_en: 'Contact DNA Media for your video production needs. We\'re here to help bring your vision to life.',
          meta_description_ar: 'اتصل بدي إن إيه ميديا لاحتياجات إنتاج الفيديو الخاصة بك. نحن هنا لمساعدتك في تحقيق رؤيتك.',
        },
      },
    ]

    let pagesCreated = 0
    for (const page of pages) {
      try {
        // Check if page already exists
        const existing = await payload.find({
          collection: 'pages',
          where: {
            slug: {
              equals: page.slug,
            },
          },
        })

        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'pages',
            data: page,
          })
          pagesCreated++
        } else {
          console.log(`   ⏭️  Page "${page.slug}" already exists, skipping...`)
        }
      } catch (error: unknown) {
        console.log(`   ⚠️  Error creating page "${page.slug}":`, (error as Error).message)
      }
    }
    console.log(`✅ ${pagesCreated} pages seeded (${pages.length - pagesCreated} already existed)\n`)

    // 9. Seed CTA Section
    console.log('📝 Seeding CTA Section...')
    console.log('⚠️  Skipping CTA - background image is required. Add via CMS at /admin/collections/cta')
    console.log('   Note: Upload a 1824×1080px background image for best results\n')

    console.log('🎉 Seed process completed successfully!\n')
    console.log('📊 Summary:')
    console.log(`   - Settings: 1 global updated`)
    console.log(`   - Services: managed via CMS`)
    console.log(`   - Timeline: ${timelineCreated} created`)
    console.log(`   - Pages: ${pagesCreated} created`)
    console.log('\n⚠️  Note: The following collections require file uploads and should be added via CMS:')
    console.log('   - Team Members (requires photos)')
    console.log('   - Clients (requires logos)')
    console.log('   - Portfolio Items (requires thumbnails)')
    console.log('   - Blog Posts (requires featured images and author selection)')
    console.log('\n✅ You can now view and add content at http://localhost:3000/admin')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error during seed process:', error)
    process.exit(1)
  }
}

seed()
