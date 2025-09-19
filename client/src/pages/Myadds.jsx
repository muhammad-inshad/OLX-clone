import React, { useContext, useState } from 'react';
import { ProductContext } from '../../src/ProductContext';
import {Navbar} from '../components/Navbar'
import {Footer} from '../components/Footer'

export const Myadds = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const Id = storedUser?._id;
  const userData = storedUser?.name;
  const API_URL = import.meta.env.VITE_API_URL;

  const { products } = useContext(ProductContext);

  const [showModal, setShowModal] = useState(false); 
  const [currentProduct, setCurrentProduct] = useState(null); 
  const [formData, setFormData] = useState({ title: "", category: "", price: "" });

  const myProducts = products.filter((p) => String(p.userId) === String(Id));

 
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/Delete/${id}`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
   
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
    });
    setShowModal(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`${API_URL}/Edit/${currentProduct._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!storedUser) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please log in to view your ads.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <Navbar/>

      {myProducts.length === 0 ? (
        <p className="text-gray-600">You haven't added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
                <button
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};
