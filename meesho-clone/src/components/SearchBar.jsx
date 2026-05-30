'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';

// Debounced search with autocomplete suggestions hitting /api/search.
export default function SearchBar() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (!q) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  const submit = (e) => {
    e?.preventDefault?.();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/products?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={submit} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
        <Search size={18} className="text-gray-500" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Try saree, kurti, sneakers..."
          className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
        />
        {loading && <Loader2 size={16} className="animate-spin text-gray-500" />}
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          {suggestions.map((s) => (
            <Link
              key={s.id}
              href={`/product/${s.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <img src={s.image} alt="" className="w-10 h-10 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{s.name}</div>
                <div className="text-xs text-gray-500">{s.category}</div>
              </div>
            </Link>
          ))}
          <button
            onClick={submit}
            className="w-full px-3 py-2 text-sm text-meesho text-left hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800"
          >
            See all results for "{q}"
          </button>
        </div>
      )}
    </div>
  );
}
