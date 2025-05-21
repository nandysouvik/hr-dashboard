import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = {
    children: React.ReactElement;
    allowedRoles: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
    const { userRole } = useAuth();

    if (!userRole) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(userRole)) {
        // Unauthorized role
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};