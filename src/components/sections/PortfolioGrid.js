'use client'

import { useState, useMemo } from 'react'
import ImageCard from '@/components/ui/ImageCard'
import CategoryFilter from './CategoryFilter'
import styles from './PortfolioGrid.module.css'
import portfolioData from '@/data/portfolio.json'

const PAGE_SIZE = 12

// TODO: When backend is ready, replace static import with:
//   const [items, setItems] = useState([])
//   useEffect(() => { fetch('/api/portfolio').then(r=>r.json()).then(setItems) }, [])

export default function PortfolioGrid({ initialCategory = 'All' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [visibleCount,   setVisibleCount]   = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return portfolioData.items
    return portfolioData.items.filter(item => item.category === activeCategory)
  }, [activeCategory])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className={styles.root}>
      {/* Filter bar */}
      <div className={styles.filterRow}>
        <CategoryFilter
          categories={portfolioData.categories}
          active={activeCategory}
          onChange={handleCategoryChange}
        />
        <p className={styles.count} aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className={styles.grid}>
          {visible.map(item => (
            <div key={item.id} className={styles.cell}>
              <ImageCard item={item} size="md" />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No items in this category yet — check back soon.</p>
      )}

      {/* Pagination — load more */}
      {hasMore && (
        <div className={styles.loadMore}>
          <button
            className={styles.loadBtn}
            onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
