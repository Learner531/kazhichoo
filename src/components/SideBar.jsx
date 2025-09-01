import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { showLoginModal } from '../store/UserSlice';

const SideBar = ({ isCartOpen, setIsCartOpen }) => {
  const dispatch = useDispatch();
  const { items: cartItems, totalItems, totalPrice } = useSelector((state) => state.cart);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);




  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // setIsCartOpen(false);

    if(isLoggedIn){
    setShowCheckoutModal(true);
    }
    else{
      dispatch(showLoginModal());
    }
  };

  const ContinueShopping = () => {
    handleClearCart();
    setShowCheckoutModal(false);
    setIsCartOpen(false);
  };
  const getTotalItems = () => totalItems;
  const getTotalPrice = () => totalPrice;
  return (
    <>
      {/* Overlay */}
{isCartOpen && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
    onClick={() => setIsCartOpen(false)}
  />
)}
      
      {/* Cart Sidebar */}
<div className={`fixed top-0 right-0 h-full w-96 max-w-full bg-kerala-coconut-white dark:bg-kerala-charcoal shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
  isCartOpen ? 'translate-x-0' : 'translate-x-full'
}`}>
  

  {/* Cart Header */}
<div className="flex items-center justify-between p-4 border-b border-kerala-green-100 dark:border-kerala-dark-palm bg-kerala-coconut-white dark:bg-kerala-charcoal">
  <div className="flex items-center space-x-3">
    <svg className="h-6 w-6 text-kerala-deep-green dark:text-kerala-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
    </svg>
    <div>
      <h2 className="text-lg font-semibold text-kerala-deep-green dark:text-kerala-coconut-white">
        Your Cart
      </h2>
      <p className="text-sm text-kerala-deep-green/70 dark:text-kerala-coconut-white/70">
        {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
      </p>
    </div>
  </div>
  
  <div className="flex items-center space-x-2">
     {/* Clear Cart Button */}
  {cartItems?.length > 0 && (
    <button
      onClick={handleClearCart}
      className="p-2 text-kerala-deep-green/60 dark:text-kerala-coconut-white/60 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      title="Clear cart"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )}
    {/* Close Button */}
    <button
      onClick={() => setIsCartOpen(false)}
      className="p-2 text-kerala-deep-green dark:text-kerala-coconut-white hover:text-kerala-green-700 dark:hover:text-kerala-banana-yellow hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm rounded-lg transition-colors"
      title="Close cart"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
  
  {/*  cart content */}
  {cartItems?.length > 0 ? (
    <div className="p-4">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border-b border-kerala-green-100 dark:border-kerala-dark-palm bg-kerala-coconut-white dark:bg-kerala-charcoal">
          <div className="flex items-center space-x-3">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
  
            <div>
              <h3 className="text-sm font-medium text-kerala-deep-green dark:text-kerala-coconut-white">{item.name}</h3>
              <p className="text-sm text-kerala-deep-green/70 dark:text-kerala-coconut-white/70">
                Quantity: {item.quantity} 
              </p>
              <p className="text-sm text-kerala-deep-green/70 dark:text-kerala-coconut-white/70">
                Unit price: {item.price}
              </p>
            </div>
          </div>
          {/* Quantity Controls */}
<div className="flex items-center space-x-2 mt-2">
  <button
    onClick={() => {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ itemId: item.id, quantity: item.quantity - 1 }));
      }
    }}
    className="w-6 h-6 flex items-center justify-center bg-kerala-green-100 dark:bg-kerala-dark-palm text-kerala-deep-green dark:text-kerala-coconut-white rounded-full hover:bg-kerala-green-200 dark:hover:bg-kerala-dark-palm/80 transition-colors"
  >
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  </button>
  
  <span className="text-sm font-medium text-kerala-deep-green dark:text-kerala-coconut-white min-w-[20px] text-center">
    {item.quantity}
  </span>
  
  <button
    onClick={() => {
      dispatch(updateQuantity({ itemId: item.id, quantity: item.quantity + 1 }));
    }}
    className="w-6 h-6 flex items-center justify-center bg-kerala-green-100 dark:bg-kerala-dark-palm text-kerala-deep-green dark:text-kerala-coconut-white rounded-full hover:bg-kerala-green-200 dark:hover:bg-kerala-dark-palm/80 transition-colors"
  >
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </button>
</div>
{/* Remove Item Button */}
<button
  onClick={() => {
    dispatch(removeItem(item.id));
  }}
  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-2"
  title="Remove item"
>
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
</button>
        </div>
      ))}
    </div>
  ) : (
    <div className="p-4">
      <p>Your cart is empty</p>
    </div>
  )}
     <div className="p-4">
     <p className="text-lg font-semibold text-kerala-deep-green dark:text-kerala-coconut-white mb-4">
       Total price: ₹{getTotalPrice()}
     </p>
           <button 
        onClick={handleCheckout}
        disabled={cartItems?.length === 0}
        className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
          cartItems?.length > 0 
            ? 'bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green cursor-pointer' 
            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        Checkout
      </button>
   </div>
      
      </div>

      {/* Checkout Modal */}
      {cartItems?.length > 0 && showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-kerala-coconut-white dark:bg-kerala-charcoal rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-semibold text-kerala-deep-green dark:text-kerala-coconut-white mb-2">
                Order Confirmed!
              </h3>
              
              <p className="text-sm text-kerala-deep-green/70 dark:text-kerala-coconut-white/70 mb-6">
                Your order has been placed successfully. Thank you for choosing Kazhichoo!
              </p>
              <button
                onClick={ContinueShopping}
                className="w-full bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;