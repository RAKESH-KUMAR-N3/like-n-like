const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, required: true },
  size: { type: String, default: 'M' },
  color: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1, default: 1 }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  paymentDetails: {
    transactionId: { type: String, default: '' },
    paidAt: { type: Date }
  },
  orderStatus: {
    type: String,
    enum: ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  itemsPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  discountPrice: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  trackingNumber: { type: String, default: '' },
  notes: { type: String, default: '' },
  deliveredAt: { type: Date },
  cancelledAt: { type: Date },
  cancellationReason: { type: String, default: '' },
  returnRequest: {
    requested: { type: Boolean, default: false },
    type: { type: String, enum: ['Return', 'Exchange'], default: 'Return' },
    reason: { type: String, default: '' },
    comment: { type: String, default: '' },
    exchangeSize: { type: String, default: '' },
    refundMode: { type: String, default: 'UPI' },
    refundDetails: { type: String, default: '' },
    status: {
      type: String,
      enum: ['None', 'Pending', 'Approved', 'Pickup Scheduled', 'Refund Completed', 'Rejected'],
      default: 'None'
    },
    adminNotes: { type: String, default: '' },
    createdAt: { type: Date }
  },
  statusTimeline: [
    {
      status: { type: String, required: true },
      date: { type: Date, default: Date.now },
      comment: { type: String, default: '' }
    }
  ]
}, { timestamps: true });

// Auto add initial status to timeline on creation
orderSchema.pre('save', function (next) {
  if (this.isNew && (!this.statusTimeline || this.statusTimeline.length === 0)) {
    this.statusTimeline = [{
      status: this.orderStatus || 'Placed',
      date: new Date(),
      comment: 'Order placed successfully'
    }];
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
