import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import { authdataContext } from './AuthContext';
import axios from 'axios';

export const shopDataContext = createContext()

const ShopContext = ({children}) => {
   const [ products, setProducts ] = useState([]);
   const { serverUrl } = useContext(authdataContext);
   const currncy = "₹";
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

   useEffect(()=>{
    getProduct();
   },[])

    const value ={
        products,currncy,deliveryCharges,getProduct
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