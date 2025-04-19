import { useState } from "react";
import { addProductApi } from "../../api/agencyService";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [productData, setProductData] = useState({
    prodName: "",
    prodTypes: "",
    inStock: "",
    currMarketPrice: "",
    bestPrice: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!imageFile) {
      setErrorMessage("Please select an image file.");
    }

    try {
      await addProductApi(productData, imageFile);
      setSuccessMessage("Product added successfully!");
      toast.success("Product added successfully!");
      setProductData({
        prodName: "",
        prodTypes: "",
        currMarketPrice: "",
        bestPrice: "",
        inStock: "",
        description: "",
      });
      setImageFile(null);
    } catch (error) {
      setErrorMessage(error.message);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg ml-[180px] mt-[30px] shadow-md w-full max-w-[50rem]">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="w-full font-semibold">Product Name:</label>
            <input
              type="text"
              name="prodName"
              value={productData.prodName}
              onChange={handleChange}
              // placeholder="Enter product name"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block font-semibold">Product Type:</label>
            <select
              name="prodTypes"
              value={productData.prodTypes}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
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
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">In Stock Quantity:</label>
            <input
              type="number"
              name="inStock"
              value={productData.inStock}
              onChange={handleChange}
              // placeholder="Enter Stock Quantity of Product"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
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
              // placeholder="Enter Market price"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Best Price We Offer:</label>
            <input
              type="number"
              name="bestPrice"
              value={productData.bestPrice}
              onChange={handleChange}
              // placeholder="Enter best price"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            rows="4"
            value={productData.description}
            onChange={handleChange}
            onFocus={() => setErrorMessage("")}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-center text-white font-bold p-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
