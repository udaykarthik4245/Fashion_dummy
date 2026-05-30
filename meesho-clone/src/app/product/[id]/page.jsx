'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { DetailSkeleton } from '@/components/Skeletons';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore, useUIStore } from '@/store/uiStore';
import { formatINR, calcDiscount, cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const inWish = useWishlistStore((s) => s.has(id));
  const toast = useToastStore((s) => s.show);
  const trackView = useUIStore((s) => s.trackView);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          router.push('/products');
          return;
        }
        setData(d);
        setSize(d.product.sizes?.[0]);
        setColor(d.product.colors?.[0]);
        trackView(d.product.id);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-6"><DetailSkeleton /></div>;
  }
  if (!data) return null;

  const { product, related } = data;
  const discount = calcDiscount(product.mrp, product.price);

  const handleAdd = () => {
    addItem(product, qty, { size, color });
    toast(`${product.name} added to cart`, 'success');
  };
  const handleBuy = () => {
    addItem(product, qty, { size, color });
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <nav className="text-xs text-gray-500 mb-3 flex items-center gap-1 flex-wrap">
        <span>Home</span> <ChevronRight size={12} />
        <span className="capitalize">{product.category.replace('-', ' ')}</span>
        <ChevronRight size={12} />
        <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image gallery */}
        <div>
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden"
          >
            <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={cn(
                  'aspect-square rounded overflow-hidden border-2',
                  i === imgIdx ? 'border-meesho' : 'border-transparent'
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
              {product.rating} <Star size={10} fill="currentColor" />
            </span>
            <span className="text-sm text-gray-500">{product.reviewCount} ratings</span>
          </div>

          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl font-bold">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-gray-400 line-through">{formatINR(product.mrp)}</span>
                <span className="text-green-600 font-medium">{discount}% off</span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">Inclusive of all taxes</div>

          {product.colors?.length > 0 && (
            <div className="mt-5">
              <div className="text-sm font-medium mb-2">Color: <span className="text-gray-500">{color}</span></div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded border',
                      color === c ? 'border-meesho bg-meesho/10' : 'border-gray-200 dark:border-gray-700'
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Size: <span className="text-gray-500">{size}</span></div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'min-w-[44px] px-3 py-1.5 text-sm rounded border',
                      size === s ? 'border-meesho bg-meesho/10' : 'border-gray-200 dark:border-gray-700'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium">Qty:</span>
            <div className="flex items-center border rounded dark:border-gray-700">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1">-</button>
              <span className="px-3">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1">+</button>
            </div>
            <span className="text-xs text-gray-500">{product.stock} in stock</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="bg-meesho hover:bg-meesho-dark text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={handleBuy}
              disabled={product.stock === 0}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          <button
            onClick={() => {
              toggleWish(product);
              toast(inWish ? 'Removed from wishlist' : 'Added to wishlist', 'success');
            }}
            className="mt-2 w-full border border-gray-200 dark:border-gray-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
          >
            <Heart size={16} className={inWish ? 'fill-meesho text-meesho' : ''} />
            {inWish ? 'In Wishlist' : 'Add to Wishlist'}
          </button>

          <div className="grid grid-cols-3 gap-2 mt-5 text-xs">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <Truck size={16} /> Free Delivery
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <RotateCcw size={16} /> 7-day Returns
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <Shield size={16} /> Cash on Delivery
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm">
            <span className="text-gray-500">Sold by:</span>{' '}
            <span className="font-medium">{product.seller}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
          {['description', 'specifications', 'reviews'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'pb-2 text-sm capitalize border-b-2 -mb-px',
                tab === t ? 'border-meesho text-meesho' : 'border-transparent text-gray-500'
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-5">
          {tab === 'description' && (
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{product.description}</p>
          )}
          {tab === 'specifications' && (
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {Object.entries(product.specifications || {}).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'reviews' && (
            <div className="space-y-4">
              {product.reviews.map((r, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                      {r.rating} <Star size={10} fill="currentColor" />
                    </span>
                    <span className="font-medium text-sm">{r.user}</span>
                    <span className="text-xs text-gray-500">{r.date}</span>
                  </div>
                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related?.length > 0 && (
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Similar Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
