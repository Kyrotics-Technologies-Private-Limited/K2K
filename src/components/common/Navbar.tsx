import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PhoneAuth from "../authComponents/PhoneAuth";
import { signOut } from "../../store/slices/authSlice";

interface NavbarProps {
  onCartClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  // Get auth state from Redux
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );
  // console.log('user',user)
  // Get cart state from Redux
  const cart = useAppSelector((state) => state.cart);
  if (!cart) {
    console.error("Cart is not available in the Redux store.");
    return null; // or handle it in a way that fits your app
  }
  const itemCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSigningOut, setIsSigningOut] = useState(false);

  // Get user's name or display a default
  const displayName = user?.name || "User";

  // Handle navigation to different routes
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu when navigating
  };

  // Handle logout
  const logout = async () => {
    setIsSigningOut(true);
    try {
      await dispatch(signOut()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="sticky top-0 w-full z-40 bg-white shadow-sm">
      <div className="mx-auto lg:pl-10 md:pl-6 pl-4 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/K2K Logo.png"
              alt="Kishan2Kitchen Logo"
              className="md:h-20 sm:h-16 h-12 md:w-20 sm:w-16 w-12 object-cover rounded-md"
            />
            <span className="logoFont ml-2 lg:text-3xl md:text-2xl sm:text-xl font-semibold text-green-800">
              Kishan2Kitchen
            </span>
          </Link>          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-stretch space-x-4 xl:space-x-8 h-16">
            <div className="relative group"><div className="flex items-center h-16">                <Link
                  to="/all-products"                  className={`text-sm xl:text-base transition px-4 flex items-center h-full ${
                    location.pathname === '/all-products' || location.pathname.startsWith('/product/')
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  All Products
                </Link>
                <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {["oils", "ghee", "honey", "natural"].map((type) => (
                  <Link
                    key={type}
                    to={
                      type === "natural"
                        ? "/all-products"
                        : `/all-products?category=${type}`
                    }
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Link>
                ))}
              </div>
            </div>

            { [
              ["samples", "Try Our Sample"],
              ["kishanParivarPage", "Kishan Parivar"],
              ["traceability", "Traceability"],
              ["our-story", "Our Story"],
              ["Blog", "Blog"],
            ].map(([path, label]) => (              <Link                key={path}
                to={`/${path}`}
                className={`text-sm xl:text-base transition px-4 flex items-center h-16 ${
                  location.pathname === `/${path}` 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center">
            {/* <Search className="h-7 w-7 mr-4 text-gray-700 hover:text-green-600 cursor-pointer" /> */}

            {/* User Authentication Section */}
            {isAuthenticated ? (
              <div className="relative group">
                <div className="w-7 h-7 mr-2 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 text-sm font-semibold border-b text-gray-800">
                    Hello, {displayName.split(" ")[0]}
                  </div>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/orders")}
                    className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={logout}
                    disabled={isSigningOut}
                    className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {isSigningOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-700 hover:text-green-600 transition"
              >
                <UserIcon className="w-6 h-6" />
              </button>
            )}

            {/* Cart Button */}
            <button onClick={onCartClick} className="button relative p-2">
              <ShoppingCart className="text-gray-700 w-6 h-8" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200">
          <div className="px-4 py-2">
            <div className="space-y-1">
              <Link
                to="/all-products"                className={`block py-2 px-3 rounded-md ${
                  location.pathname === '/all-products' || location.pathname.startsWith('/product/')
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>
              {["oils", "ghee", "honey", "natural"].map((type) => (
                <Link
                  key={type}
                  to={
                    type === "natural"
                      ? "/all-products"
                      : `/all-products?category=${type}`
                  }                  className={`block py-2 px-3 pl-6 text-sm rounded-md ${
                    location.pathname === '/all-products' && location.search === `?category=${type}`
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Link>
              ))}
              { [
                ["samples", "Try Our Sample"],
                ["kishanParivarPage", "Kishan Parivar"],
                ["traceability", "Traceability"],
                ["our-story", "Our Story"],
                ["Blog", "Blog"],
              ].map(([path, label]) => (
                <Link
                  key={path}
                  to={`/${path}`}                  className={`block py-2 px-3 rounded-md ${
                    location.pathname === `/${path}` 
                      ? 'bg-green-100 text-green-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4 sm:p-8">
          <div className="relative bg-green-50 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-100 animate-fade-in">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
              Login with Kishan2Kitchen
            </h2>
            <PhoneAuth />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
