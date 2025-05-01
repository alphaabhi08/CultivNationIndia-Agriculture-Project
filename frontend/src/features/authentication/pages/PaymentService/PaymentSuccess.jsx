// import { useNavigate } from "react-router-dom";
// import Header from "../../../../components/Header/Header";
// import Navbar from "../../../../components/Navbar/Navbar";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <Header />
//       <Navbar />
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-green-600">
//             Payment Successfull
//           </h1>
//           <p className="mt-2">Thank you for your purchase.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Navbar from "../../../../components/Navbar/Navbar";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-center items-center mt-[130px] bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful
          </h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
}
