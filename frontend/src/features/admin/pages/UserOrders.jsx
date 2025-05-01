import { useState } from "react";

export default function UserOrders() {
  const [filter, setFilter] = useState("Pending");

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      email: "abhisheknimavat08@gmail.com",
      date: "2025-04-24",
      products: [
        { name: "Tomato", quantity: 1, price: 482 },
        { name: "Wheat Crop", quantity: 2, price: 499 },
      ],
      status: "Pending",
    },
    {
      id: "ORD002",
      email: "nandish0308@gmail.com",
      date: "2025-04-18",
      products: [
        { name: "Mango", quantity: 2, price: 299 },
        { name: "Cabbage", quantity: 1, price: 199 },
      ],
      status: "Pending",
    },
    {
      id: "ORD003",
      email: "dhruv10@gmail.com",
      date: "2025-04-15",
      products: [{ name: "Carrot", quantity: 3, price: 80 }],
      status: "Pending",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filteredOrders = orders.filter((order) => order.status === filter);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📦 All Orders</h2>
          <div className="flex gap-2">
            {["Pending", "Delivered", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Email</th>
                <th className="p-4">Products</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 border-b transition"
                  >
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.email}</td>
                    <td className="p-4">
                      {order.products.map((p, i) => (
                        <span key={i}>
                          {p.name} x{p.quantity}
                          {i < order.products.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">
                      ₹
                      {order.products
                        .reduce((sum, p) => sum + p.price * p.quantity, 0)
                        .toFixed(2)}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-sm font-semibold focus:outline-none transition ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No orders found for "{filter}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
