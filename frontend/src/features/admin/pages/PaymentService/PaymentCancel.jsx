import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Navbar from "../../../../components/Navbar/Navbar";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Payment Cancelled!
          </h1>
          <p className="mt-2">Oops! Something went wrong. Try again later.</p>
          <button
            onClick={() => navigate("/cart")}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </>
  );
}
