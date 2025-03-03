import { useEffect, useState, useRef } from "react";
import { fetchProductsApi } from "../../../admin/api/agencyService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function OurProducts() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const carouselRef = useRef(null); // Reference for scrolling

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

  // Scroll Left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="p-10 relative ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Our Products
      </h2>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-10 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
      >
        <FaChevronLeft />
      </button>

      {/* Product Row */}
      <div
        ref={carouselRef}
        className="flex justify-center items-center overflow-x-auto space-x-6 scrollbar-hide p-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={`data:${product.imageType};base64,${product.imageData}`}
                alt={product.prodName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{product.prodName}</h3>
              <p className="text-sm text-gray-600">{product.prodTypes}</p>
              <div className="flex">
                <p className="text-red-600 font-bold mt-2 line-through">
                  ₹{product.currMarketPrice}
                </p>
                <p className="text-red-600 font-bold mt-2 ml-1">
                  (Market Price)
                </p>
              </div>
              <p className="text-green-600 font-bold mt-2">
                ₹{product.bestPrice} (Our Price)
              </p>
              <button className="bg-green-600 p-1.5 rounded-md text-white font-semibold mt-2 hover:bg-green-700">
                Enquiry
              </button>
            </div>                                                                                                                                                                                                                                                                  
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-10 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
