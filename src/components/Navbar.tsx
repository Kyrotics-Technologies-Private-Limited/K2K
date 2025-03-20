import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';


interface NavbarProps {
  onCartClick: () => void;
}


const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center">
            
              <Leaf className={`h-8 w-8 ${isScrolled ? 'text-green-600' : 'text-white'}`} />
              <span className={`ml-2 text-xl font-semibold ${isScrolled ? 'text-green-800' : 'text-white'}`}>
                Kishan2Kitchen
              </span>
            
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-8">
              <a href="/all-products" className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>All Products</a>
              <a href="#" className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>Try Our Sample</a>
              <a href="#" className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>Kishan Parivar</a>
              <a href="#" className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>Traceability</a>
              <a href="#" className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>Our Story</a>
              <a href="#" className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>Blog</a>
            </div>
          </div>
          
          {/* Right section - Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>
              <Search className="h-5 w-5" />
            </button>
            <button
            onClick={onCartClick}
            className="relative p-2"
          >
            <ShoppingCart className={`${isScrolled ? 'text-gray-700 hover:text-green-600':'text-white hover:text-green-200'} transition w-6 h-6`} />
            {itemCount > 0 && (
              <span className={`${isScrolled ? 'bg-green-600 text-white' : 'bg-white text-green-800'} absolute -top-1 -right-1 rounded-full h-4 w-4 flex items-center justify-center text-xs`}>
                {itemCount}
              </span>
            )}
          </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition">Home</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition">Shop</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition">About</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition">Contact</a>
            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="text-gray-700 hover:text-green-600 transition">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-green-600 transition relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;