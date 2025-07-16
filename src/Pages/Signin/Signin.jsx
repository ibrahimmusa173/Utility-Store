// PutData.js - Create User Component (Corrected & Improved)

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🔁 Optional redirection

  const createUser = async (e) => {
    e.preventDefault(); // Prevent default form reload

    // Basic validation
    if (!name || !username || !email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:7000/api/adduser", {
        name,
        username,
        email
      });

      if (response.status === 200 || response.status === 201) {
        alert("New user added successfully");

        // Clear form fields
        setName('');
        setUsername('');
        setEmail('');


        navigate("/getdata"); // ✅ use navigate to redirect
        // Optional: navigate to another route (like list of users)
        // navigate("/getdata");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to add user: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Link 
        className="font-bold text-xl border border-black bg-yellow-400 px-4 py-2 mb-4 inline-block rounded" 
        to="/Products"
      >
        View Users
      </Link>

      <h1 className="text-2xl mb-4">Add New User</h1>

      <form onSubmit={createUser} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}

export default Signin;

