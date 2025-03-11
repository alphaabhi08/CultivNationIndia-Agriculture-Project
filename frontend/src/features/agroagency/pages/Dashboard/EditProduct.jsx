import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProductApi,
  updateProductsApi,
} from "../../api/agencyService";

export default function EditProduct() {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    prodName: "",
    prodTypes: "",
    inStock: "",
    currMarketPrice: "",
    bestPrice: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchSingleProductApi(productId);
        setProductData({
          prodName: data.prodName,
          prodTypes: data.prodTypes,
          inStock: data.inStock,
          currMarketPrice: data.currMarketPrice,
          bestPrice: data.bestPrice,
          description: data.description,
        });

        // Convert base64 image to preview URL
        if (data.imageData) {
          setPreviewImage(`data:${data.imageType};base64,${data.imageData}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch product details.");
        throw error;
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview of new image
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateProductsApi(productId, productData, imageFile);
      setSuccessMessage("Product updated successfully!");
      navigate("/agroagency/dashboard/view-products"); // Redirect to product list
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg ml-[180px] mt-[30px] shadow-md w-full max-w-[50rem]">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Product
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold">Product Name:</label>
            <input
              type="text"
              name="prodName"
              value={productData.prodName}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Product Type:</label>
            <select
              name="prodTypes"
              value={productData.prodTypes}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Select product type</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Crops">Crops</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Herbs">Herbs</option>
              <option value="Seeds">Seeds</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Product Preview"
                className="mt-2 w-18 h-18 object-cover rounded-lg"
              />
            )}
          </div>
          <div>
            <label className="block font-semibold">In Stock Quantity:</label>
            <input
              type="number"
              name="inStock"
              value={productData.inStock}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold">Current Market Price:</label>
            <input
              type="number"
              name="currMarketPrice"
              value={productData.currMarketPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold">Best Price We Offer:</label>
            <input
              type="number"
              name="bestPrice"
              value={productData.bestPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            name="description"
            rows="4"
            value={productData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-center text-white font-bold p-2 rounded-lg hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
