import React, { useState, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  // Search,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PhoneAuth from "../authComponents/PhoneAuth";
import { useBannerUrls } from "../../hooks/useBannerUrls";
import { signOut } from "../../store/slices/authSlice";
import { fetchProducts } from "../../store/slices/productSlice";

interface NavbarProps {
  onCartClick?: () => void;
}

// ...imports stay the same

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { getUrl } = useBannerUrls();
  const logoUrl = getUrl("footer_logo") ?? "/assets/images/K2K Logo.png";

  // Get auth state from Redux
  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const cart = useAppSelector((state) => state.cart);
  const { categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!cart) {
    console.error("Cart is not available in the Redux store.");
    return null;
  }
  const itemCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const displayName = user?.name || "User";

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setShowUserMenu(false);
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
      setShowUserMenu(false);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className="sticky top-0 w-full z-40 bg-white shadow-sm">
      <div className="mx-auto lg:pl-10 md:pl-6 pl-4 pr-4 sm:pr-6 lg:pr-8">
        <div className="grid grid-cols-[1fr_auto_1fr] lg:flex lg:justify-between h-12 sm:h-16 items-center gap-2">
          {/* Hamburger - extreme left on tablet/mobile */}
          <div className="lg:hidden flex items-center justify-self-start">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6 sm:h-6 sm:w-6" /> : <Menu className="h-6 w-6 sm:h-6 sm:w-6" />}
            </button>
          </div>

          {/* Logo - centered on tablet/mobile, left on desktop */}
          <Link
            to="/"
            className="flex items-center justify-self-center lg:justify-self-auto"
          >
            <img
              src={logoUrl}
              alt="Kishan2Kitchen Logo"
              className="md:h-14 sm:h-12 h-10 md:w-14 sm:w-12 w-10 object-cover rounded-md"
            />
            <span className="font-lobster-two italic ml-2 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold text-green-800">
              Kishan2Kitchen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-stretch space-x-4 xl:space-x-8 h-16">
            <Link
              to="/"
              className={`text-sm xl:text-base transition px-4 flex items-center h-16 ${location.pathname === "/"
                ? "text-green-800 font-semibold "
                : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowProductDropdown(true)}
              onMouseLeave={() => setShowProductDropdown(false)}
            >
              <div className="flex items-center h-16">
                <Link
                  to="/all-products"
                  className={`text-sm xl:text-base transition px-4 flex items-center h-full ${location.pathname === "/all-products" ||
                      location.pathname.startsWith("/product/")
                      ? "text-green-800 font-semibold "
                      : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  All Products
                </Link>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showProductDropdown ? 'rotate-180' : ''}`} />
              </div>
              <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ${showProductDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <Link
                  to="/all-products"
                  className="block px-4 py-2 text-gray-700 hover: hover:text-green-600"
                  onClick={() => setShowProductDropdown(false)}
                >
                  All Categories
                </Link>
                {categories.length > 0 ? (
                  categories.map((type) => (
                    <Link
                      key={type}
                      to={`/all-products?category=${type}`}
                      className="block px-4 py-2 text-gray-700 hover: hover:text-green-600"
                      onClick={() => setShowProductDropdown(false)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Link>
                  ))
                ) : (
                  <div className="block px-4 py-2 text-gray-500">Loading...</div>
                )}
              </div>
            </div>

            {[
              ["try-our-sample", "Try Our Sample"],
              ["kishanParivarPage", "Kishan Parivar"],
              ["traceability", "Traceability"],
              ["our-story", "Our Story"],
              ["Blog", "Blog"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={`/${path}`}
                className={`text-sm xl:text-base transition px-4 flex items-center h-16 ${location.pathname === `/${path}`
                  ? "text-green-800 font-semibold "
                  : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right-side Icons - extreme right on tablet/mobile */}
          <div className="flex items-center justify-self-end lg:justify-self-auto">
            {isAuthenticated ? (
              <div className="relative group hidden lg:block">
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
                className="text-gray-700 hover:text-green-600 transition hidden lg:block cursor-pointer"
              >
                <UserIcon className="w-6 h-6" />
              </button>
            )}

            {/* Account: hidden on mobile (bottom bar has it), visible on tablet only (md to lg) */}
            <div className="hidden md:flex lg:hidden items-center">
              {isAuthenticated ? (
                <button
                  onClick={toggleUserMenu}
                  className="w-6 h-6 sm:w-7 sm:h-7 mr-1.5 sm:mr-2 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer text-sm sm:text-base"
                >
                  {displayName.charAt(0).toUpperCase()}
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-700 hover:text-green-600 transition cursor-pointer p-1"
                >
                  <UserIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            <button onClick={onCartClick} className="button relative p-1.5 lg:p-2">
              <ShoppingCart className="text-gray-700 w-6 h-6 lg:w-6 lg:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-green-600 text-white rounded-full h-4 w-4 min-w-4 lg:h-5 lg:w-5 lg:min-w-5 flex items-center justify-center text-[10px] lg:text-xs">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
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
                to="/"
                className={`block py-2 px-3 rounded-md ${location.pathname === "/"
                  ? "text-green-800 font-semibold "
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/all-products"
                className={`block py-2 px-3 rounded-md ${location.pathname === "/all-products" ||
                  location.pathname.startsWith("/product/")
                  ? "text-green-800 font-semibold "
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>

              <Link
                to="/all-products"
                className={`block py-2 px-3 pl-6 text-sm rounded-md ${location.pathname === "/all-products" && !location.search
                  ? "text-green-800 font-semibold "
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                All Categories
              </Link>
              {categories.length > 0 ? (
                categories.map((type) => (
                  <Link
                    key={type}
                    to={`/all-products?category=${type}`}
                    className={`block py-2 px-3 pl-6 text-sm rounded-md ${location.pathname === "/all-products" &&
                      location.search === `?category=${type}`
                      ? "text-green-800 font-semibold "
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Link>
                ))
              ) : (
                <div className="block py-2 px-3 pl-6 text-sm text-gray-500">
                  Loading...
                </div>
              )}

              {[
                ["try-our-sample", "Try Our Sample"],
                ["kishanParivarPage", "Kishan Parivar"],
                ["traceability", "Traceability"],
                ["our-story", "Our Story"],
                ["Blog", "Blog"],
              ].map(([path, label]) => (
                <Link
                  key={path}
                  to={`/${path}`}
                  className={`block py-2 px-3 rounded-md ${location.pathname === `/${path}`
                    ? "text-green-800 font-semibold "
                    : "text-gray-700 hover:bg-gray-50"
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

      {/* Mobile User Menu */}
      {showUserMenu && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div className="absolute top-12 sm:top-16 right-4 bg-white rounded-md shadow-lg py-2 w-48 z-40 animate-fade-in">
            <div className="px-4 py-2 text-sm font-semibold border-b text-gray-800">
              Hello, {displayName.split(" ")[0]}
            </div>
            <button
              onClick={() => {
                handleNavigation("/profile");
                setShowUserMenu(false);
              }}
              className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                handleNavigation("/orders");
                setShowUserMenu(false);
              }}
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
            <button
              onClick={() => setShowUserMenu(false)}
              className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white max-w-md w-full rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-b from-green-50 to-white px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-semibold text-green-800 text-center mb-6 pr-8">
                Login with Kishan2Kitchen
              </h2>
            </div>
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
              <PhoneAuth onAuthenticated={closeLoginModal} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
