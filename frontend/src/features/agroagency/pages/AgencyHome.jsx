import { useNavigate } from "react-router-dom";
import { useAgroAuthentication } from "../context/AgroAuthContextProvider";

export default function AgencyHome() {
  const images = ["/Images/Farmerloginimg.jpeg"];
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { agroUser } = useAgroAuthentication();

  return (
    <main className=" flex bg-white relative mt-[112px]">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Farmer Login ${index + 1}`}
          className="w-full h-[90vh] object-cover opacity-90"
        />
      ))}
      <div className="absolute text-white font-bold left-[400px] bottom-[40%]">
        <h1 className="text-6xl">Welcome</h1>
        <p className="text-2xl mt-4 opacity-95">
          CultivNationIndia is a web-based open discussion portal.
        </p>
        {!agroUser && (
          <button
            onClick={() => navigate("/agroagency/agro-signup")}
            className="mt-4 bg-green-600 p-3 shadow-md rounded-md hover:bg-green-700"
          >
            Join As AgroAgency
          </button>
        )}
      </div>
    </main>
  );
}
