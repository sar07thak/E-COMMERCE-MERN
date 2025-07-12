import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authdataContext } from "../context/AuthContext";
import axios from "axios"; // ✅ correct import
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { userDataContext } from "../context/UserContext.jsx";
import back from "../assets/backPhoto.jpg"
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authdataContext);
  const {getCurrentUser} = useContext(userDataContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  // ✅ Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // ✅ Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await axios.post(
        `${serverUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("✅ Login Successful:", response.data);
      getCurrentUser() ;
      navigate('/');
      toast.success("Login sucessfully")   
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      toast.error("Login Error")   
    }
  };

  const loginGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
      let userName = response.user;
      let name = userName.displayName;
      let email = userName.email;

      const result = await axios.post(
        `${serverUrl}/auth/gooleLogin`,
        {
          userName: name, // ✅ matches the schema
          email,
        },
        { withCredentials: true }
      );

      getCurrentUser();
      navigate("/");
      toast.success("Login sucessfully")   
      console.log(result);
    } catch (err) {
      console.log("login Error" + err );
      toast.error("Login Error")   
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#B5838D]">
      <img src={back} alt="" className="h-screen  md:object-fit absolute w-full " />
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-md p-10  rounded-2xl shadow-xl shadow-gray-700 bg-gray-100  absolute "
      >
        <div className="text-center text-gray-700">
          <h2 className="text-2xl font-semibold">Login Page</h2>
          <h1 className="text-lg font-semibold">
            Welcome to Shop, Place your order
          </h1>
        </div>

        {/* Google Login Button */}
        <button
          onClick={loginGoogle}
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Login with Google
          </span>
        </button>

        <div className="flex items-center gap-2 my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
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

        {/* Redirect to Signup */}
        <p className="flex justify-center items-center gap-2 text-gray-800">
          You don't have an account?
          <span
            className="text-blue-900 text-[17px] font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create New Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
