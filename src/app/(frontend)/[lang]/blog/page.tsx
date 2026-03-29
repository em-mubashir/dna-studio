import { type Metadata } from 'next'
import Link from 'next/link'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { getBlogPosts } from '@/src/lib/payload'
import BlogCard from '@/src/components/blog/BlogCard'
import type { Blog } from '@/src/payload-types'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ page?: string; category?: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params

  const title = lang === 'ar' ? 'المدونة - DNA Media' : 'Blog - DNA Media'
  const description =
    lang === 'ar'
      ? 'اكتشف أحدث الأخبار والنصائح والرؤى حول إنتاج الفيديو والصناعة الإبداعية'
      : 'Discover the latest news, tips, and insights about video production and the creative industry'

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}/blog`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: 'DNA Media',
      locale: lang === 'en' ? 'en_US' : 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/blog`,
        ar: `${baseUrl}/ar/blog`,
      },
    },
  }
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = await params
  const { page: pageParam, category } = await searchParams

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1
  const postsPerPage = 12

  // Fetch blog posts with pagination and category filter
  const { docs: posts, totalPages, hasNextPage, hasPrevPage } = await getBlogPosts(
    currentPage,
    postsPerPage,
    category
  )

  // Category options
  const categories = [
    { value: '', label: { en: 'All Categories', ar: 'جميع الفئات' } },
    { value: 'video-production', label: { en: 'Video Production', ar: 'إنتاج الفيديو' } },
    { value: 'industry-news', label: { en: 'Industry News', ar: 'أخبار الصناعة' } },
    { value: 'case-studies', label: { en: 'Case Studies', ar: 'دراسات الحالة' } },
    { value: 'tips-tutorials', label: { en: 'Tips & Tutorials', ar: 'نصائح ودروس' } },
    { value: 'company-news', label: { en: 'Company News', ar: 'أخبار الشركة' } },
  ]

  const pageTitle = lang === 'ar' ? 'المدونة' : 'Blog'
  const pageSubtitle =
    lang === 'ar'
      ? 'اكتشف أحدث الأخبار والنصائح والرؤى'
      : 'Discover the latest news, tips, and insights'

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const isActive = category === cat.value || (!category && cat.value === '')
              const href = cat.value
                ? `/${lang}/blog?category=${cat.value}`
                : `/${lang}/blog`

              return (
                <Link
                  key={cat.value}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label[lang as Language]}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                {lang === 'ar' ? 'لا توجد مقالات متاحة' : 'No blog posts available'}
              </p>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post: Blog) => (
                  <BlogCard key={post.id} post={post} lang={lang as Language} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  {/* Previous Button */}
                  {hasPrevPage && (
                    <Link
                      href={`/${lang}/blog?page=${currentPage - 1}${
                        category ? `&category=${category}` : ''
                      }`}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {lang === 'ar' ? 'السابق' : 'Previous'}
                    </Link>
                  )}

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isCurrentPage = pageNum === currentPage
                      return (
                        <Link
                          key={pageNum}
                          href={`/${lang}/blog?page=${pageNum}${
                            category ? `&category=${category}` : ''
                          }`}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                            isCurrentPage
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  {hasNextPage && (
                    <Link
                      href={`/${lang}/blog?page=${currentPage + 1}${
                        category ? `&category=${category}` : ''
                      }`}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {lang === 'ar' ? 'التالي' : 'Next'}
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
