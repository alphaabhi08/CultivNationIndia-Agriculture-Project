import { Navigate, Outlet, useLocation } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, signupApi, fetchUserApi } from "../api/authService";
import Loader from "../../../components/Loader/Loader";

const AuthContext = createContext(null);

export function useAuthentication() {
  return useContext(AuthContext);
}

export default function AuthContextProvider() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const isOnAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/request-reset-password";

  // Login function
  const login = async (email, password) => {
    console.log(`Logging in with email: ${email}`);
    return await loginApi(email, password);
  };

  // Signup function
  const signup = async (signupData) => {
    console.log(`Signing up with email: ${signupData.email}`);
    return await signupApi(signupData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    console.log("Logging out...");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const user = await fetchUserApi();
      setUser(user);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [user, location.pathname]);

  if (isLoading) {
    return <Loader />;
  }

  if (user && user.emailVerified && isOnAuthPage) {
    return <Navigate to="/" />;
  }

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {user && !user.emailVerified ? <Navigate to="verify-email" /> : null}
      <Outlet />
    </AuthContext.Provider>
  );
}
