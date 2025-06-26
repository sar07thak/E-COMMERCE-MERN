import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home.jsx";
import Add from "./Pages/Add.jsx";
import List from "./Pages/List.jsx";
import Order from "./Pages/Order.jsx"
import Login from './Pages/Login.jsx';
import { useContext } from 'react';
import { adminDataContext } from './context/AdminContext.jsx';


const App = () => {
  const { adminData } = useContext(adminDataContext)
  return (
    <>
    { !adminData ? <Login/> : <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element ={<Login/>}/>
      <Route path='/add' element={<Add/>} />
      <Route path='/list' element={<List/>} />
      <Route path='/order' element={<Order/>} />
     </Routes>
    </>
    }
    </>
  )
}

export default App