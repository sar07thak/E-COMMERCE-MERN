import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDatacontext } from '../context/AuthContext'
import axios from 'axios'

function Add() {

  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const { serverUrl } = useContext(authDatacontext)

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))
      formData.append("image1",image1)
      formData.append("image2",image2)
      formData.append("image3",image3)
      formData.append("image4",image4)


      let result = await axios.post(serverUrl + "/product/addproduct" , formData, {withCredentials:true});
      console.log(result.data);

      if( result.data){
            setName("")
      setDescription("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice("")
      setBestSeller(false)
      setCategory("Men")
      setSubCategory("TopWear")
      }
    } catch (err) {
      console.log("Error in adding product:", err);
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-[#F3F0FF] text-[#1a1a1a] overflow-x-hidden relative'>
      <Nav />
      <Sidebar />

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]'>
        <form className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[90px] px-[30px] md:px-[60px]' 
         onSubmit={handleAddProduct}>
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-[#1a1a1a] font-bold'>Add Product Page</div>

          {/* Image Upload */}
          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Upload Images</p>
            <div className='w-[100%] h-[100%] flex items-center justify-start gap-[10px]'>
              <label htmlFor="image1" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer'>
                <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-xl border-[1.5px] hover:border-purple-400 transition ' />
                <input type="file" id='image1' hidden onChange={(e) => setImage1(e.target.files[0])} required />
              </label>
              <label htmlFor="image2" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-xl border-[1.5px] hover:border-purple-400 ' />
                <input type="file" id='image2' hidden onChange={(e) => setImage2(e.target.files[0])} required />

              </label>
              <label htmlFor="image3" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-xl border-[1.5px] hover:border-purple-400' />
                <input type="file" id='image3' hidden onChange={(e) => setImage3(e.target.files[0])} required />

              </label>
              <label htmlFor="image4" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-xl border-[1.5px] hover:border-purple-400' />
                <input type="file" id='image4' hidden onChange={(e) => setImage4(e.target.files[0])} required />

              </label>
            </div>
          </div>

          {/* Product Name */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
            <input
              type='text'
              placeholder='Type here'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg border-[2px] border-gray-300 px-[20px] text-[18px] bg-white placeholder:text-gray-500 focus:outline-purple-400'
              onChange={(e) => setName(e.target.value)} value={name} required
            />
          </div>

          {/* Product Description */}
          <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
            <textarea
              placeholder='Type here'
              className='w-[600px] max-w-[98%] h-[100px] rounded-lg border-[2px] border-gray-300 px-[20px] py-[10px] text-[18px] bg-white placeholder:text-gray-500 focus:outline-purple-400'
              onChange={(e) => setDescription(e.target.value)} value={description} required
            />
          </div>

          {/* Category and Subcategory */}
          <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
            <div className='md:w-[30%] w-[100%] flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Category</p>
              <select className='bg-white w-[60%] px-[10px] py-[7px] rounded-lg border-[2px] border-gray-300 focus:outline-purple-400' onChange={(e) => setCategory(e.target.value)} >
                <option value='Men'>Men</option>
                <option value='Women'>Women</option>
                <option value='Kids'>Kids</option>
              </select>
            </div>
            <div className='md:w-[30%] w-[100%] flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Sub-Category</p>
              <select className='bg-white w-[60%] px-[10px] py-[7px] rounded-lg border-[2px] border-gray-300 focus:outline-purple-400' onChange={(e) => setSubCategory(e.target.value)} >
                <option value='TopWear'>TopWear</option>
                <option value='BottomWear'>BottomWear</option>
                <option value='WinterWear'>WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
            <input
              type='number'
              placeholder='₹ 2000'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg border-[2px] border-gray-300 px-[20px] text-[18px] bg-white placeholder:text-gray-500 focus:outline-purple-400'
              onChange={(e) => setPrice(e.target.value)} value={price} required
            />
          </div>

          {/* Size */}
          <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
            <div className='flex items-center justify-start gap-[15px] flex-wrap'>
              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-200 text-[18px] hover:border-purple-500 border-[2px] cursor-pointer ${sizes.includes("S") ? "bg-green-00 text-black border-purple-800" : ""}`} onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>S</div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-200 text-[18px] hover:border-purple-500 border-[2px] cursor-pointer ${sizes.includes("M") ? "bg-green-400 text-black border-purple-800" : ""}`} onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>M</div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-200 text-[18px] hover:border-purple-500 border-[2px] cursor-pointer ${sizes.includes("L") ? "bg-green-400 text-black border-purple-800" : ""}`} onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>L</div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-200 text-[18px] hover:border-purple-500 border-[2px] cursor-pointer ${sizes.includes("XL") ? "bg-green-400 text-black border-purple-800" : ""}`} onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>XL</div>

              <div className={`px-[20px] py-[7px] rounded-lg bg-slate-200 text-[18px] hover:border-purple-500 border-[2px] cursor-pointer ${sizes.includes("XXL") ? "bg-green-400 text-black border-purple-800" : ""}`} onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>XXL</div>
            </div>

          </div>

          {/* BestSeller */}
          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px]'>
            <input type='checkbox' id='checkbox' className='w-[25px] h-[25px] cursor-pointer' onChange={()=>setBestSeller(prev => !prev)} />
            <label htmlFor='checkbox' className='text-[18px] md:text-[22px] font-semibold'>
              Add to BestSeller
            </label>
          </div>

          {/* Submit Button */}
          <button className='w-[160px] px-[20px] py-[15px] rounded-xl bg-[#7A5AF8] text-white font-semibold text-[16px] hover:bg-[#674ED6] transition border-none mt-[20px]'>
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add