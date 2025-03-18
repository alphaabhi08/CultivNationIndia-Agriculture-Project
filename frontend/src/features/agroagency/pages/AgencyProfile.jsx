import { useEffect, useState } from "react";
import { fetchAgencyApi, updateAgencyApi } from "../api/agencyService";
import AgencyNavbar from "../pages/AgencyNavbar";

export default function AgencyProfile() {
  const [agency, setAgency] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const agencyData = await fetchAgencyApi();
        setAgency(agencyData);
        setFormData(agencyData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchAgency();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      if (!formData.id) {
        setErrorMessage("Agency not found. Unable to update.");
        return;
      }
      const updatedAgency = await updateAgencyApi(formData.id, formData);
      setAgency(updatedAgency);
      setSuccessMessage("Agency Profile Updated Successfully!");
      setErrorMessage("");
    } catch (error) {
      console.log("Error updating profile: ", error);
      setErrorMessage(error.message || "Failed to update profile.");
      setSuccessMessage("");
    }
  };

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;
  if (!agency) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <>
      <AgencyNavbar />
      <div className="flex justify-center items-center min-h-[80vh] p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mt-[120px] mb-[20px]">
          <h1 className="text-3xl font-semibold text-center text-[#28a745] mb-6">
            Agency Profile
          </h1>

          <div className="space-y-2.5 text-sm">
            <div>
              <label htmlFor="name">Agency Name</label>
              <input
                type="text"
                id="name"
                name="agencyName"
                value={formData.agencyName || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="mobile">Phone</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows={4}
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="town">Town</label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <button
                onClick={handleSaveProfile}
                className="w-full bg-[#28a745] mt-1 text-center text-white p-2 rounded-md"
              >
                Save Profile
              </button>
            </div>
            {successMessage && (
              <p className="text-green-500 text-center mt-2">
                {successMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
