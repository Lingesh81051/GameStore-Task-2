// frontend/src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // Get product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarGames, setSimilarGames] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [notification, setNotification] = useState(""); // Popup message state

  // (Comments state omitted for brevity)
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("mostRecent");

  // Helper: check if user is logged in
  const isLoggedIn = () => Boolean(localStorage.getItem('token'));

  // Helper: get auth config for protected API calls
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        // Only use stored wishlist if user is logged in.
        if (isLoggedIn()) {
          const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          setIsWishlisted(wishlist.includes(response.data._id));
        } else {
          setIsWishlisted(false);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  // Fetch similar games
  useEffect(() => {
    async function fetchSimilar() {
      if (!product) return;
      try {
        const res = await axios.get('/api/products');
        const similar = res.data.filter(p =>
          p._id !== product._id &&
          Array.isArray(p.categories) &&
          product.categories &&
          product.categories.some(cat => p.categories.includes(cat))
        );
        setSimilarGames(similar.slice(0, 4));
      } catch (error) {
        console.error("Error fetching similar games:", error);
      } finally {
        setSimilarLoading(false);
      }
    }
    fetchSimilar();
  }, [product]);

  // Fetch cart items to set the initial cart state.
  // Assuming your backend returns cart items with a nested product field.
  useEffect(() => {
    async function fetchCart() {
      if (isLoggedIn() && product) {
        try {
          const res = await axios.get('/api/user/cart', getAuthConfig());
          // Check if the product is in the cart.
          // Adjust the check based on your backend structure.
          // Here we assume each cart item has a "product" field with the product data.
          const inCart = res.data.some(item => item.product && item.product._id === product._id);
          setIsInCart(inCart);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      } else {
        setIsInCart(false);
      }
    }
    fetchCart();
  }, [product]);

  // Listen for wishlist updates from other pages
  useEffect(() => {
    const handleWishlistUpdated = (event) => {
      if (event.detail && isLoggedIn()) {
        if (event.detail.removed && product && product._id === event.detail.removed) {
          setIsWishlisted(false);
        }
        if (event.detail.added && product && product._id === event.detail.added) {
          setIsWishlisted(true);
        }
      } else {
        setIsWishlisted(false);
      }
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdated);
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdated);
    };
  }, [product]);

  // Handler for toggling cart status
  const handleToggleCart = async () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    if (!isInCart) {
      // Add to cart
      try {
        await axios.post('/api/user/cart', { productId: product._id }, getAuthConfig());
        setIsInCart(true);
        setNotification("Game added to cart");
        setTimeout(() => setNotification(""), 2000);
        // Optionally, dispatch an event to update the cart page.
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { added: product._id } }));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // Remove from cart
      try {
        await axios.delete(`/api/user/cart/${product._id}`, getAuthConfig());
        setIsInCart(false);
        setNotification("Game removed from cart");
        setTimeout(() => setNotification(""), 2000);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { removed: product._id } }));
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  // Handler for Add to Wishlist
  const handleAddToWishlist = async () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    try {
      await axios.post('/api/user/wishlist', { productId: product._id }, getAuthConfig());
      setIsWishlisted(true);
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.includes(product._id)) {
        wishlist.push(product._id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      setNotification("Game added to wishlist");
      setTimeout(() => setNotification(""), 2000);
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { added: product._id } }));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Handler for Remove from Wishlist
  const handleRemoveFromWishlist = async () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    try {
      await axios.delete(`/api/user/wishlist/${product._id}`, getAuthConfig());
      setIsWishlisted(false);
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updated = wishlist.filter(id => id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setNotification("Game removed from wishlist");
      setTimeout(() => setNotification(""), 2000);
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { removed: product._id } }));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // (Comments functions omitted for brevity)
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "Anonymous",
      text: newComment,
      likes: 0,
      timestamp: new Date()
    };
    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  const handleLikeComment = (commentId) => {
    setComments(prev =>
      prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c)
    );
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === "mostRecent") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return 0;
  });

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const releaseDate = product.releaseDate
    ? new Date(product.releaseDate).toLocaleDateString()
    : "TBA";

  return (
    <div className="product-detail">
      <div className="back-button">
        <button onClick={() => navigate(-1)}>&larr; Back</button>
      </div>
      <div className="hero-section">
        <img
          src={product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image}
          alt={product.name}
          className="hero-image"
          onError={(e) => {
            if (e.target.src !== 'http://localhost:5000/images/placeholder.png') {
              e.target.onerror = null;
              e.target.src = 'http://localhost:5000/images/placeholder.png';
            }
          }}
        />
      </div>
      <div className="info-section">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <div className="detail-item">
            <strong>Genre:</strong> {product.categories ? product.categories.join(', ') : "N/A"}
          </div>
          <div className="detail-item">
            <strong>Price:</strong> ${product.price}
          </div>
          <div className="detail-item">
            <strong>Developer:</strong> {product.developer || "Unknown"}
          </div>
          <div className="detail-item">
            <strong>Release Date:</strong> {releaseDate}
          </div>
          <div className="detail-item">
            <strong>Platform:</strong> {product.platform || "Multiple"}
          </div>
          <div className="detail-item">
            <strong>Ratings:</strong> {product.ratings ? `${product.ratings} / 5` : "No ratings yet"}
          </div>
        </div>
        {product.minRequirements && (
          <div className="min-requirements">
            <h2>Minimum System Requirements</h2>
            <p><strong>OS:</strong> {product.minRequirements.os}</p>
            <p><strong>Processor:</strong> {product.minRequirements.processor}</p>
            <p><strong>RAM:</strong> {product.minRequirements.ram}</p>
            <p><strong>Hard Drive:</strong> {product.minRequirements.hardDrive}</p>
            <p><strong>Video Card:</strong> {product.minRequirements.videoCard}</p>
            <p><strong>Sound Card:</strong> {product.minRequirements.soundCard}</p>
            <p><strong>DirectX:</strong> {product.minRequirements.directX}</p>
            <p><strong>Keyboard and Mouse:</strong> {product.minRequirements.peripherals}</p>
          </div>
        )}
        <div className="cta-buttons">
          {isWishlisted ? (
            <button className="remove-from-wishlist-btn" onClick={handleRemoveFromWishlist}>
              Remove from Wishlist
            </button>
          ) : (
            <button className="add-to-wishlist-btn" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          )}
          <button className="add-to-cart-btn" onClick={handleToggleCart}>
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
        {notification && (
          <div className="notification-popup">
            {notification}
          </div>
        )}
      </div>
      <div className="trailer-section">
        <h2 className="section-title left-align">Game Trailer</h2>
        {product.trailer ? (
          <div className="trailer-container">
            <iframe
              src={product.trailer}
              title="Game Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No trailer available.</p>
        )}
      </div>
      <div className="recommendations-section">
        <h2 className="section-title left-align">Similar Games</h2>
        {similarLoading ? (
          <p>Loading similar games...</p>
        ) : similarGames.length === 0 ? (
          <p>No similar games found.</p>
        ) : (
          <div className="recommendations-container">
            {similarGames.map(similar => {
              const simImage = similar.image.startsWith('/')
                ? `http://localhost:5000${similar.image}`
                : similar.image;
              return (
                <div className="recommendation-card" key={similar._id}>
                  <img
                    src={simImage}
                    alt={similar.name}
                    onError={(e) => {
                      if (e.target.src !== 'http://localhost:5000/images/placeholder.png') {
                        e.target.onerror = null;
                        e.target.src = 'http://localhost:5000/images/placeholder.png';
                      }
                    }}
                  />
                  <h3>{similar.name}</h3>
                  <p className="price">${similar.price}</p>
                  <Link to={`/product/${similar._id}`} className="details-btn">
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
          <div className="sort-options">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="mostRecent">Most Recent</option>
            </select>
          </div>
        </div>
        <div className="new-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
          ></textarea>
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
        <div className="comments-list">
          {sortedComments.map(comment => (
            <div className="comment-card" key={comment.id}>
              <div className="comment-header">
                <span className="comment-user">{comment.user}</span>
                <span className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-actions">
                <button onClick={() => handleLikeComment(comment.id)}>
                  Like ({comment.likes})
                </button>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
