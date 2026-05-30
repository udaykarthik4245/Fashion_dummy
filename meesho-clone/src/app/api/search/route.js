import { NextResponse } from 'next/server';
import { searchSuggestions } from '@/lib/mockData';

// GET /api/search?q=
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  return NextResponse.json({ suggestions: searchSuggestions(q) });
}
