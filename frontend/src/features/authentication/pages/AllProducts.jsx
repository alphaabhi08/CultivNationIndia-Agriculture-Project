import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { fetchProductsApi } from "../../agroagency/api/agencyService";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  // Available categories (you can modify these as needed)
  const categories = [
    "Vegetables",
    "Fruits",
    "Crops",
    "Fertilizer",
    "Seeds",
    "Herbs",
    "Tools",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsApi();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, priceRange, selectedCategories, products]);

  const applyFilters = () => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.prodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.prodTypes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.bestPrice >= priceRange[0] && product.bestPrice <= priceRange[1]
    );

    // Apply category filter if any categories are selected
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.some((category) =>
          product.prodTypes.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    setFilteredProducts(result);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaFilter className="mr-2" /> Filters
              </h2>

              {/* Search Filter */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 pl-10 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <div className="p-4">
                      <img
                        src={`data:${product.imageType};base64,${product.imageData}`}
                        alt={product.prodName}
                        className="w-full h-48 object-contain mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-1">
                        {product.prodName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.prodTypes}
                      </p>
                      <div className="flex items-center mb-1">
                        <span className="text-gray-400 line-through mr-2">
                          ₹{product.currMarketPrice}
                        </span>
                        <span className="text-green-600 font-bold">
                          ₹{product.bestPrice}
                        </span>
                      </div>
                      <button className="w-full bg-green-600 text-white py-2 text-center font-semibold rounded-md mt-3 hover:bg-green-700 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">
                    No products match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setPriceRange([0, 3000]);
                      setSelectedCategories([]);
                    }}
                    className="mt-4 text-green-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
