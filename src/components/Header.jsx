import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import { toggleDarkMode } from '../store/themeSlice';
import { showLoginModal, hideLoginModal, login, logout } from '../store/UserSlice';

export default function Header({ searchQuery, setSearchQuery, selectedFilters, setSelectedFilters, isCartOpen, setIsCartOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDarkMode } = useSelector((state) => state.theme);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const filterRef = useRef(null);
    const modalRef = useRef(null);
    const dispatch = useDispatch();
        const { isLoggedIn,isAdminLoggedIn, showLoginModal: isLoginModalOpen } = useSelector((state) => state.user);
        const [loginError, setLoginError] = useState('');


    // Close filter dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleDarkMode = () => {
        
       dispatch(toggleDarkMode());
       
    };

    useEffect(() => {
        if(isDarkMode){
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setIsFilterOpen(false);
    };

    const filterOptions = {
        type: ['All', 'Veg', 'Non-veg'],
        category: ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert']
    };

    const toggleCartVisibility = () => { 
        console.log('toggleCartVisibility');
      
        setIsCartOpen(prev => !prev);
      
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(hideLoginModal());
            setLoginError(''); // Clear error when modal closes
        }
    };

    const handleCloseModal = () => {
        dispatch(hideLoginModal());
        setLoginError(''); // Clear error when modal closes
    };

    const handleLogin = () => {
        if (username === "user" && password === "12345678") {
            setLoginError(''); // Clear error
            dispatch(login({username, password}));
        } 
         else {
            setLoginError('Invalid username or password');
        }
    };

    const { totalItems: cartCount } = useSelector((state) => state.cart);

    return (
        <header className={`${isMenuOpen ? 'md:sticky' : 'sticky'} top-0 z-50 bg-kerala-coconut-white dark:bg-kerala-charcoal shadow-sm border-b border-kerala-green-100 dark:border-kerala-dark-palm`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand - Left Side */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <h1 
                                className="text-3xl font-bold text-white cursor-pointer hover:scale-105 transition-all duration-300 px-4 py-2 rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
                                style={{ 
                                    fontFamily: "'Chewy', cursive",
                                    backgroundImage: "url('src/assets/images/logo-cropped.png')",
                                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
                                }}
                            >
                                Kazhichoo
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Center & Right */}
                    <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                        {/* Navigation Links */}
                        

                        {/* Search Bar - Center */}
                        <div className="relative max-w-md w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-kerala-deep-green dark:text-kerala-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for food items..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg focus:ring-2 focus:ring-kerala-deep-green dark:focus:ring-kerala-muted-gold focus:border-kerala-deep-green dark:focus:border-kerala-muted-gold outline-none transition-all bg-white dark:bg-kerala-charcoal dark:text-kerala-coconut-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Action Buttons - Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Filter Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center space-x-2 px-4 py-2 text-kerala-deep-green dark:text-kerala-muted-gold hover:text-kerala-green-700 dark:hover:text-kerala-banana-yellow hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm rounded-lg transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                </svg>
                                <span className="font-medium">Filter</span>
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Filter Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-kerala-charcoal border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg shadow-lg z-10">
                                    <div className="p-4">
                                        {/* Type Filter */}
                                        <div className="mb-4">
                                            <h3 className="text-sm font-semibold text-kerala-deep-green dark:text-kerala-muted-gold mb-2">
                                                Type
                                            </h3>
                                            <div className="space-y-1">
                                                {filterOptions.type.map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleFilterChange('type', type)}
                                                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                                            selectedFilters.type === type
                                                                ? 'bg-kerala-banana-yellow text-kerala-deep-green font-medium'
                                                                : 'text-kerala-deep-green dark:text-kerala-coconut-white hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm'
                                                        }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Category Filter */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-kerala-deep-green dark:text-kerala-muted-gold mb-2">
                                                Category
                                            </h3>
                                            <div className="space-y-1">
                                                {filterOptions.category.map((category) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => handleFilterChange('category', category)}
                                                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                                            selectedFilters.category === category
                                                                ? 'bg-kerala-banana-yellow text-kerala-deep-green font-medium'
                                                                : 'text-kerala-deep-green dark:text-kerala-coconut-white hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm'
                                                        }`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart Button */}
                        <button className="relative flex items-center space-x-2 px-4 py-2 text-kerala-deep-green dark:text-kerala-muted-gold hover:text-kerala-green-700 dark:hover:text-kerala-banana-yellow hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm rounded-lg transition-colors" onClick={() => toggleCartVisibility()}>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                            </svg>
                            <span className="font-medium">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-kerala-banana-yellow text-kerala-deep-green text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* User Icon - Only show when logged in */}
                        {(isLoggedIn || isAdminLoggedIn) && (
                            <Link to="/profile" className="relative flex items-center space-x-2 px-4 py-2 text-kerala-deep-green dark:text-kerala-muted-gold hover:text-kerala-green-700 dark:hover:text-kerala-banana-yellow hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm rounded-lg transition-colors">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-medium">Profile</span>
                            </Link>
                        )}

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={handleToggleDarkMode}
                            className="p-2 rounded-lg text-kerala-deep-green dark:text-kerala-muted-gold hover:text-kerala-green-700 dark:hover:text-kerala-banana-yellow hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                /* Sun Icon */
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                /* Moon Icon */
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Login/Logout Button */}
                        {isLoggedIn||isAdminLoggedIn ? (<button className="bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-6 py-2 rounded-lg font-semibold transition-colors" onClick={() => dispatch(logout())}>
                            Logout
                        </button>
                        ) : (
                            <button className="bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-6 py-2 rounded-lg font-semibold transition-colors" onClick={() => dispatch(showLoginModal())}>
                                Login
                            </button>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-kerala-deep-green dark:text-kerala-muted-gold hover:text-kerala-green-700 dark:hover:text-kerala-banana-yellow hover:bg-kerala-green-50 dark:hover:bg-kerala-dark-palm transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-kerala-green-100 py-4 space-y-4">
                        

                        {/* Mobile Search Bar */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-kerala-deep-green dark:text-kerala-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for food items..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg focus:ring-2 focus:ring-kerala-deep-green dark:focus:ring-kerala-muted-gold focus:border-kerala-deep-green dark:focus:border-kerala-muted-gold outline-none transition-all bg-white dark:bg-kerala-charcoal dark:text-kerala-coconut-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>

                        {/* Mobile Action Buttons */}
                        <div className="flex flex-col space-y-2">
                            {/* Mobile Filters */}
                            <div className="border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg p-4 bg-white dark:bg-kerala-charcoal">
                                <h3 className="text-lg font-semibold text-kerala-deep-green dark:text-kerala-muted-gold mb-3">Filters</h3>
                                
                                {/* Mobile Type Filter */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-kerala-deep-green dark:text-kerala-muted-gold mb-2">Type</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {filterOptions.type.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => handleFilterChange('type', type)}
                                                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                                    selectedFilters.type === type
                                                        ? 'bg-kerala-banana-yellow text-kerala-deep-green font-medium'
                                                        : 'bg-kerala-green-50 dark:bg-kerala-dark-palm text-kerala-deep-green dark:text-kerala-coconut-white hover:bg-kerala-green-100 dark:hover:bg-kerala-dark-palm'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Category Filter */}
                                <div>
                                    <h4 className="text-sm font-medium text-kerala-deep-green dark:text-kerala-muted-gold mb-2">Category</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {filterOptions.category.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => handleFilterChange('category', category)}
                                                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                                    selectedFilters.category === category
                                                        ? 'bg-kerala-banana-yellow text-kerala-deep-green font-medium'
                                                        : 'bg-kerala-green-50 dark:bg-kerala-dark-palm text-kerala-deep-green dark:text-kerala-coconut-white hover:bg-kerala-green-100 dark:hover:bg-kerala-dark-palm'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button className="relative flex items-center justify-center space-x-2 w-full px-4 py-3 text-kerala-deep-green hover:text-kerala-green-700 hover:bg-kerala-green-50 rounded-lg transition-colors" onClick={() => setIsCartOpen(true)}>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                                </svg>
                                <span className="font-medium">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-kerala-banana-yellow text-kerala-deep-green text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile User Profile Link - Only show when logged in */}
                            {(isLoggedIn || isAdminLoggedIn) && (
                                <Link to="/profile" className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-kerala-deep-green hover:text-kerala-green-700 hover:bg-kerala-green-50 rounded-lg transition-colors">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-medium">Profile</span>
                                </Link>
                            )}

                            {/* Mobile Dark Mode Toggle */}
                            <button
                                onClick={handleToggleDarkMode}
                                className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-kerala-deep-green hover:text-kerala-green-700 hover:bg-kerala-green-50 rounded-lg transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                {isDarkMode ? (
                                    <>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span className="font-medium">Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        <span className="font-medium">Dark Mode</span>
                                    </>
                                )}
                            </button>

                           {isLoggedIn||isAdminLoggedIn ?( <button className="w-full bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-6 py-3 rounded-lg font-semibold transition-colors" onClick={() => dispatch(logout())}>
                                Logout
                            </button>
                            ) : (
                                <button className="w-full bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-6 py-3 rounded-lg font-semibold transition-colors" onClick={() => dispatch(showLoginModal())}>
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            {isLoginModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
                <div className="bg-white dark:bg-kerala-charcoal rounded-lg p-6 w-96 relative">
                  <button 
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold"
                  >
                    ×
                  </button>
                <h2 className="text-2xl font-bold text-kerala-deep-green dark:text-kerala-muted-gold mb-4">
        Login
      </h2>
      <input type="text" placeholder="user" className="w-full p-2 border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg mb-4" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="12345678" className="w-full p-2 border border-kerala-green-100 dark:border-kerala-dark-palm rounded-lg mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
      {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
      <button className="w-full bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-6 py-3 rounded-lg font-semibold transition-colors" onClick={handleLogin}>
        Login
      </button>
                </div>
              </div>
            )}
        </header>
    );
}
