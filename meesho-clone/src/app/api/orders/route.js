import { NextResponse } from 'next/server';

// In-memory order store. Resets on server restart — sufficient for demo.
const orders = [];

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const order = {
    id: 'ORD' + Math.floor(100000 + Math.random() * 900000),
    items: body.items || [],
    address: body.address || {},
    payment: body.payment || 'COD',
    total: body.total || 0,
    status: 'Confirmed',
    placedAt: '2026-05-30',
    expectedDelivery: '2026-06-05',
  };
  orders.push(order);
  return NextResponse.json({ ok: true, order });
}
