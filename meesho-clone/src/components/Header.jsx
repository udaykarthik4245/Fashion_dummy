'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Moon, Sun, Store, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import SearchBar from './SearchBar';
import { categories } from '@/lib/mockData';

export default function Header() {
  const cartCount = useCartStore((s) => s.items.reduce((c, i) => c + i.qty, 0));
  const wishCount = useWishlistStore((s) => s.items.length);
  const user = useAuthStore((s) => s.user);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-meesho flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold text-meesho hidden sm:block">ShopFree</span>
        </Link>

        <div className="flex-1 max-w-2xl">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            href="/seller/dashboard"
            className="hidden md:flex items-center gap-1 text-sm px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Store size={18} /> Sell
          </Link>

          <Link
            href={user ? '/profile' : '/auth/login'}
            className="flex items-center gap-1 text-sm px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User size={18} />
            <span className="hidden sm:inline">{user ? user.name : 'Login'}</span>
          </Link>

          <Link href="/wishlist" className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Heart size={20} />
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-meesho text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-meesho text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Category strip (desktop) */}
      <nav className="hidden md:block border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-6 overflow-x-auto no-scrollbar text-sm">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?cat=${c.id}`}
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-meesho transition"
            >
              <span className="mr-1">{c.icon}</span>
              {c.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-2 flex flex-col">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?cat=${c.id}`}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm border-b border-gray-100 dark:border-gray-800"
              >
                {c.icon} {c.name}
              </Link>
            ))}
            <Link
              href="/seller/dashboard"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-meesho"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
