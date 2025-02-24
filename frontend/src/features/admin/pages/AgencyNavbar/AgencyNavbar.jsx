// import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAgroAuthentication } from "../../context/AgroAuthContextProvider";

export default function AgencyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agroUser, setAgroUser } = useAgroAuthentication();

  const isLoggedIn = !!agroUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/agroagency/agro-login");
  };

  return (
    <header className="bg-[#28a745] text-white text-sm font-bold flex justify-between items-center p-4 ">
      {/* Logo Section */}
      <div
        className="text-2xl font-bold cursor-pointer gap-0.5 flex items-center ml-16"
        onClick={() => navigate("/")}
      >
        <span className="text-[#f18006]">CultivNation</span>
        <span className="text-white">India</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-16 mr-16">
        <button
          onClick={() => navigate("/agroagency")}
          className={`hover:text-gray-300 transition-colors ${
            location.pathname === "/agroagency" ? "text-white" : ""
          }`}
        >
          HOME
        </button>

        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/agroagency/agro-signup")}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/agro-signup"
                  ? "underline"
                  : ""
              }`}
            >
              REGISTER
            </button>
            <button
              onClick={() => navigate("/agroagency/agro-login")}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/agro-login"
                  ? "underline"
                  : ""
              }
                `}
            >
              LOGIN
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/agroagency/profile")}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/profile" ? "underline" : ""
              }`}
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
