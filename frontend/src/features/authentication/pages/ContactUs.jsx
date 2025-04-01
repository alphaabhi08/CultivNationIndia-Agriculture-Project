import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import Contact from "./Contact";

export default function ContactUs() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="mt-10 mb-10">
        <Contact />
      </div>
      <Footer />
    </>
  );
}
