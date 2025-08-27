import React, { createContext, useState, useEffect } from "react";
import { Children } from "react";

export const ProductContext = createContext();

export const  ProductProvider =({children})=>{
      const [products, setProducts] = useState([]);
        useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  });


  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}