import { useContext } from "react";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import  { Signup } from "./pages/Signup";
import { Route, Routes } from "react-router";
import { userDataContext } from "./context/UserContext";


function App() {
  const { userData } = useContext(userDataContext)
  return (
    <>
    { userData && <Nav />  }
    
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
