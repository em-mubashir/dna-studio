import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { getBlogPostBySlug, getRelatedBlogPosts, getPageBySlug } from '@/src/lib/payload'
import BlogContent from '@/src/components/blog/BlogContent'
import ProjectCard from '@/src/components/ui/ProjectCard'
import BlogHeroSection from '@/src/components/blog/BlogHeroSection'
import BlogArticleSection from '@/src/components/blog/BlogArticleSection'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return []
}

function getImageUrl(image: any): string | null {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'object' && 'url' in image) return image.url || null
  return null
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const title = getBilingualField<string>(post, 'title', lang as Language)
  const excerpt = getBilingualField<string>(post, 'excerpt', lang as Language)

  const metaTitle = post.seo?.meta_title_en || post.seo?.meta_title_ar
    ? getBilingualField<string>(post.seo, 'meta_title', lang as Language)
    : title

  const metaDescription = post.seo?.meta_description_en || post.seo?.meta_description_ar
    ? getBilingualField<string>(post.seo, 'meta_description', lang as Language)
    : excerpt

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}/blog/${slug}`

  const ogImage = post.seo?.og_image || post.featured_image
  const ogImageUrl = ogImage && typeof ogImage === 'object' && 'url' in ogImage
    ? ogImage.url
    : null

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: currentUrl,
      siteName: 'DNA Media',
      locale: lang === 'en' ? 'en_US' : 'ar_SA',
      type: 'article',
      publishedTime: post.publishedDate,
      authors: post.author && typeof post.author === 'object' && 'name' in post.author
        ? [post.author.name as string]
        : undefined,
      images: ogImageUrl ? [{ url: ogImageUrl as string }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl as string] : undefined,
    },
    alternates: {
      canonical: post.seo?.canonical_url || currentUrl,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        ar: `${baseUrl}/ar/blog/${slug}`,
      },
    },
    robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = getBilingualField<any>(post, 'content', lang as Language)

  // Fetch 2 related blog posts
  const relatedPosts = await getRelatedBlogPosts(slug, post.category, 2)

  // Fetch the same blog hero data from CMS Pages > Blog (same source as listing page)
  const page = await getPageBySlug('blog')
  const blogHero = page?.blogHero

  const heroTitle = blogHero
    ? (lang === 'ar' ? blogHero.title_ar : blogHero.title_en)
    : null
  const heroTopic = blogHero
    ? (lang === 'ar' ? blogHero.topic_ar : blogHero.topic_en)
    : null
  const heroLink = blogHero?.link || '#'
  const heroImageUrl = getImageUrl(blogHero?.background_image)

  // Article Detail Section from CMS (article_detail group)
  const detail = (post as any).article_detail || {}

  const articleDescription = lang === 'ar'
    ? (detail.description_ar || '')
    : (detail.description_en || '')

  const articleMainHeading = lang === 'ar'
    ? (detail.main_heading_ar || '')
    : (detail.main_heading_en || '')

  let mainImageUrl: string | null = null
  let mainImageAlt = ''
  if (detail.main_image) {
    if (typeof detail.main_image === 'object' && 'url' in detail.main_image) {
      mainImageUrl = detail.main_image.url as string
      mainImageAlt = (detail.main_image.alt as string) || ''
    } else if (typeof detail.main_image === 'string') {
      mainImageUrl = `/api/media/file/${detail.main_image}`
    }
  }

  const cmsBlocks = detail.blocks as any[] | undefined
  const contentBlocks = (cmsBlocks || []).map((block: any) => ({
    heading: lang === 'ar' ? (block.heading_ar || block.heading_en) : block.heading_en,
    paragraph: lang === 'ar' ? (block.paragraph_ar || block.paragraph_en) : block.paragraph_en,
  }))

  return (
    <main className="min-h-screen bg-black" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Same Blog Hero Section as listing page — data from CMS Pages > Blog */}
      {blogHero && (
        <BlogHeroSection
          title={heroTitle}
          topic={heroTopic}
          imageUrl={heroImageUrl}
          link={heroLink}
          lang={lang}
          showReadMore={false}
        />
      )}

      {/* Blog Article — left sidebar + right content */}
      <BlogArticleSection
        description={articleDescription}
        mainHeading={articleMainHeading}
        mainImageUrl={mainImageUrl}
        mainImageAlt={mainImageAlt}
        blocks={contentBlocks}
        lang={lang}
      />

      {/* Related Blogs */}
      {relatedPosts.length > 0 && (
        <section className="px-4 md:px-12 pb-16">
          <h2
            className="text-white text-2xl md:text-4xl font-bold uppercase mb-10"
            style={{ fontFamily: 'Degular, sans-serif' }}
          >
            {lang === 'ar' ? 'مقالات ذات صلة' : 'RELATED ARTICLES'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {relatedPosts.map((rp: any) => (
              <ProjectCard
                key={rp.id || rp.slug}
                title={lang === 'ar' ? (rp.title_ar || rp.title_en) : rp.title_en}
                topic={rp.category || 'TOPIC'}
                href={`/${lang}/blog/${rp.slug}`}
                thumbnail={rp.featured_image}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
