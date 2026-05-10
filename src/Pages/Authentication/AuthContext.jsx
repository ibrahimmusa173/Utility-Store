/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// SAFE URL CONFIGURATION
// It looks for your Vercel/Railway variable first, then falls back to local.
const getBaseUrl = () => {
  return import.meta.env?.VITE_API_URL || 'http://localhost:7000/api';
};

export const BASE_URL = getBaseUrl();

// This 'api' instance is what you should use for ALL database requests.
// It already knows the correct URL and attaches your login token.
export const api = axios.create({
  baseURL: BASE_URL
});

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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
    }, [token]);

    const login = async (email, password) => {
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

    const forgotPassword = async (email) => {
        return await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    };

    const resetPassword = async (resetToken, password) => {
        return await axios.post(`${BASE_URL}/auth/reset-password/${resetToken}`, { password });
    };
    
    const value = { user, token, isAuthenticated: !!token, login, logout, register, api, forgotPassword, resetPassword };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = { children: PropTypes.node.isRequired };