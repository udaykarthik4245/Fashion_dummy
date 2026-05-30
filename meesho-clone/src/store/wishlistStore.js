'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find((i) => i.id === product.id);
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== product.id) });
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
                rating: product.rating,
              },
            ],
          });
        }
      },
      has: (id) => !!get().items.find((i) => i.id === id),
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
    }),
    { name: 'meesho-wishlist' }
  )
);
