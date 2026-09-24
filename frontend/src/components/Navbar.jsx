import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import API from '../utils/api';
import mainLogo from '../assets/main-logo.png';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Live Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await API.get(`/products?search=${encodeURIComponent(searchQuery.trim())}&limit=5`);
        if (res.data.success) {
          setSearchResults(res.data.data || []);
          setShowSearchDropdown(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setSearchLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside = close search dropdown
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/men', label: 'Men' },
    { to: '/women', label: 'Women' },
    { to: '/kids', label: 'Kids' },
    { to: '/recent-hits', label: 'Recent Hits' },
  ];

  return (
    <header className="sticky top-0 z-50">

      {/* ── Main Navbar ───────────────────────────── */}
      <nav
        className={`bg-white border-b border-gray-100 transition-all duration-300 ${
          scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <img
                src={mainLogo}
                alt="Like N Like"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7 flex-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative text-[13px] font-black uppercase tracking-wider pb-0.5 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#D91E2B] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D91E2B]'
                        : 'text-[#1A1A1A] hover:text-[#D91E2B]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Right Side: Search + Cart + User */}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto">

              {/* Search Bar — Desktop */}
              <div ref={searchRef} className="hidden lg:block relative">
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { if (searchResults.length > 0) setShowSearchDropdown(true); }}
                    placeholder="Search products..."
                    className="w-48 xl:w-56 pl-9 pr-4 py-2 bg-[#F7F4EF] border border-transparent focus:border-[#D91E2B] focus:bg-white text-xs font-medium placeholder-gray-400 focus:outline-none transition-all"
                  />
                  {searchLoading && (
                    <div className="w-3 h-3 border-2 border-[#D91E2B] border-t-transparent rounded-full animate-spin absolute right-3" />
                  )}
                </div>

                {/* Autocomplete Dropdown */}
                {showSearchDropdown && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-100 shadow-xl z-50">
                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                      Results
                    </div>
                    {searchResults.map((prod) => (
                      <Link
                        key={prod._id}
                        to={`/product/${prod._id}`}
                        onClick={() => { setShowSearchDropdown(false); setSearchQuery(''); }}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F7F4EF] transition-colors"
                      >
                        <img
                          src={prod.images?.[0] || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&q=80'}
                          alt=""
                          className="w-8 h-10 object-cover bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#1A1A1A] truncate">{prod.name}</p>
                          <p className="text-[10px] text-gray-400 capitalize">{prod.category} · ₹{prod.price?.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Favourites / Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2.5 text-[#1A1A1A] hover:text-[#D91E2B] transition-colors group"
                title="Favourites"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D91E2B] text-white text-[9px] font-black flex items-center justify-center rounded-full">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2.5 text-[#1A1A1A] hover:text-[#D91E2B] transition-colors group"
                title="Bag"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D91E2B] text-white text-[9px] font-black flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile — Desktop */}
              <div className="hidden md:block relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center justify-center w-9 h-9 bg-[#1A1A1A] text-white font-black text-sm hover:bg-[#D91E2B] transition-colors duration-200"
                      title={user.name}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-100 shadow-xl z-50">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="text-xs font-black text-[#1A1A1A] truncate">{user.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                        </div>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-purple-600 hover:bg-purple-50 transition-colors"
                          >
                            ⚙ Admin Panel
                          </Link>
                        )}
                        <Link
                          to="/my-orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#F7F4EF] hover:text-[#D91E2B] transition-colors"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#F7F4EF] hover:text-[#D91E2B] transition-colors"
                        >
                          My Bag ({cartCount})
                        </Link>
                        <div className="border-t border-gray-50 mt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#D91E2B] hover:bg-red-50 transition-colors text-left"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center w-9 h-9 border border-gray-200 text-[#1A1A1A] hover:bg-[#D91E2B] hover:text-white hover:border-[#D91E2B] transition-colors duration-200"
                    title="Login"
                  >
                    <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-[#1A1A1A] hover:text-[#D91E2B] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu (slide down) ─────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 text-sm font-black uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#D91E2B]' : 'text-[#1A1A1A] hover:text-[#D91E2B]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile Search */}
            <div className="pt-2 pb-1">
              <div className="relative flex items-center">
                <svg className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7F4EF] text-xs font-medium placeholder-gray-400 focus:outline-none border border-transparent focus:border-[#D91E2B]"
                />
              </div>
            </div>

            {/* Mobile Auth section */}
            <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
              {user ? (
                <>
                  <p className="text-[11px] text-gray-400 font-medium px-0.5 pb-1">{user.name}</p>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-purple-600">
                      Admin Panel
                    </Link>
                  )}
                  <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-[#1A1A1A] hover:text-[#D91E2B]">
                    My Orders
                  </Link>
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-[#1A1A1A] hover:text-[#D91E2B]">
                    My Bag ({cartCount})
                  </Link>
                  <button onClick={handleLogout} className="block py-2 text-xs font-black uppercase tracking-wider text-[#D91E2B] text-left w-full">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 text-xs font-black uppercase tracking-widest border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 text-xs font-black uppercase tracking-widest bg-[#D91E2B] text-white hover:bg-[#B81822] transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for dropdown close */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
      )}
    </header>
  );
}
