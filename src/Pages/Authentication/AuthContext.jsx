/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * 1. DYNAMIC CONFIGURATION
 * This prevents the "Cannot read properties of undefined" crash.
 * It checks for the environment variable; if not found, it uses the local server.
 */
const getBaseUrl = () => {
  try {
    // If VITE_API_URL exists in your .env or Vercel settings, use it.
    // Otherwise, use the local backend port 7000.
    return import.meta.env.VITE_API_URL || 'http://localhost:7000/api';
  } catch (error) {
    // Fallback if import.meta is not yet ready
    return 'http://localhost:7000/api';
  }
};

const BASE_URL = getBaseUrl();

/**
 * 2. SHARED API INSTANCE
 * This 'api' object is exported so you can use it in DataFetch.jsx, 
 * ProductUpdate.jsx, etc., to make authenticated requests.
 */
export const api = axios.create({
  baseURL: BASE_URL
});

// Interceptor: Automatically attaches the JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    // Sync session data from local storage on page refresh
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Session sync failed", e);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, [token]);

    // --- AUTH ACTIONS ---

    const login = async (email, password) => {
        // Uses BASE_URL so it works on Railway automatically
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        
        const { token: receivedToken, user: receivedUser } = response.data;
        
        localStorage.setItem('token', receivedToken);
        localStorage.setItem('user', JSON.stringify(receivedUser));
        
        setToken(receivedToken);
        setUser(receivedUser);
        
        navigate('/DataFetch'); 
        return response.data;
    };

    const register = async (userData) => {
        return await axios.post(`${BASE_URL}/auth/register`, userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    // --- PASSWORD ACTIONS ---

    const forgotPassword = async (email) => {
        return await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    };

    const resetPassword = async (resetToken, password) => {
        return await axios.post(`${BASE_URL}/auth/reset-password/${resetToken}`, { password });
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