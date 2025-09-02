import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!user.isAdminLoggedIn) {
      // Redirect to home page
      navigate('/');
    }
  }, [user.isAdminLoggedIn, navigate]);

  // Wait for Redux state to be fully initialized
  if (user === undefined || user.username === '') {
    return <div className="text-kerala-deep-green dark:text-kerala-muted-gold font-bold">
      Loading...
    </div>;
  }


  if (!user.isAdminLoggedIn) {
    return null;
  }

 
  return children;
}

export default AdminRoute;
