// models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  // Liên kết với model Product
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        totalPrice: { type: Number },
        
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Cart', cartSchema);