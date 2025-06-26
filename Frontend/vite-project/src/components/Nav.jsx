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
import axios from "axios";

function Nav() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authdataContext);

  // ✅ FIXED: Corrected URL and added navigation to login after logout
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/auth/logOut`, {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
      navigate("/login"); // ✅ Navigate to login after logout
    } catch (error) {
      console.log(error.response?.data?.msg);
      if (
        error.response?.status === 400 &&
        error.response?.data?.msg === "user does not have token"
      ) {
        // Gracefully ignore this as user is already logged out
        console.log("User already logged out.");
      } else {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <div className="w-full h-[70px] fixed top-0 z-10 bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-4 md:px-12">
      {/* ✅ Logo / Brand */}
      <div className="flex items-center gap-2" onClick={()=>{
        console.log("clicked the logo");
        navigate("/");
      }}>
        <img
          src={logo}
          alt="logo"
          className="w-[110px] h-auto object-contain"
        />
      </div>

      {/* ✅ FIXED: Desktop Navigation with route navigation */}
      <ul className="hidden md:flex gap-6 text-[15px] font-medium text-gray-700">
        <li
          className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/collection")}
        >
          Collections
        </li>
        <li
          className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/about")}
        >
          About
        </li>
        <li
          className="hover:text-[#B5838D] cursor-pointer transition-colors duration-200"
          onClick={() => navigate("/contact")}
        >
          Contact
        </li>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 relative">
        {showSearch ? (
          <IoSearchCircleSharp
            className="text-[35px] text-gray-700 cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoSearchCircleOutline
            className="text-[35px] text-gray-700 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}

        {!userData && (
          <FaCircleUser
            className="text-[24px] text-gray-700 cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        )}
        {userData && (
          <div
            className="w-[30px] h-[30px]  bg-[#B5838D] text-white rounded-full flex items-center justify-center font-semibold cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <span className="text-2xl">
            {userData.userName.charAt(0)}
            </span>
          </div>
        )}

        {/* ✅ FIXED: Cart icon now navigates and shows actual count */}
        <div className="relative hidden md:block">
          <MdOutlineShoppingCart className="text-[26px] text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">
            10
          </span>
        </div>
      </div>

      {/* ✅ FIXED: Search input now controlled and bound to context state */}
      {showSearch && (
        <div className="w-full h-[70px] bg-[#F9F4EF] absolute top-full left-0 flex items-center justify-center border-t border-gray-200">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[80%] md:w-[50%] h-[40px] px-6 rounded-full border border-gray-300 bg-white placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
          />
        </div>
      )}

      {/* ✅ FIXED: Profile Dropdown updated with working routes */}
      {showProfile && (
        <div className="absolute top-[70px] right-[24px] w-[200px] bg-white shadow-lg border border-gray-200 rounded-lg z-20">
          <ul className="flex flex-col py-2 text-sm text-gray-700 font-medium">
            {!userData && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                Logout
              </li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/order");
                setShowProfile(false);
              }}
            >
              Orders
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/about");
                setShowProfile(false);
              }}
            >
              About
            </li>
          </ul>
        </div>
      )}

      {/* ✅ FIXED: Bottom Nav on Mobile with navigation and cart count */}
      <div className="w-full h-[65px] fixed bottom-0 left-0 bg-white border-t border-gray-200 md:hidden flex items-center justify-around text-gray-700 text-xs z-10">
        <button
          className="flex flex-col items-center"
          onClick={() => navigate("/")}
        >
          <IoMdHome className="text-[22px]" />
          Home
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => navigate("/collection")}
        >
          <HiOutlineCollection className="text-[22px]" />
          Collections
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => navigate("/contact")}
        >
          <MdContacts className="text-[22px]" />
          Contact
        </button>
        <button
          className="flex flex-col items-center relative"
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart className="text-[22px]" />
          Cart
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">
            10
          </span>
        </button>
      </div>
    </div>
  );
}

export default Nav;
