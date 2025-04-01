import { FaMedal, FaSeedling } from "react-icons/fa";

export default function About() {
  return (
    <>
      <div className="grid grid-cols-2 mt-10 mb-20">
        <img
          src="public/Images/farmerbaba.png"
          alt="About_Img"
          className="w-[60rem] h-[43rem] object-contain"
        />
        <div className="w-[40rem]">
          <h1 className="font-bold text-xl text-[#28a745]">ABOUT US</h1>
          <p className="font-bold text-4xl  ">
            Your Gateway to Sustainable Farming Wisdom
          </p>
          <p className="mt-6 w-[40rem]">
            Welcome to CultivNationIndia, a dedicated web-based open discussion
            portal committed to providing individual information, solutions and
            support to small farmers and agriculture students. Our Platform
            serves as dynamic hub where indiviudals passionate about agriculture
            can come together to share knowledge engage in discussion, and
            access crucial resources for successful farming practises.
          </p>
          <div className="grid grid-cols-2 gap-4 text-wrap">
            <p className="mt-4">
              {
                <FaSeedling className="w-[100px] h-[100px] mt-4 text-[#28a745]" />
              }
              our mission is to empower farmers and agriculture students with
              the knowledge and resources they need for sustainable and
              successful farming practices.
            </p>
            <p className="mt-4">
              {<FaMedal className="w-[100px] h-[100px] mt-4 text-[#28a745]" />}
              We are thrilled to announce that CultivNationIndia has been
              honored with the prestigious Agriculture innovation Excellence
              Award. This recognition highlights our commitment to
              revolutionizing the agriculture landscape by providng cutting-edge
              solutions and fostering a community dedicated to sustainable
              farming practices.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
