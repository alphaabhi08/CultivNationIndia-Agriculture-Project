import { useState, useEffect } from "react";
import { fetchUserApi, updateUserApi } from "../api/authService";
import Navbar from "../../../components/Navbar/Navbar";
import Header from "../../../components/Header/Header";
import MyActivity from "./MyActivity";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await fetchUserApi();
        setUser(userData);
        setFormData(userData); // Set form data initially
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      if (!user || !user.id) {
        setErrorMessage("User Not found. Unable to update.");
        return;
      }
      const updatedUser = await updateUserApi(user.id, formData);
      setUser(updatedUser);
      setSuccessMessage("Profile Updated Successfully!");
      setErrorMessage("");
    } catch (error) {
      console.log("Error updating profile: ", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;
  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-[#28a745] mb-6">
            User Profile
          </h1>

          <div className="space-y-2.5 text-sm">
            <label className="block">
              <strong className="text-gray-700">First Name:</strong>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">Last Name:</strong>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">Email:</strong>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                disabled
                className="w-full p-2 border rounded bg-gray-200"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">State:</strong>
              <input
                type="text"
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">Town:</strong>
              <input
                type="text"
                name="town"
                value={formData.town || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">Village:</strong>
              <input
                type="text"
                name="village"
                value={formData.village || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">Mobile:</strong>
              <input
                type="number"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              <strong className="text-gray-700">Soil Type:</strong>
              <select
                name="soilType"
                value={formData.soilType || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">{formData.soilType}</option>
                <option value="Sandy">Sandy</option>
                <option value="Clayey">Clayey</option>
                <option value="Loamy">Loamy</option>
                <option value="Peaty">Peaty</option>
                <option value="Saline">Saline</option>
                <option value="Silty">Silty</option>
                <option value="Chalky">Chalky</option>
              </select>
            </label>

            {successMessage && (
              <p className="text-green-600 text-center mb-4">
                {successMessage}
              </p>
            )}

            <button
              onClick={handleSaveProfile}
              className="w-full bg-[#28a745] text-center text-white py-2 rounded mt-4 hover:bg-green-600 transition"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
