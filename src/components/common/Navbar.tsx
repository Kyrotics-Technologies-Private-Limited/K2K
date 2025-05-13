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
import { Link, useNavigate } from "react-router-dom";
import PhoneAuth from "../authComponents/PhoneAuth";
import { signOut } from "../../store/slices/authSlice";

interface NavbarProps {
  onCartClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get auth state from Redux
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  // Get cart state from Redux
  const cart = useAppSelector((state) => state.cart);
  if (!cart) {
    console.error("Cart is not available in the Redux store.");
    return null;
  }
  const itemCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const displayName = user?.name || "User";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

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
    <nav
      className={`sticky top-0 w-full z-40 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/assets/images/K2K Logo.png"
              alt="Kishan2Kitchen Logo"
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-cover rounded-md"
            />
            <span className="logoFont ml-2 text-xl sm:text-2xl md:text-3xl font-semibold text-green-800">
              Kishan2Kitchen
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="relative group">
              <div className="flex items-center">
                <Link
                  to="/all-products"
                  className="text-gray-600 hover:text-green-700 transition-colors duration-200"
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
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 capitalize"
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>

            {[
              ["samples", "Try Our Sample"],
              ["kishanParivarPage", "Kishan Parivar"],
              ["traceability", "Traceability"],
              ["our-story", "Our Story"],
              ["blog", "Blog"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={`/${path}`}
                className="text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-green-700">
            <Search className="h-5 w-5" />
            </button>

            {/* User Authentication Section */}
            {isAuthenticated ? (
              <div className="relative group">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 text-sm font-semibold border-b text-gray-800">
                    Hello, {displayName.split(" ")[0]}
                  </div>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/orders")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={logout}
                    disabled={isSigningOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {isSigningOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-1 sm:p-2 text-gray-600 hover:text-green-700"
              >
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-1 sm:p-2 text-gray-600 hover:text-green-700"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button - Hidden on desktop */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-gray-600 hover:text-green-700"
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

      {/* Mobile Menu - Only shown on mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div className="px-3 py-2">
              <div className="text-base font-medium text-gray-700">
                Products
              </div>
              <div className="mt-1 pl-2 space-y-1">
                {["all-products", "oils", "ghee", "honey", "natural"].map(
                  (type) => (
                    <Link
                      key={type}
                      to={
                        type === "all-products"
                          ? "/all-products"
                          : `/all-products?category=${type}`
                      }
                      className="block px-2 py-1 rounded-md text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 capitalize"
                      onClick={() => setIsOpen(false)}
                    >
                      {type === "all-products" ? "All Products" : type}
                    </Link>
                  )
                )}
              </div>
            </div>

            {[
              ["samples", "Try Our Sample"],
              ["kishanParivarPage", "Kishan Parivar"],
              ["traceability", "Traceability"],
              ["our-story", "Our Story"],
              ["blog", "Blog"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={`/${path}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    disabled={isSigningOut}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
                  >
                    {isSigningOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
          <div className="relative bg-green-50 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-4 sm:p-6 md:p-8 border border-gray-100 animate-fade-in">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700 text-center mb-4">
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
