import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentUser = authService.getCurrentUser();
  const location = useLocation();

  if (!currentUser) {
    // Redirect unauthenticated user to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect unauthorized user to their default dashboard based on their role
    if (currentUser.role === 'athlete') return <Navigate to="/athlete/home" replace />;
    if (currentUser.role === 'coach') return <Navigate to="/coach/dashboard" replace />;
    if (currentUser.role === 'admin') return <Navigate to="/official/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};
