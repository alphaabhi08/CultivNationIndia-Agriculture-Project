import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Service from "../pages/Service";
import OurTeam from "../pages/OurTeam";
import Contact from "../pages/Contact";
import OurProducts from "../pages/OurProducts";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navbar />
      <Home />

      <Outlet />
      <OurProducts />
      <Service />
      <About />
      <OurTeam />
      <Contact />

      <Footer />
    </div>
  );
}
