import React, { useContext, useState } from "react";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import logo from "../assets/download.png";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { authdataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Nav() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authdataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/auth/logOut`, {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
      navigate("/login");
      toast.success("User logOut successfully");
    } catch (error) {
      console.log(error.response?.data?.msg);
      toast.error("User can logOut successfully");
    }
  };

  return (
    <div className="fixed z-20 w-full h-[70px] top-0 bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-4 md:px-12 ">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="w-[110px] h-auto object-contain" />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 text-[15px] font-medium text-gray-700">
        <li className="hover:text-[#B5838D] cursor-pointer" onClick={() => navigate("/")}>Home</li>
        <li className="hover:text-[#B5838D] cursor-pointer" onClick={() => navigate("/collections")}>Collections</li>
        <li className="hover:text-[#B5838D] cursor-pointer" onClick={() => navigate("/about")}>About</li>
        <li className="hover:text-[#B5838D] cursor-pointer" onClick={() => navigate("/contact")}>Contact</li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-4 relative">
        {showSearch ? (
          <IoSearchCircleSharp className="text-[35px] text-gray-700 cursor-pointer" onClick={() => setShowSearch(false)} />
        ) : (
          <IoSearchCircleOutline className="text-[35px] text-gray-700 cursor-pointer" onClick={() => { setShowSearch(true); navigate("/collections"); }} />
        )}

        {!userData ? (
          <FaCircleUser className="text-[24px] text-gray-700 cursor-pointer" onClick={() => setShowProfile(prev => !prev)} />
        ) : (
          <div className="w-[30px] h-[30px] bg-[#B5838D] text-white rounded-full flex items-center justify-center font-semibold cursor-pointer" onClick={() => setShowProfile(prev => !prev)}>
            {userData.userName.charAt(0)}
          </div>
        )}

        <div className="relative hidden md:block" onClick={() => navigate("/cart")}>
          <MdOutlineShoppingCart className="text-[26px] text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">
            {getCartCount?.() ?? 0}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full h-[70px] bg-[#F9F4EF] absolute top-full left-0 flex items-center justify-center border-t border-gray-200">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[80%] md:w-[50%] h-[40px] px-6 rounded-full border border-gray-300 bg-white placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-[70px] right-[24px] w-[200px] bg-white shadow-lg border border-gray-200 rounded-lg z-20">
          <ul className="flex flex-col py-2 text-sm text-gray-700 font-medium">
            {!userData && (
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/login"); setShowProfile(false); }}>Login</li>
            )}
            {userData && (
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { handleLogout(); setShowProfile(false); }}>Logout</li>
            )}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/order"); setShowProfile(false); }}>Orders</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="w-full h-[65px] fixed bottom-0 left-0 bg-white border-t border-gray-200 md:hidden flex items-center justify-around text-gray-700 text-xs z-10">
        <button className="flex flex-col items-center" onClick={() => navigate("/")}>
          <IoMdHome className="text-[22px]" />
          Home
        </button>
        <button className="flex flex-col items-center" onClick={() => navigate("/collections")}> 
          <HiOutlineCollection className="text-[22px]" />
          Collections
        </button>
        <button className="flex flex-col items-center" onClick={() => navigate("/contact")}> 
          <MdContacts className="text-[22px]" />
          Contact
        </button>
        <button className="flex flex-col items-center relative" onClick={() => navigate("/cart")}> 
          <MdOutlineShoppingCart className="text-[22px]" />
          Cart
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">
            {getCartCount?.() ?? 0}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Nav;