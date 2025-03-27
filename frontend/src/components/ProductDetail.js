// frontend/src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();  // Get product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarGames, setSimilarGames] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);
  
  // Comments state for the Comment Section
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("mostRecent"); // default sort

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  // Once product is loaded, fetch similar games.
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

  // Comments functions
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "Anonymous", // Replace with logged-in user if available
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
      prev.map(c =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  // Sort comments (only "mostRecent" implemented here)
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
        {/* Minimum System Requirements Section */}
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
          <button className="buy-now-btn">Buy Now</button>
          <button className="add-to-wishlist-btn">Add to Wishlist</button>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
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
