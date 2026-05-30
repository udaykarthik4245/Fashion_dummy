'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/uiStore';

export default function SignupPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const toast = useToastStore((s) => s.show);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!name.trim()) return setErr('Name is required');
    if (!email.includes('@')) return setErr('Valid email required');
    if (password.length < 4) return setErr('Password must be at least 4 characters');
    if (password !== confirm) return setErr('Passwords do not match');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, action: 'signup' }),
      });
      const data = await res.json();
      if (data.ok) {
        login(data.user);
        toast('Account created!', 'success');
        router.push('/');
      } else {
        setErr(data.error || 'Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center">Create your account</h1>
        <p className="text-center text-sm text-gray-500 mt-1">Join us in less than a minute</p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border rounded-lg bg-transparent dark:border-gray-700"
            />
          </div>
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
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border rounded-lg bg-transparent dark:border-gray-700"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border rounded-lg bg-transparent dark:border-gray-700"
            />
          </div>

          {err && <div className="text-sm text-red-500">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-meesho hover:bg-meesho-dark text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create Account
          </button>

          <div className="text-center text-sm pt-2">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-meesho hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
