import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

const ORDER_STATUSES = ['All', 'Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returns / Exchanges'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');

  // Products State
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Admin OMS Dashboard — Like N Like';
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await API.get('/orders/admin/all');
      if (res.data.success) {
        setOrders(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const res = await API.get('/products?limit=100');
      if (res.data.success) setProducts(res.data.data || []);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await API.put(`/orders/admin/${orderId}/status`, {
        status: newStatus,
        comment: `Order status advanced to ${newStatus} by admin`
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateTracking = async (e) => {
    e.preventDefault();
    if (!trackingModalOrder || !trackingInput) return;
    try {
      await API.put(`/orders/admin/${trackingModalOrder._id}/status`, {
        status: trackingModalOrder.orderStatus === 'Placed' ? 'Shipped' : trackingModalOrder.orderStatus,
        trackingNumber: trackingInput,
        comment: `AWB Tracking Number assigned: ${trackingInput}`
      });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === trackingModalOrder._id ? { ...o, trackingNumber: trackingInput } : o
        )
      );
      setTrackingModalOrder(null);
      setTrackingInput('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update tracking');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product permanently?')) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Delete failed. Please try again.');
    }
  };

  // OMS Metrics
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => ['Placed', 'Confirmed', 'Packed'].includes(o.orderStatus)).length;
  const inTransitOrders = orders.filter((o) => ['Shipped', 'Out for Delivery'].includes(o.orderStatus)).length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;

  // Return Management
  const handleUpdateReturnStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/admin/${orderId}/return`, {
        status: newStatus,
        adminNotes: `Return status updated to ${newStatus} by admin`
      });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, returnRequest: { ...o.returnRequest, status: newStatus } }
            : o
        )
      );
      alert(`Return request updated to "${newStatus}"!`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update return status');
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    let matchesStatus = false;
    if (statusFilter === 'All') matchesStatus = true;
    else if (statusFilter === 'Returns / Exchanges') matchesStatus = o.returnRequest?.requested === true;
    else matchesStatus = o.orderStatus === statusFilter;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      o.trackingNumber?.toLowerCase().includes(q) ||
      o.shippingAddress?.fullName?.toLowerCase().includes(q) ||
      o.shippingAddress?.phone?.includes(q) ||
      o._id.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Confirmed': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Packed': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Out for Delivery': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Like N Like Command Center
            </div>
            <h1 className="text-3xl font-black font-display text-gray-900">
              Operations & OMS Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Welcome back, <span className="font-bold text-gray-800">{user?.name}</span> • Manage orders, fulfilment and inventory
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin/add-product"
              className="px-5 py-3 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              <span>+</span>
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Top KPI Cards (Live Metrics) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Revenue</span>
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">₹</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Confirmed & active orders</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Orders</span>
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">📦</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-gray-900">{orders.length}</p>
            <p className="text-[11px] text-gray-500 font-medium mt-1">Across all categories</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">To Pack / Pending</span>
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">⚡</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-purple-600">{pendingOrders}</p>
            <p className="text-[11px] text-gray-500 font-medium mt-1">Requires dispatch action</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">In Transit / Shipped</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">🚚</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-display text-emerald-600">{inTransitOrders}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">{deliveredOrders} orders delivered</p>
          </div>
        </div>

        {/* Main Tabs (Orders OMS vs Products) */}
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>📦 Order Management (OMS)</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-black">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>👕 Products & Stock</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 font-black">
              {products.length}
            </span>
          </button>
        </div>

        {/* TAB 1: ORDER MANAGEMENT SYSTEM */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter Bar & Search */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Status Pills */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {ORDER_STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === status
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="w-full md:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, ID..."
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Orders Table */}
            {ordersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-white rounded-3xl shadow-sm border border-gray-100 animate-pulse" />
                ))}
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 text-gray-400">
                <span className="text-4xl block mb-2">📭</span>
                <p className="font-bold text-gray-700">No matching orders found</p>
                <p className="text-xs text-gray-400 mt-1">Try changing the status filter or search query</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-wider font-extrabold border-b border-gray-100">
                      <tr>
                        <th className="py-4 px-6">Order Details</th>
                        <th className="py-4 px-6">Customer & Address</th>
                        <th className="py-4 px-6">Items Ordered</th>
                        <th className="py-4 px-6">Payment</th>
                        <th className="py-4 px-6">Fulfilment Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.map((order) => {
                        const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        });

                        return (
                          <tr key={order._id} className="hover:bg-gray-50/70 transition-colors">
                            {/* Order Info */}
                            <td className="py-4 px-6 align-top">
                              <span className="font-mono font-bold text-gray-900 block">
                                {order.trackingNumber || order._id}
                              </span>
                              <span className="text-[11px] text-gray-400">{dateStr}</span>
                              <div className="mt-1">
                                <span className="font-black text-brand-600 text-sm">
                                  ₹{order.totalAmount?.toLocaleString()}
                                </span>
                              </div>
                            </td>

                            {/* Customer */}
                            <td className="py-4 px-6 align-top max-w-[200px]">
                              <p className="font-bold text-gray-900">{order.shippingAddress?.fullName}</p>
                              <p className="text-gray-500 text-[11px]">📞 {order.shippingAddress?.phone}</p>
                              <p className="text-gray-400 text-[11px] truncate mt-0.5">
                                {order.shippingAddress?.city}, {order.shippingAddress?.state}
                              </p>
                            </td>

                            {/* Items */}
                            <td className="py-4 px-6 align-top">
                              <div className="space-y-1.5 max-w-[220px]">
                                {order.orderItems?.map((it, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <img
                                      src={it.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&q=80'}
                                      alt=""
                                      className="w-7 h-9 object-cover rounded bg-gray-100 flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <p className="font-semibold text-gray-800 truncate leading-snug">{it.name}</p>
                                      <p className="text-[10px] text-gray-400">
                                        Qty: {it.quantity} | Size: {it.size}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>

                            {/* Payment */}
                            <td className="py-4 px-6 align-top">
                              <span className="font-bold text-gray-800 block">
                                {order.paymentMethod === 'COD' ? '💵 COD' : '💳 Online'}
                              </span>
                              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                                order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </td>

                            {/* Status Changer */}
                            <td className="py-4 px-6 align-top">
                              <div className="flex flex-col gap-1.5">
                                <select
                                  disabled={updatingId === order._id}
                                  value={order.orderStatus}
                                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                  className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStatusColor(order.orderStatus)}`}
                                >
                                  {['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                  ))}
                                </select>
                                {order.trackingNumber && (
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    AWB: {order.trackingNumber}
                                  </span>
                                )}

                                {/* Return / Exchange Request Admin Actions */}
                                {order.returnRequest?.requested && (
                                  <div className="mt-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-[10px]">
                                    <p className="font-extrabold text-amber-900">
                                      {order.returnRequest.type}: <span className="underline">{order.returnRequest.status}</span>
                                    </p>
                                    <p className="text-amber-800 text-[9px] mt-0.5">Reason: {order.returnRequest.reason}</p>
                                    {order.returnRequest.refundDetails && (
                                      <p className="font-mono text-amber-800 text-[9px]">Refund: {order.returnRequest.refundDetails}</p>
                                    )}
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      <button
                                        onClick={() => handleUpdateReturnStatus(order._id, 'Approved')}
                                        className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[9px] font-bold"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => handleUpdateReturnStatus(order._id, 'Pickup Scheduled')}
                                        className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[9px] font-bold"
                                      >
                                        Pickup
                                      </button>
                                      <button
                                        onClick={() => handleUpdateReturnStatus(order._id, 'Refund Completed')}
                                        className="px-1.5 py-0.5 bg-purple-600 text-white rounded text-[9px] font-bold"
                                      >
                                        Refunded
                                      </button>
                                      <button
                                        onClick={() => handleUpdateReturnStatus(order._id, 'Rejected')}
                                        className="px-1.5 py-0.5 bg-rose-600 text-white rounded text-[9px] font-bold"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 align-top text-right space-y-1">
                              <button
                                onClick={() => {
                                  setTrackingModalOrder(order);
                                  setTrackingInput(order.trackingNumber || '');
                                }}
                                className="px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-brand-600 hover:bg-orange-50 rounded-lg transition-colors block ml-auto"
                              >
                                🏷️ Assign AWB
                              </button>
                              <Link
                                to={`/order/${order._id}`}
                                className="px-3 py-1.5 text-xs font-bold text-brand-600 hover:underline block"
                              >
                                View Tracker →
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-base font-black text-gray-900 uppercase tracking-wider">
                  Product Inventory ({products.length})
                </h2>
                <Link
                  to="/admin/add-product"
                  className="px-4 py-2 bg-gray-900 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  + Add Product
                </Link>
              </div>

              {productsLoading ? (
                <div className="p-8 text-center text-gray-400">Loading catalog...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-extrabold border-b border-gray-100">
                      <tr>
                        <th className="py-3 px-6">Product</th>
                        <th className="py-3 px-6">Category</th>
                        <th className="py-3 px-6">Price</th>
                        <th className="py-3 px-6">Sizes</th>
                        <th className="py-3 px-6">Stock Status</th>
                        <th className="py-3 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-50/70">
                          <td className="py-3.5 px-6 flex items-center gap-3">
                            <img
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&q=80'}
                              alt=""
                              className="w-10 h-12 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                            />
                            <div>
                              <p className="font-bold text-gray-900 truncate max-w-[200px]">{p.name}</p>
                              {p.isFeatured && (
                                <span className="text-[10px] text-purple-600 font-bold">🔥 Hit</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-6 capitalize font-semibold text-gray-700">{p.category}</td>
                          <td className="py-3.5 px-6 font-bold text-gray-900">₹{p.price?.toLocaleString()}</td>
                          <td className="py-3.5 px-6">
                            <div className="flex gap-1 flex-wrap max-w-[150px]">
                              {p.sizes?.map((s) => (
                                <span key={s} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">{s}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-6">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p._id)}
                              className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-bold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Assign AWB Tracking Number */}
        {trackingModalOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-float">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-gray-900">Assign Courier AWB / Tracking</h3>
                <button
                  onClick={() => setTrackingModalOrder(null)}
                  className="text-gray-400 hover:text-gray-900 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Enter the courier AWB number (e.g. Shiprocket, Delhivery, BlueDart) for order{' '}
                <span className="font-mono font-bold text-gray-800">{trackingModalOrder._id}</span>.
              </p>

              <form onSubmit={handleUpdateTracking} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    AWB Tracking Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="e.g. SR-894728919 or DLHV-998822"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setTrackingModalOrder(null)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gray-900 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
                  >
                    Save & Mark Shipped
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
