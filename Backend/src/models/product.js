import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
   {
      image: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      price: {
         type: String,
         required: true,
      },
      discount: {
         type: Number,
         default: null,
      },
      description: {
         type: String,
         default: null,
      },
      quantity: {
         type: Number,
         default: 0,
         required: true,
      },
      status: {
         type: String,
         enum: ['SALE', 'NORMAL'],
         default: 'NORMAL',
      },
      category: {
         type: String,
         enum: ['Shopify', 'Lazada'],
         default: 'Lazada',
      }
   },
   { timestamps: true, versionKey: false },
);

productSchema.plugin(paginate)

export default mongoose.model('Product', productSchema);