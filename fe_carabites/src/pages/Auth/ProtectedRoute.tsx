import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>403 - Forbidden</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  // Merender anak-anak rute menggunakan Outlet
  return <Outlet />;
};

export default ProtectedRoute;