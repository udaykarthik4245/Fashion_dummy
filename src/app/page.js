import HeroSection from '@/components/sections/HeroSection'
import FeaturedCollection from '@/components/sections/FeaturedCollection'
import Button from '@/components/ui/Button'
import styles from './page.module.css'

export const metadata = {
  title: 'Élite Style — Fashion & Lifestyle Portfolio',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <FeaturedCollection />

      {/* ── Brand pillars strip ──────────────────────────────────────────────── */}
      <section className={`section ${styles.pillars}`}>
        <div className="container">
          <div className={styles.pillarsGrid}>
            {[
              {
                number: '01',
                title:  'Personal Style',
                body:   'Authentic looks curated for real life — documenting personal fashion with an editorial eye.',
              },
              {
                number: '02',
                title:  'Brand Photography',
                body:   'Visual narratives that elevate products and build brand identity through imagery.',
              },
              {
                number: '03',
                title:  'Lifestyle',
                body:   'Where fashion meets the quiet poetry of everyday moments and seasonal living.',
              },
            ].map(({ number, title, body }) => (
              <div key={number} className={styles.pillar}>
                <span className={styles.pillarNumber}>{number}</span>
                <div className={styles.pillarLine} />
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p  className={styles.pillarBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-width CTA banner ────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaText}>
            <p className={styles.ctaEyebrow}>Let's Work Together</p>
            <h2 className={styles.ctaHeading}>
              Have a project in mind?<br />
              <em>Let's create something beautiful.</em>
            </h2>
          </div>
          <div className={styles.ctaActions}>
            <Button as="link" href="/contact" variant="primary" size="lg">
              Start a Conversation
            </Button>
            <Button as="link" href="/about" variant="outline-light" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
