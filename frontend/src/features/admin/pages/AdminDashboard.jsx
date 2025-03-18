import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="  flex-1 p-5 bg-[#f4f2ee] ml-[300px] mt-[80px] mb-[50px] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
