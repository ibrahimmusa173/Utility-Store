// src/Pages/DataFetch/DataFetch.js

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DataFetch() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // This API call is correct
    axios.get("http://localhost:7000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = async (userId) => {
    // This API call is correct
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:7000/api/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully!");
      } catch (error) {
        // ... error handling is fine
      }
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User List</h1>
        {/* FIX: Point the "Add" link to the new route */}
        <Link 
          to="/users/add"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New User
        </Link>
      </div>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
            {/* User details are fine */}
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="space-x-2">
              {/* FIX: Point the "Edit" link to the new route */}
              <Link 
                to={`/users/update/${user.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(user.id)} /* ... */>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetch;