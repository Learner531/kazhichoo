import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './UserSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer,
  },
});