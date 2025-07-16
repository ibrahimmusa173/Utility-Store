// src/Backend/DataPost.js
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DataPost() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // ... (rest of state is fine)

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    // ... (validation is fine)
    if (!name || !username || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:7000/api/users", { // <-- UPDATED URL
        name,
        username,
        email
      });
      alert("New user added successfully");
      navigate("/DataFetch");
    } catch (error) {
      // ... (error handling is fine)
    }
  };

  // ... (the rest of your JSX is fine, no changes needed there) ...
  return (
      <div className="p-4 max-w-md mx-auto">
        <Link className="font-bold text-xl border border-black bg-yellow-400 px-4 py-2 mb-4 inline-block rounded" to="/DataFetch">View Users</Link>
        <h1 className="text-2xl mb-4">Add New User</h1>
        <form onSubmit={createUser} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full rounded"/>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full rounded"/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded"/>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Add User</button>
        </form>
      </div>
  );
}

export default DataPost;