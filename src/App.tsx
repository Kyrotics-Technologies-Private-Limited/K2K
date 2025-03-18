
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllProductPage from './pages/AllProductPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProductPage/>}/>
          <Route path="/product/:id" element={<ProductPage/>}  />
          </Routes>
        
      </BrowserRouter>
    
  );
}

export default App;