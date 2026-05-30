'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package } from 'lucide-react';
import { motion } from 'framer-motion';

function OrderSuccessInner() {
  const params = useSearchParams();
  const orderId = params.get('id') || 'XXX';

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="inline-block"
      >
        <CheckCircle2 size={80} className="text-green-500 mx-auto" />
      </motion.div>
      <h1 className="text-2xl font-semibold mt-4">Order Placed Successfully!</h1>
      <p className="text-gray-500 mt-2">Thank you for shopping with us.</p>

      <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 inline-block">
        <div className="text-xs text-gray-500">Order ID</div>
        <div className="font-mono font-medium text-lg">{orderId}</div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
        <Package size={16} /> Expected delivery: 3-5 business days
      </div>

      <div className="flex gap-2 justify-center mt-6">
        <Link href="/profile" className="px-5 py-2 border rounded-lg dark:border-gray-700">
          View Orders
        </Link>
        <Link href="/products" className="px-5 py-2 bg-meesho hover:bg-meesho-dark text-white rounded-lg">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessInner />
    </Suspense>
  );
}
