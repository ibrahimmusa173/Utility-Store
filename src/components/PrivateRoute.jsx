// src/components/PrivateRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types'; // <-- Import PropTypes

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Basic loading state
    return <div className="p-8 text-center text-lg">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Define PropTypes for the component
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;