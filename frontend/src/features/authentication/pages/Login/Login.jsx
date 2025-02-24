import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../context/AuthContextProvider";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthentication();

  const doLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      await login(email, password);
      setIsLoading(true);
      const destination = location.state?.from || "/";
      navigate(destination);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-[-50px] items-center h-screen mb-[-30px] ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="mb-2 text-2xl font-bold">Sign in</h1>

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
                id="email"
                name="email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
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
                id="password"
                name="password"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                onFocus={() => setErrorMessage("")}
                required
              />
            </div>

            {errorMessage && (
              <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
            )}

            <p className="mb-4 text-xs text-gray-600">
              By clicking Signing, you agree to{" "}
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
              className={`w-full py-2 text-sm font-medium text-white text-center bg-green-600 rounded-md ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>

            <Link
              to="/request-password-reset"
              className=" flex justify-start text-start text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </form>

          <div className="mt-2 text-gray-600 text-sm">Or</div>

          <div className="mt-2 text-sm">
            New Here?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
