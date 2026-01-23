"use client";

import { useEffect, useState } from "react";

export default function CreditHistoryPage() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  const PER_PAGE = 20;

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        return;
      }


      const res = await fetch(
        `https://api.glassworld06.com/api/credits/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        console.error(data);
        alert("Failed to load credit history");
        return;
      }

      setCredits(data.data || []);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Credit History</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : credits.length === 0 ? (
        <p className="text-gray-500">No credit transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Admin</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(item.created_at).toLocaleString()}
                  </td>

                  <td className="p-3">{item.description}</td>

                  <td className="p-3 capitalize text-sm">
                    {item.type.replace("_", " ")}
                  </td>

                  <td className="p-3 text-sm text-gray-600">
                    {item.admin ? item.admin.name : "-"}
                  </td>

                  <td
                    className={`p-3 text-right font-semibold ${
                      item.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.amount > 0 ? "+" : ""}
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    
    </div>
  );
}
