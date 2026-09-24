import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-luxe border border-gray-100/80 p-3">
      <div className="skeleton-shimmer rounded-2xl w-full" style={{ aspectRatio: '3/4' }} />
      <div className="p-3 space-y-2.5">
        <div className="h-3 skeleton-shimmer rounded-full w-1/3" />
        <div className="h-4 skeleton-shimmer rounded-full w-3/4" />
        <div className="h-4 skeleton-shimmer rounded-full w-1/2" />
        <div className="h-9 skeleton-shimmer rounded-xl mt-3" />
      </div>
    </div>
  );
}

export default function CategoryPage({ category, title, emoji, subtitle, gradient, accentColor, filterOptions = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = `${title}'s Collection — Like N Like Luxury`;
    window.scrollTo(0, 0);
    setLoading(true);
    API.get(`/products?category=${category}&limit=100`)
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, title]);

  // Compute filtered & sorted products
  const displayProducts = useMemo(() => {
    let result = [...products];

    // Subcategory Filter
    if (activeSubcategory !== 'all') {
      result = result.filter(
        (p) => p.subcategory?.toLowerCase() === activeSubcategory.toLowerCase()
      );
    }

    // In Stock Only
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Price Filter
    if (priceRange === 'under-500') {
      result = result.filter((p) => p.price < 500);
    } else if (priceRange === '500-1000') {
      result = result.filter((p) => p.price >= 500 && p.price <= 1000);
    } else if (priceRange === '1000-2000') {
      result = result.filter((p) => p.price > 1000 && p.price <= 2000);
    } else if (priceRange === 'above-2000') {
      result = result.filter((p) => p.price > 2000);
    }

    // Keyword Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => {
        const discA = a.mrp > a.price ? (a.mrp - a.price) / a.mrp : 0;
        const discB = b.mrp > b.price ? (b.mrp - b.price) / b.mrp : 0;
        return discB - discA;
      });
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, activeSubcategory, priceRange, sortBy, inStockOnly, searchTerm]);

  const resetFilters = () => {
    setActiveSubcategory('all');
    setPriceRange('all');
    setSortBy('featured');
    setInStockOnly(false);
    setSearchTerm('');
  };

  const hasActiveFilters =
    activeSubcategory !== 'all' ||
    priceRange !== 'all' ||
    sortBy !== 'featured' ||
    inStockOnly ||
    searchTerm !== '';

  return (
    <main className="min-h-screen bg-[#fafafc]">
      {/* Category Hero Banner */}
      <div className={`relative bg-gradient-to-r ${gradient} text-white py-12 sm:py-16 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">{title}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/20">
              {emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
                {title}'s Collection
              </h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-lg font-medium">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Search Control Bar */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-8 space-y-4">
          {/* Row 1: Subcategories & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-100">
            {/* Subcategory Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">Category:</span>
              {['all', ...filterOptions].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveSubcategory(opt)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all capitalize ${
                    activeSubcategory === opt
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {opt === 'all' ? 'All Styles' : opt}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Row 2: Price Filters, Sort, and In-Stock Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
            {/* Price Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400 uppercase tracking-wider font-bold">Price:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'under-500', label: '< ₹500' },
                { id: '500-1000', label: '₹500 - ₹999' },
                { id: '1000-2000', label: '₹1,000 - ₹1,999' },
                { id: 'above-2000', label: '₹2,000+' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setPriceRange(id)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    priceRange === id
                      ? 'bg-brand-500 text-white font-bold'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span>In Stock Only</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-gray-400 uppercase tracking-wider font-bold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-rose-600 hover:text-rose-700 underline text-xs font-bold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Count Strip */}
        {!loading && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Showing <span className="text-gray-900 font-black">{displayProducts.length}</span> luxury styles
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : displayProducts.length > 0
              ? displayProducts.map((p) => <ProductCard key={p._id} product={p} />)
              : (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
                  <div className="text-5xl mb-4">{emoji}</div>
                  <h3 className="text-lg font-black text-gray-900 mb-1">No matching products found</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                    Try adjusting your filters or price range to find what you're looking for.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-500 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )
          }
        </div>
      </div>
    </main>
  );
}
