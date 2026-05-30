'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// UI state: theme + browsing history (used to power recommendations).
export const useUIStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      browsingHistory: [],
      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setTheme: (t) => set({ theme: t }),
      trackView: (productId) => {
        const hist = [productId, ...get().browsingHistory.filter((id) => id !== productId)].slice(0, 20);
        set({ browsingHistory: hist });
      },
    }),
    { name: 'meesho-ui' }
  )
);

// Toast store — separate so toasts don't get persisted.
export const useToastStore = create((set, get) => ({
  toasts: [],
  show: (msg, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    set({ toasts: [...get().toasts, { id, msg, type }] });
    setTimeout(() => {
      set({ toasts: get().toasts.filter((t) => t.id !== id) });
    }, 2800);
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
