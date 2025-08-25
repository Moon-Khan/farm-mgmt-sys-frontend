import React from "react";
import { NavLink } from "react-router-dom";

const FooterNav = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Plots", path: "/plots", icon: "🗺️" },
    { name: "Schedule", path: "/schedule", icon: "📅" },
    { name: "Reports", path: "/reports", icon: "📊" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <nav className="bg-white border-t shadow fixed bottom-0 w-full flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive 
                ? "text-green-600 font-semibold bg-green-50 rounded-lg px-2 py-1" 
                : "text-gray-500"
            }`
          }
        >
          <span className="text-lg mb-1">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default FooterNav;
