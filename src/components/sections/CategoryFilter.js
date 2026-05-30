'use client'

import styles from './CategoryFilter.module.css'

/**
 * Horizontal pill-style category filter bar.
 *
 * Props:
 *   categories – string[]
 *   active     – currently selected category string
 *   onChange   – (category: string) => void
 */
export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className={styles.bar} role="tablist" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`${styles.btn} ${active === cat ? styles.active : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
