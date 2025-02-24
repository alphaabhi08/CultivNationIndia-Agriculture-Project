import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { agencySignupApi } from "../../api/agencyService";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";

export default function AgencySignup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("No file chosen");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const doSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;

    const signupData = Object.fromEntries(new FormData(form).entries());

    try {
      await agencySignupApi(signupData, imageFile);
      console.log("Signup Successfull");
      navigate("/agro-login");
    } catch (error) {
      setErrorMessage(error.message || "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[300px] mt-[330px] mb-[330px] ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">AgroAgency Registration</h1>

          <form onSubmit={doSignup}>
            <div className="mt-4 text-left">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Agency Name
              </label>
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>
            <div className="mt-4 text-left">
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
            <div className="mt-4 text-left">
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
            <div className="mt-4 text-left">
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
                }
              />
            </div>
            <div className="mt-4 text-left">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>
            <div className="mt-4 text-left">
              <label
                htmlFor="town"
                className="block text-sm font-medium text-gray-700"
              >
                Town
              </label>
              <input
                type="town"
                id="town"
                name="town"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>
            <div className="mt-4 text-left">
              <label
                htmlFor="certificateImage"
                className="block text-sm font-medium text-red-600 mb-2"
              >
                Upload your Agroagency Register Certificate*
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="certificateImage"
                  name="certificateImage"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
                <div className="w-full cursor-pointer  py-2  text-gray-700 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <span className="borde bg-gray-200 px-3 py-2 rounded-l-md cursor-pointer ">
                    Choose File
                  </span>
                  <span className="ml-2 text-gray-500 truncate">
                    {imageFileName}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-left">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-green-600 mb-2"
              >
                Enter Your AgroShop Full Address
              </label>
              <textarea
                id="address"
                name="address"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                rows="4"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              className={`w-full mt-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-md
              ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }
            `}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
          <div className="mt-1 text-gray-600 text-sm">Or</div>
          <div className="mt-1 text-sm">
            Already have an account?{" "}
            <Link
              to="/agroagency/agro-login"
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
