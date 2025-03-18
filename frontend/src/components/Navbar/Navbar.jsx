import {
  FaHome,
  FaGlobe,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBuilding,
} from "react-icons/fa";
import { useAuthentication } from "../../features/authentication/context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuthentication() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div className=" bg-[#28a745] flex items-center p-4 pl-12">
        <nav className="flex gap-[50px] justify-start ml-[30px]">
          <a
            onClick={() => navigate("/")}
            href="/"
            className="text-white font-bold text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
          >
            <FaHome className="mt-[-3px]" /> HOME
          </a>
          <a
            href="/about"
            className="text-white font-bold text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
          >
            <FaGlobe className="mt-[-2px]" /> ABOUT
          </a>

          {/* <a
            href="contact"
            className="text-white text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
          >
            <FaEnvelope /> CONTACT
          </a> */}

          {user ? (
            <>
              <a
                onClick={() => navigate("/profile")}
                className="text-white font-bold text-nowrap text-sm flex items-center gap-2 transition-colors hover:text-gray-300 cursor-pointer"
              >
                <FaUser /> {user.firstName}
              </a>

              <a
                href="logout"
                onClick={handleLogout}
                className="text-white font-bold text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
              >
                <FaSignOutAlt className="" /> Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="login"
                className="text-white font-bold  text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
              >
                <FaSignInAlt /> Login
              </a>
              <a
                href="signup"
                className="text-white font-bold  text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
              >
                <FaSignOutAlt /> SignUp
              </a>
              <nav className="flex justify-end items-end pl-[720px]">
                <a
                  onClick={() => navigate("/agroagency")}
                  className="text-white font-bold cursor-pointer text-sm flex items-center gap-2 transition-colors hover:text-gray-300"
                >
                  <FaBuilding className="mt-[-3px] text-nowrap" /> AGROAGENCY
                  CORNER
                </a>
              </nav>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
