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
import AdminDashboard from "./pages/admin/Admindashboard";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AppProvider from "./AppProvider";
import AdminProducts from "./pages/admin/AdminProducts";
//import PhoneAuth from "./components/PhoneAuth";

import ProductDetailsPage from "./pages/admin/ProductDetailsPage";
import ProductListPage from "./pages/admin/ProductListPage";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import { ToastContainer, Bounce } from 'react-toastify';
import VariantDetailsPage from "./pages/admin/Variantdetailspage";
import VariantEditPage from "./pages/admin/VariantEditPage";

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
        <AppProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-products" element={<AllProductPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route
                path="/kishanParivarPage"
                element={<KishanParivarPage />}
              />
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
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<ProductDetailsPage />} />
              <Route path="productlist" element={<ProductListPage />} />
               <Route path="products/:productId/variants" element={<VariantDetailsPage/>} />
               <Route path="products/:productId/variants/:variantId/edit" element={<VariantEditPage/>} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              {/* Add other admin routes as needed */}
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
