import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kerala-coconut-white dark:bg-kerala-charcoal">
      <div className="text-center px-4">
        {/* 404 Icon */}
        <div className="text-8xl mb-6">🍽️</div>
        
        {/* Error Message */}
        <h1 className="text-6xl font-bold text-kerala-deep-green dark:text-kerala-muted-gold mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-kerala-deep-green dark:text-kerala-coconut-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          The recipe for this delicious page you are looking for is not found!
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-kerala-banana-yellow hover:bg-kerala-muted-gold text-kerala-deep-green px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Home
          </Link>
          <br />
          
        </div>
      </div>
    </div>
  );
}

export default Error;
