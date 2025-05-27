import axios from 'axios';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  signOut: () => void;
  refetchUser: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/current-user`,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        setUser(response.data);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const signOut = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/sign-out`, {
        withCredentials: true,
      });

      setUser(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error while signing out');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signOut, loading, error, refetchUser: fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
