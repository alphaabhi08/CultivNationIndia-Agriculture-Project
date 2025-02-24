import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center h-[50px] bg-white p-2.5">
        <div className="flex items-center text-gray-700 font-bold text-sm ml-5">
          <FaPhoneAlt className="text-[#28a745] mr-2 text-lg" />
          <span>+91 8488006438</span>
        </div>

        <Link to="/">
          <div className="text-2xl font-bold cursor-pointer">
            <span className="text-orange-500">CultivNation</span>
            <span className="text-[#28a745]">India</span>
          </div>
        </Link>

        <div className="flex gap-3">
          <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#28a745] rounded-full cursor-pointer transition-colors hover:bg-black">
            <FaTwitter className="text-white text-[20px]" />
          </div>
          <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#28a745] rounded-full cursor-pointer transition-colors hover:bg-gray-800">
            <FaFacebook className="text-white text-[20px]" />
          </div>
          <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#28a745] rounded-full cursor-pointer transition-colors hover:bg-gray-800">
            <FaLinkedin className="text-white text-[20px]" />
          </div>
          <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#28a745] rounded-full cursor-pointer transition-colors hover:bg-gray-800">
            <FaInstagram className="text-white text-[20px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
