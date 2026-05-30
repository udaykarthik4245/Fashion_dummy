'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { useToastStore } from '@/store/uiStore';

export default function ResetPage() {
  const toast = useToastStore((s) => s.show);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'reset' }),
      });
      setDone(true);
      toast('Reset link sent!', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center text-sm text-gray-500 mt-1">
          Enter your email and we'll send you a reset link.
        </p>

        {done ? (
          <div className="mt-6 text-center text-sm text-green-600">
            Check your inbox for the reset link.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border rounded-lg bg-transparent dark:border-gray-700"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-meesho hover:bg-meesho-dark text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center text-sm pt-4">
          <Link href="/auth/login" className="text-meesho hover:underline">← Back to login</Link>
        </div>
      </div>
    </div>
  );
}
