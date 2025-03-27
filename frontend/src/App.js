// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Discover from './components/Discover';
import News from './components/News';
import NewsDetail from './components/NewsDetail';  // Detailed news view
import Library from './components/Library';
import Wishlist from './components/Wishlist';
import Categories from './components/Categories';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Checkout from './components/Checkout';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} /> {/* News detail view */}
          <Route path="/library" element={<Library />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
