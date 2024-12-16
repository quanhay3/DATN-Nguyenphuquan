import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        totalPrice: { type: Number },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'],
      default: 'PENDING',
    },
    paymentMethod: {
      type: String,
      enum: ['CASH_ON_DELIVERY', 'ONLINE_PAYMENT'],
      required: true,
    },
    shippingAddress: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Order', orderSchema);
