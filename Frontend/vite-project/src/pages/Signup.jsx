import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authdataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { userDataContext } from "../context/UserContext.jsx";

export const Signup = () => {
  const { serverUrl } = useContext(authdataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  // ✅ Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Custom validation for all fields, including `.com` email check
  function validateForm() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    } else if (!email.endsWith(".com")) {
      newErrors.email = "Email must end with .com";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  // ✅ Main signup handler
  const handleSignUp = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // ❌ Don't submit if errors exist
      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/auth/register`,
        {
          userName: name,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("✅ Signup successful", response.data);
      getCurrentUser(); // ✅ update user context
      navigate("/"); // ✅ redirect
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
    }
  };

  // ✅ Google signup handler
  const GoogleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let userName = response.user;
      let name = userName.displayName;
      let email = userName.email;

      const result = await axios.post(
        `${serverUrl}/auth/gooleLogin`,
        {
          userName: name,
          email,
        },
        { withCredentials: true }
      );

      getCurrentUser();
      navigate("/");

      console.log(result);
    } catch (err) {
      console.log("❌ Google signup error:", err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#B5838D]">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 w-full max-w-md p-6 rounded-2xl shadow-xl shadow-gray-700 bg-white"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>

        {/* ✅ Google Signup */}
        <button
          onClick={GoogleSignUp}
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Sign up with Google
          </span>
        </button>

        <div className="flex items-center gap-2 my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* ✅ Name input */}
        <div>
          <input
            type="text"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 w-full border border-gray-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* ✅ Email input with `.com` check */}
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

        {/* ✅ Password input */}
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

        {/* ✅ Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>

        {/* ✅ Navigation to login */}
        <p className="flex justify-center items-center gap-2 text-gray-800">
          Already have an account?
          <span
            className="text-blue-900 text-[17px] font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
