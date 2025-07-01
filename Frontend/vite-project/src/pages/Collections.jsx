import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';
import Title from '../components/Title';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";

function Collections() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const applyFilter = () => {
    let productCopy = [...products];
    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let sorted = [...filterProduct];
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProduct(sorted);
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-white to-[#f0f0f0] flex flex-col md:flex-row pt-[70px] overflow-x-hidden text-gray-800'>

      {/* Burger Icon (hidden if sidebar is open) */}
      {!showSidebar && (
        <div className="md:hidden fixed top-[75px] left-4 z-20 bg-white p-2 rounded shadow-md">
          <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setShowSidebar(true)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300
        fixed md:static top-[70px] left-0 z-30 
        w-[80vw] md:w-[280px] 
        min-h-screen bg-white border-r border-gray-300 p-5
        
      `}>
        {/* Cross icon (visible only on mobile) */}
        <div className='flex justify-between items-center mb-4 md:hidden'>
          <p className='text-2xl font-semibold'>FILTERS</p>
          <RxCrossCircled
            onClick={() => setShowSidebar(false)}
            className='text-3xl cursor-pointer text-red-500'
          />
        </div>

        {/* On desktop, heading */}
        <p className='hidden md:block text-2xl font-semibold mb-4'>FILTERS</p>

        {/* Categories */}
        <div className='border-2 border-gray-300 pl-5 py-3 rounded-md bg-gray-100 mb-5'>
          <p className='text-lg font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2'>
            {["Men", "Women", "Kids"].map(cat => (
              <label key={cat} className='flex items-center gap-2 text-base font-light'>
                <input type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Categories */}
        <div className='border-2 border-gray-300 pl-5 py-3 rounded-md bg-gray-100'>
          <p className='text-lg font-medium'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2'>
            {["TopWear", "BottomWear", "WinterWear"].map(sub => (
              <label key={sub} className='flex items-center gap-2 text-base font-light'>
                <input type="checkbox" value={sub} onChange={toggleSubCategory} /> {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 w-full px-4 md:px-10'>
        {/* Header */}
        <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className='bg-white text-gray-800 w-full sm:w-[200px] h-[45px] px-3 rounded-lg border-2 border-gray-400 hover:border-blue-500'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10'>
          {filterProduct.map((item, index) => (
            <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
