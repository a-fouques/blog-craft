'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
console.log('API instance:', api);

interface User {
  id: number;
  email: string;
  role: string;
  // autres champs
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get('/user/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) 
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};
