import PortfolioGrid from '@/components/sections/PortfolioGrid'
import styles from './page.module.css'

export const metadata = {
  title: 'Portfolio',
  description: 'Browse the complete collection — personal outfits, brand photography, accessories, and lifestyle imagery.',
}

export default function PortfolioPage() {
  return (
    <>
      {/* Page hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>The Work</p>
          <h1 className={styles.heading}>Portfolio</h1>
          <p className={styles.lead}>
            A curated collection of fashion stories — from personal style to brand narratives.
          </p>
        </div>
      </section>

      {/* Grid with category filter */}
      <section className={`section ${styles.content}`}>
        <div className="container">
          {/*
            TODO: Pass initialCategory from URL search params for deep-linking.
            Example: const cat = searchParams?.category ?? 'All'
            <PortfolioGrid initialCategory={cat} />
          */}
          <PortfolioGrid />
        </div>
      </section>
    </>
  )
}
