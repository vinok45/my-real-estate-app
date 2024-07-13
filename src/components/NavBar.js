// src/components/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        {token ? (
          <>
            <li><Link to="/add-property">Ajouter une propriété</Link></li>
            <li><button onClick={handleLogout}>Déconnexion</button></li>
          </>
        ) : (
          <li><Link to="/login">Connexion</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
