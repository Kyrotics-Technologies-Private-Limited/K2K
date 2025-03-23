import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: BarChart, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div>
      {/* Toggle Button for Mobile View */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-500 text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`w-72 h-screen bg-green-300 shadow-lg border-r border-gray-200 fixed left-0 top-0 transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-green-600">Kishan2Kitchen</h1>
          <p className="text-gray-400 text-sm">Admin Dashboard</p>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-green-500 text-white shadow-md"
                  : "hover:bg-green-100 text-gray-600"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Divider for Separation */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Logout Section */}
        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full p-3 rounded-md hover:bg-red-100 transition-all duration-300">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile View */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
