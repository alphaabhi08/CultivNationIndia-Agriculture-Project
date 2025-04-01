import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Navbar from "../../../../components/Navbar/Navbar";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">
            Payment Successfull
          </h1>
          <p className="mt-2">Thank you for your purchase.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
}
