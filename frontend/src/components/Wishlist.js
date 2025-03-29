// frontend/src/components/Wishlist.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PageSearchBar from './PageSearchBar';
import './Wishlist.css';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  // Function to fetch wishlist data
  const fetchWishlist = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/api/user/profile', config);
      // Assuming response.data.wishlist is an array of product objects
      setWishlistItems(response.data.wishlist || []);
      // Update localStorage with the product IDs for demo purposes
      const ids = (response.data.wishlist || []).map(item => item._id);
      localStorage.setItem('wishlist', JSON.stringify(ids));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Listen for custom 'wishlistUpdated' events to refresh wishlist
  useEffect(() => {
    const handleWishlistUpdated = () => {
      fetchWishlist();
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdated);
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdated);
    };
  }, [fetchWishlist]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  // Handler for removing from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/user/wishlist/${productId}`, config);
      // Update localStorage by removing the product id
      const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updated = stored.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      // Dispatch event with detail for removed product
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { removed: productId } }));
      fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Handler for adding a product to cart from wishlist page
  const handleAddToCart = async (productId) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('/api/user/cart', { productId }, config);
      alert("Game added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Filter items based on search keyword
  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="wishlist-page">
      <PageSearchBar
        placeholder="Search in Wishlist..."
        onSearch={handleSearch}
      />
      <div className="wishlist-container">
        <h1>Your Wishlist</h1>
        {loading ? (
          <p>Loading wishlist...</p>
        ) : filteredItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-grid">
            {filteredItems.map(item => (
              <div key={item._id} className="wishlist-card">
                <img
                  src={item.image.startsWith('/') ? `http://localhost:5000${item.image}` : item.image}
                  alt={item.name}
                  onError={(e) => {
                    if (e.target.src !== 'http://localhost:5000/images/placeholder.png') {
                      e.target.onerror = null;
                      e.target.src = 'http://localhost:5000/images/placeholder.png';
                    }
                  }}
                />
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <div className="button-group">
                  <Link to={`/product/${item._id}`} className="details-btn">
                    View Details
                  </Link>
                  <button onClick={() => handleRemoveFromWishlist(item._id)} className="remove-btn">
                    Remove from Wishlist
                  </button>
                  <button onClick={() => handleAddToCart(item._id)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
