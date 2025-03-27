// frontend/src/components/PageSearchBar.js
import React, { useState } from 'react';
import './PageSearchBar.css';

function PageSearchBar({ placeholder, onSearch, onViewChange, hideViewButtons = false, formStyle }) {
  const [keyword, setKeyword] = useState('');
  const [viewMode, setViewMode] = useState('compact');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(keyword);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    if (onViewChange) onViewChange(mode);
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
      {!hideViewButtons && (
        <div className="view-buttons">
          <button
            className={viewMode === 'compact' ? 'active' : ''}
            onClick={() => handleViewChange('compact')}
            title="Compact view"
          >
            <i className="bi bi-grid"></i>
          </button>
          <button
            className={viewMode === 'detailed' ? 'active' : ''}
            onClick={() => handleViewChange('detailed')}
            title="Detailed view"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default PageSearchBar;
