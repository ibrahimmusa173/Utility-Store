// src/Pages/Authentication/DataFetch.jsx
import { useEffect, useState, useCallback } from "react"; // 1. Added useCallback
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

function DataFetch() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { api, logout, user } = useAuth();

  // 2. Wrap the fetch function in useCallback to make it a stable dependency
  const fetchProducts = useCallback(() => {
    api.get("/products") 
      .then((response) => setProducts(response.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
  }, [api]); // Re-create only if 'api' instance changes

  // 3. Now it is safe to include fetchProducts in the dependency array
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${productId}`);
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh list after delete
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to delete product.";
        alert(errorMessage);
        if (err.response && err.response.status === 401) {
            logout();
        }
      }
    }
  };

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    // Construct dynamic backend URL (removes /api from the end)
    const backendBase = (import.meta.env?.VITE_API_URL || 'http://localhost:7000/api').replace('/api', '');
    return `${backendBase}/${imageUrl.replace(/\\/g, '/')}`;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold">Product Dashboard</h1>
            {user && <p className="text-gray-600">Welcome, {user.name}!</p>}
        </div>
        <div>
          <Link to="/DataPost" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">
            Add New Product
          </Link>
          <button onClick={logout} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>

      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 border-b">Image</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="text-center hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">
                            <img src={getFullImageUrl(product.imageUrl)} alt={product.name} className="h-16 w-16 object-cover mx-auto rounded"/>
                        </td>
                        <td className="py-2 px-4 border-b">{product.name}</td>
                        <td className="py-2 px-4 border-b">₹{parseFloat(product.price).toFixed(2)}</td>
                        <td className="py-2 px-4 border-b space-x-2">
                          <Link 
                            to={`/edit-product/${product.id}`} 
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                          <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                              Delete
                          </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataFetch;