// src/components/PropertyDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import AddComment from './AddComment';

function PropertyDetail({ properties, userId, setNotification }) {
  const { id } = useParams();
  const property = properties.find(property => property.id === parseInt(id));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch(`/comments/${id}`);
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    } else {
      setNotification({ message: 'Erreur lors de la récupération des commentaires', type: 'error' });
    }
  };

  if (!property) return <div>Propriété non trouvée</div>;

  return (
    <div>
      <h2>{property.title}</h2>
      <p>Prix: ${property.price}</p>
      <p>Localisation: {property.location}</p>
      <p>Taille: {property.size} m²</p>
      <p>Type: {property.type}</p>
      <CommentList comments={comments} />
      <AddComment propertyId={property.id} userId={userId} setNotification={setNotification} fetchComments={fetchComments} />
    </div>
  );
}

export default PropertyDetail;
