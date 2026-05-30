'use client';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/uiStore';
import { formatINR } from '@/lib/utils';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const mrpTotal = useCartStore((s) => s.mrpTotal());
  const toast = useToastStore((s) => s.show);
  const savings = mrpTotal - subtotal;
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 dark:text-gray-700" />
        <h2 className="text-xl font-semibold mt-4">Your cart is empty</h2>
        <p className="text-gray-500 mt-1">Browse products and add your favorites!</p>
        <Link
          href="/products"
          className="inline-block mt-5 px-6 py-2.5 bg-meesho hover:bg-meesho-dark text-white rounded-lg font-medium"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart ({items.length})</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((it) => (
              <motion.div
                key={it.id + it.size + it.color}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex gap-3 p-3 border border-gray-100 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
              >
                <Link href={`/product/${it.id}`} className="shrink-0">
                  <img src={it.image} alt={it.name} className="w-24 h-24 object-cover rounded" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${it.id}`} className="text-sm font-medium line-clamp-2">
                    {it.name}
                  </Link>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Size: {it.size} • Color: {it.color}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Sold by {it.seller}</div>

                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="font-semibold">{formatINR(it.price)}</span>
                    {it.mrp > it.price && (
                      <span className="text-xs text-gray-400 line-through">{formatINR(it.mrp)}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded dark:border-gray-700">
                      <button
                        onClick={() => updateQty(it.id, it.size, it.color, it.qty - 1)}
                        className="px-2 py-1"
                        disabled={it.qty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm">{it.qty}</span>
                      <button
                        onClick={() => updateQty(it.id, it.size, it.color, it.qty + 1)}
                        className="px-2 py-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(it.id, it.size, it.color);
                        toast('Item removed', 'info');
                      }}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4 h-fit lg:sticky lg:top-32">
          <h3 className="font-semibold mb-3">Price Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total MRP</span>
              <span>{formatINR(mrpTotal)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatINR(savings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatINR(subtotal + shipping)}</span>
            </div>
          </div>
          {savings > 0 && (
            <div className="mt-3 text-xs text-green-600 bg-green-50 dark:bg-green-950 px-2 py-1.5 rounded">
              You save {formatINR(savings)} on this order!
            </div>
          )}
          <Link
            href="/checkout"
            className="block mt-4 w-full text-center bg-meesho hover:bg-meesho-dark text-white py-2.5 rounded-lg font-medium"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
