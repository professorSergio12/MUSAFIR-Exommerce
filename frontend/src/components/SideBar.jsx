import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useAuth";

const menuItems = [
  { label: "Profile", tab: "profile", icon: "👤" },
  { label: "Dashboard", tab: "dashboard", icon: "📊" },
  { label: "Post", tab: "post", icon: "📝" },
  { label: "Gallery", tab: "gallery", icon: "📸" },
];

const SideBar = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleNavigate = (tab) => {
    if (tab === "profile") {
      navigate("/profile?tab=profile");
    } else if (tab === "dashboard") {
      navigate("/profile?tab=dashboard");
    } else if (tab === "post") {
      navigate("/profile?tab=post");
    } else if (tab === "gallery") {
      navigate("/profile?tab=gallery");
    }
  };

  return (
    <aside className="min-h-[calc(100vh-80px)] flex flex-col bg-white text-gray-900">
      <div className="px-6 py-8 border-b border-gray-100">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
          Welcome
        </p>
        <h3 className="text-xl font-semibold">
          {currentUser?.username || "Guest user"}
        </h3>
        <p className="text-xs text-gray-500 truncate">
          {currentUser?.email || "guest@example.com"}
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleNavigate(item.tab)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left border border-gray-100 bg-white hover:bg-gray-50 transition shadow-sm"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => logout()}
        className="flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 transition border-t border-gray-100"
      >
        <span className="text-lg">↩︎</span>
        <span className="font-semibold">Log Out</span>
      </button>
    </aside>
  );
};

export default SideBar;
