import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

// Public components
import AdvertisementBar from "./components/common/AdvertisementBar";
import Navbar from "./components/common/Navbar";
import { CartDrawer } from "./components/common/CartDrawer";
import { CheckoutPage } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import Footer from "./components/common/Footer";
import KishanParivarPage from "./pages/KishanParivarPage";
import SignUp from "./pages/authPages/SignUp";
import Login from "./pages/authPages/Login";
import OurStory from "./pages/OurStory";
import PrivacyPolicy from "./pages/policyPages/privacypolicy";
import TermsOfService from "./pages/policyPages/TermsOfService";
import ShippingPolicy from "./pages/policyPages/ShippingPolicy";
import RefundPolicy from "./pages/policyPages/RefundPolicy";
import Traceability from "./pages/Traceability";
import OrdersPage  from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ForgotPasswordPage from "./pages/authPages/ForgotPassword";
import ResetPasswordPage from "./pages/authPages/ResetPassword";
import UserProfilePage from "./pages/authPages/ProfilePage";
import HomePage from "./pages/HomePage";
import AllProductPage from "./pages/AllProductPage";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/admin/layout/Layout";

import { store } from "./store/store";
import { Provider } from "react-redux";
import AppProvider from "./AppProvider";

//import PhoneAuth from "./components/PhoneAuth";

// import ProductDetailsPage from "./pages/admin/ProductDetailsPage";
// import ProductListPage from "./pages/admin/ProductListPage";

import { ToastContainer, Bounce } from 'react-toastify';
// import VariantDetailsPage from "./pages/admin/Variantdetailspage";
// import VariantEditPage from "./pages/admin/VariantEditPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ScrollToTop from './components/common/ScrollToTop';
import MembershipSuccess from "./pages/MembershipSuccess";
import MembershipPayment from "./pages/MembershipPayment";


const PublicLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <AdvertisementBar />
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Outlet />
      </main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: '3rem' }}  
        className="!top-[3rem]" // This ensures toast appears below navbar
        transition={Bounce} />
    </>
  );
};


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <AppProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-products" element={<AllProductPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/kishanParivarPage" element={<KishanParivarPage />}/>
              <Route path="/membership-payment" element={<MembershipPayment />}/>
              <Route path="/membership-success" element={<MembershipSuccess />}/>
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:orderId" element={<OrderDetailPage />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/traceability" element={<Traceability />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/shippinginfo" element={<ShippingPolicy />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              <Route path="/profile" element={<UserProfilePage />} />          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/Blog/:blogId" element={<BlogDetailPage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin" element={<Layout />}>
             
              {/* <Route path="products/:id" element={<ProductDetailsPage />} />
              <Route path="productlist" element={<ProductListPage />} />
               <Route path="products/:productId/variants" element={<VariantDetailsPage/>} />
               <Route path="products/:productId/variants/:variantId/edit" element={<VariantEditPage/>} /> */}
              
              {/* Add other admin routes as needed */}
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
