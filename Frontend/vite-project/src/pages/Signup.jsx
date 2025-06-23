import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authdataContext } from "../context/AuthContext"; // import context
import axios from "axios"; // default import
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { userDataContext } from "../context/UserContext.jsx";

export const Signup = () => {
  const { serverUrl } = useContext(authdataContext); // ✅ extract serverUrl from context
  const {getCurrentUser} = useContext(userDataContext)
  
  const navigate = useNavigate();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Validate form before submission
  function validateForm() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
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
  }

  // ✅ Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/auth/register`,
        {
          userName: name, // ✅ matches the schema
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      getCurrentUser();
      navigate("/");
    } catch (err) {
      console.error(
        "❌ Registration Error:",
        err.response?.data || err.message
      );
    }
  };

  const GoogleSignUp = async () => {
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

      console.log(result);
    } catch (err) {
      console.log(err);
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

        {/* Google Signup Button (UI only) */}
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

        {/* Name Input */}
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

        {/* Navigation to Login */}
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
