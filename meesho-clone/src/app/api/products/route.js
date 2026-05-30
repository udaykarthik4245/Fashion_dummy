import { NextResponse } from 'next/server';
import { products } from '@/lib/mockData';

// GET /api/products?cat=&q=&minPrice=&maxPrice=&minRating=&sort=&page=&limit=
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat');
  const q = searchParams.get('q')?.toLowerCase();
  const minPrice = Number(searchParams.get('minPrice') || 0);
  const maxPrice = Number(searchParams.get('maxPrice') || 1_000_000);
  const minRating = Number(searchParams.get('minRating') || 0);
  const inStock = searchParams.get('inStock') === '1';
  const sort = searchParams.get('sort') || 'relevance';
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);

  let filtered = products.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (inStock && p.stock <= 0) return false;
    return true;
  });

  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      break;
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return NextResponse.json({
    items,
    total,
    page,
    limit,
    hasMore: start + limit < total,
  });
}
