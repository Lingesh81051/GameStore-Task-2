// frontend/src/components/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageSearchBar from './PageSearchBar';
import './Cart.css';

function Cart() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState('compact');

  // Dummy cart items – replace with real data as needed.
  const cartItems = []; // For testing, leave this empty to show "Your cart is empty."

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    console.log("Cart search:", keyword);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    console.log("Cart view mode:", mode);
  };

  return (
    <div className="cart-page">
      <PageSearchBar
        placeholder="Search in Cart..."
        onSearch={handleSearch}
        onViewChange={handleViewChange}
      />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className={`cart-grid ${viewMode}`}>
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    if (e.target.src !== 'http://localhost:5000/images/placeholder.png') {
                      e.target.onerror = null;
                      e.target.src = 'http://localhost:5000/images/placeholder.png';
                    }
                  }}
                />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price} x {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
