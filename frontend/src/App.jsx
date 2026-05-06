import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter> 

      <Navbar />      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;