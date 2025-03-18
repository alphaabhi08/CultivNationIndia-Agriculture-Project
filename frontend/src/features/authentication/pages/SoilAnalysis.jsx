import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { fetchUserApi, submitSoilAnalysisApi } from "../api/authService";

export default function SoilAnalysis() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    depth: "",
    organicMatter: "",
    soilTexture: "",
    cropType: "",
    previousCrop: "",
    fertilizerUsed: "",
    irrigation: "yes",
    soilDescription: "",
    soilType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const farmerData = await fetchUserApi();
        setUser(farmerData);
        setFormData((prev) => ({
          ...prev,
          soilType: farmerData.soilType,
        }));
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchFarmer();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await submitSoilAnalysisApi(formData);
      setSuccessMessage("Soil Analysis Request Submitted Successfully");
      setFormData({
        location: "",
        depth: "",
        organicMatter: "",
        soilTexture: "",
        cropType: "",
        previousCrop: "",
        fertilizerUsed: "",
        irrigation: "yes",
        soilDescription: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Failed to submit request");
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <h1 className="text-center font-semibold mt-8 text-3xl">
        Soil Analysis Form
      </h1>
      <p className="flex text-[#28a745] justify-center text-center text-1xl mt-3">
        <p className="text-red-500 font-semibold">*</p>
        Fill Your Details Correctly it Will help Us to Analysis Your Soil{" "}
      </p>
      <div className="flex justify-center text-[#28a745]">
        <p className="text-red-500 font-semibold mr-2">Note:</p>
        <p>You can Request one Soil Analysis Request from Each Account</p>
      </div>

      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-7 w-[800px] mt-10 mb-[130px] shadow-md"
        >
          <h1 className="font-semibold text-[18px] mb-1">
            1) Sample Information
          </h1>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-gray-500 text-[15px]">
                Name of Farmer
              </label>
              <input
                type="text"
                name="firstName"
                value={user?.firstName || ""}
                onChange={handleChange}
                readOnly
                className="border border-black rounded w-full p-2 focus:outline-green-500"
              />
            </div>
            <div>
              <label className="text-gray-500 text-[15px]">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-black rounded w-full p-2 focus:outline-green-500"
              />
            </div>

            <div>
              <label className="text-gray-500 text-[15px]">Mobile</label>
              <input
                type="number"
                name="mobile"
                value={user?.mobile || ""}
                onChange={handleChange}
                readOnly
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>

            <div>
              <label className="text-gray-500 text-[15px]">Email</label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                onChange={handleChange}
                readOnly
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>

            <div>
              <label className="text-gray-500 text-[15px]">Depth (in cm)</label>
              <input
                type="number"
                name="depth"
                value={formData.depth}
                onChange={handleChange}
                placeholder="Enter the depth of Soil in cm"
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>

            <div>
              <label className="text-gray-500 text-[15px]">Type of Soil</label>
              <input
                type="text"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                readOnly
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>
          </div>

          <h1 className="font-semibold text-[18px] mb-1 mt-4">
            2) Soil Properties
          </h1>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-gray-500 text-[15px]">
                Organic Matter (%):
              </label>
              <input
                type="number"
                name="organicMatter"
                value={formData.organicMatter}
                onChange={handleChange}
                required
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>
            <div>
              <label className="text-gray-500 text-[15px]">Soil Texture:</label>
              <select
                name="soilTexture"
                value={formData.soilTexture}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border border-black focus:outline-green-500"
              >
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="clay">Clay</option>
              </select>
            </div>
          </div>

          <h1 className="font-semibold text-[18px] mb-1 mt-4">
            3) Additional Information
          </h1>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-gray-500 text-[15px]">Crop Type:</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>
            <div>
              <label className="text-gray-500 text-[15px]">
                Previous Crop:
              </label>
              <input
                type="text"
                name="previousCrop"
                value={formData.previousCrop}
                onChange={handleChange}
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>

            <div>
              <label className="text-gray-500 text-[15px]">
                Fertilizer Used:
              </label>
              <input
                type="text"
                name="fertilizerUsed"
                value={formData.fertilizerUsed}
                onChange={handleChange}
                className="border border-black rounded w-full p-2 outline-green-500"
              />
            </div>
            <div>
              <label className="text-gray-500 text-[15px]">Irrigation:</label>
              <select
                name="irrigation"
                value={formData.irrigation}
                onChange={handleChange}
                className="border border-black rounded w-full p-2 outline-green-500"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="address" className="text-[15px] text-gray-500">
              Soil Description
            </label>
            <textarea
              id="soilDescription"
              name="soilDescription"
              value={formData.soilDescription}
              onChange={handleChange}
              className="w-full bg-white border border-black rounded-md focus:outline-green-500"
              rows="4"
              onFocus={() => setErrorMessage("")}
              required
            />
          </div>

          {errorMessage && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-2 text-sm text-green-600">{successMessage}</p>
          )}

          <button
            type="submit"
            className="p-2 ml-[550px] mt-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
