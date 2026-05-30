'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      orders: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addAddress: (addr) =>
        set({ addresses: [...get().addresses, { id: Date.now(), ...addr }] }),
      removeAddress: (id) =>
        set({ addresses: get().addresses.filter((a) => a.id !== id) }),
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
    }),
    { name: 'meesho-auth' }
  )
);
