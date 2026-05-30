// ─── Class name helper ────────────────────────────────────────────────────────
// Joins a list of class strings, filtering out falsy values.
// Usage: cn(styles.base, isActive && styles.active, className)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// ─── Category slug helpers ────────────────────────────────────────────────────
export function categoryToSlug(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-')
}

export function slugToCategory(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

// ─── API integration stubs ────────────────────────────────────────────────────
// TODO: Uncomment and implement when a backend/CMS is connected.

// export async function fetchPortfolioItems(params = {}) {
//   const qs = new URLSearchParams(params).toString()
//   const res = await fetch(`/api/portfolio${qs ? `?${qs}` : ''}`, {
//     next: { revalidate: 60 },   // ISR — revalidate every 60 s
//   })
//   if (!res.ok) throw new Error('Failed to fetch portfolio items')
//   return res.json()
// }

// export async function fetchHeroSlides() {
//   const res = await fetch('/api/hero', { next: { revalidate: 300 } })
//   if (!res.ok) throw new Error('Failed to fetch hero slides')
//   return res.json()
// }

// export async function submitContactForm(data) {
//   const res = await fetch('/api/contact', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
//   if (!res.ok) throw new Error('Failed to send message')
//   return res.json()
// }
