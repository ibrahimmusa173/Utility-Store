// src/Backend/UserUpdate.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserUpdate() {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch the existing user data when the component loads
  useEffect(() => {
    axios.get(`http://localhost:7000/api/users/${id}`) // <-- UPDATED GET-ONE URL
      .then(response => {
        const user = response.data;
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        alert("Could not fetch user data.");
        setLoading(false);
      });
  }, [id]); // Re-run effect if the ID changes

  // 2. Handle the form submission to update the user
  const updateUser = async (e) => {
    e.preventDefault();
    if (!name || !username || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.put(`http://localhost:7000/api/users/${id}`, { // <-- UPDATED PUT URL
        name,
        username,
        email
      });
      alert("User updated successfully");
      navigate("/DataFetch"); // Redirect to the user list
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Link className="font-bold text-xl border border-black bg-yellow-400 px-4 py-2 mb-4 inline-block rounded" to="/DataFetch">
        Back to Users
      </Link>

      <h1 className="text-2xl mb-4">Edit User</h1>

      <form onSubmit={updateUser} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full rounded"/>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Update User
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;