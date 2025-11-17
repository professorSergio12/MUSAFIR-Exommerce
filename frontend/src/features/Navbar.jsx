import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { currentUser } = useSelector((state) => state.user);
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/all-packages" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
  ];
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="bg-white/98 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
              <span className="text-orange-500">M</span>
              <span className="text-gray-900">USAFIR</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-900 hover:text-orange-500 px-4 py-2 text-lg font-semibold transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Sign In Button */}
            {!currentUser ? (
              <Link
                to="/signin"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 hover:scale-105 transform"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 hover:scale-105 transform"
              >
                Log Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-orange-500 focus:outline-none transition-colors duration-300 p-2"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/98 backdrop-blur-md border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-900 hover:text-orange-500 hover:bg-orange-500/10 block px-4 py-3 rounded-md text-lg font-semibold transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-md text-lg transition-all duration-200 text-center block"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
