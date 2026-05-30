'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1, options = {}) => {
        const existing = get().items.find(
          (i) => i.id === product.id && i.size === options.size && i.color === options.color
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i === existing ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                mrp: product.mrp,
                image: product.images?.[0],
                qty,
                size: options.size || product.sizes?.[0] || 'Free',
                color: options.color || product.colors?.[0] || 'Default',
                seller: product.seller,
              },
            ],
          });
        }
      },
      removeItem: (id, size, color) =>
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          ),
        }),
      updateQty: (id, size, color, qty) =>
        set({
          items: get().items.map((i) =>
            i.id === id && i.size === size && i.color === color
              ? { ...i, qty: Math.max(1, qty) }
              : i
          ),
        }),
      clear: () => set({ items: [] }),
      totalCount: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      mrpTotal: () => get().items.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0),
    }),
    { name: 'meesho-cart' }
  )
);
