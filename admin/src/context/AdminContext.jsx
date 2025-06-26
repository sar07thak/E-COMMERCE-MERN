import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDatacontext } from './AuthContext';

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
  const [adminData, setAdminData] = useState("");
  const { serverUrl } = useContext(authDatacontext); // ✅ destructured correctly

  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverUrl}/user/getAdmin`, {
        withCredentials: true,
      });

      setAdminData(result.data);
      console.log(result.data);
    } catch (err) {
      setAdminData(null);
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const value = {
    adminData,
    setAdminData,
    getAdmin,
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;
