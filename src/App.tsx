import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllProductPage from "./pages/AllProductPage";
import ProductPage from "./pages/ProductPage";
import { AuthProvider } from "./context/AuthContext"; // Keep AuthContext if you're using it for auth
import Navbar from "./components/common/Navbar";
import { CartDrawer } from "./components/common/CartDrawer";
import { useState } from "react";
// import { CheckoutPage } from "./pages/Checkout";
import Footer from "./components/common/Footer";
import KishanParivarPage from "./pages/KishanParivarPage";
import SignUp from "./pages/authPages/SignUp";
import Login from "./pages/authPages/Login";
import AdminLayout from "./layout/AdminLayout";
import OverviewPage from "./pages/admin/OverviewPage";
import OurStory from "./pages/OurStory";
import AdvertisementBar from "./components/common/AdvertisementBar";
import PrivacyPolicy from "./pages/policyPages/privacypolicy";
import TermsOfService from "./pages/policyPages/TermsOfService";
import ShippingPolicy from "./pages/policyPages/ShippingPolicy";
import RefundPolicy from "./pages/policyPages/RefundPolicy";
import Traceability from "./pages/Traceability";
// import OrdersPage from "./pages/OrdersPage";
// import OrderDetailPage from "./pages/OrderDetailPage";
import ForgotPasswordPage from "./pages/authPages/ForgotPassword";
import ResetPasswordPage from "./pages/authPages/ResetPassword";
import UserProfilePage from "./pages/authPages/ProfilePage";
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    // <Provider store={store}>
      <BrowserRouter>
        {/* <AuthProvider> */}
          <AdvertisementBar />
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-products" element={<AllProductPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            <Route path="/kishanParivarPage" element={<KishanParivarPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
            <Route path='/reset-password' element={<ResetPasswordPage/>}/>
            {/* <Route path="/orders" element={<OrdersPage/>}/> */}
            {/* <Route path="/orders/:id" element={<OrderDetailPage/>}/> */}
            <Route path='/our-story' element={<OurStory/>}/>
            <Route path='/traceability' element={<Traceability/>}/>
            <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
            <Route path='/termsofservice' element={<TermsOfService/>}/>
            <Route path='/shipping' element={<ShippingPolicy/>}/>
            <Route path='/refund' element={<RefundPolicy/>}/>
            <Route path='/profile' element={<UserProfilePage/>}/>
           
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="products" element={<ProductPage />} />
            </Route>
          </Routes>

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
          <Footer />
        {/* </AuthProvider> */}
      </BrowserRouter>
    // </Provider>
  );
}

export default App;