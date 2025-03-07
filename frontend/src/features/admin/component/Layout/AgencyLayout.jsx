import { Outlet } from "react-router-dom";
import AgencyNavbar from "../../pages/AgencyNavbar/AgencyNavbar";
import AgencyHome from "../../pages/Home/AgencyHome";
import About from "../../../authentication/pages/About/About";
import Footer from "../../../../components/Footer/Footer";

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
