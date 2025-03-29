// frontend/src/components/PageSearchBar.js
import React, { useState } from 'react';
import './PageSearchBar.css';

function PageSearchBar({ placeholder, onSearch, formStyle }) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(keyword);
  };

  return (
    <div className="page-search-bar">
      <form onSubmit={handleSearch} className="page-search-form" style={formStyle}>
        <input
          type="text"
          placeholder={placeholder || 'Search...'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" title="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}

export default PageSearchBar;
