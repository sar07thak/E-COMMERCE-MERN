import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Card = ({ name, image, price, id }) => {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg flex flex-col p-[10px] cursor-pointer border border-[#80808049]'
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Image wrapper to control zoom overflow */}
      <div className='w-full h-[80%] overflow-hidden rounded-md'>
        <img
          src={image}
          alt=""
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
        />
      </div>

      <div className='text-gray-700 text-lg font-semibold py-[10px]'>
        {name.length > 25 ? name.slice(0, 25) + "..." : name}
      </div>

      <div className='text-zinc-700 text-[14px]'>
        ₹{price}
      </div>
    </div>
  );
};

export default Card;
