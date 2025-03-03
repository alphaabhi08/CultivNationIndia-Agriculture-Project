import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/authentication/pages/Login/Login";
import Signup from "./features/authentication/pages/Signup/Signup";
import ResetPassword from "./features/authentication/pages/ResetPassword/ResetPassword";
import VerifyEmail from "./features/authentication/pages/VerifyEmail/VerifyEmail";
import Layout from "./features/authentication/components/Layout/Layout";
import AuthContextProvider from "./features/authentication/context/AuthContextProvider";
import Profile from "./features/authentication/pages/Profile/Profile";
import AgencySignup from "./features/admin/pages/Signup/AgencySignup";
import AgencyLayout from "./features/admin/component/Layout/AgencyLayout";
import AgencyLogin from "./features/admin/pages/Login/AgencyLogin";
import About from "./features/authentication/pages/About/About";
import AgencyProfile from "./features/admin/pages/AgencyProfile/AgencyProfile";
import AgroAuthContextProvider from "./features/admin/context/AgroAuthContextProvider";
import AgencyDashboard from "./features/admin/pages/Dashboard/AgencyDashboard";
import AddProduct from "./features/admin/pages/Dashboard/AddProduct";
import ViewProduct from "./features/admin/pages/Dashboard/ViewProduct";
import EditProduct from "./features/admin/pages/Dashboard/EditProduct";

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
        // {
        //   path: "/agroagency",
        //   element: <AgencyLayout />,
        // },
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
