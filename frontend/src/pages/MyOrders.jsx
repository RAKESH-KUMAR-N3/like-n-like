import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Placed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Confirmed':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Packed':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">My Orders</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Track packages, check past invoices, and review order status
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

                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
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

                    <div className="flex gap-2">
                      {canCancel && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingId === order._id}
                          className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors disabled:opacity-50"
                        >
                          {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                        </button>
                      )}

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
      </div>
    </div>
  );
}
