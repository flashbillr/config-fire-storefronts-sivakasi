'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, apiClient } from '@/lib/api/client';

interface AuthState {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    customer: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const { customer } = await apiClient.getProfile();
          setAuthState({
            customer,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('authToken');
          apiClient.clearToken();
          setAuthState({
            customer: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          customer: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token, customer } = await apiClient.login({ email, password });
      setAuthState({
        customer,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    try {
      await apiClient.register(data);
      // After successful registration, automatically log in
      await login(data.email, data.password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiClient.logout();
    setAuthState({
      customer: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = async (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    try {
      const { customer } = await apiClient.updateProfile(data);
      setAuthState((prev) => ({
        ...prev,
        customer,
      }));
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
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