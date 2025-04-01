import { useState } from "react";
import Header from "../../../components/Header/Header";
import { agencyLoginApi } from "../api/agencyService";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
// import UnderVerification from "./UnderVerification";

export default function AgencyLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  const doLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await agencyLoginApi(email, password);
      console.log("Login Successful");

      if (response.accountStatus === "APPROVED") {
        navigate("/agroagency");
      } else {
        // setShowVerification(true);
        navigate("/agroagency");
      }
    } catch (error) {
      setErrorMessage(error.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  // if (showVerification) {
  //   return <UnderVerification />;
  // }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen mt-[-50px]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="mb-2 text-2xl  font-bold">AgroAgency Login</h1>

          <form onSubmit={doLogin}>
            <div className="mb-4 text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4 text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              className={`w-full py-2 text-sm font-medium text-white text-center bg-green-600 rounded-md ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </form>
          <div className="mt-2 text-gray-600 text-sm">Or</div>
          <div className="mt-2 text-sm">
            Don&apos;t Have an Account?{" "}
            <Link
              to="/agroagency/agro-signup"
              className="text-green-600 font-bold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
