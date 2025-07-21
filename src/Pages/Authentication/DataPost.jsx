// src/Pages/Authentication/DataPost.jsx - CORRECTED VERSION

import { useState } from "react";
import axios from "axios"; // Use the global axios for the public register endpoint
import { Link, useNavigate } from "react-router-dom";

function DataPost() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // 1. Add state for the password, as it's required for registration
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    // Add password to the validation check
    if (!name || !username || !email || !password) {
      alert("Please fill in all fields, including a password.");
      return;
    }

    try {
      // 2. Change the URL to the correct public registration endpoint
      await axios.post("http://localhost:7000/api/auth/register", {
        name,
        username,
        email,
        password // 3. Include the password in the data sent to the server
      });

      alert("New user added successfully!");
      // Navigate to the dashboard where you can see the user list
      navigate("/DataFetch"); 

    } catch (error) {
      // Provide more specific error feedback
      const errorMessage = error.response?.data?.message || "Failed to add new user. Please try again.";
      console.error("Error creating user:", error);
      alert(errorMessage);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Link 
        className="font-bold text-xl border border-black bg-yellow-400 px-4 py-2 mb-4 inline-block rounded" 
        to="/DataFetch"
      >
        Back to Dashboard
      </Link>
      <h1 className="text-2xl mb-4">Add New User</h1>
      <p className="text-sm text-gray-600 mb-4">
        This form creates a new user in the system, similar to public registration.
      </p>
      <form onSubmit={createUser} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2 w-full rounded"
          required
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="border p-2 w-full rounded"
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-2 w-full rounded"
          required
        />
        {/* 4. Add the input field for the password to the form */}
        <input 
          type="password" 
          placeholder="Set a Password for the new user" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="border p-2 w-full rounded"
          autoComplete="new-password"
          required
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default DataPost;