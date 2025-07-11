import React, { useState, useContext, useEffect } from 'react';
import Nav from '../Component/Nav';
import Sidebar from '../Component/Sidebar';
import { authDatacontext } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const [totalProduct, setTotalProducts] = useState(0);
  const [totalOrder, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDatacontext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/product/list`, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/order/list`, {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <>
      <Nav />
      <Sidebar />
      <div className='w-[70vw] h-[100vh] absolute left-[25%] flex items-start justify-start flex-col gap-[40px] py-[100px] bg-[#f9f9f9]'>
        <h1 className='text-[35px] text-[#333]'>Aure Admin Panel</h1>
        <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          <div className='text-[#333] w-[400px] max-w-[90%] h-[200px] bg-white flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-md md:text-[25px] text-[20px] border-[1px] border-[#ccc]'>
            Total No. of Products:
            <span className='px-[20px] py-[10px] bg-[#e0f7fa] text-[#006064] rounded-lg flex items-center justify-center border-[1px] border-[#b2ebf2]'>
              {totalProduct}
            </span>
          </div>
          <div className='text-[#333] w-[400px] max-w-[90%] h-[200px] bg-white flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-md md:text-[25px] text-[20px] border-[1px] border-[#ccc]'>
            Total No. of Orders:
            <span className='px-[20px] py-[10px] bg-[#fff3e0] text-[#e65100] rounded-lg flex items-center justify-center border-[1px] border-[#ffe0b2]'>
              {totalOrder}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;