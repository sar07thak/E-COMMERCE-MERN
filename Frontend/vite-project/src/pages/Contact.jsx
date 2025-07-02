import React from 'react';
import Title from '../components/Title';
import contact from '../assets/contact.png';
import NewLetterBox from '../components/NewLetterBox';

function Contact() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-16 pt-24 bg-[#f4f2ff] px-4">
      <Title text1="CONTACT" text2="US" />

      {/* Contact Info Section */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Image Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={contact}
            alt="contact"
            className="w-[80%] lg:w-[70%] rounded-md shadow-md"
          />
        </div>

        {/* Text Info Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-[#333]">
          <div>
            <p className="text-[16px] md:text-[18px] font-bold text-black mb-1">
              Our Store
            </p>
            <p className="text-[14px] md:text-[16px]">
              12345 Random Station <br />
              Random City, State, India
            </p>
          </div>

          <div>
            <p className="text-[14px] md:text-[16px]">
              Tel: +91-9876543210 <br />
              Email: admin@onecart.com
            </p>
          </div>

          <div>
            <p className="text-[16px] md:text-[18px] font-bold text-black mt-4">
              Careers at OneCart
            </p>
            <p className="text-[14px] md:text-[16px]">
              Learn more about our teams and job openings
            </p>
            <button className="mt-4 px-6 py-3 bg-white border text-black rounded-md hover:bg-slate-200 transition duration-200">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  );
}

export default Contact;
