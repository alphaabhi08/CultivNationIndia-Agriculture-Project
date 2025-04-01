import { useEffect, useState } from "react";
import { FaSearch, FaUsersCog } from "react-icons/fa";
import { FaCartShopping, FaFileContract } from "react-icons/fa6";
import {
  deleteContactApi,
  getUserContactApi,
  getUserSoilAnalysisApi,
  withdrawSoilAnalysisApi,
} from "../api/authService";
import Navbar from "../../../components/Navbar/Navbar";
import Header from "../../../components/Header/Header";

export default function MyActivity() {
  const [soilAnalysisData, setSoilAnalysisData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSoilAnalysis();
    fetchContact();
  }, []);

  const fetchSoilAnalysis = async () => {
    try {
      const response = await getUserSoilAnalysisApi();
      setSoilAnalysisData(response);
    } catch (error) {
      console.error("Error fetching soil analysis: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContact = async () => {
    try {
      const response = await getUserContactApi();
      setContactData(response);
    } catch (error) {
      console.error("Error fetching contact data: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  // const fetchOrders = async () => {
  //   const dummyOrders = [
  //     {
  //       id: 1,
  //       name: "Fertilizer",
  //       quantity: 2,
  //       price: 240,
  //       date: "2025-03-20",
  //     },
  //   ];
  //   setOrderData(dummyOrders);
  // };

  const handleWithdrawRequest = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to withdraw this request?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await withdrawSoilAnalysisApi(id);
      alert("Request withdrawn successfully!");

      setSoilAnalysisData((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error withdrawing request: ", error.message);
      alert("Failed to withdraw request. Please try again.");
    }
  };

  const handleDeleteContact = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this contact request?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteContactApi(id);
      alert("Contact request deleted successfully!");
      setContactData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting contact request: ", error.message);
      alert("Failed to delete contact request. Please try again.");
    }
  };

  const handleDownloadPDF = (data) => {
    const pdfContnet = `
    Soil Analysis Report
    -----------------------------
    Farmer Name: ${data.farmerName}
    Soil Type: ${data.soilType}
    Texture: ${data.texture}
    Fertilizers: ${data.fertilizers}
    Date: ${data.date}
     `;

    const blob = new Blob([pdfContnet], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SoilAnalysis_Data_${data.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Navbar />
      {/* Header Section */}
      <div className="flex justify-center items-center mb-6">
        <div className="font-bold p-2 text-2xl mt-4">My Activities</div>
        <FaUsersCog className="text-2xl ml-2" />
      </div>

      {/* Orders Section */}
      <div className="flex p-4 font-bold text-2xl">
        <div>My Orders</div>
        <FaCartShopping className="mt-1 ml-2" />
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-400">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price (₹)</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderData.length === 0 ? (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orderData.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{order.id}</td>
                  <td className="border p-2 text-center">{order.product}</td>
                  <td className="border p-2 text-center">{order.quantity}</td>
                  <td className="border p-2 text-center">₹{order.price}</td>
                  <td className="border p-2 text-center">{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Soil Analysis Section */}
      <div className="flex p-4 font-bold text-2xl mt-5">
        <div>Soil Analysis</div>
        <FaSearch className="mt-1 ml-2" />
      </div>
      <div className="p-4 overflow-x-auto mb-20">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-400">
              <th className="border p-2">Request ID</th>
              <th className="border p-2">Farmer Name</th>
              <th className="border p-2">Soil Type</th>
              <th className="border p-2">Texture</th>
              <th className="border p-2">Fertilizers</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {soilAnalysisData.length === 0 ? (
              <tr>
                <td colSpan="7" className="border p-2 text-center">
                  No soil analysis requests found.
                </td>
              </tr>
            ) : (
              soilAnalysisData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{data.id}</td>
                  <td className="border p-2 text-center">
                    {data.user.firstName}
                  </td>
                  <td className="border p-2 text-center">{data.soilType}</td>
                  <td className="border p-2 text-center">{data.soilTexture}</td>
                  <td className="border p-2 text-center">
                    {data.fertilizerUsed}
                  </td>
                  <td className="border p-2 text-center">{data.createdAt}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 mr-2 rounded hover:bg-blue-700"
                      onClick={() => handleDownloadPDF(data)}
                    >
                      Download PDF
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleWithdrawRequest(data.id)}
                    >
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contact Section */}
      <div className="flex p-4 mt-[-60px]">
        <div className="text-2xl font-bold ">My Contact Requests</div>
        <FaFileContract className="mt-1 ml-2 text-2xl " />
      </div>
      <div className="p-4 overflow-x-auto mb-20">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-400">
              <th className="border w-40 p-0">Contact ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactData.length === 0 ? (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No Contact request found
                </td>
              </tr>
            ) : (
              contactData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{data.id}</td>
                  <td className="border p-2 text-center">{data.fullName}</td>
                  <td className="border p-2 text-center">{data.email}</td>
                  <td className="border p-2 text-center">{data.message}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDeleteContact(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
