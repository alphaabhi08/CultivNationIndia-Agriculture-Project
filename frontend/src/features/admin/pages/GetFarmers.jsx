import { useEffect, useState } from "react";
import { fetchFarmersApi } from "../api/AdminService";

export default function GetFarmers() {
  const [farmers, setFarmers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const data = await fetchFarmersApi();
        setFarmers(data);
      } catch (error) {
        setErrorMessage("Failed to fetch farmers.", error);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="flex flex-col flex-1 p-6">
      <h2 className="text-2xl font-bold mb-4">Registered Farmers</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border">Famrer Name</th>
              <th className="p-3 text-left border">Email</th>
              <th className="p-3 text-left border">Mobile</th>
              <th className="p-3 text-left border">State</th>
              <th className="p-3 text-left border">Town</th>
              <th className="p-3 text-left border">Village</th>
              <th className="p-3 text-left border">Soil Type</th>
            </tr>
          </thead>
          <tbody>
            {farmers.length > 0 ? (
              farmers.map((farmer) => (
                <tr key={farmer.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">
                    {farmer.firstName} {farmer.lastName}
                  </td>
                  <td className="p-3 border">{farmer.email}</td>
                  <td className="p-3 border">{farmer.mobile}</td>
                  <td className="p-3 border">{farmer.state || "N/A"}</td>
                  <td className="p-3 border">{farmer.town || "N/A"}</td>
                  <td className="p-3 border">{farmer.village || "N/A"}</td>
                  <td className="p-3 border">{farmer.soilType || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Registered farmers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
