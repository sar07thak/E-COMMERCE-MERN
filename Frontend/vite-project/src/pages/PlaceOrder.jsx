import React, { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import razorpay from '../assets/Razorpay.jpg';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-[#f3f6fa] to-[#e5edf5] flex items-center justify-center flex-col md:flex-row gap-12 p-4">
      {/* Left: Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center mt-8 md:mt-0">
        <form className="lg:w-[70%] w-[95%]">
          <div className="py-4">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="flex gap-4 px-2 mb-4">
            <input type="text" placeholder="First name" className="w-1/2 h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
            <input type="text" placeholder="Last name" className="w-1/2 h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
          </div>

          <div className="px-2 mb-4">
            <input type="email" placeholder="Email address" className="w-full h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
          </div>

          <div className="px-2 mb-4">
            <input type="text" placeholder="Street" className="w-full h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
          </div>

          <div className="flex gap-4 px-2 mb-4">
            <input type="text" placeholder="City" className="w-1/2 h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
            <input type="text" placeholder="State" className="w-1/2 h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
          </div>

          <div className="flex gap-4 px-2 mb-4">
            <input type="text" placeholder="Pincode" className="w-1/2 h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
            <input type="text" placeholder="Country" className="w-1/2 h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
          </div>

          <div className="px-2 mb-6">
            <input type="text" placeholder="Phone" className="w-full h-12 rounded-md bg-white border border-gray-300 placeholder:text-gray-500 text-base px-4 shadow-sm" />
          </div>

          <div className="px-2">
            <button type="button" className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300">
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>

      {/* Right: Payment */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center gap-6">
        <CartTotal />
        <div className="py-2">
          <Title text1="PAYMENT" text2="METHOD" />
        </div>
        <div className="flex items-start justify-center gap-10 mt-4">
          <button
            onClick={() => setMethod('razorpay')}
            className={`w-[150px] h-[50px] rounded-md border ${
              method === 'razorpay' ? 'border-blue-500' : 'border-gray-300'
            }`}>
            <img src={razorpay} alt="razorpay" className="w-full h-full object-cover rounded-md" />
          </button>
          <button
            onClick={() => setMethod('cod')}
            className={`w-[200px] h-[50px] text-sm px-5 rounded-md font-bold ${
              method === 'cod'
                ? 'bg-blue-100 border-blue-500 border text-blue-800'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}>
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
