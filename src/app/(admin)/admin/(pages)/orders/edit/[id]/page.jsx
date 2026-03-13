"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditOrder() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    status: "",
    quantity: 1,
    price: "",
    services: {},
    notes: "",
  });

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // ✅ Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://api.glassworld06.com/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error("Failed to fetch order");
        
        const json = await res.json();
        console.log("Fetched order:", json);
        
        const data = json.data || json;
        setOrder(data);
        
        setFormData({
          status: data.status || "pending",
          quantity: data.quantity || 1,
          price: data.total || data.price || "",
          services: data.services || {},
          notes: data.notes || "",
        });
      } catch (err) {
        console.error(err);
        setSubmitStatus({ success: false, message: "Failed to load order details." });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // ✅ Handle service change
  const handleServiceChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: value },
    }));
  };

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = "Please enter a valid price";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const token = localStorage.getItem("token");
      
      const payload = {
        status: formData.status,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        services: formData.services,
        notes: formData.notes,
      };

      const response = await fetch(`https://api.glassworld06.com/api/orders/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order");
      }

      setSubmitStatus({ success: true, message: "Order updated successfully!" });
      
      setTimeout(() => router.push("/admin/orders"), 1500);
    } catch (err) {
      console.error(err);
      setSubmitStatus({ success: false, message: err.message || "Error updating order." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 text-center">
          <div className="text-gray-600">Loading order details...</div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 text-center">
          <div className="text-red-600">Order not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-4 md:p-6">
          {submitStatus.message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Order #{order.id}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-500">Customer</div>
                <div className="text-sm font-medium">{order.user?.name || order.name}</div>
                <div className="text-xs text-gray-600">{order.user?.email || order.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Item Type</div>
                <div className="text-sm font-medium capitalize">{order.item_type?.replace('_', ' ')}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Created</div>
                <div className="text-sm">{new Date(order.created_at).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Original Price</div>
                <div className="text-sm font-medium">${parseFloat(order.total || order.price || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Edit Order</h2>

            {/* Status */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Order Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className={`w-full rounded-md border px-3 py-2 ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full rounded-md border px-3 py-2 ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Services */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Word Option</label>
              <select
                value={formData.services.word_option || ""}
                onChange={(e) => handleServiceChange("word_option", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select word count</option>
                <option value="500+ Words Article">500+ Words Article</option>
                <option value="1000+ Words Article">1000+ Words Article</option>
                <option value="1500+ Words Article">1500+ Words Article</option>
              </select>
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Admin Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Add any internal notes about this order..."
              />
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-800"
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}