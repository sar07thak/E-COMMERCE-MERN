import React from 'react';
import logo from "../assets/download.png"; // updated logo import

function Footer() {
  return (
    <div className='w-full bg-[#f6f2ff]'>
      {/* Top section */}
      <div className='w-full py-10 px-4 md:px-12 flex flex-col md:flex-row justify-between items-start gap-8'>

        {/* Logo & Description */}
        <div className='md:w-1/3 w-full flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <img src={logo} alt="OneCart Logo" className='w-24 h-10 object-contain' />
            <p className='text-xl font-bold text-[#1f2937]'>AURE</p>
          </div>
          <p className='text-sm text-[#374151] hidden md:block leading-relaxed'>
            OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
          </p>
          <p className='text-sm text-[#374151] md:hidden'>
            Fast. Easy. Reliable. OneCart Shopping.
          </p>
        </div>

        {/* Company Links */}
        <div className='md:w-1/4 w-full text-center md:text-left'>
          <p className='text-lg font-semibold text-[#1f2937] mb-2'>COMPANY</p>
          <ul className='space-y-1'>
            <li className='text-sm text-[#4b5563] cursor-pointer hover:text-blue-600'>Home</li>
            <li className='text-sm text-[#4b5563] cursor-pointer hover:text-blue-600'>About us</li>
            <li className='text-sm text-[#4b5563] hidden md:block cursor-pointer hover:text-blue-600'>Delivery</li>
            <li className='text-sm text-[#4b5563] cursor-pointer hover:text-blue-600'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='md:w-1/4 w-full text-center md:text-left'>
          <p className='text-lg font-semibold text-[#1f2937] mb-2'>GET IN TOUCH</p>
          <ul className='space-y-1'>
            <li className='text-sm text-[#4b5563]'>+91-9876543210</li>
            <li className='text-sm text-[#4b5563]'>contact@onecart.com</li>
            <li className='text-sm text-[#4b5563] hidden md:block'>+1-123-456-7890</li>
            <li className='text-sm text-[#4b5563] hidden md:block'>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='w-full h-[1px] bg-gray-300'></div>

      {/* Copyright */}
      <div className='text-center py-4 text-sm text-[#6b7280]'>
        © 2025 onecart.com — All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
