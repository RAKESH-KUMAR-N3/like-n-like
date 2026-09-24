import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/hero-image.png';

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

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Like N Like — Haute Couture & Premium Streetwear';
    API.get('/products?featured=true&limit=8')
      .then((res) => { if (res.data.success) setFeatured(res.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    {
      to: '/men',
      label: 'Men',
      tagline: 'Refined Tailoring & Urban Edge',
      count: 'Premium Shirts, Denim & Outerwear',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
      badge: 'NEW SEASON'
    },
    {
      to: '/women',
      label: 'Women',
      tagline: 'Modern Elegance & Chic Silhouettes',
      count: 'Designer Kurtis, Dresses & Tops',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      badge: 'TRENDING'
    },
    {
      to: '/kids',
      label: 'Kids',
      tagline: 'Playful Comfort & Festive Vibrance',
      count: 'Everyday Sets, Tees & Ethnic',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
      badge: 'POPULAR'
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-gray-950 via-[#10121a] to-[#0a0a0f] text-white pt-16 pb-24 lg:py-28 overflow-hidden">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-widest shadow-inner">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                <span>The Autumn / Winter Edition 2024</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight leading-[1.08] text-white">
                Defy Ordinary.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
                  Wear Extraordinary.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Step into a curated realm of handcrafted fits, signature silhouettes, and everyday luxury designed to turn heads wherever you walk.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/men"
                  className="px-8 py-4 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                >
                  <span>Explore Men</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/women"
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white border border-white/15 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                >
                  <span>Explore Women</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/recent-hits"
                  className="px-5 py-4 text-amber-300 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <span>🔥 Recent Hits</span>
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-display text-white">100%</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Original Fabrics</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-display text-white">50K+</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Happy Wardrobes</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-display text-white">4.9★</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Customer Trust</p>
                </div>
              </div>
            </div>

            {/* Right Visual Floating Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/5] bg-gray-900 group">
                  <img
                    src={heroImage}
                    alt="Haute Couture Collection"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-1">
                      Featured Drop
                    </span>
                    <h3 className="text-xl font-black text-white font-display">
                      Monochrome Luxe Silk Edition
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">Starting from ₹1,499</p>
                  </div>
                </div>

                {/* Floating Micro Card Left */}
                <div className="absolute -left-6 bottom-16 z-20 bg-white/95 backdrop-blur-xl text-gray-900 p-3.5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-600 flex items-center justify-center text-xl font-black shadow-inner">
                    ⚡
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider">Fast Dispatch</p>
                    <p className="text-[11px] text-gray-500 font-medium">Within 24 Hours</p>
                  </div>
                </div>

                {/* Floating Micro Card Right */}
                <div className="absolute -right-4 top-10 z-20 bg-gray-900/90 backdrop-blur-xl text-white p-3.5 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-black">Top Rated</p>
                    <p className="text-[10px] text-gray-400">4.9 / 5.0 (2.4k reviews)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* USP STRIP */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🚚', title: 'Free Express Shipping', sub: 'On orders over ₹999' },
              { icon: '🔄', title: '7 Days Easy Returns', sub: 'Hassle-free doorstep pickup' },
              { icon: '💵', title: 'Cash on Delivery', sub: 'Pay easily upon arrival' },
              { icon: '🛡️', title: '100% Certified Quality', sub: 'Direct from brand artisans' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-1 block">{icon}</span>
                <p className="text-xs sm:text-sm font-black text-gray-900">{title}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                Curated Collections
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-gray-900 mt-2">
                Shop By Category
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
              Hand-picked designs tailored for comfort, style and everyday sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className="group relative rounded-3xl overflow-hidden shadow-luxe hover:shadow-2xl transition-all duration-500 aspect-[4/5] bg-gray-900 flex flex-col justify-end p-8"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent transition-opacity group-hover:opacity-90" />

                <div className="relative z-10 text-white space-y-2">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-brand-500 text-white px-2.5 py-1 rounded-full shadow-md">
                    {cat.badge}
                  </span>
                  <h3 className="text-3xl font-black font-display group-hover:text-amber-300 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium">
                    {cat.tagline}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {cat.count}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>Shop Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                Trending Right Now
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-gray-900 mt-2">
                Featured Highlights
              </h2>
            </div>
            <Link to="/recent-hits" className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
              <span>View All</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-3xl">
              <span className="text-4xl block mb-2">👕</span>
              <p className="text-gray-500 font-medium">No featured products found yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BRAND PROMISE BANNER */}
      <section className="py-16 bg-gradient-to-r from-gray-950 via-zinc-900 to-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-white/10 px-4 py-1.5 rounded-full inline-block">
            The Like N Like Guarantee
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display">
            Fashion That Elevates Your Confidence.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Every garment is tailored with perfectionist stitching, premium breathable cotton blends, and durable dyes engineered to sustain wash after wash.
          </p>
          <div className="pt-2">
            <Link
              to="/recent-hits"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-500 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Discover New Arrivals →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
