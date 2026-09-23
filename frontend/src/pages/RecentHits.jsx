import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="bg-gray-200" style={{ aspectRatio: '3/4' }} />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function RecentHits() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = 'Recent Hits 🔥 — Like N Like';
    API.get('/products?featured=true&limit=50')
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
          setFiltered(res.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setFiltered(cat === 'all' ? products : products.filter((p) => p.category === cat));
  };

  return (
    <main>
      <div className="bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-orange-200 text-sm mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white">Recent Hits</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl animate-pulse">🔥</div>
            <div>
              <h1 className="text-3xl font-black">Recent Hits</h1>
              <p className="text-orange-100 text-sm mt-1">Our most trending picks — everyone's talking about these!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-semibold text-gray-600">Category:</span>
          {[
            { val: 'all', label: 'All 🔥' },
            { val: 'men', label: '👔 Men' },
            { val: 'women', label: '👗 Women' },
            { val: 'kids', label: '🧒 Kids' },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => handleFilter(val)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeFilter === val ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
              ? filtered.map((p) => <ProductCard key={p._id} product={p} />)
              : (
                <div className="col-span-full text-center py-20">
                  <div className="text-6xl mb-4">🔥</div>
                  <p className="text-gray-500">No featured products yet.</p>
                </div>
              )
          }
        </div>
      </div>
    </main>
  );
}
