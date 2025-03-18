import { Link } from "react-router-dom";

export default function UnderVerification() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-gray-800">
        Your Agroagency is Under Verification
      </h2>
      <p className="text-gray-600 mt-2">
        Please wait for the admin to approve your account.
      </p>
      <p className="text-gray-500 mt-2">Check back later or contact support.</p>
      <Link
        to="/agroagency/agro-login"
        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Login
      </Link>
    </div>
  );
}
