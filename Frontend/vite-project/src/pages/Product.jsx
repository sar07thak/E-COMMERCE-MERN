import React from 'react';
import LatestCollection from '../components/LatestCollection.jsx';
import BestSeller from '../components/BestSeller.jsx';

function Product() {
  return (
    <div className='w-full min-h-screen overflow-x-hidden bg-gradient-to-r from-white to-[#f5f0ff] flex items-center justify-start flex-col py-5'>

      <div className='w-full min-h-[70px] flex items-center justify-center gap-2 flex-col'>
        <LatestCollection />
      </div>

      <div className='w-full min-h-[70px] flex items-center justify-center gap-2 flex-col'>
        <BestSeller />
      </div>

    </div>
  );
}

export default Product;
