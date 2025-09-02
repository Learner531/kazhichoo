import data from '../data/products';
import { createSlice } from '@reduxjs/toolkit';


const getInitialProducts = () => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : data;
};

const initialState = getInitialProducts();

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state));
        },
        editProduct: (state, action) => {
            const { id, product } = action.payload;
            state.products = state.products.map(p => p.id === id ? product : p);
            localStorage.setItem('products', JSON.stringify(state));
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload);
            localStorage.setItem('products', JSON.stringify(state));
        },
    },
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;