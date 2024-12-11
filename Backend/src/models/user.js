import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      phoneNumber: {
         type: String,
         default: null,
      },
      address: {
         type: String,
         default: null,
      },
      avatar: {
         type: String,
         default:
            'https://res.cloudinary.com/dpwto5xyv/image/upload/v1702994824/fresh_mart/default_avatar.png',
      },
      role: {
         type: String,
         enum: ['admin', 'member'],
         default: 'member',
      },
      orders: [
         {
            type: mongoose.Types.ObjectId,
            ref: "Order",
            default: null
         }
      ],
      state: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true, versionKey: false },
);

userSchema.plugin(paginate)

export default mongoose.model('User', userSchema);
