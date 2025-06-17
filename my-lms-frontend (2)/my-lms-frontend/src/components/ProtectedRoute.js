import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    }
    // If role is not recognized, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 