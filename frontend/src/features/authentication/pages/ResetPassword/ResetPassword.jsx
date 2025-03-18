import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendPasswordResetToken = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          "/api/auth/send-password-reset-token?email=" +
          email,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        console.log(`Sending password reset token to ${email}`);
        setEmailSent(true);
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email, code, password) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          `/api/auth/reset-password?email=${email}&token=${code}&newPassword=${password}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        console.log(`Resetting password for ${email}`);
        setErrorMessage("");
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      {!emailSent ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const email = e.target.email.value.trim();
            if (!email) {
              setErrorMessage("Please enter a valid email address.");
              return;
            }
            await sendPasswordResetToken(email);
            setEmail(email);
            setIsLoading(false);
          }}
          className="space-y-4"
        >
          <p className="text-gray-600 text-sm">
            Enter your email and we’ll send a verification code if it matches an
            existing account.
          </p>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            onChange={() => setErrorMessage("")}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-center text-white rounded-full font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Next"}
            </button>
            <button
              type="button"
              className="w-full text-center py-2 border border-black text-black rounded-full"
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              Back
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const code = e.target.code.value.trim();
            const password = e.target.password.value.trim();
            if (!code || !password) {
              setErrorMessage("Please fill in all fields.");
              return;
            }
            await resetPassword(email, code, password);
            setIsLoading(false);
          }}
          className="space-y-4"
        >
          <p className="text-gray-600 text-sm">
            Enter the verification code we sent to your email and your new
            password.
          </p>
          <input
            type="text"
            name="code"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Verification code"
            onChange={() => setErrorMessage("")}
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="New password"
            onChange={() => setErrorMessage("")}
          />
          {errorMessage && (
            <p className="text-green-500 text-sm">{errorMessage}</p>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-center text-white rounded-full font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              className="w-full text-center py-2 border border-black text-black rounded-full"
              onClick={() => {
                setEmailSent(false);
                setErrorMessage("");
              }}
              disabled={isLoading}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
