import React from 'react';
import products from '../data/products';
import FoodCard from '../components/FoodCard';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

export default function FoodList({ searchQuery, selectedFilters, setCartCount, setCartItems, cartItems }) {
    const filteredProducts = products.filter((product) => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Type filter
        const matchesType = selectedFilters.type === 'All' || product.type === selectedFilters.type;
        
        // Category filter
        const matchesCategory = selectedFilters.category === 'All' || product.category === selectedFilters.category;
        
        return matchesSearch && matchesType && matchesCategory;
    });

    const dispatch = useDispatch();

    const addToCart = (product) => {
        dispatch(addItem(product));
    };

    return (
        <div className="p-6">
            {/* Results Info */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-kerala-deep-green dark:text-kerala-muted-gold mb-2">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Items'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Showing {filteredProducts.length} of {products.length} items
                    {selectedFilters.type !== 'All' && ` • ${selectedFilters.type}`}
                    {selectedFilters.category !== 'All' && ` • ${selectedFilters.category}`}
                </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <FoodCard key={product.id} product={product} setCartCount={setCartCount} setCartItems={setCartItems} cartItems={cartItems} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-kerala-deep-green dark:text-kerala-muted-gold mb-2">
                        No items found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                </div>
            )}
        </div>
    )
}
