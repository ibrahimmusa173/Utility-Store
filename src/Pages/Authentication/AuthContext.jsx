import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Get the API URL from Vite Environment Variables, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api';

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// Create a configured axios instance for protected routes using dynamic URL
const api = axios.create({
  baseURL: API_URL
});

// Use an interceptor to automatically add the auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
        navigate('/DataFetch'); // Navigate to user list after login
        return response.data;
    };

    const register = async (userData) => {
        return await axios.post(`${API_URL}/auth/register`, userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const forgotPassword = async (email) => {
        return await axios.post(`${API_URL}/auth/forgot-password`, { email });
    };

    const resetPassword = async (token, password) => {
        return await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
    };
    
    const value = { 
        user, 
        token, 
        isAuthenticated: !!token, 
        login, 
        logout, 
        register, 
        api,
        forgotPassword, 
        resetPassword   
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};