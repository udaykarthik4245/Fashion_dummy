import { NextResponse } from 'next/server';
import { products } from '@/lib/mockData';

// In-memory seller-managed catalog. Bootstraps from a slice of mock products.
let sellerCatalog = products.slice(0, 8).map((p) => ({ ...p }));
let nextId = 10000;

export async function GET() {
  return NextResponse.json({ products: sellerCatalog });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.price) {
    return NextResponse.json({ error: 'Name and price required' }, { status: 400 });
  }
  const newP = {
    id: String(nextId++),
    name: body.name,
    category: body.category || 'women-ethnic',
    price: Number(body.price),
    mrp: Number(body.mrp || body.price),
    stock: Number(body.stock || 10),
    rating: 0,
    reviewCount: 0,
    seller: body.seller || 'My Store',
    images: body.images?.length
      ? body.images
      : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=70'],
    description: body.description || '',
    specifications: body.specifications || {},
    colors: body.colors || ['Default'],
    sizes: body.sizes || ['Free'],
    reviews: [],
    freeDelivery: true,
    createdAt: '2026-05-30',
  };
  sellerCatalog.unshift(newP);
  return NextResponse.json({ ok: true, product: newP });
}

export async function PUT(req) {
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const idx = sellerCatalog.findIndex((p) => p.id === String(body.id));
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  sellerCatalog[idx] = { ...sellerCatalog[idx], ...body };
  return NextResponse.json({ ok: true, product: sellerCatalog[idx] });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  sellerCatalog = sellerCatalog.filter((p) => p.id !== id);
  return NextResponse.json({ ok: true });
}
