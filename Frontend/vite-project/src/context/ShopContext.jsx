import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import { authdataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';

export const shopDataContext = createContext()

const ShopContext = ({children}) => {
    const [ products, setProducts ] = useState([]);
    const [ search, setSearch ] = useState("");
    const { userData } = useContext(userDataContext)
    const [ showSearch, setShowSearch ] = useState(false);
   const { serverUrl } = useContext(authdataContext);
   const [ cartItem, setCartItem ] = useState({});
   const currency = "₹";
   const deliveryCharges = 50;


   const getProduct = async () => {
    try{
        const respnse = await axios.get(`${serverUrl}/product/list` , { withCredentials: true });
        console.log(respnse.data);
        setProducts(respnse.data);
    }catch(error){
        console.log("Error fetching products:", error);
    }
   }


   const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem); // Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
    console.log(cartData)

    if (userData) {
      try {
        let result = await axios.post(`${serverUrl}/cart/add`, { itemId, size }, { withCredentials: true });
        console.log(result.data);
        toast.success("Product Added");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.error("Please Login to Add Product to Cart");
    }
   }

   const getCartCount = () => {
    let count = 0;
    for (let item in cartItem) {
      for (let size in cartItem[item]) {
        count += cartItem[item][size];
      }
    }
    return count;
   }


   useEffect(()=>{
    getProduct();
   },[])

    const value ={
        products,currency,deliveryCharges,getProduct,search,
        setSearch,showSearch,setShowSearch , addtoCart , getCartCount
    }

    return (
    <div>
        <shopDataContext.Provider value={value}>
        {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext