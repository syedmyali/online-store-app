import "./App.css";
import { Footer, Navbar } from "./components/Layout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/admin/products/ProductList";
import CreateProduct from "./pages/admin/products/CreateProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import ProductDetails from "./pages/admin/products/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/create" element={<CreateProduct />} />
        <Route path="/admin/products/view/:id" element={<ProductDetails />} />
        <Route path="/admin/products/update/:id" element={<UpdateProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
