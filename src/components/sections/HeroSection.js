'use client'

import { useState, useEffect, useCallback } from 'react'
import Button from '@/components/ui/Button'
import styles from './HeroSection.module.css'

// TODO: Replace with real photography assets in /public/images/hero/
// TODO: When CMS is added, fetch from: GET /api/hero   → { slides: [...] }
const SLIDES = [
  {
    id:          1,
    src:         'https://picsum.photos/seed/fashion-hero1/1600/900',
    alt:         'Editorial fashion shoot — summer collection',
    eyebrow:     'Summer 2025',
    headline:    'The Art of',
    sub:         'Personal Style',
    description: 'Curating fashion stories that celebrate individuality and self-expression.',
    cta:         { label: 'View Portfolio', href: '/portfolio' },
    ctaAlt:      { label: 'Book a Session', href: '/contact' },
  },
  {
    id:          2,
    src:         'https://picsum.photos/seed/fashion-hero2/1600/900',
    alt:         'Brand photography — autumn lookbook campaign',
    eyebrow:     'Brand Work',
    headline:    'Brand',
    sub:         'Photography',
    description: 'Elevating brands through compelling visual narratives that resonate.',
    cta:         { label: 'See Collections', href: '/portfolio' },
    ctaAlt:      { label: 'Collaborate', href: '/contact' },
  },
  {
    id:          3,
    src:         'https://picsum.photos/seed/fashion-hero3/1600/900',
    alt:         'Lifestyle photography — accessories editorial',
    eyebrow:     'Lifestyle',
    headline:    'Life',
    sub:         'Elevated',
    description: 'Where fashion meets the quiet poetry of everyday moments.',
    cta:         { label: 'Explore',   href: '/portfolio' },
    ctaAlt:      { label: 'About Me',  href: '/about'     },
  },
]

const INTERVAL = 5000

export default function HeroSection() {
  const [current,        setCurrent]        = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index) => {
    if (index === current || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setIsTransitioning(false)
    }, 380)
  }, [current, isTransitioning])

  const goNext = useCallback(() => {
    goTo((current + 1) % SLIDES.length)
  }, [current, goTo])

  useEffect(() => {
    const id = setInterval(goNext, INTERVAL)
    return () => clearInterval(id)
  }, [goNext])

  const slide = SLIDES[current]

  return (
    <section className={styles.hero} aria-label="Hero slideshow">

      {/* Background image */}
      <div className={`${styles.bg} ${isTransitioning ? styles.fading : ''}`}>
        <img
          src={slide.src}
          alt={slide.alt}
          className={styles.bgImg}
          loading="eager"
          fetchpriority="high"
        />
        <div className={styles.bgOverlay} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={`${styles.textBlock} ${isTransitioning ? styles.fading : ''}`}>
          <p className={styles.eyebrow}>{slide.eyebrow}</p>
          <h1 className={styles.headline}>
            {slide.headline}
            <br />
            <em>{slide.sub}</em>
          </h1>
          <p className={styles.description}>{slide.description}</p>
          <div className={styles.actions}>
            <Button as="link" href={slide.cta.href}    variant="primary">
              {slide.cta.label}
            </Button>
            <Button as="link" href={slide.ctaAlt.href} variant="outline">
              {slide.ctaAlt.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className={styles.controls} role="tablist" aria-label="Slideshow controls">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${s.sub}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
