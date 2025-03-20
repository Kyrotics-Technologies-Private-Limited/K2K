
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllProductPage from './pages/AllProductPage';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { useState } from 'react';
import { CheckoutPage } from './pages/Checkout';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    
      <BrowserRouter>
      <CartProvider>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProductPage/>}/>
          <Route path="/product/:id" element={<ProductPage/>}  />
          <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </CartProvider>    
        
      </BrowserRouter>
    
  );
}

export default App;