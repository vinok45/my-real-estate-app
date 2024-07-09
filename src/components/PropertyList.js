// src/components/PropertyList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PropertyList({ properties, deleteProperty }) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteProperty = (id) => {
    deleteProperty(id);
    setConfirmDelete(null);
  };

  return (
    <ul>
      {properties.map((property) => (
        <li key={property.id}>
          <img src={property.photo} alt={property.title} width="100" />
          <Link to={`/property/${property.id}`}>
            <span>{property.title} - ${property.price}</span>
          </Link>
          {confirmDelete === property.id ? (
            <>
              <button onClick={() => confirmDeleteProperty(property.id)}>Confirmer</button>
              <button onClick={() => setConfirmDelete(null)}>Annuler</button>
            </>
          ) : (
            <button onClick={() => handleDelete(property.id)}>Supprimer</button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default PropertyList;
