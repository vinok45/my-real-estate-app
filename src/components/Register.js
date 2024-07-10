// src/components/Register.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register({ setNotification }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setNotification({ message: 'Inscription réussie, veuillez vous connecter', type: 'success' });
      navigate('/login');
    } catch (error) {
      setError('Erreur lors de l\'inscription');
      setNotification({ message: 'Erreur lors de l\'inscription', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

