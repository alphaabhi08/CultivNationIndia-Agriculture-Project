import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/authentication/pages/Login";
import Signup from "./features/authentication/pages/Signup";
import ResetPassword from "./features/authentication/pages/ResetPassword";
import VerifyEmail from "./features/authentication/pages/VerifyEmail";
import Layout from "./features/authentication/Layout/Layout";
import AuthContextProvider from "./features/authentication/context/AuthContextProvider";
import Profile from "./features/authentication/pages/Profile";
import AgencySignup from "./features/agroagency/pages/AgencySignup";
import AgencyLayout from "./features/agroagency/Layout/AgencyLayout";
import AgencyLogin from "./features/agroagency/pages/AgencyLogin";
import About from "./features/authentication/pages/About";
import AgencyProfile from "./features/agroagency/pages/AgencyProfile";
import AgroAuthContextProvider from "./features/agroagency/context/AgroAuthContextProvider";
import AgencyDashboard from "./features/agroagency/pages/Dashboard/AgencyDashboard";
import AddProduct from "./features/agroagency/pages/Dashboard/AddProduct";
import ViewProduct from "./features/agroagency/pages/Dashboard/ViewProduct";
import EditProduct from "./features/agroagency/pages/Dashboard/EditProduct";
import Weather from "./features/authentication/pages/Weather";
import SoilAnalysis from "./features/authentication/pages/SoilAnalysis";
import SoilRequest from "./features/agroagency/pages/Dashboard/SoilRequest";
import AdminLogin from "./features/admin/pages/AdminLogin";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import GetAgroagency from "./features/admin/pages/GetAgroagency";
import GetFarmers from "./features/admin/pages/GetFarmers";
import ProductDetails from "./features/authentication/pages/ProductDetails";
import UnderVerification from "./features/agroagency/pages/UnderVerification";

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthContextProvider />,
      children: [
        {
          path: "/",
          element: <Layout />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/request-password-reset",
          element: <ResetPassword />,
        },
        {
          path: "/verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetails />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/soil-analysis",
          element: <SoilAnalysis />,
        },
        {
          path: "/weather",
          element: <Weather />,
        },
        {
          path: "/agroagency/agro-signup",
          element: <AgencySignup />,
        },
        {
          path: "/agroagency/agro-login",
          element: <AgencyLogin />,
        },
      ],
    },

    {
      path: "/admin/login", // 👈 Keep login separate
      element: <AdminLogin />,
    },
    {
      path: "/admin", // 👈 Admin Dashboard (Protected Route)
      element: <AdminDashboard />,
      children: [
        // { path: "dashboard", element: <AdminDashboard /> }, // 👈 Redirect dashboard
        { path: "soil-analysis", element: <SoilRequest /> },
        { path: "add-product", element: <AddProduct /> },
        { path: "edit-product", element: <ViewProduct /> },
        { path: "agroagencies", element: <GetAgroagency /> },
        { path: "farmers", element: <GetFarmers /> },
      ],
    },

    {
      element: <AgroAuthContextProvider />,
      children: [
        {
          path: "/agroagency",
          element: <AgencyLayout />,
        },
        {
          path: "/agroagency/profile",
          element: <AgencyProfile />,
        },
        {
          path: "/agroagency/dashboard",
          element: <AgencyDashboard />,
          children: [
            {
              path: "add-product",
              element: <AddProduct />,
            },
            {
              path: "view-products",
              element: <ViewProduct />,
            },
            {
              path: "edit-product/:productId",
              element: <EditProduct />,
            },
            {
              path: "soilrequest",
              element: <SoilRequest />,
            },
          ],
        },
        {
          path: "/under-verification",
          element: <UnderVerification />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
