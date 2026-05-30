import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-meesho">404</h1>
      <p className="text-lg mt-2">Page not found</p>
      <p className="text-gray-500 text-sm mt-1">The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="inline-block mt-5 px-5 py-2 bg-meesho hover:bg-meesho-dark text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
