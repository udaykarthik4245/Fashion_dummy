'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
]

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const pathname = usePathname()

  // Darken header after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Élite Style — go to home">
          <span className={styles.logoText}>ÉLITE STYLE</span>
          <span className={styles.logoSub}>Portfolio</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile primary">
          <ul className={styles.mobileList}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobileLink} ${pathname === href ? styles.active : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
