import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../api/authService";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const doSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const signupData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      state: e.target.state.value,
      town: e.target.town.value,
      village: e.target.village.value,
      mobile: e.target.mobile.value,
      soilType: e.target.soilType.value,
    };

    try {
      await signupApi(signupData); // Ensure your signup function sends all data
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[300px] mt-[250px] mb-[250px] ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-5">Sign up</h1>

          <form onSubmit={doSignup}>
            {/* First Name & Last Name Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  onFocus={() => setErrorMessage("")}
                  required
                />
              </div>
              <div className="text-left">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  onFocus={() => setErrorMessage("")}
                  required
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="text-left">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  onFocus={() => setErrorMessage("")}
                  required
                />
              </div>
              <div className="text-left">
                <label
                  htmlFor="town"
                  className="block text-sm font-medium text-gray-700"
                >
                  Town
                </label>
                <input
                  type="text"
                  id="town"
                  name="town"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  onFocus={() => setErrorMessage("")}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-2 text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>

            {/* Password */}
            <div className="mt-2 text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>

            <div className="mt-2 text-left">
              <label
                htmlFor="village"
                className="block text-sm font-medium text-gray-700"
              >
                Village
              </label>
              <input
                type="text"
                id="village"
                name="village"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>

            <div className="mt-2 mb-4 text-left">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                } // Filters out non-numeric input
              />
            </div>

            <div className="mt-[-5px] text-left">
              <label
                htmlFor="soilType"
                className="block text-sm font-medium text-gray-700"
              >
                Soil Type
              </label>
              <select
                id="soilType"
                name="soilType"
                className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Soil Type</option>
                <option value="loamy">Loamy</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="saline">Saline</option>
                <option value="peat">Peat</option>
              </select>
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}

            <p className="mt-2 text-xs text-gray-600">
              By clicking Agree & Join or Continue, you agree to{" "}
              <a href="#" className="text-green-600 hover:underline">
                User Agreement
              </a>
              ,{" "}
              <a href="#" className="text-green-600 hover:underline">
                Privacy Policy
              </a>
              , and{" "}
              <a href="#" className="text-green-600 hover:underline">
                Cookie Policy
              </a>
              .
            </p>

            <button
              type="submit"
              className={`w-full mt-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-md ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Agree & Join"}
            </button>
          </form>

          <div className="mt-1 text-gray-600 text-sm">Or</div>

          <div className="mt-1 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
