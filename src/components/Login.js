// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({ setToken, setNotification }) {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setToken(userCredential.user.accessToken);
      localStorage.setItem('token', userCredential.user.accessToken);
      setNotification({ message: 'Connexion réussie', type: 'success' });
      navigate('/');
    } catch (error) {
      setError('Email ou mot de passe incorrect');
      setNotification({ message: 'Email ou mot de passe incorrect', type: 'error' });
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
      <button type="submit">Connexion</button>
    </form>
  );
}

export default Login;
