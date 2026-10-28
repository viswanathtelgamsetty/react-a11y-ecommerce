import React, { useState } from 'react';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [cartCount, setCartCount] = useState(1);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="store-app-root">
      <Header cartCount={cartCount} />
      <ProductDetail onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}
