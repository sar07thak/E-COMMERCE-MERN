import React from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react';
import { authDatacontext } from '../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";


function Lists() {
  const [ list , setList ] = useState([]);

  const { serverUrl } = useContext(authDatacontext);

  const fetchList = async (e) => {
    try{
      let result = await axios.get(`${serverUrl}/product/listproducts`, { withCredentials: true });
      setList(result.data);
      console.log("List fetched successfully:", result.data);
    }catch(err){
      console.log("Error fetching list:", err);
    }
  }

  const removeList = async (id) => {
    try{
      let result = await axios.delete(`${serverUrl}/product/deleteProduct/${id}`, { withCredentials: true });
      
      if(result.data){
        fetchList();
      } else {
        console.log("Failed to remove product");
      }
    }catch(err){
      console.log("Error removing product:", err);
    }
  }



  useEffect(()=>{
    fetchList();
  },[]);

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#EBD9FF] to-[#F7F3FF] text-[#2c2c2c]'>
      <Nav />
      <div className='w-full h-full flex items-start justify-start'>
        <Sidebar />

        <div className='w-[82%] h-full lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] font-semibold text-[#4B0082]'>
            All Listed Products
          </div>
          
          {
            list?.length > 0 ? (
              list.map((item,index)=>(
                <div className='w-[90%] md:h-[120px] h-[90px] bg-[#E0D1FB] rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]' key={index}>
                  <img src={item.image1} className='w-[30%] md:w-[120px] h-[90%] rounded-md' alt="" />
                  <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]'>

                    <div className='w-[100%] md:text-[20px] text-[15px] text-gray-900'>{item.name}</div>
                     <div className='md:text-[17px] text-[15px] text-gray-800'>{item.category}</div>
                  <div className='md:text-[17px] text-[15px] text-gray-800'>₹{item.price}</div>

                  </div>
                  <div className='w-[10%] h-[100%] bg-transparent flex items-center justify-center'>
                    <span className='cursor-pointer' onClick={()=>removeList(item._id)}>
                      <MdDelete />
                    </span>
                  </div>
                </div>
              ))
            )

            : (
              <div className='text-white text-lg'>No products available.</div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Lists
