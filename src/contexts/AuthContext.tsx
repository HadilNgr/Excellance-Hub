import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'admin') => Promise<boolean>;
  register: (userData: RegisterData, role: 'student' | 'admin') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: 'student' | 'admin'
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login/${role}`, {
        email,
        password,
      });

      const data = response.data;

      const loggedInUser: User = {
        id: data.id,
        firstName: data.first_name || data.full_name?.split(' ')[0] || 'User',
        lastName: data.last_name || data.full_name?.split(' ')[1] || '',
        email: data.email,
        role: role,
      };

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    } catch (error) {
      console.error('❌ Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: RegisterData,
    role: 'student' | 'admin'
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const payload =
        role === 'student'
          ? {
              first_name: userData.firstName,
              last_name: userData.lastName,
              email: userData.email,
              password: userData.password,
            }
          : {
              full_name: userData.fullName,
              email: userData.email,
              password: userData.password,
            };

      const response = await axios.post(
        `http://localhost/eh_api/auth/register_${role}.php`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('📥 Register response:', response);

      if (response.status === 201 && response.data?.status === 'success') {
        return true;
      } else {
        console.warn('⚠️ Unexpected response:', response.data);
        return false;
      }
    } catch (error: any) {
      console.error('❌ Registration failed:', error?.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
