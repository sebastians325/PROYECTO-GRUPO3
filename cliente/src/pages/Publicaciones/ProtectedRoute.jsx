import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirige a la página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si el token está presente, verifica el rol
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificando el JWT
    if (decodedToken.role !== role) {
        return <Navigate to="/" />; // Redirigir si el rol no coincide
    }

    // Si el rol coincide, muestra el contenido de la ruta protegida
    return <Outlet />;
};

export default ProtectedRoute;
