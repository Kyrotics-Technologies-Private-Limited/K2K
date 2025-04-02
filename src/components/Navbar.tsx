import React, { useState } from "react";
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

interface NavbarProps {
  onCartClick: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white shadow-sm">
      <div className=" mx-auto lg:pl-10 md:pl-6 pl-4 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center">
            <img
              src="/assets/images/K2K Logo.png"
              alt="Kishan2Kitchen Logo"
              className="md:h-20 sm:h-16 h-12 md:w-20 sm:w-16 w-12 object-cover mr-1 rounded-md"
            />
            <span className="logoFont ml-2 lg:text-3xl md:text-2xl sm:text-xl font-semibold text-green-800">
              Kishan2Kitchen
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="navbar hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-8">
              {/* Products Dropdown */}
              <div className="relative group">
                <button
                  onClick={toggleProductsDropdown}
                  className="flex items-center text-gray-500 hover:text-black transition"
                >
                  All Products
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      productsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {productsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="/all-products"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-brand"
                    >
                      Oil
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-brand"
                    >
                      Ghee
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-brand"
                    >
                      Honey
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-brand"
                    >
                      Natural product
                    </a>
                  </div>
                )}
              </div>

              <a href="#" className="text-gray-500 hover:text-black transition">
                Try Our Sample
              </a>
              <a
                href="/kishanParivarPage"
                className="text-gray-500 hover:text-black transition"
              >
                Kishan Parivar
              </a>
              <a
                href="/traceability"
                className="text-gray-500 hover:text-black transition"
              >
                Traceability
              </a>
              <a
                href="/our-story"
                className="text-gray-500 hover:text-black transition"
              >
                Our Story
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition">
                Blog
              </a>
            </div>
          </div>

          {/* Right section - Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-green-brand transition">
              <Search className="h-5 w-5" />
            </button>

            <Link to="/register">
              <button className="text-gray-700 hover:text-green-brand transition p-2">
                <User className="h-5 w-5" />
              </button>
            </Link>
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
            <a
              href="/"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
            >
              Home
            </a>

            {/* Mobile Products Dropdown */}
            <div className="px-3 py-2">
              <button
                onClick={toggleProductsDropdown}
                className="flex items-center text-gray-500 hover:text-black transition w-full"
              >
                All Products
              </button>
            </div>

            <a
              href="#"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
            >
              Try Our Sample
            </a>
            <a
              href="/kishanParivarPage"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
            >
              Kishan Parivar
            </a>
            <a
              href="/traceability"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
            >
              Traceability
            </a>
            <a
              href="/our-story"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
            >
              Our Story
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-500 hover:text-black transition"
            >
              Blog
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
