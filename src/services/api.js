// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming your backend expects a Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;