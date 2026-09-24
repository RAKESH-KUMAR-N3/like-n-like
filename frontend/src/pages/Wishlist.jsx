import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-4xl mb-6 shadow-inner">
          ❤️
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 max-w-sm mb-8 text-sm">
          Save items you love here to easily purchase them later!
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/25 transition-all hover:scale-105"
        >
          Explore Clothing
        </Link>
      </div>
    );
  }

  const handleMoveToBag = (product) => {
    const size = product.sizes?.length > 0 ? product.sizes[0] : 'Free Size';
    const color = product.colors?.length > 0 ? product.colors[0] : '';
    addToCart(product, size, color, 1);
    removeFromWishlist(product._id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span>My Wishlist</span>
              <span className="text-red-500 text-2xl">❤️</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          <Link to="/" className="text-xs sm:text-sm font-bold text-brand-600 hover:underline">
            Continue Shopping →
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((product) => {
            const discount = product.mrp > product.price
              ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
              : 0;

            const imageUrl = product.images?.length > 0
              ? product.images[0]
              : 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80';

            return (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'; }}
                      />
                    </Link>

                    {discount > 0 && (
                      <span className="absolute top-3 left-3 bg-brand-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                        {discount}% OFF
                      </span>
                    )}

                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow transition-all"
                      title="Remove from Wishlist"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] text-gray-400 uppercase font-medium mb-1">
                      {product.subcategory || product.category}
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 hover:text-brand-500 transition-colors block"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base font-black text-gray-900">₹{product.price?.toLocaleString()}</span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-gray-400 line-through">₹{product.mrp?.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-2.5 bg-gray-900 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>🛍️</span>
                    Move to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
