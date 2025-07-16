import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/api/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">User List</h1>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="border p-2 rounded">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
