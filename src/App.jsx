import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import Category from "./Pages/Category";
import Filter from "./Pages/Filter";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/category" element={<Category />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App