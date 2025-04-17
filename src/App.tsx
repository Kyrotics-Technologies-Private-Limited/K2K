import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Public components
import AdvertisementBar from "./components/common/AdvertisementBar";
import Navbar from "./components/common/Navbar";
import { CartDrawer } from "./components/common/CartDrawer";
import Footer from "./components/common/Footer";

// Public pages
import HomePage from "./pages/HomePage";
import AllProductPage from "./pages/AllProductPage";
import ProductPage from "./pages/ProductPage";
//import CheckoutPage from "./pages/Checkout";
import KishanParivarPage from "./pages/KishanParivarPage";
import SignUp from "./pages/authPages/SignUp";
import Login from "./pages/authPages/Login";
import OurStory from "./pages/OurStory";
import Traceability from "./pages/Traceability";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ForgotPasswordPage from "./pages/authPages/ForgotPassword";
import ResetPasswordPage from "./pages/authPages/ResetPassword";
import UserProfilePage from "./pages/authPages/ProfilePage";

// Policy pages
import PrivacyPolicy from "./pages/policyPages/privacypolicy";
import TermsOfService from "./pages/policyPages/TermsOfService";
import ShippingPolicy from "./pages/policyPages/ShippingPolicy";
import RefundPolicy from "./pages/policyPages/RefundPolicy";

// Admin components
import Layout from "./components/admin/layout/Layout";
import AdminDashboard from "./pages/admin/Admindashboard";
import AdminProducts from "./pages/admin/AdminProducts";

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
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public routes with common layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-products" element={<AllProductPage />} />
              <Route path="/product/:id" element={<ProductPage />} />

              <Route
                path="/kishanParivarPage"
                element={<KishanParivarPage />}
              />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/traceability" element={<Traceability />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>

            {/* Admin routes with separate layout */}
            <Route path="/admin" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              {/* Add other admin routes as needed */}
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
