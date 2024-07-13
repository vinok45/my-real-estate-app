// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ setSearchQuery, setMinPrice, setMaxPrice }) {
  const [advanced, setAdvanced] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMinPrice = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

  const toggleAdvanced = () => {
    setAdvanced(!advanced);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={handleSearch}
      />
      <button onClick={toggleAdvanced}>
        {advanced ? 'Masquer la recherche avancée' : 'Recherche avancée'}
      </button>
      {advanced && (
        <div>
          <input
            type="number"
            placeholder="Prix minimum"
            onChange={handleMinPrice}
          />
          <input
            type="number"
            placeholder="Prix maximum"
            onChange={handleMaxPrice}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
