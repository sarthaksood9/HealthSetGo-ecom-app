import React, { createContext, useState, useContext } from 'react';

type User = {
  name: string;
  email: string;
  password: string;
};


type AuthContextType = {
  user: User | null;
  login: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, email: string, password: string) => {
    setUser({ name, email, password });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
