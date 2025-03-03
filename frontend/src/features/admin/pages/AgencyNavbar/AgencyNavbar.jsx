import { useLocation, useNavigate } from "react-router-dom";
import { useAgroAuthentication } from "../../context/AgroAuthContextProvider";
import { FaBuilding, FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Header from "../../../../components/Header/Header";

export default function AgencyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agroUser } = useAgroAuthentication();

  const isLoggedIn = !!agroUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/agroagency/agro-login");
  };

  return (
    <>
    <Header />
    <header className="bg-[#28a745] text-white text-sm font-bold flex justify-between items-center p-4 ">
      {/* Logo Section */}
      <div
        className="text-2xl font-bold cursor-pointer gap-0.5 flex items-center ml-16"
        onClick={() => navigate("/agroagency")}
      >
        <span className="text-[#f18006]">CultivNation</span>
        <span className="text-white">India</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-14 mr-16">
        <button
          onClick={() => navigate("/agroagency")}
          className={`flex hover:text-gray-300 transition-colors ${
            location.pathname === "/agroagency" ? "text-white" : ""
          }`}
        >
          <FaHome className="mr-2 mt-0.5" /> HOME
        </button>

        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/agroagency/agro-signup")}
              className={`flex hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/agro-signup"
                  ? "underline"
                  : ""
              }`}
            >
              <FaSignOutAlt className="mr-2 mt-0.5" /> REGISTER
            </button>
            <button
              onClick={() => navigate("/agroagency/agro-login")}
              className={`flex hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/agro-login"
                  ? "underline"
                  : ""
              }
                `}
            >
              <FaSignInAlt className="mr-2 mt-0.5" /> LOGIN
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/agroagency/profile")}
              className={`flex hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/profile" ? "underline" : ""
              }`}
            >
              <FaUser className="mr-2 mt-0.5" /> Profile
            </button>
            <button
              onClick={() => navigate("/agroagency/dashboard")}
              className={`flex hover:text-gray-300 transition-colors ${
                location.pathname === "/agroagency/dashboard" ? "underline" : ""
              }`}
            >
              <FaBuilding className="mr-2 mt-0.5" /> Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="flex hover:text-gray-300 transition-colors"
            >
              <FaSignInAlt className="mr-2 mt-0.5" /> Logout
            </button>
          </>
        )}
      </nav>
    </header>
    </>
  );
}
