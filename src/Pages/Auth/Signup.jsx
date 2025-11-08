// src/Pages/Auth/Signup.jsx

import  { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    password: '',
    user_type: 'client', // Default type
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.name || !formData.email || !formData.password || !formData.user_type) {
        setError('Please fill in all required fields.');
        return;
    }

    try {
      await signup(formData);
      setMessage('Registration successful! Redirecting to login...');
      // Navigation to /login is handled in AuthContext upon success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
         {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_name">
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_type">
                Account Type
              </label>
              <select
                id="user_type"
                value={formData.user_type}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="client">Client</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;