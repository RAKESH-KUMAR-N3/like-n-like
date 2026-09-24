import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import API from '../utils/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    clearCart
  } = useCart();

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    streetAddress: '',
    city: '',
    state: 'Telangana',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If cart is empty, redirect to cart
  useEffect(() => {
    if (cartCount === 0) {
      navigate('/cart');
    }
  }, [cartCount, navigate]);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    // Check login
    if (!user) {
      setError('Please login to place your order.');
      navigate('/login?redirect=/checkout');
      return;
    }

    // Validation
    if (!address.fullName.trim()) return setError('Please enter your full name');
    if (!/^\d{10}$/.test(address.phone.trim())) return setError('Please enter a valid 10-digit mobile number');
    if (!address.streetAddress.trim()) return setError('Please enter your street address / house no');
    if (!address.city.trim()) return setError('Please enter your city');
    if (!/^\d{6}$/.test(address.pincode.trim())) return setError('Please enter a valid 6-digit Indian Pincode');

    try {
      setLoading(true);
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice: cartSubtotal,
        shippingPrice: shippingFee,
        discountPrice: discountAmount,
        totalAmount: cartTotal
      };

      const res = await API.post('/orders', orderData);
      const createdOrder = res.data.data;

      // Clear the cart
      clearCart();

      // Navigate to success page
      navigate(`/order-success/${createdOrder._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Checkout</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Enter your delivery details and choose a payment method
        </p>

        {!user && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex justify-between items-center text-xs sm:text-sm text-amber-800">
            <span>Already have an account? Login for faster checkout and easy order tracking.</span>
            <Link to="/login?redirect=/checkout" className="px-4 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors">
              Login
            </Link>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-8 text-xs sm:text-sm text-rose-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Address & Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={address.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    value={address.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Flat / House No. / Building / Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={address.streetAddress}
                    onChange={handleChange}
                    placeholder="House no, street, colony, landmark"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={address.city}
                    onChange={handleChange}
                    placeholder="e.g. Hyderabad"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    State *
                  </label>
                  <select
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  >
                    {['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Kerala', 'Gujarat', 'Uttar Pradesh', 'West Bengal'].map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, '') }))}
                    placeholder="6-digit PIN code"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* COD Option */}
                <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'border-brand-500 bg-brand-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">💵 Cash on Delivery (COD)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full">POPULAR</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Pay in cash or UPI when your parcel arrives at your doorstep</p>
                  </div>
                </label>

                {/* Online Payment Option */}
                <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'ONLINE' ? 'border-brand-500 bg-brand-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={paymentMethod === 'ONLINE'}
                    onChange={() => setPaymentMethod('ONLINE')}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">💳 Online Payment (Instant)</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded-full">RECOMMENDED</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Netbanking</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Items Preview & Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-4 pb-2 border-b border-gray-50">
                Order Review ({cartCount} items)
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-4">
                {cartItems.map((item) => (
                  <div key={item.key} className="flex gap-3 items-center text-xs">
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-gray-400">Qty: {item.quantity} | Size: {item.size}</p>
                    </div>
                    <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Bag Total</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{shippingFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline font-black text-gray-900 text-sm">
                  <span>Amount to Pay</span>
                  <span className="text-lg text-brand-600">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span>•</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <span>🔒 256-bit SSL Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
