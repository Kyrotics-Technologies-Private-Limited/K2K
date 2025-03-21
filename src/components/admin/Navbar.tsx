import { Bell, Search,LogOut, Globe } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [language, setLanguage] = useState("English");

  return (
    <div className="h-16 bg-green-200 text-green-800 shadow-md flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for products, orders, etc..."
            className="w-full pl-10 pr-4 py-2 bg-green-100 text-green-800 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Profile & Actions */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="relative p-2 hover:bg-green-300 rounded-lg">
          <Bell size={22} className="text-green-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-green-200"></span>
        </button>

        {/* Language Switcher */}
        <div className="relative group">
          <button className="flex items-center space-x-2 cursor-pointer">
            <Globe size={20} />
            <span>{language}</span>
          </button>
          <div className="absolute hidden group-hover:block bg-white text-green-700 rounded-md shadow-md mt-1 w-28">
            {["English", "Hindi", "Marathi", "Punjabi"].map((lang) => (
              <div
                key={lang}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          
          <div>
            <p className="text-sm font-semibold">Admin</p>
            
          </div>
        </div>

        {/* Logout Button */}
        <button className="flex items-center text-green-700 hover:text-red-500 transition">
          <LogOut size={22} />
          <span className="ml-2 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
