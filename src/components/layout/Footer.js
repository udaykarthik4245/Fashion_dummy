import Link from 'next/link'
import styles from './Footer.module.css'

// TODO: Replace href="#" placeholders with real social profile URLs
const SOCIAL = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Pinterest' },
  { href: '#', label: 'LinkedIn'  },
]

const CATEGORIES = [
  { label: 'Personal Outfits',   slug: 'Personal Outfits'   },
  { label: 'Brand Photography',  slug: 'Brand Photography'  },
  { label: 'Accessories',        slug: 'Accessories'        },
  { label: 'Lifestyle',          slug: 'Lifestyle'          },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Élite Style home">
            <span className={styles.logoText}>ÉLITE STYLE</span>
            <span className={styles.logoSub}>Portfolio</span>
          </Link>
          <p className={styles.tagline}>
            Curating fashion stories through the lens.
          </p>
        </div>

        {/* Navigation columns */}
        <nav className={styles.cols} aria-label="Footer">
          <div className={styles.col}>
            <h3 className={styles.colHeading}>Navigate</h3>
            <ul>
              {[['/', 'Home'], ['/portfolio', 'Portfolio'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={styles.link}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colHeading}>Categories</h3>
            <ul>
              {CATEGORIES.map(({ label, slug }) => (
                <li key={slug}>
                  {/* TODO: Wire category param to PortfolioGrid filter when URL state is added */}
                  <Link href={`/portfolio?category=${encodeURIComponent(slug)}`} className={styles.link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Social */}
        <div className={styles.social}>
          <h3 className={styles.colHeading}>Follow</h3>
          <ul className={styles.socialList}>
            {SOCIAL.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${label}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          {/* TODO: Add /privacy-policy and /terms pages when legal copy is ready */}
          <p className={styles.copy}>
            © {new Date().getFullYear()} Élite Style Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
