import React, { useState } from 'react';
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import logo from '../assets/download.png';

function Nav() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="w-full h-[70px] fixed top-0 z-10 bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-4 md:px-12">

      {/* Logo / Brand */}
      <div className='flex items-center gap-2'>
        <img src={logo} alt="logo" className='w-[110px] h-auto object-contain' />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 text-[15px] font-medium text-gray-700">
        <li className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200">Home</li>
        <li className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200">Collections</li>
        <li className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200">About</li>
        <li className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200">Contact</li>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 relative">
        {showSearch ? (
          <IoSearchCircleSharp
            className="text-[28px] text-gray-700 cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoSearchCircleOutline
            className="text-[28px] text-gray-700 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}

        <FaCircleUser
          className="text-[24px] text-gray-700 cursor-pointer"
          onClick={() => setShowProfile(prev => !prev)}
        />

        <div className="w-[30px] h-[30px] bg-[#B5838D] text-white rounded-full flex items-center justify-center font-semibold cursor-pointer">
          U
        </div>

        <div className="relative hidden md:block">
          <MdOutlineShoppingCart className="text-[26px] text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">
            3
          </span>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="w-full h-[70px] bg-[#F9F4EF] absolute top-full left-0 flex items-center justify-center border-t border-gray-200">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[80%] md:w-[50%] h-[40px] px-6 rounded-full border border-gray-300 bg-white placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-[70px] right-[24px] w-[200px] bg-white shadow-lg border border-gray-200 rounded-lg z-20">
          <ul className="flex flex-col py-2 text-sm text-gray-700 font-medium">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Login</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
          </ul>
        </div>
      )}

      {/* Bottom Nav for Mobile */}
      <div className="w-full h-[65px] fixed bottom-0 left-0 bg-white border-t border-gray-200 md:hidden flex items-center justify-around text-gray-700 text-xs z-10">
        <button className="flex flex-col items-center">
          <IoMdHome className="text-[22px]" />
          Home
        </button>
        <button className="flex flex-col items-center">
          <HiOutlineCollection className="text-[22px]" />
          Collections
        </button>
        <button className="flex flex-col items-center">
          <MdContacts className="text-[22px]" />
          Contact
        </button>
        <button className="flex flex-col items-center relative">
          <MdOutlineShoppingCart className="text-[22px]" />
          Cart
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">3</span>
        </button>
      </div>
    </div>
  );
}

export default Nav;
