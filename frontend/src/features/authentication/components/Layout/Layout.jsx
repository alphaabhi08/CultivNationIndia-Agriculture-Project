import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import About from "../../pages/About/About";
import Home from "../../pages/Home/Home";
import Service from "../../pages/Service/Service";
import OurTeam from "../../pages/OurTeam/OurTeam";
import Contact from "../../pages/ContactUs/Contact";
import OurProducts from "../../pages/Products/OurProducts";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navbar />
      <Home />

      <Outlet />
      <OurProducts/>
      <Service />
      <About />
      <OurTeam />
      <Contact />

      <Footer />
    </div>
  );
}
