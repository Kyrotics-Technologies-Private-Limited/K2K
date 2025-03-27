
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import  AllProductPage  from './pages/AllProductPage';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { useState } from 'react';
import { CheckoutPage } from './pages/Checkout';
import Footer from './components/Footer';
import KishanParivarPage from './pages/KishanParivarPage';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import OverviewPage from "./pages/admin/OverviewPage";
import OurStory from "./pages/OurStory";
import AdvertisementBar from './components/AdvertisementBar';
// import ProductPage from "./pages/admin/ProductPage";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <AdvertisementBar/>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/kishanParivarPage" element={<KishanParivarPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/our-story' element={<OurStory/>}/>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="products" element={<ProductPage />} />
          </Route>
        </Routes>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
