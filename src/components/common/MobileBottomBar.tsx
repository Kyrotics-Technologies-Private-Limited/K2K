import React, { useState, useCallback } from "react";
import { Home, Package, Tag, ScanSearch, User as UserIcon, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PhoneAuth from "../authComponents/PhoneAuth";
import { signOut } from "../../store/slices/authSlice";

const MobileBottomBar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const displayName = user?.name || "User";

  const handleNavigation = (path: string) => {
    navigate(path);
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

  const handleAccountClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const navItems: { path: string; label: string; icon: React.ElementType }[] = [
    { path: "/", label: "Home", icon: Home },
    { path: "/all-products", label: "Products", icon: Package },
    { path: "/kishanParivarPage", label: "Offers", icon: Tag },
    { path: "/traceability", label: "Traceability", icon: ScanSearch },
  ];

  return (
    <>
      {/* Mobile-only bottom bar: visible only below md (768px) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-14 px-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive =
              path === "/"
                ? location.pathname === "/"
                : location.pathname === path || (path === "/all-products" && location.pathname.startsWith("/product/"));
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 gap-0.5 transition ${
                  isActive ? "text-green-700" : "text-gray-500"
                }`}
                aria-label={label}
              >
                <Icon className="w-6 h-6 shrink-0" />
                <span className="text-[10px] font-medium truncate max-w-full">{label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleAccountClick}
            className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 gap-0.5 transition ${
              showUserMenu ? "text-green-700" : "text-gray-500"
            }`}
            aria-label="Account"
          >
            {isAuthenticated ? (
              <span className="w-6 h-6 shrink-0 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-medium">
                {displayName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <UserIcon className="w-6 h-6 shrink-0" />
            )}
            <span className="text-[10px] font-medium">Account</span>
          </button>
        </div>
      </nav>

      {/* Mobile User Menu (same behavior as navbar Account) */}
      {showUserMenu && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowUserMenu(false)}
            aria-label="Close menu"
          />
          <div className="absolute bottom-14 left-4 right-4 bg-white rounded-t-xl shadow-lg py-2 animate-fade-in">
            <div className="px-4 py-2 text-sm font-semibold border-b text-gray-800">
              Hello, {displayName.split(" ")[0]}
            </div>
            <button
              type="button"
              onClick={() => handleNavigation("/profile")}
              className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("/orders")}
              className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Orders
            </button>
            <button
              type="button"
              onClick={logout}
              disabled={isSigningOut}
              className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {isSigningOut ? "Logging out..." : "Logout"}
            </button>
            <button
              type="button"
              onClick={() => setShowUserMenu(false)}
              className="button w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Login Modal (same as navbar) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white max-w-md w-full rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-b from-green-50 to-white px-6 pt-6 pb-2">
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-green-800 text-center mb-6 pr-8">
                Login with Kishan2Kitchen
              </h2>
            </div>
            <div className="px-6 pb-6 pt-2">
              <PhoneAuth onAuthenticated={closeLoginModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomBar;
