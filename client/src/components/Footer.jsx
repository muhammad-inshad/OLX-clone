import React from "react";
import bikewale from "../assets/bikewale.svg";
import cartrade_tech from "../assets/cartrade_tech.svg";
import cartrade from "../assets/cartrade.svg";
import carwale from "../assets/carwale.svg";
import mobility from "../assets/mobility.svg";
import olx_2025 from "../assets/olx_2025.svg";
import logoforinsta from '../assets/logoforinsta.png'

export const Footer = () => {
  return (
    <div>
  <div className="flex flex-row  xl:gap-44 sm:gap-1 sm:ml:2 xl:ml-20 bg-gray  mt-5">
  <div className="flex flex-col gap-1 mb-5 text-gray-300 text-sm">
    <h3 className="text-l font-medium text-black">Popular Locations</h3>
    <p>Kolkata</p>
    <p>Mumbai</p>
    <p>Chennai</p>
    <p>Pune</p>
  </div>
  <div className="flex flex-col gap-1 mb-5 text-gray-300 text-sm">
    <h3 className="text-l font-medium text-black">Trending Locations</h3>
    <p>Bhubaneshwar</p>
    <p>Hyderabad</p>
    <p>Chandigarh</p>
    <p>Nashik</p>
  </div>
  <div className="flex flex-col gap-1 mb-5 text-gray-300 text-sm">
    <h3 className="text-l font-medium text-black">About Us</h3>
    <p>Tech@OLX</p>
    <p>Careers</p>
  </div>
  <div className="flex flex-col gap-1 mb-5 text-gray-300 text-sm">
    <h3 className="text-l font-medium text-black">OLX</h3>
    <p>Blog</p>
    <p>Help</p>
    <p>Sitemap</p>
    <p>Legal & Privacy information</p>
    <p>Vulnerability Disclosure Program</p>
  </div>
  <div className="flex flex-col gap-3">
     <h3 className="text-sm font-medium text-black">FOLLOW AS</h3>
     <img src={logoforinsta} alt=""  className="w-44"/>
  </div>
</div>


   <div className="bg-blue-600 w-full">
  <div className="flex flex-row flex-wrap bg-blue-600 w-full gap-4 sm:gap-10 md:gap-20 items-center px-4 sm:px-10 md:px-16 py-4">
    <img src={cartrade_tech} alt="" className="w-20 sm:w-28 md:w-40 h-auto" />

    <div className="hidden sm:block w-px h-20 bg-white mx-2"></div>

    <div className="flex flex-row flex-wrap gap-4 sm:gap-10 md:gap-24 ml-0 sm:ml-10 md:ml-20 items-center">
      <img src={olx_2025} alt="" className="w-16 sm:w-20 md:w-28" />
      <img src={carwale} alt="" className="w-16 sm:w-20 md:w-28" />
      <img src={bikewale} alt="" className="w-16 sm:w-20 md:w-28" />
      <img src={cartrade} alt="" className="w-16 sm:w-20 md:w-28" />
      <img src={mobility} alt="" className="w-16 sm:w-20 md:w-28" />
    </div>
  </div>

  <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-16 py-4 text-white text-xs sm:text-sm">
    <p>Help-Sitemap</p>
    <p>All rights reserved © 2006-2025 OLX</p>
  </div>
</div>

    </div>
  );
};
