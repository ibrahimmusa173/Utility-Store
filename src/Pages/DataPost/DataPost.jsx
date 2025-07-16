// src/Backend/DataPost.js
// import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DataPost() {
  // ...
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    // ... validation is fine
    try {
      await axios.post("http://localhost:7000/api/users", { /* ... */ });
      alert("New user added successfully");
      // FIX: Navigate back to the main user list
      navigate("/users"); 
    } catch (error) { /* ... */ }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* FIX: Point the link to the main user list */}
      <Link className="..." to="/users">View Users</Link>
      <h1 className="text-2xl mb-4">Add New User</h1>
      <form onSubmit={createUser} className="space-y-4">
        {/* Form is fine */}
      </form>
    </div>
  );
}
export default DataPost;