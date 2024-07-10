// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ setSearchQuery, setMinPrice, setMaxPrice, setLocation, setMinSize, setMaxSize, setType }) {
  const [query, setQuery] = useState('');
  const [minPrice, setMinPriceLocal] = useState('');
  const [maxPrice, setMaxPriceLocal] = useState('');
  const [location, setLocationLocal] = useState('');
  const [minSize, setMinSizeLocal] = useState('');
  const [maxSize, setMaxSizeLocal] = useState('');
  const [type, setTypeLocal] = useState('');

  const handleSearch = () => {
    setSearchQuery(query);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setLocation(location);
    setMinSize(minSize);
    setMaxSize(maxSize);
    setType(type);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher par titre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix minimum"
        value={minPrice}
        onChange={(e) => setMinPriceLocal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix maximum"
        value={maxPrice}
        onChange={(e) => setMaxPriceLocal(e.target.value)}
      />
      <input
        type="text"
        placeholder="Localisation"
        value={location}
        onChange={(e) => setLocationLocal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Taille minimum (m²)"
        value={minSize}
        onChange={(e) => setMinSizeLocal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Taille maximum (m²)"
        value={maxSize}
        onChange={(e) => setMaxSizeLocal(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type de propriété"
        value={type}
        onChange={(e) => setTypeLocal(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default SearchBar;
