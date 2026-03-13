"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaDownload, FaEdit, FaPrint } from "react-icons/fa";

export default function ViewOrder() {
  const { id } = useParams();
  const router = useRouter();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://api.glassworld06.com/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error("Failed to fetch order");
        
        const json = await res.json();
        setOrder(json.data || json);
      } catch (err) {
        console.error(err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 text-center">
          <div className="text-gray-600">Loading order details...</div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 text-center">
          <div className="text-red-600">{error || "Order not found"}</div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <FaPrint size={14} /> Print
            </button>
            <button
              onClick={() => router.push(`/admin/orders/edit/${id}`)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FaEdit size={14} /> Edit
            </button>
            <button
              onClick={() => window.open(`/api/orders/invoice/${id}`, '_blank')}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FaDownload size={14} /> Invoice
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-3xl overflow-hidden">
          {/* Header with Status */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Order #{order.id}</h1>
                <p className="text-blue-100">
                  Created on {new Date(order.created_at).toLocaleDateString()} at{' '}
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                {order.status || 'Pending'}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Customer Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Customer Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{order.user?.name || order.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{order.user?.email || order.email}</p>
                  </div>
                  {order.mobile && (
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="font-medium">{order.mobile}</p>
                    </div>
                  )}
                  {(order.country || order.city) && (
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {[order.city, order.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Order Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Item Type</p>
                    <p className="font-medium capitalize">{order.item_type?.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Item ID</p>
                    <p className="font-medium">{order.item_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price Index</p>
                    <p className="font-medium">{order.price_index || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Pricing Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-lg font-bold">${parseFloat(order.total || order.price || 0).toFixed(2)}</p>
                  </div>
                  {order.use_custom_values && (
                    <div className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      Custom Price Applied
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Services */}
            {order.services && Object.keys(order.services).length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Additional Services</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {Object.entries(order.services).map(([key, value]) => (
                    <div key={key} className="mb-2 last:mb-0">
                      <p className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {order.notes && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Notes</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}