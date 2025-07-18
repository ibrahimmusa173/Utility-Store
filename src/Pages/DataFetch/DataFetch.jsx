import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

// src/Backend/DataFetch.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DataFetch() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/api/users") // <-- UPDATED URL
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:7000/api/users/${userId}`); // <-- UPDATED URL
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  // ... (the rest of your JSX is fine, no changes needed there) ...
  return (
    <div>
      <Header/>

    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User List</h1>
        <Link 
          to="/DataPost"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New User
        </Link>
      </div>

      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="space-x-2">
              <Link 
                to={`/userUpdate/${user.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>  
     <Footer/>
     </div>
  );
}


export default DataFetch;