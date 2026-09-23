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
        <div className="h-3 bg-gray-200 rounded-full w-1/2" />
        <div className="h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Like N Like — Premium Clothing for Men, Women & Kids';
    API.get('/products?featured=true&limit=8')
      .then((res) => { if (res.data.success) setFeatured(res.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { to: '/men', emoji: '👔', label: 'Men', sub: 'Shirts, Pants, Jackets & more', gradient: 'from-blue-900 to-blue-700', hover: 'group-hover:text-blue-700', bg: 'group-hover:bg-white' },
    { to: '/women', emoji: '👗', label: 'Women', sub: 'Dresses, Kurtis, Tops & more', gradient: 'from-pink-700 to-rose-500', hover: 'group-hover:text-pink-600', bg: 'group-hover:bg-white' },
    { to: '/kids', emoji: '🧒', label: 'Kids', sub: 'T-Shirts, Dresses, Sets & more', gradient: 'from-yellow-500 to-orange-400', hover: 'group-hover:text-orange-500', bg: 'group-hover:bg-white' },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-br from-gray-950 via-[#1e1b4b] to-[#1a1a2e] text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-full text-orange-300 text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                New Collection 2024 🔥
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                Wear Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">Story</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-md">
                Premium fashion for every mood, season & style. Discover exclusive collections for Men, Women & Kids.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/men" className="px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl transition-all hover:shadow-2xl hover:shadow-brand-500/30 hover:-translate-y-0.5 text-sm">
                  Shop Men →
                </Link>
                <Link to="/women" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 transition-all text-sm hover:-translate-y-0.5">
                  Shop Women →
                </Link>
              </div>
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
                {[['500+', 'Products'], ['10K+', 'Customers'], ['4.9★', 'Rating']].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-black text-white">{val}</p>
                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative animate-float">
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-brand-400/20 to-pink-400/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👗</div>
                    <p className="text-white font-bold text-lg">Style Awaits</p>
                    <p className="text-gray-400 text-sm">Men • Women • Kids</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-brand-500 text-white px-3 py-2 rounded-2xl text-xs font-bold shadow-lg shadow-brand-500/40 animate-bounce">
                  🔥 New Arrivals
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-3 py-2 rounded-2xl text-xs font-bold shadow-xl">
                  ₹299 onwards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP STRIP */}
      <div className="bg-brand-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-semibold">
            {['🚚 Free Delivery above ₹599', '↩️ Easy 7-Day Returns', '💳 COD Available', '✅ 100% Authentic'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-500">Explore our curated collections</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map(({ to, emoji, label, sub, gradient }) => (
            <Link key={to} to={to} className="group relative rounded-3xl overflow-hidden h-64 block">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
                <h3 className="text-2xl font-black">{label}</h3>
                <p className="text-sm text-white/70 mt-1">{sub}</p>
                <span className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-semibold group-hover:bg-white group-hover:text-gray-900 transition-all">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT HITS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Recent Hits 🔥</h2>
              <p className="text-gray-500 mt-1">Trending picks our customers love</p>
            </div>
            <Link to="/recent-hits" className="text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : featured.length > 0
                ? featured.map((p) => <ProductCard key={p._id} product={p} />)
                : <div className="col-span-full text-center py-20"><div className="text-6xl mb-4">👗</div><p className="text-gray-500">Featured products coming soon!</p></div>
            }
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Why Like N Like?</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: '🏆', title: 'Premium Quality', sub: 'Handpicked fabrics, superior stitching', color: 'bg-blue-50 hover:bg-blue-100' },
            { emoji: '💰', title: 'Best Prices', sub: 'Factory-direct pricing, no middlemen', color: 'bg-orange-50 hover:bg-orange-100' },
            { emoji: '🚀', title: 'Fast Delivery', sub: '2-5 day delivery pan India', color: 'bg-green-50 hover:bg-green-100' },
            { emoji: '🔄', title: 'Easy Returns', sub: 'No-hassle 7-day return policy', color: 'bg-purple-50 hover:bg-purple-100' },
          ].map(({ emoji, title, sub, color }) => (
            <div key={title} className={`text-center p-6 rounded-2xl ${color} transition-colors`}>
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
