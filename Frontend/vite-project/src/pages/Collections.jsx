import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';
import Title from '../components/Title';

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCaterory] = useState([]);
  const [subCategory, setSubCaterory] = useState([]);
  const [sortType, SetSortType] = useState("relavent");
  const [ showSidebar, setShowSidebar ] = useState(true);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCaterory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCaterory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCaterory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCaterory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
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
    let fbCopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-white to-[#f0f0f0] flex flex-col md:flex-row pt-[70px] overflow-x-hidden pb-[110px] text-gray-800'>

      {/* Sidebar */}
      <div className={`md:w-[30vw] lg:w-[20vw] w-full md:min-h-screen ${showFilter ? "h-[45vh]" : "h-[8vh]"} p-5 border-r border-gray-300 bg-white fixed md:static z-10`}>
        <p
          className='text-2xl font-semibold flex gap-2 items-center cursor-pointer'
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className='text-lg md:hidden' />}
          {showFilter && <FaChevronDown className='text-lg md:hidden' />}
        </p>

        {/* Categories */}
        <div className={`border-2 border-gray-300 pl-5 py-3 mt-6 rounded-md bg-gray-100 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-lg font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2'>
            <label className='flex items-center gap-2 text-base font-light'>
              <input type="checkbox" value="Men" onChange={toggleCategory} /> Men
            </label>
            <label className='flex items-center gap-2 text-base font-light'>
              <input type="checkbox" value="Women" onChange={toggleCategory} /> Women
            </label>
            <label className='flex items-center gap-2 text-base font-light'>
              <input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        {/* Sub-Categories */}
        <div className={`border-2 border-gray-300 pl-5 py-3 mt-6 rounded-md bg-gray-100 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-lg font-medium'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2'>
            <label className='flex items-center gap-2 text-base font-light'>
              <input type="checkbox" value="TopWear" onChange={toggleSubCategory} /> TopWear
            </label>
            <label className='flex items-center gap-2 text-base font-light'>
              <input type="checkbox" value="BottomWear" onChange={toggleSubCategory} /> BottomWear
            </label>
            <label className='flex items-center gap-2 text-base font-light'>
              <input type="checkbox" value="WinterWear" onChange={toggleSubCategory} /> WinterWear
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full px-4 md:px-10 lg:pl-[20%] border-2 '>
        {/* Header */}
        <div className='border w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className='bg-white text-gray-800 w-[80%] sm:w-[200px] h-[45px] px-3 rounded-lg border-2 border-gray-400 hover:border-blue-500'
            onChange={(e) => SetSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Cards */}
        <div className='w-full border-2 min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10'>
          {
            filterProduct.map((item, index) => (
              <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collections;
