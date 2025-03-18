import { Outlet } from "react-router-dom";
import AgencyNavbar from "../pages/AgencyNavbar";
import AgencyHome from "../pages/AgencyHome";
import About from "../../authentication/pages/About";
import Footer from "../../../components/Footer/Footer";

export default function AgencyLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AgencyNavbar />
      <Outlet />
      <AgencyHome />
      <About />
      <Footer />
    </div>
  );
}
