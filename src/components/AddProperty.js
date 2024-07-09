// src/components/AddProperty.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProperty({ setProperties, setNotification }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhotoUpload = async () => {
    if (!photo) return null;
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Remplacez par votre upload preset

    const response = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !price) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const photoUrl = await handlePhotoUpload();

    try {
      const newProperty = { title, price: parseInt(price), photo: photoUrl };
      const response = await fetch('/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty)
      });
      const data = await response.json();
      if (response.ok) {
        setProperties(prevProperties => [...prevProperties, data]);
        setNotification({ message: 'Propriété ajoutée avec succès', type: 'success' });
        navigate('/');
      } else {
        setError('Erreur lors de l\'ajout de la propriété');
      }
    } catch (error) {
      setError('Erreur lors de l\'ajout de la propriété');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddProperty;
