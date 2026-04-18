// src/Pages/Dashboard/ClientDashboard.jsx

import DashboardLayout from './DashboardLayout';

const ClientDashboard = () => {
  return (
    <DashboardLayout title="Client Dashboard">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-semibold">Client Overview</h3>
        <p>Welcome, Client! Here you can view your orders, update your profile, and track services.</p>
        <p className="mt-4 text-gray-500">
          (This component is rendered because your user type is client.)
        </p>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;