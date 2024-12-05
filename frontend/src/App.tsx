import Login from "./components/auth/Login";
import Home from "./components/Home";
// import Sidebar from "./components/navbar/Sidebar"
import {BrowserRouter ,Routes, Route} from "react-router-dom";

const App = () => {

  return (
    <>
    <BrowserRouter>
          {/* <Sidebar /> */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App