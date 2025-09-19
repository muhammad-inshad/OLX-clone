import React, { createContext, useState, useEffect } from "react";
import { Children } from "react";

export const ProductContext = createContext();

export const  ProductProvider =({children})=>{
      const [products, setProducts] = useState([]);
      const API_URL = import.meta.env.VITE_API_URL;
        
    useEffect(() => {
  const fetchProducts = () => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  };

  fetchProducts();

  const interval = setInterval(fetchProducts, 2000); 

  return () => clearInterval(interval); 
}, []);
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}