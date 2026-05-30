import { NextResponse } from 'next/server';

// Mock auth — in production this would verify credentials, hash passwords,
// and issue a JWT/session cookie. Here we simulate success for any input.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { email, password, name, action } = body;

  if (action === 'reset') {
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    return NextResponse.json({ ok: true, message: 'Password reset link sent.' });
  }

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const user = {
    id: 'u_' + email.split('@')[0],
    email,
    name: name || email.split('@')[0],
    isSeller: email.includes('seller'),
  };

  return NextResponse.json({ ok: true, user, token: 'mock-jwt-' + user.id });
}
