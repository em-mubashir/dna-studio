import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { getBlogPostBySlug } from '@/src/lib/payload'
import { formatDate } from '@/src/lib/utils/date'
import BlogContent from '@/src/components/blog/BlogContent'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = getBilingualField<string>(post, 'title', lang as Language)
  const excerpt = getBilingualField<string>(post, 'excerpt', lang as Language)
  
  // Use SEO meta title if available, otherwise use post title
  const metaTitle = post.seo?.meta_title_en || post.seo?.meta_title_ar
    ? getBilingualField<string>(post.seo, 'meta_title', lang as Language)
    : title
  
  // Use SEO meta description if available, otherwise use excerpt
  const metaDescription = post.seo?.meta_description_en || post.seo?.meta_description_ar
    ? getBilingualField<string>(post.seo, 'meta_description', lang as Language)
    : excerpt

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}/blog/${slug}`
  
  // Get Open Graph image
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
    robots: post.seo?.noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const title = getBilingualField<string>(post, 'title', lang as Language)
  const content = getBilingualField<any>(post, 'content', lang as Language)
  const featuredImage = post.featured_image

  // Get category label
  const categoryLabels: Record<string, { en: string; ar: string }> = {
    'video-production': { en: 'Video Production', ar: 'إنتاج الفيديو' },
    'industry-news': { en: 'Industry News', ar: 'أخبار الصناعة' },
    'case-studies': { en: 'Case Studies', ar: 'دراسات الحالة' },
    'tips-tutorials': { en: 'Tips & Tutorials', ar: 'نصائح ودروس' },
    'company-news': { en: 'Company News', ar: 'أخبار الشركة' },
  }

  const categoryLabel = categoryLabels[post.category]?.[lang as Language] || post.category

  // Get author name
  const authorName = post.author && typeof post.author === 'object' && 'name' in post.author
    ? post.author.name
    : lang === 'ar' ? 'DNA Media' : 'DNA Media'

  return (
    <main className="min-h-screen">
      {/* Hero Section with Featured Image */}
      <section className="relative h-[60vh] min-h-[400px] bg-gray-900">
        {featuredImage && typeof featuredImage === 'object' && 'url' in featuredImage && (
          <Image
            src={featuredImage.url as string}
            alt={featuredImage.alt as string || title}
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
        )}
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-full">
                  {categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-white/90">
                <span className="font-medium">{authorName}</span>
                <span>•</span>
                <time dateTime={post.publishedDate}>
                  {formatDate(post.publishedDate, lang as Language)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center gap-2 text-gray-600">
                <li>
                  <Link href={`/${lang}`} className="hover:text-primary-600 transition-colors">
                    {lang === 'ar' ? 'الرئيسية' : 'Home'}
                  </Link>
                </li>
                <li>{lang === 'ar' ? '←' : '→'}</li>
                <li>
                  <Link href={`/${lang}/blog`} className="hover:text-primary-600 transition-colors">
                    {lang === 'ar' ? 'المدونة' : 'Blog'}
                  </Link>
                </li>
                <li>{lang === 'ar' ? '←' : '→'}</li>
                <li className="text-gray-900 font-medium">{title}</li>
              </ol>
            </nav>

            {/* Article Content */}
            <article className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <BlogContent content={content} lang={lang as Language} />
            </article>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
              >
                {lang === 'ar' ? '← العودة إلى المدونة' : '← Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

