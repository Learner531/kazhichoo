import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is NOT logged in OR is admin
    if (!user.isLoggedIn || user.isAdminLoggedIn) {
      // Redirect to home page
      navigate('/');
    }
  }, [user.isLoggedIn, user.isAdminLoggedIn, navigate]);

  // Wait for Redux state to be fully initialized
  if (user === undefined || user.username === '') {
    return <div className="text-kerala-deep-green dark:text-kerala-muted-gold font-bold">
      Loading...
    </div>;
  }

  // If user is not logged in or is admin, don't render anything
  if (!user.isLoggedIn || user.isAdminLoggedIn) {
    return null;
  }

  // If user is logged in and not admin, render the protected content
  return children;
}

export default ProtectedRoute;
