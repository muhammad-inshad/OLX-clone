import React, { createContext, useState, useEffect } from "react";
import { Children } from "react";

export const ProductContext = createContext();

export const  ProductProvider =({children})=>{
      const [products, setProducts] = useState([]);
    useEffect(() => {
  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
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