import styles from './ImageCard.module.css'

/**
 * ImageCard — the core portfolio display unit.
 *
 * Props:
 *   item         – portfolio item object from portfolio.json
 *   size         – 'sm' | 'md' | 'lg'  (controls aspect ratio)
 *   showOverlay  – boolean (default true) — hover overlay with meta
 *   onClick      – optional click handler (for lightbox integration)
 *
 * TODO: Wrap with a lightbox/modal when a viewer is added.
 * TODO: Replace <img> with Next.js <Image> after switching to a Node host
 *       that supports Image Optimization.
 */
export default function ImageCard({ item, size = 'md', showOverlay = true, onClick }) {
  const { title, category, image, description } = item

  return (
    <article
      className={`${styles.card} ${styles[size]}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className={styles.frame}>
        {/* Lazy-loaded image — browser handles this natively */}
        <img
          src={image}
          alt={`${title} — ${category}`}
          className={styles.img}
          loading="lazy"
          decoding="async"
        />

        {showOverlay && (
          <div className={styles.overlay} aria-hidden="true">
            <div className={styles.overlayBody}>
              <p className={styles.overlayCat}>{category}</p>
              <h3 className={styles.overlayTitle}>{title}</h3>
              {description && (
                <p className={styles.overlayDesc}>{description}</p>
              )}
              <span className={styles.viewCta}>View ↗</span>
            </div>
          </div>
        )}
      </div>

      {/* Below-card meta — visible on mobile where hover isn't available */}
      <div className={styles.meta}>
        <p className={styles.metaCat}>{category}</p>
        <h3 className={styles.metaTitle}>{title}</h3>
      </div>
    </article>
  )
}
