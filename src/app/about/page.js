import Button from '@/components/ui/Button'
import styles from './page.module.css'

export const metadata = {
  title: 'About',
  description: 'Learn about the photographer and stylist behind the fashion portfolio.',
}

const EXPERTISE = [
  {
    area:   'Fashion Photography',
    skills: ['Editorial', 'Lookbooks', 'Street Style', 'Campaign'],
  },
  {
    area:   'Styling',
    skills: ['Personal Styling', 'Brand Styling', 'Wardrobe Curation', 'Trend Forecasting'],
  },
  {
    area:   'Content Creation',
    skills: ['Social Media', 'E-Commerce', 'Brand Identity', 'Visual Storytelling'],
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero / Bio ───────────────────────────────────────────────────────── */}
      <section className={styles.intro}>
        <div className={`container ${styles.introInner}`}>

          {/* Portrait */}
          <div className={styles.portrait}>
            <div className={styles.portraitFrame}>
              {/* TODO: Replace src with actual portrait photo in /public/images/  */}
              <img
                src="https://picsum.photos/seed/portrait-elite/600/750"
                alt="Portrait of the fashion photographer"
                className={styles.portraitImg}
                loading="eager"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className={styles.bio}>
            <p className={styles.eyebrow}>About Me</p>
            <h1 className={styles.heading}>
              Style is a<br />
              <em>language</em> spoken<br />
              through image.
            </h1>

            {/* TODO: Replace with actual bio copy from CMS (e.g., GET /api/about) */}
            <p className={styles.copy}>
              I am a fashion photographer and stylist passionate about creating visual stories
              that capture the intersection of personal style and everyday life. With an eye for
              composition and a deep love for fashion culture, I craft images that are both
              aspirational and deeply authentic.
            </p>
            <p className={styles.copy}>
              My work spans personal style documentation, brand collaborations, and editorial
              photography — always driven by the belief that great fashion imagery should feel
              as real as it is beautiful.
            </p>

            <div className={styles.actions}>
              <Button as="link" href="/portfolio" variant="secondary">
                View Portfolio
              </Button>
              <Button as="link" href="/contact" variant="outline">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expertise ────────────────────────────────────────────────────────── */}
      <section className={`section ${styles.expertise}`}>
        <div className="container">
          <h2 className={styles.sectionHeading}>Expertise</h2>
          <div className={styles.skillsGrid}>
            {EXPERTISE.map(({ area, skills }) => (
              <div key={area} className={styles.skillGroup}>
                <h3 className={styles.skillArea}>{area}</h3>
                <ul className={styles.skillList}>
                  {skills.map(s => (
                    <li key={s} className={styles.skillItem}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className={`section ${styles.cta}`}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaHeading}>
            Let's create<br />
            <em>something beautiful</em>
          </h2>
          <Button as="link" href="/contact" variant="primary" size="lg">
            Start a Conversation
          </Button>
        </div>
      </section>
    </>
  )
}
