import { useContext } from "react";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import  { Signup } from "./pages/Signup";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { userDataContext } from "./context/UserContext";
import Collections from "./pages/Collections.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import Order from "./pages/Order.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const { userData } = useContext(userDataContext) 
  const location = useLocation();
  return (
    <>
    <ToastContainer />
    { userData && <Nav />  }
    
   <Routes>
    <Route path="/login" 
    element = { userData ? ( <Navigate to={location.state?.from || "/" }/> ) : ( <Login /> )}  ></Route>

    <Route path="/signup" 
    element={ userData ? ( <Navigate to={location.state?.from || "/" }/> ) : ( <Signup/> ) }></Route>

    <Route path="/" 
    element = { userData ? <Home/> : <Navigate to="/login" state={{from : location.pathname}}/>} ></Route>

    <Route path="/collections" 
     element = { userData ? <Collections/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route>

    <Route path="/about" 
    element = { userData ? <About/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route>

    <Route path="/contact" 
     element = { userData ? <Contact/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route>

    <Route path="/order" 
     element = { userData ? <Order/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route>

    <Route path="/product/:id"
     element = { userData ? <Product/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route> 

    <Route path="/productdetail/:productId"
     element = { userData ? <ProductDetails/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route> 

    <Route path="/cart"
     element = { userData ? <Cart/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route> 

     <Route path="/placeorder"
     element = { userData ? <PlaceOrder/> : <Navigate to="/login" state={{from : location.pathname}}/>}></Route> 
   </Routes>
    </>
  );
}

export default App;
