// src/Pages/Dashboard/VendorDashboard.jsx

import DashboardLayout from './DashboardLayout';

const VendorDashboard = () => {
  return (
    <DashboardLayout title="Vendor Dashboard">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-semibold">Vendor Overview</h3>
        <p>Welcome, Vendor! Here you can manage your listed products, inventory, and incoming service requests.</p>
        <p className="mt-4 text-gray-500">
          (This component is rendered because your user type is vendor.)
        </p>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;