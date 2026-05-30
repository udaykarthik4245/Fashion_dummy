'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, MapPin, Package, Settings, User as UserIcon, Trash2, Plus } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/uiStore';
import { formatINR, cn } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const orders = useAuthStore((s) => s.orders);
  const addresses = useAuthStore((s) => s.addresses);
  const logout = useAuthStore((s) => s.logout);
  const addAddress = useAuthStore((s) => s.addAddress);
  const removeAddress = useAuthStore((s) => s.removeAddress);
  const toast = useToastStore((s) => s.show);

  const [tab, setTab] = useState('orders');
  const [showForm, setShowForm] = useState(false);
  const [addr, setAddr] = useState({
    name: '', phone: '', line1: '', city: '', state: '', pincode: '',
  });

  if (!user) {
    if (typeof window !== 'undefined') router.replace('/auth/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast('Logged out', 'info');
    router.push('/');
  };

  const saveAddress = (e) => {
    e.preventDefault();
    if (!addr.name || !addr.phone || !addr.line1) {
      toast('Please fill required fields', 'error');
      return;
    }
    addAddress(addr);
    setAddr({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
    setShowForm(false);
    toast('Address added', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-[220px_1fr] gap-5">
        <aside className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4 h-fit">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-full bg-meesho/20 text-meesho flex items-center justify-center font-bold">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
          <nav className="mt-3 space-y-1">
            {[
              { id: 'orders', label: 'My Orders', icon: Package },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
              { id: 'settings', label: 'Account Settings', icon: Settings },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'w-full text-left flex items-center gap-2 px-3 py-2 rounded text-sm',
                    tab === t.id
                      ? 'bg-meesho/10 text-meesho font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
            {user.isSeller && (
              <Link
                href="/seller/dashboard"
                className="block px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Seller Dashboard →
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </aside>

        <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
          {tab === 'orders' && (
            <>
              <h2 className="text-lg font-semibold mb-3">My Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package size={48} className="mx-auto opacity-30" />
                  <p className="mt-2">No orders yet</p>
                  <Link href="/products" className="text-meesho text-sm hover:underline">
                    Start shopping →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="border border-gray-100 dark:border-gray-800 rounded p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">Order {o.id}</div>
                          <div className="text-xs text-gray-500">
                            Placed {o.placedAt} • Expected {o.expectedDelivery}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                          {o.status}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-2 overflow-x-auto">
                        {o.items.slice(0, 4).map((it, i) => (
                          <img
                            key={i}
                            src={it.image}
                            alt=""
                            className="w-12 h-12 rounded object-cover shrink-0"
                          />
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-gray-500">{o.items.length} items</span>
                        <span className="font-semibold">{formatINR(o.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'addresses' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Saved Addresses</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="text-sm text-meesho flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {showForm && (
                <form onSubmit={saveAddress} className="grid sm:grid-cols-2 gap-2 mb-4 p-3 border border-gray-100 dark:border-gray-800 rounded">
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
                    placeholder="Address"
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
                  <button
                    type="submit"
                    className="sm:col-span-2 bg-meesho text-white py-2 rounded text-sm"
                  >
                    Save
                  </button>
                </form>
              )}

              {addresses.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">No saved addresses.</div>
              ) : (
                <div className="space-y-2">
                  {addresses.map((a) => (
                    <div key={a.id} className="flex justify-between gap-2 p-3 border border-gray-100 dark:border-gray-800 rounded">
                      <div className="text-sm">
                        <div className="font-medium">{a.name} • {a.phone}</div>
                        <div className="text-gray-500">
                          {a.line1}, {a.city}, {a.state} - {a.pincode}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removeAddress(a.id);
                          toast('Address removed', 'info');
                        }}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'settings' && (
            <>
              <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-xs text-gray-500">Name</label>
                  <div className="px-3 py-2 border border-gray-100 dark:border-gray-800 rounded">{user.name}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Email</label>
                  <div className="px-3 py-2 border border-gray-100 dark:border-gray-800 rounded">{user.email}</div>
                </div>
                <div className="text-xs text-gray-500">
                  In a production build, edit forms and password change would live here.
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
