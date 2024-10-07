import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// components & pages
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CreateProduct from "./pages/CreateProduct"

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
