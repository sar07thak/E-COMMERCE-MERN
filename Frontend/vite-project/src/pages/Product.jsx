// import React from 'react'
// import LastestCollection from '../components/LastestCollection.jsx'
// import BestSeller from '../components/BestSeller.jsx'

// function Product() {
//   return (
//     <div className='w-full flex items-center justify-center gap-[10px] flex-col absolute  bg-red-600 '>
//         <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px]  flex-col '>
//             <LastestCollection/>
//         </div>
//         <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px]  flex-col '>
//             <BestSeller/>
//         </div>
      
//     </div>
//   )
// }

// export default Product

import React from 'react';
import LastestCollection from '../components/LastestCollection.jsx';
import BestSeller from '../components/BestSeller.jsx';

function Product() {
  return (
    <div className='w-full min-h-[100vh] flex items-center justify-center gap-[40px] flex-col bg-red-600 py-16'>
      <div className='w-full flex items-center justify-center flex-col'>
        <LastestCollection />
      </div>
      <div className='w-full flex items-center justify-center flex-col'>
        <BestSeller />
      </div>
    </div>
  );
}

export default Product;
