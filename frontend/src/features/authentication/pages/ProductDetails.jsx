import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProductApi,
  fetchProductsApi,
} from "../../agroagency/api/agencyService";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { addToCartApi, getCartItemsApi } from "../api/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/cartSlice";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(null); // ✅ Reset product when switching
      setErrorMessage(""); // ✅ Reset error message

      try {
        const data = await fetchSingleProductApi(productId);
        setProduct(data);
      } catch (error) {
        setErrorMessage("Failed to fetch product details.", error);
      }
    };

    const fetchRecommendedProducts = async () => {
      try {
        const products = await fetchProductsApi();
        // Exclude the current product and pick 4 random ones
        const recommended = products
          .filter((p) => p.id !== parseInt(productId))
          .slice(0, 4);
        setRecommendedProducts(recommended);
      } catch (error) {
        console.error("Failed to fetch recommended products:", error);
      }
    };

    fetchProduct();
    fetchRecommendedProducts();
  }, [productId]);

  const addToCart = async () => {
    try {
      await addToCartApi(product.id, quantity);
      toast.success("Product added to cart successfully!");

      const updatedCart = await getCartItemsApi();
      const totalItem = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      dispatch(setCartCount(totalItem));
    } catch (error) {
      toast.error("Failed to add to cart: " + error.message);
    }
  };

  if (!product)
    return (
      <p className="text-center text-gray-600 text-xl py-20">Loading...</p>
    );

  return (
    <>
      <Header />
      <Navbar />

      <div className="max-w-6xl mx-auto py-16 px-6">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-lg shadow-xl">
          {/* Product Image Section */}
          <div className="flex justify-center">
            <img
              src={`data:${product.imageType};base64,${product.imageData}`}
              alt={product.prodName}
              className="w-[400px] h-[400px] object-contain rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {product.prodName}
            </h2>
            <p className="text-gray-500 mt-2 text-lg">{product.prodTypes}</p>

            <div className="mt-4 text-[22px]">
              <div className="flex text-red-500 gap-1">
                <p className="font-bold line-through">
                  ₹{product.currMarketPrice}{" "}
                </p>
                <span className="text-sm line-through font-bold mt-2">
                  (Market Price)
                </span>
              </div>

              <p className="text-green-600 font-bold text-[22px]">
                ₹{product.bestPrice}{" "}
                <span className="text-sm">(Our Price)</span>
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <label className="text-gray-700 text-md">
                <strong>Quantity:</strong>
              </label>
              <input
                type="number"
                value={quantity}
                min="1"
                max={product.inStock}
                className="w-16 border border-gray-300 rounded text-center"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <p className="text-gray-700 mt-4 text-md">
              <strong>Stock Available:</strong> {product.inStock} units
            </p>

            <p className="text-gray-700 mt-3 text-md">
              <strong>About:</strong> {product.description}
            </p>

            <div className="flex gap-6 mt-8">
              <button
                className="flex-1 text-md text-center bg-yellow-500 text-white py-3 rounded-md font-semibold hover:bg-yellow-600 shadow-lg transition"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button className="flex-1 text-md text-center bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 shadow-lg transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Recommended Products
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedProducts.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <img
                  src={`data:${item.imageType};base64,${item.imageData}`}
                  alt={item.prodName}
                  className="w-full h-36 object-contain rounded-md"
                />
                <h4 className="text-lg font-semibold mt-2">{item.prodName}</h4>
                <p className="text-gray-500 text-sm">{item.prodTypes}</p>
                <p className="text-green-600 font-bold mt-1">
                  ₹{item.bestPrice} (Our Price)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
