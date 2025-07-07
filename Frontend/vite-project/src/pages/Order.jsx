import React, { useContext, useEffect, useState } from 'react'
import Title from "../components/Title.jsx"
import { shopDataContext } from '../context/ShopContext'
import { authdataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
    let [orderData,setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)
    let {serverUrl} = useContext(authdataContext)

    const loadOrderData = async () => {
       try {
      const result = await axios.post(serverUrl + '/order/userorder',{},{withCredentials:true})
      if(result.data){
        let allOrdersItem = []
        result.data.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
    }

useEffect(()=>{
 loadOrderData()
},[])


  
    return (
  <div className='w-full min-h-screen p-6 pb-40 bg-[#f9f9f9]'>
    <div className='text-center mt-24'>
      <Title text1={'MY'} text2={'ORDER'} />
    </div>

    <div className='w-full flex flex-col gap-6 mt-6'>
      {orderData.map((item, index) => (
        <div key={index} className='w-full bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-6 relative'>
          <img src={item.image1} alt={item.name} className='w-[120px] h-[120px] object-cover rounded-md' />

          <div className='flex flex-col justify-between flex-1 gap-2'>
            <h3 className='text-lg md:text-xl font-semibold text-gray-800'>{item.name}</h3>

            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
              <span>{currency} {item.price}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Size: {item.size}</span>
            </div>

            <div className='text-sm text-gray-500'>
              <p>Date: <span className='font-medium text-gray-700'>{new Date(item.date).toDateString()}</span></p>
              <p>Payment Method: <span className='font-medium text-gray-700'>{item.paymentMethod}</span></p>
            </div>
          </div>

          <div className='flex flex-col md:items-end justify-between gap-2 md:absolute md:right-6 md:top-6'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 bg-green-500 rounded-full'></span>
              <span className='text-sm font-medium text-green-700'>{item.status}</span>
            </div>

            <button
              onClick={loadOrderData}
              className='bg-indigo-500 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-600 active:scale-95 transition-transform'
            >
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

    
}

export default Order
