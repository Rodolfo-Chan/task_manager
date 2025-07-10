// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface PrivateRouteProps {
  children: React.ReactElement;
}


export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useAppSelector(state => state.auth.token);

  if (!token) {
    // No está logueado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Está logueado, renderiza el componente hijo
  return children;
}
