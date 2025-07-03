import React, { useContext, useEffect, useState } from 'react';
import Title from "../components/Title.jsx";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

function Cart() {
    const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItem]);

    return (
        <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-[#f5f5f5]'>
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className='w-full h-[92%] flex flex-wrap gap-5'>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    return (
                        <div key={index} className='w-full h-auto border-t border-b border-gray-300 bg-white shadow-sm rounded-xl'>
                            <div className='w-full flex items-start gap-6 py-[10px] px-[20px] relative'>
                                <img className='w-[100px] h-[100px] rounded-md object-cover' src={productData.image1} alt="" />
                                <div className='flex items-start justify-center flex-col gap-[10px]'>
                                    <p className='md:text-[24px] text-[20px] text-[#1a1a1a] font-semibold'>{productData.name}</p>
                                    <div className='flex items-center gap-[20px]'>
                                        <p className='text-[18px] text-[#333]'>{currency} {productData.price}</p>
                                        <p className='w-[40px] h-[40px] text-[16px] text-[#333] bg-[#e0f7f7] rounded-md flex items-center justify-center border border-[#b2ebf2]'>{item.size}</p>
                                    </div>
                                </div>

                                <input
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                    className='md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[#333] text-[16px] font-semibold bg-[#e0f7f7] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border border-[#b2ebf2] rounded-md'
                                    onChange={(e) => (
                                        e.target.value === ' ' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(item._id, item.size, Number(e.target.value))
                                    )}
                                />

                                <RiDeleteBin6Line
                                    className='text-[#333] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1 cursor-pointer hover:text-red-600'
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='flex justify-start items-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <button
                        className='text-[18px] hover:bg-[#dbeafe] cursor-pointer bg-[#e0f2ff] py-[10px] px-[50px] rounded-2xl text-[#1a1a1a] flex items-center justify-center gap-[20px] border border-[#b3d9ff] ml-[30px] mt-[20px]'
                        onClick={() => {
                            if (cartData.length > 0) {
                                navigate("/placeorder");
                            } else {
                                console.log("Your cart is empty!");
                            }
                        }}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
