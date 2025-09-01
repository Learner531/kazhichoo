import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

export default function FoodCard({product}) {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
       dispatch(addItem(product));
    }
  
   
    return (
        <div className="border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg bg-white dark:bg-kerala-charcoal shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden transform">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-kerala-deep-green dark:text-kerala-muted-gold mb-2">
                    {product.name} 
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                        {product.category}
                    </span>
                </h3>
                <p className="text-xl font-bold text-kerala-deep-green dark:text-kerala-banana-yellow mb-3">
                    {product.price}
                </p>
                <button className="w-full bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-4 py-2 rounded-lg font-semibold transition-colors" onClick={() => handleAddToCart()}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}