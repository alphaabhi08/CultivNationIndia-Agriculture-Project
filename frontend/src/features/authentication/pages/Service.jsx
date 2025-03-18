import {
  FaSearch,
  FaShoppingCart,
  FaCloudRain,
  FaTractor,
  FaGraduationCap,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Service() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-8 p-16 mt-10">
      <div className="mb-10">
        <h1 className="text-green-500 font-bold text-xl">SERVICES</h1>
        <h2 className="text-5xl font-bold mt-2">Our Farming Services</h2>
        <p className="mt-6 text-gray-700">
          At CultivNationIndia, we are dedicated to providing a comprehensive
          suite of services designed to empower farmers and agriculture
          enthusiasts with the knowledge, resources, and support they need for
          successful and sustainable farming practices.
        </p>
      </div>

      {/* Soil Analysis */}
      <div
        className="p-6 rounded-lg shadow-lg bg-white hover:bg-green-500 group transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/soil-analysis")}
      >
        <FaSearch className="text-green-500 text-6xl ml-40 mb-10 group-hover:text-white" />
        <div className="flex justify-center items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white">
            Soil Analysis
          </h3>
        </div>
        <p className="text-gray-700 text-center group-hover:text-white">
          CultivNationIndia&apos;s Soil Analysis Service is your first step
          towards cultivating a thriving and sustainable agriculture venture.
        </p>
      </div>

      {/* Quick Enquiry */}
      <div className="p-6 rounded-lg shadow-lg bg-white hover:bg-green-500 group transition-colors duration-300 cursor-pointer">
        <FaShoppingCart className="text-green-500 text-6xl ml-40 mb-10 group-hover:text-white" />
        <div className="flex justify-center items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white">
            Quick Enquiry
          </h3>
        </div>
        <p className="text-gray-700 text-center group-hover:text-white">
          These quick enquiry services offer immediate and valuable information
          related to crops, fertilizers, vegetables, seeds, and fruits on the
          CultivNationIndia platform.
        </p>
      </div>

      {/* Weather Conditions */}
      <div
        className="p-6 rounded-lg shadow-lg bg-white hover:bg-green-500 group transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/weather")}
      >
        <FaCloudRain className="text-green-500 text-6xl ml-40 mb-10 group-hover:text-white" />
        <div className="flex justify-center items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white">
            Weather Conditions
          </h3>
        </div>
        <p className="text-gray-700 text-center group-hover:text-white">
          At CultivNationIndia, we understand the role of weather conditions and
          provide accurate weather forecasts to optimize farming decisions.
        </p>
      </div>

      {/* Agriculture Farmer Training */}
      <div className="p-6 rounded-lg shadow-lg bg-white hover:bg-green-500 group transition-colors duration-300 cursor-pointer">
        <FaTractor className="text-green-500 text-6xl ml-40 mb-10 group-hover:text-white" />
        <div className="flex justify-center items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white">
            Agriculture Farmer Training
          </h3>
        </div>
        <p className="text-gray-700 text-center group-hover:text-white">
          We offer specialized farmer training programs to promote sustainable
          and innovative agricultural practices.
        </p>
      </div>

      {/* Agro Student Training */}
      <div className="p-6 rounded-lg shadow-lg bg-white hover:bg-green-500 group transition-colors duration-300 cursor-pointer">
        <FaGraduationCap className="text-green-500 text-6xl ml-40 mb-10 group-hover:text-white" />
        <div className="flex justify-center items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white">
            Agro Student Training
          </h3>
        </div>
        <p className="text-gray-700 text-center group-hover:text-white mb-8">
          Our Agro Student Training program provides educational opportunities
          to cultivate the next generation of agricultural experts.
        </p>
      </div>
    </div>
  );
}
