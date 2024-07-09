// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setNotification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setNotification({ message: 'Inscription réussie, veuillez vous connecter', type: 'success' });
        navigate('/login');
      } else {
        setError(data.message || 'Erreur lors de l\'inscription');
        setNotification({ message: data.message || 'Erreur lors de l\'inscription', type: 'error' });
      }
    } catch (error) {
      setError('Erreur lors de l\'inscription');
      setNotification({ message: 'Erreur lors de l\'inscription', type: 'error' });
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
      <button type="submit">Inscription</button>
    </form>
  );
}

export default Register;
