import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFlask,
  FaUsers,
  FaBoxOpen,
  FaEdit,
  FaEnvelope,
} from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";

export default function AdminSidebar() {
  return (
    <div className="h-screen w-72 bg-gray-900 text-white shadow-lg fixed top-18">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-center py-5 border-b border-gray-700">
        Admin Panel
      </h2>

      {/* Sidebar Navigation */}
      <ul className="mt-6 space-y-2">
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-3 p-4 font-semibold rounded-lg transition hover:bg-gray-700"
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
            to="/admin/view-product"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-yellow-500 hover:text-black"
          >
            <FaEdit /> View & Edit Products
          </Link>
        </li>

        {/* Agroagency & Farmer */}
        <li>
          <Link
            to="/admin/agroagencies"
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

        <li>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaCartFlatbed /> Users Order
          </Link>
        </li>
        <li>
          <Link
            to="/admin/contacts"
            className="flex items-center gap-3 p-4 rounded-lg transition hover:bg-gray-700"
          >
            <FaEnvelope /> Contact Request
          </Link>
        </li>
      </ul>
    </div>
  );
}
