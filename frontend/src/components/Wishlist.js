// frontend/src/components/Wishlist.js
import React, { useState } from 'react';
import PageSearchBar from './PageSearchBar';
import './Wishlist.css';

function Wishlist() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState('compact');

  // Dummy wishlist items – replace with real data as needed.
  const wishlistItems = []; // For now, it's empty so you'll see the "empty" message.

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    console.log("Wishlist search:", keyword);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    console.log("Wishlist view mode:", mode);
  };

  return (
    <div className="wishlist-page">
      <PageSearchBar
        placeholder="Search in Wishlist..."
        onSearch={handleSearch}
        onViewChange={handleViewChange}
      />
      <div className="wishlist-container">
        <h1>Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className={`wishlist-grid ${viewMode}`}>
            {wishlistItems.map(item => (
              <div key={item._id} className="wishlist-card">
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
                <h3>{item.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
