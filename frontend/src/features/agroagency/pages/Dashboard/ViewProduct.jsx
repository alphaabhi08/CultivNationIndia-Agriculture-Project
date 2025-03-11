import { useEffect, useState } from "react";
import { deleteProductApi, fetchProductsApi } from "../../api/agencyService";
import { Link } from "react-router-dom";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductApi(productId);
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        // setErrorMessage(error.message);
        setErrorMessage("Product Deleted successfully.", error);
      }
    }
  };

  return (
    <div className="ml-[100px] mt-[30px] p-6 max-w-[61rem] bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        View All Products
      </h2>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <div className="grid grid-cols-3 ml-[65px] gap-6 w-200">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <img
              src={`data:${product.imageType};base64,${product.imageData}`}
              alt={product.prodName}
              className="w-full h-40 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{product.prodName}</h3>
            <p className="text-sm text-gray-600">{product.prodTypes}</p>
            <p className="text-green-600 font-bold mt-2">
              ₹{product.bestPrice} (Best Price)
            </p>
            <div>
              <Link to={`/agroagency/dashboard/edit-product/${product.id}`}>
                <button className="bg-green-500 p-1.5 rounded-md text-white font-semibold hover:bg-green-600">
                  Edit
                </button>
              </Link>
              <br />
              {/* <Link to="delete"> */}
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 mt-2 p-1.5 rounded-md text-white font-semibold hover:bg-red-600"
              >
                Delete
              </button>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
