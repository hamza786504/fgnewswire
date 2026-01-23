"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function GuestPost() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState("");


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No auth token found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://api.glassworld06.com/api/all_orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log(data);
        setApiStatus(data.status);

        if (!response.ok) {
          console.error(data);
          setLoading(false);
          return;
        }

        // ✅ Keep only guest posting orders
        const guestPostOrders = data.data.filter(order =>
          order.items.some(item => item.item_type === "package")
        );

        setOrders(guestPostOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Your Guest Posts
            </h1>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Price
                    </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        Loading orders...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        <p className="text-blue-600 text-xs font-bold">
                          No Guest Posting Orders Found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {order.order_number}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`capitalize px-2 py-1 rounded-full text-xs font-semibold`}
                          >
                            {apiStatus}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700">
                          ${order.total_price}
                        </td>
 <td className="px-6 py-4 text-sm text-gray-700">
                          {order.total_credit}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatDate(order.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
