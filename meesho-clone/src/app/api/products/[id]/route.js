import { NextResponse } from 'next/server';
import { getProductById, getRelatedProducts } from '@/lib/mockData';

export async function GET(_req, { params }) {
  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json({
    product,
    related: getRelatedProducts(params.id),
  });
}
