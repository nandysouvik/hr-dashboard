import React, { createContext, useState, type ReactNode, useContext } from 'react';

export type UserRole = 'admin' | 'employee' | null;

type AuthContextType = {
    userRole: UserRole;
    login: (role: UserRole) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userRole, setUserRole] = useState<UserRole>(null);

    const login = (role: UserRole) => {
        setUserRole(role);
    };
    const logout = () => {
        setUserRole(null);
    };

    return <AuthContext.Provider value={{ userRole, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};