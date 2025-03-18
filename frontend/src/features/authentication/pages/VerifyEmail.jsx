import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = async (code) => {
    setMessage("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/auth/validate-email-verification-token?otp=${code}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setErrorMessage("");
        navigate("/");
      } else {
        const result = await response.json();
        setErrorMessage(result.message);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailVerificationToken = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/auth/send-email-verification-token`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setErrorMessage("");
        setMessage("Code sent successfully. Please check your email.");
      } else {
        const result = await response.json();
        setErrorMessage(result.message);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white border border-gray-300 rounded-lg text-center shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const code = e.currentTarget.code.value;
          await validateEmail(code);
          setIsLoading(false);
        }}
        className="flex flex-col gap-4 text-sm"
      >
        <p className="text-gray-600">
          Only one step left to complete your registration. Verify your email
          address.
        </p>
        <div className="text-left">
          <label
            htmlFor="code"
            className="block text-gray-700 text-sm font-medium"
          >
            Verification code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
            onFocus={() => setErrorMessage("")}
            required
          />
        </div>

        {message && <p className="text-green-600">{message}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="w-full py-2 text-center text-white bg-blue-600 rounded-full hover:bg-blue-700 transition disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Validate Email"}
          </button>
          <button
            type="button"
            className="w-full py-2 text-black text-center bg-gray-200 border border-black rounded-full hover:bg-gray-300 transition disabled:bg-gray-100"
            onClick={sendEmailVerificationToken}
            disabled={isLoading}
          >
            Send Again
          </button>
        </div>
      </form>
    </div>
  );
}
