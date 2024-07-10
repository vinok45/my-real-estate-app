// src/components/AddComment.js
import React, { useState } from 'react';

function AddComment({ propertyId, userId, setNotification, fetchComments }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, rating, propertyId, userId })
      });
      setNotification({ message: 'Commentaire ajouté', type: 'success' });
      setContent('');
      setRating(1);
      fetchComments();
    } catch (error) {
      setNotification({ message: 'Erreur lors de l\'ajout du commentaire', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Écrire un commentaire"
        required
      ></textarea>
      <select value={rating} onChange={(e) => setRating(e.target.value)} required>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <button type="submit">Ajouter un commentaire</button>
    </form>
  );
}

export default AddComment;
