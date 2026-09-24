import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';

const ORDER_STEPS = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-48 bg-gray-200 rounded-3xl animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">{error || 'Could not find the requested order.'}</p>
        <Link to="/my-orders" className="px-6 py-3 bg-brand-500 text-white font-bold rounded-xl inline-block">
          View All Orders
        </Link>
      </div>
    );
  }

  const isCancelled = order.orderStatus === 'Cancelled';
  const currentStepIndex = ORDER_STEPS.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <Link to="/my-orders" className="text-xs font-bold text-brand-600 hover:underline mb-1 inline-block">
              ← Back to My Orders
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <span>Order Details</span>
              <span className="font-mono text-sm font-bold bg-gray-100 text-gray-700 px-3 py-1 rounded-xl">
                {order.trackingNumber || order._id}
              </span>
            </h1>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>🖨️</span>
            Print Invoice
          </button>
        </div>

        {/* Tracking Timeline Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-800 mb-6">
            Package Status
          </h2>

          {isCancelled ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-800">
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>✕</span>
                <span>This order was cancelled</span>
              </div>
              <p className="text-xs text-rose-600">
                Reason: {order.cancellationReason || 'Cancelled by customer'}
              </p>
            </div>
          ) : (
            <div>
              {/* Stepper Bar */}
              <div className="relative flex justify-between items-center mb-8">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 transition-all duration-700 z-0"
                  style={{
                    width: currentStepIndex >= 0 ? `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%` : '0%'
                  }}
                />

                {ORDER_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-sm ${
                          isDone
                            ? 'bg-brand-500 text-white shadow-brand-500/30 ring-4 ring-brand-100'
                            : 'bg-white text-gray-400 border-2 border-gray-200'
                        } ${isCurrent ? 'animate-pulse scale-110' : ''}`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span className={`text-[11px] sm:text-xs font-bold mt-2 text-center ${
                        isDone ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Status Updates Feed */}
              {order.statusTimeline?.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2 text-xs">
                  <h4 className="font-bold text-gray-700 mb-2">Activity Timeline:</h4>
                  {order.statusTimeline.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                      <div>
                        <span className="font-bold text-gray-900">{item.status}</span>
                        {item.comment && <span className="text-gray-500 ml-2">- {item.comment}</span>}
                      </div>
                      <span className="text-gray-400 text-[11px]">
                        {new Date(item.date).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2 Column Details: Items & Address/Payment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Items */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-4 pb-2 border-b border-gray-50">
              Ordered Items ({order.orderItems?.length})
            </h3>

            <div className="space-y-4">
              {order.orderItems?.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Size: <span className="font-semibold text-gray-800">{item.size}</span>
                      {item.color && <> | Color: <span className="font-semibold text-gray-800">{item.color}</span></>}
                    </p>
                    <p className="text-xs text-gray-500">
                      Quantity: <span className="font-semibold text-gray-800">{item.quantity}</span>
                    </p>
                    <p className="text-sm font-black text-gray-900 mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="border-t border-gray-100 mt-6 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal:</span>
                <span>₹{order.itemsPrice?.toLocaleString()}</span>
              </div>
              {order.discountPrice > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount:</span>
                  <span>-₹{order.discountPrice?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery:</span>
                <span>{order.shippingPrice === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${order.shippingPrice}`}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-black text-gray-900">
                <span>Grand Total:</span>
                <span className="text-base text-brand-600">₹{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-xs">
              <h3 className="font-black uppercase tracking-wider text-gray-700 mb-3 pb-2 border-b border-gray-50">
                Delivery Address
              </h3>
              <p className="font-bold text-gray-900 text-sm mb-1">{order.shippingAddress?.fullName}</p>
              <p className="text-gray-600 leading-relaxed">
                {order.shippingAddress?.streetAddress},<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </p>
              <p className="text-gray-800 font-semibold mt-3">📞 {order.shippingAddress?.phone}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-xs">
              <h3 className="font-black uppercase tracking-wider text-gray-700 mb-3 pb-2 border-b border-gray-50">
                Payment Info
              </h3>
              <p className="text-gray-600 mb-1">
                Method: <span className="font-bold text-gray-900">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</span>
              </p>
              <p className="text-gray-600">
                Status: <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {order.paymentStatus}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
