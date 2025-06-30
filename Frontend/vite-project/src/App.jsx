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


function App() {
  const { userData } = useContext(userDataContext) 
  const location = useLocation();
  return (
    <>
    { userData && <Nav />  }
    
   <Routes>
    <Route path="/login" 
    element = { userData ? ( <Navigate to={location.state?.from || "/" }/> ) : ( <Login /> )}  ></Route>

    <Route path="/signup" 
    element={ userData ? ( <Navigate to={location.state?.from || "/" }/> ) : ( <Signup/> ) }></Route>

    <Route path="/" 
    element = { userData ? <Home/> : <Navigate to="/login" state={{from : location.pathname}}/>} ></Route>

    <Route path="/collections" 
     element = { userData ? <Collections/> : <Navigate to="/collections" state={{from : location.pathname}}/>}></Route>

    <Route path="/about" 
    element = { userData ? <About/> : <Navigate to="/about" state={{from : location.pathname}}/>}></Route>

    <Route path="/contact" 
     element = { userData ? <Contact/> : <Navigate to="/contact" state={{from : location.pathname}}/>}></Route>

    <Route path="/order" 
     element = { userData ? <Order/> : <Navigate to="/order" state={{from : location.pathname}}/>}></Route>

    <Route path="/product/:id"
     element = { userData ? <Product/> : <Navigate to="/product" state={{from : location.pathname}}/>}></Route> 
   </Routes>
    </>
  );
}

export default App;
