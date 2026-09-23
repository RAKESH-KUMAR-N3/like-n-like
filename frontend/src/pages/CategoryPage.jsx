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

export default function CategoryPage({ category, title, emoji, subtitle, gradient, accentColor, filterOptions }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = `${title} — Like N Like`;
    setLoading(true);
    API.get(`/products?category=${category}&limit=50`)
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
          setFiltered(res.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  const handleFilter = (sub) => {
    setActiveFilter(sub);
    if (sub === 'all') {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.subcategory?.toLowerCase() === sub.toLowerCase()));
    }
  };

  return (
    <main>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${gradient} text-white py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-white">{title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{emoji}</div>
            <div>
              <h1 className="text-3xl font-black">{title}'s Collection</h1>
              <p className="text-white/70 text-sm mt-0.5">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-semibold text-gray-600">Filter:</span>
          {['all', ...filterOptions].map((opt) => (
            <button
              key={opt}
              onClick={() => handleFilter(opt)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all capitalize ${
                activeFilter === opt
                  ? `${accentColor} text-white`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {opt === 'all' ? 'All' : opt}
            </button>
          ))}
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-5">{filtered.length} products found</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
              ? filtered.map((p) => <ProductCard key={p._id} product={p} />)
              : (
                <div className="col-span-full text-center py-20">
                  <div className="text-6xl mb-4">{emoji}</div>
                  <p className="text-gray-500 text-lg font-medium">No products found</p>
                  <p className="text-gray-400 text-sm mt-1">Check back soon for new arrivals!</p>
                </div>
              )
          }
        </div>
      </div>
    </main>
  );
}
