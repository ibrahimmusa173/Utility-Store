// src/Pages/Dashboard/AdminDashboard.jsx

import DashboardLayout from './DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-semibold">Admin Overview</h3>
        <p>Welcome, Admin! Here you can manage all users, clients, vendors, and overall system settings.</p>
        <p className="mt-4 text-gray-500">
          (This component is rendered because your user type is admin.)
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;