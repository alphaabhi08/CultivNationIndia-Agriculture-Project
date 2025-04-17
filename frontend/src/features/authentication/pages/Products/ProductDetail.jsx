// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchSingleProductApi } from "../../../agroagency/api/agencyService";
// import Header from "../../../../components/Header/Header";
// import Navbar from "../../../../components/Navbar/Navbar";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (!id) {
//       setErrorMessage("Product ID is missing.");
//       return;
//     }

//     const fetchProduct = async () => {
//       try {
//         const data = await fetchSingleProductApi(id);
//         setProduct(data);
//       } catch (error) {
//         setErrorMessage(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <div className="text-center text-3xl font-bold">Loading...</div>;
//   if (errorMessage) return <div className="text-center text-red-600 text-2xl">{errorMessage}</div>;
//   if (!product) return <div className="text-center text-gray-600 text-2xl">Product not found.</div>;

//   return (
//     <>
//       <Header />
//       <Navbar />
      
      
//       <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-6 lg:px-16 py-10">
//         <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-6 lg:p-12 flex flex-col lg:flex-row items-center lg:items-start space-y-10 lg:space-y-0 lg:space-x-14">
          
          
//           <div className="w-full lg:w-1/2 flex justify-center">
//             {product.imageData ? (
//               <img
//                 src={`data:${product.imageType};base64,${product.imageData}`}
//                 alt={product.prodName}
//                 className="w-full max-w-lg md:max-w-xl h-auto object-cover rounded-xl shadow-lg"
//               />
//             ) : (
//               <p className="text-gray-500 text-lg">No Image Available</p>
//             )}
//           </div>

        
//           <div className="w-full lg:w-1/2 text-center lg:text-left">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{product.prodName}</h1>
//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mt-2">{product.prodTypes}</h2>

            
//             <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4">
//               <p className="text-3xl md:text-4xl font-semibold text-red-600">₹{product.bestPrice}</p>
//               <p className="text-xl md:text-2xl text-gray-500 line-through">₹{product.currMarketPrice}</p>
//             </div>

//             <p
//               className={`mt-4 text-xl font-semibold ${
//                 product.inStock === "Yes" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {product.inStock === "Yes" ? "In Stock" : "Out of Stock"}
//             </p>

//             {/* ✅ Description */}
//             <h2 className="text-2xl md:text-3xl font-semibold mt-6">Product Description</h2>
//             <p className="text-lg text-gray-700 mt-2">{product.description}</p>

//             {/* ✅ Buy Buttons */}
//             <div className="flex flex-col md:flex-row items-center mt-6 space-y-4 md:space-y-0 md:space-x-6">
//               <button className="w-full md:w-auto bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg md:text-2xl font-semibold shadow-lg hover:bg-yellow-600 transition">
//                 Add to Cart
//               </button>
//               <button className="w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg text-lg md:text-2xl font-semibold shadow-lg hover:bg-orange-700 transition">
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetail;
