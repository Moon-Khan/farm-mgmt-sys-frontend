import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Map,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

const FooterNav = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Plots", path: "/plots", icon: <Map size={20} /> },
    { name: "Schedule", path: "/schedule", icon: <Calendar size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <nav className="bg-white border-t shadow-lg fixed bottom-0 w-full flex justify-around py-3 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs px-2 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "text-green-600 font-semibold bg-green-50 shadow-sm"
                : "text-gray-500 hover:text-green-600 hover:bg-green-50/50"
            }`
          }
        >
          <div className="mb-1">
            {item.icon}
          </div>
          <span className="font-medium">
            {item.name}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default FooterNav;
