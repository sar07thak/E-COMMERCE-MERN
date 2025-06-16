import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import


const Login = () => {
          const navigate = useNavigate(); // ✅ Use hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
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
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", { email, password });
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-10 border-2 border-gray-300 rounded-2xl shadow-lg bg-white"
      >
        <div className="text-center text-gray-700">
          <h2 className="text-2xl font-semibold">Login Page</h2>
          <h1 className="text-lg font-semibold">
            Welcome to Shop, Place your order
          </h1>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          className="flex  items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
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

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
        <p className='flex justify-center items-center gap-[10px] text-gray-800 '>create a account ?
            <span className='text-blue-900 text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/signup")} >Sign-up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
 