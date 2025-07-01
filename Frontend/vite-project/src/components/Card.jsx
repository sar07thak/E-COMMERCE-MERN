import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Card = ({name , image ,price , id }) => {
    const { currency } = useContext(shopDataContext);
    const navigate =  useNavigate();
  return (
     <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]' onClick={()=>navigate(`/productdetail/${id}`)}>
        <img src={image} alt="" className='w-[100%] h-[80%] rounded-sm object-cover '/>
        <div className='text-gray-700  text-lg font-semibold py-[10px]'>{name.slice(0,30)+"..."}</div>
        <div className='text-zinc-700 text-[14px] '>{currency} {price}</div>
    </div>
    )
}

export default Card