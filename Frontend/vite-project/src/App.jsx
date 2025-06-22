import Nav from "./components/nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import  { Signup } from "./pages/Signup";
import { Route, Routes } from "react-router";


function App() {
  
  
  return (
    <>
    <Nav />    
   <Routes>
    <Route path="/" element = { <Home></Home>} ></Route>
    <Route path="/signup" element={ <Signup > </Signup> }></Route>
    <Route path="/login" element = {<Login ></Login>}></Route>
    {/* <Route path="/login" element={ <Login > </Login>  }></Route> */}
   </Routes>
    </>
  );
}

export default App;
