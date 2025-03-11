import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "../api/AdminService";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { token } = await adminLoginApi(email, password);
      localStorage.setItem("adminToken", token);
      navigate("/admin/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg w-full max-w-md shadow-md "
        >
          <h1 className="font-bold text-center text-2xl">Admin Login</h1>

          <div className="mb-4 text-left">
            <label
              htmlFor="email"
              className="block text-sm mt-4 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 mt-1 text-center">{errorMessage}</p>
          )}

          <button className="w-full mt-4 bg-green-600 text-center font-semibold text-sm text-white p-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
