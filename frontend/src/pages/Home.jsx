import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/hero-image.png';

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

/* ── Main Component ────────────────────────────────────── */
export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Like N Like — Fashion For Every You';
    API.get('/products?featured=true&limit=8')
      .then((res) => { if (res.data.success) setFeatured(res.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Category data */
  const categories = [
    {
      to: '/men',
      label: 'MEN',
      cta: 'SHOP MEN',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&q=85',
    },
    {
      to: '/women',
      label: 'WOMEN',
      cta: 'SHOP WOMEN',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
    },
    {
      to: '/kids',
      label: 'KIDS',
      cta: 'SHOP KIDS',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=900&q=85',
    },
  ];

  /* Collections */
  const collections = [
    {
      name: "SUMMER '26",
      desc: 'Light fabrics, bold colours.',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=85',
      to: '/recent-hits',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      name: 'STREET EDIT',
      desc: 'Urban streets, standout style.',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85',
      to: '/men',
      span: 'lg:col-span-1',
    },
    {
      name: 'EVERYDAY',
      desc: 'Comfortable for any day.',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=85',
      to: '/women',
      span: 'lg:col-span-1',
    },
  ];

  return (
    <div className="overflow-hidden bg-[#F7F4EF]">

      {/* ════════════════════════════════════════════════════
          HERO SECTION — Zero Gap, Direct Match to Reference
      ════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FBF9F5] overflow-hidden pt-6 pb-4 lg:pt-10 lg:pb-0">

        {/* Faint world-map watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          <svg className="w-full h-full object-cover" viewBox="0 0 1000 500" fill="currentColor">
            <path d="M150,120 Q180,90 220,110 T280,160 T250,220 T180,240 T130,190 Z M450,100 Q500,70 560,90 T640,140 T670,220 T610,280 T520,290 T440,240 T420,160 Z M700,150 Q750,130 820,160 T870,230 T800,300 T720,280 T680,220 Z M200,320 Q240,300 270,330 T280,400 T230,460 T170,440 T160,370 Z M750,340 Q800,320 840,350 T860,420 T810,470 T740,450 Z" />
          </svg>
        </div>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between min-h-[580px] lg:min-h-[620px] xl:min-h-[660px]">

            {/* ── LEFT: Text & CTAs (Tight layout, no empty gap) ── */}
            <div className="w-full lg:w-[48%] xl:w-[45%] flex-shrink-0 space-y-5 animate-fade-up py-6 lg:py-10 z-20">

              {/* Tagline label */}
              <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                <span className="w-8 h-[1.5px] bg-gray-400" />
                <span>FASHION FOR EVERY YOU</span>
                <span className="w-8 h-[1.5px] bg-gray-400" />
              </div>

              {/* Main headline stack */}
              <div className="space-y-1.5 select-none">

                {/* UNIQUE + Crown Doodle */}
                <div className="relative inline-flex items-start">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-display tracking-tight text-[#1A1A1A] uppercase leading-none">
                    UNIQUE
                  </h1>
                  <span className="absolute -top-5 -right-8 sm:-top-7 sm:-right-10 rotate-12">
                    <svg className="w-9 h-9 sm:w-11 sm:h-11 text-[#F5B82E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="#F5B82E" fillOpacity="0.25" />
                      <circle cx="2" cy="4" r="1.5" fill="#F5B82E" />
                      <circle cx="12" cy="3" r="1.5" fill="#F5B82E" />
                      <circle cx="22" cy="4" r="1.5" fill="#F5B82E" />
                    </svg>
                  </span>
                </div>

                {/* COLLECTIONS — Red brush stroke banner */}
                <div className="block">
                  <div className="relative inline-block my-1">
                    <svg className="absolute inset-0 w-[108%] -left-[4%] h-full -z-10" viewBox="0 0 540 100" preserveAspectRatio="none">
                      <path d="M 15 20 C 45 14, 120 16, 220 13 C 320 11, 440 14, 520 18 C 536 19, 542 26, 538 40 C 543 54, 534 70, 539 82 C 536 90, 515 88, 480 86 C 390 90, 260 86, 140 89 C 70 90, 25 86, 12 83 C 4 80, -3 68, 3 48 C -2 34, 4 24, 15 20 Z" fill="#D91E2B" />
                      <path d="M 525 28 C 538 33, 542 43, 534 50 Z" fill="#D91E2B" opacity="0.85" />
                    </svg>
                    <span className="relative z-10 px-5 sm:px-9 py-1 sm:py-2 block text-white font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider uppercase font-display drop-shadow-md">
                      COLLECTIONS
                    </span>
                  </div>
                </div>

                {/* AFFORDABLE PRICES */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#1A1A1A] uppercase leading-tight pt-1">
                  <span>AFFORDABLE</span>
                  <span className="relative inline-block px-3 py-0.5">
                    <span className="absolute inset-0 bg-[#FFD23F] -rotate-1 rounded-sm -z-10 shadow-sm" />
                    <span>PRICES</span>
                  </span>
                  {/* Subtle dotted flight curve */}
                  <span className="hidden sm:inline-block relative">
                    <svg className="w-14 h-7 -rotate-6 text-gray-500" viewBox="0 0 100 40" fill="none">
                      <path d="M 5 35 Q 50 -10 95 20" stroke="currentColor" strokeWidth="2.2" strokeDasharray="4 4" />
                    </svg>
                  </span>
                </div>

                {/* WORLDWIDE SHIPPING */}
                <div className="flex items-center gap-3 text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
                  <span className="text-[#137547]">WORLDWIDE</span>
                  <span className="text-[#1A1A1A]">SHIPPING</span>
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#137547] text-[#137547] p-1">
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Supporting copy */}
              <p className="text-sm sm:text-base text-gray-600 max-w-lg font-medium leading-relaxed">
                Explore trendy and unique fashion for Men, Women and Kids at affordable prices. Your favourite styles, delivered anywhere in the world.
              </p>

              {/* CTA Buttons — Shop Men →, Shop Women →, Shop Kids → */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/men"
                  className="px-6 py-3 bg-[#D91E2B] hover:bg-[#B81822] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Shop Men</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/women"
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-[#1A1A1A] border border-gray-300 hover:border-gray-900 font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Shop Women</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/kids"
                  className="px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Shop Kids</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Category Quick Dock (White Curved Pill at Bottom) */}
              <div className="pt-4 lg:pt-8">
                <div className="inline-flex items-center gap-5 sm:gap-8 bg-white/95 backdrop-blur-md px-5 sm:px-7 py-3 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-md hover:shadow-lg transition-shadow">
                  
                  {/* Men Avatar */}
                  <Link to="/men" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#D91E2B] transition-colors shrink-0 bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80"
                        alt="Men"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-[#1A1A1A] group-hover:text-[#D91E2B] transition-colors leading-tight">Men</p>
                      <span className="text-xs text-gray-400 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </Link>

                  <div className="w-[1px] h-9 bg-gray-200" />

                  {/* Women Avatar */}
                  <Link to="/women" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-pink-500 transition-colors shrink-0 bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80"
                        alt="Women"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-[#1A1A1A] group-hover:text-pink-600 transition-colors leading-tight">Women</p>
                      <span className="text-xs text-gray-400 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </Link>

                  <div className="w-[1px] h-9 bg-gray-200" />

                  {/* Kids Avatar */}
                  <Link to="/kids" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-500 transition-colors shrink-0 bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1543332164-6e82f355badc?w=160&q=80"
                        alt="Kids"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black text-[#1A1A1A] group-hover:text-amber-600 transition-colors leading-tight">Kids</p>
                      <span className="text-xs text-gray-400 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </Link>

                </div>
              </div>

            </div>

            {/* ── RIGHT: Main Models & Graphic Backdrops (Zero Gap) ── */}
            <div className="w-full lg:w-[56%] xl:w-[58%] relative flex items-end justify-center lg:justify-end -mt-6 lg:mt-0 lg:-ml-12 xl:-ml-16 z-10">

              {/* Big Yellow Sun Circle Backdrop (positioned behind the man, touching the text) */}
              <div 
                className="absolute left-[0%] sm:left-[2%] lg:left-[4%] top-[10%] sm:top-[6%] w-[320px] sm:w-[460px] lg:w-[520px] xl:w-[560px] aspect-square rounded-full bg-[#F4B324] -z-0 pointer-events-none shadow-sm"
              />

              {/* Dark Forest Green Arch behind woman */}
              <div 
                className="absolute right-[8%] sm:right-[12%] lg:right-[14%] top-[20%] sm:top-[16%] w-[220px] sm:w-[300px] lg:w-[340px] xl:w-[370px] h-[320px] sm:h-[440px] lg:h-[500px] xl:h-[540px] rounded-t-full bg-[#1C744C] -z-0 pointer-events-none shadow-sm"
              />

              {/* Worldwide Shipping Script & Airplane Dotted Flight Loop */}
              <div className="absolute top-2 right-4 sm:top-6 sm:right-16 lg:right-20 z-20 select-none pointer-events-none text-right">
                <div className="inline-flex items-center gap-1.5 font-bold text-[#1A1A1A] text-sm sm:text-base italic">
                  <span style={{ fontFamily: 'Georgia, serif' }}>Worldwide Shipping</span>
                  <span className="text-base sm:text-lg">✈️</span>
                </div>
                {/* Dotted arc flight line */}
                <svg className="w-36 sm:w-48 h-10 ml-auto text-gray-600" viewBox="0 0 160 40" fill="none">
                  <path d="M 10 35 Q 70 -5 150 20" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Main Model Cutout Image (large scale, touching the left side) */}
              <div className="relative z-10 w-full max-w-[580px] lg:max-w-[700px] xl:max-w-[780px] flex items-end">
                <img
                  src={heroImage}
                  alt="Like N Like Models"
                  className="w-full h-auto object-contain object-bottom filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.16)]"
                />
              </div>

              {/* Floating Badge 1: Unique Collections */}
              <div className="absolute right-0 sm:-right-2 top-24 sm:top-36 z-20 bg-[#FFF5EE]/95 backdrop-blur-md border border-[#FED7C3] rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-3 animate-float max-w-[190px] sm:max-w-[220px]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E62935] text-white flex items-center justify-center shrink-0 shadow-md">
                  {/* T-Shirt SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 2l4 4-2 3-2-1v14H8V8L6 9 4 6l4-4h2a2 2 0 004 0h2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-[#1A1A1A] leading-tight">Unique Collections</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight mt-0.5">Styles You Won't Find Everywhere</p>
                </div>
              </div>

              {/* Floating Badge 2: Affordable Prices */}
              <div className="absolute right-1 sm:-right-1 top-52 sm:top-68 z-20 bg-[#EEFAF2]/95 backdrop-blur-md border border-[#C8EED5] rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-3 max-w-[190px] sm:max-w-[220px]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#188046] text-white flex items-center justify-center shrink-0 shadow-md">
                  {/* Price Tag SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.586 2.586A2 2 0 0011.172 2H4a2 2 0 00-2 2v7.172a2 2 0 00.586 1.414l8 8a2 2 0 002.828 0l7.172-7.172a2 2 0 000-2.828l-8-8zM7 9a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-[#1A1A1A] leading-tight">Affordable Prices</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight mt-0.5">Trendy Fashion For Everyone</p>
                </div>
              </div>

              {/* Vintage Postal Rubber Stamp Badge (Bottom Right) */}
              <div className="absolute right-4 sm:right-6 bottom-8 sm:bottom-12 z-20 select-none pointer-events-none opacity-80">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-dashed border-gray-400 p-1 flex items-center justify-center -rotate-12">
                  <div className="w-full h-full rounded-full border border-gray-400 flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-gray-500">FASHION AROUND</span>
                    <span className="text-xs my-0.5">🌐</span>
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-gray-500">THE WORLD</span>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators < 01/03 > (Bottom Right) */}
              <div className="absolute right-4 sm:right-6 bottom-1 sm:bottom-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-[#1A1A1A] shadow-sm">
                <button className="hover:text-[#D91E2B] transition-colors">‹</button>
                <span className="text-[11px] font-extrabold tracking-widest text-gray-500">01 / 03</span>
                <button className="hover:text-[#D91E2B] transition-colors">›</button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          USP STRIP
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            {[
              { icon: '🚚', text: 'FREE SHIPPING OVER ₹999' },
              { icon: '🔄', text: '7-DAY EASY RETURNS' },
              { icon: '💵', text: 'CASH ON DELIVERY' },
              { icon: '🛡️', text: '100% GENUINE APPAREL' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <span className="text-lg">{icon}</span>
                <span className="text-[11px] font-black tracking-widest text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          BRAND BENEFITS
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-0 border border-gray-200">
            {[
              {
                accent: '#D91E2B',
                label: '01',
                title: 'UNIQUE COLLECTIONS',
                desc: "Styles you won't find everywhere. Curated fashion that speaks your language.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
              },
              {
                accent: '#F5B82E',
                label: '02',
                title: 'AFFORDABLE PRICES',
                desc: 'Trendy fashion without breaking the bank. Premium quality at prices for everyone.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                  </svg>
                ),
              },
              {
                accent: '#137547',
                label: '03',
                title: 'WORLDWIDE SHIPPING',
                desc: 'Your style, delivered anywhere in the world. Fast, reliable and trackable.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((b, i) => (
              <div
                key={b.label}
                className={`p-8 lg:p-10 group hover:bg-white transition-colors duration-300 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div style={{ color: b.accent }}>{b.icon}</div>
                  <span className="text-5xl font-black font-display text-gray-100 group-hover:text-gray-200 transition-colors leading-none select-none">
                    {b.label}
                  </span>
                </div>
                <div className="w-8 h-[2px] mb-4" style={{ backgroundColor: b.accent }} />
                <h3 className="text-lg font-black font-display text-[#1A1A1A] uppercase tracking-wide mb-3">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SHOP BY CATEGORY
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Curated For You</p>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-[#1A1A1A] uppercase">
              SHOP BY<br />CATEGORY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className="group relative overflow-hidden bg-gray-100"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Label */}
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <h3 className="text-4xl font-black font-display text-white uppercase tracking-tight leading-none mb-3">
                    {cat.label}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/0 group-hover:text-white transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>{cat.cta}</span>
                    <span>→</span>
                  </div>
                  <div className="w-0 h-[2px] bg-[#D91E2B] group-hover:w-12 transition-all duration-500 mt-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          JUST DROPPED — FEATURED PRODUCTS
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">New Season</p>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-[#1A1A1A] uppercase leading-tight">
                JUST DROPPED
              </h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">Fresh styles. New energy.</p>
            </div>
            <Link
              to="/recent-hits"
              className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#D91E2B] hover:gap-3 transition-all duration-200"
            >
              VIEW ALL →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200">
              <p className="text-5xl mb-4">👕</p>
              <p className="text-gray-500 font-medium">No featured products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link to="/recent-hits" className="btn-primary">
              VIEW ALL →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          THE COLLECTIONS — EDITORIAL
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Editorial</p>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-[#1A1A1A] uppercase">
              THE COLLECTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Large featured collection */}
            <Link
              to="/recent-hits"
              className="group relative overflow-hidden bg-gray-100 lg:col-span-2 lg:row-span-2"
              style={{ minHeight: '500px' }}
            >
              <img
                src={collections[0].image}
                alt={collections[0].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F5B82E] mb-2 block">New Season</span>
                <h3 className="text-4xl font-black font-display text-white uppercase">{collections[0].name}</h3>
                <p className="text-white/70 text-sm mt-1 mb-4">{collections[0].desc}</p>
                <span className="text-xs font-black uppercase tracking-widest text-white border-b border-white/30 pb-0.5 group-hover:border-[#D91E2B] group-hover:text-[#F5B82E] transition-colors">
                  EXPLORE →
                </span>
              </div>
            </Link>

            {/* Two smaller collections */}
            {collections.slice(1).map((col) => (
              <Link
                key={col.name}
                to={col.to}
                className="group relative overflow-hidden bg-gray-100"
                style={{ minHeight: '238px' }}
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-black font-display text-white uppercase">{col.name}</h3>
                  <p className="text-white/60 text-xs mt-1 mb-3">{col.desc}</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/0 group-hover:text-[#F5B82E] transition-colors">
                    EXPLORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          BRAND STORY
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <p className="section-label">Our Story</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-[#1A1A1A] uppercase leading-tight">
                FASHION<br />FOR EVERY<br /><span className="text-[#D91E2B]">YOU.</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#D91E2B]" />
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                LIKE 'N' LIKE is about finding your own style, expressing your personality and wearing what feels like you. We believe fashion is for everyone — unique, affordable, and delivered worldwide.
              </p>
              <Link
                to="/recent-hits"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A] hover:text-[#D91E2B] transition-colors group"
              >
                SHOP THE LOOK
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85"
                  alt="Like N Like Brand Story"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent box */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F5B82E] -z-10" />
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#137547] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FINAL CTA BANNER
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#1A1A1A] text-white relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        {/* Brand color accents */}
        <div className="absolute top-0 left-0 w-2 h-full bg-[#D91E2B]" />
        <div className="absolute top-0 right-16 w-2 h-full bg-[#137547]" />
        <div className="absolute top-0 right-8 w-2 h-full bg-[#F5B82E]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="section-label text-gray-500 mb-4">Like N Like</p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display uppercase leading-tight mb-4">
            FIND YOUR<br />NEXT LOOK.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Unique styles. Affordable prices. Delivered worldwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/men" className="btn-primary">SHOP MEN →</Link>
            <Link to="/women" className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-white text-white font-extrabold text-sm uppercase tracking-widest hover:bg-white hover:text-[#1A1A1A] transition-all duration-200 active:scale-95">
              SHOP WOMEN →
            </Link>
            <Link to="/kids" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F5B82E] text-[#1A1A1A] font-extrabold text-sm uppercase tracking-widest hover:brightness-105 transition-all duration-200 active:scale-95">
              SHOP KIDS →
            </Link>
          </div>
          {/* Bottom tagline */}
          <div className="mt-14 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
            <span className="text-[#D91E2B]">UNIQUE COLLECTIONS</span>
            <span>•</span>
            <span className="text-[#F5B82E]">AFFORDABLE PRICES</span>
            <span>•</span>
            <span className="text-[#137547]">WORLDWIDE SHIPPING</span>
          </div>
        </div>
      </section>
    </div>
  );
}
