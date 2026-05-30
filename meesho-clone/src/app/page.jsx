'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { categories, banners, products } from '@/lib/mockData';
import { useUIStore } from '@/store/uiStore';

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const browsingHistory = useUIStore((s) => s.browsingHistory);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products?sort=rating&limit=10')
      .then((r) => r.json())
      .then((d) => setTrending(d.items))
      .finally(() => setLoading(false));
  }, []);

  // Personalized recommendations: products from the categories of recently viewed items.
  const recommended = (() => {
    if (browsingHistory.length === 0) return [];
    const viewedCats = new Set(
      browsingHistory
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
        .map((p) => p.category)
    );
    return products
      .filter((p) => viewedCats.has(p.category) && !browsingHistory.includes(p.id))
      .slice(0, 10);
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-8">
      {/* Hero banner carousel */}
      <section className="relative h-44 sm:h-56 md:h-72 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
        {banners.map((b, i) => (
          <motion.div
            key={b.id}
            initial={false}
            animate={{ opacity: i === bannerIdx ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{ pointerEvents: i === bannerIdx ? 'auto' : 'none' }}
          >
            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 md:px-12">
              <div className="text-white max-w-md">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl md:text-4xl font-bold"
                >
                  {b.title}
                </motion.h2>
                <p className="text-sm md:text-base mt-2 opacity-90">{b.subtitle}</p>
                <Link
                  href={b.href}
                  className="mt-4 inline-block px-5 py-2 bg-meesho hover:bg-meesho-dark rounded-lg font-medium text-sm"
                >
                  {b.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        <button
          onClick={() => setBannerIdx((i) => (i - 1 + banners.length) % banners.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setBannerIdx((i) => (i + 1) % banners.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 z-10"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === bannerIdx ? 'bg-white w-6' : 'bg-white/50 w-1.5'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories grid */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Shop by Category</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?cat=${c.id}`}
              className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow transition"
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="text-xs mt-1.5 line-clamp-2">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Personalized recommendations (only shown if user has browsing history) */}
      {recommended.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-lg font-semibold">Recommended for You</h3>
            <span className="text-xs text-gray-500">Based on your recent activity</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        </section>
      )}

      {/* Trending */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Trending Now</h3>
        {loading ? (
          <ProductGridSkeleton count={10} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        )}
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
