import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/download.png";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext.jsx";
import { authDatacontext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDatacontext);
  const { getAdmin } = useContext(adminDataContext);

  const logout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/auth/logOut`, {
        withCredentials: true,
      });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="w-full h-[70px] bg-[#E6E4FA] fixed top-0 z-20 flex items-center justify-between px-8 shadow-md shadow-gray-300">
      {/* Brand Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="w-[100px] rounded-xl" />
        <h1 className="text-lg font-semibold text-gray-800">OneCart Admin</h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="text-sm bg-[#D6C1F5] hover:bg-[#c1aef0] text-gray-800 px-5 py-2 rounded-full transition-all duration-300 shadow-sm border border-[#cdbef2]"
      >
        Log Out
      </button>
    </div>
  );
};

export default Nav;
