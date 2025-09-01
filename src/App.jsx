import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Error from './pages/Error';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All',
    category: 'All'
  });

  return (
    <Router>
      <div className="min-h-screen bg-kerala-coconut-white dark:bg-kerala-charcoal transition-colors flex flex-col">
        <Header 
          setIsCartOpen={setIsCartOpen} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters} 
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} selectedFilters={selectedFilters} />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
        <SideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </Router>
  );
}

export default App;

