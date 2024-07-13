// src/components/EditProperty.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProperty({ properties, setProperties, setNotification }) {
  const { id } = useParams();
  const property = properties.find(prop => prop.id === parseInt(id));
  const [title, setTitle] = useState(property ? property.title : '');
  const [price, setPrice] = useState(property ? property.price : '');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!property) {
      fetch(`/properties/${id}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setPrice(data.price);
        })
        .catch(err => setNotification({ message: 'Erreur de chargement des données', type: 'error' }));
    }
  }, [id, property, setNotification]);

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
    const updatedProperty = { title, price: parseInt(price), photo: photoUrl || property.photo };

    try {
      const response = await fetch(`/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProperty)
      });
      const data = await response.json();
      if (response.ok) {
        setProperties(prevProperties => prevProperties.map(prop => (prop.id === parseInt(id) ? data : prop)));
        setNotification({ message: 'Propriété mise à jour avec succès', type: 'success' });
        navigate('/');
      } else {
        setError('Erreur lors de la mise à jour de la propriété');
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour de la propriété');
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
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default EditProperty;
