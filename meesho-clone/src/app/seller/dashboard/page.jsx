'use client';
import { useEffect, useState } from 'react';
import { Package, ShoppingBag, IndianRupee, TrendingUp, Edit, Trash2, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToastStore } from '@/store/uiStore';
import { categories } from '@/lib/mockData';
import { formatINR, cn } from '@/lib/utils';

const sampleOrders = [
  { id: 'ORD982341', customer: 'Asha P.', total: 1299, status: 'Pending', date: '2026-05-29', items: 2 },
  { id: 'ORD982298', customer: 'Vikram S.', total: 549, status: 'Shipped', date: '2026-05-28', items: 1 },
  { id: 'ORD982144', customer: 'Neha G.', total: 2199, status: 'Delivered', date: '2026-05-26', items: 3 },
  { id: 'ORD982081', customer: 'Manoj T.', total: 899, status: 'Pending', date: '2026-05-25', items: 1 },
  { id: 'ORD981990', customer: 'Sara K.', total: 1599, status: 'Delivered', date: '2026-05-23', items: 2 },
];

export default function SellerDashboard() {
  const toast = useToastStore((s) => s.show);
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(sampleOrders);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', category: 'women-ethnic', price: '', mrp: '', stock: '', description: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/seller/products');
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', category: 'women-ethnic', price: '', mrp: '', stock: '', description: '' });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      mrp: p.mrp,
      stock: p.stock,
      description: p.description || '',
    });
    setShowForm(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast('Name and price are required', 'error');
      return;
    }
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    const res = await fetch('/api/seller/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.ok) {
      toast(editing ? 'Product updated' : 'Product added', 'success');
      setShowForm(false);
      fetchProducts();
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/seller/products?id=${id}`, { method: 'DELETE' });
    toast('Product deleted', 'info');
    fetchProducts();
  };

  const updateOrderStatus = (id, status) => {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    toast(`Order ${id} → ${status}`, 'success');
  };

  // Dashboard stats
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === 'Pending').length;
  const totalProducts = products.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your products, orders, and sales</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-4 overflow-x-auto">
        {['overview', 'products', 'orders', 'analytics'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 text-sm capitalize border-b-2 -mb-px whitespace-nowrap',
              tab === t ? 'border-meesho text-meesho font-medium' : 'border-transparent text-gray-500'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Revenue', value: formatINR(totalRevenue), Icon: IndianRupee, color: 'text-green-600' },
            { label: 'Total Orders', value: totalOrders, Icon: ShoppingBag, color: 'text-blue-600' },
            { label: 'Pending Orders', value: pending, Icon: Package, color: 'text-orange-600' },
            { label: 'Products', value: totalProducts, Icon: TrendingUp, color: 'text-purple-600' },
          ].map((s) => {
            const Icon = s.Icon;
            return (
              <motion.div
                key={s.label}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{s.label}</span>
                  <Icon size={18} className={s.color} />
                </div>
                <div className="text-2xl font-bold mt-1">{s.value}</div>
              </motion.div>
            );
          })}

          <div className="sm:col-span-2 lg:col-span-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Recent Orders</h3>
            <div className="space-y-2">
              {orders.slice(0, 5).map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div>
                    <div className="font-medium">{o.id}</div>
                    <div className="text-xs text-gray-500">{o.customer} • {o.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatINR(o.total)}</div>
                    <span className={cn(
                      'text-[10px] px-2 py-0.5 rounded',
                      o.status === 'Delivered' && 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
                      o.status === 'Shipped' && 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
                      o.status === 'Pending' && 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                    )}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Your Products ({products.length})</h3>
            <button
              onClick={openAdd}
              className="px-4 py-2 bg-meesho hover:bg-meesho-dark text-white rounded text-sm flex items-center gap-1"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 text-left">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3 hidden md:table-cell">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3 hidden sm:table-cell">Stock</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img src={p.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                          <span className="line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell capitalize">{p.category.replace('-', ' ')}</td>
                      <td className="p-3 font-medium">{formatINR(p.price)}</td>
                      <td className="p-3 hidden sm:table-cell">
                        <span className={cn(p.stock < 5 && 'text-orange-600')}>{p.stock}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => remove(p.id)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950 rounded text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3 hidden sm:table-cell">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3 hidden md:table-cell">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="p-3 font-mono text-xs">{o.id}</td>
                  <td className="p-3 hidden sm:table-cell">{o.customer}</td>
                  <td className="p-3 font-medium">{formatINR(o.total)}</td>
                  <td className="p-3 hidden md:table-cell text-gray-500">{o.date}</td>
                  <td className="p-3">
                    <span className={cn(
                      'text-[10px] px-2 py-0.5 rounded',
                      o.status === 'Delivered' && 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
                      o.status === 'Shipped' && 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
                      o.status === 'Pending' && 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                    )}>{o.status}</span>
                  </td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="text-xs border rounded px-1 py-0.5 bg-transparent dark:border-gray-700"
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Sales by Status</h3>
            {['Pending', 'Shipped', 'Delivered'].map((s) => {
              const count = orders.filter((o) => o.status === s).length;
              const pct = totalOrders ? (count / totalOrders) * 100 : 0;
              return (
                <div key={s} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{s}</span>
                    <span>{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className="h-full bg-meesho"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Top Categories</h3>
            {categories.slice(0, 5).map((c, i) => {
              const cnt = products.filter((p) => p.category === c.id).length;
              const pct = products.length ? (cnt / products.length) * 100 : 0;
              return (
                <div key={c.id} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{c.icon} {c.name}</span>
                    <span>{cnt}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div onClick={() => setShowForm(false)} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl max-w-lg w-full p-5 max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{editing ? 'Edit Product' : 'Add New Product'}</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <div className="space-y-2 text-sm">
              <input
                placeholder="Product Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded bg-transparent dark:border-gray-700"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-900 dark:border-gray-700"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Price *"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                />
                <input
                  type="number"
                  placeholder="MRP"
                  value={form.mrp}
                  onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                  className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="px-3 py-2 border rounded bg-transparent dark:border-gray-700"
                />
              </div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded bg-transparent dark:border-gray-700"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-meesho hover:bg-meesho-dark text-white py-2.5 rounded font-medium"
            >
              {editing ? 'Save Changes' : 'Add Product'}
            </button>
          </motion.form>
        </div>
      )}
    </div>
  );
}
