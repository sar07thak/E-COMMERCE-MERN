import React from 'react'
import Nav from '../Component/Nav.jsx'
import Sidebar from '../Component/Sidebar.jsx'

const Add = () => {
  return (
    <>
    
    <div className="w-full h-[70px] bg-[#E6E4FA] fixed top-0 z-20 flex items-center justify-between px-8 shadow-md shadow-gray-300">
        <Nav />
        <Sidebar />
    </div>
    </>
  )
}

export default Add