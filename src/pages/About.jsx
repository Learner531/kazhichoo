import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-kerala-deep-green dark:text-kerala-muted-gold">About Us</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-kerala-charcoal rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-kerala-muted-gold">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Kazhichoo, your authentic gateway to the rich and diverse flavors.
            Founded with a passion for bringing delicious dishes to your doorstep, we take pride 
            in serving the most authentic and delicious meals.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our journey began with a simple mission: to make delicious dishes accessible to everyone. 
          </p>
        </div>

        <div className="text-kerala-deep-green dark:text-kerala-muted-gold bg-white dark:bg-kerala-charcoal rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-kerala-gold">Our Commitment</h2>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Fresh, locally sourced ingredients</li>
            <li>• Traditional cooking methods</li>
            <li>• Authentic recipes</li>
            <li>• Quality and hygiene standards</li>
            <li>• Fast and reliable delivery</li>
          </ul>
        </div>
        
      </div>

     
      
    </div>
  );
}

export default About;