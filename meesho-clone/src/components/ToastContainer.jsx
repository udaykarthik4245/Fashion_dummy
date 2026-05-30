'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useToastStore } from '@/store/uiStore';

const iconMap = {
  success: CheckCircle2,
  info: Info,
  error: AlertCircle,
};

export default function ToastContainer() {
  const { toasts, dismiss } = useToastStore();
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = iconMap[t.type] || Info;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={
                'flex items-center gap-3 rounded-lg shadow-lg px-4 py-3 text-sm border ' +
                (t.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200'
                  : t.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200'
                  : 'bg-white border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100')
              }
            >
              <Icon size={18} />
              <span className="flex-1">{t.msg}</span>
              <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100">
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
