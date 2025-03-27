// frontend/src/components/Library.js
import React, { useState } from 'react';
import PageSearchBar from './PageSearchBar';
import './Library.css';

function Library() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState('compact');

  // Dummy library items – replace with real data if available.
  const libraryItems = [];

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    console.log("Library search:", keyword);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    console.log("Library view mode:", mode);
  };

  return (
    <div className="library-page">
      <PageSearchBar
        placeholder="Search in Library..."
        onSearch={handleSearch}
        onViewChange={handleViewChange}
      />
      <div className="library-container">
        <h1>Your Library</h1>
        {libraryItems.length === 0 ? (
          <p>Your library is empty.</p>
        ) : (
          <div className={`library-grid ${viewMode}`}>
            {libraryItems.map(item => (
              <div key={item._id} className="library-card">
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

export default Library;
