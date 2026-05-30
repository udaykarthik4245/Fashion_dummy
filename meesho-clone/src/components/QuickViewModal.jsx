'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/uiStore';
import { formatINR, calcDiscount, cn } from '@/lib/utils';

export default function QuickViewModal({ product, onClose }) {
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colors?.[0]);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const inWish = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const toast = useToastStore((s) => s.show);

  useEffect(() => {
    if (product) {
      setSize(product.sizes?.[0]);
      setColor(product.colors?.[0]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="grid md:grid-cols-2 gap-4 p-5">
              <div>
                <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover rounded-lg" />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {product.images.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} alt="" className="aspect-square object-cover rounded border border-gray-200 dark:border-gray-700" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-lg font-semibold pr-4">{product.name}</h2>
                  <button onClick={onClose} className="p-1"><X size={20} /></button>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                    {product.rating} <Star size={10} fill="currentColor" />
                  </span>
                  <span className="text-xs text-gray-500">{product.reviewCount} reviews</span>
                </div>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-bold">{formatINR(product.price)}</span>
                  {product.mrp > product.price && (
                    <>
                      <span className="text-sm text-gray-400 line-through">{formatINR(product.mrp)}</span>
                      <span className="text-sm text-green-600 font-medium">{calcDiscount(product.mrp, product.price)}% off</span>
                    </>
                  )}
                </div>

                {product.colors?.length > 1 && (
                  <div className="mt-4">
                    <div className="text-xs font-medium mb-1.5">Color: <span className="text-gray-500">{color}</span></div>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={cn(
                            'px-3 py-1 text-xs rounded border',
                            color === c
                              ? 'border-meesho bg-meesho/10'
                              : 'border-gray-200 dark:border-gray-700'
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes?.length > 1 && (
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1.5">Size: <span className="text-gray-500">{size}</span></div>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={cn(
                            'min-w-[40px] px-2 py-1 text-xs rounded border',
                            size === s
                              ? 'border-meesho bg-meesho/10'
                              : 'border-gray-200 dark:border-gray-700'
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="mt-auto pt-4 flex gap-2">
                  <button
                    onClick={() => {
                      addItem(product, 1, { size, color });
                      toast('Added to cart', 'success');
                      onClose();
                    }}
                    className="flex-1 bg-meesho hover:bg-meesho-dark text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      toggleWish(product);
                      toast(inWish ? 'Removed from wishlist' : 'Added to wishlist', 'success');
                    }}
                    className="px-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center"
                    aria-label="Wishlist"
                  >
                    <Heart size={18} className={inWish ? 'fill-meesho text-meesho' : ''} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-center text-sm text-meesho mt-3 hover:underline"
                >
                  View full details →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
