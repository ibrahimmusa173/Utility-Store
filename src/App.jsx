// // src/App.jsx

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './Pages/Authentication/AuthContext'; 
// // import PrivateRoute from './Pages/Authentication/PrivateRoute';

// // --- Your Page Imports ---
// import UtilityStore from './Pages/UtilityStore/UtilityStore';
// // import Team from './Pages/Team/Team';
// // import DataView from './Pages/DataView/DataView';
// // import LoginPage from './Pages/Authentication/LoginPage';
// // import RegisterPage from './Pages/Authentication/RegisterPage';
// // import DataFetch from './Pages/Authentication/DataFetch';
// // import DataPost from './Pages/Authentication/DataPost';
// // import UserUpdate from './Pages/Authentication/UserUpdate';
// // import ForgotPasswordPage from './Pages/Authentication/ForgotPasswordPage';
// // import ResetPasswordPage from './Pages/Authentication/ResetPasswordPage';
// // import ProductUpdate from './Pages/Authentication/ProductUpdate'; // <-- 1. IMPORT THE NEW COMPONENT

// // --- Layout Component Imports ---
// // import Header from './Components/Header/Header';
// // import Footer from './Components/Footer/Footer';

// function App() {
//   return (
//     <Router>
//       {/* <AuthProvider> */}
//         {/* <Header /> */}
//         <div className="main-content" style={{ minHeight: '80vh' }}>
//           <Routes>
//             {/* ... (Your public routes remain the same) ... */}
//             <Route path="/" element={<UtilityStore />} />
//             {/* <Route path="/UtilityStore" element={<UtilityStore />} />
//             <Route path="/Team" element={<Team />} />
//             <Route path="/Products" element={<DataView />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//             <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> */}

//             {/* ================================================= */}
//             {/*               PROTECTED ROUTES                    */}
//             {/* ================================================= */}
//             {/* <Route path="/DataFetch" element={<PrivateRoute><DataFetch /></PrivateRoute>} />
//             <Route path="/DataPost" element={<PrivateRoute><DataPost /></PrivateRoute>} />
//             <Route path="/userUpdate/:id" element={<PrivateRoute><UserUpdate /></PrivateRoute>} /> */}
            
//             {/* --- 2. ADD THIS NEW ROUTE FOR EDITING PRODUCTS --- */}
//             {/* <Route path="/edit-product/:id" element={<PrivateRoute><ProductUpdate /></PrivateRoute>} />
            
//             <Route path="*" element={<h1>404: Page Not Found</h1>} /> */}
//           </Routes>
//         </div>
//         {/* <Footer /> */}
//       {/* </AuthProvider> */}
//     </Router>
//   );
// }

// export default App;




// src/App.jsx

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