import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from "../components/Title.jsx";

function CartTotal() {
  const { currency, deliveryCharges, getCartAmount } = useContext(shopDataContext);

  const cartTotal = getCartAmount();
  const deliveryFee = cartTotal > 1000 ? 0 : deliveryCharges;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div className="w-full lg:ml-[30px]">
      <div className="text-xl py-[10px]">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#d0d7de] bg-white rounded-lg shadow-sm">
        <div className="flex justify-between text-[#1a1a1a] text-[18px] p-[10px]">
          <p>Subtotal</p>
          <p>{currency} {cartTotal}.00</p>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-[#1a1a1a] text-[18px] p-[10px]">
          <p>Shipping Fee {deliveryFee === 0 && <span className="text-green-600">(Free)</span>}</p>
          <p>{currency} {deliveryFee}</p>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-[#1a1a1a] text-[18px] p-[10px] font-semibold">
          <b>Total</b>
          <b>{currency} {cartTotal === 0 ? 0 : finalTotal}</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
