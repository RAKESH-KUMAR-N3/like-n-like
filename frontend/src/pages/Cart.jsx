import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    totalMrp,
    mrpSavings,
    shippingFee,
    discountAmount,
    cartTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center text-4xl mb-6 shadow-inner">
          🛍️
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Your Bag is Empty</h2>
        <p className="text-gray-500 max-w-sm mb-8 text-sm">
          Looks like you haven't added any clothing yet. Discover the latest trendy collections!
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/25 transition-all hover:scale-105"
        >
          Explore Trending Styles
        </Link>
      </div>
    );
  }

  // Free delivery threshold progress
  const freeThreshold = 999;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100));
  const amountNeeded = Math.max(0, freeThreshold - cartSubtotal);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 flex items-center gap-2">
          <span>Shopping Bag</span>
          <span className="text-sm font-semibold text-gray-500">({cartCount} items)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Review your items and proceed to fast checkout
        </p>

        {/* Free Delivery Bar */}
        <div className="bg-white rounded-2xl p-4 mb-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span>
              {amountNeeded === 0 ? (
                <span className="text-emerald-600">🎉 Congratulations! You unlocked FREE Delivery!</span>
              ) : (
                <span className="text-gray-700">
                  Add <span className="text-brand-600">₹{amountNeeded.toLocaleString()}</span> more for <span className="text-brand-600">FREE Delivery</span>
                </span>
              )}
            </span>
            <span className="text-gray-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.key}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex gap-4 sm:gap-6 items-center"
              >
                {/* Product Thumbnail */}
                <Link
                  to={`/product/${item.productId}`}
                  className="w-20 h-26 sm:w-24 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-inner"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'; }}
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-sm sm:text-base font-bold text-gray-900 truncate hover:text-brand-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      title="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Size & Color Tags */}
                  <div className="flex gap-2 text-xs text-gray-500 mt-1 mb-3">
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">Size: {item.size}</span>
                    {item.color && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">Color: {item.color}</span>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                      {item.mrp > item.price && (
                        <span className="text-xs text-gray-400 line-through">₹{(item.mrp * item.quantity).toLocaleString()}</span>
                      )}
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="space-y-6">
            {/* Promo Code Box */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">Coupons & Offers</h3>
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-800 text-xs font-bold">
                  <div>
                    <span className="text-emerald-600 mr-1.5">✓</span>
                    <span className="uppercase">{coupon.code}</span> ({coupon.percent}% OFF Applied)
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 px-3.5 py-2 text-xs uppercase font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-brand-500 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-rose-600 font-medium">{couponError}</p>}
                  <p className="text-[11px] text-gray-400">Try coupon code <span className="font-bold text-gray-700">WELCOME10</span> or <span className="font-bold text-gray-700">FASHION20</span></p>
                </form>
              )}
            </div>

            {/* Price Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-4 pb-2 border-b border-gray-50">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>₹{totalMrp.toLocaleString()}</span>
                </div>

                {mrpSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount on MRP</span>
                    <span>-₹{mrpSavings.toLocaleString()}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline font-black text-gray-900 text-base">
                  <span>Total Amount</span>
                  <span className="text-xl text-brand-600">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {(mrpSavings + discountAmount) > 0 && (
                <div className="mt-4 p-2.5 bg-emerald-50 rounded-xl text-center text-xs font-bold text-emerald-700">
                  You are saving ₹{(mrpSavings + discountAmount).toLocaleString()} on this order! 🎉
                </div>
              )}

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
