// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';

function SearchBar({ setSearchQuery, setMinPrice, setMaxPrice, setBedrooms, setBathrooms }) {
  const [advanced, setAdvanced] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, setSearchQuery]);

  const handleMinPrice = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleBedrooms = (event) => {
    setBedrooms(event.target.value);
  };

  const handleBathrooms = (event) => {
    setBathrooms(event.target.value);
  };

  const toggleAdvanced = () => {
    setAdvanced(!advanced);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
          <input
            type="number"
            placeholder="Nombre de chambres"
            onChange={handleBedrooms}
          />
          <input
            type="number"
            placeholder="Nombre de salles de bains"
            onChange={handleBathrooms}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
