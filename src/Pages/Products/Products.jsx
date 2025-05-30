// GetData.js - Updated with improved delete function
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const url = "http://localhost:7000/api/user";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    // Add confirmation dialog
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:7000/api/user/${id}`);
        if (response.status === 200) {
          alert("User deleted successfully");
          // Update state to remove deleted user
          setUserData(userData.filter((user) => user.id !== id));
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user: " + (error.response?.data || error.message));
      }
    }
  };

  return (
    <>
      <Link
        className="font-bold text-3xl border border-black bg-yellow-400 p-2 mb-4 inline-block"
        to="/Signin"
      >
        Add New User
      </Link>

      <h1>User Data</h1>

      {loading ? (
        <h1>Data Loading...</h1>
      ) : (
        <div>
          {userData.map((user) => (
            <div key={user.id} className="border p-4 mb-4 rounded">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <div className="mt-2">
                <Link 
                  to={`/updateuser/${user.id}`}
                  className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}