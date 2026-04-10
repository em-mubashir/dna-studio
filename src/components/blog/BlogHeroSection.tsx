import Link from 'next/link'
import Image from 'next/image'

interface BlogHeroSectionProps {
  title: string | null
  topic: string | null
  imageUrl: string | null
  link: string
  lang: string
  showReadMore?: boolean
}

export default function BlogHeroSection({ title, topic, imageUrl, link, lang, showReadMore = true }: BlogHeroSectionProps) {
  const readMoreText = lang === 'ar' ? 'اقرأ المزيد' : 'Read More'

  return (
    <section className="relative w-full pt-[72px] md:pt-[120px]">
      <div className="relative mx-3 sm:mx-4 md:mx-12 mt-4 md:mt-[54px]">
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[1824/1027] overflow-hidden rounded-sm">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title || 'Blog hero'}
              fill
              unoptimized
              className="object-cover grayscale"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-14">
            {topic && (
              <span className="inline-block w-fit px-3 sm:px-4 py-1 sm:py-1.5 mb-3 md:mb-5 text-[10px] sm:text-xs md:text-sm font-medium text-white border border-white/60 rounded-sm">
                {topic}
              </span>
            )}

            {title && (
              <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight max-w-3xl mb-4 md:mb-8 whitespace-pre-line">
                {title}
              </h1>
            )}

            {showReadMore && (
              <Link
                href={link}
                className="inline-flex items-center gap-2 text-sm md:text-base text-white/90 hover:text-white transition-colors group"
              >
                {readMoreText}
                <span className="inline-flex items-center gap-0.5 text-white/70 group-hover:text-white transition-colors">
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
