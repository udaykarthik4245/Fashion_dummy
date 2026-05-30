import Link from 'next/link'
import ImageCard from '@/components/ui/ImageCard'
import Button from '@/components/ui/Button'
import styles from './FeaturedCollection.module.css'
import portfolioData from '@/data/portfolio.json'

// TODO: Replace static import with API call when CMS/backend is ready.
// Example: const items = await fetch('/api/portfolio?featured=true&limit=6').then(r => r.json())
export default function FeaturedCollection() {
  const featured = portfolioData.items.filter(i => i.featured).slice(0, 6)

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">

        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Selected Work</p>
            <h2 className={styles.heading}>Featured Collection</h2>
          </div>
          <Button as="link" href="/portfolio" variant="outline">
            View All
          </Button>
        </header>

        {/*
          Grid layout: first item spans 8/12 cols (editorial hero card),
          remaining 5 span 4/12 each, forming a 3-up row.
        */}
        <div className={styles.grid}>
          {featured.map((item, i) => (
            <div key={item.id} className={`${styles.cell} ${i === 0 ? styles.hero : ''}`}>
              <ImageCard item={item} size={i === 0 ? 'lg' : 'md'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
