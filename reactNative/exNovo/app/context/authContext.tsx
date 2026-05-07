import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const login = (email: string, password: string) => {
    if (email && password.length >= 4) {
      const userName = email.split('@')[0];
      setUser({ email, name: userName });
      setIsSignedIn(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
