'use client';
import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';
import ToastContainer from './ToastContainer';

// Top-level client provider: applies theme class to <html>, mounts toasts.
export default function Providers({ children }) {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
