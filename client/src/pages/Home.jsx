import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content */}
      <div className="bg-gray-200 flex-1 w-full px-4 sm:px-6 lg:px-20 py-6">
        <h1 className="text-xl font-medium mb-4">Fresh recommendations</h1>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="bg-white shadow rounded-lg p-4 flex flex-col hover:shadow-lg transition">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
