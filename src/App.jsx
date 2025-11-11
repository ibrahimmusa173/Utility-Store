
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import UtilityStore from './Pages/UtilityStore/UtilityStore';

// Authentication Pages
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';

// Dashboard Routes (Handles redirection based on user type)
import UserDashboard from './Pages/Dashboard/UserDashboard';


function App() {
  // Note: BrowserRouter is now handled in src/index.js
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UtilityStore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Dashboard Route - Redirects based on user type */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route path="*" element={<h1 className="text-3xl p-10">404: Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;