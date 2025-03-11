import { useEffect, useState } from "react";
import { getAllSoilAnalysisApi } from "../../api/agencyService";

export default function SoilRequest() {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSoilRequests = async () => {
      try {
        const data = await getAllSoilAnalysisApi();
        setRequests(data);
      } catch (error) {
        setErrorMessage(error.message || "Failed to fetch soil requests");
      }
    };

    fetchSoilRequests();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-4 px-4">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Soil Analysis Requests
        </h1>

        {errorMessage && (
          <p className="text-center text-red-500 mb-4">{errorMessage}</p>
        )}

        {requests.length === 0 ? (
          <p className="text-center text-gray-600">
            No Soil Analysis Requests Found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg shadow-md p-5 bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Farmer: {request.user.firstName}
                </h2>
                <p className="text-gray-600 mb-1">
                  <strong>Email:</strong> {request.user.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Mobile:</strong> {request.user.mobile}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {request.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Soil Type:</strong> {request.soilType}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Soil Texture:</strong> {request.soilTexture}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Depth:</strong> {request.depth} cm
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Organic Matter:</strong> {request.organicMatter}%
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Crop Type:</strong> {request.cropType}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Previous Crop:</strong> {request.previousCrop}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Fertilizer Used:</strong> {request.fertilizerUsed}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Irrigation:</strong> {request.irrigation}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Description:</strong> {request.soilDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
