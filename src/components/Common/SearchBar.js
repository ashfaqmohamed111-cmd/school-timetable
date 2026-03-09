import React, { useState } from 'react';

function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '4px',
      border: '1px solid #ddd',
      padding: '5px 10px',
      width: '300px'
    }}>
      <span style={{ marginRight: '10px', color: '#666' }}>🔍</span>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        style={{
          border: 'none',
          outline: 'none',
          width: '100%',
          padding: '8px 0'
        }}
      />
      {query && (
        <button
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
