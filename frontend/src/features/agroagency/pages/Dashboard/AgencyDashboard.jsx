import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AgencyNavbar from "../AgencyNavbar/AgencyNavbar";


const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">      
      <AgencyNavbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content on the Right */}
        <div className="flex-1 p-5 bg-gray-100 overflow-auto">
          <Outlet />
        </div>        
      </div>
    </div>
  );
};

export default Dashboard;
