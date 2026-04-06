'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-end gap-2" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-white/60 hover:text-white disabled:text-white/20 transition-colors text-lg px-1"
        aria-label="Previous page"
      >
        &lsaquo;
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
            page === currentPage
              ? 'text-white font-bold'
              : 'text-white/50 hover:text-white'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-white/60 hover:text-white disabled:text-white/20 transition-colors text-lg px-1"
        aria-label="Next page"
      >
        &rsaquo;
      </button>
    </nav>
  )
}
