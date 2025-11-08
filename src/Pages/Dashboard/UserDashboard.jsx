// src/Pages/Dashboard/UserDashboard.jsx


import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import VendorDashboard from './VendorDashboard';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }
  
  if (!user) {
    // Should be caught by PrivateRoute, but good fallback
    return <Navigate to="/login" replace />;
  }

  // Route to the appropriate dashboard based on user_type
  switch (user.user_type) {
    case 'admin':
      return <AdminDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'vendor':
      return <VendorDashboard />;
    default:
      // Handle unrecognized role or data error
      return (
        <div className="text-center p-10 bg-red-100 text-red-700">
          Error: Unrecognized user role ({user.user_type}).
        </div>
      );
  }
};

export default UserDashboard;