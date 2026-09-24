import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

/* ── Skeleton Card ─────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="skeleton-shimmer w-full" style={{ aspectRatio: '3/4' }} />
      <div className="p-4 space-y-2">
        <div className="h-3 skeleton-shimmer rounded w-1/3" />
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-4 skeleton-shimmer rounded w-1/2" />
      </div>
    </div>
  );
}

/* ── Category Config ───────────────────────────────────── */
const CATEGORY_CONFIG = {
  men: {
    title: 'MEN',
    tagline: 'EVERYDAY STYLE, REDEFINED.',
    desc: 'Shop the latest in menswear — shirts, hoodies, denim and more. Updated every season.',
    heroImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&q=85',
    accentColor: '#D91E2B',
    subcategories: ['T-Shirts', 'Shirts', 'Hoodies', 'Jeans', 'Jackets', 'Trousers'],
  },
  women: {
    title: 'WOMEN',
    tagline: 'STYLE THAT FEELS LIKE YOU.',
    desc: 'Explore women\'s fashion from everyday basics to statement pieces. Fresh drops weekly.',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85',
    accentColor: '#D91E2B',
    subcategories: ['Tops', 'Dresses', 'Jeans', 'Hoodies', 'Jackets', 'Bottoms'],
  },
  kids: {
    title: 'KIDS',
    tagline: 'BIG STYLE. LITTLE ATTITUDE.',
    desc: 'Fun, comfortable and stylish clothes for your little ones. Quality they\'ll love, prices you\'ll love.',
    heroImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&q=85',
    accentColor: '#D91E2B',
    subcategories: ['Boys', 'Girls', 'T-Shirts', 'Hoodies', 'Jeans', 'Sets'],
  },
};

/* ── Main Component ────────────────────────────────────── */
export default function CategoryPage({ category, filterOptions = [] }) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.men;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const subcats = filterOptions.length > 0 ? filterOptions : config.subcategories;

  useEffect(() => {
    document.title = `${config.title} — Like N Like`;
    window.scrollTo(0, 0);
    setLoading(true);
    API.get(`/products?category=${category}&limit=100`)
      .then((res) => { if (res.data.success) setProducts(res.data.data || []); })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, config.title]);

  const displayProducts = useMemo(() => {
    let result = [...products];
    if (activeSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory?.toLowerCase() === activeSubcategory.toLowerCase());
    }
    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (priceRange === 'under-500') result = result.filter((p) => p.price < 500);
    else if (priceRange === '500-1000') result = result.filter((p) => p.price >= 500 && p.price <= 1000);
    else if (priceRange === '1000-2000') result = result.filter((p) => p.price > 1000 && p.price <= 2000);
    else if (priceRange === 'above-2000') result = result.filter((p) => p.price > 2000);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.subcategory?.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'discount') {
      result.sort((a, b) => {
        const dA = a.mrp > a.price ? (a.mrp - a.price) / a.mrp : 0;
        const dB = b.mrp > b.price ? (b.mrp - b.price) / b.mrp : 0;
        return dB - dA;
      });
    } else if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return result;
  }, [products, activeSubcategory, priceRange, sortBy, inStockOnly, searchTerm]);

  const resetFilters = () => {
    setActiveSubcategory('all');
    setPriceRange('all');
    setSortBy('featured');
    setInStockOnly(false);
    setSearchTerm('');
  };

  const hasActiveFilters = activeSubcategory !== 'all' || priceRange !== 'all' || sortBy !== 'featured' || inStockOnly || searchTerm !== '';

  return (
    <div className="bg-[#F7F4EF] min-h-screen">

      {/* ── HERO BANNER ─────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: '55vh', minHeight: '380px' }}>
        <img
          src={config.heroImage}
          alt={config.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        {/* Red accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D91E2B]" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-[11px] font-bold uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">{config.title}</span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-display text-white uppercase leading-none tracking-tighter mb-3">
            {config.title}
          </h1>
          <p className="text-base sm:text-lg font-bold text-white/70 uppercase tracking-widest mb-5">
            {config.tagline}
          </p>
          <p className="text-sm text-white/60 max-w-lg mb-6">{config.desc}</p>
          <Link
            to="/recent-hits"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D91E2B] text-white font-extrabold text-xs uppercase tracking-widest self-start hover:bg-[#B81822] transition-colors"
          >
            SHOP NEW ARRIVALS →
          </Link>
        </div>
      </div>

      {/* ── SUBCATEGORY PILLS ───────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSubcategory('all')}
              className={`shrink-0 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                activeSubcategory === 'all'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ALL
            </button>
            {subcats.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`shrink-0 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  activeSubcategory === sub
                    ? 'bg-[#D91E2B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTERS + PRODUCTS ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          {/* Left: Price + InStock */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'under-500', label: '< ₹500' },
              { id: '500-1000', label: '₹500–999' },
              { id: '1000-2000', label: '₹1K–2K' },
              { id: 'above-2000', label: '₹2K+' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setPriceRange(id)}
                className={`px-3 py-1.5 text-xs font-bold transition-all ${
                  priceRange === id
                    ? 'bg-[#D91E2B] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900'
                }`}
              >
                {label}
              </button>
            ))}

            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-700 ml-2">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#D91E2B]"
              />
              In Stock
            </label>
          </div>

          {/* Right: Sort + Clear */}
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {displayProducts.length} styles
              </span>
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#D91E2B]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="discount">Highest Discount</option>
            </select>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 focus:border-[#D91E2B] focus:outline-none w-32 sm:w-44"
              />
              <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-[11px] font-black uppercase tracking-widest text-[#D91E2B] hover:underline">
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : displayProducts.length > 0
              ? displayProducts.map((p) => <ProductCard key={p._id} product={p} />)
              : (
                <div className="col-span-full text-center py-20 bg-white border border-gray-100">
                  <p className="text-5xl mb-4">👕</p>
                  <h3 className="text-lg font-black text-[#1A1A1A] uppercase mb-2">No Products Found</h3>
                  <p className="text-sm text-gray-500 mb-6">Try adjusting your filters.</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-black uppercase tracking-widest hover:bg-[#D91E2B] transition-colors"
                  >
                    RESET FILTERS
                  </button>
                </div>
              )
          }
        </div>
      </div>

      {/* ── BOTTOM CTA ──────────────────────────────── */}
      <div className="bg-[#1A1A1A] py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Like N Like</p>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white uppercase">
              NOT FOUND WHAT YOU WANT?
            </h3>
            <p className="text-gray-500 text-sm mt-1">Explore all our categories.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/men" className="px-5 py-2.5 bg-[#D91E2B] text-white font-black text-xs uppercase tracking-widest hover:bg-[#B81822] transition-colors">MEN →</Link>
            <Link to="/women" className="px-5 py-2.5 bg-white text-[#1A1A1A] font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">WOMEN →</Link>
            <Link to="/kids" className="px-5 py-2.5 bg-[#F5B82E] text-[#1A1A1A] font-black text-xs uppercase tracking-widest hover:brightness-105 transition-all">KIDS →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
