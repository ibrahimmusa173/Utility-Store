import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

function DataFetch() {
  const [users, setUsers] = useState([]);
  const { api, logout, user } = useAuth(); // Get the configured api instance and logout function

  useEffect(() => {
    // Use the 'api' instance which automatically includes the auth token
    api.get("/users") 
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching users:", error)
        if (error.response && error.response.status === 401) {
            logout(); // If token is invalid, log the user out
        }
      });
  }, [api, logout]);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${userId}`); // Use the 'api' instance
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            {user && <p className="text-gray-600">Welcome, {user.name}!</p>}
        </div>
        <div>
          <Link to="/DataPost" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">
            Add New User
          </Link>
          <button onClick={logout} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Logout
          </button>
        </div>
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
              <Link to={`/userUpdate/${user.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Edit
              </Link>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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