// frontend/src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="main-header">
      {/* Left Section: Logo */}
      <div className="header-left">
        <div className="logo">
          <Link to="/" title="GameHub Home">
            <i className="bi bi-controller"></i> GameHub
          </Link>
        </div>
      </div>

      {/* Center Section: Show search bar only on Home page */}
      {pathname === '/' && (
        <div className="header-center">
          <form onSubmit={submitHandler} className="search-form">
            <input
              type="text"
              placeholder="Search games..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      )}

      {/* Right Section: Navigation links */}
      <div className="header-right">
        <div className="dropdown">
          <Link to="/" className="dropdown-trigger" title="Go to Home">
            <i className="bi bi-house"></i> Home
          </Link>
          <div className="dropdown-menu">
            {/* <Link to="/discover" title="Discover new games">
              <i className="bi bi-compass"></i> Discover
            </Link> */}
            <Link to="/news" title="Latest news">
              <i className="bi bi-newspaper"></i> News
            </Link>
            <Link to="/categories" title="Browse categories">
              <i className="bi bi-tags"></i> Categories
            </Link>
          </div>
        </div>
        <Link to="/library" title="Your Library">
          <i className="bi bi-book"></i> Library
        </Link>
        <Link to="/wishlist" title="Your Wishlist">
          <i className="bi bi-heart"></i> Wishlist
        </Link>
        <Link to="/cart" title="View Cart">
          <i className="bi bi-cart"></i> Cart
        </Link>
        <Link to="/login" className="avatar-icon" title="Login / Sign Up">
          <i className="bi bi-person-circle"></i>
        </Link>
      </div>
    </header>
  );
}

export default Header;
