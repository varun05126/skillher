/// <reference types="vite/client" />

import { useState, useEffect } from 'react';
import axios from 'axios';

// Set up axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Request interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('/accounts/user/');
          setUser(response.data);
        }
      } catch (err) {
        // If fails, token might be invalid
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/accounts/login/', credentials);
    localStorage.setItem('token', response.data.access);
    // Optionally, also fetch user
    const userResponse = await api.get('/accounts/user/');
    setUser(userResponse.data);
    return response;
  };

  const register = async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    username: string;
  }) => {
    const response = await api.post('/accounts/register/', userData);
    // After registration, we can log in automatically
    await login({
      email: userData.email,
      password: userData.password,
    });
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  const updateProfile = async (profileData: Partial<any>) => {
    const response = await api.put('/accounts/profile/', profileData);
    setUser((prev: any) => ({ ...prev, ...response.data }));
    return response;
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };
};

export default useAuth;