// import { useState } from "react";
// import Header from "../../../../components/Header/Header";
// import Navbar from "../../../../components/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { FaSpinner } from "react-icons/fa";

// const Payment = () => {
//   const [method, setMethod] = useState("card");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = () => {
//     setIsProcessing(true);    

//     // Simulate payment delay
//     setTimeout(() => {
//       setIsProcessing(false);
//       navigate("/payment-success");
//     }, 2500); // 2.5 seconds fake processing
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 relative">
//       <Header />
//       <Navbar />

//       <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-md relative z-10">
//         <h2 className="text-2xl font-bold mb-6">Order Overview - 1480.00</h2>

//         {/* Select Payment Method */}
//         <div className="mb-6">
//           <label className="block mb-2 font-medium">
//             Select Payment Method
//           </label>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setMethod("card")}
//               className={`px-4 py-2 border rounded ${
//                 method === "card" ? "bg-blue-600 text-white" : "bg-white"
//               }`}
//             >
//               Credit / Debit Card
//             </button>
//             <button
//               onClick={() => setMethod("upi")}
//               className={`px-4 py-2 border rounded ${
//                 method === "upi" ? "bg-blue-600 text-white" : "bg-white"
//               }`}
//             >
//               UPI
//             </button>
//             <button
//               onClick={() => setMethod("netbanking")}
//               className={`px-4 py-2 border rounded ${
//                 method === "netbanking" ? "bg-blue-600 text-white" : "bg-white"
//               }`}
//             >
//               Net Banking
//             </button>
//           </div>
//         </div>

//         {/* Card Payment */}
//         {method === "card" && (
//           <form className="grid grid-cols-2 gap-4">
//             <input
//               placeholder="First Name"
//               className="border p-2 rounded"
//               required
//             />
//             <input
//               placeholder="Last Name"
//               className="border p-2 rounded"
//               required
//             />
//             <input
//               placeholder="Card Number"
//               className="border p-2 rounded col-span-2"
//               required
//             />
//             <input placeholder="CVV" className="border p-2 rounded" required />
//             <div className="flex space-x-2 col-span-2">
//               <select className="border p-2 rounded">
//                 <option>Month</option>
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i}>{i + 1}</option>
//                 ))}
//               </select>
//               <select className="border p-2 rounded">
//                 <option>Year</option>
//                 {[...Array(10)].map((_, i) => (
//                   <option key={i}>{2025 + i}</option>
//                 ))}
//               </select>
//             </div>
//           </form>
//         )}

//         {/* UPI */}
//         {method === "upi" && (
//           <div className="mt-4">
//             <input
//               placeholder="Enter UPI ID (e.g. yourname@upi)"
//               className="border p-2 rounded w-full"
//             />
//           </div>
//         )}

//         {/* Net Banking */}
//         {method === "netbanking" && (
//           <div className="mt-4">
//             <label className="block mb-2 font-medium">Select Bank</label>
//             <select className="border p-2 rounded w-full">
//               <option>-- Select Bank --</option>
//               <option>State Bank of India</option>
//               <option>ICICI Bank</option>
//               <option>HDFC Bank</option>
//               <option>Axis Bank</option>
//             </select>
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="mt-6 flex justify-between">
//           <button
//             className="bg-gray-600 text-white px-6 py-2 rounded"
//             onClick={() => navigate("/payment-cancel")}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-60"
//             onClick={handlePayment}
//             disabled={isProcessing}
//           >
//             {isProcessing ? "Processing..." : "Submit Payment"}
//           </button>
//         </div>
//       </div>

//       {/* Loader Overlay */}
//       {isProcessing && (
//         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
//           <div className="bg-white px-6 py-4 rounded-md shadow-lg text-center">
//             <FaSpinner className="animate-spin text-3xl text-blue-600 mx-auto mb-2" />
//             <p className="text-lg font-medium">Processing your payment...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;



import { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [items, setItems] = useState([{ name: "", price: "", quantity: "" }]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const prodName = items.map((item) => item.name);
      const prices = items.map((item) => parseInt(item.price));
      const quantities = items.map((item) => parseInt(item.quantity));

      const response = await axios.post(
        "http://localhost:8080/api/stripe/create-checkout-session",
        {
          prodName,
          prices,
          quantities,
        }
      );

      window.location.href = response.data.checkoutUrl;
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Failed to initiate payment. Please check the console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Stripe Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={item.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="text-blue-600 hover:underline"
        >
          + Add another product
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default Payment;
