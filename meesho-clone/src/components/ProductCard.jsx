'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, Eye, Truck } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/uiStore';
import { formatINR, calcDiscount, cn } from '@/lib/utils';

// Reusable product card. Fires onQuickView for the parent to render the modal.
export default function ProductCard({ product, onQuickView }) {
  const toggleWish = useWishlistStore((s) => s.toggle);
  const inWish = useWishlistStore((s) => s.has(product.id));
  const toast = useToastStore((s) => s.show);
  const discount = calcDiscount(product.mrp, product.price);

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWish(product);
    toast(inWish ? 'Removed from wishlist' : 'Added to wishlist', 'success');
  };

  const handleQuick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-md transition"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-meesho text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={handleWish}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow"
            aria-label="Wishlist"
          >
            <Heart
              size={16}
              className={cn(
                'transition',
                inWish ? 'fill-meesho text-meesho' : 'text-gray-700 dark:text-gray-200'
              )}
            />
          </button>
          {onQuickView && (
            <button
              onClick={handleQuick}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition px-3 py-1.5 bg-white dark:bg-gray-900 text-xs font-medium rounded-full shadow flex items-center gap-1"
            >
              <Eye size={14} /> Quick View
            </button>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-semibold text-base">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">{formatINR(product.mrp)}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-[11px] px-1.5 py-0.5 rounded">
              {product.rating} <Star size={10} fill="currentColor" />
            </span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          {product.freeDelivery && (
            <div className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
              <Truck size={12} /> Free Delivery
            </div>
          )}

          {product.stock <= 5 && product.stock > 0 && (
            <div className="text-[11px] text-orange-600 mt-1">Only {product.stock} left!</div>
          )}
          {product.stock === 0 && (
            <div className="text-[11px] text-red-600 mt-1">Out of stock</div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
