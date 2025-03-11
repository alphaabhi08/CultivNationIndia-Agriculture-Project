import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/authentication/pages/Login/Login";
import Signup from "./features/authentication/pages/Signup/Signup";
import ResetPassword from "./features/authentication/pages/ResetPassword/ResetPassword";
import VerifyEmail from "./features/authentication/pages/VerifyEmail/VerifyEmail";
import Layout from "./features/authentication/components/Layout/Layout";
import AuthContextProvider from "./features/authentication/context/AuthContextProvider";
import Profile from "./features/authentication/pages/Profile/Profile";
import AgencySignup from "./features/agroagency/pages/Signup/AgencySignup";
import AgencyLayout from "./features/agroagency/component/Layout/AgencyLayout";
import AgencyLogin from "./features/agroagency/pages/Login/AgencyLogin";
import About from "./features/authentication/pages/About/About";
import AgencyProfile from "./features/agroagency/pages/AgencyProfile/AgencyProfile";
import AgroAuthContextProvider from "./features/agroagency/context/AgroAuthContextProvider";
import AgencyDashboard from "./features/agroagency/pages/Dashboard/AgencyDashboard";
import AddProduct from "./features/agroagency/pages/Dashboard/AddProduct";
import ViewProduct from "./features/agroagency/pages/Dashboard/ViewProduct";
import EditProduct from "./features/agroagency/pages/Dashboard/EditProduct";
import Weather from "./features/authentication/pages/Weather/Weather";
import SoilAnalysis from "./features/authentication/pages/SoilAnalysis/SoilAnalysis";
import SoilRequest from "./features/agroagency/pages/Dashboard/SoilRequest";
import AdminLogin from "./features/admin/pages/AdminLogin";
import AdminDashboard from "./features/admin/pages/AdminDashboard";

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
        { path: "dashboard", element: <AdminDashboard /> }, // 👈 Redirect dashboard
        { path: "soil-analysis", element: <SoilRequest /> },
        { path: "add-product", element: <AddProduct /> },
        { path: "edit-product", element: <ViewProduct /> },
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
