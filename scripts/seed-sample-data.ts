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
      },
    })
    console.log('✅ Settings seeded\n')

    // 2. Seed Services
    console.log('📝 Seeding Services...')
    const services = [
      {
        title_en: 'Commercial Production',
        title_ar: 'الإنتاج التجاري',
        slug: 'commercial-production',
        description_en: 'High-impact commercials that drive results and engage audiences across all platforms.',
        description_ar: 'إعلانات تجارية عالية التأثير تحقق النتائج وتجذب الجماهير عبر جميع المنصات.',
        category: 'video-production',
        featured: true,
        order: 1,
      },
      {
        title_en: 'Corporate Videos',
        title_ar: 'فيديوهات الشركات',
        slug: 'corporate-videos',
        description_en: 'Professional corporate videos that tell your brand story and connect with stakeholders.',
        description_ar: 'فيديوهات شركات احترافية تروي قصة علامتك التجارية وتتواصل مع أصحاب المصلحة.',
        category: 'video-production',
        featured: true,
        order: 2,
      },
      {
        title_en: 'Documentary Films',
        title_ar: 'الأفلام الوثائقية',
        slug: 'documentary-films',
        description_en: 'Compelling documentaries that capture real stories with cinematic excellence.',
        description_ar: 'أفلام وثائقية مقنعة تلتقط القصص الحقيقية بتميز سينمائي.',
        category: 'video-production',
        featured: true,
        order: 3,
      },
      {
        title_en: 'Animation & Motion Graphics',
        title_ar: 'الرسوم المتحركة والموشن جرافيك',
        slug: 'animation-motion-graphics',
        description_en: 'Creative animations and motion graphics that bring ideas to life.',
        description_ar: 'رسوم متحركة وموشن جرافيك إبداعية تحيي الأفكار.',
        category: 'animation',
        featured: true,
        order: 4,
      },
      {
        title_en: 'Event Coverage',
        title_ar: 'تغطية الفعاليات',
        slug: 'event-coverage',
        description_en: 'Professional event coverage that captures every important moment.',
        description_ar: 'تغطية احترافية للفعاليات تلتقط كل لحظة مهمة.',
        category: 'video-production',
        featured: false,
        order: 5,
      },
      {
        title_en: 'Social Media Content',
        title_ar: 'محتوى وسائل التواصل الاجتماعي',
        slug: 'social-media-content',
        description_en: 'Engaging social media content optimized for maximum reach and engagement.',
        description_ar: 'محتوى جذاب لوسائل التواصل الاجتماعي محسّن لأقصى وصول وتفاعل.',
        category: 'video-production',
        featured: false,
        order: 6,
      },
    ]

    let servicesCreated = 0
    for (const service of services) {
      try {
        // Check if service already exists
        const existing = await payload.find({
          collection: 'services',
          where: {
            slug: {
              equals: service.slug,
            },
          },
        })

        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'services',
            data: service,
          })
          servicesCreated++
        } else {
          console.log(`   ⏭️  Service "${service.slug}" already exists, skipping...`)
        }
      } catch (error) {
        console.log(`   ⚠️  Error creating service "${service.slug}":`, error.message)
      }
    }
    console.log(`✅ ${servicesCreated} services seeded (${services.length - servicesCreated} already existed)\n`)

    // 3. Seed Team Members (without photos for now - can be added via CMS)
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
        type: 'milestone',
      },
      {
        year: 2017,
        title_en: 'First Major Award',
        title_ar: 'أول جائزة كبرى',
        description_en: 'Won Best Commercial at the Middle East Video Awards.',
        description_ar: 'فزنا بجائزة أفضل إعلان تجاري في جوائز الفيديو في الشرق الأوسط.',
        type: 'award',
      },
      {
        year: 2019,
        title_en: 'Expanded to Dubai',
        title_ar: 'التوسع إلى دبي',
        description_en: 'Opened our second office in Dubai to serve the wider GCC market.',
        description_ar: 'افتتحنا مكتبنا الثاني في دبي لخدمة سوق دول مجلس التعاون الخليجي الأوسع.',
        type: 'milestone',
      },
      {
        year: 2021,
        title_en: 'Excellence in Documentary',
        title_ar: 'التميز في الأفلام الوثائقية',
        description_en: 'Received recognition for our documentary work at the Dubai International Film Festival.',
        description_ar: 'حصلنا على تقدير لعملنا الوثائقي في مهرجان دبي السينمائي الدولي.',
        type: 'award',
      },
      {
        year: 2023,
        title_en: '100+ Projects Milestone',
        title_ar: 'إنجاز أكثر من 100 مشروع',
        description_en: 'Celebrated completing over 100 successful projects for leading brands.',
        description_ar: 'احتفلنا بإنجاز أكثر من 100 مشروع ناجح للعلامات التجارية الرائدة.',
        type: 'milestone',
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
      } catch (error) {
        console.log(`   ⚠️  Error creating timeline item:`, error.message)
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
        status: 'published',
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
        status: 'published',
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
        status: 'published',
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
      } catch (error) {
        console.log(`   ⚠️  Error creating page "${page.slug}":`, error.message)
      }
    }
    console.log(`✅ ${pagesCreated} pages seeded (${pages.length - pagesCreated} already existed)\n`)

    console.log('🎉 Seed process completed successfully!\n')
    console.log('📊 Summary:')
    console.log(`   - Settings: 1 global updated`)
    console.log(`   - Services: ${servicesCreated} created`)
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
