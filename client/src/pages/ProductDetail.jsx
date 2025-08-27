import React, { useEffect,useState} from 'react'
import {  useParams } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Link } from "react-router-dom";
import { Footer } from '../components/footer';

export const ProductDetail = () => {
    const {id}=useParams()
      const [product, setProduct] = useState(null);
      useEffect(()=>{
        fetch(`http://localhost:5000/api/getproducts/${id}`)
        .then((res)=>res.json())
        .then((data)=>setProduct(data))
        .catch((err)=>console.error("Error fetching products:",err))
      },[])
return (
  <div>
    <Navbar />
             <Link  to={"/"}><p className='font-bold text-2xl'>X</p></Link>
    {product ? (
        
    <div className="flex flex-col items-center p-4 sm:p-6">
  <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl">
    <img
      src={product.imageUrl || "https://via.placeholder.com/300"}
      alt={product.title}
      className="w-full aspect-[4/3] object-contain rounded mb-4 sm:mb-6"
    />
    <h1 className="text-xl sm:text-2xl font-bold mb-2">{product.title}</h1>
    <p className="text-gray-700 mb-2">{product.category}</p>
    <p className="text-blue-600 font-bold text-lg sm:text-xl mb-4">₹{product.price}</p>
    <p className="text-gray-600">{product.description || "No description available."}</p>
  </div>
</div>
    ) : (
      <p className="text-center text-lg mt-10">Loading product...</p>
    )}
      <Footer/>
  </div>

);
}