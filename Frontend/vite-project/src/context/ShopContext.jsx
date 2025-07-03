import React, { createContext, useContext, useEffect, useState } from 'react';
import { authdataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { userData } = useContext(userDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authdataContext);
  const [cartItem, setCartItem] = useState({});
  const currency = "₹";
  const deliveryCharges = 50;

  const getProduct = async () => {
    try {
      const response = await axios.get(`${serverUrl}/product/list`, { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(`${serverUrl}/cart/get`, {}, { withCredentials: true });
      if (result.data && typeof result.data === "object") {
        setCartItem(result.data);
      } else {
        setCartItem({});
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(`${serverUrl}/cart/add`, { itemId, size }, { withCredentials: true });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(`${serverUrl}/cart/update`, { itemId, size, quantity }, { withCredentials: true });
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
      const itemInfo = products.find(product => product._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItem[itemId]) {
        const quantity = cartItem[itemId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    let count = 0;
    for (let item in cartItem) {
      for (let size in cartItem[item]) {
        count += cartItem[item][size];
      }
    }
    return count;
  };

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const value = {
    products,
    currency,
    deliveryCharges,
    getProduct,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    cartItem,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;
