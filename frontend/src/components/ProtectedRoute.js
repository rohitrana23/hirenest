// src/components/ProtectedRoute.js
// Wraps routes that require authentication or a specific role.
// Usage:
//   <ProtectedRoute>              — requires login
//   <ProtectedRoute role="recruiter"> — requires login + recruiter role

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { userInfo } = useAuth();

  // Not logged in → redirect to login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role → redirect to dashboard
  if (role && userInfo.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
