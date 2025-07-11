import React, { useContext, useState } from 'react'
import Title from "../components/Title.jsx"
import CartTotal from '../components/CartTotal.jsx'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { authdataContext } from '../context/AuthContext'
// import Loading from '../component/Loading'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, deliveryCharges , products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authdataContext)
  let [loading, setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

    const initPay = (order) => {
        const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
    //   handler: async (response) => {
    //     console.log(response)
    // const {data} = await axios.post(`${serverUrl}/order`,response,{withCredentials:true})
    // if(data){
    //     navigate("/order")
    //     setCartItem({})

    // }
    //   }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
   }


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: (getCartAmount() || 0) + (deliveryCharges || 0)
      }

      console.log("Cart Amount:", getCartAmount());
console.log("Delivery Fee:", deliveryCharges);
console.log("Total Amount:", getCartAmount() + deliveryCharges);

      switch (method) {
        case 'cod':
          const result = await axios.post(`${serverUrl}/order/placeorder`, orderData, { withCredentials: true })
          if (result.data) {
            setCartItem({})
            navigate("/order")
          } else {
            console.error(result.data)
          }
          break ;
        case 'razorpay' : 
          const resultRazorPay = await axios.post(`${serverUrl}/order/razorpay` , orderData , { withCredentials : true})
          if( resultRazorPay.data ){
            console.log(resultRazorPay.data);
                initPay(resultRazorPay.data);
          }
          break;

        default:
          break
      }
    } catch (error) {
      console.error("Order Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#f9f9f9] flex items-center justify-center flex-col md:flex-row gap-12 relative py-12'>
  {/* Left Side Form */}
  <div className='lg:w-1/2 w-full h-full flex items-center justify-center mt-24 lg:mt-0'>
    <form onSubmit={onSubmitHandler} className='lg:w-4/5 w-[95%] bg-white p-6 rounded-2xl shadow-xl'>
      <div className='mb-4'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
      </div>

      {/* Inputs */}
      <div className='flex gap-4 mb-4'>
        <input type="text" placeholder='First name' name='firstName' value={formData.firstName} onChange={onChangeHandler}
          className='w-1/2 h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
        <input type="text" placeholder='Last name' name='lastName' value={formData.lastName} onChange={onChangeHandler}
          className='w-1/2 h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
      </div>

      <div className='mb-4'>
        <input type="email" placeholder='Email address' name='email' value={formData.email} onChange={onChangeHandler}
          className='w-full h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
      </div>

      <div className='mb-4'>
        <input type="text" placeholder='Street' name='street' value={formData.street} onChange={onChangeHandler}
          className='w-full h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
      </div>

      <div className='flex gap-4 mb-4'>
        <input type="text" placeholder='City' name='city' value={formData.city} onChange={onChangeHandler}
          className='w-1/2 h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
        <input type="text" placeholder='State' name='state' value={formData.state} onChange={onChangeHandler}
          className='w-1/2 h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
      </div>

      <div className='flex gap-4 mb-4'>
        <input type="text" placeholder='Pincode' name='pinCode' value={formData.pinCode} onChange={onChangeHandler}
          className='w-1/2 h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
        <input type="text" placeholder='Country' name='country' value={formData.country} onChange={onChangeHandler}
          className='w-1/2 h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
      </div>

      <div className='mb-6'>
        <input type="text" placeholder='Phone' name='phone' value={formData.phone} onChange={onChangeHandler}
          className='w-full h-[50px] rounded-md border border-gray-300 bg-white placeholder:text-gray-500 text-[16px] px-4 shadow-sm' required />
      </div>

      <div className='flex justify-center'>
        <button type='submit'
          className='text-[16px] bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white py-2 px-6 rounded-xl shadow-md'>
          {loading ? "Placing..." : "PLACE ORDER"}
        </button>
      </div>
    </form>
  </div>

  {/* Right Side: Cart + Payment Method */}
  <div className='lg:w-1/2 w-full flex flex-col items-center justify-center px-6 gap-6'>
    <CartTotal />
    <Title text1={'PAYMENT'} text2={'METHOD'} />

    <div className='w-full flex justify-center items-center gap-6'>
      <button
        onClick={() => setMethod('razorpay')}
        className={`w-[150px] h-[50px] rounded-md overflow-hidden shadow-md border-2 ${method === 'razorpay' ? 'border-indigo-700' : 'border-gray-300'}`}>
        <img src={razorpay} className='w-full h-full object-cover' alt="razorpay" />
      </button>
      <button
        onClick={() => setMethod('cod')}
        className={`w-[200px] h-[50px] text-[14px] px-[20px] rounded-md shadow-md font-bold bg-gradient-to-br from-indigo-100 to-white text-indigo-700 border-2 ${method === 'cod' ? 'border-indigo-700' : 'border-gray-300'}`}>
        CASH payON DELIVERY
      </button>
    </div>
  </div>
</div>
  )
}

export default PlaceOrder
