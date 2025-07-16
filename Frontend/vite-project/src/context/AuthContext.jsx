// src/context/authContext.js
import React, { createContext } from 'react';

// 1. Create context
export const authdataContext = createContext();

// 2. Create context provider
const AuthContext = ({ children }) => {
  // Server URL to be shared via context
  const serverUrl = "https://e-commerce-mern-2-fbu5.onrender.com";

  return (
    <authdataContext.Provider value={{ serverUrl }}>
      {children}
    </authdataContext.Provider>
  );
};

export default AuthContext;
