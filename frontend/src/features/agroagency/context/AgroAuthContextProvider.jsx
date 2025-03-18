import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  agencyLoginApi,
  agencySignupApi,
  fetchAgencyApi,
} from "../api/agencyService";
import Loader from "../../../components/Loader/Loader";

const AgroAuthContext = createContext(null);

export function useAgroAuthentication() {
  return useContext(AgroAuthContext);
}

export default function AgroAuthContextProvider() {
  const [agroUser, setAgroUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isOnAuthPage =
    location.pathname === "/agroagency/agro-login" ||
    location.pathname === "/agroagency/agro-signup";

  const login = async (email, password) => {
    console.log(`Agro Logging in with email: ${email}`);

    return await agencyLoginApi(email, password);
  };

  const signup = async (signupData, imageFile) => {
    console.log(`Agro Signing up with email: ${signupData.email}`);

    return await agencySignupApi(signupData, imageFile);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAgroUser(null);
    navigate("/agroagency/agro-login");
  };

  const fetchAgroUser = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, Cannot fetch user");
      setIsLoading(false);
      return;
    }
    try {
      const data = await fetchAgencyApi();
      setAgroUser(data);
    } catch (e) {
      console.log("Error fetcing agroagency user: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAgroUser();
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  if (isLoading) {
    return <Loader />;
  }

  if (agroUser && isOnAuthPage) {
    return <Navigate to="/agroagency/profile" />;
  }

  const value = {
    agroUser,
    login,
    signup,
    logout,
  };

  return (
    <AgroAuthContext.Provider value={value}>
      <Outlet />
    </AgroAuthContext.Provider>
  );
}
