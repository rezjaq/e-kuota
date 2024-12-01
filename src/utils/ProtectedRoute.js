import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  // Ambil token dari localStorage
  const tokenString = localStorage.getItem('token');
  let token = null;

  try {
    token = tokenString ? JSON.parse(tokenString) : null;
  } catch (error) {
    console.error('Failed to parse token:', error);
    return <Navigate to="/" />;
  }

  // Validasi token
  if (!token) {
    console.error('Token not found. Redirecting to login.');
    return <Navigate to="/" />;
  }

  // Validasi role
  if (!token.role || token.role !== role) {
    console.error(`Access denied for role: ${token.role}. Required role: ${role}`);
    return <Navigate to="/" />;
  }

  // Jika semua validasi lolos
  return children;
};

export default ProtectedRoute;
