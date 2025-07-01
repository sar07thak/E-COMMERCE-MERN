import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full bg-[#f6f2ff] py-16 px-4 flex flex-col items-center'>
      {/* Title Section */}
      <div className='text-center mb-12'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-[14px] md:text-[18px] text-[#1f2937] mt-2'>
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className='w-full max-w-[1200px] flex flex-wrap justify-center gap-10'>
        {/* Card 1 */}
        <div className='w-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center gap-3'>
          <RiExchangeFundsLine className='text-[#3b82f6] w-12 h-12' />
          <p className='text-xl font-semibold text-[#1f2937]'>Easy Exchange Policy</p>
          <p className='text-sm text-[#4b5563]'>
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Card 2 */}
        <div className='w-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center gap-3'>
          <TbRosetteDiscountCheckFilled className='text-[#3b82f6] w-12 h-12' />
          <p className='text-xl font-semibold text-[#1f2937]'>7 Days Return Policy</p>
          <p className='text-sm text-[#4b5563]'>
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className='w-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center gap-3'>
          <BiSupport className='text-[#3b82f6] w-12 h-12' />
          <p className='text-xl font-semibold text-[#1f2937]'>Best Customer Support</p>
          <p className='text-sm text-[#4b5563]'>
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
