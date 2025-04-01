import { useState } from "react";
import { getAllContactsApi } from "../../authentication/api/authService";
import { useEffect } from "react";

export default function GetContactsRequest() {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getAllContactsApi();
      setContactData(response);
    } catch (error) {
      console.error("Error fetching contact requests: ", error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="border p-2">Contact ID</th>
              <th className="border p-2">User Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {contactData.length === 0 ? (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No contact requests found.
                </td>
              </tr>
            ) : (
              contactData.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{contact.id}</td>
                  <td className="border p-2 text-center">
                    {contact.user?.firstName} {contact.user?.lastName}
                  </td>
                  <td className="border p-2 text-center">{contact.email}</td>
                  <td className="border p-2 text-center">{contact.message}</td>
                  <td className="border p-2 text-center">
                    {contact.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
