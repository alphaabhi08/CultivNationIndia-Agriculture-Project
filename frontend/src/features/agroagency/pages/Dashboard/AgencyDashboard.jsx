import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AgencyNavbar from "../AgencyNavbar";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("agroagency/agro-login");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <AgencyNavbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content on the Right */}
        <div className="flex-1 p-5 ml-[300px] mt-[100px] bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
