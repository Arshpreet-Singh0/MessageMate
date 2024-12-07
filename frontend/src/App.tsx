import Home from "./components/Home";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const App = () => {

  return (
    <>
    <BrowserRouter>
          {/* <Sidebar /> */}
          <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App