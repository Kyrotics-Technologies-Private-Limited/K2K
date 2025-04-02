import React, { useState } from 'react';
import { User, Package, Heart, Ticket, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User className="w-4 h-4" />, label: 'My Profile', path: '/profile' },
    { icon: <Package className="w-4 h-4" />, label: 'My Orders', path: '/orders' },
    { icon: <Heart className="w-4 h-4" />, label: 'Wishlist', path: '/wishlist' },
    { icon: <Ticket className="w-4 h-4" />, label: 'Coupons', path: '/coupons' },
    { icon: <Bell className="w-4 h-4" />, label: 'Notifications', path: '/notifications' },
    { icon: <LogOut className="w-4 h-4" />, label: 'Logout', path: '/logout' },
  ];

  const handleItemClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <User className="w-6 h-6 text-gray-700" />
        <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item.path)}
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600">{item.icon}</span>
              <span className="text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};