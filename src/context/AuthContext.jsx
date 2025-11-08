// src/context/AuthContext.jsx

import  { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // <-- Import PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Stores user data including user_type
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // API call: http://localhost:7000/api/auth/login
      const response = await api.post('/login', { email, password });
      
      // Assuming the backend returns { token: '...', user: { name, email, user_type } }
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(newToken);
      setUser(userData);
      
      navigate('/dashboard'); // Navigate to the generic dashboard handler
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials) => {
    try {
      setLoading(true);
      // API call: http://localhost:7000/api/auth/register
      const response = await api.post('/register', credentials);
      
      // After successful signup, redirect to login
      navigate('/login');
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Fix for react/prop-types error
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Suppress the react-refresh/only-export-components warning here
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};