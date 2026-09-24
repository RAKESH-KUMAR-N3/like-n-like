import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(product._id);

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const imageUrl = product.images?.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80';

  const categoryColors = {
    men: 'bg-blue-100 text-blue-700',
    women: 'bg-pink-100 text-pink-700',
    kids: 'bg-yellow-100 text-yellow-700',
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.length > 0 ? product.sizes[0] : 'Free Size';
    const defaultColor = product.colors?.length > 0 ? product.colors[0] : '';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'; }}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize shadow-sm ${categoryColors[product.category] || 'bg-gray-100 text-gray-700'}`}>
              {product.category}
            </span>
            {discount > 0 && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-500 text-white shadow-sm">
                {discount}% OFF
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 shadow-sm">
                🔥 Hit
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            aria-label="Add to Wishlist"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <svg
              className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              fill={wishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Out of Stock */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-400 font-medium mb-1 capitalize">{product.subcategory || product.category}</p>
          <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
            {product.name}
          </h3>

          {/* Sizes */}
          <div className="flex flex-wrap gap-1 mb-3">
            {(product.sizes || []).slice(0, 4).map((s) => (
              <span key={s} className="px-2 py-0.5 text-[11px] bg-gray-100 text-gray-600 rounded-md font-medium">{s}</span>
            ))}
            {product.sizes?.length > 4 && (
              <span className="text-[11px] text-gray-400 font-medium">+{product.sizes.length - 4}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-black text-gray-900">₹{product.price?.toLocaleString()}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.mrp?.toLocaleString()}</span>
            )}
            {discount > 0 && (
              <span className="text-xs text-green-600 font-bold">Save ₹{(product.mrp - product.price).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <button
          disabled={!product.inStock}
          onClick={handleQuickAdd}
          className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
            product.inStock
              ? 'bg-gray-900 hover:bg-brand-500 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {product.inStock ? 'Add to Bag' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
