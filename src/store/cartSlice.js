import { createSlice } from '@reduxjs/toolkit';

// Get initial cart from localStorage or default to empty
const getInitialCart = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};


const initialState = getInitialCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        item.quantity = quantity;
        
        // Recalculate totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;