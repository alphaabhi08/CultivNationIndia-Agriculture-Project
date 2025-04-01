import {
  FaHome,
  FaGlobe,
  FaSignInAlt,
  FaSignOutAlt,
  FaBuilding,
  FaTimes,
  FaUser,
  FaHistory,
  FaBox,
  FaCog,
  FaProductHunt,
  FaProjectDiagram,
  FaBoxOpen,
  FaTags,
  FaCube,
  FaStore,
  FaUserPlus,
  FaRegUserCircle,
  FaUserCheck,
} from "react-icons/fa";
import { useAuthentication } from "../../features/authentication/context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCartShopping, FaEnvelope } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuthentication() || {};
  const [cartCount, setCartCount] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalItems = storedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(totalItems);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartCount]);

  useEffect(() => {
    setNotification([]);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#28a745] flex items-center justify-between p-4 px-12 h-15">
        {/* Left side navigation */}
        <nav className="flex items-center gap-10 ml-4">
          <a
            onClick={() => navigate("/")}
            className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
          >
            <FaHome size={18} /> HOME
          </a>
          <a
            onClick={() => navigate("/about")}
            className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
          >
            <FaGlobe size={18} /> ABOUT
          </a>
          <a
            onClick={() => navigate("/contact")}
            className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
          >
            <FaEnvelope size={18} /> CONTACT
          </a>
          <a
            onClick={() => navigate("/products")}
            className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
          >
            <FaStore size={18} /> PRODUCT
          </a>
        </nav>

        {/* Right side elements */}
        <div className="flex items-center gap-10 mr-8">
          {user ? (
            <>
              {/* Notification */}
              <div className="relative">
                <FaBell
                  size={20}
                  className="text-white hover:text-gray-200 cursor-pointer"
                />
                {notification.length === 0 ? (
                  <span className="absolute -top-2 -right-1.5 font-semibold bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-[10px]">
                    0
                  </span>
                ) : (
                  notification.some((n) => !n.read) && (
                    <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-3 w-3"></span>
                  )
                )}
              </div>

              {/* Cart */}
              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                <FaCartShopping
                  size={20}
                  className="text-white hover:text-gray-200"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-[10px] font-semibold">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <div
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[#28a745] font-bold">
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                  {isProfileOpen ? (
                    <FaTimes className="text-white" size={16} />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {user.firstName}
                    </span>
                  )}
                </div>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200 transform transition-all duration-200">
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <p className="font-bold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <a
                        onClick={() => {
                          navigate("/profile");
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 cursor-pointer"
                      >
                        <FaUser className="mr-3 text-gray-500" size={14} />
                        My Profile
                      </a>
                      <a
                        onClick={() => {
                          navigate("/activities");
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 cursor-pointer"
                      >
                        <FaHistory className="mr-3 text-gray-500" size={14} />
                        My Activities
                      </a>
                      <a
                        onClick={() => {
                          navigate("/orders");
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 cursor-pointer"
                      >
                        <FaBox className="mr-3 text-gray-500" size={14} />
                        My Orders
                      </a>
                      <a
                        onClick={() => {
                          navigate("/settings");
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 cursor-pointer"
                      >
                        <FaCog className="mr-3 text-gray-500" size={14} />
                        Settings
                      </a>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-200 py-1 bg-gray-50">
                      <a
                        onClick={handleLogout}
                        className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer font-medium"
                      >
                        <FaSignOutAlt className="mr-3" size={14} />
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a
                onClick={() => navigate("/login")}
                className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
              >
                <FaSignInAlt size={18} /> Login
              </a>
              <a
                onClick={() => navigate("/login")}
                className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
              >
                <FaUserCheck size={18} /> Sign Up
              </a>

              {/* Agroagency Corner (visible for all) */}
              <a
                onClick={() => navigate("/agroagency")}
                className="text-white font-semibold text-sm flex items-center gap-2 hover:text-gray-200 cursor-pointer"
              >
                <FaBuilding size={18} /> AGROAGENCY
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
