import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, ChevronDown, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PhoneAuth from "../components/PhoneAuth"; // ✅ make sure the path is correct

interface NavbarProps {
  onCartClick: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { state } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  const getUserInitial = () => {
    if (!user || !user.email) return "";
    return user.email.charAt(0).toUpperCase();
  };

  const handleNavigation = (path: string) => {
    setUserDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 w-full z-40 bg-white shadow-sm">
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
              <div className="relative group">
                <div className="flex items-center">
                  <Link
                    to="/all-products"
                    className="text-gray-500 hover:text-black transition"
                  >
                    All Products
                  </Link>
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {["oil", "ghee", "honey", "natural"].map((product) => (
                    <Link
                      key={product}
                      to={`/products/${product}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {product.charAt(0).toUpperCase() + product.slice(1)}
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
                  className="text-gray-500 hover:text-black transition"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Search, Cart, User */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-green-600 transition">
              <Search className="h-5 w-5" />
            </button>

            {/* User Auth */}
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
                    {[
                      ["/profile", "My Profile"],
                      ["/orders", "My Orders"],
                    ].map(([path, label]) => (
                      <button
                        key={label}
                        onClick={() => handleNavigation(path)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {label}
                      </button>
                    ))}
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
              <button
                onClick={() => setUserDropdownOpen(true)}
                className="text-gray-700 hover:text-green-600 transition"
              >
                <User className="w-6 h-6" />
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative p-2 hover:text-green-brand transition"
            >
              <ShoppingCart className="text-gray-700 w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile */}
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
            {[
              ["/", "Home"],
              ["/all-products", "All Products"],
              ["/samples", "Try Our Sample"],
              ["/kishanParivarPage", "Kishan Parivar"],
              ["/traceability", "Traceability"],
              ["/our-story", "Our Story"],
              ["/blog", "Blog"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className="block px-3 py-2 text-gray-500 hover:text-black transition"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
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

      {/* Centered Floating PhoneAuth Popup */}
      {userDropdownOpen && !user && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex justify-center p-4 sm:p-10 pb-10 overflow-y-auto"
          onClick={(e) => {
            if (
              dropdownRef.current &&
              !dropdownRef.current.contains(e.target)
            ) {
              setUserDropdownOpen(false);
            }
          }}
        >
          <div
            ref={dropdownRef}
            className="relative bg-green-50 rounded-3xl shadow-2xl  max-w-md p-6 sm:p-8 pb-20 animate-fade-in border border-gray-100 transition-all duration-300"
          >
            {/* Close Button */}
            <button
              onClick={() => setUserDropdownOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
              Login with Kishan2Kitchen
            </h2>

            {/* PhoneAuth Component */}
            <div className="w-full ">
              <PhoneAuth onClose={() => setUserDropdownOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
