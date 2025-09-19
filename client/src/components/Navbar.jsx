import React from "react";
import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import symbol from "../assets/symbol.png";
import arrow_down from "../assets/arrow-down.svg";
import search from "../assets/search.svg";
import favorite from "../assets/favorite.svg";
import addButton from "../assets/addButton.png";

import {Myadds} from '../pages/Myadds'

export const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSellOpen, setSellOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [isRegister, setRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser).name);
      setUserId(JSON.parse(storedUser).ID)
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleAddProduct = async () => {
    if (!isLoggedIn) {
      setNotification({
        type: "error",
        message: "Please log in to add a product!",
      });
      setSellOpen(false);
      setIsLoginOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", file);
    formData.append("UserId", UserId);

    try {
      const res = await fetch(`${API_URL}/api/addProduct`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Product added successfully!",
        });
        setSellOpen(false);
        setTitle("");
        setCategory("");
        setPrice("");
        setSelectedImage(null);
        setFile(null);
      } else {
        setNotification({
          type: "error",
          message: data.message || "Failed to add product!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ type: "error", message: "Server error" });
    }
  };

  const handleLogin = () => {
    fetch(`${API_URL}/loginUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(
              errorData.message || `Login failed with status: ${res.status}`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response from backend:", data);
        setNotification({ type: "success", message: "Login successful!" });
        setUserData(data.name);
        setIsLoggedIn(true);
       localStorage.setItem("user", JSON.stringify({ name: data.name ,_id:data.userId}));
        setIsLoginOpen(false);
        setLoginData({ email: "", password: "" });
      })
      .catch((err) => {
        console.error("Login error:", err);
        setNotification({
          type: "error",
          message: err.message || "Login failed!",
        });
      });
  };

  const handleRegister = () => {
    fetch(`${API_URL}/registerUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || `Server error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        setNotification({
          type: "success",
          message: data.message || "Registered successfully!",
        });
        setUserData(data.name);
        setUserId(data.userId);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify({ name: data.name ,_id:data.userId}));
        setRegister(false);
        setRegisterData({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        console.error("Request failed:", err);
        setNotification({
          type: "error",
          message: err.message || "Register failed!",
        });
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData("");
    setNotification({ type: "success", message: "Logged out successfully!" });
  };

  const setSell = () => {
    if (!isLoggedIn) {
      setNotification({
        type: "error",
        message: "Please log in to add a product!",
      });
      setIsLoginOpen(true);
      return;
    }
    setSellOpen(!isSellOpen);
  };

  const setLogin = () => setIsLoginOpen(!isLoginOpen);

  return (
    <div className="flex flex-col">
      <div className="w-full bg-gray-100 flex flex-row gap-6 items-center p-2">
        <img src={symbol} alt="" className="w-20 pl-4" />
        <div className="relative ml-4 w-80 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="ml-4 p-2 w-80 bg-white rounded"
          />
          <img
            src={arrow_down}
            alt="arrow"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="ml-5 w-96 relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pr-10 bg-white rounded"
          />
          <button className="absolute right-0 top-0 h-full w-10 bg-black hidden sm:flex items-center justify-center rounded-r cursor-pointer">
            <img src={search} alt="search" className="w-5 h-5" />
          </button>
        </div>
        <div className="cursor-pointer sm:flex items-center gap-12 hidden ">
          <p>ENGLISH</p>
          <img src={arrow_down} alt="" className="w-5 h-5" />
          <img src={favorite} alt="" className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-14 cursor-pointer">
          {isLoggedIn ? (
            <>
            
                <Link to={"/Myadds"}><p className="font-medium text-lg">{userData}/MY ADS</p></Link>
         
              <button
                onClick={handleLogout}
                className="font-medium text-lg text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="font-medium text-lg" onClick={setLogin}>
              Login
            </p>
          )}
          <img src={addButton} alt="" className="w-24" onClick={setSell} />
        </div>
      </div>
      <div className="flex gap-6 bg-gray-200 mt-1 h-12">
        <div className="flex gap-2 ml-20 items-center font-bold">
          <p>All Categories</p>
          <img src={arrow_down} alt="" className="w-5 h-5" />
        </div>
        <div className="hidden sm:flex gap-5 items-center">
          <p>Cars</p>
          <p>Motorcycles</p>
          <p>Mobile Phones</p>
          <p>For Sale: Houses & Apartments</p>
          <p>Scooters</p>
          <p>Commercial & Other Vehicles</p>
          <p>For Rent: Houses & Apartments</p>
        </div>
      </div>
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white 
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={setLogin}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              className="w-full bg-blue-600 text-white p-2 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            <p
              onClick={() => {
                setRegister((prv) => !prv);
                setLogin((prv) => !prv);
              }}
              className="text-blue-500 underline cursor-pointer"
            >
              Register
            </p>
          </div>
        </div>
      )}
      {isRegister && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setRegister(false)}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <input
              type="text"
              placeholder="Enter the name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              placeholder="Enter the email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Enter the password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              onClick={() => {
                handleRegister();
                setRegister(false);
              }}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Register
            </button>
            <p
              onClick={() => {
                setRegister((prv) => !prv);
                setLogin((prv) => !prv);
              }}
              className="text-blue-500 underline cursor-pointer"
            >
              Login
            </p>
          </div>
        </div>
      )}
      {isSellOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-8 rounded w-1/2 max-w-2xl relative bg-white">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
              onClick={() => setSellOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">ADD PRODUCT</h2>
            <input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 mb-4 border rounded text-lg"
            />
            <input
              type="text"
              placeholder="Enter the category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 mb-4 border rounded text-lg"
            />
            <input
              type="number"
              placeholder="Enter the price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 mb-4 border rounded text-lg"
            />
            <div className="w-full p-4 mb-4 border rounded text-lg">
              <input type="file" onChange={handleImageChange} />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-44 object-cover rounded mt-4"
                />
              )}
            </div>
            <button
              onClick={handleAddProduct}
              className="w-full bg-blue-600 text-white p-4 rounded text-lg hover:bg-blue-700"
            >
              ADD
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};
