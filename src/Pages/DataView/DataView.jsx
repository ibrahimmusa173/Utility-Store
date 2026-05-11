// src/Pages/DataView/DataView.jsx - NEW VERSION

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PropTypes from 'prop-types'; 

const CATEGORIES =["All", "Ghee & Oil", "Rice & Pulses", "Snacks & Spices", "Cold Drinks"];

// Get Dynamic URLs
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api';
// Remove '/api' from the end to get the base URL for images
const BASE_URL = API_URL.replace(/\/api\/?$/, ''); 

function ProductCard({ product }) {
  // Correct the path separators and construct the full image URL dynamically
  const correctedUrl = product.imageUrl.replace(/\\/g, '/');
  const imageUrl = `${BASE_URL}/${correctedUrl}`;

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600">₹{parseFloat(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
}

// Add prop-types validation for the ProductCard component
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
};

function DataView() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const[searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Dynamically fetch from the configured API_URL
    axios.get(`${API_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load product data.");
      });
  },[]);

  // Use useMemo to efficiently filter and group products
  const groupedProducts = useMemo(() => {
    const filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    return filtered.reduce((acc, product) => {
      (acc[product.category] = acc[product.category] || []).push(product);
      return acc;
    }, {});
  },[products, searchTerm, selectedCategory]);

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Our Products</h1>
        <p className="text-lg text-gray-500 mt-2">Find everything you need for your pantry</p>
      </div>

      {/* --- Search and Filter Controls --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md flex-grow"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      
      {/* --- Product Display --- */}
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-xl py-10">
          {products.length > 0 ? "No products match your search." : "Loading products..."}
        </p>
      )}
    </div>
  );
}

export default DataView;