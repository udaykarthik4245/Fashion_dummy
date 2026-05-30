'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { categories } from '@/lib/mockData';

function ProductsInner() {
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get('cat') || '';
  const q = params.get('q') || '';

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [quickView, setQuickView] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState('relevance');

  const loadingRef = useRef(false);
  const observerRef = useRef(null);

  const fetchPage = async (p, replace = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    const url = new URLSearchParams({
      page: String(p),
      limit: '20',
      ...(cat && { cat }),
      ...(q && { q }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(minRating && { minRating: String(minRating) }),
      ...(inStock && { inStock: '1' }),
      ...(sort !== 'relevance' && { sort }),
    });
    const res = await fetch(`/api/products?${url.toString()}`);
    const data = await res.json();
    setItems((prev) => (replace ? data.items : [...prev, ...data.items]));
    setHasMore(data.hasMore);
    setTotal(data.total);
    setLoading(false);
    loadingRef.current = false;
  };

  // Reset & re-fetch when filters change
  useEffect(() => {
    setPage(1);
    fetchPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q, minPrice, maxPrice, minRating, inStock, sort]);

  // Infinite scroll observer
  useEffect(() => {
    const sentinel = document.getElementById('infinite-sentinel');
    if (!sentinel) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          const next = page + 1;
          setPage(next);
          fetchPage(next);
        }
      },
      { rootMargin: '300px' }
    );
    observerRef.current.observe(sentinel);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, page, items.length]);

  const updateCat = (newCat) => {
    const sp = new URLSearchParams(params);
    if (newCat) sp.set('cat', newCat);
    else sp.delete('cat');
    router.push(`/products?${sp.toString()}`);
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setInStock(false);
    setSort('relevance');
  };

  const FiltersPanel = (
    <aside className="space-y-5 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Categories</h4>
        <div className="space-y-1.5 max-h-48 overflow-auto pr-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={!cat} onChange={() => updateCat('')} />
            All
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={cat === c.id}
                onChange={() => updateCat(c.id)}
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-2 py-1 border rounded bg-transparent dark:border-gray-700"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-2 py-1 border rounded bg-transparent dark:border-gray-700"
          />
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {[
            { l: '< ₹500', mx: 500 },
            { l: '₹500-1000', mn: 500, mx: 1000 },
            { l: '₹1000-2000', mn: 1000, mx: 2000 },
            { l: '> ₹2000', mn: 2000 },
          ].map((p) => (
            <button
              key={p.l}
              onClick={() => {
                setMinPrice(p.mn ? String(p.mn) : '');
                setMaxPrice(p.mx ? String(p.mx) : '');
              }}
              className="px-2 py-0.5 text-xs border rounded dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {p.l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Rating</h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
              />
              {r}★ & above
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
            />
            Any
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          In stock only
        </label>
      </div>

      <button
        onClick={clearFilters}
        className="w-full text-meesho text-xs underline"
      >
        Clear all filters
      </button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <h1 className="text-xl font-semibold">
            {q ? `Results for "${q}"` : cat ? categories.find((c) => c.id === cat)?.name : 'All Products'}
          </h1>
          <p className="text-xs text-gray-500">{total} products</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFiltersOpen(true)}
            className="md:hidden flex items-center gap-1 px-3 py-1.5 border rounded text-sm dark:border-gray-700"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm px-2 py-1.5 border rounded bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-5">
        <div className="hidden md:block sticky top-32 self-start max-h-[calc(100vh-9rem)] overflow-auto pr-2">
          {FiltersPanel}
        </div>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setFiltersOpen(false)}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-950 p-4 overflow-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
              </div>
              {FiltersPanel}
            </div>
          </div>
        )}

        <div>
          {loading && items.length === 0 ? (
            <ProductGridSkeleton count={10} />
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
              ))}
            </div>
          )}
          <div id="infinite-sentinel" className="h-10 flex items-center justify-center text-xs text-gray-400 mt-6">
            {hasMore ? (loading ? 'Loading more...' : 'Scroll for more') : 'You’ve reached the end'}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6"><ProductGridSkeleton /></div>}>
      <ProductsInner />
    </Suspense>
  );
}
