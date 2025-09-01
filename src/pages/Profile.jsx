import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user  = useSelector((state) => state.user);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-kerala-deep-green dark:text-kerala-muted-gold">Profile</h1>
      <p className="text-kerala-deep-green dark:text-kerala-muted-gold">Username: {user.userData?.name}</p>
    </div>
  );
}

export default Profile;