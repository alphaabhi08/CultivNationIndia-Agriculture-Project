import { useEffect, useState } from "react";
import { fetchProductsApi } from "../../agroagency/api/agencyService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OurProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const PRODUCTS_PER_PAGE = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsApi();
        setProducts(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const getCurrentProducts = () => {
    const start = currentPage * PRODUCTS_PER_PAGE;
    return products.slice(start, start + PRODUCTS_PER_PAGE);
  };

  return (
    <div className="relative py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Products
      </h2>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        <FaChevronLeft size={20} />
      </button>

      <div className="max-w-7xl mx-auto flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-transform duration-500 ease-in-out">
          {getCurrentProducts().map((product) => (
            <div
              key={product.id}
              className="w-[250px] bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={`data:${product.imageType};base64,${product.imageData}`}
                alt={product.prodName}
                className="w-full h-40 object-contain rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{product.prodName}</h3>
              <p className="text-sm text-gray-500">{product.prodTypes}</p>
              <div className="flex items-center mt-2">
                <p className="text-red-500 font-bold line-through">
                  ₹{product.currMarketPrice}
                </p>
                <span className="text-red-500 text-sm ml-1">
                  (Market Price)
                </span>
              </div>
              <p className="text-green-600 font-bold mt-1">
                ₹{product.bestPrice} (Our Price)
              </p>
              <button className="w-full bg-green-600 text-center py-2 rounded-md text-white font-semibold mt-4 hover:bg-green-700">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}
