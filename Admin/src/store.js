import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth.service';
import userReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import userServiceReducer from './services/user.service';
import cartApi from './services/cart.service';  
import orderApi from './services/order.service';
import productApi from './services/product.service';

export const store = configureStore({
   reducer: {
      [authReducer.reducerPath]: authReducer.reducer,
      [userServiceReducer.reducerPath]: userServiceReducer.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer,
      userReducer: userReducer,
      cartReducer: cartReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authReducer.middleware,
         userServiceReducer.middleware,
         cartApi.middleware,
         orderApi.middleware,
         productApi.middleware,
      ])
});