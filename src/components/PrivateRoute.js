// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, token }) {
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
