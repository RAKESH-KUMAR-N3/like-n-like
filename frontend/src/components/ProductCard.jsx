import { useState } from 'react';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

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

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('lnl_user') || 'null');
    if (!user) {
      alert('Please login to add to cart');
      return;
    }
    // Phase 2 — Cart functionality
    alert('Cart feature coming in Phase 2! 🛒');
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'; }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${categoryColors[product.category] || 'bg-gray-100 text-gray-700'}`}>
            {product.category}
          </span>
          {discount > 0 && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-500 text-white">
              {discount}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
              🔥 Hit
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
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
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium mb-1 capitalize">{product.subcategory || product.category}</p>
        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{product.name}</h3>

        {/* Sizes */}
        <div className="flex flex-wrap gap-1 mb-3">
          {(product.sizes || []).slice(0, 4).map((s) => (
            <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md font-medium">{s}</span>
          ))}
          {product.sizes?.length > 4 && (
            <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-black text-gray-900">₹{product.price?.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{product.mrp?.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
            product.inStock
              ? 'bg-gray-900 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/25'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
