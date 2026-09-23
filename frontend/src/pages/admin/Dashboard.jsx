import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Admin Dashboard — Like N Like';
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products?limit=100');
      if (res.data.success) setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Delete failed. Please try again.');
    }
  };

  const stats = {
    total: products.length,
    men: products.filter((p) => p.category === 'men').length,
    women: products.filter((p) => p.category === 'women').length,
    kids: products.filter((p) => p.category === 'kids').length,
  };

  const statCards = [
    { label: 'All Products', value: stats.total, emoji: '📦', color: 'text-gray-900' },
    { label: "Men's", value: stats.men, emoji: '👔', color: 'text-blue-600' },
    { label: "Women's", value: stats.women, emoji: '👗', color: 'text-pink-600' },
    { label: "Kids'", value: stats.kids, emoji: '🧒', color: 'text-brand-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Admin Panel
          </div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {user?.name}!</p>
        </div>
        <Link to="/admin/add-product" className="flex items-center gap-2 btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, emoji, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl">{emoji}</div>
            </div>
            <p className={`text-3xl font-black ${color}`}>{loading ? '—' : value}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { to: '/men', label: "👔 View Men's", hover: 'hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700' },
          { to: '/women', label: "👗 View Women's", hover: 'hover:border-pink-200 hover:bg-pink-50 hover:text-pink-700' },
          { to: '/kids', label: "🧒 View Kids'", hover: 'hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700' },
          { to: '/recent-hits', label: '🔥 Recent Hits', hover: 'hover:border-red-200 hover:bg-red-50 hover:text-red-700' },
        ].map(({ to, label, hover }) => (
          <Link key={to} to={to} target="_blank" className={`flex items-center gap-2 p-3 card border border-gray-100 ${hover} transition-all text-sm font-medium text-gray-700`}>
            {label}
          </Link>
        ))}
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">All Products</h2>
          <button onClick={fetchProducts} className="text-xs text-brand-500 hover:text-brand-600 font-semibold flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['#', 'Product', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    No products yet.{' '}
                    <Link to="/admin/add-product" className="text-brand-500 hover:underline font-medium">Add your first product →</Link>
                  </td>
                </tr>
              ) : (
                products.map((p, i) => (
                  <tr key={p._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images?.[0]} onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} className="w-10 h-10 rounded-lg object-cover bg-gray-100" alt={p.name} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.sku || 'No SKU'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${p.category === 'men' ? 'bg-blue-100 text-blue-700' : p.category === 'women' ? 'bg-pink-100 text-pink-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{p.price?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
