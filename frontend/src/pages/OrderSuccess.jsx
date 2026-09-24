import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        console.error('Failed to load order', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const estimatedDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 text-center">
        {/* Animated Checkmark */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner animate-bounce">
          ✓
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Order Placed Successfully!
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 mb-2">
          Thank you for your order! 🎉
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          We've received your order and are getting it ready to be shipped.
        </p>

        {/* Order Details Card */}
        {order ? (
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left space-y-3 mb-8 text-xs sm:text-sm">
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-gray-900">{order.trackingNumber || order._id}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">{estimatedDate}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Payment Mode:</span>
              <span className="font-bold text-gray-900">{order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Online Payment'}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold text-brand-600 text-base">₹{order.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="pt-1">
              <span className="text-gray-500 block mb-1">Delivering to:</span>
              <p className="font-medium text-gray-800 leading-snug">
                {order.shippingAddress?.fullName}, {order.shippingAddress?.streetAddress}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-32 bg-gray-50 rounded-2xl mb-8 flex items-center justify-center text-gray-400 text-sm">
            {loading ? 'Loading order details...' : 'Order Reference: ' + id}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to={`/order/${id}`}
            className="py-3.5 px-6 bg-gray-900 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>📍</span>
            Track Order
          </Link>
          <Link
            to="/"
            className="py-3.5 px-6 border border-gray-200 hover:border-gray-900 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
