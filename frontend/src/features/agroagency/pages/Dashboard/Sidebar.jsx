import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-74 bg-[#1f2937] text-white h-screen p-5 fixed top-28">
      <ul className="space-y-4 mt-4">
        <li>
          <Link
            to="/agroagency"
            className="bg-white h-[40px] flex mt-6 justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="add-product"
            className="bg-white h-[40px] mt-6 flex justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            Add New Product
          </Link>
        </li>
        <li>
          <Link
            to="view-products"
            className="bg-white h-[40px] mt-6 flex justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            View All Products
          </Link>
        </li>
        <li>
          <Link
            to="soilrequest"
            className="bg-white h-[40px] mt-6 flex justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            Soil Analysis Request
          </Link>
        </li>
        <li>
          <Link
            to="farmers"
            className="bg-white h-[40px] mt-6 flex justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            Farmers
          </Link>
        </li>
        <li>
          <Link
            to="orders"
            className="bg-white h-[40px] mt-6 flex justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            Users Order
          </Link>
        </li>
        <li>
          <Link
            to="contacts"
            className="bg-white h-[40px] mt-6 flex justify-center items-center text-black font-bold rounded-2xl hover:shadow-md shadow-black hover:shadow-green-500 transition duration-300"
          >
            Contact Request
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
