import React, { useState, useEffect, useContext } from 'react'
import Nav from "../Component/Nav.jsx"
import Sidebar from "../Component/Sidebar.jsx"
import { SiEbox } from "react-icons/si"
import axios from 'axios'
import { authDatacontext } from '../context/AuthContext'

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDatacontext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] text-gray-800">
      <Nav />

      <div className="flex w-full pt-[70px]">
        {/* Sidebar only on large screens */}
        <div className="hidden lg:block w-[18%] fixed top-[70px] left-0 h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:ml-[18%] px-4 sm:px-6 md:px-10 py-10">
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-gray-800">All Orders List</h2>

          <div className="flex flex-col gap-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="flex-shrink-0">
                  <SiEbox className="w-[50px] h-[50px] text-white bg-blue-500 p-3 rounded-md" />
                </div>

                {/* Order Info */}
                <div className="flex flex-col gap-4 flex-1 text-sm">
                  <div className="text-gray-700">
                    {order.items.map((item, i) => (
                      <p key={i}>
                        {item.name.toUpperCase()} × {item.quantity}{' '}
                        <span className="text-gray-500">({item.size})</span>
                        {i < order.items.length - 1 ? ',' : ''}
                      </p>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="text-gray-600 leading-5">
                    <p>{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}</p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-2 min-w-[200px] text-sm text-gray-700">
                  <p><strong>Items:</strong> {order.items.length}</p>
                  <p><strong>Method:</strong> {order.paymentMethod}</p>
                  <p>
                    <strong>Payment:</strong>{' '}
                    <span className={order.payment ? 'text-green-600' : 'text-red-500'}>
                      {order.payment ? 'Done' : 'Pending'}
                    </span>
                  </p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-blue-700 font-bold text-lg">₹ {order.amount}</p>

                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className="mt-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
