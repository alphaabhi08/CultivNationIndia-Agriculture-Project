import {
  // FaMapLocation,
  // FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { FaEnvelope, FaMapLocation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#28a745] text-white p-16 h-auto items-start">
      {/* Contact Info Section */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold border-b-2 border-white pb-2">
          Get In Touch
        </h1>
        <div className="flex items-start gap-4">
          <FaMapLocation className="text-[30px] mt-1" />
          <p className="text-[15px] font-semibold leading-relaxed">
            Shyam Shukan Residency, PDPU Road Corner, Bhaijipura Patiya,
            Kudasan, Gandhinagar
          </p>
        </div>
        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-[20px]" />
          <p className="text-[15px] font-semibold">+91 8488006438</p>
        </div>
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-[20px]" />
          <p className="text-[15px] font-semibold">
            farmbased@cultivnation.com
          </p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold border-b-2 border-white pb-2">
          Quick Links
        </h1>
        <ul className="space-y-4 text-[15px] font-semibold cursor-pointer">
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <FaArrowRight /> Home
          </li>
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <FaArrowRight /> About
          </li>
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <FaArrowRight /> Contact
          </li>
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <FaArrowRight /> Services
          </li>
        </ul>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white rounded-lg p-6 shadow-lg text-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#28a745]">
          Send Us a Message
        </h1>
        <form action="" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-md font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-md font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-md font-semibold">
              Ask Any Query
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full border border-gray-300 p-2 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Type your message here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#28a745] text-white text-center text-sm font-bold p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
