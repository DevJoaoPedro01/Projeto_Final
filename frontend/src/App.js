import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductForm from "./components/ProductForm";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
