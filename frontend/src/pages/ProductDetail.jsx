import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        const prodData = res.data.data;
        setProduct(prodData);
        if (prodData.sizes?.length > 0) setSelectedSize(prodData.sizes[0]);
        if (prodData.colors?.length > 0) setSelectedColor(prodData.colors[0]);

        // Fetch similar products in same category
        if (prodData.category) {
          const simRes = await API.get(`/products?category=${prodData.category}&limit=4`);
          setSimilarProducts(
            (simRes.data.data || []).filter((p) => p._id !== prodData._id)
          );
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeResult({
        available: true,
        message: '⚡ Express Delivery available by ' + new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    } else {
      setPincodeResult({
        available: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      });
    }
  };

  const handleAddToBag = () => {
    if (!product) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[480px] bg-gray-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">👕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">{error || "The product you're looking for doesn't exist."}</p>
        <Link to="/" className="inline-block px-6 py-3 bg-brand-500 text-white font-semibold rounded-2xl shadow-lg shadow-brand-500/30">
          Back to Shopping
        </Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80'
  ];

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const wishlisted = isInWishlist(product._id);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-500">Home</Link>
          <span>/</span>
          <Link to={`/${product.category}`} className="capitalize hover:text-brand-500">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Gallery Column */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-inner" style={{ aspectRatio: '3/4' }}>
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {discount}% OFF
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    fill={wishlisted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-brand-500 ring-2 ring-brand-500/20 scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                    {product.subcategory || product.category}
                  </span>
                  {product.inStock ? (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                      ✕ Out of Stock
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating Strip */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg text-amber-700 text-xs font-bold">
                    <span>★ 4.8</span>
                  </div>
                  <span className="text-xs text-gray-400">| 142 Verified Ratings</span>
                </div>

                {/* Pricing Box */}
                <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-black text-gray-900">₹{product.price?.toLocaleString()}</span>
                    {product.mrp > product.price && (
                      <span className="text-lg text-gray-400 line-through">₹{product.mrp?.toLocaleString()}</span>
                    )}
                    {discount > 0 && (
                      <span className="text-sm font-extrabold text-emerald-600 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Inclusive of all taxes. Free shipping on orders above ₹999.
                  </p>
                </div>

                {/* Size Selector */}
                {product.sizes?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Select Size: <span className="text-brand-600">{selectedSize}</span>
                      </label>
                      <button className="text-xs font-semibold text-brand-600 hover:underline">
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] h-12 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
                            selectedSize === size
                              ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/30 scale-105'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {product.colors?.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Color: <span className="text-brand-600">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                            selectedColor === color
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6 flex items-center gap-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <button
                    disabled={!product.inStock}
                    onClick={handleAddToBag}
                    className={`py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                      product.inStock
                        ? 'bg-gray-900 text-white hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/25 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Bag
                  </button>

                  <button
                    disabled={!product.inStock}
                    onClick={handleBuyNow}
                    className={`py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 shadow-xl shadow-brand-500/30 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    ⚡ Buy Now
                  </button>
                </div>

                {/* Delivery Checker */}
                <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Check Delivery & COD Availability
                  </label>
                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 px-3.5 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-brand-500 transition-colors"
                    >
                      Check
                    </button>
                  </form>
                  {pincodeResult && (
                    <p className={`mt-2 text-xs font-semibold ${pincodeResult.available ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {pincodeResult.message}
                    </p>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 text-center">
                  <div className="p-2">
                    <span className="text-xl block mb-1">🛡️</span>
                    <p className="text-[11px] font-bold text-gray-800">100% Original</p>
                    <p className="text-[10px] text-gray-400">Direct from Brand</p>
                  </div>
                  <div className="p-2">
                    <span className="text-xl block mb-1">🔄</span>
                    <p className="text-[11px] font-bold text-gray-800">7 Days Return</p>
                    <p className="text-[10px] text-gray-400">Hassle Free Pickup</p>
                  </div>
                  <div className="p-2">
                    <span className="text-xl block mb-1">💵</span>
                    <p className="text-[11px] font-bold text-gray-800">Cash on Delivery</p>
                    <p className="text-[10px] text-gray-400">Pay at Doorstep</p>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Product Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <span>You May Also Like</span>
              <span className="text-xs bg-brand-100 text-brand-700 font-bold px-2.5 py-1 rounded-full uppercase">
                {product.category}
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
