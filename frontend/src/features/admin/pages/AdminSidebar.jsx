import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFlask,
  FaUsers,
  FaBoxOpen,
  FaEdit,
} from "react-icons/fa";

export default function AdminSidebar() {
  return (
    // <div className="h-screen w-72 bg-gray-900 text-white shadow-lg fixed left-0 top-0">

    <div className="h-screen w-72 bg-gray-900 text-white shadow-lg fixed ">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-center py-5 border-b border-gray-700">
        Admin Panel
      </h2>

      {/* Sidebar Navigation */}
      <ul className="mt-6 space-y-2">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>

        {/* Soil Analysis */}
        <li>
          <Link
            to="/admin/soil-analysis"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaFlask /> Soil Analysis
          </Link>
        </li>

        {/* Add Products */}
        <li>
          <Link
            to="/admin/add-product"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaBoxOpen /> Add Products
          </Link>
        </li>

        {/* Edit Products */}
        <li>
          <Link
            to="/admin/edit-product"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-yellow-500 hover:text-black"
          >
            <FaEdit /> View & Edit Products
          </Link>
        </li>

        {/* Agroagency & Farmer */}
        <li>
          <Link
            to="/admin/agroagency"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaUsers /> Agroagency
          </Link>
        </li>

        <li>
          <Link
            to="/admin/farmers"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaUsers /> Farmers
          </Link>
        </li>
      </ul>
    </div>
  );
}
