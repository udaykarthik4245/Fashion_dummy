import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// next/font is part of Next.js — zero external bundle cost, fonts are self-hosted
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata = {
  title: {
    default: 'Élite Style — Fashion & Lifestyle Portfolio',
    template: '%s | Élite Style',
  },
  description:
    'A curated fashion portfolio showcasing personal style, brand photography, and lifestyle imagery.',
  keywords: ['fashion', 'portfolio', 'photography', 'lifestyle', 'style', 'outfits', 'brand'],
  openGraph: {
    title: 'Élite Style — Fashion & Lifestyle Portfolio',
    description: 'A curated fashion portfolio showcasing personal style and brand photography.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
