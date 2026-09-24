import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const RETURN_REASONS = [
  'Size too small',
  'Size too large',
  'Defective or damaged fabric',
  'Quality not as expected',
  'Received wrong item',
  'Color differs from photos',
];

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  // Return/Exchange Modal State
  const [selectedReturnOrder, setSelectedReturnOrder] = useState(null);
  const [returnType, setReturnType] = useState('Return');
  const [returnReason, setReturnReason] = useState(RETURN_REASONS[0]);
  const [exchangeSize, setExchangeSize] = useState('M');
  const [refundMode, setRefundMode] = useState('UPI');
  const [refundDetails, setRefundDetails] = useState('');
  const [returnComment, setReturnComment] = useState('');
  const [submittingReturn, setSubmittingReturn] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get('/orders/my-orders');
      setOrders(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'My Orders — Like N Like';
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      setCancellingId(orderId);
      await API.put(`/orders/${orderId}/cancel`, { reason: 'Cancelled by customer' });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancellingId(null);
    }
  };

  const handleSubmitReturn = async (e) => {
    e.preventDefault();
    if (!selectedReturnOrder) return;
    if (returnType === 'Return' && !refundDetails.trim()) {
      alert('Please enter your UPI ID or Bank account details for refund');
      return;
    }

    try {
      setSubmittingReturn(true);
      await API.put(`/orders/${selectedReturnOrder._id}/return`, {
        type: returnType,
        reason: returnReason,
        comment: returnComment,
        exchangeSize: returnType === 'Exchange' ? exchangeSize : '',
        refundMode,
        refundDetails
      });
      alert(`${returnType} request submitted successfully! Our team will review within 24 hours.`);
      setSelectedReturnOrder(null);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit return request');
    } finally {
      setSubmittingReturn(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Placed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Confirmed': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Packed': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Shipped':
      case 'Out for Delivery': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 font-display">My Orders</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Track packages, check invoices, or request 7-day easy returns & exchanges
        </p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 text-sm text-rose-700">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">No Orders Yet</h2>
            <p className="text-sm text-gray-500 mb-6">You haven't placed any orders with Like N Like yet.</p>
            <Link
              to="/"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/25 transition-all inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const canCancel = ['Placed', 'Confirmed'].includes(order.orderStatus);
              const isDelivered = order.orderStatus === 'Delivered';
              const returnInfo = order.returnRequest;

              const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 mb-4">
                    <div>
                      <span className="text-xs text-gray-400">ORDER ID</span>
                      <p className="font-mono font-bold text-gray-900 text-sm">{order.trackingNumber || order._id}</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400">DATE</span>
                      <p className="font-semibold text-gray-900 text-sm">{orderDate}</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400">TOTAL</span>
                      <p className="font-black text-brand-600 text-sm">₹{order.totalAmount?.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                      {returnInfo?.requested && (
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          {returnInfo.type}: {returnInfo.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-5">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'}
                          alt={item.name}
                          className="w-14 h-18 object-cover rounded-xl bg-gray-100 flex-shrink-0"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            Size: <span className="font-semibold text-gray-800">{item.size}</span> | Qty: {item.quantity}
                          </p>
                          <p className="text-xs font-bold text-gray-900 mt-0.5">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Payment: <span className="font-semibold text-gray-800">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Paid'}</span>
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {/* Cancel Order */}
                      {canCancel && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingId === order._id}
                          className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors disabled:opacity-50"
                        >
                          {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                        </button>
                      )}

                      {/* Request Return / Exchange (on Delivered orders) */}
                      {isDelivered && !returnInfo?.requested && (
                        <button
                          onClick={() => setSelectedReturnOrder(order)}
                          className="px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <span>🔄</span>
                          Request Return / Exchange
                        </button>
                      )}

                      {/* Track Order */}
                      <Link
                        to={`/order/${order._id}`}
                        className="px-5 py-2 bg-gray-900 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <span>📍</span>
                        Track Order
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Return / Exchange Request */}
        {selectedReturnOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-gray-900 font-display">
                  Return or Exchange Request
                </h3>
                <button
                  onClick={() => setSelectedReturnOrder(null)}
                  className="text-gray-400 hover:text-gray-900 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-5">
                Eligible under Like N Like's 7-Day Hassle-Free Policy for Order{' '}
                <span className="font-mono font-bold text-gray-800">
                  {selectedReturnOrder.trackingNumber || selectedReturnOrder._id}
                </span>.
              </p>

              <form onSubmit={handleSubmitReturn} className="space-y-4 text-xs">
                {/* Type Selection */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-700 mb-2">
                    What would you like to do? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      returnType === 'Return' ? 'border-brand-500 bg-brand-50/40 font-bold' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="returnType"
                        value="Return"
                        checked={returnType === 'Return'}
                        onChange={() => setReturnType('Return')}
                        className="text-brand-500"
                      />
                      <span>💰 Return & Refund</span>
                    </label>

                    <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      returnType === 'Exchange' ? 'border-brand-500 bg-brand-50/40 font-bold' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="returnType"
                        value="Exchange"
                        checked={returnType === 'Exchange'}
                        onChange={() => setReturnType('Exchange')}
                        className="text-brand-500"
                      />
                      <span>🔄 Size Exchange</span>
                    </label>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Reason for {returnType} *
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:border-brand-500"
                  >
                    {RETURN_REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Replacement Size (if Exchange) */}
                {returnType === 'Exchange' && (
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Select Replacement Size Wanted *
                    </label>
                    <div className="flex gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setExchangeSize(sz)}
                          className={`w-10 h-10 rounded-xl font-bold border-2 transition-all ${
                            exchangeSize === sz
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-gray-200 bg-gray-50 text-gray-700'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Refund Details (if Return) */}
                {returnType === 'Return' && (
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80 space-y-3">
                    <label className="block font-bold uppercase tracking-wider text-gray-700">
                      Refund Transfer Method *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                        <input
                          type="radio"
                          name="refundMode"
                          value="UPI"
                          checked={refundMode === 'UPI'}
                          onChange={() => setRefundMode('UPI')}
                          className="text-brand-500"
                        />
                        <span>UPI ID (Instant)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                        <input
                          type="radio"
                          name="refundMode"
                          value="BANK"
                          checked={refundMode === 'BANK'}
                          onChange={() => setRefundMode('BANK')}
                          className="text-brand-500"
                        />
                        <span>Bank Account / IFSC</span>
                      </label>
                    </div>

                    <input
                      type="text"
                      required
                      value={refundDetails}
                      onChange={(e) => setRefundDetails(e.target.value)}
                      placeholder={refundMode === 'UPI' ? 'Enter UPI ID (e.g. mobile@upi)' : 'Account No, IFSC, Holder Name'}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                )}

                {/* Additional Comment */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Comments / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={returnComment}
                    onChange={(e) => setReturnComment(e.target.value)}
                    placeholder="Provide any details about the fit or item condition..."
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedReturnOrder(null)}
                    className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReturn}
                    className="px-6 py-2.5 bg-gray-900 hover:bg-brand-500 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    {submittingReturn ? 'Submitting...' : `Submit ${returnType} Request`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
