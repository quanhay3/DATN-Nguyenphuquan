import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth.service';
import userReducer from './slices/authSlice';

export const store = configureStore({
   reducer: {
      [authReducer.reducerPath]: authReducer.reducer,
      userReducer: userReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authReducer.middleware,
      ])
});