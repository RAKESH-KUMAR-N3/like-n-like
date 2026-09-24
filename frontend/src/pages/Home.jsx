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
      <section className="relative bg-[#FAF7F2] overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-amber-100/60">
        
        {/* Subtle World Map Watermark in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 1000 500" fill="currentColor">
            <path d="M150,120 Q180,90 220,110 T280,160 T250,220 T180,240 T130,190 Z M450,100 Q500,70 560,90 T640,140 T670,220 T610,280 T520,290 T440,240 T420,160 Z M700,150 Q750,130 820,160 T870,230 T800,300 T720,280 T680,220 Z M200,320 Q240,300 270,330 T280,400 T230,460 T170,440 T160,370 Z M750,340 Q800,320 840,350 T860,420 T810,470 T740,450 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

            {/* LEFT COLUMN: BRAND STORY & CTAs */}
            <div className="lg:col-span-6 space-y-6 pt-2 sm:pt-4 text-left">
              
              {/* Tagline */}
              <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                <span className="w-8 h-[2px] bg-gray-400/80"></span>
                <span>FASHION FOR EVERY YOU</span>
                <span className="w-8 h-[2px] bg-gray-400/80"></span>
              </div>

              {/* Main Headline Stack */}
              <div className="space-y-1 sm:space-y-2 select-none">
                
                {/* 1. UNIQUE + Golden Crown */}
                <div className="relative inline-flex items-center">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-gray-950 uppercase leading-none">
                    UNIQUE
                  </h1>
                  {/* Golden Crown Doodle */}
                  <span className="absolute -top-5 -right-8 sm:-top-7 sm:-right-10 transform rotate-12">
                    <svg className="w-9 h-9 sm:w-11 sm:h-11 text-[#F5B82E] drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="#F5B82E" fillOpacity="0.25" />
                      <circle cx="2" cy="4" r="1.5" fill="#F5B82E" />
                      <circle cx="12" cy="3" r="1.5" fill="#F5B82E" />
                      <circle cx="22" cy="4" r="1.5" fill="#F5B82E" />
                    </svg>
                  </span>
                </div>

                {/* 2. COLLECTIONS inside Red Paint-Brush Stroke Banner */}
                <div className="block">
                  <div className="relative inline-block my-1">
                    <svg 
                      className="absolute inset-0 w-[106%] -left-[3%] h-full -z-10" 
                      viewBox="0 0 540 100" 
                      preserveAspectRatio="none"
                    >
                      <path 
                        d="M 15 20 C 45 14, 120 16, 220 13 C 320 11, 440 14, 520 18 C 536 19, 542 26, 538 40 C 543 54, 534 70, 539 82 C 536 90, 515 88, 480 86 C 390 90, 260 86, 140 89 C 70 90, 25 86, 12 83 C 4 80, -3 68, 3 48 C -2 34, 4 24, 15 20 Z" 
                        fill="#D91E2B" 
                      />
                      {/* Painterly brush notches */}
                      <path d="M 525 28 C 538 33, 542 43, 534 50 Z" fill="#D91E2B" opacity="0.9" />
                      <path d="M 8 34 C -2 42, 0 54, 8 62 Z" fill="#D91E2B" opacity="0.85" />
                    </svg>
                    <span className="relative z-10 px-5 sm:px-9 py-1 sm:py-2 block text-white font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider uppercase font-display drop-shadow-md">
                      COLLECTIONS
                    </span>
                  </div>
                </div>

                {/* 3. AFFORDABLE PRICES (with yellow highlighter) */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-gray-950 uppercase leading-tight pt-1">
                  <span>AFFORDABLE</span>
                  <span className="relative inline-block px-2.5 sm:px-3 py-0.5">
                    <span className="absolute inset-0 bg-[#FFD23F] -rotate-1 rounded-md -z-10 shadow-sm" />
                    <span className="text-gray-950">PRICES</span>
                  </span>
                  {/* Subtle flight path icon */}
                  <span className="hidden sm:inline-block relative">
                    <svg className="w-14 h-7 -rotate-6 text-gray-500" viewBox="0 0 100 40" fill="none">
                      <path d="M 5 35 Q 50 -10 95 20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" />
                    </svg>
                  </span>
                </div>

                {/* 4. WORLDWIDE SHIPPING + Green Globe */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
                  <span className="text-[#137547]">WORLDWIDE</span>
                  <span className="text-gray-950">SHIPPING</span>
                  {/* Green Globe Doodle Icon */}
                  <div className="relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#137547] text-[#137547] p-1">
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Explanatory Paragraph */}
              <p className="text-sm sm:text-base text-gray-600 max-w-lg font-medium leading-relaxed">
                Explore trendy and unique fashion for Men, Women and Kids at affordable prices. Your favourite styles, delivered anywhere in the world.
              </p>

              {/* 3 Call to Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/men"
                  className="px-6 py-3.5 bg-[#D91E2B] hover:bg-[#B81822] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <span>Shop Men</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/women"
                  className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <span>Shop Women</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/kids"
                  className="px-6 py-3.5 bg-[#18191F] hover:bg-black text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <span>Shop Kids</span>
                  <span>→</span>
                </Link>
              </div>

              {/* BOTTOM-LEFT CURVED QUICK CATEGORY DOCK */}
              <div className="pt-4 lg:pt-6">
                <div className="inline-flex items-center gap-5 sm:gap-8 bg-white/95 backdrop-blur-md px-5 sm:px-6 py-3 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-md hover:shadow-lg transition-shadow">
                  
                  {/* Men Avatar Item */}
                  <Link to="/men" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#D91E2B] transition-colors shrink-0 bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80"
                        alt="Men Fashion"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#D91E2B] transition-colors leading-tight">Men</p>
                      <span className="text-[11px] text-gray-400 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </Link>

                  <div className="w-[1px] h-9 bg-gray-200" />

                  {/* Women Avatar Item */}
                  <Link to="/women" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-pink-500 transition-colors shrink-0 bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80"
                        alt="Women Fashion"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-pink-600 transition-colors leading-tight">Women</p>
                      <span className="text-[11px] text-gray-400 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </Link>

                  <div className="w-[1px] h-9 bg-gray-200" />

                  {/* Kids Avatar Item */}
                  <Link to="/kids" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-500 transition-colors shrink-0 bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1543332164-6e82f355badc?w=160&q=80"
                        alt="Kids Fashion"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">Kids</p>
                      <span className="text-[11px] text-gray-400 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </Link>

                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: MAIN MODELS & GRAPHIC BACKDROPS */}
            <div className="lg:col-span-6 relative flex items-end justify-center pt-6 lg:pt-0 min-h-[460px] sm:min-h-[540px] lg:min-h-[620px]">
              
              {/* Yellow Sun Circle Backdrop behind man */}
              <div 
                className="absolute left-[2%] sm:left-[6%] top-[12%] sm:top-[8%] w-[260px] sm:w-[360px] lg:w-[410px] h-[260px] sm:h-[360px] lg:h-[410px] rounded-full bg-[#F5B82E] -z-0 pointer-events-none shadow-sm"
              />

              {/* Dark Forest Green Arch behind woman */}
              <div 
                className="absolute right-[8%] sm:right-[14%] top-[24%] sm:top-[18%] w-[200px] sm:w-[260px] lg:w-[300px] h-[300px] sm:h-[380px] lg:h-[430px] rounded-t-full bg-[#1C744C] -z-0 pointer-events-none shadow-sm"
              />

              {/* Worldwide Shipping Script & Airplane Dotted Flight Loop */}
              <div className="absolute top-2 right-4 sm:top-4 sm:right-16 z-20 select-none pointer-events-none text-right">
                <div className="inline-flex items-center gap-1.5 font-bold text-gray-800 text-sm sm:text-base italic">
                  <span style={{ fontFamily: 'Georgia, serif' }}>Worldwide Shipping</span>
                  <span className="text-base sm:text-lg">✈️</span>
                </div>
                {/* Dotted arc flight line */}
                <svg className="w-36 sm:w-48 h-10 ml-auto text-gray-600" viewBox="0 0 160 40" fill="none">
                  <path d="M 10 35 Q 70 -5 150 20" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Main Model Cutout Image */}
              <div className="relative z-10 w-full max-w-[540px] lg:max-w-[620px]">
                <img
                  src={heroImage}
                  alt="Like N Like - Men, Women and Kids Fashion"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Floating Badge 1: Unique Collections */}
              <div className="absolute right-0 sm:-right-4 top-24 sm:top-36 z-20 bg-[#FFF5EE]/95 backdrop-blur-md border border-[#FED7C3] rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-3 animate-float max-w-[190px] sm:max-w-[220px]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E62935] text-white flex items-center justify-center shrink-0 shadow-md">
                  {/* T-Shirt SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 2l4 4-2 3-2-1v14H8V8L6 9 4 6l4-4h2a2 2 0 004 0h2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight">Unique Collections</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight mt-0.5">Styles You Won't Find Everywhere</p>
                </div>
              </div>

              {/* Floating Badge 2: Affordable Prices */}
              <div className="absolute right-1 sm:-right-2 top-52 sm:top-68 z-20 bg-[#EEFAF2]/95 backdrop-blur-md border border-[#C8EED5] rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-3 max-w-[190px] sm:max-w-[220px]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#188046] text-white flex items-center justify-center shrink-0 shadow-md">
                  {/* Price Tag SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.586 2.586A2 2 0 0011.172 2H4a2 2 0 00-2 2v7.172a2 2 0 00.586 1.414l8 8a2 2 0 002.828 0l7.172-7.172a2 2 0 000-2.828l-8-8zM7 9a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight">Affordable Prices</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight mt-0.5">Trendy Fashion For Everyone</p>
                </div>
              </div>

              {/* Vintage Postal Rubber Stamp Badge (Bottom Right) */}
              <div className="absolute right-4 sm:right-6 bottom-8 sm:bottom-10 z-20 select-none pointer-events-none opacity-80">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-dashed border-gray-400 p-1 flex items-center justify-center -rotate-12">
                  <div className="w-full h-full rounded-full border border-gray-400 flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-gray-500">FASHION AROUND</span>
                    <span className="text-xs my-0.5">🌐</span>
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-gray-500">THE WORLD</span>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators < 01/03 > (Bottom Right) */}
              <div className="absolute right-4 sm:right-6 bottom-1 sm:bottom-2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-700 shadow-sm">
                <button className="hover:text-[#D91E2B] transition-colors">‹</button>
                <span className="text-[11px] font-extrabold tracking-widest text-gray-500">01 / 03</span>
                <button className="hover:text-[#D91E2B] transition-colors">›</button>
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
