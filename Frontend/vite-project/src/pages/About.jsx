import React from 'react';
import Title from '../components/Title';
import about from '../assets/about.jpg';
import NewLetterBox from '../components/NewLetterBox';

function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-16 pt-24 bg-[#f4f2ff] px-4">
      <Title text1="ABOUT" text2="US" />

      {/* Top Section */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={about}
            alt="about"
            className="w-[80%] lg:w-[65%] rounded-md shadow-md"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-[#333]">
          <p className="text-[15px] md:text-[16px] leading-relaxed">
            AURE was born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, AURE makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className="text-[15px] md:text-[16px] leading-relaxed">
            Modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          <p className="text-[16px] md:text-[18px] font-bold mt-2 text-black">Our Mission</p>
          <p className="text-[15px] md:text-[16px] leading-relaxed">
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. AURE connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-7xl flex flex-col items-center gap-8">
        <Title text1="WHY" text2="CHOOSE US" />
        <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-6">
          {[
            {
              title: "Quality Assurance",
              desc: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.",
            },
            {
              title: "Convenience",
              desc: "Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.",
            },
            {
              title: "Exceptional Customer Service",
              desc: "Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between text-center"
            >
              <h3 className="text-[18px] md:text-[20px] font-semibold text-blue-600 mb-2">
                {item.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-gray-700 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewLetterBox />
    </div>
  );
}

export default About;
