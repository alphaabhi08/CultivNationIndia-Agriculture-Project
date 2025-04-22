import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header/Header";
import Navbar from "../../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    mobile: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "zipCode" || name === "mobile") && /[^0-9]/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/address/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Address saved successfully");
        setFormData({
          fullName: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          mobile: "",
        });
        fetchAddresses();
      } else {
        setMessage("❌ Failed to save address");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/address/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/address/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchAddresses();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="max-w-4xl mx-auto mt-24 p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
          Add Delivery Address
        </h2>

        {message && <p className="text-center mb-4 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required maxLength={10} className="border p-2 rounded w-full" />
          <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required className="border p-2 rounded w-full md:col-span-2" />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required maxLength={6} className="border p-2 rounded w-full" />
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition md:col-span-2">
            Save Address
          </button>
        </form>

        {/* Saved Addresses */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Saved Addresses</h3>
          {addresses.length === 0 && <p className="text-gray-500">No addresses saved yet.</p>}

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-gray-100 p-4 mb-4 rounded border transition ${
                selectedAddressId === addr.id ? "border-green-600" : "border-gray-300"
              } flex flex-col sm:flex-row justify-between items-start sm:items-center`}
            >
              <div className="text-sm sm:text-base">
                <p className="font-semibold">{addr.fullName}</p>
                <p>{addr.street}, {addr.city}, {addr.state} - {addr.zipCode}</p>
                <p>{addr.country}, 📞 {addr.mobile}</p>
              </div>
              <div className="mt-2 sm:mt-0 sm:flex sm:flex-col items-end gap-2">
                <button
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedAddressId === addr.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {selectedAddressId === addr.id ? "Selected" : "Select"}
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Proceed Button */}
          {selectedAddressId && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/payment")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-lg transition"
              >
                Proceed to Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
