'use client';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/uiStore';
import { formatINR } from '@/lib/utils';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addToCart = useCartStore((s) => s.addItem);
  const toast = useToastStore((s) => s.show);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-700" />
        <h2 className="text-xl font-semibold mt-4">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-1">Save your favorite items to easily find them later.</p>
        <Link
          href="/products"
          className="inline-block mt-5 px-6 py-2.5 bg-meesho hover:bg-meesho-dark text-white rounded-lg font-medium"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.id} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <Link href={`/product/${it.id}`}>
              <img src={it.image} alt={it.name} className="w-full aspect-square object-cover" />
            </Link>
            <div className="p-3">
              <Link href={`/product/${it.id}`} className="text-sm line-clamp-2 min-h-[2.5rem]">
                {it.name}
              </Link>
              <div className="font-semibold mt-1.5">{formatINR(it.price)}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    addToCart(it);
                    toast('Added to cart', 'success');
                  }}
                  className="flex-1 bg-meesho hover:bg-meesho-dark text-white text-xs py-1.5 rounded flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={14} /> Add
                </button>
                <button
                  onClick={() => {
                    remove(it.id);
                    toast('Removed', 'info');
                  }}
                  className="px-2 border border-gray-200 dark:border-gray-700 rounded"
                  aria-label="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
