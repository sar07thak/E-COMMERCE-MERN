import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDatacontext } from "../context/AuthContext.jsx";
import axios from "axios"
import { adminDataContext } from "../context/AdminContext.jsx";


const Login = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDatacontext);
  const { adminData , getAdmin } = useContext(adminDataContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Handle login
  const AdminLogin = async (e) => {
    e.preventDefault();
       try {
      const response = await axios.post(
        `${serverUrl}/auth/adminLogin`,
        { email, password },
        { withCredentials: true }
      );
      console.log("✅ Login Successful:", response.data);
      getAdmin();
      navigate("/");
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
    }
  };


  return (
    <div className="h-screen flex justify-center items-center bg-[#B5838D]">
      <form
        onSubmit={AdminLogin}
        className="flex flex-col gap-4 w-full max-w-md p-10  rounded-2xl shadow-xl shadow-gray-700 bg-white"
      >
        <div className="text-center text-gray-700">
          <h2 className="text-2xl font-semibold">Login Page</h2>
          <h1 className="text-lg font-semibold">
            Welcome to Shop, Place your order
          </h1>
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-full border border-gray-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 w-full border border-gray-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
