// UpdateUser.js - New Update Component
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

function UpdateUser() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/user/${id}`);
      const user = response.data;
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setFetchLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to fetch user data");
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const updateUser = async () => {
    // Basic validation
    if (!name || !username || !email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:7000/api/user/${id}`, {
        name,
        username,
        email
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        alert("User updated successfully");
        navigate('/Products'); // Navigate back to user list
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user: " + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  if (fetchLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-4">
      <Link 
        className="font-bold text-3xl border border-black bg-yellow-400 p-2 mb-4 inline-block" 
        to="/Products"
      >
        Back to Users
      </Link>

      <h1 className="text-2xl mb-4">Update User</h1>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="space-x-2">
          <button 
            onClick={updateUser}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update User"}
          </button>
          <button 
            onClick={() => navigate('/Products')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;