'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ChevronRight, MapPin, CreditCard, Wallet, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/uiStore';
import { formatINR, cn } from '@/lib/utils';

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const addresses = useAuthStore((s) => s.addresses);
  const addAddress = useAuthStore((s) => s.addAddress);
  const addOrder = useAuthStore((s) => s.addOrder);
  const toast = useToastStore((s) => s.show);

  const [step, setStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || null);
  const [showAddrForm, setShowAddrForm] = useState(addresses.length === 0);
  const [addr, setAddr] = useState({
    name: user?.name || '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [payment, setPayment] = useState('COD');
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping;
  const selectedAddr =
    addresses.find((a) => a.id === selectedAddressId) || (showAddrForm ? addr : null);

  const saveAddress = (e) => {
    e?.preventDefault?.();
    if (!addr.name || !addr.phone || !addr.line1 || !addr.pincode) {
      toast('Please fill all address fields', 'error');
      return;
    }
    const id = Date.now();
    addAddress(addr);
    setSelectedAddressId(id);
    setShowAddrForm(false);
    toast('Address saved', 'success');
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          address: selectedAddr,
          payment,
          total,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        addOrder(data.order);
        clear();
        router.push(`/order-success?id=${data.order.id}`);
      }
    } catch (e) {
      toast('Order failed, try again', 'error');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-6 max-w-md">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border',
                i < step
                  ? 'bg-meesho text-white border-meesho'
                  : i === step
                  ? 'border-meesho text-meesho'
                  : 'border-gray-300 text-gray-400'
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={cn('ml-2 text-sm', i === step ? 'font-medium' : 'text-gray-500')}>
              {s}
            </span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          {step === 0 && (
            <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin size={18} /> Delivery Address</h3>
              {addresses.map((a) => (
                <label
                  key={a.id}
                  className={cn(
                    'flex gap-2 p-3 border rounded mb-2 cursor-pointer',
                    selectedAddressId === a.id
                      ? 'border-meesho bg-meesho/5'
                      : 'border-gray-200 dark:border-gray-700'
                  )}
                >
                  <input
                    type="radio"
                    checked={selectedAddressId === a.id}
                    onChange={() => setSelectedAddressId(a.id)}
                  />
                  <div className="text-sm">
                    <div className="font-medium">{a.name} • {a.phone}</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {a.line1}, {a.city}, {a.state} - {a.pincode}
                    </div>
                  </div>
                </label>
              ))}
              {showAddrForm ? (
                <form onSubmit={saveAddress} className="grid sm:grid-cols-2 gap-2 mt-3">
                  <input
                    placeholder="Full Name"
                    value={addr.name}
                    onChange={(e) => setAddr({ ...addr, name: e.target.value })}
                    className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                  />
                  <input
                    placeholder="Phone"
                    value={addr.phone}
                    onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
                    className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                  />
                  <input
                    placeholder="Address line"
                    value={addr.line1}
                    onChange={(e) => setAddr({ ...addr, line1: e.target.value })}
                    className="sm:col-span-2 px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                  />
                  <input
                    placeholder="City"
                    value={addr.city}
                    onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                    className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                  />
                  <input
                    placeholder="State"
                    value={addr.state}
                    onChange={(e) => setAddr({ ...addr, state: e.target.value })}
                    className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                  />
                  <input
                    placeholder="Pincode"
                    value={addr.pincode}
                    onChange={(e) => setAddr({ ...addr, pincode: e.target.value })}
                    className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                  />
                  <button type="submit" className="sm:col-span-2 bg-meesho text-white py-2 rounded">
                    Save Address
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowAddrForm(true)}
                  className="text-meesho text-sm mt-2 hover:underline"
                >
                  + Add New Address
                </button>
              )}
              <button
                disabled={!selectedAddressId && !showAddrForm}
                onClick={() => {
                  if (!selectedAddr) {
                    toast('Select an address', 'error');
                    return;
                  }
                  setStep(1);
                }}
                className="mt-4 w-full sm:w-auto px-6 py-2 bg-meesho hover:bg-meesho-dark text-white rounded font-medium disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </section>
          )}

          {step === 1 && (
            <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment Method</h3>
              <div className="space-y-2">
                {[
                  { id: 'COD', label: 'Cash on Delivery', icon: Truck },
                  { id: 'UPI', label: 'UPI / Google Pay / PhonePe', icon: Wallet },
                  { id: 'CARD', label: 'Credit / Debit Card', icon: CreditCard },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <label
                      key={p.id}
                      className={cn(
                        'flex items-center gap-3 p-3 border rounded cursor-pointer',
                        payment === p.id ? 'border-meesho bg-meesho/5' : 'border-gray-200 dark:border-gray-700'
                      )}
                    >
                      <input
                        type="radio"
                        checked={payment === p.id}
                        onChange={() => setPayment(p.id)}
                      />
                      <Icon size={18} />
                      <span className="text-sm">{p.label}</span>
                    </label>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setStep(0)} className="px-4 py-2 border rounded dark:border-gray-700">
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 sm:flex-none px-6 py-2 bg-meesho hover:bg-meesho-dark text-white rounded font-medium"
                >
                  Review Order
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              {selectedAddr && (
                <div className="text-sm bg-gray-50 dark:bg-gray-800 rounded p-3">
                  <div className="font-medium">Deliver to: {selectedAddr.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {selectedAddr.line1}, {selectedAddr.city}, {selectedAddr.state} - {selectedAddr.pincode}
                  </div>
                </div>
              )}
              <div className="text-sm">Payment: <span className="font-medium">{payment}</span></div>
              <div className="space-y-2">
                {items.map((it) => (
                  <div key={it.id + it.size + it.color} className="flex gap-3 text-sm">
                    <img src={it.image} alt="" className="w-14 h-14 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="line-clamp-1">{it.name}</div>
                      <div className="text-xs text-gray-500">Qty: {it.qty} • {it.size}</div>
                    </div>
                    <div className="font-medium">{formatINR(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="px-4 py-2 border rounded dark:border-gray-700">
                  Back
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex-1 sm:flex-none px-6 py-2 bg-meesho hover:bg-meesho-dark text-white rounded font-medium disabled:opacity-50"
                >
                  {placing ? 'Placing...' : `Place Order • ${formatINR(total)}`}
                </button>
              </div>
            </section>
          )}
        </motion.div>

        <aside className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4 h-fit">
          <h3 className="font-semibold mb-3">Price</h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span>Items ({items.length})</span><span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2 flex justify-between font-semibold">
              <span>Total</span><span>{formatINR(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
