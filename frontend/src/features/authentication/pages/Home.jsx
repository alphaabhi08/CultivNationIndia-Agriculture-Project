import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContextProvider";

const videos = [
  "/Images/Sliderv1.mp4",
  "/Images/demo1.mp4",
  "/Images/demo2.mp4",
];

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { user } = useAuthentication();
  const navigate = useNavigate();

  // Handle video end
  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <main className="flex bg-white relative -mt-[1px]">
      <video
        key={videos[currentVideo]} // Forces reloading when video changes
        src={videos[currentVideo]}
        autoPlay
        muted
        className="h-[90vh] w-[100%] object-cover "
        onEnded={handleVideoEnd} // Change video when it finishes
      />

      <FaAngleLeft
        onClick={() =>
          setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length)
        }
        className="absolute bottom-80 left-5 text-gray-600 text-7xl px-4 py-2 cursor-pointer shadow-lg hover:text-gray-700 transition"
      />

      {/* Right Arrow - Next Video */}

      <FaAngleRight
        onClick={handleVideoEnd}
        className="absolute bottom-80 right-5 text-gray-600 px-4 py-2 text-7xl cursor-pointer shadow-lg hover:text-gray-700 transition"
      />
      <div className="absolute text-white font-bold left-[400px] bottom-[25%]">
        <h1 className="text-6xl drop-shadow-md">Welcome</h1>
        <p className="text-5xl w-[600px] leading-[4rem] mt-5 opacity-95 drop-shadow-2xl">
          Farmer Web-based open discussion Portal
        </p>
        {!user ? (
          <button
            onClick={() => navigate("/signup")}
            className="mt-5 bg-green-600 p-3 drop-shadow-md rounded-md hover:bg-green-700"
          >
            Register As Farmer
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/products")}
              className="mt-5 bg-green-600 p-3 drop-shadow-md rounded-md hover:bg-green-700"
            >
              Our Products
            </button>
            <button
              onClick={() => navigate("/agroagency")}
              className="mt-5 bg-orange-600 p-3 drop-shadow-md rounded-md ml-10 hover:bg-orange-700"
            >
              Agroagencies
            </button>
          </>
        )}
      </div>
    </main>
  );
}
