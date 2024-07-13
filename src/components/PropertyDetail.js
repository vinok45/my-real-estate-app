// src/components/PropertyDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetail({ properties }) {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) return <p>Propriété non trouvée</p>;

  return (
    <div>
      <img src={property.photo} alt={property.title} width="300" />
      <h2>{property.title}</h2>
      <p>Prix: ${property.price}</p>
    </div>
  );
}

export default PropertyDetail;
