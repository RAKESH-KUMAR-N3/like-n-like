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

  // Live Search State
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

  // Debounced live search
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

  // Click outside listener for search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/men', label: 'Men' },
    { to: '/women', label: 'Women' },
    { to: '/kids', label: 'Kids' },
    { to: '/recent-hits', label: 'New In' },
    { to: '/policies', label: 'Collections' },
  ];

  const activeCls = 'text-brand-600 font-bold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#D91E2B] after:rounded-full';
  const inactiveCls = 'text-gray-700 hover:text-[#D91E2B] font-semibold';

  return (
    <header className="sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-gray-950 via-zinc-900 to-gray-950 text-white text-[11px] font-medium py-1.5 px-4 border-b border-white/10 tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3 text-zinc-400">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Genuine Apparel</span>
            <span className="text-zinc-700">•</span>
            <span>⚡ Express Dispatch</span>
            <span className="text-zinc-700">•</span>
            <span>🔄 7-Day Hassle-Free Returns</span>
          </div>
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto gap-2 text-amber-300 font-semibold">
            <span>🏷️ Special: Use <span className="text-white font-extrabold px-1.5 py-0.5 bg-white/10 rounded">WELCOME10</span> for 10% OFF</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ${scrolled ? 'shadow-md shadow-gray-200/50 py-0.5' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0 py-1">
              <img 
                src={mainLogo} 
                alt="Like N Like" 
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative text-sm pb-1 transition-all duration-200 ${isActive ? activeCls : inactiveCls}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Live Search Bar (Desktop) */}
            <div ref={searchRef} className="hidden lg:block relative w-56 xl:w-72">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (searchResults.length > 0) setShowSearchDropdown(true); }}
                  placeholder="Search for products..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-100/90 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-[#D91E2B] rounded-full text-xs transition-all focus:outline-none"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchLoading && (
                  <div className="w-3.5 h-3.5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin absolute right-3" />
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                    Matching Products
                  </div>
                  {searchResults.map((prod) => (
                    <Link
                      key={prod._id}
                      to={`/product/${prod._id}`}
                      onClick={() => { setShowSearchDropdown(false); setSearchQuery(''); }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={prod.images?.[0] || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&q=80'}
                        alt=""
                        className="w-8 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">{prod.name}</p>
                        <p className="text-[10px] text-gray-400 capitalize">{prod.category} • ₹{prod.price?.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          {/* Actions: Wishlist, Cart & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:text-brand-500 hover:bg-orange-50 rounded-full transition-colors"
              title="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-brand-500 hover:bg-orange-50 rounded-full transition-colors"
              title="Bag"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link to="/admin" className="text-xs font-semibold px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
                      ⚙️ Admin
                    </Link>
                  )}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                      <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-50">
                          <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/my-orders"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-500 transition-colors"
                        >
                          📦 My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-500 transition-colors"
                        >
                          ❤️ Wishlist ({wishlistCount})
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-500 transition-colors"
                        >
                          🛍️ My Bag ({cartCount})
                        </Link>
                        <div className="border-t border-gray-50 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                          >
                            🚪 Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-brand-500 transition-colors px-3 py-1.5">
                    Login
                  </Link>
                  <Link to="/register" className="text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors ml-1"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-50 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium transition-colors ${isActive ? 'text-brand-500' : 'text-gray-700 hover:text-brand-500'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-2">
              {user ? (
                <>
                  <p className="text-xs text-gray-400 mb-2">{user.name} ({user.role})</p>
                  <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-500">
                    📦 My Orders
                  </Link>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-500">
                    ❤️ Wishlist ({wishlistCount})
                  </Link>
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-500">
                    🛍️ My Bag ({cartCount})
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-purple-600">⚙️ Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="block py-2 text-sm font-medium text-red-500 text-left w-full">🚪 Logout</button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 text-sm font-semibold border border-gray-200 rounded-xl text-gray-700">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 text-sm font-semibold bg-brand-500 text-white rounded-xl">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown on outside click */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
      )}
    </nav>
  </header>
  );
}
