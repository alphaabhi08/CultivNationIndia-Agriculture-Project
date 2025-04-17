// // import { useEffect, useState, useRef } from "react";
// // import { fetchProductsApi } from "../../../admin/api/agencyService";
// // import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// // export default function OurProducts() {
// //   const [products, setProducts] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const carouselRef = useRef(null); // Reference for scrolling

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const data = await fetchProductsApi();
// //         setProducts(data);
// //       } catch (error) {
// //         setErrorMessage(error.message);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   // Scroll Left
// //   const scrollLeft = () => {
// //     if (carouselRef.current) {
// //       carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
// //     }
// //   };

// //   // Scroll Right
// //   const scrollRight = () => {
// //     if (carouselRef.current) {
// //       carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
// //     }
// //   };

// //   return (
// //     <div className="p-10 relative ">
// //       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
// //         Our Products
// //       </h2>

// //       {errorMessage && (
// //         <p className="text-red-500 text-center">{errorMessage}</p>
// //       )}

// //       {/* Left Scroll Button */}
// //       <button
// //         onClick={scrollLeft}
// //         className="absolute left-10 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
// //       >
// //         <FaChevronLeft />
// //       </button>

// //       {/* Product Row */}
// //       <div
// //         ref={carouselRef}
// //         className="flex justify-center items-center overflow-x-auto space-x-6 scrollbar-hide p-4"
// //         style={{ scrollBehavior: "smooth" }}
// //       >
// //         {products.length > 0 ? (
// //           products.map((product) => (
// //             <div
// //               key={product.id}
// //               className="w-[250px] bg-white p-4 rounded-lg shadow-md"
// //             >
// //               <img
// //                 src={`data:${product.imageType};base64,${product.imageData}`}
// //                 alt={product.prodName}
// //                 className="w-full h-40 object-contain rounded-md"
// //               />
// //               <h3 className="text-lg font-semibold mt-3">{product.prodName}</h3>
// //               <p className="text-sm text-gray-600">{product.prodTypes}</p>
// //               <div className="flex">
// //                 <p className="text-red-600 font-bold mt-2 line-through">
// //                   ₹{product.currMarketPrice}
// //                 </p>
// //                 <p className="text-red-600 font-bold mt-2 ml-1">
// //                   (Market Price)
// //                 </p>
// //               </div>
// //               <p className="text-green-600 font-bold mt-2">
// //                 ₹{product.bestPrice} (Our Price)
// //               </p>
// //               <button className="bg-green-600 p-1.5 rounded-md text-white font-semibold mt-2 hover:bg-green-700">
// //                 Enquiry
// //               </button>
// //             </div>
// //           ))
// //         ) : (
// //           <p className="text-center text-gray-500">No products available</p>
// //         )}
// //       </div>

// //       {/* Right Scroll Button */}
// //       <button
// //         onClick={scrollRight}
// //         className="absolute right-10 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
// //       >
// //         <FaChevronRight />
// //       </button>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { fetchProductsApi } from "../../../agroagency/api/agencyService";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function OurProducts() {
//   const [products, setProducts] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);

//   const PRODUCTS_PER_PAGE = 4;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await fetchProductsApi();
//         setProducts(data);
//       } catch (error) {
//         setErrorMessage(error.message);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

//   const handlePrev = () => {
//     setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
//   };

//   const getCurrentProducts = () => {
//     const start = currentPage * PRODUCTS_PER_PAGE;
//     return products.slice(start, start + PRODUCTS_PER_PAGE);
//   };

//   return (
//     <div className="relative py-12 bg-white">
//       <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
//         Our Products
//       </h2>

//       {errorMessage && (
//         <p className="text-red-500 text-center mb-4">{errorMessage}</p>
//       )}

//       {/* Left Arrow */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
//       >
//         <FaChevronLeft size={20} />
//       </button>

//       <div className="max-w-7xl mx-auto flex justify-center items-center overflow-hidden">
//         <div className="grid grid-cols-4 gap-6 transition-transform duration-500 ease-in-out">
//           {getCurrentProducts().map((product) => (
//             <div
//               key={product.id}
//               className="w-[250px] bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
//             >
//               <img
//                 src={`data:${product.imageType};base64,${product.imageData}`}
//                 alt={product.prodName}
//                 className="w-full h-40 object-contain rounded-md mb-4"
//               />
//               <h3 className="text-xl font-semibold">{product.prodName}</h3>
//               <p className="text-sm text-gray-500">{product.prodTypes}</p>
//               <div className="flex items-center mt-2">
//                 <p className="text-red-500 font-bold line-through">
//                   ₹{product.currMarketPrice}
//                 </p>
//                 <span className="text-red-500 text-sm ml-1">
//                   (Market Price)
//                 </span>
//               </div>
//               <p className="text-green-600 font-bold mt-1">
//                 ₹{product.bestPrice} (Our Price)
//               </p>
//               <Link to = {`/product/${product.id}`}>
//               <button className="w-full bg-green-600 text-center py-2 rounded-md text-white font-semibold mt-4 hover:bg-green-700">
//                 Buy Now
//               </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={handleNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
//       >
//         <FaChevronRight size={20} />
//       </button>
//     </div>
//   );
// }
