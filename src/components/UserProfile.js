// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile({ token, setNotification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch('/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => setUsername(data.username))
        .catch(err => setNotification({ message: 'Erreur de chargement des données du profil', type: 'error' }));
    }
  }, [token, setNotification]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!confirmUpdate) {
      setConfirmUpdate(true);
      return;
    }

    try {
      const response = await fetch('/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setNotification({ message: 'Profil mis à jour avec succès', type: 'success' });
        navigate('/');
      } else {
        setError('Erreur lors de la mise à jour du profil');
        setNotification({ message: 'Erreur lors de la mise à jour du profil', type: 'error' });
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
      setNotification({ message: 'Erreur lors de la mise à jour du profil', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{confirmUpdate ? 'Confirmer' : 'Mettre à jour'}</button>
      {confirmUpdate && <button onClick={() => setConfirmUpdate(false)}>Annuler</button>}
    </form>
  );
}

export default UserProfile;
