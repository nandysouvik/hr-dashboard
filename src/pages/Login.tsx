import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role: 'admin' | 'employee') => {
        login(role);
        navigate('/');
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Login</h1>
            <button onClick={() => handleLogin('admin')} style={{ marginRight: 10 }}>
                Login as Admin
            </button>
            <button onClick={() => handleLogin('employee')}>Login as Employee</button>
        </div>
    );
};