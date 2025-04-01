import { useEffect, useState } from "react";
import {
  approveAgencyApi,
  fetchAgroAgenciesApi,
  rejectAgencyApi,
} from "../../admin/api/AdminService";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function GetAgroagency() {
  const [agroagencies, setAgroagencies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await fetchAgroAgenciesApi();
        setAgroagencies(data);
      } catch (error) {
        setErrorMessage("Failed to fetch agroagencies.", error);
      }
    };
    fetchAgencies();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));

      if (newStatus === "APPROVED") {
        await approveAgencyApi(id);
        console.log("Agency Approved Successfully");
      } else {
        await rejectAgencyApi(id);
        console.log("Agency Rejected Successfully");
      }

      setAgroagencies((prev) =>
        prev.map((agency) =>
          agency.id === id
            ? {
                ...agency,
                accountStatus: newStatus,
              }
            : agency
        )
      );

      toast.success(
        Response.message || `Agency ${newStatus.toLowerCase()} successfully`
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6">
      <h2 className="text-2xl font-bold mb-4">Registered Agroagencies</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border">Agroagency Name</th>
              <th className="p-3 text-left border">Email</th>
              <th className="p-3 text-left border">Certificate</th>
              <th className="p-3 text-left border">District</th>
              <th className="p-3 text-left border">Town</th>
              <th className="p-3 text-left border">Phone</th>
              <th className="p-3 text-left border">Account Status</th>
              <th className="p-3 text-left border">Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {agroagencies.length > 0 ? (
              agroagencies.map((agency) => (
                <tr key={agency.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">{agency.agencyName}</td>
                  <td className="p-3 border">{agency.email}</td>

                  <td className="p-3 border text-center">
                    {agency.imageData ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={`data:${agency.imageType};base64,${agency.imageData}`}
                          alt={agency.imageName}
                          className="w-30 h-30 object-contain rounded-lg "
                        />
                        <div className="flex flex-col text-sm">
                          <a
                            href={`data:${agency.imageType};base64,${agency.imageData}`}
                            download={agency.imageName}
                            className="text-blue-900 flex border-black border bg-blue-300 p-1 rounded-lg hover:underline mt-1"
                          >
                            Download
                            <FaCloudDownloadAlt className="mt-0.5 ml-1" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">No Certificate</span>
                    )}
                  </td>

                  <td className="p-3 border">{agency.district}</td>
                  <td className="p-3 border">{agency.town}</td>
                  <td className="p-3 border">{agency.mobile}</td>

                  {/* 🔹 Account Status */}
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-lg text-white text-sm ${
                        agency.accountStatus === "APPROVED"
                          ? "bg-green-500"
                          : agency.accountStatus === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {agency.accountStatus}
                    </span>
                  </td>

                  {/* 🔹 Admin Actions */}
                  <td className="p-3 border">
                    <button
                      onClick={() => handleStatusChange(agency.id, "APPROVED")}
                      disabled={loadingStates[agency.id]}
                      className={`bg-green-500 text-white px-3 py-1 mb-2 rounded-lg mr-2 ${
                        loadingStates[agency.id]
                          ? "opacity-50 cursor-not-allowed"
                          : " hover:bg-green-600"
                      }`}
                    >
                      {loadingStates[agency.id] ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleStatusChange(agency.id, "REJECTED")}
                      disabled={loadingStates[agency.id]}
                      className={`bg-red-500 text-white px-3 py-1 rounded-lg ${
                        loadingStates[agency.id]
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-600"
                      }`}
                    >
                      {loadingStates[agency.id] ? "Processing..." : "Reject"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No registered agroagencies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
