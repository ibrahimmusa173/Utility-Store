/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- 1. CONFIGURATION ---
// This uses the Railway URL if deployed, or localhost if running locally.
// The '?' prevents the crash if import.meta.env is undefined.
const BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:7000/api';

// Create a configured axios instance for protected routes (those requiring a token)
export const api = axios.create({
  baseURL: BASE_URL
});

// Interceptor to add the Bearer token to every request automatically
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

    // On initial load, sync user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing stored user", e);
                localStorage.removeItem('user');
            }
        }
    }, [token]);

    // --- 2. AUTHENTICATION ACTIONS ---

    const login = async (email, password) => {
        // We use the full dynamic URL here
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

    // --- 3. PASSWORD RESET ACTIONS ---

    const forgotPassword = async (email) => {
        return await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    };

    const resetPassword = async (resetToken, password) => {
        return await axios.post(`${BASE_URL}/auth/reset-password/${resetToken}`, { password });
    };
    
    // Provide state and actions to the rest of the app
    const value = { 
        user, 
        token, 
        isAuthenticated: !!token, 
        login, 
        logout, 
        register, 
        api, // Shared axios instance
        forgotPassword,
        resetPassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};