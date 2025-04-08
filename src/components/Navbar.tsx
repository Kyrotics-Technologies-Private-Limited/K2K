import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  onCartClick: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { state } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProductsDropdown = () => {
    console.log("Toggling dropdown", !productsDropdownOpen);
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  const getUserInitial = () => {
    if (!user || !user.email) return "";
    return user.email.charAt(0).toUpperCase();
  };

  const handleNavigation = (path: string) => {
    setUserDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white shadow-sm">
      <div className="mx-auto lg:pl-10 md:pl-6 pl-4 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src="/assets/images/K2K Logo.png"
              alt="Kishan2Kitchen Logo"
              className="md:h-20 sm:h-16 h-12 md:w-20 sm:w-16 w-12 object-cover mr-1 rounded-md"
            />
            <span className="logoFont ml-2 lg:text-3xl md:text-2xl sm:text-xl font-semibold text-green-800">
              Kishan2Kitchen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-8">
              {/* Products Dropdown */}
              <div className="relative group">
                <div className="flex items-center">
                  <Link
                    to="/all-products"
                    className="text-gray-500 hover:text-black transition"
                    onClick={() => setProductsDropdownOpen(false)}
                  >
                    All Products
                  </Link>
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/products/oil"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Oil
                  </Link>
                  <Link
                    to="/products/ghee"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Ghee
                  </Link>
                  <Link
                    to="/products/honey"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Honey
                  </Link>
                  <Link
                    to="/products/natural"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Natural product
                  </Link>
                </div>
              </div>

              <Link
                to="/samples"
                className="text-gray-500 hover:text-black transition"
                onClick={() => setProductsDropdownOpen(false)}
              >
                Try Our Sample
              </Link>
              <Link
                to="/kishanParivarPage"
                className="text-gray-500 hover:text-black transition"
              >
                Kishan Parivar
              </Link>
              <Link
                to="/traceability"
                className="text-gray-500 hover:text-black transition"
                onClick={() => {
                  console.log("Navigating to samples");
                  setIsOpen(false);
                }}
              >
                Traceability
              </Link>
              <Link
                to="/our-story"
                className="text-gray-500 hover:text-black transition"
              >
                Our Story
              </Link>
              <Link
                to="/blog"
                className="text-gray-500 hover:text-black transition"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Right section - Search, Cart, and User */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-green-600 transition">
              <Search className="h-5 w-5" />
            </button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  {getUserInitial()}
                </div>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => handleNavigation("/orders")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 transition px-3 py-1 rounded border border-green-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white hover:bg-green-700 transition px-3 py-1 rounded"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={onCartClick}
              className="relative p-2 hover:text-green-brand transition"
            >
              <ShoppingCart className="text-gray-700 w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-brand text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="text-gray-700 hover:text-green-600 transition">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={onCartClick}
                className="text-gray-700 hover:text-green-600 transition relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 transition"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div className="px-3 py-2">
              <div className="flex items-center">
                <Link
                  to="/all-products"
                  className="text-gray-500 hover:text-black transition"
                  onClick={() => setIsOpen(false)}
                >
                  All Products
                </Link>
              </div>
            </div>

            <Link
              to="/samples"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Try Our Sample
            </Link>
            <Link
              to="/kishanParivarPage"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Kishan Parivar
            </Link>
            <Link
              to="/traceability"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Traceability
            </Link>
            <Link
              to="/our-story"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Our Story
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-500 hover:text-black transition"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-500 hover:text-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-500 hover:text-black transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
