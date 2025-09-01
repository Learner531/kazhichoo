import React, { useState } from 'react';
import FoodList from '../components/FoodList';

function Home({ searchQuery, selectedFilters }) {
  return (
    <>
      <FoodList 
        searchQuery={searchQuery}
        selectedFilters={selectedFilters}
      />
    </>
  );
}

export default Home;