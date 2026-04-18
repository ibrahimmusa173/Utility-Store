// src/Pages/Dashboard/DashboardLayout.jsx

import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // <-- Import PropTypes

const DashboardLayout = ({ title, children }) => {
    const { user, logout } = useAuth();
    
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <h1 className="text-xl font-semibold mb-6">BIZTE Dashboard</h1>
                <p className="text-sm mb-4">Role: {user?.user_type.toUpperCase()}</p>
                
                <nav className="flex-grow">
                    <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Dashboard Home
                    </Link>
                    <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 mt-2">
                        Public Store
                    </Link>
                </nav>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center bg-white shadow p-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <div className="text-gray-600">
                        Logged in as: {user?.name}
                    </div>
                </header>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

// Add prop validation
DashboardLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;