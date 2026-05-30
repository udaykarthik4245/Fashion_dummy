import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Shop</h4>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li><Link href="/products?cat=women-ethnic">Women Ethnic</Link></li>
            <li><Link href="/products?cat=men">Men</Link></li>
            <li><Link href="/products?cat=electronics">Electronics</Link></li>
            <li><Link href="/products?cat=home-kitchen">Home & Kitchen</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Help</h4>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>Track Order</li>
            <li>Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Sell</h4>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li><Link href="/seller/dashboard">Seller Dashboard</Link></li>
            <li>How it works</li>
            <li>Seller Support</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">About</h4>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2026 Meesho Clone — Demo project. Built with Next.js & Tailwind.
      </div>
    </footer>
  );
}
